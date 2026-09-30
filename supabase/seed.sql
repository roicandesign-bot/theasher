-- Generato da scripts/genera-seed.mjs: non modificare a mano.
begin;

insert into public.categories (key, name, reparto, gruppo, image, sort) values
  ('fiori', 'Fiori', 'negozio', 'I classici', 'images/demo/cat-flower.jpg', 0),
  ('hash', 'Hash', 'negozio', 'I classici', 'images/demo/cat-hash.jpg', 1),
  ('estratti', 'Estratti', 'negozio', 'I classici', 'images/filiera/pressatura.jpg', 2),
  ('preroll', 'Preroll', 'negozio', 'Pronti all’uso', 'images/prodotti/preroll-gelato-41.jpg', 3),
  ('cannagar', 'Cannagar', 'negozio', 'Pronti all’uso', 'images/prodotti/cannagar-royal.jpg', 4),
  ('vape', 'Vape', 'negozio', 'Pronti all’uso', 'images/prodotti/vape-amnesia-thcx.jpg', 5),
  ('oli', 'Oli', 'negozio', 'Oli ed edibles', 'images/prodotti/olio-full-spectrum.jpg', 6),
  ('edibles', 'Edibles', 'negozio', 'Oli ed edibles', 'images/prodotti/edibles-mango.jpg', 7),
  ('semi', 'Semi', 'negozio', 'Da coltivare', 'images/prodotti/semi-gorilla-glue.jpg', 8),
  ('cloni', 'Cloni', 'negozio', 'Da coltivare', 'images/prodotti/cloni-lemon-haze.jpg', 9),
  ('fumo', 'Per fumare', 'merch', null, null, 10),
  ('abbigliamento', 'Abbigliamento', 'merch', null, null, 11),
  ('skate', 'Skate e sticker', 'merch', null, null, 12)
on conflict (key) do nothing;

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('lemon-haze', 'Lemon Haze', 'CBD'::public.linea, 'hash', null, null, null, 'Dry sift', 'Morbido', 'Giallo', false, '{"cbd":18.4,"cbg":1.2,"thc":0.25}'::jsonb, 2490, null, 3.5, 'g'::public.unita, null, null, array['Best seller']::text[], array['Agrumato', 'Terroso', 'Morbido']::text[], 'Selezione europea', 'Note agrumate nette, fondo terroso, texture morbida e compatta.', 'images/demo/lemon-haze.jpg', null, '[{"src":"images/demo/lemon-haze.jpg","alt":"Lemon Haze, due pezzi di hash CBD su fondo nero"},{"src":"images/demo/box-lemon-haze.jpg","alt":"Confezione Lemon Haze da 3,5 g"},{"src":"images/demo/hash-macro.jpg","alt":"Macro della texture resinosa di Lemon Haze"},{"src":"images/demo/jar-hash.jpg","alt":"Barattolo in vetro nero The Hasher"}]'::jsonb, array['Lemon Haze è il nostro hash più riconoscibile: l’agrume arriva subito, netto, senza coprire il fondo terroso che tiene insieme il profilo. La pressatura è morbida, la grana si apre con le dita senza sbriciolarsi.', 'Selezionato in Europa da un produttore con cui lavoriamo da tre raccolti. Ogni lotto viene analizzato prima di entrare in magazzino: il certificato è qui sotto, con il numero stampato sulla confezione.']::text[], '[{"label":"Al naso","text":"Limone e scorza fresca, subito riconoscibili."},{"label":"Al tatto","text":"Morbido, leggermente oleoso, si lavora senza calore."},{"label":"Sul finale","text":"Fondo terroso e dolce, lungo ma mai pesante."}]'::jsonb, '[{"label":"Linea","value":"CBD"},{"label":"Lavorazione","value":"Dry sift, pressatura a freddo"},{"label":"Consistenza","value":"Morbido, colore giallo dorato"},{"label":"Origine","value":"Selezione europea"},{"label":"Ingredienti","value":"Cannabis sativa L. (infiorescenze e resina)"}]'::jsonb, '[{"q":"Che differenza c’è tra i formati?","a":"Solo la quantità: è lo stesso lotto, dallo stesso certificato. Sui formati da 5 e 10 g il prezzo al grammo scende, come vedi sotto ogni opzione."},{"q":"Come leggo il numero di lotto?","a":"È stampato sul retro della confezione e corrisponde a quello indicato in questa pagina. Con quel numero scarichi il certificato di analisi."},{"q":"Il prodotto è sempre lo stesso a ogni ordine?","a":"Il lotto cambia nel tempo, il profilo resta quello. Quando cambiamo lotto aggiorniamo qui i valori e il certificato."}]'::jsonb, 'LH-2609', '{"cbd":"18,4 %","thc":"entro i limiti di legge","lab":"Laboratorio indipendente","date":"09/2026"}'::jsonb, 'Conservare in luogo fresco e asciutto, al riparo dalla luce, nella confezione originale richiusa.', 'Prodotto riservato ai maggiori di 18 anni. Non destinato alla combustione. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 0)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 890, null::int, 50, 'lemon-haze-1', 0),
  ('3,5 g', 3.5::numeric, 2490, null::int, 50, 'lemon-haze-2', 1),
  ('5 g', 5::numeric, 3390, 3560::int, 50, 'lemon-haze-3', 2),
  ('10 g', 10::numeric, 5990, 7120::int, 0, 'lemon-haze-4', 3)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('royal-hash', 'Royal Hash', 'CBD'::public.linea, 'hash', null, null, null, 'Mousse', 'Cremoso', 'Marrone', false, '{"cbd":31.5,"cbg":1.4}'::jsonb, 2490, null, 3.5, 'g'::public.unita, null, null, array['Best seller']::text[], array['Classico', 'Pieno', 'Rotondo']::text[], 'Selezione europea', 'Il classico: pieno, rotondo, cremoso al tatto. Per chi sa cosa cerca.', 'images/demo/royal-hash.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 1)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3,5 g', 3.5::numeric, 2490, null::int, 50, 'royal-hash-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('desert-gold', 'Desert Gold', 'CBD'::public.linea, 'hash', null, null, null, 'Super Dry', 'Duro', 'Giallo', false, '{"cbd":26.8}'::jsonb, 2490, null, 3.5, 'g'::public.unita, null, null, array['Best seller']::text[], array['Dolce', 'Speziato', 'Complesso']::text[], 'Selezione europea', 'Dolce all’attacco, speziato sul finale. Grana fine, colore dorato.', 'images/demo/desert-gold.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 2)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3,5 g', 3.5::numeric, 2490, null::int, 50, 'desert-gold-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('ketama-gold', 'Ketama Gold', 'CBD'::public.linea, 'hash', null, null, null, 'Libanese', 'Duro', 'Marrone', false, '{"cbd":24.3}'::jsonb, 2990, null, 3.5, 'g'::public.unita, null, null, array['New', 'Limited drop']::text[], array['Legnoso', 'Dolce', 'Profondo']::text[], 'Selezione europea', 'Lotto limitato. Pressatura tradizionale, profilo legnoso e profondo.', 'images/demo/hash-bricks.jpg', 'images/filiera/pressatura.jpg', '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 3)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3,5 g', 3.5::numeric, 2990, null::int, 50, 'ketama-gold-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('tropicana-cookies', 'Tropicana Cookies', 'CBD'::public.linea, 'hash', null, null, null, 'Frozen sift', 'Cremoso', 'Giallo', false, '{"cbd":46.2,"cbg":2.1,"thc":0.28}'::jsonb, 2190, null, 1, 'g'::public.unita, null, null, array['New']::text[], array['Tropicale', 'Agrumato', 'Resinoso']::text[], 'Selezione europea', 'Setacciato a freddo: profumo tropicale intatto, resa piena, nessun residuo.', 'images/demo/hash-macro.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 4)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 2190, null::int, 50, 'tropicana-cookies-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('apple-bananas', 'Apple & Bananas', 'CBD'::public.linea, 'hash', null, null, null, 'Static sift', 'Morbido', 'Giallo', false, '{"cbd":39.4,"cbg":1.6}'::jsonb, 1890, null, 1, 'g'::public.unita, null, null, '{}'::text[], array['Frutta bianca', 'Dolce', 'Fresco']::text[], 'Selezione europea', 'Separazione statica, solo tricomi. Mela verde e banana, dolcezza pulita.', 'images/demo/hash-texture.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 5)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 1890, null::int, 50, 'apple-bananas-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('gelato-ice-o-lator', 'Gelato 41', 'CBD'::public.linea, 'hash', null, null, null, 'Ice-o-lator', 'Cremoso', 'Giallo', false, '{"cbd":51.7,"cbg":2.4}'::jsonb, 2490, null, 1, 'g'::public.unita, null, null, array['Limited drop']::text[], array['Cremoso', 'Vaniglia', 'Agrumato']::text[], 'Selezione europea', 'Estrazione in acqua e ghiaccio. Il più cremoso del catalogo, quasi burroso.', 'images/demo/jar-hash.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 6)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 2490, null::int, 50, 'gelato-ice-o-lator-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('nepal-black', 'Nepal Black', 'CBD'::public.linea, 'hash', null, null, null, '3x filtered', 'Duro', 'Nero', false, '{"cbd":29.6}'::jsonb, 2790, null, 3.5, 'g'::public.unita, null, null, '{}'::text[], array['Balsamico', 'Cacao', 'Intenso']::text[], 'Selezione europea', 'Tre filtraggi, colore nero e superficie lucida. Cacao amaro e resina.', 'images/demo/hash-bricks.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 7)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3,5 g', 3.5::numeric, 2790, null::int, 50, 'nepal-black-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('strawberry-banana', 'Strawberry Banana', 'CBD'::public.linea, 'hash', null, null, null, 'Fresh frozen', 'Cremoso', 'Giallo', false, '{"cbd":48.3,"cbg":2.8,"thc":0.29}'::jsonb, 2690, null, 1, 'g'::public.unita, null, null, array['New']::text[], array['Fragola', 'Dolce', 'Pieno']::text[], 'Selezione europea', 'Pianta congelata fresca: il terpene resta dentro. Fragola vera, niente cotto.', 'images/demo/hash-macro.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 8)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 2690, null::int, 50, 'strawberry-banana-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('zkittlez-dry-ice', 'Zkittlez', 'CBD'::public.linea, 'hash', null, null, null, 'Dry ice', 'Morbido', 'Marrone', false, '{"cbd":34.1}'::jsonb, 1590, null, 1, 'g'::public.unita, null, null, '{}'::text[], array['Fruttato', 'Caramello', 'Rotondo']::text[], 'Selezione europea', 'Ghiaccio secco: resa alta, prezzo onesto, profilo fruttato da tutti i giorni.', 'images/demo/hash-texture.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 9)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 1590, null::int, 50, 'zkittlez-dry-ice-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('chocolate-skunk', 'Chocolate Skunk', 'CBD'::public.linea, 'hash', null, null, null, 'Semidry', 'Morbido', 'Marrone', false, '{"cbd":21.7}'::jsonb, 2490, null, 5, 'g'::public.unita, null, null, '{}'::text[], array['Cioccolato', 'Terroso', 'Speziato']::text[], 'Selezione europea', 'Semidry da formato grande: morbido, scuro, con la scia di cacao sul finale.', 'images/demo/royal-hash.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 10)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('5 g', 5::numeric, 2490, null::int, 50, 'chocolate-skunk-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('runtz-thcx', 'Runtz THC-X', 'THC-X'::public.linea, 'hash', null, null, null, 'Frozen static sift', 'Cremoso', 'Giallo', false, '{"thcx":38.5,"cbd":2.1}'::jsonb, 3290, null, 1, 'g'::public.unita, null, null, array['New']::text[], array['Candy', 'Agrumato', 'Intenso']::text[], 'Selezione europea', 'Statico a freddo sulla linea THC-X: dolce, pungente, molto aromatico.', 'images/demo/hash-macro.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 11)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 3290, null::int, 50, 'runtz-thcx-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('silver-haze-cbd', 'Silver Haze', 'CBD'::public.linea, 'fiori', 'Indoor', 'Big Bud', null, null, null, null, false, '{"cbd":19.8,"cbg":1.1}'::jsonb, 2190, null, 3.5, 'g'::public.unita, null, null, array['New']::text[], array['Fresco', 'Pino', 'Agrumato']::text[], 'Coltivazione indoor europea', 'Cime compatte, terpeni freschi e resinosi. Il nostro indoor di riferimento.', 'images/demo/cat-flower.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 12)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3,5 g', 3.5::numeric, 2190, null::int, 50, 'silver-haze-cbd-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('gelato-41-indoor', 'Gelato 41', 'CBD'::public.linea, 'fiori', 'Indoor hydro', 'Big Bud', null, null, null, null, false, '{"cbd":22.6,"cbg":1.5,"thc":0.24}'::jsonb, 2790, null, 3.5, 'g'::public.unita, null, null, array['Best seller']::text[], array['Cremoso', 'Dolce', 'Agrumato']::text[], 'Coltivazione idroponica europea', 'Idroponica, cime dense e cariche di tricomi. Il massimo che abbiamo sui fiori.', 'images/demo/flower-macro-2.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 13)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3,5 g', 3.5::numeric, 2790, null::int, 50, 'gelato-41-indoor-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('zkittlez-cali', 'Zkittlez Cali', 'CBD'::public.linea, 'fiori', 'Cali', 'Big Bud', null, null, null, null, false, '{"cbd":24.1,"cbg":1.8,"thc":0.27}'::jsonb, 3290, null, 3.5, 'g'::public.unita, null, null, array['Limited drop']::text[], array['Fruttato', 'Dolce', 'Denso']::text[], 'Genetica californiana, coltivazione europea', 'Standard Cali: cure lungo, cime grandi, profumo che si sente dal barattolo.', 'images/demo/flower-macro-2.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 14)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3,5 g', 3.5::numeric, 3290, null::int, 50, 'zkittlez-cali-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('amnesia-cbd', 'Amnesia', 'CBD'::public.linea, 'fiori', 'Greenhouse', 'Big Bud', null, null, null, null, false, '{"cbd":14.2}'::jsonb, 1790, null, 3.5, 'g'::public.unita, null, null, '{}'::text[], array['Dolce', 'Terroso', 'Floreale']::text[], 'Coltivazione greenhouse europea', 'Profilo dolce e floreale, tricomi evidenti. Prossimo restock in arrivo.', 'images/demo/flower-macro-2.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 15)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3,5 g', 3.5::numeric, 1790, null::int, 0, 'amnesia-cbd-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('lemon-tree-small', 'Lemon Tree Small', 'CBD'::public.linea, 'fiori', 'Indoor', 'Small Bud', null, null, null, null, false, '{"cbd":17.4}'::jsonb, 1990, null, 5, 'g'::public.unita, null, null, '{}'::text[], array['Agrumato', 'Pungente', 'Fresco']::text[], 'Coltivazione indoor europea', 'Stesse piante dell’indoor, cime piccole. Stesso profumo, prezzo più basso.', 'images/demo/cat-flower.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 16)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('5 g', 5::numeric, 1990, null::int, 50, 'lemon-tree-small-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('orange-bud-prerolls', 'Orange Bud Pre-roll', 'CBD'::public.linea, 'preroll', 'Glasshouse', null, 'Multipack', null, null, null, false, '{"cbd":16.2}'::jsonb, 1490, null, 3, 'g'::public.unita, '3 × 1 g', null, '{}'::text[], array['Arancia', 'Dolce', 'Leggero']::text[], 'Coltivazione glasshouse europea', 'Tre coni pronti da 1 g. Tiraggio regolare, niente polvere.', 'images/prodotti/preroll-orange-bud.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 17)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3 × 1 g', 3::numeric, 1490, null::int, 50, 'orange-bud-prerolls-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('critical-outdoor', 'Critical Mass', 'CBD'::public.linea, 'fiori', 'Outdoor', 'Big Bud', null, null, null, null, false, '{"cbd":9.8}'::jsonb, 1890, null, 10, 'g'::public.unita, null, null, '{}'::text[], array['Terroso', 'Erbaceo', 'Semplice']::text[], 'Coltivazione outdoor europea', 'Outdoor onesto in formato grande: profilo terroso, prezzo al grammo minimo.', 'images/demo/landscape.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 18)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('10 g', 10::numeric, 1890, null::int, 50, 'critical-outdoor-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('trim-selection', 'Trim Selection', 'CBD'::public.linea, 'fiori', 'Greenhouse', 'Trim', null, null, null, null, false, '{"cbd":8.4}'::jsonb, 2490, null, 50, 'g'::public.unita, null, null, '{}'::text[], array['Erbaceo', 'Verde', 'Secco']::text[], 'Coltivazione greenhouse europea', 'Foglie e residui di lavorazione selezionati, per estrazioni e infusi.', 'images/demo/landscape.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 19)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('50 g', 50::numeric, 2490, null::int, 50, 'trim-selection-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('mimosa-thcx', 'Mimosa THC-X', 'THC-X'::public.linea, 'fiori', 'Indoor', 'Big Bud', null, null, null, null, false, '{"thcx":24.2,"cbd":1.2}'::jsonb, 3490, null, 3.5, 'g'::public.unita, null, null, array['New']::text[], array['Agrumato', 'Tropicale', 'Intenso']::text[], 'Coltivazione indoor europea', 'Linea THC-X, indoor. Cime chiare, profumo agrumato che riempie la stanza.', 'images/demo/flower-macro-2.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 20)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3,5 g', 3.5::numeric, 3490, null::int, 50, 'mimosa-thcx-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('purple-punch-thcx', 'Purple Punch THC-X', 'THC-X'::public.linea, 'fiori', 'Glasshouse', 'Small Bud', null, null, null, null, false, '{"thcx":18.6}'::jsonb, 2990, null, 5, 'g'::public.unita, null, null, '{}'::text[], array['Uva', 'Dolce', 'Morbido']::text[], 'Coltivazione glasshouse europea', 'Small bud della linea THC-X: uva e frutta scura, resa piena.', 'images/demo/cat-flower.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 21)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('5 g', 5::numeric, 2990, null::int, 50, 'purple-punch-thcx-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('mimosa-sugar-wax', 'Mimosa Sugar Wax', 'CBD'::public.linea, 'estratti', null, null, null, 'Sugar wax', null, null, false, '{"cbd":62.4,"cbg":3.1}'::jsonb, 2990, null, 1, 'g'::public.unita, null, null, array['New']::text[], array['Agrumato', 'Zuccherino', 'Vivo']::text[], 'Estrazione europea', 'Grana zuccherina, terpeni intatti. Si lavora facilmente, profuma subito.', 'images/demo/hash-macro.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 22)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 2990, null::int, 50, 'mimosa-sugar-wax-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('og-kush-shatter', 'OG Kush Shatter', 'CBD'::public.linea, 'estratti', null, null, null, 'Shatter', null, null, false, '{"cbd":68.2}'::jsonb, 3190, null, 1, 'g'::public.unita, null, null, '{}'::text[], array['Pino', 'Legnoso', 'Netto']::text[], 'Estrazione europea', 'Lastra ambrata, trasparente, si rompe netta. Profilo classico OG.', 'images/demo/hash-texture.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 23)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 3190, null::int, 50, 'og-kush-shatter-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('lemon-crumble', 'Lemon Crumble', 'CBD'::public.linea, 'estratti', null, null, null, 'Crumble', null, null, false, '{"cbd":64.7}'::jsonb, 2890, null, 1, 'g'::public.unita, null, null, '{}'::text[], array['Limone', 'Secco', 'Pungente']::text[], 'Estrazione europea', 'Friabile, si dosa con le dita. Agrume secco, nessun residuo oleoso.', 'images/demo/hash-macro.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 24)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 2890, null::int, 50, 'lemon-crumble-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('tangie-terpsolate', 'Tangie Terpsolate', 'CBD'::public.linea, 'estratti', null, null, null, 'Terpsolate', null, null, true, '{"cbd":88.3}'::jsonb, 3990, null, 1, 'g'::public.unita, null, null, array['Limited drop']::text[], array['Mandarino', 'Puro', 'Esplosivo']::text[], 'Estrazione europea', 'Isolato riportato sui terpeni della Tangie: purezza altissima, naso pieno.', 'images/demo/hash-texture.jpg', 'images/filiera/setacciatura.jpg', '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 25)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 3990, null::int, 50, 'tangie-terpsolate-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('gelato-piattella', 'Gelato Piattella', 'CBD'::public.linea, 'estratti', null, null, null, 'Piattella', null, null, false, '{"cbd":72.1,"cbg":2.6,"thc":0.22}'::jsonb, 4290, null, 1, 'g'::public.unita, null, null, array['New']::text[], array['Cremoso', 'Vaniglia', 'Ricco']::text[], 'Estrazione europea', 'La texture del momento: cristalli sospesi in terpeni, dolce e rotonda.', 'images/filiera/pressatura.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 26)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 4290, null::int, 50, 'gelato-piattella-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('wedding-cake-budder', 'Wedding Cake Budder', 'CBD'::public.linea, 'estratti', null, null, null, 'Budder', null, null, false, '{"cbd":66.5}'::jsonb, 3090, null, 1, 'g'::public.unita, null, null, '{}'::text[], array['Burroso', 'Dolce', 'Denso']::text[], 'Estrazione europea', 'Montato come burro, colore chiaro. Esaurito, torna col prossimo lotto.', 'images/demo/hash-texture.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 27)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 3090, null::int, 0, 'wedding-cake-budder-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('isolato-cbd-99', 'Isolato CBD 99 %', 'CBD'::public.linea, 'estratti', null, null, null, 'Isolato', null, null, true, '{"cbd":99.1}'::jsonb, 1990, null, 1, 'g'::public.unita, null, null, array['Best seller']::text[], array['Neutro', 'Pulito', 'Inodore']::text[], 'Estrazione europea', 'Cristallo puro, senza odore né sapore. Base per chi formula da sé.', 'images/filiera/setacciatura.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 28)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 1990, null::int, 50, 'isolato-cbd-99-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('olio-full-spectrum-20', 'Olio Full Spectrum 20 %', 'CBD'::public.linea, 'oli', null, null, 'Full spectrum', null, null, null, false, '{"cbd":20,"cbg":2.2,"cbn":1.1,"thc":0.26}'::jsonb, 3490, null, 10, 'ml'::public.unita, null, null, '{}'::text[], array['Erbaceo', 'Amaro', 'Pieno']::text[], 'Estrazione europea', 'Dieci millilitri, spettro completo, contagocce graduato. CBG e CBN inclusi.', 'images/prodotti/olio-full-spectrum.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 29)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('10 ml', 10::numeric, 3490, null::int, 50, 'olio-full-spectrum-20-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('zkittlez-thcx-shatter', 'Zkittlez THC-X Shatter', 'THC-X'::public.linea, 'estratti', null, null, null, 'Shatter', null, null, false, '{"thcx":76.4,"cbd":1.4}'::jsonb, 4490, null, 1, 'g'::public.unita, null, null, array['New']::text[], array['Fruttato', 'Dolce', 'Potente']::text[], 'Estrazione europea', 'La lastra più concentrata del catalogo, sulla linea THC-X.', 'images/demo/hash-texture.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 30)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 4490, null::int, 50, 'zkittlez-thcx-shatter-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('white-cbg', 'White CBG', 'CBG'::public.linea, 'fiori', 'Glasshouse', 'Big Bud', null, null, null, null, false, '{"cbg":14.6,"cbd":1.4}'::jsonb, 2290, null, 3.5, 'g'::public.unita, null, null, array['New']::text[], array['Erbaceo', 'Agrumato', 'Delicato']::text[], 'Coltivazione glasshouse europea', 'Cime chiarissime a dominanza CBG. Profumo leggero, effetto lucido.', 'images/demo/cat-flower.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 31)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3,5 g', 3.5::numeric, 2290, null::int, 50, 'white-cbg-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('golden-cbg-hash', 'Golden CBG', 'CBG'::public.linea, 'hash', null, null, null, 'Dry sift', 'Duro', 'Giallo', false, '{"cbg":28.4,"cbd":2.2}'::jsonb, 2690, null, 3.5, 'g'::public.unita, null, null, '{}'::text[], array['Terroso', 'Dolce', 'Pulito']::text[], 'Selezione europea', 'Il primo hash della linea CBG: grana asciutta, colore paglia, naso pulito.', 'images/demo/desert-gold.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 32)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3,5 g', 3.5::numeric, 2690, null::int, 50, 'golden-cbg-hash-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('isolato-cbg-98', 'Isolato CBG 98 %', 'CBG'::public.linea, 'estratti', null, null, null, 'Isolato', null, null, true, '{"cbg":98.2}'::jsonb, 2490, null, 1, 'g'::public.unita, null, null, '{}'::text[], array['Neutro', 'Pulito', 'Inodore']::text[], 'Estrazione europea', 'Cristallo di CBG puro, certificato 0,0 % di THC. Base per formulazioni.', 'images/filiera/setacciatura.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 33)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 2490, null::int, 50, 'isolato-cbg-98-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('olio-cbn-notte', 'Olio CBN Notte 10 %', 'CBN'::public.linea, 'oli', null, null, 'Broad spectrum', null, null, null, true, '{"cbn":10.2,"cbd":5.1}'::jsonb, 3690, null, 10, 'ml'::public.unita, null, null, array['New']::text[], array['Erbaceo', 'Scuro', 'Morbido']::text[], 'Estrazione europea', 'Dieci millilitri a dominanza CBN, senza THC. Contagocce graduato.', 'images/prodotti/olio-cbn-notte.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 34)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('10 ml', 10::numeric, 3690, null::int, 50, 'olio-cbn-notte-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('isolato-cbn-97', 'Isolato CBN 97 %', 'CBN'::public.linea, 'estratti', null, null, null, 'Isolato', null, null, true, '{"cbn":97.4}'::jsonb, 2890, null, 1, 'g'::public.unita, null, null, '{}'::text[], array['Neutro', 'Pulito', 'Inodore']::text[], 'Estrazione europea', 'Cristallo di CBN puro, certificato 0,0 % di THC.', 'images/filiera/setacciatura.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 35)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 2890, null::int, 50, 'isolato-cbn-97-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('silver-haze-preroll', 'Silver Haze Pre-roll', 'CBD'::public.linea, 'preroll', null, null, 'Singolo', null, null, null, false, '{"cbd":18.4,"thc":0.18}'::jsonb, 690, null, 1, 'g'::public.unita, null, null, array['New']::text[], array['Agrumato', 'Pepato', 'Fresco']::text[], 'Coltivazione indoor europea', 'Un cono da 1 g di Silver Haze indoor, già pronto. Tiraggio regolare, filtro in carta.', 'images/prodotti/preroll-silver-haze.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 36)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 690, null::int, 50, 'silver-haze-preroll-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('amnesia-preroll', 'Amnesia Pre-roll', 'CBD'::public.linea, 'preroll', null, null, 'Singolo', null, null, null, false, '{"cbd":20.1,"thc":0.19}'::jsonb, 690, null, 1, 'g'::public.unita, null, null, '{}'::text[], array['Limone', 'Terroso', 'Speziato']::text[], 'Coltivazione indoor europea', 'Il classico sativa in un cono da 1 g. Solo cime, niente trim.', 'images/prodotti/preroll-amnesia.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 37)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 690, null::int, 50, 'amnesia-preroll-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('gelato-41-preroll', 'Gelato 41 Pre-roll', 'CBD'::public.linea, 'preroll', null, null, 'Singolo', null, null, null, false, '{"cbd":22.3,"thc":0.17}'::jsonb, 790, null, 1, 'g'::public.unita, null, null, array['Best seller']::text[], array['Dolce', 'Cremoso', 'Agrumato']::text[], 'Coltivazione indoor europea', 'Le cime del Gelato 41 macinate e rollate a mano. Il preroll più richiesto.', 'images/prodotti/preroll-gelato-41.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 38)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 790, null::int, 50, 'gelato-41-preroll-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('mimosa-thcx-preroll', 'Mimosa THC-X Pre-roll', 'THC-X'::public.linea, 'preroll', null, null, 'Singolo', null, null, null, false, '{"thcx":40.2,"cbd":3.1}'::jsonb, 1490, null, 2, 'g'::public.unita, null, null, array['Limited drop']::text[], array['Arancia', 'Tropicale', 'Frizzante']::text[], 'Coltivazione indoor europea', 'Un cono da 2 g della linea THC-X: effetto pieno, profumo di arancia.', 'images/prodotti/preroll-mimosa.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 39)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('2 g', 2::numeric, 1490, null::int, 50, 'mimosa-thcx-preroll-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('purple-punch-thcx-preroll', 'Purple Punch THC-X Pre-roll', 'THC-X'::public.linea, 'preroll', null, null, 'Singolo', null, null, null, false, '{"thcx":40.4,"cbd":2.6}'::jsonb, 1490, null, 2, 'g'::public.unita, null, null, array['New']::text[], array['Uva', 'Dolce', 'Morbido']::text[], 'Coltivazione indoor europea', 'Indica della linea THC-X, cono da 2 g. Per la sera.', 'images/prodotti/preroll-purple-punch.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 40)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('2 g', 2::numeric, 1490, null::int, 50, 'purple-punch-thcx-preroll-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('amnesia-haze-thcx-vape', 'Amnesia Haze THC-X Vape', 'THC-X'::public.linea, 'vape', null, null, 'Vape pen', null, null, null, false, '{"thcx":95.2}'::jsonb, 2990, null, 0.5, 'ml'::public.unita, null, null, array['New']::text[], array['Agrumato', 'Pepato', 'Fresco']::text[], 'Distillato europeo', 'Penna usa e getta da 0,5 ml: distillato di THC-X al 95 % con i terpeni dell’Amnesia Haze.', 'images/prodotti/vape-amnesia-thcx.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 41)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('0,5 ml', 0.5::numeric, 2990, null::int, 50, 'amnesia-haze-thcx-vape-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('gelato-41-thca-vape', 'Gelato 41 THC-A Vape', 'THC-A'::public.linea, 'vape', null, null, 'Vape pen', null, null, null, false, '{"thca":90.4,"thc":0.19}'::jsonb, 3290, null, 0.5, 'ml'::public.unita, null, null, '{}'::text[], array['Dolce', 'Cremoso', 'Agrumato']::text[], 'Distillato europeo', 'Penna da 0,5 ml della linea THC-A, gusto Gelato 41. Vendibile solo dove la legge lo consente.', 'images/prodotti/vape-gelato-thca.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 42)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('0,5 ml', 0.5::numeric, 3290, null::int, 50, 'gelato-41-thca-vape-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('lemon-haze-vape', 'Lemon Haze CBD Vape', 'CBD'::public.linea, 'vape', null, null, 'Vape pen', null, null, null, false, '{"cbd":85.3,"cbg":2.1,"thc":0.18}'::jsonb, 2490, null, 0.5, 'ml'::public.unita, null, null, array['Best seller']::text[], array['Limone', 'Fresco', 'Dolce']::text[], 'Estrazione europea', 'Penna da 0,5 ml di CBD full spectrum all’85 %, terpeni della Lemon Haze. Circa 300 tiri.', 'images/prodotti/vape-lemon-haze.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 43)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('0,5 ml', 0.5::numeric, 2490, null::int, 50, 'lemon-haze-vape-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('notte-cbn-vape', 'Blueberry Notte Vape', 'CBN'::public.linea, 'vape', null, null, 'Vape pen', null, null, null, true, '{"cbd":40.1,"cbn":30.2}'::jsonb, 2690, null, 0.5, 'ml'::public.unita, null, null, '{}'::text[], array['Mirtillo', 'Dolce', 'Morbido']::text[], 'Estrazione europea', 'CBD e CBN insieme, senza THC, gusto mirtillo: la penna da 0,5 ml per chiudere la giornata.', 'images/prodotti/vape-notte.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 44)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('0,5 ml', 0.5::numeric, 2690, null::int, 50, 'notte-cbn-vape-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('zkittlez-thcx-cartuccia', 'Zkittlez THC-X Cartuccia', 'THC-X'::public.linea, 'vape', null, null, 'Cartuccia', null, null, null, false, '{"thcx":95.1}'::jsonb, 3490, null, 1, 'ml'::public.unita, null, null, array['New']::text[], array['Frutti rossi', 'Caramella', 'Tropicale']::text[], 'Distillato europeo', 'Cartuccia da 1 ml con attacco 510, THC-X al 95 %. Per le batterie standard.', 'images/prodotti/vape-zkittlez.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 45)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 ml', 1::numeric, 3490, null::int, 50, 'zkittlez-thcx-cartuccia-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('wedding-cake-thca-cartuccia', 'Wedding Cake THC-A Cartuccia', 'THC-A'::public.linea, 'vape', null, null, 'Cartuccia', null, null, null, false, '{"thca":92.3,"thc":0.19}'::jsonb, 3690, null, 1, 'ml'::public.unita, null, null, '{}'::text[], array['Vaniglia', 'Pepe', 'Terroso']::text[], 'Distillato europeo', 'Cartuccia 510 da 1 ml della linea THC-A. Vendibile solo dove la legge lo consente.', 'images/prodotti/cartuccia-wedding-cake-thca.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 46)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 ml', 1::numeric, 3690, null::int, 50, 'wedding-cake-thca-cartuccia-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('mango-kush-cbd-cartuccia', 'Mango Kush CBD Cartuccia', 'CBD'::public.linea, 'vape', null, null, 'Cartuccia', null, null, null, false, '{"cbd":85.1,"cbg":2.4,"thc":0.17}'::jsonb, 2990, null, 1, 'ml'::public.unita, null, null, '{}'::text[], array['Mango', 'Tropicale', 'Dolce']::text[], 'Estrazione europea', 'Cartuccia 510 da 1 ml di CBD full spectrum, gusto Mango Kush.', 'images/prodotti/cartuccia-mango-kush-cbd.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 47)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 ml', 1::numeric, 2990, null::int, 50, 'mango-kush-cbd-cartuccia-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('purple-punch-cbn-cartuccia', 'Purple Punch CBD+CBN Cartuccia', 'CBN'::public.linea, 'vape', null, null, 'Cartuccia', null, null, null, true, '{"cbd":40.3,"cbn":30.1}'::jsonb, 3190, null, 1, 'ml'::public.unita, null, null, '{}'::text[], array['Uva', 'Dolce', 'Morbido']::text[], 'Estrazione europea', 'Cartuccia 510 da 1 ml: CBD e CBN, senza THC, gusto Purple Punch. La formula della sera.', 'images/prodotti/cartuccia-purple-punch-cbn.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 48)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 ml', 1::numeric, 3190, null::int, 0, 'purple-punch-cbn-cartuccia-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('green-apple-gummies', 'Green Apple Gummies', 'CBD'::public.linea, 'edibles', null, null, 'Gommose', null, null, null, false, '{}'::jsonb, 1690, null, 10, 'pz'::public.unita, null, '10 mg', array['New']::text[], array['Mela verde', 'Aspro', 'Zuccherato']::text[], 'Produzione europea', 'Dieci gommose alla mela verde, 10 mg di CBD ciascuna: 100 mg nella busta.', 'images/prodotti/edibles-green-apple.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 49)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('10 pz', 10::numeric, 1690, null::int, 50, 'green-apple-gummies-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('mango-kush-gommose', 'Mango Kush Gummies', 'THC-X'::public.linea, 'edibles', null, null, 'Gommose', null, null, null, false, '{}'::jsonb, 1990, null, 10, 'pz'::public.unita, null, '10 mg', array['Best seller']::text[], array['Mango', 'Dolce', 'Succoso']::text[], 'Produzione europea', 'Dieci gommose al mango, 10 mg di THC-X ciascuna. Si parte da mezza.', 'images/prodotti/edibles-mango.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 50)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('10 pz', 10::numeric, 1990, null::int, 50, 'mango-kush-gommose-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('watermelon-gommose', 'Watermelon Gummies', 'THC-X'::public.linea, 'edibles', null, null, 'Gommose', null, null, null, false, '{}'::jsonb, 1990, null, 10, 'pz'::public.unita, null, '10 mg', '{}'::text[], array['Anguria', 'Fresco', 'Zuccherato']::text[], 'Produzione europea', 'Dieci gommose all’anguria, 10 mg di THC-X ciascuna, dosate una per una.', 'images/prodotti/edibles-watermelon.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 51)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('10 pz', 10::numeric, 1990, null::int, 50, 'watermelon-gommose-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('lemon-drop-caramelle', 'Lemon Drop Caramelle', 'CBD'::public.linea, 'edibles', null, null, 'Caramelle', null, null, null, true, '{}'::jsonb, 1690, null, 20, 'pz'::public.unita, null, '25 mg', '{}'::text[], array['Limone', 'Aspro', 'Dolce']::text[], 'Produzione europea', 'Venti caramelle dure al limone, 25 mg di CBD ciascuna, senza THC.', 'images/prodotti/edibles-lemon-drop.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 52)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('20 pz', 20::numeric, 1690, null::int, 50, 'lemon-drop-caramelle-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('lemon-haze-semi', 'Lemon Haze Semi', null, 'semi', null, null, 'Femminizzati', null, null, null, false, '{"thc":25,"cbd":2}'::jsonb, 2990, null, 3, 'pz'::public.unita, '3 semi', null, array['Best seller']::text[], array['Sativa', 'Indoor e outdoor', '10 settimane']::text[], 'Genetica selezionata dal gruppo', 'Sativa agrumata, femminizzata. La genetica che sta dietro al nostro hash più venduto.', 'images/prodotti/semi-lemon-haze.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Semi venduti come articolo da collezione e conservazione genetica, dove la legge lo consente. La coltivazione è soggetta alle norme del Paese di destinazione. Le percentuali indicano il potenziale della genetica, non del seme.', 53)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3 semi', 3::numeric, 2990, null::int, 50, 'lemon-haze-semi-1', 0),
  ('5 semi', 5::numeric, 4630, null::int, 50, 'lemon-haze-semi-2', 1),
  ('10 semi', 10::numeric, 8070, null::int, 50, 'lemon-haze-semi-3', 2)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('gorilla-glue-semi', 'Gorilla Glue Semi', null, 'semi', null, null, 'Femminizzati', null, null, null, false, '{"thc":27,"cbd":1}'::jsonb, 3290, null, 3, 'pz'::public.unita, '3 semi', null, array['New']::text[], array['Ibrida', 'Molto resinosa', '9 settimane']::text[], 'Genetica selezionata dal gruppo', 'Tra le genetiche più resinose al mondo: cime dense e appiccicose, profumo di pino e caffè.', 'images/prodotti/semi-gorilla-glue.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Semi venduti come articolo da collezione e conservazione genetica, dove la legge lo consente. La coltivazione è soggetta alle norme del Paese di destinazione. Le percentuali indicano il potenziale della genetica, non del seme.', 54)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3 semi', 3::numeric, 3290, null::int, 50, 'gorilla-glue-semi-1', 0),
  ('5 semi', 5::numeric, 5100, null::int, 50, 'gorilla-glue-semi-2', 1),
  ('10 semi', 10::numeric, 8880, null::int, 50, 'gorilla-glue-semi-3', 2)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('wedding-cake-semi', 'Wedding Cake Semi', null, 'semi', null, null, 'Femminizzati', null, null, null, false, '{"thc":26,"cbd":1}'::jsonb, 3290, null, 3, 'pz'::public.unita, '3 semi', null, '{}'::text[], array['Indica', 'Indoor', '9 settimane']::text[], 'Genetica selezionata dal gruppo', 'Indica dal profilo dolce di vaniglia e pepe. Resa alta anche in spazi piccoli.', 'images/prodotti/semi-wedding-cake.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Semi venduti come articolo da collezione e conservazione genetica, dove la legge lo consente. La coltivazione è soggetta alle norme del Paese di destinazione. Le percentuali indicano il potenziale della genetica, non del seme.', 55)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3 semi', 3::numeric, 3290, null::int, 50, 'wedding-cake-semi-1', 0),
  ('5 semi', 5::numeric, 5100, null::int, 50, 'wedding-cake-semi-2', 1),
  ('10 semi', 10::numeric, 8880, null::int, 50, 'wedding-cake-semi-3', 2)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('runtz-semi', 'Runtz Semi', null, 'semi', null, null, 'Femminizzati', null, null, null, false, '{"thc":24,"cbd":1}'::jsonb, 3490, null, 3, 'pz'::public.unita, '3 semi', null, array['Limited drop']::text[], array['Ibrida', 'Indoor', '8 settimane']::text[], 'Genetica selezionata dal gruppo', 'La genetica caramella degli ultimi anni: colori viola, profumo di frutta e zucchero.', 'images/prodotti/semi-runtz.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Semi venduti come articolo da collezione e conservazione genetica, dove la legge lo consente. La coltivazione è soggetta alle norme del Paese di destinazione. Le percentuali indicano il potenziale della genetica, non del seme.', 56)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3 semi', 3::numeric, 3490, null::int, 50, 'runtz-semi-1', 0),
  ('5 semi', 5::numeric, 5410, null::int, 50, 'runtz-semi-2', 1),
  ('10 semi', 10::numeric, 9420, null::int, 50, 'runtz-semi-3', 2)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('og-kush-semi', 'OG Kush Semi', null, 'semi', null, null, 'Autofiorenti', null, null, null, false, '{"thc":23,"cbd":1}'::jsonb, 2790, null, 3, 'pz'::public.unita, '3 semi', null, '{}'::text[], array['Ibrida', 'Autofiorente', '10 settimane']::text[], 'Genetica selezionata dal gruppo', 'Il classico californiano in versione autofiorente: fiorisce da solo, senza cambiare le ore di luce.', 'images/prodotti/semi-og-kush.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Semi venduti come articolo da collezione e conservazione genetica, dove la legge lo consente. La coltivazione è soggetta alle norme del Paese di destinazione. Le percentuali indicano il potenziale della genetica, non del seme.', 57)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3 semi', 3::numeric, 2790, null::int, 50, 'og-kush-semi-1', 0),
  ('5 semi', 5::numeric, 4320, null::int, 50, 'og-kush-semi-2', 1),
  ('10 semi', 10::numeric, 7530, null::int, 50, 'og-kush-semi-3', 2)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('acdc-semi', 'ACDC Semi', 'CBD'::public.linea, 'semi', null, null, 'Femminizzati', null, null, null, false, '{"cbd":20,"thc":1}'::jsonb, 2690, null, 3, 'pz'::public.unita, '3 semi', null, array['New']::text[], array['Sativa', 'Outdoor', '9 settimane']::text[], 'Genetica selezionata dal gruppo', 'Genetica a dominanza CBD, rapporto 20:1. La base delle nostre coltivazioni light.', 'images/prodotti/semi-acdc.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Semi venduti come articolo da collezione e conservazione genetica, dove la legge lo consente. La coltivazione è soggetta alle norme del Paese di destinazione. Le percentuali indicano il potenziale della genetica, non del seme.', 58)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3 semi', 3::numeric, 2690, null::int, 50, 'acdc-semi-1', 0),
  ('5 semi', 5::numeric, 4170, null::int, 50, 'acdc-semi-2', 1),
  ('10 semi', 10::numeric, 7260, null::int, 50, 'acdc-semi-3', 2)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('critical-mass-cbd-semi', 'Critical Mass CBD Semi', 'CBD'::public.linea, 'semi', null, null, 'Autofiorenti', null, null, null, false, '{"cbd":16,"thc":1}'::jsonb, 2490, null, 3, 'pz'::public.unita, '3 semi', null, '{}'::text[], array['Indica', 'Outdoor', '8 settimane']::text[], 'Genetica selezionata dal gruppo', 'Critical Mass ricca di CBD, autofiorente: la più facile da coltivare, anche al primo tentativo.', 'images/prodotti/semi-critical-mass-cbd.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Semi venduti come articolo da collezione e conservazione genetica, dove la legge lo consente. La coltivazione è soggetta alle norme del Paese di destinazione. Le percentuali indicano il potenziale della genetica, non del seme.', 59)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3 semi', 3::numeric, 2490, null::int, 50, 'critical-mass-cbd-semi-1', 0),
  ('5 semi', 5::numeric, 3860, null::int, 50, 'critical-mass-cbd-semi-2', 1),
  ('10 semi', 10::numeric, 6720, null::int, 50, 'critical-mass-cbd-semi-3', 2)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('lemon-haze-cloni', 'Lemon Haze Cloni', null, 'cloni', null, null, 'Talea radicata', null, null, null, false, '{}'::jsonb, 4990, null, 5, 'pz'::public.unita, 'Vaschetta da 5', null, array['Best seller']::text[], array['Sativa', 'Radicate', 'Pronte al trapianto']::text[], 'Dalle piante madri del gruppo', 'Cinque talee radicate di Lemon Haze in cubetti di lana di roccia. Spedite in 24 ore, pronte da trapiantare.', 'images/prodotti/cloni-lemon-haze.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Piante vive, vendute solo dove la legge lo consente e solo a maggiorenni. La coltivazione è soggetta alle norme del Paese di destinazione.', 60)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 talea', 1::numeric, 1190, null::int, 50, 'lemon-haze-cloni-1', 0),
  ('Vaschetta da 5', 5::numeric, 4990, null::int, 50, 'lemon-haze-cloni-2', 1),
  ('2 vaschette', 10::numeric, 9230, null::int, 50, 'lemon-haze-cloni-3', 2)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('gelato-41-cloni', 'Gelato 41 Cloni', null, 'cloni', null, null, 'Talea radicata', null, null, null, false, '{}'::jsonb, 5490, null, 5, 'pz'::public.unita, 'Vaschetta da 5', null, array['New']::text[], array['Ibrida', 'Radicate', 'Pronte al trapianto']::text[], 'Dalle piante madri del gruppo', 'Cinque talee dalla pianta madre del nostro Gelato 41. Radici bianche, foglie sane, spedite in 24 ore.', 'images/prodotti/cloni-gelato-41.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Piante vive, vendute solo dove la legge lo consente e solo a maggiorenni. La coltivazione è soggetta alle norme del Paese di destinazione.', 61)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 talea', 1::numeric, 1310, null::int, 50, 'gelato-41-cloni-1', 0),
  ('Vaschetta da 5', 5::numeric, 5490, null::int, 50, 'gelato-41-cloni-2', 1),
  ('2 vaschette', 10::numeric, 10160, null::int, 50, 'gelato-41-cloni-3', 2)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('runtz-cloni', 'Runtz Cloni', null, 'cloni', null, null, 'Talea radicata', null, null, null, false, '{}'::jsonb, 5490, null, 5, 'pz'::public.unita, 'Vaschetta da 5', null, '{}'::text[], array['Ibrida', 'Radicate', 'Pronte al trapianto']::text[], 'Dalle piante madri del gruppo', 'Cinque talee radicate di Runtz, la genetica caramella. Scatola ventilata, spedizione in 24 ore.', 'images/prodotti/cloni-runtz.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Piante vive, vendute solo dove la legge lo consente e solo a maggiorenni. La coltivazione è soggetta alle norme del Paese di destinazione.', 62)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 talea', 1::numeric, 1310, null::int, 0, 'runtz-cloni-1', 0),
  ('Vaschetta da 5', 5::numeric, 5490, null::int, 0, 'runtz-cloni-2', 1),
  ('2 vaschette', 10::numeric, 10160, null::int, 0, 'runtz-cloni-3', 2)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('acdc-cbd-cloni', 'ACDC CBD Cloni', 'CBD'::public.linea, 'cloni', null, null, 'Talea radicata', null, null, null, false, '{}'::jsonb, 4490, null, 5, 'pz'::public.unita, 'Vaschetta da 5', null, '{}'::text[], array['Sativa', 'Radicate', 'Pronte al trapianto']::text[], 'Dalle piante madri del gruppo', 'Cinque talee di ACDC, genetica a dominanza CBD. La base delle nostre coltivazioni light.', 'images/prodotti/cloni-acdc.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Piante vive, vendute solo dove la legge lo consente e solo a maggiorenni. La coltivazione è soggetta alle norme del Paese di destinazione.', 63)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 talea', 1::numeric, 1070, null::int, 50, 'acdc-cbd-cloni-1', 0),
  ('Vaschetta da 5', 5::numeric, 4490, null::int, 50, 'acdc-cbd-cloni-2', 1),
  ('2 vaschette', 10::numeric, 8310, null::int, 50, 'acdc-cbd-cloni-3', 2)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('harlequin-cbd-cloni', 'Harlequin CBD Cloni', 'CBD'::public.linea, 'cloni', null, null, 'Talea radicata', null, null, null, false, '{}'::jsonb, 4490, null, 5, 'pz'::public.unita, 'Vaschetta da 5', null, array['New']::text[], array['Sativa', 'Radicate', 'Pronte al trapianto']::text[], 'Dalle piante madri del gruppo', 'Cinque talee di Harlequin, rapporto CBD e THC 5:2 nella genetica. Robusta, facile da coltivare.', 'images/prodotti/cloni-harlequin.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Piante vive, vendute solo dove la legge lo consente e solo a maggiorenni. La coltivazione è soggetta alle norme del Paese di destinazione.', 64)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 talea', 1::numeric, 1070, null::int, 50, 'harlequin-cbd-cloni-1', 0),
  ('Vaschetta da 5', 5::numeric, 4490, null::int, 50, 'harlequin-cbd-cloni-2', 1),
  ('2 vaschette', 10::numeric, 8310, null::int, 50, 'harlequin-cbd-cloni-3', 2)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('gelato-41-cannagar', 'Gelato 41 Cannagar', 'CBD'::public.linea, 'cannagar', null, null, 'Classico', null, null, null, false, '{"cbd":21.4,"thc":0.18}'::jsonb, 2490, null, 3, 'g'::public.unita, null, null, array['New']::text[], array['Dolce', 'Cremoso', 'Tostato']::text[], 'Coltivazione indoor europea', 'Tre grammi di cime di Gelato 41 pressate su un bastoncino di legno e avvolte in foglie di palma. Dura come un sigaro.', 'images/prodotti/cannagar-gelato-41.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 65)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3 g', 3::numeric, 2490, null::int, 50, 'gelato-41-cannagar-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('royal-cannagar', 'Royal Cannagar', 'CBD'::public.linea, 'cannagar', null, null, 'Con hash', null, null, null, false, '{"cbd":28.1,"thc":0.19}'::jsonb, 3490, null, 4, 'g'::public.unita, null, null, array['Limited drop']::text[], array['Speziato', 'Pieno', 'Legnoso']::text[], 'Coltivazione indoor europea', 'Il nostro cannagar più ricco: cime di fiore con un’anima di Royal Hash al centro. Da dividere.', 'images/prodotti/cannagar-royal.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 66)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('4 g', 4::numeric, 3490, null::int, 50, 'royal-cannagar-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('mimosa-thcx-cannagar', 'Mimosa THC-X Cannagar', 'THC-X'::public.linea, 'cannagar', null, null, 'Con hash', null, null, null, false, '{"thcx":42.3,"cbd":3.4}'::jsonb, 3990, null, 4, 'g'::public.unita, null, null, '{}'::text[], array['Arancia', 'Tropicale', 'Resinoso']::text[], 'Coltivazione indoor europea', 'Cannagar della linea THC-X, con hash al centro. Effetto pieno, fumata lunga.', 'images/prodotti/cannagar-mimosa.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 67)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('4 g', 4::numeric, 3990, null::int, 50, 'mimosa-thcx-cannagar-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('zkittlez-thca', 'Zkittlez THC-A', 'THC-A'::public.linea, 'fiori', 'Indoor', 'Big Bud', null, null, null, null, false, '{"thca":24.6,"thc":0.19}'::jsonb, 3490, null, 3.5, 'g'::public.unita, null, null, array['New']::text[], array['Frutti rossi', 'Caramella', 'Dolce']::text[], 'Coltivazione indoor europea', 'Fiore della linea THC-A: cime grandi, profumo di caramella. Vendibile solo dove la legge lo consente.', 'images/demo/flower-macro-2.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 68)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3,5 g', 3.5::numeric, 3490, null::int, 50, 'zkittlez-thca-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('runtz-thca-hash', 'Runtz THC-A', 'THC-A'::public.linea, 'hash', null, null, null, 'Frozen sift', 'Morbido', 'Giallo', false, '{"thca":38.2,"thc":0.19}'::jsonb, 3990, null, 3.5, 'g'::public.unita, null, null, '{}'::text[], array['Dolce', 'Fruttato', 'Cremoso']::text[], 'Lavorazione europea', 'Hash frozen sift della linea THC-A, morbido e chiaro. Vendibile solo dove la legge lo consente.', 'images/demo/hash-macro.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 69)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('3,5 g', 3.5::numeric, 3990, null::int, 50, 'runtz-thca-hash-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('og-kush-thca-preroll', 'OG Kush THC-A Pre-roll', 'THC-A'::public.linea, 'preroll', null, null, 'Singolo', null, null, null, false, '{"thca":26.1,"thc":0.19}'::jsonb, 990, null, 1, 'g'::public.unita, null, null, '{}'::text[], array['Terroso', 'Pino', 'Limone']::text[], 'Coltivazione indoor europea', 'Un cono da 1 g di OG Kush della linea THC-A. Vendibile solo dove la legge lo consente.', 'images/prodotti/preroll-og-kush-thca.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, 'Prodotto riservato ai maggiori di 18 anni. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.', 70)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 g', 1::numeric, 990, null::int, 50, 'og-kush-thca-preroll-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('roll-kit', 'Roll Kit', null, 'fumo', null, null, null, null, null, null, false, '{}'::jsonb, 2490, 3050, 1, 'pz'::public.unita, 'Kit completo', null, array['New']::text[], array['Grinder', 'Cartine e filtri', 'Clipper e vassoio']::text[], 'The Hasher', 'Tutto per rollare in una scatola: grinder, cartine, filtri, clipper e vassoio. Il regalo facile.', 'images/merch/roll-kit.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 71)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('Kit completo', 1::numeric, 2490, 3050::int, 50, 'roll-kit-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('grinder-hasher', 'Grinder The Hasher', null, 'fumo', null, null, null, null, null, null, false, '{}'::jsonb, 590, null, 1, 'pz'::public.unita, '1 pz', null, array['Best seller']::text[], array['Tre parti', 'Ø 60 mm', 'Nero e giallo']::text[], 'The Hasher', 'Grinder in plastica rigida a tre parti, con il raccoglitore di polline. Logo inciso sul coperchio.', 'images/merch/grinder.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 72)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 pz', 1::numeric, 590, null::int, 50, 'grinder-hasher-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('cartine-king-size', 'Cartine King Size Slim', null, 'fumo', null, null, null, null, null, null, false, '{}'::jsonb, 190, null, 1, 'pz'::public.unita, 'Libretto da 32', null, '{}'::text[], array['Carta sottile', 'Non sbiancata', '32 fogli']::text[], 'The Hasher', 'Cartine lunghe e sottili, carta non sbiancata. Libretto nero con il logo in giallo.', 'images/merch/cartine.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 73)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('Libretto da 32', 1::numeric, 190, null::int, 50, 'cartine-king-size-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('filtri-hasher', 'Filtri in carta', null, 'fumo', null, null, null, null, null, null, false, '{}'::jsonb, 150, null, 1, 'pz'::public.unita, 'Libretto da 50', null, '{}'::text[], array['Pretagliati', 'Carta spessa', '50 filtri']::text[], 'The Hasher', 'Cinquanta filtri pretagliati in carta spessa. Si arrotolano in un attimo.', 'images/merch/filtri.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 74)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('Libretto da 50', 1::numeric, 150, null::int, 50, 'filtri-hasher-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('clipper-hasher', 'Clipper The Hasher', null, 'fumo', null, null, null, null, null, null, false, '{}'::jsonb, 290, null, 1, 'pz'::public.unita, '1 pz', null, '{}'::text[], array['Ricaricabile', 'Pietrina', 'Pressino']::text[], 'The Hasher', 'L’accendino ricaricabile con il pressino nella pietrina. Stampato con il nostro logo.', 'images/merch/clipper.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 75)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('Nero', 1::numeric, 290, null::int, 50, 'clipper-hasher-1', 0),
  ('Giallo', 1::numeric, 290, null::int, 50, 'clipper-hasher-2', 1),
  ('Pack da 4', 4::numeric, 990, null::int, 50, 'clipper-hasher-3', 2)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('porta-clipper', 'Porta Clipper', null, 'fumo', null, null, null, null, null, null, false, '{}'::jsonb, 890, null, 1, 'pz'::public.unita, '1 pz', null, '{}'::text[], array['Metallo', 'Moschettone', 'Logo inciso']::text[], 'The Hasher', 'Guscio in metallo per il Clipper, con moschettone. Non lo perdi più.', 'images/merch/porta-clipper.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 76)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 pz', 1::numeric, 890, null::int, 50, 'porta-clipper-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('vassoio-rollare', 'Vassoio per rollare', null, 'fumo', null, null, null, null, null, null, false, '{}'::jsonb, 1490, null, 1, 'pz'::public.unita, '1 pz', null, '{}'::text[], array['Metallo', '27 × 16 cm', 'Bordi rialzati']::text[], 'The Hasher', 'Vassoio in metallo stampato, bordi rialzati: niente finisce sul tavolo.', 'images/merch/vassoio.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 77)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 pz', 1::numeric, 1490, null::int, 50, 'vassoio-rollare-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('coni-king-size', 'Coni King Size', null, 'fumo', null, null, null, null, null, null, false, '{}'::jsonb, 490, null, 1, 'pz'::public.unita, 'Pack da 6', null, '{}'::text[], array['Pronti', 'Con filtro', 'Da riempire']::text[], 'The Hasher', 'Sei coni già arrotolati con il filtro: si riempiono e si chiudono.', 'images/merch/coni.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 78)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('Pack da 6', 1::numeric, 490, null::int, 50, 'coni-king-size-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('tubi-porta-preroll', 'Tubi porta preroll', null, 'fumo', null, null, null, null, null, null, false, '{}'::jsonb, 690, null, 1, 'pz'::public.unita, 'Pack da 3', null, '{}'::text[], array['Anti-odore', 'Tappo a pressione', 'Pack da 3']::text[], 'The Hasher', 'Tre tubi con tappo a pressione: il preroll resta intero e l’odore resta dentro.', 'images/merch/tubi.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 79)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('Pack da 3', 1::numeric, 690, null::int, 50, 'tubi-porta-preroll-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('busta-anti-odore', 'Busta anti-odore', null, 'fumo', null, null, null, null, null, null, false, '{}'::jsonb, 1290, null, 1, 'pz'::public.unita, '1 pz', null, '{}'::text[], array['Carbone attivo', 'Zip', '18 × 12 cm']::text[], 'The Hasher', 'Busta con strato ai carboni attivi e zip: in tasca, in borsa, in viaggio.', 'images/merch/busta.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 80)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('1 pz', 1::numeric, 1290, null::int, 0, 'busta-anti-odore-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('t-shirt-good-plants', 'T-shirt Good Plants', null, 'abbigliamento', null, null, null, null, null, null, false, '{}'::jsonb, 2900, null, 1, 'pz'::public.unita, 'Taglie S–XL', null, array['New']::text[], array['Cotone bio', 'Stampa serigrafica', 'Oversize']::text[], 'The Hasher', 'T-shirt nera oversize, logo sul petto e «Good plants. Brighter days.» sulla schiena.', 'images/merch/t-shirt.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 81)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('S', 1::numeric, 2900, null::int, 50, 't-shirt-good-plants-1', 0),
  ('M', 1::numeric, 2900, null::int, 50, 't-shirt-good-plants-2', 1),
  ('L', 1::numeric, 2900, null::int, 50, 't-shirt-good-plants-3', 2),
  ('XL', 1::numeric, 2900, null::int, 0, 't-shirt-good-plants-4', 3)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('felpa-hasher', 'Felpa The Hasher', null, 'abbigliamento', null, null, null, null, null, null, false, '{}'::jsonb, 5900, null, 1, 'pz'::public.unita, 'Taglie S–XL', null, '{}'::text[], array['Cappuccio', 'Cotone felpato', 'Ricamo']::text[], 'The Hasher', 'Felpa con cappuccio, cotone pesante, logo ricamato in giallo acido.', 'images/merch/felpa.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 82)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('S', 1::numeric, 5900, null::int, 50, 'felpa-hasher-1', 0),
  ('M', 1::numeric, 5900, null::int, 50, 'felpa-hasher-2', 1),
  ('L', 1::numeric, 5900, null::int, 50, 'felpa-hasher-3', 2),
  ('XL', 1::numeric, 5900, null::int, 50, 'felpa-hasher-4', 3)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('cappellino-hasher', 'Cappellino The Hasher', null, 'abbigliamento', null, null, null, null, null, null, false, '{}'::jsonb, 2400, null, 1, 'pz'::public.unita, 'Taglia unica', null, '{}'::text[], array['Ricamato', 'Regolabile', 'Taglia unica']::text[], 'The Hasher', 'Cappellino nero a sei spicchi, logo ricamato, chiusura regolabile.', 'images/merch/cappellino.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 83)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('Taglia unica', 1::numeric, 2400, null::int, 50, 'cappellino-hasher-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('skate-deck-hasher', 'Tavola skate The Hasher', null, 'skate', null, null, null, null, null, null, false, '{}'::jsonb, 6900, null, 1, 'pz'::public.unita, '8,25″', null, array['Limited drop']::text[], array['Acero canadese', '8,25″', 'Serie limitata']::text[], 'The Hasher', 'Tavola in acero canadese a sette strati, grafica The Hasher sotto. Serie numerata.', 'images/merch/skate.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 84)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('8,25″', 1::numeric, 6900, null::int, 50, 'skate-deck-hasher-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values ('sticker-pack', 'Sticker pack', null, 'skate', null, null, null, null, null, null, false, '{}'::jsonb, 490, null, 1, 'pz'::public.unita, '10 adesivi', null, '{}'::text[], array['Vinile', 'Resistenti all’acqua', '10 adesivi']::text[], 'The Hasher', 'Dieci adesivi in vinile, resistenti all’acqua: skate, laptop, casco, frigo.', 'images/merch/sticker.jpg', null, '[]'::jsonb, '{}'::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, null, null, null, null, 85)
  on conflict (slug) do nothing
  returning id
)
insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)
select p.id, v.* from p, (values
  ('10 adesivi', 1::numeric, 490, null::int, 50, 'sticker-pack-1', 0)
) as v(label, grams, price, compare_at, stock, sku, sort);

insert into public.shipping_countries (country_code, name, active, shipping_price, free_from) values
  ('IT', 'Italia', true, 590, 4900),
  ('DE', 'Germania', true, 590, 4900),
  ('AT', 'Austria', false, 590, 4900),
  ('FR', 'Francia', false, 590, 4900),
  ('ES', 'Spagna', false, 590, 4900),
  ('NL', 'Paesi Bassi', false, 590, 4900),
  ('BE', 'Belgio', false, 590, 4900),
  ('PT', 'Portogallo', false, 590, 4900),
  ('IE', 'Irlanda', false, 590, 4900),
  ('LU', 'Lussemburgo', false, 590, 4900)
on conflict (country_code) do nothing;

commit;
