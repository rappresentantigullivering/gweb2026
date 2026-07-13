# Trasparenza e privacy

## Metadati

- **Stato:** Implementata, informativa privacy da riallineare
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `/trasparenza`, `/privacy`

## Scopo e flusso

Le pagine pubblicano informazioni di trasparenza e descrivono il trattamento dei dati
del sito. Sono raggiungibili dal footer e devono riflettere infrastruttura e funzioni
reali.

## Implementazione

I contenuti sono hard-coded nelle relative pagine React. Il codice utilizza Vercel
Analytics/Speed Insights, Cloudflare, Upstash Redis, Tally, Google Sheets e Telegram in
ambiti diversi. Il cookie reale di sessione è `gulliver_session`.

## Disallineamento noto

L'informativa attuale descrive una precedente configurazione a doppio hosting e alcuni
dettagli tecnici non coerenti con l'implementazione corrente. Questo manuale non è una
valutazione legale: la pagina deve essere aggiornata con revisione tecnica e, dove
necessario, legale, considerando anche form, registrazione utenti e servizi esterni.

## Prima di modificare

- Inventariare dati, finalità, provider, cookie/localStorage, retention e destinatari.
- Distinguere sito pubblico, aree tesserati e form Tally.
- Non aggiungere affermazioni legali o tempi di conservazione non verificati.
- Se cambia un provider o una funzione che tratta dati, aggiornare l'informativa nello
  stesso rilascio.
- Conservare accessibilità e link permanente dal footer.

## Verifica

1. Confrontare il testo con cookie e integrazioni realmente usati.
2. Verificare link alle informative dei provider e contatti del titolare.
3. Provare pagina mobile, stampa e link footer.
4. Ottenere approvazione della persona responsabile prima del deploy di modifiche
   sostanziali.

## Limiti noti

L'allineamento legale non può essere garantito da test automatici. Il debito corrente
è registrato anche in [rischi noti](../project/known-risks.md).
