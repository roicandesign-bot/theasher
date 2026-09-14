# 08 · Compliance, privacy e sicurezza

Nulla di quanto segue sostituisce una consulenza legale. Le voci marcate **⚖️ DA VERIFICARE** richiedono conferma di un consulente locale prima della pubblicazione.

## Predisposizioni implementate nel sistema

| Tema                       | Implementazione                                                                                                                                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Age gate 18+               | Dialog al primo accesso, per mercato (`CountryRule.requiresAgeGate`, età minima configurabile), scelta salvata in cookie e in `ConsentRecord` con versione. ⚖️ livello di verifica richiesto per Paese (autodichiarazione vs verifica documentale). |
| GDPR e consensi            | `ConsentRecord` con tipo, versione del testo, timestamp, IP troncato. Export dati (JSON) e cancellazione/anonimizzazione dall'area personale. Registro dei trattamenti fuori dal codice. ⚖️ base giuridica e tempi di conservazione degli ordini.   |
| Cookie banner              | Blocco preventivo: analytics e advertising non si caricano senza consenso; categorie (necessari, statistiche, marketing); preferenze modificabili dal footer; versione registrata.                                                                  |
| Marketing                  | Newsletter double opt-in; recupero carrello abbandonato e back-in-stock **solo** con consenso esplicito e link di disiscrizione.                                                                                                                    |
| Informazioni sul venditore | Blocco «Venditore» da `SiteSetting` (ragione sociale, P. IVA, sede, contatti) in footer, checkout, email, termini. ⚖️ dati reali dell'operatore.                                                                                                    |
| Testi legali               | Privacy, cookie, termini, informazioni legali e avvertenze come `ContentPage` di tipo `LEGAL`, per Paese e lingua, con data di versione. ⚖️ contenuti.                                                                                              |
| IVA                        | Aliquota per mercato in `CountryRule`, prezzi B2C IVA inclusa, riga IVA esplicita in carrello, checkout, conferma e fattura. ⚖️ regime OSS, aliquote applicabili ai prodotti, obblighi di fatturazione.                                             |
| Spedizioni e resi          | Pagine dedicate, tempi e costi mostrati prima del pagamento, regole resi configurabili. ⚖️ diritto di recesso per prodotti sigillati/deperibili.                                                                                                    |
| Tracciabilità              | Ogni riga d'ordine registra il lotto; ogni lotto ha analisi di laboratorio scaricabili.                                                                                                                                                             |
| Avvertenze di prodotto     | Campo `warnings` tradotto, mostrato in PDP, carrello ed email. ⚖️ testi obbligatori per Paese (es. limiti THC, "non per uso…").                                                                                                                     |
| Restrizioni per Paese      | `CountryRule.allowedProductTypes` + `ProductMarketAvailability`; il checkout rifiuta ciò che non è vendibile nel Paese di consegna. ⚖️ quali prodotti in quali Paesi.                                                                               |
| Claim                      | Linee guida di copy nel repo: nessuna cura, prevenzione o trattamento; lint dei contenuti con lista di termini vietati da rivedere (⚖️).                                                                                                            |
| Accessibilità              | WCAG 2.2 AA come obiettivo, test automatici (axe) + revisione manuale da tastiera.                                                                                                                                                                  |

## Sicurezza applicativa

- Password `argon2id`; sessioni server-side con cookie `HttpOnly Secure SameSite=Lax`, rotazione al login, scadenza, revoca da area personale.
- Server Actions con verifica dell'origine; token CSRF aggiuntivo sulle route API che accettano form.
- Rate limiting su login, registrazione, reset, checkout, ricerca, newsletter, webhook.
- Validazione Zod su ogni input server-side; rich text sanificato (allowlist); upload con controllo MIME reale, dimensione, nome generato, storage esterno.
- CSP con nonce (script), `frame-ancestors 'none'`, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Query solo via Prisma (parametrizzate); nessun SQL grezzo con input utente salvo full-text con parametri.
- Webhook firmati e idempotenti; idempotency key su ordini e pagamenti.
- RBAC con permessi granulari; operazioni sensibili (rimborsi, prezzi, permessi, cancellazioni) registrate in `AuditLog` con prima/dopo redatti.
- Segreti solo da variabili d'ambiente validate all'avvio (`src/lib/env.ts`); `.env.example` documentato; nessun segreto nel repo.
- Log strutturati con redazione (email, indirizzi, token); errori in produzione generici, dettagli solo nei log.
- Backup: script `pg_dump` giornaliero documentato in `docs/deploy.md`; migrazioni reversibili dove possibile.
- Dipendenze bloccate dal lockfile, `npm audit` in CI.
