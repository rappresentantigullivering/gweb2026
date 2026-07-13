# Archivio statico

## Metadati

- **Stato:** Implementata, snapshot 2025 disponibile
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `/archivio`, `/archivio/2025/`, `public/archivio/2025/`

## Scopo e flusso

L'archivio conserva una fotografia navigabile delle pagine pubbliche di un periodo.
Lo snapshot 2025 è un export statico indipendente del commit
`4cd003b8d99d332c3837190b1dd7668252ff5adc`, servito sotto `/archivio/2025/`.

I suoi HTML, CSS, JavaScript, immagini e documenti sono congelati insieme: modifiche
future al design corrente non devono alterarlo.

## Implementazione

- Hub corrente: `src/app/archivio/page.tsx`.
- File congelati: `public/archivio/2025/`.
- Rewrite: `next.config.ts`.
- Rebase asset: `scripts/rebase-static-export.mjs`.
- Verifica: `scripts/verify-static-archive.mjs`.
- Procedura: [creazione snapshot](../runbooks/create-snapshot.md).

## Regola di sicurezza fondamentale

Creare uno snapshot non significa esportare o sostituire l'applicazione viva. Le
funzioni operative incompatibili con l'export statico si escludono soltanto dalla
copia temporanea. API, autenticazione, `f`, admin, comunicazione, appunti, popup,
tesserati e direttivo restano nel progetto principale.

Una pagina pubblica corrente si può rimuovere dopo lo snapshot solo se è davvero una
copia stagionale superata, la decisione è esplicita e link/redirect sono stati gestiti.

## Prima di modificare

- Non editare manualmente uno snapshot per farlo assomigliare al sito corrente.
- Non lanciare pulizie massive su `src/app` basandosi sui limiti dell'export.
- Non spostare documenti correnti nell'archivio se il sito live li usa ancora.
- Mantenere base path e link relativi; verificare percorsi profondi e asset.
- Salvare nello snapshot anche la versione di `current-image.md` valida per l'edizione,
  oppure includerla nel pacchetto di consegna associato.

## Verifica

1. Eseguire lo script di verifica riferimenti locali.
2. Aprire home, pagine profonde, immagini e PDF dello snapshot.
3. Disattivare mentalmente/tecnicamente le dipendenze live: lo snapshot non deve
   dipendere dal CSS o dalle API correnti.
4. Controllare che pagine e API correnti continuino a compilare dopo l'integrazione.
5. Aggiornare l'hub `/archivio` e il manuale.

## Limiti noti

Uno snapshot statico non conserva funzioni server-side, sessioni o dati dinamici. È
una testimonianza delle pagine pubbliche, non un backup operativo del sistema.
