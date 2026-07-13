# Runbook: creazione di uno snapshot statico

## Metadati

- **Stato:** Implementata per lo snapshot 2025
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** commit storico, `public/archivio/<anno>/`, script archivio

## Obiettivo

Creare un sito statico indipendente sotto `/archivio/<anno>/`, con propri HTML, CSS,
JavaScript, immagini e documenti. Lo snapshot fotografa le pagine pubbliche; non è un
backup di API, database o pannelli interni.

## Regola di sicurezza

Le modifiche necessarie a rendere il progetto esportabile si applicano esclusivamente
a una copia temporanea. Non eliminare dal progetto live API, autenticazione, proxy,
admin, `f`, tesserati, appunti, popup, comunicazione o direttivo.

## Preparazione

1. Scegliere commit, anno e perimetro pubblico.
2. Registrare commit completo e data nel documento funzione archivio.
3. Inventariare pagine pubbliche, PDF, immagini e link esterni.
4. Conservare la versione corrente di [current image](../current-image.md) insieme alle
   note dello snapshot.
5. Eseguire una build sana del commit di origine prima di trasformarlo.

## Generazione

1. Estrarre il commit in una directory temporanea con `git archive` o un worktree
   isolato; non cambiare il working tree corrente.
2. Nella copia impostare `output: "export"`, `basePath: "/archivio/<anno>"` e mantenere
   `trailingSlash: true`.
3. Escludere nella sola copia route operative, API e `src/proxy.ts` incompatibili con
   export statico.
4. Rendere statiche soltanto le dipendenze del layout che richiedono header/runtime.
5. Eseguire la build statica. Per lo snapshot 2025 è stato usato
   `next build --webpack`.
6. Ribasare asset e documenti:

   ```sh
   node scripts/rebase-static-export.mjs <out> <public-storica> /archivio/<anno>
   ```

7. Copiare l'output verificato in `public/archivio/<anno>/`.
8. Aggiungere rewrite mirati in `next.config.ts` e il link all'hub `/archivio`.

## Verifica

Eseguire:

```sh
node scripts/verify-static-archive.mjs public/archivio/<anno> /archivio/<anno>
```

Poi provare home snapshot, pagine profonde, navigazione interna, CSS, JavaScript,
immagini, favicon e PDF. Cercare riferimenti assoluti rimasti al dominio/root corrente.
Infine eseguire `npm run lint` e `npm run build` sul progetto live.

## Pulizia successiva

La presenza dello snapshot non autorizza una pulizia automatica. Per ogni pagina
candidata alla rimozione:

1. verificare se è raggiungibile da navbar, footer, sitemap, altre pagine, QR code o
   campagne esterne;
2. distinguere duplicato stagionale da funzione operativa;
3. scegliere fra conservazione, redirect e rimozione;
4. controllare che nessuna API/import dipenda dalla cartella;
5. rimuovere solo dopo decisione esplicita e nuova build.

## Prima di modificare

- Non modificare i file congelati dopo la pubblicazione, salvo correzioni di sicurezza
  o legali documentate.
- Non far dipendere lo snapshot dal CSS corrente.
- Non archiviare segreti, dati personali, sessioni o endpoint operativi.
- Uno snapshot nuovo usa una nuova cartella; non sovrascrive quello precedente.
