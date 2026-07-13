# Proposta: verifica matricola per accesso ai gruppi

## Metadati

- **Stato:** Proposta, non implementata
- **Ultima verifica:** 2026-07-13, migrazione della proposta storica
- **Punti di ingresso ipotizzati:** area gruppi matricole, nuovo flusso di verifica

## Problema ipotizzato

Limitare l'accesso ai link dei gruppi a persone con indirizzo istituzionale valido,
riducendo ingresso di spam o utenti estranei. Oggi `/gruppi26` è pubblico e apre
direttamente inviti WhatsApp/Telegram: nessuna verifica matricola è presente.

## Disegno originariamente proposto

1. L'utente inserisce l'indirizzo istituzionale.
2. Il server invia un codice monouso via email.
3. Il codice vive in Redis con TTL indicativo di 10 minuti.
4. Dopo la verifica il browser riceve una prova temporanea e può vedere i link.
5. Rate limit e messaggi generici riducono abuso ed enumerazione degli indirizzi.

La proposta suggeriva di evitare un database permanente di matricole e di conservare
soltanto dati effimeri necessari alla verifica.

## Questioni da decidere prima dell'implementazione

- Chi fornisce l'invio email e chi possiede dominio/account?
- Quali domini/formati istituzionali sono validi e quanto spesso cambiano?
- Quanto dura l'accesso dopo verifica? È per dispositivo, sessione o anno?
- Come accedono studenti senza email funzionante, Erasmus o casi eccezionali?
- Qual è il limite per IP/email e come si gestiscono reti universitarie condivise?
- Quali log sono indispensabili e per quanto vengono conservati?
- Come si impedisce che i link, una volta visti, siano condivisi altrove?
- Il beneficio giustifica attrito, costi, supporto e trattamento dati?

## Sicurezza minima se approvata

- Codici casuali robusti, monouso, hashati in persistenza e con TTL breve.
- Rate limit su IP e identificatore normalizzato, senza rivelare se un account esiste.
- Sessione di verifica firmata e revocabile, cookie sicuro e protezione CSRF dove serve.
- Nessuna password universitaria richiesta o raccolta.
- Monitoraggio abusi senza registrare più dati del necessario.
- Provider email autenticato con SPF/DKIM/DMARC coerenti.

## Privacy e organizzazione

Qualsiasi affermazione sulla base giuridica o sulla conformità deve essere verificata
da una persona competente sul trattamento reale. Prima del deploy servono informativa
aggiornata, titolare/responsabili, tempi di cancellazione, gestione richieste e analisi
dei provider. Il vecchio documento conteneva conclusioni legali non validate dal codice
e non vengono considerate approvate.

## Impatto sull'architettura

La funzione toccherebbe pagina gruppi, nuove API, Redis, email, cookie/sessione, privacy,
monitoraggio e assistenza agli utenti. Non va implementata come semplice blocco UI:
i link non devono essere presenti nell'HTML/JavaScript pubblico prima della verifica.

## Prima di modificare

- Ottenere decisione esplicita su requisiti, provider e casi esclusi.
- Fare threat model e revisione privacy.
- Progettare fallback operativo e costi.
- Misurare il problema reale e valutare alternative meno invasive, per esempio inviti
  ruotati o moderazione dei gruppi.
- Se implementata, cambiare lo stato di questo documento e creare un documento
  funzionale completo separato.
