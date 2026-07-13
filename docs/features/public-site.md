# Sito pubblico e navigazione

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `/`, navbar, footer, `src/app/layout.tsx`

## Scopo e flusso

Il sito pubblico presenta Gulliver, orienta studenti e matricole e porta alle aree
associazione culturale, rappresentanza, elezioni, contatti e servizi. La home è il
principale punto di ingresso; navbar e footer collegano le aree permanenti e stagionali.

La navigazione desktop contiene menu a discesa; su mobile diventa un menu compatto.
Navbar, footer e popup globale sono montati dal layout radice sul dominio pubblico e
nascosti sui sottodomini operativi.

## Implementazione

- Layout e metadata globali: `src/app/layout.tsx`.
- Home: `src/app/page.tsx` e relativo CSS.
- Navigazione/footer: `src/components/Navbar.tsx`, `src/components/Footer.tsx`.
- Stili condivisi: `src/app/globals.css`.
- Asset: `public/`.

Le pagine editoriali sono principalmente componenti React versionati nel repository.
Non esiste un CMS generale: testi e link cambiano tramite commit e deploy.

## Dipendenze

- Asset pubblici e PDF.
- Metadata Open Graph/Twitter e favicon.
- Route stagionali: matricole, elezioni e Gulliver Rock.
- Popup globale letto da `/api/settings`.

## Prima di modificare

- Controllare navbar desktop/mobile, footer e tutti i link esterni.
- Non eliminare una route solo perché non compare nella home: può essere collegata da
  PDF, QR code, motori di ricerca o sottodomini.
- Conservare il linguaggio visivo descritto in [current image](../current-image.md).
- Un cambio al layout radice può influenzare sia pagine pubbliche sia pannelli interni.
- Per nuove pagine pubbliche valutare sitemap, metadata, privacy e archiviazione futura.

## Verifica

1. Aprire home a desktop e mobile.
2. Percorrere tutti i menu, CTA principali e link footer.
3. Verificare assenza di navbar/footer su un sottodominio autenticato.
4. Controllare favicon, titolo, anteprima social e assenza di errori console.
5. Eseguire lint e build.

## Limiti noti

I contenuti stagionali sono hard-coded e richiedono manutenzione annuale. La sitemap
non riflette ancora tutte le route pubbliche correnti.
