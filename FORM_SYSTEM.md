# Sistema di Gestione Form Tally — Gulliver UNIVPM

> Documentazione tecnica completa dell'architettura implementata per la gestione dinamica dei form Tally sul dominio `gulliverancona.it`.

---

## Indice

1. [Panoramica](#1-panoramica)
2. [Architettura del sistema](#2-architettura-del-sistema)
3. [Database: Upstash Redis](#3-database-upstash-redis)
4. [API Route: `/api/forms/`](#4-api-route-apiforms)
5. [Pannello Admin](#5-pannello-admin)
6. [Renderer pubblico: `forms.gulliverancona.it`](#6-renderer-pubblico-formsgulliverancona-it)
7. [Proxy di routing sottodomini](#7-proxy-di-routing-sottodomini)
8. [DNS e Cloudflare](#8-dns-e-cloudflare)
9. [Deploy e variabili d'ambiente](#9-deploy-e-variabili-dambiente)
10. [Analisi di sicurezza](#10-analisi-di-sicurezza)
11. [Guida operativa (per chi gestisce i form)](#11-guida-operativa)
12. [Risoluzione problemi comuni](#12-risoluzione-problemi-comuni)

---

## 1. Panoramica

### Problema risolto
Prima di questo sistema, ogni nuovo form Tally richiedeva:
1. Accesso al repository GitHub
2. Modifica manuale del codice
3. Attesa di un nuovo deploy su Vercel (~2 min)

### Soluzione implementata
Un sistema **completamente serverless e in tempo reale** composto da:

| Componente | URL | Scopo |
|---|---|---|
| Pannello Admin | `admin.gulliverancona.it` | Gestione form (solo per noi) |
| Renderer Pubblico | `forms.gulliverancona.it/[slug]` | Link da condividere agli studenti |
| API Backend | `gulliverancona.it/api/forms/` | CRUD su database Redis |
| Database | Upstash Redis (cloud) | Storage persistente degli stati |

### Flusso in 3 passaggi
```
[Admin] Crea form "volontari" → [Redis] Salva {tallyId, title, status}
[Studente] Visita forms.gulliverancona.it/volontari → [Server] Legge Redis → Mostra iframe Tally
[Admin] Sospende "volontari" → [Redis] status = "suspended" → Studente vede pagina sospensione
```

Tutto **senza build, senza deploy, in tempo reale**.

---

## 2. Architettura del sistema

```
┌─────────────────────────────────────────────────────────┐
│                    CLOUDFLARE (DNS)                      │
│  admin.gulliverancona.it  →  CNAME → gulliverancona.it  │
│  forms.gulliverancona.it  →  CNAME → gulliverancona.it  │
└──────────────────────┬──────────────────────────────────┘
                       │ Tutte le richieste arrivano a Vercel
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  VERCEL (Next.js 16)                     │
│                                                          │
│  proxy.ts                                                │
│  ├── admin.gulliverancona.it/* → riscrive in /admin/*   │
│  ├── forms.gulliverancona.it/slug → riscrive in /f/slug │
│  └── /api/* → passa diretto (no rewrite)                │
│                                                          │
│  src/app/                                                │
│  ├── admin/page.tsx     ← Dashboard admin               │
│  ├── f/[slug]/page.tsx  ← Renderer pubblico form        │
│  └── api/forms/route.ts ← API protetta da password      │
│                                                          │
│  Database: Upstash Redis (esterno, sempre attivo)        │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Database: Upstash Redis

### Perché Upstash
- **Piano Free permanente** (non va in pausa come Supabase)
- **REST API**: funziona da serverless senza connessioni persistenti
- **Nessuna eviction** sul piano free (i dati non vengono mai cancellati automaticamente)

### Struttura dati
Un'unica chiave Redis `gulliver:forms` contiene un oggetto JSON:

```json
{
  "volontari": {
    "tallyId": "wA1B2c",
    "title": "Diventa Volontario",
    "status": "active"
  },
  "bando-gruppi": {
    "tallyId": "W0e5ba",
    "title": "Bando Gruppi Spalla",
    "status": "suspended"
  }
}
```

### Stati possibili
| Stato | Effetto per lo studente |
|---|---|
| `active` | Vede l'iframe Tally a schermo intero |
| `suspended` | Vede la pagina "Iscrizioni Sospese" con logo Gulliver |

> **Nota:** Lo stato `deleted` non esiste come valore — un form eliminato viene rimosso completamente dalla chiave Redis, quindi il suo URL restituisce 404.

---

## 4. API Route: `/api/forms/`

**File:** `src/app/api/forms/route.ts`

### GET — Lettura pubblica
```
GET /api/forms/
```
- **Autenticazione:** Nessuna (i form attivi sono pubblici)
- **Response:** Oggetto JSON con tutti i form e i loro stati
- **Usata da:** `forms.gulliverancona.it/[slug]` per mostrare il form corretto

### POST — Scrittura protetta
```
POST /api/forms/
Authorization: Bearer <ADMIN_PASSWORD>
Content-Type: application/json
```

#### Azioni disponibili

| `action` | Parametri aggiuntivi | Effetto |
|---|---|---|
| `verify` | — | Verifica la password senza toccare il DB (usato dal login) |
| `create` | `slug`, `tallyId`, `title` | Crea un nuovo form (status: active) |
| `update` | `slug`, `tallyId`, `title`, `status` | Modifica un form esistente |
| `delete` | `slug` | Rimuove definitivamente il form dal DB |

#### Slug riservati (bloccati dall'API)
`__ping__`, `__verify__`, `__test__`, `api`, `admin`, `f`

---

## 5. Pannello Admin

**File:** `src/app/admin/page.tsx`
**URL:** `admin.gulliverancona.it`

### Accesso
1. Visita `admin.gulliverancona.it`
2. Inserisci la password impostata in `ADMIN_PASSWORD` su Vercel
3. Il login **verifica la password realmente sull'API** (action: verify) prima di concedere l'accesso — una password sbagliata mostra un errore rosso senza entrare nella dashboard

### Funzionalità
- **Statistiche**: Contatori in tempo reale di form totali, attivi e sospesi
- **Crea form**: Inserisci URL Slug, ID Tally e Titolo interno
- **Anteprima URL**: Mostra in tempo reale il link che verrà generato
- **Cambia stato**: Dropdown per passare da Attivo a Sospeso e viceversa (effetto istantaneo)
- **Elimina form**: Rimozione definitiva con conferma
- **Badge versione**: Mostra i primi 7 caratteri del commit SHA dell'ultimo deploy

### Come trovare l'ID Tally
1. Vai su [tally.so](https://tally.so) e apri il tuo form
2. Clicca "Share" → copia il link
3. L'ID è la parte finale dell'URL: `https://tally.so/r/**wA1B2c**`

---

## 6. Renderer pubblico: `forms.gulliverancona.it`

**File:** `src/app/f/[slug]/page.tsx`

Questa è una **Server Component dinamica** (non cached): ad ogni visita dello studente, il server legge Redis in tempo reale e decide cosa mostrare.

### Comportamento per slug

| Condizione | Cosa vede lo studente |
|---|---|
| Slug non trovato in Redis | Pagina 404 di Next.js |
| `status: "suspended"` | Pagina "Iscrizioni Sospese" (stile Gulliver, logo, CTA) |
| `status: "active"` | Iframe Tally a schermo intero (sfondo bianco) |

> **Importante:** L'iframe Tally usa `src` diretto (senza `?transparentBackground=1`) perché il parametro rendeva il testo bianco su sfondo bianco, quindi illeggibile.

---

## 7. Proxy di routing sottodomini

**File:** `src/proxy.ts` *(rinominato da `middleware.ts` nella migrazione a Next.js 16)*

Il proxy intercetta **tutte le richieste** al dominio Vercel (comprese quelle dai sottodomini) e le riscrive internamente. Questo permette di avere URL "puliti" senza deploy separati.

```typescript
// admin.gulliverancona.it/       → riscrive in /admin/
// admin.gulliverancona.it/qualcosa → riscrive in /admin/qualcosa
// (ma NON riscrive /api/* per evitare CORS/loop)

// forms.gulliverancona.it/volontari → riscrive in /f/volontari
```

### Matcher (cosa il proxy ignora)
- `/api/*` — chiamate al backend (essenziale! senza questa eccezione, le chiamate API venivano riscritte in `/admin/api/...` e fallivano)
- `/_next/*` — asset statici di Next.js
- File con estensioni: `.png`, `.svg`, `.ico`, `.webmanifest`, `.json`, ecc.

### Root Layout condizionale
**File:** `src/app/layout.tsx`

Il layout root legge l'header HTTP `host` lato server e **nasconde Navbar e Footer** per i sottodomini `admin.` e `forms.`, evitando la sovrapposizione della navigazione del sito principale.

---

## 8. DNS e Cloudflare

### Record DNS necessari (su Cloudflare)

| Tipo | Nome | Target | Proxy |
|---|---|---|---|
| CNAME | `admin` | `gulliverancona.it` | Attivo (proxy arancione) |
| CNAME | `forms` | `gulliverancona.it` | Attivo (proxy arancione) |

> **Importante:** Le **Cloudflare Transform Rules** NON sono necessarie. Il routing è gestito interamente dal proxy Next.js (`src/proxy.ts`).

### Impostazione SSL richiesta
Cloudflare SSL/TLS deve essere impostato su **Full** (non Flexible). Con Flexible si crea un loop di redirect infiniti perché Cloudflare parla con Vercel in HTTP mentre Vercel forza HTTPS.

### Domini aggiunti su Vercel
Entrambi i sottodomini devono essere aggiunti nella sezione **Domains** del progetto Vercel:
- `admin.gulliverancona.it`
- `forms.gulliverancona.it`

---

## 9. Deploy e variabili d'ambiente

### Variabili d'ambiente su Vercel

| Variabile | Valore | Dove trovarlo |
|---|---|---|
| `UPSTASH_REDIS_REST_URL` | `https://tight-martin-....upstash.io` | Upstash Console → REST API |
| `UPSTASH_REDIS_REST_TOKEN` | `gQAAA...` | Upstash Console → REST API |
| `ADMIN_PASSWORD` | password scelta da noi | Impostala tu su Vercel |

> **Attenzione:** Non committare mai questi valori nel repository. Vanno impostati SOLO su Vercel.

### Badge versione automatico
Vercel inietta automaticamente `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA` ad ogni deploy. I primi 7 caratteri vengono mostrati come badge versione nel pannello admin, senza nessuna configurazione aggiuntiva.

---

## 10. Analisi di sicurezza

### Punti forti

| Aspetto | Valutazione |
|---|---|
| Le credenziali Redis non sono nel codice | Solo in env vars Vercel |
| La password admin è server-side | Mai esposta al client |
| Il database è read-only per gli studenti | GET non richiede auth |
| Nessun cookie/sessione persistente | La sessione muore con la pagina |
| HTTPS forzato via Cloudflare | Si |
| Slug riservati bloccati dall'API | Aggiunto come protezione |

### Rischi residui e mitigazioni

#### 1. Nessun rate limiting sull'API
**Rischio:** Un attaccante potrebbe tentare migliaia di password in breve tempo (brute force).
**Mitigazione attuale:** Cloudflare blocca automaticamente pattern di richieste sospette. Il piano free include protezione base.
**Soluzione consigliata:** Aggiungere `Cloudflare Rate Limiting` (1 richiesta/secondo per IP su `/api/forms/`) — gratuito fino a 10.000 richieste/mese.

#### 2. Password in chiaro nella comparazione
**Rischio:** Timing attack teorico (misurando il tempo di risposta si può indovinare la password carattere per carattere).
**Mitigazione:** Per un'associazione studentesca con password locale, questo rischio è trascurabile. In produzione si userebbe `crypto.timingSafeEqual`.

#### 3. Admin accessibile da `gulliverancona.it/admin`
**Rischio:** Il pannello admin è tecnicamente accessibile anche dall'URL diretto, non solo da `admin.`.
**Mitigazione attuale:** Chiunque raggiunga `/admin` deve comunque inserire la password corretta.
**Soluzione consigliata:** Nel proxy (`src/proxy.ts`), aggiungere un redirect da `gulliverancona.it/admin` a `admin.gulliverancona.it`.

#### 4. Nessun log degli accessi
**Rischio:** Non si sa chi ha fatto cosa e quando.
**Nota:** Vercel registra automaticamente tutte le richieste API nella sezione "Logs" del progetto con timestamp, IP, status code. Sufficienti per un audit base.

### Vettori di attacco non applicabili

| Attacco | Perché non si applica |
|---|---|
| **CSRF** | L'API usa `Authorization: Bearer` header (non cookie), che richiede JS per essere impostato — i form HTML classici non possono farlo |
| **XSS via dati Redis** | Solo admin autenticati scrivono su Redis; il frontend non esegue HTML da Redis come codice |
| **SQL Injection** | Non si usa SQL, Redis è key-value |
| **Path Traversal** | Gli slug vengono sanitizzati (solo `a-z`, `0-9`, `-`) |

---

## 11. Guida operativa

### Aggiungere un nuovo form

1. Crea il form su [tally.so](https://tally.so)
2. Copia l'ID Tally dall'URL (es. `wA1B2c`)
3. Vai su `admin.gulliverancona.it`
4. Compila i campi:
   - **URL Slug**: parola corta e descrittiva (es. `volontari`, `bando-musica`)
   - **ID Tally**: l'ID copiato al punto 2
   - **Titolo interno**: nome comprensibile per voi (es. "Iscrizioni Volontari 2026")
5. Clicca "Crea Link"
6. Il link `forms.gulliverancona.it/volontari` è immediatamente attivo

### Sospendere un form
1. Vai su `admin.gulliverancona.it`
2. Nella riga del form, apri il dropdown "Stato"
3. Seleziona "Sospeso"
4. Gli studenti vedono istantaneamente la pagina di sospensione

### Eliminare un form definitivamente
1. Vai su `admin.gulliverancona.it`
2. Clicca "Elimina" nella riga del form
3. Conferma nella finestra di dialogo
4. Il link restituirà 404 per sempre

---

## 12. Risoluzione problemi comuni

### Il pannello admin non si apre
- Verifica che i CNAME `admin` e `forms` siano presenti su Cloudflare (nuvoletta arancione attiva)
- Verifica che `admin.gulliverancona.it` e `forms.gulliverancona.it` siano aggiunti nelle Domains di Vercel
- Verifica che SSL/TLS su Cloudflare sia "Full" (non "Flexible")

### "Password errata" anche con la password giusta
- Verifica la variabile `ADMIN_PASSWORD` su Vercel (Settings → Environment Variables)
- Dopo aver modificato le env vars, devi fare un nuovo deploy su Vercel

### Il form Tally appare bianco/trasparente
- Questo era un bug risolto. Se riappare, verificare che nell'iframe non sia presente `?transparentBackground=1` nell'URL

### Appare un form chiamato `__ping__`
- Questo era un bug nella verifica del login, risolto nella versione corrente
- Per rimuoverlo: accedi all'admin, clicca "Elimina" sulla riga `__ping__`

### `forms.gulliverancona.it/slug` dà 500
- Verificare le variabili d'ambiente Redis su Vercel
- Controllare la sezione Logs di Vercel per il messaggio d'errore preciso
