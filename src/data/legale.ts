/**
 * Pagine di servizio e legali di The Hasher.
 * Testi completi scritti per un venditore con sede in Italia che vende a consumatori nell'UE.
 * Riferimenti: Codice del Consumo (D.Lgs. 206/2005), GDPR (Reg. UE 2016/679), Codice Privacy
 * (D.Lgs. 196/2003), Linee guida cookie del Garante (10 giugno 2021), direttiva Omnibus (D.Lgs. 26/2023).
 * Le parti tra parentesi quadre sono i dati della società da inserire prima del lancio.
 * Mappa dei rischi per prodotto e Paese: design/LEGALE.md.
 */
export type PaginaTesto = {
  slug: string
  eyebrow: 'Servizio' | 'Legale'
  titolo: string
  lead: string
  /** true quando la pagina contiene dati della società ancora da inserire */
  daCompletare?: boolean
  aggiornato: string
  sezioni: { titolo: string; paragrafi: string[]; elenco?: string[] }[]
}

/** Dati del venditore: un solo posto da compilare, si aggiornano tutte le pagine. */
export const titolare = {
  ragioneSociale: '[Ragione sociale]',
  sede: '[Indirizzo della sede legale]',
  piva: '[Partita IVA]',
  rea: '[Numero REA e Camera di Commercio]',
  capitale: '[Capitale sociale versato]',
  pec: '[PEC]',
  email: 'info@thehasher.com',
  ordini: 'ordini@thehasher.com',
  privacy: 'privacy@thehasher.com',
  b2b: 'b2b@thehasher.com',
  sito: 'thehasher.com',
}

const T = titolare
const AGG = '28 settembre 2026'

export const pagineTesto: PaginaTesto[] = [
  /* ================================================================ SERVIZIO */
  {
    slug: 'spedizioni',
    eyebrow: 'Servizio',
    titolo: 'Spedizioni',
    lead: 'Dove arriviamo, in quanto tempo, quanto costa. Nessun costo compare dopo il pagamento.',
    aggiornato: AGG,
    sezioni: [
      {
        titolo: 'Dove spediamo',
        paragrafi: [
          'Spediamo nei Paesi dell’Unione Europea in cui i singoli prodotti sono vendibili. Il Paese di consegna si sceglie all’inizio: il catalogo mostra solo ciò che possiamo spedirti, e se nel carrello c’è un articolo non vendibile nella tua destinazione te lo diciamo prima del pagamento.',
          'Non spediamo fuori dall’Unione Europea, a caselle postali o a punti di ritiro che non permettono la verifica dell’età, quando la legge del Paese la richiede.',
        ],
      },
      {
        titolo: 'Tempi',
        paragrafi: [
          'Gli ordini pagati entro le 13:00 di un giorno lavorativo partono lo stesso giorno; gli altri il giorno lavorativo successivo. Con il bonifico l’ordine parte quando l’accredito risulta sul nostro conto.',
          'Dalla partenza, la consegna richiede in genere 24–48 ore in Italia e 48–96 ore nel resto dell’UE. Sono tempi indicativi del corriere: se un ritardo supera i 30 giorni dall’ordine puoi annullare l’acquisto e ricevere il rimborso completo (art. 61 Codice del Consumo).',
        ],
      },
      {
        titolo: 'Costi',
        paragrafi: [
          'Il costo della spedizione è calcolato nel carrello, prima del pagamento, in base al Paese e al peso. Sopra la soglia indicata nel carrello la spedizione standard è gratuita.',
        ],
        elenco: [
          'Standard tracciata: da 5,90 €',
          'Express: da 9,90 €',
          'Gratuita sopra la soglia indicata nel carrello',
          'Cloni: solo express in scatola ventilata, dal lunedì al mercoledì, per non far passare il fine settimana alle piante in magazzino',
        ],
      },
      {
        titolo: 'Imballo discreto',
        paragrafi: [
          'Confezione neutra e sigillata, senza loghi né riferimenti al contenuto all’esterno. Sul pacco compare solo la ragione sociale del mittente, come richiesto dai corrieri. Dentro trovi il documento di trasporto e, per ogni prodotto, il numero di lotto.',
        ],
      },
      {
        titolo: 'Consegna e verifica dell’età',
        paragrafi: [
          'I nostri prodotti sono venduti solo a maggiorenni. Dove la legge lo richiede, o quando il corriere lo prevede, il pacco va consegnato di persona al destinatario, che può essere chiamato a mostrare un documento.',
          'Se il pacco torna indietro perché il destinatario non era maggiorenne o non ha voluto mostrare il documento, rimborsiamo il prodotto trattenendo il solo costo della spedizione.',
        ],
      },
      {
        titolo: 'Pacco danneggiato o non arrivato',
        paragrafi: [
          'Il rischio di perdita o danneggiamento passa a te solo quando ricevi il pacco (art. 63 Codice del Consumo). Fino a quel momento è un problema nostro.',
          'Se il pacco arriva danneggiato, fotografalo prima di aprirlo e scrivici: lo sostituiamo. Se risulta consegnato ma non l’hai ricevuto, scrivici entro 7 giorni: apriamo noi la pratica con il corriere.',
        ],
      },
    ],
  },
  {
    slug: 'resi',
    eyebrow: 'Servizio',
    titolo: 'Resi, recesso e garanzia',
    lead: 'Quando puoi restituire un prodotto, come si fa e quando arriva il rimborso. Scritto per essere capito, conforme al Codice del Consumo.',
    aggiornato: AGG,
    sezioni: [
      {
        titolo: 'Il diritto di recesso',
        paragrafi: [
          'Se acquisti come consumatore hai 14 giorni per recedere dal contratto senza dover dare spiegazioni (artt. 52 e seguenti del Codice del Consumo). Il termine parte dal giorno in cui ricevi i prodotti; se l’ordine arriva in più pacchi, dal giorno in cui ricevi l’ultimo.',
          'Per recedere basta comunicarcelo prima della scadenza, con una dichiarazione chiara: una mail a ' +
            T.ordini +
            ', il modulo nell’area cliente o il modulo tipo che trovi in fondo a questa pagina.',
        ],
      },
      {
        titolo: 'Quando il recesso non si applica',
        paragrafi: [
          'La legge esclude il recesso per alcuni beni (art. 59 del Codice del Consumo). Nel nostro catalogo sono questi:',
        ],
        elenco: [
          'Prodotti sigillati aperti dopo la consegna: fiori, hash, estratti, preroll, cannagar, oli, vape, cartucce ed edibles hanno un sigillo di garanzia. Non si prestano a essere restituiti per motivi igienici e di tutela della salute: una volta aperto il sigillo, il recesso non è più possibile (lettera e).',
          'Cloni: sono piante vive, che si deteriorano rapidamente. Il recesso è escluso (lettera d). Resta la garanzia se arrivano non conformi: vedi sotto.',
          'Prodotti personalizzati su tua richiesta (lettera c), per esempio stampe o incisioni fatte su misura.',
          'Semi, merch e accessori si possono restituire se sono integri, nella confezione originale e non usati.',
        ],
      },
      {
        titolo: 'Come restituire',
        paragrafi: [
          'Dopo la comunicazione hai altri 14 giorni per spedirci i prodotti. Ti mandiamo noi l’etichetta del corriere: il costo del reso è a tuo carico e lo detraiamo dal rimborso, salvo che il reso dipenda da un nostro errore o da un prodotto difettoso.',
          'Sei responsabile solo della diminuzione di valore dovuta a un uso diverso da quello necessario per verificare la natura e le caratteristiche del prodotto (art. 57).',
        ],
      },
      {
        titolo: 'Il rimborso',
        paragrafi: [
          'Rimborsiamo tutto quello che hai pagato, compresa la spedizione standard dell’ordine, entro 14 giorni dal giorno in cui riceviamo la tua comunicazione (art. 56). Possiamo trattenere il rimborso finché non riceviamo i prodotti o la prova che li hai spediti.',
          'Il rimborso avviene sullo stesso mezzo di pagamento usato per l’acquisto, senza costi per te. Se hai scelto una spedizione più cara della standard, rimborsiamo solo il costo della standard.',
        ],
      },
      {
        titolo: 'Garanzia legale di conformità',
        paragrafi: [
          'Tutti i prodotti sono coperti dalla garanzia legale di conformità per 2 anni dalla consegna (artt. 128 e seguenti del Codice del Consumo). Se un prodotto non è conforme a quanto descritto, se il contenuto non corrisponde al certificato di analisi del lotto o se arriva danneggiato, hai diritto alla sostituzione o, se non è possibile, al rimborso. È gratuito e vale anche per i prodotti aperti.',
          'Per i cloni la conformità si verifica all’arrivo: se una talea arriva senza radici, secca o malata, mandaci una foto entro 48 ore dalla consegna e la sostituiamo o la rimborsiamo.',
        ],
      },
      {
        titolo: 'Modulo tipo di recesso',
        paragrafi: [
          'Compila e invia questo modulo solo se vuoi recedere dal contratto (Allegato I, parte B, Codice del Consumo).',
          'Destinatario: ' + T.ragioneSociale + ', ' + T.sede + ', ' + T.ordini + '.',
          'Con la presente notifico il recesso dal mio contratto di vendita dei seguenti beni: [prodotti]. Ordinato il [data] / ricevuto il [data]. Numero d’ordine: [TH-…]. Nome del consumatore: [nome e cognome]. Indirizzo: [indirizzo]. Firma (solo se il modulo è inviato su carta). Data: [data].',
        ],
      },
    ],
  },
  {
    slug: 'pagamenti',
    eyebrow: 'Servizio',
    titolo: 'Pagamenti',
    lead: 'Metodi accettati, sicurezza, fatture. Il prezzo che vedi è quello che paghi.',
    aggiornato: AGG,
    sezioni: [
      {
        titolo: 'Metodi accettati',
        paragrafi: [
          'Carta di credito e di debito, Apple Pay, Google Pay e bonifico bancario. I metodi disponibili possono cambiare in base al Paese di consegna e compaiono al checkout.',
        ],
      },
      {
        titolo: 'Sicurezza',
        paragrafi: [
          'I pagamenti con carta sono gestiti da un fornitore di servizi di pagamento autorizzato e certificato PCI DSS. I dati della carta non passano e non restano sui nostri sistemi. Quando la banca lo richiede, il pagamento va confermato con l’autenticazione forte prevista dalla direttiva PSD2 (per esempio nell’app della banca).',
        ],
      },
      {
        titolo: 'Prezzi, IVA e fattura',
        paragrafi: [
          'I prezzi sono in euro e comprendono l’IVA del Paese di consegna. Le spese di spedizione sono indicate a parte nel carrello, prima del pagamento.',
          'Con ogni ordine ricevi la ricevuta via email. Se ti serve la fattura, inserisci i dati fiscali al checkout: la emettiamo in formato elettronico.',
        ],
      },
      {
        titolo: 'Bonifico',
        paragrafi: [
          'Se scegli il bonifico, teniamo i prodotti da parte per 5 giorni lavorativi. Se l’accredito non arriva entro questo termine l’ordine si annulla da solo, senza costi.',
        ],
      },
      {
        titolo: 'Pagamento non riuscito o addebito doppio',
        paragrafi: [
          'Se il pagamento non va a buon fine l’ordine non viene creato e non ti addebitiamo nulla. Un’eventuale pre-autorizzazione sulla carta si annulla da sola nei tempi della tua banca. Per un addebito doppio scrivici con il numero d’ordine: rimborsiamo la differenza entro 5 giorni lavorativi.',
        ],
      },
    ],
  },

  /* ================================================================ LEGALE */
  {
    slug: 'termini',
    eyebrow: 'Legale',
    titolo: 'Condizioni generali di vendita',
    lead:
      'Le regole del contratto tra te e noi quando compri su ' +
      T.sito +
      '. Valgono per gli acquisti dei consumatori; per rivenditori e aziende ci sono condizioni dedicate.',
    daCompletare: true,
    aggiornato: AGG,
    sezioni: [
      {
        titolo: '1. Chi vende',
        paragrafi: [
          'Il venditore è ' +
            T.ragioneSociale +
            ', con sede in ' +
            T.sede +
            ', partita IVA ' +
            T.piva +
            ', ' +
            T.rea +
            ', PEC ' +
            T.pec +
            ', email ' +
            T.email +
            ' (di seguito «The Hasher» o «noi»).',
        ],
      },
      {
        titolo: '2. A chi vendiamo',
        paragrafi: [
          'Vendiamo solo a persone maggiorenni, cioè che hanno compiuto 18 anni o l’età superiore richiesta dalla legge del loro Paese. Entrando nel sito e ordinando dichiari di esserlo. Possiamo chiedere un documento e annullare l’ordine se la maggiore età non risulta.',
          'Queste condizioni si applicano quando acquisti come consumatore, per scopi estranei alla tua attività professionale. Se acquisti come azienda si applicano le Condizioni per rivenditori.',
        ],
      },
      {
        titolo: '3. I prodotti e la legge del tuo Paese',
        paragrafi: [
          'Vendiamo prodotti derivati da varietà di canapa iscritte nel Catalogo comune europeo, con un contenuto di THC entro i limiti di legge, e accessori. Ogni lotto è analizzato da un laboratorio indipendente e il certificato è disponibile nella pagina del prodotto.',
          'Le regole sulla canapa non sono uguali in tutta Europa. Mostriamo e spediamo ogni prodotto solo nei Paesi in cui, per quanto ci risulta, è vendibile. Resta tua responsabilità rispettare le norme del luogo in cui detieni o usi il prodotto: se viaggi, verifica le regole del Paese di arrivo.',
          'I prodotti non sono medicinali e non hanno finalità terapeutiche. Le istruzioni d’uso e le avvertenze sono nella pagina Avvertenze e uso dei prodotti e sulle confezioni: fanno parte di questo contratto.',
        ],
      },
      {
        titolo: '4. Come si conclude il contratto',
        paragrafi: [
          'Le pagine del sito non sono un’offerta vincolante ma un invito a ordinare. Il contratto si conclude quando ti mandiamo la mail di conferma d’ordine, che riepiloga prodotti, prezzi, spese, dati di consegna e queste condizioni. Conserva quella mail: è il tuo contratto.',
          'Prima di pagare puoi controllare e correggere ogni dato nel riepilogo. Il pulsante finale del checkout dice «Ordina con obbligo di pagamento»: premendolo accetti di pagare.',
          'Possiamo rifiutare o annullare un ordine, con rimborso immediato, se il prodotto non è vendibile nel Paese di consegna, se l’età non è verificabile, in caso di sospetta frode o di errore evidente nel prezzo.',
        ],
      },
      {
        titolo: '5. Prezzi e sconti',
        paragrafi: [
          'I prezzi sono in euro e comprendono l’IVA. Spese di spedizione ed eventuali costi del metodo di pagamento sono indicati prima della conferma. Il prezzo applicato è quello visibile al momento dell’ordine.',
          'Quando annunciamo una riduzione di prezzo, il prezzo barrato è il prezzo più basso che abbiamo applicato nei 30 giorni precedenti (art. 17-bis Codice del Consumo). Codici sconto e promozioni seguono il Regolamento sconti e promozioni.',
        ],
      },
      {
        titolo: '6. Pagamento, consegna, recesso e garanzia',
        paragrafi: [
          'Metodi di pagamento, tempi e costi di consegna, diritto di recesso e garanzia legale sono descritti nelle pagine Pagamenti, Spedizioni e Resi, recesso e garanzia, che fanno parte di queste condizioni.',
          'La proprietà dei prodotti passa a te al momento della consegna; il rischio di perdita o danneggiamento passa a te quando tu, o una persona da te indicata diversa dal corriere, entri in possesso del pacco.',
        ],
      },
      {
        titolo: '7. Uso corretto e responsabilità',
        paragrafi: [
          'Rispondiamo dei danni causati da nostro dolo o colpa grave e, in ogni caso, di quelli che la legge non consente di escludere, compresi i danni da prodotto difettoso (artt. 114 e seguenti Codice del Consumo). Non rispondiamo dei danni derivanti da un uso dei prodotti contrario alle avvertenze, alla legge o alle istruzioni, né della rivendita non autorizzata.',
          'Le immagini dei prodotti sono rappresentative: colore e aspetto dei prodotti naturali possono variare da un lotto all’altro. Fanno fede le caratteristiche indicate nella scheda e nel certificato di analisi del lotto.',
        ],
      },
      {
        titolo: '8. Account',
        paragrafi: [
          'L’account è personale. Custodisci la password e avvisaci se sospetti un uso non autorizzato. Possiamo sospendere un account in caso di violazione di queste condizioni, di frodi o di rivendita non autorizzata. Puoi chiudere il tuo account in qualunque momento dall’area cliente.',
        ],
      },
      {
        titolo: '9. Legge applicabile e foro',
        paragrafi: [
          'Il contratto è regolato dalla legge italiana. Se sei un consumatore residente in un altro Paese dell’UE, conservi la protezione delle norme inderogabili del tuo Paese (art. 6 Reg. CE 593/2008). Per le controversie è competente il giudice del luogo in cui risiedi (art. 66-bis Codice del Consumo).',
          'Prima di andare davanti a un giudice puoi scriverci: la maggior parte dei problemi si risolve in pochi giorni. Puoi anche rivolgerti a un organismo di risoluzione alternativa delle controversie (ADR) iscritto negli elenchi del tuo Paese.',
        ],
      },
      {
        titolo: '10. Modifiche',
        paragrafi: [
          'Possiamo aggiornare queste condizioni. Si applicano le condizioni in vigore al momento del tuo ordine, che trovi allegate alla mail di conferma.',
        ],
      },
    ],
  },
  {
    slug: 'privacy',
    eyebrow: 'Legale',
    titolo: 'Informativa privacy',
    lead: 'Quali dati trattiamo, perché, per quanto tempo, a chi li affidiamo e come puoi esercitare i tuoi diritti. Ai sensi degli articoli 13 e 14 del GDPR.',
    daCompletare: true,
    aggiornato: AGG,
    sezioni: [
      {
        titolo: 'Titolare del trattamento',
        paragrafi: [
          'Il titolare è ' +
            T.ragioneSociale +
            ', ' +
            T.sede +
            ', partita IVA ' +
            T.piva +
            '. Per qualunque domanda sulla privacy scrivi a ' +
            T.privacy +
            '. Rispondiamo entro 30 giorni, di solito molto prima.',
        ],
      },
      {
        titolo: 'Quali dati trattiamo',
        paragrafi: [],
        elenco: [
          'Dati per l’ordine: nome, cognome, indirizzi di spedizione e fatturazione, email, telefono, prodotti acquistati, dati fiscali se chiedi la fattura.',
          'Dati di pagamento: esito e riferimento della transazione. I numeri di carta li tratta solo il fornitore dei pagamenti, non noi.',
          'Maggiore età: la tua dichiarazione all’ingresso del sito e, solo se la legge o il corriere lo richiedono, la verifica del documento alla consegna. Non conserviamo copie dei documenti.',
          'Account: credenziali (la password è cifrata e nemmeno noi possiamo leggerla), preferiti, storico ordini, indirizzi salvati.',
          'Comunicazioni: i messaggi che ci mandi via email, modulo di contatto o chat.',
          'Rivenditori, ambassador e franchising: i dati aziendali e professionali che inserisci nelle candidature.',
          'Dati di navigazione: indirizzo IP, tipo di dispositivo e pagine visitate, raccolti dai cookie tecnici e, solo con il tuo consenso, da quelli statistici e di marketing (vedi Cookie policy).',
        ],
      },
      {
        titolo: 'Perché li trattiamo e su quale base',
        paragrafi: [],
        elenco: [
          'Gestire ordini, pagamenti, spedizioni, resi e assistenza: esecuzione del contratto (art. 6.1.b GDPR).',
          'Fatture, contabilità, verifiche fiscali e antiriciclaggio: obbligo di legge (art. 6.1.c).',
          'Verificare la maggiore età e che il prodotto sia vendibile nel tuo Paese: obbligo di legge e nostro legittimo interesse a vendere solo in modo lecito (art. 6.1.c e f).',
          'Prevenire frodi e proteggere il sito: legittimo interesse (art. 6.1.f).',
          'Newsletter e offerte: il tuo consenso (art. 6.1.a), che puoi revocare in ogni momento con un clic in fondo a ogni email.',
          'Se sei già cliente, possiamo scriverti all’email usata per l’acquisto a proposito di prodotti simili a quelli che hai comprato, anche senza consenso, finché non ti opponi (art. 130, comma 4, Codice Privacy). Ogni email contiene il link per smettere di riceverle.',
          'Valutare candidature di rivenditori, ambassador e franchisee: misure precontrattuali richieste da te (art. 6.1.b).',
          'Difendere i nostri diritti in caso di controversia: legittimo interesse (art. 6.1.f).',
        ],
      },
      {
        titolo: 'Per quanto tempo',
        paragrafi: [],
        elenco: [
          'Dati degli ordini e documenti contabili: 10 anni, come impone la legge (art. 2220 codice civile).',
          'Account: finché resta attivo; dopo 24 mesi di inattività ti avvisiamo e poi lo chiudiamo.',
          'Newsletter: finché non revochi il consenso; se non apri nessuna email per 24 mesi ti togliamo dalla lista.',
          'Messaggi all’assistenza: 24 mesi dalla chiusura della richiesta.',
          'Candidature non andate a buon fine: 12 mesi.',
          'Dati di navigazione: vedi la durata dei singoli cookie nella Cookie policy.',
        ],
      },
      {
        titolo: 'A chi li affidiamo',
        paragrafi: [
          'Non vendiamo i tuoi dati a nessuno. Li affidiamo solo ai fornitori che ci servono per lavorare, nominati responsabili del trattamento con un contratto (art. 28 GDPR), e solo per quello che serve:',
        ],
        elenco: [
          'Hosting del sito e del database, con server nell’Unione Europea.',
          'Fornitore dei pagamenti.',
          'Corrieri e magazzino, per la consegna.',
          'Servizio di invio email e newsletter.',
          'Commercialista e consulenti legali, tenuti al segreto professionale.',
          'Autorità pubbliche, solo quando la legge lo impone.',
        ],
      },
      {
        titolo: 'Trasferimenti fuori dall’UE',
        paragrafi: [
          'Preferiamo fornitori con server nell’Unione Europea. Se un fornitore tratta dati fuori dallo Spazio Economico Europeo, lo fa solo verso Paesi con una decisione di adeguatezza della Commissione (come gli Stati Uniti per le aziende aderenti al Data Privacy Framework) o con le clausole contrattuali standard approvate dalla Commissione. Puoi chiederci copia delle garanzie adottate.',
        ],
      },
      {
        titolo: 'I tuoi diritti',
        paragrafi: [
          'Puoi chiederci in qualunque momento, gratis, di accedere ai tuoi dati, correggerli, cancellarli, limitarne l’uso, riceverli in un formato leggibile per portarli altrove, e opporti al trattamento basato sul legittimo interesse o fatto per marketing (artt. 15–22 GDPR). Puoi revocare un consenso quando vuoi, senza conseguenze sui trattamenti fatti prima.',
          'Scrivi a ' +
            T.privacy +
            '. Se ritieni che il trattamento violi la legge puoi presentare reclamo al Garante per la protezione dei dati personali (garanteprivacy.it) o all’autorità del Paese in cui vivi.',
        ],
      },
      {
        titolo: 'Minori',
        paragrafi: [
          'Il sito è riservato ai maggiorenni. Non raccogliamo consapevolmente dati di minori: se scopriamo di averlo fatto, li cancelliamo.',
        ],
      },
      {
        titolo: 'Sicurezza',
        paragrafi: [
          'Connessione cifrata su tutto il sito, password cifrate, accessi ai dati limitati alle persone che ne hanno bisogno e registrati, copie di sicurezza cifrate. In caso di violazione dei dati che ti riguarda, avvisiamo il Garante entro 72 ore e te, quando la legge lo richiede.',
        ],
      },
      {
        titolo: 'Decisioni automatizzate',
        paragrafi: [
          'Non prendiamo decisioni che ti riguardano in modo solo automatico. I controlli antifrode sui pagamenti segnalano gli ordini sospetti, ma la decisione finale la prende una persona.',
        ],
      },
    ],
  },
  {
    slug: 'cookie',
    eyebrow: 'Legale',
    titolo: 'Cookie policy',
    lead: 'Quali cookie e strumenti simili usiamo, a cosa servono e come scegli tu. Conforme alle Linee guida del Garante del 10 giugno 2021.',
    aggiornato: AGG,
    sezioni: [
      {
        titolo: 'Cosa sono',
        paragrafi: [
          'I cookie sono piccoli file che il sito salva nel tuo browser. Usiamo anche strumenti simili, come la memoria locale del browser. In questa pagina li chiamiamo tutti «cookie».',
        ],
      },
      {
        titolo: 'La tua scelta',
        paragrafi: [
          'Alla prima visita il banner ti permette di accettare tutto, rifiutare tutto o scegliere per categoria. Chiudere il banner con la X equivale a rifiutare: restano solo i cookie tecnici. Scorrere la pagina non vale come consenso.',
          'Non ti riproponiamo il banner prima di 6 mesi, a meno che non cambino i cookie che usiamo. Puoi cambiare idea quando vuoi dal link «Preferenze cookie» in fondo a ogni pagina.',
        ],
      },
      {
        titolo: 'Cookie tecnici (sempre attivi)',
        paragrafi: [
          'Servono a far funzionare il sito e non richiedono consenso (art. 122 Codice Privacy). Non servono a profilarti.',
        ],
        elenco: [
          'hasher_age_ok: ricorda che hai confermato di essere maggiorenne. Dura fino alla chiusura del browser.',
          'hasher_consensi: ricorda le tue scelte sui cookie. Dura 6 mesi.',
          'hasher_popup_sconto: evita di mostrarti di nuovo l’invito alla newsletter. Dura 6 mesi.',
          'Carrello e sessione: tengono i prodotti nel carrello e ti mantengono connesso all’account. Durano fino al logout o 30 giorni.',
          'Pagamento e sicurezza: impostati dal fornitore dei pagamenti per prevenire le frodi durante il checkout.',
        ],
      },
      {
        titolo: 'Cookie statistici (con consenso)',
        paragrafi: [
          'Ci dicono quali pagine funzionano e quali no, in forma aggregata. Li attiviamo solo se li accetti. Se in futuro useremo uno strumento statistico configurato in modo anonimo (indirizzo IP mascherato, nessun incrocio con altri dati), come il Garante consente, lo tratteremo come tecnico e lo indicheremo qui.',
          'Strumento e fornitore, durata e link all’informativa del fornitore sono elencati qui quando lo strumento viene attivato.',
        ],
      },
      {
        titolo: 'Cookie di marketing (con consenso)',
        paragrafi: [
          'Servono a misurare le campagne e a mostrarti pubblicità in linea con i tuoi interessi su altri siti. Li attiviamo solo se li accetti. Nome, fornitore, durata e informativa di ciascuno sono elencati qui quando vengono attivati.',
        ],
      },
      {
        titolo: 'Come gestirli dal browser',
        paragrafi: [
          'Oltre al banner puoi cancellare o bloccare i cookie dalle impostazioni del browser (Chrome, Safari, Firefox, Edge). Se blocchi quelli tecnici, carrello e checkout potrebbero non funzionare.',
        ],
      },
      {
        titolo: 'Titolare e diritti',
        paragrafi: [
          'Il titolare del trattamento è ' +
            T.ragioneSociale +
            '. Per i diritti sui tuoi dati vedi l’Informativa privacy o scrivi a ' +
            T.privacy +
            '.',
        ],
      },
    ],
  },
  {
    slug: 'avvertenze',
    eyebrow: 'Legale',
    titolo: 'Avvertenze e uso dei prodotti',
    lead: 'Cosa sono i nostri prodotti, cosa non sono, e le regole per usarli in sicurezza. Vale per ogni acquisto.',
    aggiornato: AGG,
    sezioni: [
      {
        titolo: 'Per tutti i prodotti',
        paragrafi: [],
        elenco: [
          'Vietato ai minori di 18 anni.',
          'Non sono medicinali. Non diagnosticano, non curano e non prevengono alcuna malattia. Non sostituiscono il parere del medico.',
          'Sconsigliati in gravidanza e allattamento, a chi assume farmaci o ha patologie, salvo diverso parere del medico. Il CBD può interagire con alcuni farmaci.',
          'Non guidare e non usare macchinari dopo l’uso di prodotti con THC-X, THC-A o CBN, o se ti senti meno lucido.',
          'Anche i prodotti a norma contengono tracce di THC e possono far risultare positivi i test antidroga, compresi quelli su strada e sul lavoro.',
          'Tenere fuori dalla portata di bambini e animali. Conservare al fresco e al riparo dalla luce, nella confezione originale.',
          'Rispetta la legge del luogo in cui ti trovi: un prodotto legale in un Paese può non esserlo in un altro.',
        ],
      },
      {
        titolo: 'Fiori, hash, estratti, preroll e cannagar',
        paragrafi: [
          'Il THC totale di ogni lotto è entro i limiti previsti per la canapa industriale ed è indicato nel certificato di analisi. La destinazione d’uso è quella consentita dalla legge del Paese di consegna. Dove la combustione non è consentita, questi prodotti sono venduti per uso tecnico, da collezione o per la profumazione degli ambienti, e non vanno fumati né ingeriti.',
        ],
      },
      {
        titolo: 'Linee THC-X e THC-A',
        paragrafi: [
          'Sono linee più intense e sono disponibili solo nei Paesi in cui la loro vendita è consentita. Scaldato, il THC-A si trasforma in THC: segui le dosi indicate, parti da una quantità minima e aspetta prima di ripetere. Non mescolare con alcol.',
        ],
      },
      {
        titolo: 'Oli',
        paragrafi: [
          'Agita prima dell’uso. Il contagocce è graduato: ogni goccia contiene la quantità indicata in etichetta. Se non diversamente indicato in etichetta, sono per uso esterno. Non superare la dose indicata.',
        ],
      },
      {
        titolo: 'Vape e cartucce',
        paragrafi: [
          'Non contengono nicotina. Usa le cartucce solo con batterie con attacco 510 e con la tensione indicata. Non smontare, non ricaricare le penne usa e getta, non esporre a temperature superiori a 40 °C. A fine vita la penna contiene una batteria: va gettata nei rifiuti elettronici (RAEE), non nell’indifferenziata.',
        ],
      },
      {
        titolo: 'Edibles',
        paragrafi: [
          'L’effetto arriva dopo 30–120 minuti e dura più a lungo che per inalazione: inizia da mezza gommosa e non ripetere prima di 2 ore. Non sono dolciumi: conservali lontano da bambini e animali, che possono scambiarli per caramelle. Contengono zuccheri e possono contenere allergeni indicati in etichetta.',
        ],
      },
      {
        titolo: 'Semi',
        paragrafi: [
          'Venduti come articolo da collezione e per la conservazione della genetica. La coltivazione è regolata dalle leggi di ogni Paese: in Italia è consentita solo da seme certificato di varietà iscritte nel Catalogo comune europeo. Le percentuali indicate sulla busta sono il potenziale della genetica, non del seme.',
        ],
      },
      {
        titolo: 'Cloni',
        paragrafi: [
          'Piante vive, spedite con il passaporto delle piante previsto dal Regolamento UE 2016/2031. Coltivale solo dove la legge lo consente. Aprile appena arrivano, tienile alla luce indiretta e trapiantale entro 5 giorni.',
        ],
      },
      {
        titolo: 'Accessori',
        paragrafi: [
          'Grinder, cartine, filtri, vassoi e accendini sono venduti per l’uso con tabacco ed erbe consentite. Gli accendini contengono gas infiammabile: non esporli al calore e tenerli lontani dai bambini.',
        ],
      },
      {
        titolo: 'Segnalazioni',
        paragrafi: [
          'Se un prodotto ti ha causato un effetto indesiderato, scrivici a ' +
            T.email +
            ' indicando il numero di lotto: blocchiamo il lotto e verifichiamo le analisi.',
        ],
      },
    ],
  },
  {
    slug: 'legale',
    eyebrow: 'Legale',
    titolo: 'Note legali',
    lead: 'Chi siamo per la legge, quali regole seguiamo, come usiamo marchi, recensioni e contenuti.',
    daCompletare: true,
    aggiornato: AGG,
    sezioni: [
      {
        titolo: 'Dati della società',
        paragrafi: [],
        elenco: [
          'Ragione sociale: ' + T.ragioneSociale,
          'Sede legale: ' + T.sede,
          'Partita IVA: ' + T.piva,
          'Registro imprese: ' + T.rea,
          'Capitale sociale: ' + T.capitale,
          'PEC: ' + T.pec,
          'Email: ' + T.email,
        ],
      },
      {
        titolo: 'I prodotti e le regole che seguiamo',
        paragrafi: [
          'Lavoriamo solo varietà di canapa iscritte nel Catalogo comune europeo delle varietà delle specie di piante agricole. Ogni lotto è analizzato da un laboratorio indipendente: il certificato riporta cannabinoidi, THC totale e numero di lotto, lo stesso stampato sulla confezione.',
          'Le norme sulla canapa cambiano spesso e sono diverse in ogni Paese. Per questo il catalogo si adatta al Paese di consegna: un prodotto compare solo dove, per quanto ci risulta al momento dell’ordine, è vendibile. Aggiorniamo l’elenco quando le norme cambiano.',
        ],
      },
      {
        titolo: 'Nessun claim sulla salute',
        paragrafi: [
          'Nessun contenuto di questo sito attribuisce ai prodotti proprietà terapeutiche, preventive o curative. Le descrizioni di aroma e sensazioni sono soggettive e non sono indicazioni mediche.',
        ],
      },
      {
        titolo: 'Recensioni',
        paragrafi: [
          'Le recensioni dei prodotti possono essere lasciate solo da clienti che hanno acquistato quel prodotto: il sistema collega ogni recensione a un ordine consegnato. Pubblichiamo le recensioni positive e negative; non paghiamo per recensioni e non le modifichiamo. Togliamo solo quelle offensive, con dati personali o fuori tema (art. 22, comma 4-bis, Codice del Consumo).',
        ],
      },
      {
        titolo: 'Marchi e contenuti',
        paragrafi: [
          'The Hasher, il logo e le grafiche delle confezioni sono marchi e opere di ' +
            T.ragioneSociale +
            '. Testi, foto e grafiche del sito non si possono copiare o usare senza autorizzazione scritta. Rivenditori e ambassador possono usare i materiali del kit brand secondo le regole del loro accordo.',
        ],
      },
      {
        titolo: 'Accessibilità',
        paragrafi: [
          'Progettiamo il sito seguendo le linee guida WCAG 2.1 livello AA e l’Atto europeo sull’accessibilità (D.Lgs. 82/2022). Se trovi una parte che non riesci a usare, scrivici a ' +
            T.email +
            ': la sistemiamo e intanto ti aiutiamo a completare l’ordine.',
        ],
      },
      {
        titolo: 'Controversie online',
        paragrafi: [
          'La piattaforma europea ODR per la risoluzione online delle controversie è stata chiusa il 20 luglio 2025 (Reg. UE 2024/3228). Per un reclamo scrivici a ' +
            T.ordini +
            '; puoi anche rivolgerti a un organismo ADR del tuo Paese o al Centro europeo consumatori.',
        ],
      },
    ],
  },
  {
    slug: 'promozioni',
    eyebrow: 'Legale',
    titolo: 'Regolamento sconti e promozioni',
    lead: 'Come funzionano codici sconto, newsletter, canale Telegram e prezzi barrati. Niente asterischi nascosti.',
    aggiornato: AGG,
    sezioni: [
      {
        titolo: 'Sconto newsletter: 5% per 6 mesi',
        paragrafi: [
          'Iscrivendoti alla newsletter e creando un account ricevi uno sconto del 5% su tutti gli ordini dei 6 mesi successivi all’iscrizione. Lo sconto si applica da solo al checkout quando accedi al tuo account.',
          'Non si somma ad altri codici sconto, non vale su prodotti già in promozione, carte regalo e spedizione. È personale e vale una sola volta per persona e indirizzo di consegna. Se revochi l’iscrizione alla newsletter lo sconto resta valido fino alla scadenza dei 6 mesi.',
        ],
      },
      {
        titolo: 'Canale Telegram: fine batch',
        paragrafi: [
          'Sul canale Telegram pubblichiamo offerte giornaliere sulle ultime unità di un lotto. Ogni offerta indica prezzo, durata e quantità disponibili: finite quelle, l’offerta si chiude. Il canale è riservato ai maggiorenni.',
        ],
      },
      {
        titolo: 'Codici sconto',
        paragrafi: [
          'Ogni codice riporta valore, scadenza, eventuale spesa minima e prodotti esclusi. Si usa un codice per ordine. I codici non si convertono in denaro. Se restituisci una parte dell’ordine, il rimborso tiene conto dello sconto ricevuto.',
        ],
      },
      {
        titolo: 'Prezzi barrati',
        paragrafi: [
          'Quando un prezzo è barrato, quello barrato è il prezzo più basso applicato nei 30 giorni precedenti all’inizio della promozione, come prevede la direttiva Omnibus (art. 17-bis Codice del Consumo). Per i prodotti nuovi da meno di 30 giorni indichiamo il periodo effettivo.',
        ],
      },
      {
        titolo: 'Programmi fedeltà e ambassador',
        paragrafi: [
          'I vantaggi del Club (livelli, sconti di livello, accessi anticipati, inviti) sono nel Regolamento del Club.',
          'Le condizioni del programma ambassador (commissioni, codici personali, pagamenti) sono nell’accordo che firmi all’ingresso nel programma. I codici ambassador sono personali e non si possono pubblicare su siti di coupon.',
        ],
      },
    ],
  },
  {
    slug: 'regolamento-club',
    eyebrow: 'Legale',
    titolo: 'Regolamento del Club',
    lead: 'Come si entra, come si sale di livello, cosa si ottiene e come trattiamo i tuoi dati. Il Club è gratuito e riservato ai maggiorenni.',
    daCompletare: true,
    aggiornato: '30 settembre 2026',
    sezioni: [
      {
        titolo: 'Chi organizza il Club',
        paragrafi: [
          'Il programma «The Hasher Club» è organizzato da ' +
            T.ragioneSociale +
            ', ' +
            T.sede +
            ', P. IVA ' +
            T.piva +
            '. Per qualsiasi domanda: ' +
            T.email +
            '.',
        ],
      },
      {
        titolo: 'Chi può partecipare',
        paragrafi: [
          'Il Club è gratuito e aperto alle persone maggiorenni residenti nei Paesi in cui vendiamo, con un account sul sito. L’iscrizione è personale: un account per persona, non cedibile.',
          'Si entra creando l’account e si esce quando si vuole dall’area cliente, senza costi. Uscendo si perdono livello, inviti e vantaggi non ancora usati.',
        ],
      },
      {
        titolo: 'I livelli e come si calcolano',
        paragrafi: [
          'Il livello dipende dal totale degli ordini consegnati negli ultimi 12 mesi, online e nei negozi The Hasher che aderiscono, al netto di resi, rimborsi, spedizione e carte regalo. Il calcolo si aggiorna ogni giorno.',
        ],
        elenco: [
          'Starter: dalla creazione dell’account.',
          'Member: dal primo ordine consegnato.',
          'Black: da 400 € di ordini consegnati negli ultimi 12 mesi, oppure per 90 giorni con l’invito di un membro Black.',
          'Elite: solo su invito dell’organizzatore, fino a 100 membri per Paese, con una revisione ogni 12 mesi basata su anzianità, partecipazione e rispetto del regolamento.',
        ],
      },
      {
        titolo: 'I vantaggi',
        paragrafi: [
          'I vantaggi di ogni livello sono descritti nella pagina del Club e consistono solo in sconti sul prezzo di listino, accessi anticipati o riservati ai prodotti, spedizioni gratuite e servizi. Non ci sono punti, premi né catalogo premi.',
          'Gli sconti di livello non si sommano ad altri codici: al checkout si applica quello più conveniente. Non valgono su carte regalo e spedizione. I prezzi barrati seguono il Regolamento sconti e promozioni (prezzo più basso dei 30 giorni precedenti).',
          'I lotti della linea Reserve sono disponibili per i livelli indicati, in quantità limitate e fino a esaurimento; l’accesso anticipato non garantisce la disponibilità del prodotto.',
        ],
      },
      {
        titolo: 'Cambi di livello',
        paragrafi: [
          'Quando il totale degli ultimi 12 mesi scende sotto la soglia, ti avvisiamo via email almeno 30 giorni prima del cambio. Si scende di un livello alla volta; Starter resta finché hai l’account.',
        ],
      },
      {
        titolo: 'Inviti',
        paragrafi: [
          'I membri Black ed Elite ricevono inviti personali (Black: 2 a trimestre). Gli inviti non si vendono, non si scambiano con denaro o prodotti e non si pubblicano su siti, social o gruppi pubblici. In caso di abuso l’organizzatore può annullare gli inviti e riportare il membro al livello Member.',
        ],
      },
      {
        titolo: 'Tessera',
        paragrafi: [
          'La tessera, digitale o fisica, è personale e resta di proprietà dell’organizzatore. In caso di smarrimento si blocca dall’area cliente e se ne chiede una nuova.',
        ],
      },
      {
        titolo: 'Dati personali',
        paragrafi: [
          'Per gestire il Club trattiamo dati dell’account, acquisti e livello, per eseguire il regolamento che accetti (art. 6.1.b GDPR). Le comunicazioni promozionali richiedono il consenso alla newsletter.',
          'Le offerte costruite sui tuoi acquisti (profilazione) richiedono un consenso separato e facoltativo, che puoi revocare in ogni momento dall’area cliente: senza, il Club funziona lo stesso. Seguendo le indicazioni del Garante sulle carte fedeltà, i dati di dettaglio degli acquisti usati per la profilazione si conservano al massimo 12 mesi e quelli per il marketing al massimo 24 mesi. Maggiori dettagli nell’informativa privacy.',
        ],
      },
      {
        titolo: 'Modifiche e fine del programma',
        paragrafi: [
          'Possiamo modificare il regolamento o chiudere il Club con un preavviso di almeno 30 giorni via email e su questa pagina. Le modifiche non tolgono vantaggi già maturati e non ancora scaduti.',
          'Il Club non è un’operazione a premio: i vantaggi sono solo sconti, accessi e servizi (DPR 430/2001, art. 6). Il testo va validato dal legale prima del lancio, anche per ogni Paese in cui il Club è attivo.',
        ],
      },
    ],
  },
  {
    slug: 'condizioni-rivenditori',
    eyebrow: 'Legale',
    titolo: 'Condizioni di vendita per rivenditori',
    lead: 'Le regole per negozi, distributori e aziende che comprano all’ingrosso. Tra professionisti, chiare e senza sorprese.',
    daCompletare: true,
    aggiornato: AGG,
    sezioni: [
      {
        titolo: 'A chi si applicano',
        paragrafi: [
          'Alle aziende e ai professionisti con partita IVA approvati come rivenditori o distributori. Non si applicano le norme a tutela dei consumatori, compreso il diritto di recesso. Per il franchising valgono il contratto di affiliazione e la Legge 129/2004.',
        ],
      },
      {
        titolo: 'Ordini e minimi',
        paragrafi: [
          'Gli ordini si fanno dall’area riservata o via ' +
            T.b2b +
            ' e diventano vincolanti con la nostra conferma scritta. Minimi d’ordine e scaglioni di prezzo sono quelli del listino riservato in vigore alla data dell’ordine.',
        ],
      },
      {
        titolo: 'Prezzi di rivendita',
        paragrafi: [
          'Indichiamo prezzi di rivendita consigliati. Sei libero di fissare i tuoi prezzi: non imponiamo prezzi minimi di rivendita, come richiede la disciplina europea della concorrenza.',
        ],
      },
      {
        titolo: 'Pagamenti',
        paragrafi: [
          'Primo ordine anticipato. Dagli ordini successivi, pagamento secondo i termini concordati. In caso di ritardo si applicano gli interessi di mora previsti dal D.Lgs. 231/2002 e possiamo sospendere le consegne.',
        ],
      },
      {
        titolo: 'Consegna e controllo della merce',
        paragrafi: [
          'Consegna franco destino sopra la soglia del listino. Verifica colli e contenuto alla consegna: le mancanze e i danni visibili vanno segnalati sul documento del corriere e a noi entro 48 ore; i difetti non visibili entro 8 giorni dalla scoperta (art. 1495 codice civile).',
        ],
      },
      {
        titolo: 'Conformità e rivendita',
        paragrafi: [
          'Ogni lotto è accompagnato dal certificato di analisi. Sei responsabile di rivendere i prodotti nel rispetto delle norme del tuo Paese e del tuo territorio (età minima, esposizione, pubblicità, eventuali licenze) e di non attribuire ai prodotti proprietà terapeutiche.',
          'Non puoi rivendere su marketplace generalisti senza nostro accordo scritto, per proteggere tracciabilità e verifica dell’età. Possiamo sospendere le forniture in caso di violazioni.',
        ],
      },
      {
        titolo: 'Marchio',
        paragrafi: [
          'Puoi usare il marchio The Hasher e i materiali del kit brand solo per promuovere i nostri prodotti, senza modificarli e senza registrare domini o account social con il nostro nome.',
        ],
      },
      {
        titolo: 'Responsabilità, legge e foro',
        paragrafi: [
          'La nostra responsabilità è limitata al valore della fornitura interessata, salvo dolo o colpa grave. Il contratto è regolato dalla legge italiana; per ogni controversia è competente in via esclusiva il foro di [città della sede]. Per i contratti con aziende di altri Paesi è esclusa la Convenzione di Vienna sulla vendita internazionale di beni.',
        ],
      },
    ],
  },
]
