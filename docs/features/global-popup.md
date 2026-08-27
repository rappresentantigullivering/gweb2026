# Popup globale

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-08-27, commit `0ffe576`
- **Punti di ingresso:** `popup.gulliverancona.it`, `/api/settings`, `VotingModal`

## Scopo e flusso

Il popup mostra sul sito pubblico un messaggio globale con titolo, testo e fino a due
azioni. Il pannello consente anteprima, modifica e attivazione/disattivazione. Il
browser ricorda l'interazione per la versione corrente, così lo stesso messaggio non
riappare continuamente; una modifica sostanziale incrementa la versione.

## Implementazione

- UI pubblica: componente `VotingModal` montato dal layout radice.
- Manager: `src/app/popup/page.tsx`.
- API: `src/app/api/settings/route.ts`.
- Persistenza: chiave Redis `gulliver:settings`.
- Ruoli mutanti: `popup`, `direttivo` o `admin`.
- Stato browser: localStorage `gulliver_vote_interacted_version`.

La versione cambia quando cambiano contenuto o pulsanti, non per ogni salvataggio. GET
è pubblico perché il sito deve leggere la configurazione; POST è protetto. Resta una
compatibilità Bearer legacy basata su `ADMIN_PASSWORD`.

Il componente contiene anche valori elettorali predefiniti e date 12–14 maggio 2026:
questo legame va controllato prima di ogni campagna non elettorale o nuova elezione.

L'interfaccia usa le primitive condivise descritte in
[Design system dell'area riservata](../project/design-system-riservata.md).

## Dipendenze

- Redis e API settings.
- Layout pubblico e localStorage.
- Eventuali URL esterni delle CTA.
- Date/campagna elettorale codificate nel componente.

## Prima di modificare

- Non incrementare la versione per edit non percepibili; non lasciarla invariata se il
  messaggio cambia, altrimenti chi ha chiuso il popup non vedrà l'aggiornamento.
- Verificare focus, chiusura, tastiera, mobile e lettori di schermo.
- Non mostrare il popup nei cockpit interni.
- Validare URL e testo; un link sbagliato viene propagato a tutto il traffico pubblico.
- Censire consumatori prima di rimuovere l'accesso Bearer legacy.

## Verifica

1. Attivare, vedere, chiudere e ricaricare il popup.
2. Cambiare il testo e verificare nuova versione/riapparizione.
3. Disattivarlo e controllare tutte le pagine pubbliche.
4. Provare CTA, anteprima, mobile e navigazione tastiera.
5. Verificare che utenti senza ruolo non possano salvare.

## Limiti noti

Nome del componente/localStorage e default sono ancora specifici del voto. Una futura
generalizzazione deve prevedere migrazione compatibile dello stato browser.
