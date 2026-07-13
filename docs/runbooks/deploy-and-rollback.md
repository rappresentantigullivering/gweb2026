# Runbook: deploy e rollback

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** GitHub `main`, Vercel, Cloudflare

## Deploy ordinario

1. Verificare `git status` e il diff: includere soltanto modifiche intenzionali.
2. Eseguire:

   ```sh
   npm run docs:check
   npm run lint
   npm run build
   ```

3. Per funzioni con dati esterni, provare anche l'ambiente appropriato senza stampare
   segreti nei log.
   Finché la baseline lint descritta nei rischi noti non è stata risolta, controllare
   che il numero di problemi non aumenti ed eseguire `npx eslint` sui file cambiati.
4. Committare con messaggio descrittivo e inviare direttamente a `main` se il lavoro
   è approvato per produzione.
5. Attendere il completamento della build Vercel.
6. Controllare l'URL di produzione, non un URL Preview.
7. Eseguire smoke test su home, pagina modificata e servizi trasversali coinvolti.

`vercel.json` abilita il deploy Git soltanto per `main`. Un branch temporaneo non deve
generare preview nel flusso ordinario; se usato, va integrato e rimosso appena concluso.

## Smoke test per area

- Pubblico: home, navbar mobile, footer, asset e metadata.
- Auth: login, cockpit, sottodominio con ruolo e logout.
- API/dati: lettura, mutazione autorizzata e risposta non autorizzata.
- Archivio: hub, pagina profonda, CSS, immagine e PDF.
- DNS: radice, `www` e sottodominio coinvolto.

## Rollback applicazione

Se il deploy è compilato ma difettoso:

1. valutare impatto e sospendere operazioni mutanti se necessario;
2. usare il redeploy/rollback Vercel verso l'ultimo deployment sano oppure creare un
   commit che annulla la modifica;
3. non riscrivere distruttivamente la cronologia condivisa;
4. verificare che lo schema dati sia compatibile con la versione ripristinata;
5. ripetere smoke test e annotare causa/decisione.

## Rollback dati

Il rollback del codice non ripristina Redis, Tally o Google Sheets. Per una migrazione
dati, definire prima backup/esportazione, passo inverso e compatibilità. Se i dati sono
stati modificati senza backup, fermare le scritture e coinvolgere chi gestisce Upstash
prima di tentare correzioni massive.

## Problemi DNS

Non cambiare subito nameserver o record multipli. Prima separare:

- build Vercel fallita;
- dominio non assegnato al progetto;
- record Cloudflare errato/proxato;
- certificato in propagazione;
- errore applicativo su un solo host.

Confrontare radice, `www` e un sottodominio sano. Conservare screenshot/valori dei
record senza includere token o credenziali.

## Prima di modificare

- Verificare se il deploy cambia schema Redis, cookie, segreti o routing.
- Un cambio a `SESSION_SECRET` disconnette tutti gli utenti.
- Un rollback di pagine annuali può ripristinare date/link scaduti: controllarli.
- Non attivare piattaforme di hosting parallele come scorciatoia a un problema Vercel.
