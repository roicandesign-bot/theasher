# Supabase · The Hasher

Progetto: `ykmhjuraaxxatnksxljg` (regione UE). Piano generale in `docs/11-lovable-supabase.md`.

| File                                            | Cosa fa                                                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `migrations/20260930120000_schema_iniziale.sql` | Tabelle, regole di accesso (RLS), bucket per foto e analisi                              |
| `seed.sql`                                      | Il catalogo demo del prototipo. Si rigenera con `npm run seed` da `src/data/products.ts` |

## Chi può fare cosa

- **Visitatore**: legge catalogo, formati, analisi, Paesi di spedizione.
- **Cliente**: in più legge e modifica il suo profilo (non il ruolo), i suoi indirizzi, legge i suoi ordini.
- **Admin** (`profiles.role = 'admin'`): gestisce catalogo, sconti, ordini. Il ruolo si assegna
  dalla dashboard Supabase (Table Editor → `profiles`), mai dal sito.
- **Ordini**: nessuno li crea dal browser. Li scriverà la funzione di checkout (M4), che ricalcola i
  prezzi lato server.

## Da decidere

- `country_rules` è vuota: cosa non si vende in quale Paese lo decide il legale (es. fiori in Italia,
  DL 48/2025).
- Spedizione demo: 5,90 €, gratis da 49 €, attivi solo IT e DE.

Verificato il 2026-09-30 su PostgreSQL 16 locale con uno stub di `auth`: schema e seed senza errori,
86 prodotti e 121 formati; anonimo non vede ordini, cliente vede solo i suoi e non può farsi admin né
cambiare prezzi o creare ordini, l'admin sì.
