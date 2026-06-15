'use client';

import React, { useEffect, useState } from 'react';

interface UserProfile {
  username: string;
  roles: string[];
}

interface ServiceCard {
  role: string;
  title: string;
  subtitle: string;
  subdomain: string;
  icon: React.ReactNode;
  color: string;
}

export default function CockpitPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/check');
        if (!res.ok) {
          throw new Error('Non autenticato');
        }
        const data = await res.json();
        setUser({ username: data.username, roles: data.roles });
      } catch (err) {
        // Redirect to login if not authenticated
        const host = window.location.host;
        const devPort = host.split(':')[1] || '3000';
        const loginHost = host.includes('localhost')
          ? `tesserati.localhost:${devPort}`
          : 'tesserati.gulliverancona.it';
        window.location.href = `https://${loginHost}/login?redirect=${encodeURIComponent(window.location.href)}`;
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (error) {
      console.error('Errore durante il logout:', error);
      setLoggingOut(false);
    }
  };

  const getSubdomainUrl = (subdomain: string) => {
    if (typeof window === 'undefined') return '#';
    const host = window.location.host;
    if (host.includes('localhost')) {
      const port = host.split(':')[1] || '3000';
      return `http://${subdomain}.localhost:${port}`;
    }
    return `https://${subdomain}.gulliverancona.it`;
  };

  const hasAccess = (cardRole: string) => {
    if (!user) return false;
    return user.roles.includes('admin') || user.roles.includes(cardRole);
  };

  const services: ServiceCard[] = [
    {
      role: 'admin',
      title: 'Gestione Utenti',
      subtitle: 'Configura gli account, imposta le password e gestisci i ruoli dei tesserati Gulliver.',
      subdomain: 'admin',
      color: '#e40329', // Gulliver Red
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      role: 'appunti',
      title: 'Consultazione Appunti',
      subtitle: 'Accedi al database completo e consulta gli appunti universitari caricati dagli studenti.',
      subdomain: 'appunti',
      color: '#3b82f6', // Blue
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    },
    {
      role: 'popup',
      title: 'Gestione Popup',
      subtitle: 'Modifica il testo, attiva o disattiva il banner avvisi visibile a tutti gli utenti sulla home page.',
      subdomain: 'popup',
      color: '#f59e0b', // Yellow/Orange
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="9" x2="15" y2="15"></line>
          <line x1="15" y1="9" x2="9" y2="15"></line>
        </svg>
      )
    },
    {
      role: 'forms',
      title: 'Moduli e Form',
      subtitle: 'Configura, crea, monitora e apri le iscrizioni ai form studenteschi pubblici di Gulliver.',
      subdomain: 'forms',
      color: '#10b981', // Green
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      role: 'comunicazione',
      title: 'Programmazione Post',
      subtitle: 'Pianifica le comunicazioni, le grafiche e organizza il calendario editoriale dei canali Gulliver.',
      subdomain: 'comunicazione',
      color: '#8b5cf6', // Violet
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    },
    {
      role: 'direttivo',
      title: 'Portale Direttivo',
      subtitle: 'Spazio riservato ai verbali, documenti interni e comunicati ufficiali dell\'organo Direttivo.',
      subdomain: 'direttivo',
      color: '#ec4899', // Pink
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      )
    }
  ];

  const activeServices = services.filter(s => hasAccess(s.role));

  if (loading) {
    return (
      <div className="cockpit-loading-container">
        <span className="spinner"></span>
        <p>Verifica dell'identità in corso...</p>
        <style jsx>{`
          .cockpit-loading-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #0f0f11;
            color: var(--white);
            gap: 1rem;
          }
          .spinner {
            width: 30px;
            height: 30px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            border-top-color: var(--red-primary);
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="cockpit-container">
      {/* Background glow layers */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <header className="cockpit-header container">
        <div className="header-info">
          <div className="badge-user">Tesserato Gulliver</div>
          <h1>Ciao, <span className="text-username">{user?.username}</span></h1>
          <p>Seleziona lo strumento a cui desideri accedere</p>
        </div>
        
        <button onClick={handleLogout} className="btn-logout" disabled={loggingOut}>
          {loggingOut ? 'Uscita...' : 'Disconnetti'}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </header>

      <main className="cockpit-main container">
        {activeServices.length > 0 ? (
          <div className="services-grid animate-fade-up">
            {activeServices.map((service) => (
              <a
                key={service.subdomain}
                href={getSubdomainUrl(service.subdomain)}
                className="service-card"
                style={{ '--service-color': service.color } as React.CSSProperties}
              >
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.subtitle}</p>
                <div className="service-footer">
                  <span className="domain-label">{service.subdomain}.gulliverancona.it</span>
                  <div className="arrow-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="no-services-card animate-fade-up">
            <div className="lock-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3>Nessun servizio attivo</h3>
            <p>
              Il tuo account è stato creato con successo, ma non hai ancora permessi operativi associati.
              Contatta un amministratore per abilitare l'accesso ai sottodomini.
            </p>
          </div>
        )}
      </main>

      <style jsx global>{`
        .cockpit-container {
          min-height: 100vh;
          background: #0f0f11;
          color: var(--white);
          padding-top: 4rem;
          padding-bottom: 6rem;
          position: relative;
          overflow: hidden;
        }

        .bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(150px);
          opacity: 0.12;
          z-index: 1;
          pointer-events: none;
        }

        .bg-glow-1 {
          background: var(--red-primary);
          top: -20%;
          right: -10%;
        }

        .bg-glow-2 {
          background: #3b82f6;
          bottom: -20%;
          left: -10%;
        }

        .cockpit-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3.5rem;
          position: relative;
          z-index: 2;
        }

        .badge-user {
          display: inline-block;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--gray-300);
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.75rem;
        }

        .header-info h1 {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 2.75rem;
          color: var(--white);
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }

        .text-username {
          background: linear-gradient(135deg, var(--white) 30%, #fca5a5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header-info p {
          color: var(--gray-400);
          font-size: 1.05rem;
        }

        .btn-logout {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--gray-300);
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-full);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9rem;
          transition: all var(--transition-base);
        }

        .btn-logout:hover {
          background: rgba(228, 3, 41, 0.1);
          border-color: rgba(228, 3, 41, 0.3);
          color: var(--red-light);
          transform: translateY(-2px);
        }

        .cockpit-main {
          position: relative;
          z-index: 2;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .service-card {
          background: rgba(26, 26, 30, 0.65);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-lg);
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--service-color);
          opacity: 0.8;
          transition: height 0.25s ease;
        }

        .service-card:hover {
          transform: translateY(-6px);
          background: rgba(26, 26, 30, 0.8);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 25px rgba(255, 255, 255, 0.02);
        }

        .service-card:hover::before {
          height: 5px;
        }

        .service-icon-wrapper {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--service-color);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all var(--transition-base);
        }

        .service-card:hover .service-icon-wrapper {
          background: var(--service-color);
          color: var(--white);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .service-card h3 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 0.75rem;
        }

        .service-card p {
          color: var(--gray-400);
          font-size: 0.92rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          flex-grow: 1;
        }

        .service-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .domain-label {
          font-size: 0.8rem;
          color: var(--gray-500);
          font-family: var(--font-body);
        }

        .arrow-icon {
          color: var(--gray-400);
          transition: transform 0.25s ease, color 0.25s ease;
        }

        .service-card:hover .arrow-icon {
          transform: translateX(4px);
          color: var(--service-color);
        }

        .no-services-card {
          background: rgba(26, 26, 30, 0.65);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-lg);
          padding: 4rem 3rem;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lock-icon {
          width: 64px;
          height: 64px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.75rem;
          color: var(--gray-500);
        }

        .no-services-card h3 {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          color: var(--white);
          margin-bottom: 0.75rem;
        }

        .no-services-card p {
          color: var(--gray-400);
          font-size: 0.98rem;
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .cockpit-header {
            flex-direction: column;
            gap: 1.5rem;
            align-items: flex-start;
          }
          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .header-info h1 {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </div>
  );
}
