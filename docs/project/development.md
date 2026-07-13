# Sviluppo locale

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `package.json`, `next.config.ts`, `src/`

## Requisiti e avvio

Usare una versione Node.js compatibile con Next.js 16 e installare le dipendenze dal
lockfile:

```sh
npm install
npm run dev
```

Il sito pubblico è normalmente disponibile su `http://localhost:3000`. I sottodomini
possono essere provati come `http://tesserati.localhost:3000` se il browser supporta
`*.localhost`.

## Variabili locali

Usare `.env.local`, ignorato da Git. Per testare tutte le funzioni servono le stesse
categorie di variabili elencate in [deploy e DNS](deployment-and-dns.md). Non copiare
segreti di produzione se non è indispensabile e autorizzato; preferire risorse di test.

## Comandi di qualità

```sh
npm run docs:check
npm run lint
npm run build
```

La build è il controllo più vicino a Vercel. Per lo snapshot esistono script separati
descritti nel relativo runbook.

Al 2026-07-13 il lint completo segnala debito preesistente in più file non coinvolti
da questo manuale; la build di produzione passa. Finché il debito non viene risolto,
eseguire comunque il lint completo, non introdurre nuovi errori e verificare almeno i
file cambiati con `npx eslint <file...>`. Lo stato è registrato nei rischi noti.

## Convenzioni

- Route e API seguono App Router sotto `src/app/`.
- La versione Next installata può avere convenzioni diverse da versioni precedenti:
  consultare la documentazione inclusa in `node_modules/next/dist/docs/` prima di
  cambiare routing, metadata, proxy o rendering.
- Riutilizzare variabili e classi di `src/app/globals.css`.
- Non duplicare la logica di autenticazione; usare gli helper e replicare sempre il
  controllo server-side nelle API.
- Nomi di file e documenti devono descrivere il dominio funzionale, non lo strumento
  o la persona che li ha creati.

## Verifica proporzionata

| Modifica | Verifica minima |
| --- | --- |
| Testo/asset pubblico | pagina interessata mobile e desktop, link e build |
| Stile globale | home, pagina editoriale, elezioni, pannello interno |
| API/Redis | autorizzato, non autorizzato, dato mancante, errore esterno |
| Proxy/sessione | login, logout, ruolo corretto/errato, ogni sottodominio |
| Archivio | script di verifica, asset e navigazione profonda |
| DNS/deploy | dominio radice, `www`, servizio coinvolto e log build |

## Prima di modificare

- Controllare `git status` e non sovrascrivere cambiamenti altrui.
- Leggere il documento della funzione e i rischi noti.
- Evitare cancellazioni massive durante refactor o snapshot.
- Aggiornare test, documentazione e procedure insieme al codice.
