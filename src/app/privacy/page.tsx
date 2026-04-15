import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <h1>Privacy Policy</h1>
        <div className="divider-red" style={{ marginBottom: '2rem', marginTop: '1rem' }} />
        <p>Questa pagina descrive le pratiche di raccolta e utilizzo dei dati del sito Gulliver UNIVPM.</p>
        <h2 style={{ marginTop: '2rem', fontSize: '1.3rem' }}>Titolare del trattamento</h2>
        <p style={{ marginTop: '0.75rem' }}>Gulliver – Lista di Rappresentanza UNIVPM<br />Università Politecnica delle Marche, Ancona</p>
        <h2 style={{ marginTop: '2rem', fontSize: '1.3rem' }}>Dati raccolti</h2>
        <p style={{ marginTop: '0.75rem' }}>Il sito non raccoglie dati personali se non quelli forniti volontariamente tramite il modulo di contatto. I dati inseriti nel form vengono inviati a Formspree e trattati secondo la loro privacy policy.</p>
        <h2 style={{ marginTop: '2rem', fontSize: '1.3rem' }}>Cookie</h2>
        <p style={{ marginTop: '0.75rem' }}>Il sito non utilizza cookie di profilazione o di terze parti.</p>
      </div>
    </div>
  );
}
