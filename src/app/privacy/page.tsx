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
        <p style={{ marginTop: '0.75rem' }}>Il sito non raccoglie dati personali.</p>
        <h2 style={{ marginTop: '2rem', fontSize: '1.3rem' }}>Cookie</h2>
        <p style={{ marginTop: '0.75rem' }}>Il sito non utilizza cookie di profilazione o di terze parti.</p>

        <h2 style={{ marginTop: '2rem', fontSize: '1.3rem' }}>Infrastruttura di Rete</h2>
        <p style={{ marginTop: '0.75rem' }}>
          Il nostro sito web è ospitato parallelamente sulle piattaforme cloud di Netlify e Vercel, fornite rispettivamente da Netlify, Inc. e Vercel Inc. Questa configurazione a doppia infrastruttura, gestita attraverso un instradamento DNS dinamico, assicura una maggiore resilienza, ridondanza e continuità operativa del servizio (uptime garantito).
          <br /><br />
          Quando visiti il sito, il tuo traffico può essere reindirizzato automaticamente verso uno dei due provider in base a logiche di bilanciamento e ottimizzazione delle risorse. Entrambi i provider potrebbero raccogliere informazioni tecniche standard (come indirizzi IP, log di accesso e statistiche di utilizzo) necessarie unicamente per il corretto funzionamento, la misurazione delle performance e la sicurezza dell'infrastruttura di rete. I dati tecnici trattati da queste piattaforme sono gestiti in conformità alle rispettive privacy policy.
        </p>
      </div>
    </div>
  );
}
