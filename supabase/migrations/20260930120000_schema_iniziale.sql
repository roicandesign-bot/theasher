-- The Hasher · schema iniziale (M0)
-- Catalogo, clienti, indirizzi, ordini, sconti, regole per Paese, analisi di laboratorio.
-- Prezzi sempre in centesimi di euro. RLS attiva su ogni tabella.

-- ---------------------------------------------------------------- tipi
create type public.linea as enum ('CBD', 'THC-X', 'THC-A', 'CBG', 'CBN');
create type public.unita as enum ('g', 'ml', 'pz');
create type public.stato_ordine as enum (
  'in_attesa_di_pagamento', 'pagato', 'in_preparazione', 'spedito', 'consegnato', 'annullato', 'rimborsato'
);
create type public.ruolo as enum ('cliente', 'admin');

-- ---------------------------------------------------------------- profili
-- Una riga per ogni utente di Supabase Auth, creata dal trigger qui sotto.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.ruolo not null default 'cliente',
  first_name text,
  last_name text,
  phone text,
  birth_date date,
  age_confirmed_at timestamptz,
  marketing_opt_in boolean not null default false,
  club_level text not null default 'starter' check (club_level in ('starter', 'member', 'black', 'elite')),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------- catalogo
create table public.categories (
  key text primary key,
  name text not null,
  reparto text not null default 'negozio' check (reparto in ('negozio', 'merch')),
  gruppo text,
  image text,
  sort int not null default 0
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  linea public.linea,
  category text not null references public.categories (key),
  active boolean not null default true,
  -- filtri
  coltivazione text,
  tipo_fiore text,
  tipo text,
  metodo text,
  consistenza text,
  colore text,
  thc_free boolean not null default false,
  attivi jsonb not null default '{}'::jsonb,       -- {"cbd": 18.4, "thc": 0.25}
  -- formato base mostrato in lista
  price int not null check (price >= 0),
  compare_at int check (compare_at >= 0),
  grams numeric(10, 2) not null,
  unita public.unita not null default 'g',
  formato text,
  dose text,
  badges text[] not null default '{}',
  -- contenuti
  aroma text[] not null default '{}',
  origin text,
  short text,
  image text,
  image_grande text,
  gallery jsonb not null default '[]'::jsonb,      -- [{src, alt}]
  description text[] not null default '{}',
  aroma_notes jsonb not null default '[]'::jsonb,  -- [{label, text}]
  features jsonb not null default '[]'::jsonb,     -- [{label, value}]
  faq jsonb not null default '[]'::jsonb,          -- [{q, a}]
  batch text,
  lab jsonb,                                       -- {cbd, thc, lab, date}
  storage text,
  warnings text,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index products_category_idx on public.products (category) where active;
create index products_linea_idx on public.products (linea) where active;

-- Ogni prodotto ha almeno un formato: è il formato che finisce nel carrello e nell'ordine.
create table public.variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  label text not null,
  grams numeric(10, 2) not null,
  price int not null check (price >= 0),
  compare_at int check (compare_at >= 0),
  stock int not null default 0 check (stock >= 0),
  sku text unique,
  sort int not null default 0,
  unique (product_id, label)
);
create index variants_product_idx on public.variants (product_id);

create table public.lab_reports (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  batch text not null,
  lab_name text,
  analysed_on date,
  pdf_path text,                                   -- percorso nel bucket lab-reports
  created_at timestamptz not null default now(),
  unique (product_id, batch)
);

-- Cosa si può vendere in quale Paese (es. IT: fiori non vendibili, DL 48/2025).
create table public.country_rules (
  country_code char(2) not null,
  category text not null references public.categories (key),
  allowed boolean not null default true,
  note text,
  primary key (country_code, category)
);

create table public.shipping_countries (
  country_code char(2) primary key,
  name text not null,
  active boolean not null default false,
  shipping_price int not null default 0,
  free_from int
);

-- ---------------------------------------------------------------- clienti
create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text,
  full_name text not null,
  line1 text not null,
  line2 text,
  city text not null,
  province text,
  postal_code text not null,
  country_code char(2) not null,
  phone text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);
create index addresses_user_idx on public.addresses (user_id);

-- ---------------------------------------------------------------- sconti e ordini
create table public.discount_codes (
  code text primary key,
  percent_off int check (percent_off between 1 and 100),
  amount_off int check (amount_off > 0),
  min_subtotal int not null default 0,
  active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  max_uses int,
  used_count int not null default 0,
  check ((percent_off is null) <> (amount_off is null))
);

create sequence public.order_number_seq start 1001;

-- Gli ordini li scrive solo la funzione di checkout (service role), mai il browser.
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  number text not null unique default ('TH-' || nextval('public.order_number_seq')),
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  status public.stato_ordine not null default 'in_attesa_di_pagamento',
  subtotal int not null,
  discount int not null default 0,
  shipping int not null default 0,
  total int not null,
  currency char(3) not null default 'EUR',
  discount_code text references public.discount_codes (code),
  shipping_address jsonb not null,
  country_code char(2) not null,
  payment_method text not null default 'bonifico',
  payment_ref text,
  tracking_number text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index orders_user_idx on public.orders (user_id);

create table public.order_lines (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  variant_id uuid references public.variants (id) on delete set null,
  product_name text not null,                      -- copia al momento dell'ordine
  variant_label text not null,
  unit_price int not null,
  quantity int not null check (quantity > 0),
  line_total int not null
);
create index order_lines_order_idx on public.order_lines (order_id);

-- ---------------------------------------------------------------- updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger products_touch before update on public.products
  for each row execute function public.touch_updated_at();
create trigger orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------- RLS
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.variants enable row level security;
alter table public.lab_reports enable row level security;
alter table public.country_rules enable row level security;
alter table public.shipping_countries enable row level security;
alter table public.addresses enable row level security;
alter table public.discount_codes enable row level security;
alter table public.orders enable row level security;
alter table public.order_lines enable row level security;

-- catalogo: lettura pubblica, scrittura solo admin
create policy "catalogo leggibile" on public.categories for select using (true);
create policy "prodotti attivi leggibili" on public.products for select using (active or public.is_admin());
create policy "formati leggibili" on public.variants for select
  using (exists (select 1 from public.products p where p.id = product_id and (p.active or public.is_admin())));
create policy "analisi leggibili" on public.lab_reports for select using (true);
create policy "regole paese leggibili" on public.country_rules for select using (true);
create policy "paesi leggibili" on public.shipping_countries for select using (true);

create policy "admin categorie" on public.categories for all using (public.is_admin()) with check (public.is_admin());
create policy "admin prodotti" on public.products for all using (public.is_admin()) with check (public.is_admin());
create policy "admin formati" on public.variants for all using (public.is_admin()) with check (public.is_admin());
create policy "admin analisi" on public.lab_reports for all using (public.is_admin()) with check (public.is_admin());
create policy "admin regole paese" on public.country_rules for all using (public.is_admin()) with check (public.is_admin());
create policy "admin paesi" on public.shipping_countries for all using (public.is_admin()) with check (public.is_admin());
create policy "admin sconti" on public.discount_codes for all using (public.is_admin()) with check (public.is_admin());

-- profilo: ognuno il suo; il ruolo non si cambia dal browser
create policy "profilo proprio" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profilo modificabile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "admin profili" on public.profiles for update using (public.is_admin()) with check (public.is_admin());
revoke update on public.profiles from anon, authenticated;
grant update (first_name, last_name, phone, birth_date, marketing_opt_in) on public.profiles to authenticated;

-- indirizzi: solo i propri
create policy "indirizzi propri" on public.addresses for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "admin indirizzi" on public.addresses for select using (public.is_admin());

-- ordini: il cliente legge i suoi, l'admin tutto; nessuno li crea dal browser
create policy "ordini propri" on public.orders for select using (user_id = auth.uid() or public.is_admin());
create policy "admin ordini" on public.orders for update using (public.is_admin()) with check (public.is_admin());
create policy "righe ordini proprie" on public.order_lines for select
  using (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())));

-- ---------------------------------------------------------------- storage
-- Foto prodotto e PDF delle analisi: pubblici in lettura, caricati solo dall'admin.
do $$
begin
  if exists (select 1 from information_schema.schemata where schema_name = 'storage') then
    insert into storage.buckets (id, name, public) values
      ('product-images', 'product-images', true),
      ('lab-reports', 'lab-reports', true)
    on conflict (id) do nothing;

    execute $p$create policy "admin carica file" on storage.objects for insert
      with check (bucket_id in ('product-images', 'lab-reports') and public.is_admin())$p$;
    execute $p$create policy "admin modifica file" on storage.objects for update
      using (bucket_id in ('product-images', 'lab-reports') and public.is_admin())$p$;
    execute $p$create policy "admin elimina file" on storage.objects for delete
      using (bucket_id in ('product-images', 'lab-reports') and public.is_admin())$p$;
  end if;
end;
$$;
