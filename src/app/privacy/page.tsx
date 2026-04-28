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
        <p>Questa pagina descrive le pratiche di raccolta e utilizzo dei dati del sito gullivernacona.it</p>
        <h2 style={{ marginTop: '2rem', fontSize: '1.3rem' }}>Titolare del trattamento</h2>
        <p style={{ marginTop: '0.75rem' }}>Gulliver – Lista di Rappresentanza UNIVPM<br />Università Politecnica delle Marche, Ancona</p>
        <h2 style={{ marginTop: '2rem', fontSize: '1.3rem' }}>Dati raccolti</h2>
        <p style={{ marginTop: '0.75rem' }}>Il sito non raccoglie dati personali.</p>
        <h2 style={{ marginTop: '2rem', fontSize: '1.3rem' }}>Cookie</h2>
        <p style={{ marginTop: '0.75rem' }}>Il sito non utilizza cookie di profilazione o di terze parti.</p>

        <h2 style={{ marginTop: '2rem', fontSize: '1.3rem' }}>Statistiche anonime (Web Analytics)</h2>
        <p style={{ marginTop: '0.75rem' }}>
          Il nostro sito utilizza gli strumenti <strong>Vercel Analytics</strong> e <strong>Vercel Speed Insights</strong> per raccogliere misurazioni sulle performance e sul traffico.
          Entrambi i servizi sono progettati secondo rigorosi standard <em>Privacy-First</em>:
        </p>
        <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}><strong>Nessun utilizzo di cookie:</strong> il tracciamento avviene senza memorizzare alcun file o tracciatore sul dispositivo dell'utente.</li>
          <li style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}><strong>Anonimato garantito:</strong> i visitatori sono identificati tramite un hash crittografico temporaneo che viene distrutto e resettato automaticamente ogni 24 ore. Ciò impedisce in modo nativo il tracciamento incrociato degli utenti nel tempo o su app diverse.</li>
          <li style={{ lineHeight: '1.6' }}><strong>Nessun dato personale:</strong> non vengono estratti, profilati o conservati né l'indirizzo IP originario né altre informazioni di identificazione personale (PII). Vengono fornite esclusivamente metriche aggregate.</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          Per totale trasparenza, è possibile consultare la documentazione ufficiale del provider riguardante il rispetto della privacy al seguente indirizzo: <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--red-primary)', textDecoration: 'underline' }}>Vercel Analytics Privacy Policy</a>.
        </p>

        <h2 style={{ marginTop: '2rem', fontSize: '1.3rem' }}>Infrastruttura di Rete e DNS</h2>
        <p style={{ marginTop: '0.75rem' }}>
          La gestione dei DNS (Domain Name System) e l'instradamento del traffico verso il nostro dominio sono affidati a <strong>Cloudflare, Inc.</strong> Questo ci permette di proteggere la piattaforma da attacchi informatici e di garantire connessioni sicure e stabili in tutto il mondo.
          <br /><br />
          Parallelamente, il sito web è ospitato sulle piattaforme cloud di Netlify (Netlify, Inc.) e Vercel (Vercel Inc.). Questa configurazione a doppia infrastruttura, orchestrata e bilanciata attraverso Cloudflare, assicura una maggiore resilienza, ridondanza e continuità operativa (uptime garantito).
          <br /><br />
          I provider Cloudflare, Netlify e Vercel elaborano a livello di server informazioni tecniche standard (come indirizzi IP a livello di pacchetto di rete e log di sistema) che sono strettamente e unicamente necessarie per la fornitura tecnica del servizio, l'ottimizzazione delle performance di rete e la salvaguardia della sicurezza dell'infrastruttura (come la mitigazione di attacchi DDoS). Tutti i dati tecnici sono trattati e protetti in rigorosa conformità alle rispettive privacy policy aziendali.
        </p>
      </div>
    </div>
  );
}
