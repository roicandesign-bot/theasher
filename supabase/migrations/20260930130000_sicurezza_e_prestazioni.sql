-- Dopo i consigli di Supabase (advisors) sullo schema iniziale.
-- 1. Le funzioni SECURITY DEFINER escono dallo schema esposto via API (public -> private).
-- 2. auth.uid() valutato una volta per query, non per riga: (select auth.uid()).
-- 3. Le regole admin non si sovrappongono più alla lettura pubblica: insert/update/delete separati.
-- 4. Indici sulle chiavi esterne rimaste scoperte.

create schema if not exists private;
grant usage on schema private to anon, authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin')
$$;
revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;
revoke all on function private.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

-- via tutte le regole che usano le vecchie funzioni, poi le funzioni
drop policy "prodotti attivi leggibili" on public.products;
drop policy "formati leggibili" on public.variants;
drop policy "admin categorie" on public.categories;
drop policy "admin prodotti" on public.products;
drop policy "admin formati" on public.variants;
drop policy "admin analisi" on public.lab_reports;
drop policy "admin regole paese" on public.country_rules;
drop policy "admin paesi" on public.shipping_countries;
drop policy "admin sconti" on public.discount_codes;
drop policy "profilo proprio" on public.profiles;
drop policy "profilo modificabile" on public.profiles;
drop policy "admin profili" on public.profiles;
drop policy "indirizzi propri" on public.addresses;
drop policy "admin indirizzi" on public.addresses;
drop policy "ordini propri" on public.orders;
drop policy "admin ordini" on public.orders;
drop policy "righe ordini proprie" on public.order_lines;
drop policy if exists "admin carica file" on storage.objects;
drop policy if exists "admin modifica file" on storage.objects;
drop policy if exists "admin elimina file" on storage.objects;
drop function public.is_admin();
drop function public.handle_new_user();

-- catalogo: una sola regola di lettura, scrittura admin separata
create policy "prodotti attivi leggibili" on public.products for select
  using (active or (select private.is_admin()));
create policy "formati leggibili" on public.variants for select
  using (exists (select 1 from public.products p where p.id = product_id and (p.active or (select private.is_admin()))));

do $$
declare t text;
begin
  foreach t in array array['categories', 'products', 'variants', 'lab_reports', 'country_rules', 'shipping_countries'] loop
    execute format('create policy "admin inserisce" on public.%I for insert with check ((select private.is_admin()))', t);
    execute format('create policy "admin modifica" on public.%I for update using ((select private.is_admin())) with check ((select private.is_admin()))', t);
    execute format('create policy "admin elimina" on public.%I for delete using ((select private.is_admin()))', t);
  end loop;
end;
$$;

-- sconti: solo admin (la validazione al checkout la fa la funzione server)
create policy "admin sconti" on public.discount_codes for all
  using ((select private.is_admin())) with check ((select private.is_admin()));

-- profili
create policy "profilo proprio" on public.profiles for select
  using (id = (select auth.uid()) or (select private.is_admin()));
create policy "profilo modificabile" on public.profiles for update
  using (id = (select auth.uid()) or (select private.is_admin()))
  with check (id = (select auth.uid()) or (select private.is_admin()));

-- indirizzi
create policy "indirizzi leggibili" on public.addresses for select
  using (user_id = (select auth.uid()) or (select private.is_admin()));
create policy "indirizzi inseribili" on public.addresses for insert
  with check (user_id = (select auth.uid()));
create policy "indirizzi modificabili" on public.addresses for update
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "indirizzi eliminabili" on public.addresses for delete
  using (user_id = (select auth.uid()));

-- ordini
create policy "ordini propri" on public.orders for select
  using (user_id = (select auth.uid()) or (select private.is_admin()));
create policy "admin ordini" on public.orders for update
  using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "righe ordini proprie" on public.order_lines for select
  using (exists (select 1 from public.orders o where o.id = order_id
    and (o.user_id = (select auth.uid()) or (select private.is_admin()))));

-- storage
create policy "admin carica file" on storage.objects for insert
  with check (bucket_id in ('product-images', 'lab-reports') and (select private.is_admin()));
create policy "admin modifica file" on storage.objects for update
  using (bucket_id in ('product-images', 'lab-reports') and (select private.is_admin()));
create policy "admin elimina file" on storage.objects for delete
  using (bucket_id in ('product-images', 'lab-reports') and (select private.is_admin()));

-- indici
create index if not exists country_rules_category_idx on public.country_rules (category);
create index if not exists order_lines_variant_idx on public.order_lines (variant_id);
create index if not exists orders_discount_code_idx on public.orders (discount_code);
