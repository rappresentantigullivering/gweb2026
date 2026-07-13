# Archivio snapshot statico

Lo snapshot 2025 è una copia statica delle pagine pubbliche del commit
`4cd003b8d99d332c3837190b1dd7668252ff5adc` e viene servito dal percorso
`/archivio/2025/`.

## Regola di sicurezza

La creazione di uno snapshot non autorizza la rimozione di funzionalità dal sito
principale. API, pannelli, autenticazione, moduli, comunicazione e route di
sottodominio restano nel progetto live. Le funzionalità incompatibili con un
export statico vengono escluse esclusivamente dalla copia temporanea usata per
la build.

## Procedura usata

1. Estrarre il commit storico in una directory temporanea con `git archive`.
2. Configurare nella copia `output: "export"`, `basePath: "/archivio/2025"` e
   mantenere `trailingSlash: true`.
3. Escludere dalla sola copia temporanea le route operative e `src/proxy.ts`.
4. Rendere statico il layout della copia: sul dominio principale navbar e footer
   erano sempre visibili, quindi il controllo basato su `headers()` non serve
   nello snapshot.
5. Eseguire `next build --webpack`.
6. Ribasare immagini, manifesti e PDF con:

   ```sh
   node scripts/rebase-static-export.mjs <out> <public-storica> /archivio/2025
   ```

7. Copiare l'output verificato in `public/archivio/2025/`.
8. Verificare pagine, asset, link interni e documenti prima di rimuovere le copie
   React sotto `src/app/archivio/2025`.

Il controllo ripetibile dei riferimenti locali si esegue con:

```sh
node scripts/verify-static-archive.mjs public/archivio/2025 /archivio/2025
```

## Routing

Il sito principale usa rewrite mirati soltanto agli URL con slash finale delle
pagine archiviate, traducendoli nel rispettivo `index.html`. I file statici con
estensione vengono serviti direttamente da `public` e non attraversano i
rewrite.
