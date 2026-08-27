# Portale direttivo

## Metadati

- **Stato:** Parziale
- **Ultima verifica:** 2026-08-27, commit `0ffe576`
- **Punti di ingresso:** `direttivo.gulliverancona.it`, `src/app/direttivo/page.tsx`

## Scopo e stato attuale

Il sottodominio riserva uno spazio autenticato al direttivo. Il routing, il ruolo e
l'identità visiva esistono, ma la pagina corrente è un placeholder/lavoro in corso e
non implementa ancora un flusso gestionale completo.

Il ruolo `direttivo` è riconosciuto da proxy, cockpit e pannello utenti. Gli utenti
admin possono accedere. L'API settings consente anche a questo ruolo di gestire il
popup globale.

## Implementazione

- UI: `src/app/direttivo/page.tsx`.
- Routing/RBAC: `src/proxy.ts`.
- Accesso dal cockpit: `src/app/tesserati/page.tsx`.
- Accento visivo corrente: rosa `#ec4899` su interfaccia scura.

L'interfaccia usa le primitive condivise descritte in
[Design system dell'area riservata](../project/design-system-riservata.md).

## Dipendenze

- SSO, Redis sessioni, ruolo `direttivo`.
- DNS e dominio Vercel.
- Eventuali future funzioni condivise con popup o comunicazione.

## Prima di modificare

- Non descrivere il portale come operativo finché non esistono flussi verificati.
- Definire utenti, dati, autorizzazioni e responsabilità prima di aggiungere moduli.
- Evitare di trasformare `direttivo` in un secondo `admin`: applicare il minimo
  privilegio a ogni API.
- Per dati sensibili definire retention, audit e privacy prima dell'implementazione.
- Aggiornare stato del documento e cockpit quando la prima funzione diventa attiva.

## Verifica

1. Accedere con ruolo direttivo, admin e utente senza ruolo.
2. Verificare rewrite, logout e layout senza navbar pubblica.
3. Per ogni nuova funzione aggiungere test autorizzazione server-side e documento
   dedicato se il dominio cresce.

## Limiti noti

Non ci sono ancora requisiti funzionali consolidati né persistenza dedicata. Ogni idea
va trattata come proposta finché non viene approvata e implementata.
