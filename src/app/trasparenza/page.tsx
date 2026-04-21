import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trasparenza",
  description: "Dati sulla trasparenza pubblica e contributi pubblici dell'Associazione Gulliver UNIVPM.",
};

export default function TrasparenzaPage() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <h1>Trasparenza</h1>
        <div className="divider-red" style={{ marginBottom: '2rem', marginTop: '1rem' }} />
        
        <p style={{ marginBottom: '2rem' }}>
          In ottemperanza alla Legge 124/2017 in materia di trasparenza per gli enti del Terzo Settore e le associazioni, 
          rendicontiamo di seguito i contributi pubblici percepiti dalla nostra associazione.
        </p>
        
        <div className="card" style={{ padding: '2rem', textAlign: 'center', background: 'var(--gray-100)', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Contributi Pubblici 2024</h2>
          <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
            Scarica il documento ufficiale contenente il rendiconto dei contributi percepiti nell'anno di esercizio 2024.
          </p>
          <a 
            href="/docs/CONTRIBUTI-PUBBLICI-2024.pdf" 
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex' }}
          >
            Scarica Documento (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}
