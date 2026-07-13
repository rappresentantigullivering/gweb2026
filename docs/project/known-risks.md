# Rischi e debito noto

## Metadati

- **Stato:** Parziale, registro vivo
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** intero progetto

Questa lista non sostituisce issue o test. Raccoglie i punti che una nuova persona
potrebbe non intuire leggendo una singola pagina.

## Priorità alta

1. **Fallback del segreto sessione.** Se `SESSION_SECRET` manca, il codice ripiega su
   `ADMIN_PASSWORD` e infine su una stringa nota. Verificare che Production abbia un
   segreto forte; valutare in futuro un errore esplicito in produzione.
2. **Recupero accessi.** Utenti e sessioni dipendono da Redis. Formalizzare proprietari,
   backup/esportazione e procedura di bootstrap senza committare credenziali.
3. **Compatibilità Bearer legacy.** Le API form/impostazioni accettano ancora
   `ADMIN_PASSWORD`; censire eventuali consumatori e rimuovere quando sicuro.

## Priorità media

1. **Privacy non allineata.** La pagina privacy contiene riferimenti a una precedente
   infrastruttura a doppio hosting e a dettagli cookie non coerenti con il codice.
   Serve revisione tecnica e legale prima di considerarla aggiornata.
2. **Sitemap incompleta.** La sitemap include route matricole storiche ma non tutte le
   route correnti `*26`; confrontarla periodicamente con la navigazione pubblica.
3. **Reminder senza scheduler versionato.** L'endpoint cron esiste ma `vercel.json` non
   definisce una pianificazione. Verificare e documentare lo scheduler esterno.
4. **Contratto Google Sheets implicito.** GID e colonne sono codificati; un riordino
   editoriale del foglio può rompere il catalogo.
5. **Date hard-coded.** Elezioni, popup elettorale, countdown e Gulliver Rock contengono
   date nel codice, quindi richiedono controllo annuale coordinato.
6. **Baseline lint non pulita.** Al 2026-07-13 `npm run lint` segnala 41 errori e 19
   warning preesistenti, soprattutto tipi `any`, hook e testo JSX. La build passa, ma
   il lint non può ancora fungere da gate globale finché il debito non viene risolto.

## Priorità bassa / evoluzione

1. Il portale direttivo è un placeholder autenticato, non un prodotto completo.
2. `src/app/admin/AppuntiTab.tsx` esiste ma non risulta integrato nella pagina admin
   corrente; verificare prima di mantenerlo, collegarlo o archiviarlo.
3. Le route storiche matricole convivono con quelle correnti: definire redirect o
   archiviazione soltanto dopo un inventario dei link esterni e della navigazione.

## Come chiudere un rischio

Quando un punto viene risolto, aggiornare il documento funzionale e il registro delle
decisioni; poi rimuoverlo da questa lista indicando la scelta nel commit. Non cancellare
un rischio soltanto perché è scomodo o non riprodotto localmente.

## Prima di modificare

- Verificare il rischio nel codice e nei pannelli esterni correnti.
- Distinguere fatti osservati, inferenze e decisioni ancora da prendere.
- Per privacy, dati personali, DNS e accessi coinvolgere chi ha responsabilità reale.
