# Immagine corrente del sito

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Fonte principale:** `src/app/globals.css` e componenti in `src/components/`

Questo documento fotografa l'identità visiva corrente. Va aggiornato raramente e
soltanto quando cambia davvero il linguaggio grafico dell'intero sito. Gli snapshot
storici devono conservare la copia dell'immagine valida al momento della cattura.

## Personalità visiva

Il sito pubblico è energico, accessibile e associativo: superfici chiare, rosso
Gulliver come accento dominante, tipografia moderna, grandi titoli e componenti
arrotondati. Non deve sembrare né un portale ministeriale né una startup generica.
Le pagine operative interne sono invece cockpit scuri e compatti, distinti da un
colore di servizio ma riconoscibili come parte della stessa famiglia.

## Fondamenta del sito pubblico

### Colori

I token canonici sono in `src/app/globals.css`; usare le variabili CSS invece di
duplicare valori esadecimali nei componenti.

| Ruolo | Token/valore | Uso |
| --- | --- | --- |
| Rosso primario | `--red-primary: #e40329` | CTA, link importanti, tag, icone |
| Rosso scuro | `--red-dark: #b30020` | hover e gradienti |
| Rosso profondo | `--red-darker: #800016` | contrasti e gradienti |
| Rosso chiaro | `--red-light: #ec4d68` | accenti secondari |
| Testo scuro | `--dark: #1a1a1a` | titoli e testo principale |
| Fondo | bianco e grigi molto chiari | pagine, sezioni alternate, card |

Il rosso va usato per orientare, non per riempire ogni superficie. Un nuovo colore
saturo richiede una ragione funzionale, un controllo di contrasto e l'aggiornamento
di questo documento.

### Tipografia

- **Outfit:** titoli, numeri importanti e messaggi ad alta personalità.
- **Inter:** testo corrente, controlli, tabelle e contenuti lunghi.
- Le font sono importate da Google Fonts nel foglio globale.
- I titoli sono netti e generosi; il corpo deve restare leggibile anche su mobile.

### Forma, spazio e profondità

- Raggi ricorrenti: 6, 12, 20 e 32 px, più pillole completamente arrotondate.
- Larghezza massima del contenuto: 1200 px tramite `.container`.
- Le sezioni respirano in verticale; sui dispositivi piccoli la spaziatura diminuisce.
- Le ombre sono morbide e discrete. Non usare ombre nere dure o effetti 3D.
- Le transizioni devono essere brevi e spiegare un cambio di stato, non decorare.

### Componenti ricorrenti

- `.section-tag`: etichetta a pillola rossa sopra un titolo.
- `.btn`, `.btn-primary`, `.btn-outline`: pulsanti canonici.
- `.card`: pannello bianco arrotondato con bordo/ombra leggera.
- `.container` e `.section`: griglia e ritmo verticale comuni.
- Hero: titolo forte, messaggio breve, CTA evidente, spesso con gradiente rosso.

Prima di creare un nuovo componente, verificare se uno di questi pattern o un
componente in `src/components/` risolve già il problema.

## Navigazione e contenuto

La navbar e il footer sono parte dell'identità del sito pubblico. Le etichette devono
essere brevi, comprensibili anche a una matricola e coerenti tra desktop e mobile.
I testi usano un tono diretto, inclusivo e concreto. Le CTA descrivono l'azione
(`Scarica la guida`, `Entra nel gruppo`) invece di usare formule vaghe (`Scopri di più`)
quando è possibile essere specifici.

## Pannelli interni

I servizi autenticati usano fondi quasi neri (`#080810` / `#0f0f11`), pannelli scuri,
testo bianco/grigio e bordi sottili. Il colore identifica il servizio:

| Servizio | Accento corrente |
| --- | --- |
| Admin, form e popup | rosso Gulliver |
| Appunti | blu `#3b82f6` |
| Comunicazione | viola `#8b5cf6` |
| Direttivo | rosa `#ec4899` |

Una pagina interna non deve importare navbar e footer pubblici. Il layout radice li
nasconde sui sottodomini operativi.

## Responsive e accessibilità

- Breakpoint di riferimento presenti nel CSS: 1024, 768 e 480 px.
- Ogni funzione deve essere utilizzabile almeno a 320 px di larghezza.
- Mantenere focus visibile, target touch comodi, alternative testuali e ordine
  semantico dei titoli.
- Non affidare un significato al solo colore.
- Prima di introdurre testo su rosso o su immagini, verificare il contrasto reale.

## Asset

Loghi, immagini social, hero e PDF sono in `public/`. Riutilizzare gli asset canonici
invece di crearne copie con nomi quasi uguali. Per sostituire un PDF mantenendo lo
stesso URL, verificare cache e contenuto; per una nuova edizione annuale usare una
cartella nominata per anno.

## Prima di modificare

1. Confrontare la proposta con i token e i componenti esistenti.
2. Verificare almeno home, una pagina editoriale, una pagina elezioni e un pannello
   interno a desktop e mobile.
3. Controllare che navbar, footer, popup e metadati social restino coerenti.
4. Se il cambiamento è radicale, registrare la decisione, aggiornare questo file e
   generare uno snapshot della versione precedente prima del deploy.
5. Non modificare gli asset dentro `public/archivio/<anno>/`: sono congelati.
