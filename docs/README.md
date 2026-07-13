# Manuale tecnico del sito Gulliver

Questa cartella è la fonte di verità tecnica per il sito `gulliverancona.it`.
Serve al passaggio di consegne tra membri dell'associazione e a fornire contesto a
chiunque intervenga sul progetto, inclusi eventuali assistenti di sviluppo.

Il `README.md` nella radice resta la presentazione pubblica del repository. Questo
manuale descrive invece il funzionamento interno, i vincoli e le procedure operative.

## Come usare il manuale

Prima di modificare una funzione:

1. leggere [architettura](project/architecture.md),
   [sicurezza e accessi](project/security-and-access.md) e il documento della
   funzione interessata;
2. controllare la sezione **Prima di modificare** per conoscere dipendenze e
   possibili effetti collaterali;
3. verificare se la modifica richiede di aggiornare
   [l'immagine corrente](current-image.md), una variabile d'ambiente, il DNS o
   una procedura annuale;
4. aggiornare il documento funzionale nello stesso commit del codice;
5. eseguire `npm run docs:check`, `npm run lint` e `npm run build`.

La documentazione descrive prima di tutto ciò che il codice implementa davvero.
Le idee non ancora realizzate sono marcate esplicitamente come **Proposta** e non
devono essere scambiate per funzionalità disponibili.

## Mappa del progetto

### Fondamenti

- [Architettura](project/architecture.md): componenti, flussi e confini del sistema.
- [Route e domini](project/routes-and-domains.md): URL pubblici, sottodomini e rewrite.
- [Dati e integrazioni](project/data-and-integrations.md): Redis, Google Sheets, Tally,
  Telegram, Vercel e Cloudflare.
- [Sicurezza e accessi](project/security-and-access.md): sessioni, ruoli, cookie e segreti.
- [Deploy e DNS](project/deployment-and-dns.md): produzione, record DNS e variabili.
- [Sviluppo locale](project/development.md): avvio, test e convenzioni.
- [Manutenzione della documentazione](project/documentation-maintenance.md): standard e
  responsabilità.
- [Rischi e debito noto](project/known-risks.md): problemi conosciuti e verifiche aperte.

### Identità visiva

- [Current image](current-image.md): colori, font, componenti, tono e regole di coerenza.

### Funzionalità

- [Sito pubblico e navigazione](features/public-site.md)
- [Risorse per matricole](features/student-resources.md)
- [Elezioni studentesche](features/student-elections.md)
- [Associazione culturale](features/cultural-association.md)
- [Rappresentanza, proposte e contatti](features/representation-and-contacts.md)
- [Trasparenza e privacy](features/transparency-and-privacy.md)
- [Autenticazione e cockpit tesserati](features/authentication-and-cockpit.md)
- [Gestione utenti e ruoli](features/user-administration.md)
- [Form dinamici](features/dynamic-forms.md)
- [Catalogo appunti](features/notes-catalog.md)
- [Calendario comunicazione](features/communication-calendar.md)
- [Popup globale](features/global-popup.md)
- [Archivio statico](features/static-archive.md)
- [SEO, analytics e condivisione](features/seo-and-analytics.md)
- [Portale direttivo](features/executive-portal.md)

### Procedure operative

- [Deploy e rollback](runbooks/deploy-and-rollback.md)
- [Creazione di uno snapshot](runbooks/create-snapshot.md)
- [Aggiornamento annuale dei contenuti](runbooks/annual-content-update.md)
- [Incidenti e recupero accessi](runbooks/incidents-and-access-recovery.md)

### Decisioni e proposte

- [Registro delle decisioni](decisions/decision-log.md)
- [Proposta: verifica matricola](decisions/proposed-student-verification.md)
- [Template per una nuova funzionalità](templates/feature.md)

## Regole non negoziabili

- Uno snapshot archivia una versione pubblica del sito: non autorizza a eliminare
  API, pannelli, autenticazione o altre funzioni vive.
- Le pagine raggiungibili dal sito corrente si rimuovono solo con una decisione
  esplicita e dopo aver verificato link, sitemap, sottodomini e consumatori API.
- Non inserire mai password, token, cookie, URL Redis con credenziali o dati personali
  nella documentazione o nella cronologia Git.
- Il deploy ordinario avviene da `main` su Vercel. Le preview sono disabilitate per
  gli altri branch nella configurazione del repository.
- Se documentazione e codice divergono, verificare il codice e correggere la
  documentazione nello stesso intervento.

## Stato di questa edizione

- Ultima verifica completa: **2026-07-13**
- Commit di riferimento iniziale: `3eae46f`
- Stack verificato: Next.js 16.2.3, React 19.2.4, TypeScript, Upstash Redis, Vercel
- DNS verificato: Cloudflare; sottodomini applicativi collegati allo stesso progetto
