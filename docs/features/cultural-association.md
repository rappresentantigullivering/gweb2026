# Associazione culturale

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `/associazione-culturale`, `/convenzioni`, `/gulliver-rock`

## Scopo e flusso

Questa area racconta le attività culturali, presenta le convenzioni e promuove Gulliver
Rock. È pubblica e raggiungibile dal menu principale.

## Implementazione

Le tre pagine sono contenuto React versionato. Convenzioni e Gulliver Rock utilizzano
asset sotto `public/`. La pagina dell'evento include informazioni e componenti
temporali; il countdown rilevato punta al 23 maggio 2026 alle 20:00 (+02:00).

## Dipendenze

- Attività/partner esterni e relativi link.
- Immagini, locandine e date evento.
- Navbar, home, metadata e campagne social.

## Prima di modificare

- Confermare che una convenzione sia ancora valida prima di pubblicarla o conservarla.
- Per Gulliver Rock cercare data e anno in codice, metadata, immagini e CTA.
- Non sovrascrivere asset storici con significato diverso; usare nomi/edizioni chiare.
- Dopo un evento, decidere se mantenere una pagina cronaca, aggiornare all'edizione
  successiva o archiviarla nello snapshot.
- Rispettare licenze e autorizzazioni per immagini e loghi di terzi.

## Verifica

1. Controllare menu e link delle tre pagine.
2. Provare convenzioni e CTA esterne.
3. Testare countdown prima/dopo la data.
4. Controllare immagini, alt text e layout mobile.

## Limiti noti

I contenuti non usano un CMS e richiedono deploy. La validità delle convenzioni non può
essere dedotta dal codice e richiede una verifica organizzativa periodica.
