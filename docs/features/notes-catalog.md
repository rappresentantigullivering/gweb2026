# Catalogo appunti

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `appunti.gulliverancona.it`, `/api/appunti`

## Scopo e flusso

Il servizio permette a persone autorizzate di cercare appunti digitali e cartacei,
filtrare il catalogo, copiare informazioni e aprire le risorse associate. Non conserva
il catalogo nel repository: il foglio Google è la fonte editoriale.

## Implementazione

- UI: `src/app/appunti/page.tsx`.
- API protetta: `src/app/api/appunti/route.ts`.
- Origine: export CSV Google Sheets.
- Configurazione: `NEXT_PUBLIC_APPUNTI_SHEET_ID`.
- Tab: GID `0` digitali, `1603948657` cartacei.
- Cache: revalidation di circa 60 secondi.

L'API include un parser CSV e mappa colonne attese in oggetti usati da ricerca e
filtri. Il ruolo richiesto è `appunti` oppure `admin`.

### Contratto colonne corrente

| Tipo | Indici usati |
| --- | --- |
| Digitali | 0 ID, 1 facoltà, 2 anno, 3 semestre, 5 materia, 6 professore, 7 tipo, 8 anno accademico, 9 descrizione, 10 qualità, 11 watermark (`S`), 12 link |
| Cartacei | 1 facoltà, 2 anno, 3 materia, 4 professore, 5 tipo, 6 descrizione |

Per i cartacei l'ID è generato dalla posizione della riga (`c-<indice>`); un riordino
del foglio può quindi cambiare gli ID anche se il contenuto resta uguale.

## Dipendenze

- Foglio condiviso pubblicabile/esportabile via CSV.
- GID, intestazioni e ordine colonne stabili.
- SSO, Redis sessioni e DNS del sottodominio.

## Prima di modificare

- Considerare foglio e parser come un contratto: cambiare insieme entrambe le parti.
- Non esporre nel CSV dati personali o link che non devono essere accessibili agli
  utenti del ruolo.
- Non rimuovere l'autorizzazione API confidando nel solo sottodominio.
- Verificare apostrofi, virgole, virgolette, righe vuote e caratteri non ASCII.
- `src/app/admin/AppuntiTab.tsx` esiste ma non risulta collegato al pannello admin:
  controllarne i consumatori prima di modificarlo o archiviarlo.

## Verifica

1. Caricare entrambi i tab e confrontare un campione col foglio.
2. Provare ricerca, filtri, copia e link.
3. Modificare una riga di test e verificare il refresh dopo la cache.
4. Provare foglio non raggiungibile e CSV malformato.
5. Verificare 401/403 senza sessione/ruolo.

## Limiti noti

Lo schema non è formalizzato e non ha test fixture versionate. Un refactor utile è
definire intestazioni attese e validazione esplicita con messaggi di errore operativi.
