# Rappresentanza, proposte e contatti

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `/rappresentanza`, `/rappresentanza/proposte`, `/contatti`

## Scopo e flusso

Le pagine spiegano la rappresentanza studentesca, mostrano proposte e offrono canali
per contattare Gulliver. Sono contenuto istituzionale stabile e pubblico.

## Implementazione

Testi, strutture e collegamenti sono definiti nelle rispettive `page.tsx`. Non esiste
un backend dedicato né un form di contatto gestito dal sito; eventuali azioni portano
a canali esterni dichiarati nella pagina.

## Dipendenze

- Recapiti, social e link esterni.
- Struttura degli organi/ruoli descritti.
- Navbar, footer e sitemap.

## Prima di modificare

- Verificare proprietario e accessibilità di ogni recapito prima di sostituirlo.
- Evitare dati personali non necessari; preferire indirizzi/ruoli istituzionali.
- Se si introduce un form, documentare raccolta dati, spam protection, retention,
  destinatari, errori e aggiornamento privacy.
- Una riorganizzazione degli organi può richiedere modifiche anche a elezioni e
  trasparenza.

## Verifica

1. Provare tutti i recapiti e link esterni.
2. Controllare contenuto e leggibilità mobile.
3. Verificare coerenza con footer e pagine elettorali.
4. Controllare che non siano esposti dati obsoleti.

## Limiti noti

La correttezza organizzativa dei contenuti richiede conferma umana periodica; non è
possibile verificarla automaticamente dalla repository.
