# Materiali operativi 2026

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit successivo a `7f4cf4e`
- **Punti di ingresso:** `docs/2026/qrcodes/`, `scripts/generate-qr-codes.mjs`

Questa cartella raccoglie artefatti usati per materiali stampati e comunicazione
dell'edizione 2026. Non viene servita direttamente dal sito: i file sono sorgenti da
consegnare a chi prepara grafiche, volantini o stampe.

## QR code

I PNG in `qrcodes/` sono immagini 1000×1000 ad alta leggibilità. Si rigenerano dalla
root del repository con:

```sh
npm run qr:generate
```

Il generatore contiene il manifesto nome → URL ed è la fonte di verità. Dopo ogni
rigenerazione, scansionare fisicamente tutti i codici prima di mandarli in stampa.

| File | Destinazione |
| --- | --- |
| `kit26_qr.png` | `https://www.gulliverancona.it/kit26/` |
| `guide26_qr.png` | `https://www.gulliverancona.it/guida26/` |
| `eng-guida26_qr.png` | `https://www.gulliverancona.it/eng-guida26/` |
| `gruppi26_qr.png` | `https://www.gulliverancona.it/gruppi26/` |
| `affittigulliver_qr.png` | canale Telegram Affitti Gulliver |
| `matricoleunivpm2025_qr.png` | canale Telegram denominato Matricole UNIVPM 2025 |
| `semestrefiltrounivpm2026_qr.png` | canale Telegram Semestre Filtro UNIVPM 2026 |

Il file del canale matricole mantiene `2025` nel nome perché questa è la destinazione
attualmente configurata. Prima di una nuova stampa va confermato che il canale sia
ancora quello corretto; non rinominare soltanto il PNG senza cambiare e verificare
anche l'URL nel generatore.

## Prima di modificare

- Non usare un QR direttamente in stampa senza scansione da almeno due telefoni.
- Gli URL del sito devono usare le route canoniche con slash finale.
- Per una nuova edizione creare `docs/<anno>/qrcodes/`; non sovrascrivere i materiali
  storici se sono già stati utilizzati.
- Se una destinazione cambia dopo la stampa, mantenere l'URL del sito e introdurre un
  redirect quando possibile invece di rendere inutilizzabile il materiale fisico.
- Non spostare questi PNG in `public/` a meno che debbano essere scaricabili dal sito.

## Verifica

1. Eseguire `npm run qr:generate` con accesso alla rete.
2. Controllare che tutti i PNG siano presenti e abbiano dimensione 1000×1000.
3. Scansionare ogni file e confrontare l'URL con la tabella.
4. Aprire le destinazioni da una sessione non autenticata e da mobile.
5. Eseguire `npm run docs:check` e il lint dello script.
