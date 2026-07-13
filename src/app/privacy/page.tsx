/* eslint-disable react/no-unescaped-entities */
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
        <p>Questa pagina descrive le pratiche di raccolta e utilizzo dei dati del sito gulliverancona.it</p>
        <h2 style={{ marginTop: '2rem', fontSize: '1.3rem' }}>Titolare del trattamento</h2>
        <p style={{ marginTop: '0.75rem' }}>
          Associazione Culturale Gulliver – Lista di Rappresentanza UNIVPM<br />
          Università Politecnica delle Marche, Ancona<br />
          Contatto email: <a href="mailto:acugulliver@gmail.com" style={{ color: 'var(--red-primary)' }}>acugulliver@gmail.com</a>
        </p>


        <h2 style={{ marginTop: '2rem', fontSize: '1.3rem' }}>Dati raccolti e modalità del trattamento</h2>
        <p style={{ marginTop: '0.75rem' }}>
          La navigazione sul sito principale non comporta l'acquisizione diretta di dati personali identificativi dell'utente. Tuttavia, il trattamento può riguardare:
        </p>
        <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
            <strong>Dati forniti volontariamente:</strong> qualora l'utente decida di compilare i moduli di contatto, iscrizione o partecipazione accessibili tramite il dominio <code>forms.gulliverancona.it</code>, i dati saranno gestiti tramite la piattaforma terza <strong>Tally.so</strong>. Ti invitiamo a consultare la relativa informativa privacy sul loro sito web prima dell'invio.
          </li>
          <li style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
            <strong>Dati di navigazione e tecnici:</strong> i sistemi informatici acquisiscono informazioni statistiche in forma strettamente anonima (tramite Vercel Analytics) e dati tecnici di instradamento del traffico necessari alla fornitura del servizio (tramite Cloudflare e Vercel).
          </li>
          <li style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
            <strong>Uso del LocalStorage tecnico:</strong> per evitare di mostrare ripetutamente il pop-up informativo di voto agli utenti che lo hanno già chiuso, viene salvato sul browser un valore tecnico temporaneo (<code>gulliver_vote_interacted_version</code>). Questa informazione risiede esclusivamente sul dispositivo dell'utente e non viene usata per attività di tracciamento o profilazione.
          </li>
          <li style={{ lineHeight: '1.6' }}>
            <strong>Cookie tecnici di sessione:</strong> per gli utenti autorizzati che accedono ai servizi interni sui sottodomini di <code>gulliverancona.it</code>, viene utilizzato un cookie tecnico di sessione denominato <code>gulliver_session</code>. Questo cookie ha la finalità esclusiva di mantenere attiva e sicura la sessione dell'utente, non viene utilizzato per attività di profilazione o tracciamento ed è eliminato al logout o alla scadenza della sessione.
          </li>
        </ul>

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
          Il sito web è ospitato sulla piattaforma cloud di <strong>Vercel Inc.</strong>, mentre Cloudflare gestisce DNS e instradamento del dominio.
          <br /><br />
          I provider Cloudflare e Vercel elaborano a livello di server informazioni tecniche standard (come indirizzi IP a livello di pacchetto di rete e log di sistema) necessarie alla fornitura tecnica del servizio, all'ottimizzazione delle performance di rete e alla salvaguardia della sicurezza dell'infrastruttura (come la mitigazione di attacchi DDoS), secondo le rispettive informative e condizioni applicabili.
        </p>
      </div>
    </div>
  );
}
