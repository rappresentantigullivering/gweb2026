# Runbook: incidenti e recupero accessi

## Metadati

- **Stato:** Parziale, contatti/proprietari da formalizzare fuori da Git
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** Vercel, Cloudflare, Upstash, GitHub e servizi esterni

## Prima risposta

1. Identificare impatto: pubblico, login, singolo servizio, dati o DNS.
2. Conservare orari, URL, messaggi e deployment coinvolto; non copiare segreti.
3. Se c'è rischio di scritture dannose, limitare temporaneamente la funzione mutante.
4. Verificare l'ultimo deploy Vercel e distinguere errore applicativo da provider/DNS.
5. Comunicare stato e proprietario dell'incidente alle persone responsabili.

## Sito pubblico non raggiungibile

- Controllare build/deployment Vercel.
- Confrontare radice, `www` e un sottodominio.
- Verificare dominio assegnato su Vercel e record Cloudflare.
- Non cambiare nameserver o disattivare protezioni globali senza diagnosi.
- Se causato dal codice, seguire il rollback applicazione.

## Login o pannelli non raggiungibili

- Verificare Redis e variabili `UPSTASH_*`.
- Controllare presenza/coerenza di `SESSION_SECRET`.
- Provare login su tesserati e sessione con ruolo noto.
- Controllare cookie, orologio/scadenza e chiave sessione Redis.
- Un cambio di segreto invalida tutte le sessioni; rifare login è atteso.

## Account amministrativo perso

Il repository non implementa reset self-service. Il recupero richiede accesso
autorizzato a Upstash/Vercel e una procedura controllata per creare o ripristinare un
admin con password hashata correttamente. Non inserire manualmente password in chiaro.
Ogni intervento deve essere eseguito da due persone quando possibile e annotato in un
registro operativo esterno appropriato.

## Segreto sospettato compromesso

1. Determinare quali ambienti e servizi usano il segreto.
2. Ruotarlo nel provider corretto.
3. Per `SESSION_SECRET`, aspettarsi logout globale; invalidare anche sessioni Redis.
4. Per token Redis/Telegram, revocare quello precedente e verificare log/anomalie.
5. Ridistribuire l'app e provare il servizio senza pubblicare valori.

## Dati Redis mancanti o corrotti

- Fermare modifiche massive.
- Identificare chiave e operazione che ha causato il problema.
- Verificare backup/esportazioni disponibili nel provider.
- Non sostituire l'intero database per correggere una singola chiave.
- Dopo il recupero provare compatibilità con il codice e documentare prevenzione.

## Dipendenze esterne

- Appunti vuoti: verificare foglio, GID, permessi/export CSV.
- Form non visibile: stato Redis, URL Tally e policy iframe.
- Reminder assenti: scheduler, `CRON_SECRET`, bot/chat e marcatori già inviati.
- Popup errato: disattivarlo dal manager mentre si corregge il contenuto.

## Prima di modificare

- Non committare workaround contenenti token o password.
- Non cancellare dati per “ripartire” senza backup e autorizzazione.
- Formalizzare fuori da Git almeno due proprietari e recuperi 2FA per ogni provider.
- Dopo l'incidente aggiornare rischi, runbook e test che avrebbero potuto prevenirlo.
