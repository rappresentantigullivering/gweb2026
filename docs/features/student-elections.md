# Elezioni studentesche

## Metadati

- **Stato:** Implementata, contenuto stagionale 2026
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `/elezioni-studentesche` e sottopagine

## Scopo e flusso

L'area elezioni presenta candidatura, programma, liste, iniziative Gulliver46 e
strumenti informativi durante il voto. È un gruppo editoriale pubblico ad alta
visibilità, con molte pagine e dati temporali coordinati.

## Route e contenuti

- Hub: `/elezioni-studentesche`.
- Candidati: `/elezioni-studentesche/candidati`.
- Programma: indice e pagine `ateneo`, `dsu`, `acu`, `dottorand3`, `decentrate`,
  `ingegneria`, `medicina`, `economia`, `scienze`, `agraria`.
- Iniziativa: `/elezioni-studentesche/gulliver46`.
- Operatività voto: `/elezioni-studentesche/monitor-voto`.
- Utility: `/countdown`, esclusa dall'indicizzazione.

## Implementazione

Pagine, candidati e programma sono versionati nel codice. Immagini e PDF vivono in
`public/`. Countdown e finestre elettorali contengono date hard-coded; il popup globale
ha inoltre propri valori elettorali di default.

Le date rilevate per il ciclo 2026 sono 12–14 maggio 2026, con chiusura alle 17:00 del
14 maggio nel popup. Prima di riuso devono essere verificate nei singoli componenti:
non esiste ancora un'unica configurazione centrale.

## Dipendenze

- Navbar, home, sitemap, metadata social e popup globale.
- Link esterni alla piattaforma di voto.
- Asset di candidati, programma e comunicazione.
- Date e fuso `Europe/Rome`/offset espliciti.

## Prima di modificare

- Cercare globalmente anno, date, URL di voto e nomi delle liste.
- Non rimuovere pagine di candidati/programma dal sito corrente durante la creazione
  dello snapshot; archiviarle solo dopo una decisione esplicita e con link verificati.
- Coordinare popup, countdown, monitor voto, home e contenuti social.
- Non riutilizzare pagine vecchie cambiando soltanto il titolo: controllare metadata,
  immagini, alt text, PDF, testi e risultati di ricerca.
- Dopo le elezioni scegliere consapevolmente tra conservazione pubblica, redirect e
  snapshot; non lasciare stati misti.

## Verifica

1. Navigare hub, candidati e ogni sezione programma.
2. Testare countdown prima/durante/dopo usando date controllate in sviluppo.
3. Controllare link di voto e comportamento popup.
4. Verificare anteprime social e immagini su mobile.
5. Eseguire una ricerca globale di date/anno precedenti.

## Limiti noti

Date e contenuti sono distribuiti in più file. Una futura evoluzione utile è una
configurazione elettorale tipizzata e unica, mantenendo output statico dove possibile.
