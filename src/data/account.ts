/** Dati DEMO dell'area cliente: ordini, indirizzi, profilo. Nessun dato reale. */
export const cliente = {
  nome: 'Marco',
  cognome: 'Rossi',
  email: 'marco.rossi@example.com',
  dal: 'marzo 2026',
}

export type StatoOrdine = 'In preparazione' | 'Spedito' | 'Consegnato' | 'In attesa di pagamento'

export const ordini = [
  {
    numero: 'TH-2609-4471',
    data: '26 settembre 2026',
    stato: 'Spedito' as StatoOrdine,
    totale: 4980,
    corriere: 'BRT',
    tracking: 'BRT4471902213',
    articoli: [
      { slug: 'lemon-haze', nome: 'Lemon Haze', formato: '3,5 g', quantita: 1, prezzo: 2490 },
      { slug: 'royal-hash', nome: 'Royal Hash', formato: '3,5 g', quantita: 1, prezzo: 2490 },
    ],
    indirizzo: 'Via Roma 12, 20121 Milano, Italia',
    timeline: [
      { stato: 'Ordine ricevuto', data: '26 set, 18:42', fatto: true },
      { stato: 'Pagamento confermato', data: '26 set, 18:43', fatto: true },
      { stato: 'In preparazione', data: '27 set, 09:10', fatto: true },
      { stato: 'Spedito', data: '27 set, 16:30', fatto: true },
      { stato: 'In consegna', data: 'previsto 29 set', fatto: false },
      { stato: 'Consegnato', data: '', fatto: false },
    ],
  },
  {
    numero: 'TH-2508-3120',
    data: '14 agosto 2026',
    stato: 'Consegnato' as StatoOrdine,
    totale: 7470,
    corriere: 'BRT',
    tracking: 'BRT3120884510',
    articoli: [
      { slug: 'desert-gold', nome: 'Desert Gold', formato: '3,5 g', quantita: 2, prezzo: 2490 },
      { slug: 'silver-haze', nome: 'Silver Haze', formato: '3,5 g', quantita: 1, prezzo: 2190 },
    ],
    indirizzo: 'Via Roma 12, 20121 Milano, Italia',
    timeline: [
      { stato: 'Ordine ricevuto', data: '14 ago, 11:02', fatto: true },
      { stato: 'Pagamento confermato', data: '14 ago, 11:03', fatto: true },
      { stato: 'In preparazione', data: '14 ago, 15:20', fatto: true },
      { stato: 'Spedito', data: '15 ago, 09:45', fatto: true },
      { stato: 'Consegnato', data: '18 ago, 10:12', fatto: true },
    ],
  },
  {
    numero: 'TH-2507-2088',
    data: '3 luglio 2026',
    stato: 'Consegnato' as StatoOrdine,
    totale: 2490,
    corriere: 'BRT',
    tracking: 'BRT2088471003',
    articoli: [
      { slug: 'lemon-haze', nome: 'Lemon Haze', formato: '3,5 g', quantita: 1, prezzo: 2490 },
    ],
    indirizzo: 'Via Roma 12, 20121 Milano, Italia',
    timeline: [
      { stato: 'Ordine ricevuto', data: '3 lug, 20:15', fatto: true },
      { stato: 'Consegnato', data: '7 lug, 09:30', fatto: true },
    ],
  },
]

export const indirizzi = [
  {
    id: 'casa',
    etichetta: 'Casa',
    predefinito: true,
    righe: ['Marco Rossi', 'Via Roma 12', '20121 Milano (MI)', 'Italia', '+39 333 1234567'],
  },
  {
    id: 'ufficio',
    etichetta: 'Ufficio',
    predefinito: false,
    righe: ['Marco Rossi', 'Corso Buenos Aires 45', '20124 Milano (MI)', 'Italia'],
  },
]
