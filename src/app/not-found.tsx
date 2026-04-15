import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      flexDirection: 'column',
      gap: '1.5rem',
    }}>
      <span style={{ fontSize: '5rem' }}>🗓️</span>
      <h1 style={{ fontSize: '6rem', fontFamily: 'var(--font-heading)', fontWeight: 900, color: 'var(--red-primary)', lineHeight: 1 }}>404</h1>
      <h2>Pagina non trovata</h2>
      <p style={{ color: 'var(--gray-500)', maxWidth: '400px' }}>
        La pagina che stai cercando non esiste o è stata spostata.
      </p>
      <Link href="/" className="btn btn-primary btn-lg" id="404-home">
        Torna alla Home
      </Link>
    </div>
  );
}
