# Design system dell'area riservata

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-08-27, commit `0ffe576`
- **Punti di ingresso:** `src/components/riservata/`, `/riservata-preview`

## Scopo

Le nove pagine dell'area riservata non avevano un layout comune: ognuna
ricostruiva da zero sfondo, intestazione, spinner e notifiche dentro un blocco
`<style jsx global>`. Ne risultavano circa 2.800 righe di CSS in gran parte
duplicato e token incoerenti fra pagine — due sfondi scuri, tre verdi di
successo, due rossi d'errore.

Questo modulo è la fonte unica di stile e comportamento per tutte le aree
protette. Il sito pubblico non lo usa e non ne è toccato.

## Impianto

Un solo CSS Module, `riservata.module.css`, consumato esclusivamente da
componenti primitivi. Lo stesso file importato da più componenti produce gli
stessi nomi hashati: è così che le primitive condividono le classi senza
`composes`. In cambio si ottiene un namespace isolato, che impedisce alle
classi di raggiungere il sito pubblico.

```
src/components/riservata/
├─ riservata.module.css   token, primitive, animazioni
├─ areas.ts               AREA_ACCENT, ROLE_ACCENT, AVAILABLE_ROLES
├─ navigation.ts          indirizzi fra sottodomini, sessione, logout
├─ feedback.ts            raToast() e raConfirm()
└─ Ra*.tsx                le primitive
```

## Regole da non violare

1. **Il CSS non scrive mai `--ra-accent`.** La imposta `RaPage` inline
   leggendola da `AREA_ACCENT`; il foglio si limita a consumarla, derivando le
   tinte con `color-mix()`. È così che sei aree stanno in un solo blocco di
   regole, senza alcun selettore `[data-area]`.

2. **`--ra-accent` è l'identità dell'area, non uno stato.** I colori di stato
   (`--ra-ok`, `--ra-danger`, `--ra-warn`, `--ra-info`) e la tavolozza dei
   formati del calendario editoriale restano indipendenti: altrimenti il rosso di
   "errore" diventerebbe viola nell'area comunicazione.

3. **Non ridefinire mai un token di `globals.css`** (`--red-primary`,
   `--white`, `--radius-*`, `--font-*`, `--transition-*`): si riusano. È ciò
   che permette all'anteprima del pop-up di mostrare il modal come appare
   davvero sul sito pubblico. I token nuovi hanno tutti prefisso `--ra-`.

4. **I `@keyframes` dei CSS Module vengono rinominati** e non sono visibili da
   altri file: stanno solo nel modulo condiviso e li usano solo le primitive. Un
   `page.module.css` che li richiamasse fallirebbe in silenzio, senza errore di
   build. Per le entrate di pagina si riusa `.animate-fade-up` di
   `globals.css`, che è globale.

5. **I moduli di pagina non ridefiniscono mai una classe primitiva.** Le
   personalizzazioni passano da una prop `variant`/`size`, da una custom
   property, o da un contenitore esterno.

6. **Nessun nome di classe derivato dai dati.** Mai
   `className={`badge ${riga.stato}`}`: un valore inatteso in Redis
   produrrebbe un elemento senza stile. Il tono si sceglie esplicitamente.

## Colore per area

`AREA_ACCENT` in `areas.ts` è la fonte di verità, e coincide con quanto la
dashboard hub mostra sulle proprie card.

| Area | Accento |
|---|---|
| tesserati (hub, accesso, registrazione) | `#e40329` rosso Gulliver |
| admin | `#e40329` |
| appunti | `#3b82f6` |
| popup | `#f59e0b` |
| forms | `#10b981` |
| comunicazione | `#8b5cf6` |
| direttivo | `#ec4899` |

## Tipografia scura senza `!important`

`globals.css` colora `h1..h6` di scuro per il sito pubblico. Ogni pagina
dell'area riservata lo sovrascriveva con un blocco `!important` replicato.
Non serve più: `.scope :is(h1,…)` batte la regola globale per specificità
— (0,1,1) contro (0,0,1) — in qualunque ordine di caricamento dei chunk.

## Primitive

`RaPage` (guscio, token, alone, host di notifiche), `RaHeader`, `RaButton`
(otto varianti), `RaCard`, `RaField` con `RaInput`/`RaSelect`/`RaTextarea`,
`RaTable`, `RaTabs`, `RaModal`, `RaAlert`, `RaBadge`, `RaSpinner`,
`RaLoadingScreen`, `RaEmptyState`, `RaStatCard`, `RaToggle`,
`RaRoleSelector`, `RaList`.

`raToast()` e `raConfirm()` sono imperative e appoggiate a uno store esterno,
non a un Context: il provider è montato da `RaPage`, che è figlio del
componente pagina, quindi un hook chiamato dalla pagina non lo vedrebbe.
`raConfirm` ricade su `window.confirm` se nessun host è montato, così una
chiamata non perde mai la risposta.

## Insidie già incontrate

- **Indirizzi fra sottodomini.** Dipendono da `window.location.host`, che sul
  server non esiste: calcolarli durante il render produce un errore di
  idratazione. Si usano `useAreaUrl`/`useDashboardUrl`, costruiti su
  `useSyncExternalStore`.
- **`<dialog>` e il reset globale.** `globals.css` azzera ogni `margin`,
  compreso il `margin: auto` che il browser assegna ai dialog modali: senza
  una riga esplicita restano in alto a sinistra.
- **Blocco dello scorrimento.** Va legato al ciclo di vita dell'effetto, non al
  nodo del dialog: alla chiusura il nodo è già uscito dal DOM e la pagina
  resterebbe non scrollabile.
- **Chiusura con Esc.** L'evento nativo `cancel` non arriva a `onCancel` di
  React: serve un listener nativo.
- **Toast e modali.** Un `<dialog>` modale sta nel top layer, quindi un toast
  mostrato mentre una modale è aperta finisce dietro. Nei flussi reali il
  messaggio arriva dopo la chiusura, ma è bene saperlo.

## Verifica

Le pagine reali stanno dietro il login. Per controllare la resa senza
credenziali esiste `/riservata-preview`: tavolozza dei token per tutte le aree,
ogni primitiva in ogni stato, e la griglia dell'hub provata da una a sei card.

La pagina è protetta da `notFound()` in produzione: `src/proxy.ts` lascia
passare qualunque percorso quando il sottodominio è vuoto o `www`, e
`src/app/robots.ts` consente l'indicizzazione dell'intero sito.

Per le pagine autenticate in locale conviene la via basata sui percorsi su
`localhost` puro (`localhost:3000/tesserati/login`, poi `/admin`, `/appunti`
e così via): il cookie di sessione è host-only fuori da `gulliverancona.it`,
quindi passare da `localhost` a `tesserati.localhost` perde la sessione.

## Prima di modificare

- Un cambiamento a `riservata.module.css` tocca tutte e nove le pagine:
  controllarle nel banco di anteprima.
- `globals.css` è condiviso con il sito pubblico e non va modificato per
  esigenze dell'area riservata.
- Aggiungendo un'area nuova: inserirla in `AreaId`, `AREA_ACCENT`,
  `AREA_LABEL`, `AREA_TITLE`, `AREA_HOST` e nella mappa di `src/proxy.ts`.
