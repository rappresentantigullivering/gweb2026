# Registro delle decisioni architetturali

## Metadati

- **Stato:** Implementata come registro
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** decisioni trasversali del progetto

Le decisioni spiegano il “perché” che il solo codice non mostra. Aggiungere una voce
quando una scelta cambia confini, dati, sicurezza, deploy o compatibilità. Non usare il
registro come diario di ogni commit.

## Decisioni correnti

### D-001 — Manuale tecnico in `docs/`

- **Stato:** accettata.
- **Decisione:** separare documentazione operativa dal codice `src/`, mantenendo il
  README radice come presentazione pubblica.
- **Perché:** evita che materiale non eseguibile sembri parte della build e offre una
  fonte di verità facilmente portabile.
- **Conseguenza:** ogni funzione ha un documento; modifiche funzionali aggiornano
  codice e manuale insieme.

### D-002 — Un solo progetto Next.js per pubblico e servizi

- **Stato:** in uso.
- **Decisione:** sottodomini e sito pubblico condividono deploy, sessione e repository.
- **Perché:** riduce duplicazione e semplifica il passaggio fra servizi.
- **Conseguenza:** proxy, cookie e layout sono componenti ad alto impatto trasversale.

### D-003 — SSO con sessione firmata e validità Redis

- **Stato:** in uso.
- **Decisione:** cookie firmato condiviso e chiave Redis per revoca server-side.
- **Perché:** accesso unico ai sottodomini con possibilità di logout/revoca immediata.
- **Conseguenza:** Redis e `SESSION_SECRET` sono dipendenze critiche.

### D-004 — Snapshot come export statico indipendente

- **Stato:** in uso dal 2025.
- **Decisione:** ogni snapshot contiene asset propri in `public/archivio/<anno>/`.
- **Perché:** conserva l'aspetto storico anche dopo modifiche al sito corrente.
- **Conseguenza:** l'export si costruisce da copia temporanea e non sostituisce funzioni
  vive o backup dati.

### D-005 — Produzione su Vercel da `main`

- **Stato:** in uso.
- **Decisione:** deploy Git ordinari soltanto da `main`; preview degli altri branch
  disabilitate salvo esigenza esplicita.
- **Perché:** flusso rapido e univoco per le modifiche correnti.
- **Conseguenza:** `main` deve essere sempre costruibile e sottoposta ai controlli
  prima del push.

### D-006 — Dati operativi esterni al filesystem

- **Stato:** in uso.
- **Decisione:** Redis per configurazioni/sessioni, Google Sheets per catalogo appunti,
  Tally per risposte form.
- **Perché:** persistenza adatta a deploy serverless e gestione editoriale esistente.
- **Conseguenza:** rollback Git non ripristina dati e i contratti esterni vanno
  documentati/verificati.

## Formato per nuove decisioni

```md
### D-NNN — Titolo

- **Stato:** proposta / accettata / sostituita.
- **Contesto:** problema e vincoli.
- **Decisione:** scelta precisa.
- **Perché:** motivazione e alternative scartate.
- **Conseguenza:** costi, rischi, migrazione e rollback.
```

## Prima di modificare

- Non riscrivere una decisione storica per farla sembrare sempre corretta: marcarla
  sostituita e collegare la nuova.
- Una proposta non diventa accettata solo perché esiste un documento.
- Collegare la decisione ai documenti funzionali che ne dipendono.
