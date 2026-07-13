# Manutenzione della documentazione

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `docs/`, `scripts/verify-documentation.mjs`

## Principio

La documentazione è parte della funzionalità. Una modifica non è completa se il
manuale continua a descrivere il comportamento precedente.

## Stati ammessi

- **Implementata:** il flusso esiste ed è utilizzabile.
- **Parziale:** esiste ma ha parti mancanti o non operative.
- **Proposta:** analisi o idea non presente in produzione.
- **Archiviata:** comportamento storico conservato soltanto nello snapshot/manuale.

Ogni documento funzionale deve dichiarare stato, ultima verifica, punti di ingresso,
flusso, implementazione, dipendenze, sezione **Prima di modificare**, verifica e limiti.

## Aggiornamenti obbligatori

Aggiornare il manuale quando cambiano:

- route, sottodomini, ruoli o cookie;
- chiavi/schema Redis o integrazioni;
- variabili d'ambiente;
- date, PDF e contenuti annuali;
- design system o asset canonici;
- deploy, DNS, procedure di rollback o snapshot;
- stato di una proposta.

Usare la data reale della verifica. Il commit di riferimento aiuta a capire fino a
quale versione è stato controllato il documento, ma non sostituisce la lettura del
diff successivo.

## Nuove funzionalità

Copiare [il template](../templates/feature.md), scegliere un nome stabile e aggiungere
il link all'indice. Se la funzione attraversa più servizi, aggiornare anche architettura,
route, dati, sicurezza e rischi.

## Controllo automatico

`npm run docs:check` verifica i link Markdown locali, la presenza delle sezioni
obbligatorie nei documenti funzionali e l'assenza di vecchi documenti tecnici sparsi
nella root. Non verifica la verità del testo: quella resta responsabilità di chi cambia
il codice.

## Uso con un assistente di sviluppo

Fornire come prima istruzione: “Leggi `docs/README.md`, i fondamenti collegati e il
documento della funzionalità prima di proporre modifiche. Evidenzia dipendenze e rischi
prima di toccare il codice.” L'assistente deve poi verificare i riferimenti contro il
codice corrente, non trattare il manuale come una scorciatoia infallibile.

## Prima di modificare

- Non cancellare conoscenza utile: migrarla e correggerla.
- Non presentare una proposta come implementata.
- Non inserire informazioni personali o segreti.
- Non usare nomi di strumenti o collaboratori nei nomi dei file.
- Non modificare documenti dentro uno snapshot: crearne una nuova edizione corrente.
