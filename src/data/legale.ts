/**
 * Pagine di servizio e legali.
 * ATTENZIONE: i testi legali sono bozze di struttura, non testi validi.
 * Vanno riscritti e firmati da un consulente legale prima del lancio.
 */
export type PaginaTesto = {
  slug: string
  eyebrow: string
  titolo: string
  lead: string
  /** true quando il testo va validato da un legale prima della pubblicazione */
  daValidare?: boolean
  aggiornato: string
  sezioni: { titolo: string; paragrafi: string[]; elenco?: string[] }[]
}

export const pagineTesto: PaginaTesto[] = [
  {
    slug: 'spedizioni',
    eyebrow: 'Servizio',
    titolo: 'Spedizioni',
    lead: 'Dove arriviamo, quanto ci mettiamo, quanto costa. Nessun costo compare dopo il pagamento.',
    aggiornato: 'settembre 2026',
    sezioni: [
      {
        titolo: 'Dove spediamo',
        paragrafi: [
          'Spediamo nei Paesi dell’Unione Europea dove i nostri prodotti sono vendibili. L’elenco aggiornato compare al checkout: se un Paese non c’è, non possiamo ancora servirlo.',
          'Le regole cambiano da Paese a Paese. Se una referenza non è vendibile alla tua destinazione te lo diciamo nel carrello, prima di pagare, non dopo.',
        ],
      },
      {
        titolo: 'Tempi',
        paragrafi: [
          'Prepariamo l’ordine entro 24 ore lavorative. La consegna richiede in genere 48–72 ore lavorative dalla partenza, a seconda del Paese.',
          'Gli ordini pagati con bonifico partono quando il bonifico risulta accreditato.',
        ],
      },
      {
        titolo: 'Costi',
        paragrafi: [
          'Il costo esatto compare nel carrello e al checkout, prima di qualunque pagamento. Sopra la soglia indicata nel carrello la spedizione è gratuita.',
        ],
        elenco: [
          'Standard tracciata: 5,90 €, 48–72 ore',
          'Express: 9,90 €, 24–48 ore',
          'Gratuita sopra la soglia indicata nel carrello',
        ],
      },
      {
        titolo: 'Imballo',
        paragrafi: [
          'Confezione anonima e sigillata, senza riferimenti al contenuto all’esterno. Dentro trovi il documento di trasporto e il riferimento al lotto.',
        ],
      },
      {
        titolo: 'Se qualcosa va storto',
        paragrafi: [
          'Se il pacco risulta consegnato ma non lo hai ricevuto, scrivici entro 7 giorni: apriamo noi la pratica con il corriere.',
          'Se arriva danneggiato, fotografa l’imballo prima di aprirlo e mandaci le foto: facciamo la sostituzione senza discussioni.',
        ],
      },
    ],
  },
  {
    slug: 'resi',
    eyebrow: 'Servizio',
    titolo: 'Resi e rimborsi',
    lead: 'Quando si può restituire, come si fa, quando arriva il rimborso.',
    daValidare: true,
    aggiornato: 'settembre 2026',
    sezioni: [
      {
        titolo: 'Diritto di recesso',
        paragrafi: [
          'Hai 14 giorni dalla consegna per cambiare idea, se la confezione è integra e ancora sigillata.',
          'I prodotti sigillati che sono stati aperti non sono restituibili per ragioni igieniche e di sicurezza, come previsto dalla normativa sui contratti a distanza.',
        ],
      },
      {
        titolo: 'Come si fa',
        paragrafi: [
          'Scrivi a ordini@thehasher.com indicando il numero d’ordine e quali articoli vuoi restituire. Ti mandiamo le istruzioni entro un giorno lavorativo.',
          'Le spese di restituzione sono a tuo carico, tranne nei casi di prodotto errato o danneggiato.',
        ],
      },
      {
        titolo: 'Rimborsi',
        paragrafi: [
          'Il rimborso arriva entro 14 giorni dalla ricezione del reso, sullo stesso metodo di pagamento usato per l’ordine.',
          'Se il reso arriva incompleto o con la confezione manomessa possiamo ridurre il rimborso in proporzione.',
        ],
      },
      {
        titolo: 'Prodotto difettoso',
        paragrafi: [
          'Se il prodotto presenta un difetto, hai diritto alla sostituzione o al rimborso secondo la garanzia legale di conformità. Scrivici con foto e numero di lotto.',
        ],
      },
    ],
  },
  {
    slug: 'pagamenti',
    eyebrow: 'Servizio',
    titolo: 'Pagamenti',
    lead: 'Come si paga, dove finiscono i dati, cosa succede se qualcosa non va.',
    aggiornato: 'settembre 2026',
    sezioni: [
      {
        titolo: 'Metodi accettati',
        paragrafi: ['Al checkout trovi i metodi disponibili per il tuo Paese.'],
        elenco: [
          'Carta di credito e debito',
          'Bonifico bancario: l’ordine resta in attesa fino all’accredito',
          'Wallet (Apple Pay, Google Pay) dove disponibili',
        ],
      },
      {
        titolo: 'Sicurezza',
        paragrafi: [
          'I dati della carta non passano mai dai nostri sistemi: il modulo di pagamento è ospitato dal fornitore autorizzato, che è l’unico a trattarli.',
          'Le transazioni usano autenticazione forte dove richiesta dalla normativa.',
        ],
      },
      {
        titolo: 'IVA e prezzi',
        paragrafi: [
          'Tutti i prezzi sono IVA inclusa. L’aliquota applicata dipende dal Paese di consegna e compare nel riepilogo prima del pagamento.',
        ],
      },
      {
        titolo: 'Pagamento non riuscito',
        paragrafi: [
          'Se il pagamento non va a buon fine l’ordine resta in attesa e non viene addebitato nulla. Puoi riprovare con un altro metodo dal link che ricevi via email.',
        ],
      },
    ],
  },
  {
    slug: 'privacy',
    eyebrow: 'Legale',
    titolo: 'Informativa privacy',
    lead: 'Che dati raccogliamo, perché, per quanto tempo e come puoi intervenire.',
    daValidare: true,
    aggiornato: 'settembre 2026',
    sezioni: [
      {
        titolo: 'Titolare del trattamento',
        paragrafi: [
          'Il titolare è la società indicata nelle informazioni legali. Dati societari e contatti del responsabile della protezione dei dati vanno inseriti prima della pubblicazione.',
        ],
      },
      {
        titolo: 'Quali dati trattiamo',
        paragrafi: ['Trattiamo solo i dati che servono a gestire l’ordine e il rapporto con te.'],
        elenco: [
          'Dati di contatto e di spedizione forniti al checkout',
          'Dati dell’ordine e dei pagamenti (mai i dati completi della carta)',
          'Dati di navigazione, solo con il tuo consenso per le categorie non necessarie',
          'Consensi espressi, con data e versione del testo accettato',
        ],
      },
      {
        titolo: 'Perché li trattiamo',
        paragrafi: [
          'Per eseguire il contratto di vendita, per adempiere agli obblighi fiscali e, dove hai dato il consenso, per inviarti comunicazioni commerciali.',
        ],
      },
      {
        titolo: 'Per quanto tempo',
        paragrafi: [
          'I dati dell’ordine sono conservati per il periodo previsto dagli obblighi fiscali. I dati di marketing fino alla revoca del consenso.',
        ],
      },
      {
        titolo: 'I tuoi diritti',
        paragrafi: [
          'Puoi chiedere accesso, rettifica, cancellazione, limitazione e portabilità dei dati, e opporti al trattamento. Dall’area cliente puoi esportare o cancellare i tuoi dati.',
          'Puoi revocare il consenso in qualunque momento e proporre reclamo all’autorità di controllo.',
        ],
      },
    ],
  },
  {
    slug: 'cookie',
    eyebrow: 'Legale',
    titolo: 'Cookie policy',
    lead: 'Cosa usiamo per far funzionare il sito e cosa parte solo se dici di sì.',
    daValidare: true,
    aggiornato: 'settembre 2026',
    sezioni: [
      {
        titolo: 'Cookie necessari',
        paragrafi: [
          'Servono a far funzionare il sito: sessione, carrello, preferenze di lingua e Paese, sicurezza. Non richiedono consenso e non si possono disattivare.',
        ],
      },
      {
        titolo: 'Statistiche',
        paragrafi: [
          'Ci dicono quali pagine funzionano e quali no, in forma aggregata. Partono solo dopo il tuo consenso.',
        ],
      },
      {
        titolo: 'Marketing',
        paragrafi: [
          'Servono a misurare le campagne e a mostrarti annunci pertinenti. Partono solo dopo il tuo consenso e puoi revocarlo quando vuoi.',
        ],
      },
      {
        titolo: 'Come cambiare idea',
        paragrafi: [
          'Dal collegamento “Preferenze cookie” in fondo a ogni pagina puoi rivedere le tue scelte in qualsiasi momento.',
        ],
      },
    ],
  },
  {
    slug: 'termini',
    eyebrow: 'Legale',
    titolo: 'Termini e condizioni di vendita',
    lead: 'Le regole del contratto tra te e noi.',
    daValidare: true,
    aggiornato: 'settembre 2026',
    sezioni: [
      {
        titolo: 'Chi vende',
        paragrafi: [
          'Il venditore è la società indicata nelle informazioni legali, che va completata con ragione sociale, sede, partita IVA e numero di iscrizione.',
        ],
      },
      {
        titolo: 'Come si conclude il contratto',
        paragrafi: [
          'Il contratto si conclude quando ricevi la conferma d’ordine via email. Fino a quel momento l’ordine è solo una proposta d’acquisto.',
          'Ci riserviamo di non accettare ordini incompleti, sospetti o provenienti da Paesi in cui non possiamo vendere.',
        ],
      },
      {
        titolo: 'Prezzi e disponibilità',
        paragrafi: [
          'I prezzi sono IVA inclusa. La disponibilità mostrata è quella reale del magazzino: se un prodotto si esaurisce durante il checkout te lo diciamo prima del pagamento.',
        ],
      },
      {
        titolo: 'Età minima',
        paragrafi: [
          'La vendita è riservata ai maggiori di 18 anni. Possiamo annullare ordini quando abbiamo ragionevole dubbio sull’età dell’acquirente.',
        ],
      },
      {
        titolo: 'Legge applicabile',
        paragrafi: [
          'Il contratto è regolato dalla legge del Paese del venditore, fatte salve le tutele inderogabili previste per i consumatori nel loro Paese di residenza.',
        ],
      },
    ],
  },
  {
    slug: 'legale',
    eyebrow: 'Legale',
    titolo: 'Informazioni legali e avvertenze',
    lead: 'Chi siamo dal punto di vista societario e cosa devi sapere sui prodotti.',
    daValidare: true,
    aggiornato: 'settembre 2026',
    sezioni: [
      {
        titolo: 'Dati del venditore',
        paragrafi: [
          'Ragione sociale, sede legale, partita IVA, iscrizione al registro delle imprese, capitale sociale, PEC e contatti: da completare prima della pubblicazione.',
        ],
      },
      {
        titolo: 'Avvertenze di prodotto',
        paragrafi: ['Valgono per tutti i prodotti in catalogo.'],
        elenco: [
          'Prodotti riservati ai maggiori di 18 anni',
          'Non destinati alla combustione né al consumo alimentare',
          'Tenere fuori dalla portata di bambini e animali domestici',
          'Conservare in luogo fresco, asciutto e al riparo dalla luce',
          'Le informazioni sui prodotti non costituiscono indicazioni mediche',
        ],
      },
      {
        titolo: 'Nessun claim terapeutico',
        paragrafi: [
          'Non attribuiamo ai nostri prodotti proprietà di cura, prevenzione o trattamento di malattie. Qualunque affermazione in questo senso trovata online non proviene da noi.',
        ],
      },
      {
        titolo: 'Differenze tra Paesi',
        paragrafi: [
          'Le norme su vendita, trasporto e detenzione cambiano da Paese a Paese. È responsabilità dell’acquirente verificare cosa è ammesso dove risiede.',
        ],
      },
    ],
  },
]
