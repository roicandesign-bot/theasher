# 07 · Pagamenti

## Principio

Nessun provider è "acceso" per default. Il sito funziona da subito con l'adapter **bonifico bancario** (ordine `PENDING` → l'admin conferma la ricezione → `PAID`) e con l'adapter **sandbox** (solo sviluppo e test, visibilmente marcato). I PSP a carta si attivano solo quando esiste un contratto che copre la categoria CBD nei Paesi serviti.

## Interfaccia `PaymentProvider`

```ts
interface PaymentProvider {
  id: 'sandbox' | 'bank-transfer' | 'stripe' | string
  isAvailable(ctx: { market: string; currency: string; total: number }): Promise<boolean>
  createPayment(input: {
    order: OrderSnapshot
    idempotencyKey: string
    returnUrl: string
  }): Promise<
    | { kind: 'redirect'; url: string; providerRef: string }
    | { kind: 'client-secret'; secret: string; providerRef: string }
    | { kind: 'instructions'; providerRef: string; instructions: LocalizedText }
  >
  capture?(providerRef: string, amount?: number): Promise<PaymentResult>
  refund(input: {
    providerRef: string
    amount: number
    reason: string
    idempotencyKey: string
  }): Promise<RefundResult>
  verifyWebhook(
    req: Request,
  ): Promise<{ eventId: string; type: WebhookType; providerRef: string; payload: unknown }>
}
```

## Stati e transizioni

Ordine e pagamento sono separati. `Payment`: `REQUIRES_ACTION → AUTHORIZED → CAPTURED` oppure `→ FAILED / CANCELLED`, poi `DISPUTED` o rimborsi parziali/totali. L'ordine passa a `PAID` solo su evento verificato (webhook o conferma manuale con permesso), mai sulla base del redirect del browser.

## Garanzie

- **Idempotenza**: il checkout genera una chiave al primo invio; ordine e pagamento la conservano; un doppio click o un retry restituisce lo stesso ordine.
- **Webhook**: firma verificata con il segreto del provider; `eventId` salvato prima dell'elaborazione; eventi fuori ordine tollerati (stato finale calcolato, non incrementale); retry del provider = no-op.
- **Inventario**: prenotato alla creazione del pagamento, confermato a `CAPTURED`, rilasciato a `FAILED`/timeout (cron).
- **Nessun dato carta** transita o viene salvato: i form carta sono ospitati dal provider (Elements/redirect).
- **Rimborsi**: sempre via adapter, con permesso `orders.refund`, motivo obbligatorio, audit log.

## Adapter previsti

| Adapter                                                   | Stato                                                            | Note                                                                                      |
| --------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `bank-transfer`                                           | attivo                                                           | istruzioni IBAN in conferma ed email; conferma manuale in admin                           |
| `sandbox`                                                 | solo `NODE_ENV !== 'production'`                                 | simula successo/fallimento/3DS per test e2e                                               |
| `stripe`                                                  | implementato, **disabilitato** (`PAYMENTS_STRIPE_ENABLED=false`) | Payment Intents + webhook; attivare solo dopo approvazione della categoria per ogni Paese |
| altri (Mollie, Adyen, Viva Wallet, PSP specializzati CBD) | interfaccia pronta                                               | da valutare in base ai contratti                                                          |

**Verifiche richieste al brand**: quale PSP ha (o può ottenere) l'approvazione per CBD nei Paesi di lancio; PayPal e alcuni wallet vietano espressamente la categoria.
