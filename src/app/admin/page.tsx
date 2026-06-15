'use client';

import React, { useState, useEffect } from 'react';

interface User {
  username: string;
  roles: string[];
}

const AVAILABLE_ROLES = [
  { id: 'admin', label: 'Admin', desc: 'Accesso completo e gestione utenti', color: '#e40329', bg: 'rgba(228, 3, 41, 0.12)', border: 'rgba(228, 3, 41, 0.3)' },
  { id: 'tesserato', label: 'Tesserato', desc: 'Accesso base alla dashboard Cockpit', color: '#6b7280', bg: 'rgba(107, 114, 128, 0.12)', border: 'rgba(107, 114, 128, 0.3)' },
  { id: 'appunti', label: 'Appunti', desc: 'Consultazione e download del database appunti', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.3)' },
  { id: 'popup', label: 'Popup', desc: 'Gestione e attivazione del pop-up avvisi sul sito', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
  { id: 'forms', label: 'Forms', desc: 'Creazione e gestione moduli d\'iscrizione tally', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  { id: 'comunicazione', label: 'Comunicazione', desc: 'Programmazione del calendario post social', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)', border: 'rgba(139, 92, 246, 0.3)' },
  { id: 'direttivo', label: 'Direttivo', desc: 'Accesso ai documenti del portale Direttivo', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)', border: 'rgba(236, 72, 153, 0.3)' },
];

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  // New user form states
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRoles, setNewRoles] = useState<string[]>(['tesserato']);
  const [creating, setCreating] = useState(false);

  // Edit user modal states
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editRoles, setEditRoles] = useState<string[]>([]);
  const [editPassword, setEditPassword] = useState('');
  const [updating, setUpdating] = useState(false);

  const notify = (msg: string, type: 'ok' | 'err') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (!res.ok) {
        throw new Error('Impossibile caricare gli utenti');
      }
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err: any) {
      notify(err.message || 'Errore di connessione', 'err');
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.username);
        await fetchUsers();
      } else {
        window.location.href = '/login';
      }
    } catch {
      notify('Errore di verifica autenticazione', 'err');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          username: newUsername,
          password: newPassword,
          roles: newRoles,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
        setNewUsername('');
        setNewPassword('');
        setNewRoles(['tesserato']);
        notify('Utente registrato con successo!', 'ok');
      } else {
        notify(data.error || 'Errore durante la creazione', 'err');
      }
    } catch {
      notify('Errore di rete', 'err');
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setUpdating(true);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          username: editingUser.username,
          roles: editRoles,
          password: editPassword ? editPassword : undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
        setEditingUser(null);
        setEditPassword('');
        notify('Utente aggiornato con successo!', 'ok');
      } else {
        notify(data.error || 'Errore di aggiornamento', 'err');
      }
    } catch {
      notify('Errore di rete', 'err');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteUser = async (username: string) => {
    if (username === currentUser) {
      notify('Non puoi eliminare te stesso!', 'err');
      return;
    }

    if (!window.confirm(`Sei sicuro di voler eliminare definitivamente l'utente "${username}"?`)) {
      return;
    }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          username,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
        notify('Utente eliminato.', 'ok');
      } else {
        notify(data.error || 'Errore di eliminazione', 'err');
      }
    } catch {
      notify('Errore di rete', 'err');
    }
  };

  const toggleNewRole = (roleId: string) => {
    if (newRoles.includes(roleId)) {
      setNewRoles(newRoles.filter(r => r !== roleId));
    } else {
      setNewRoles([...newRoles, roleId]);
    }
  };

  const toggleEditRole = (roleId: string) => {
    if (editRoles.includes(roleId)) {
      setEditRoles(editRoles.filter(r => r !== roleId));
    } else {
      setEditRoles([...editRoles, roleId]);
    }
  };

  const handleGoHome = () => {
    const host = window.location.host;
    const devPort = host.split(':')[1] || '3000';
    if (host.includes('localhost')) {
      window.location.href = `http://tesserati.localhost:${devPort}`;
    } else {
      window.location.href = 'https://tesserati.gulliverancona.it';
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch {
      notify('Logout fallito', 'err');
    }
  };

  const getRoleConfig = (roleId: string) => {
    return AVAILABLE_ROLES.find(r => r.id === roleId) || {
      label: roleId,
      color: '#ffffff',
      bg: 'rgba(255,255,255,0.06)',
      border: 'rgba(255,255,255,0.1)'
    };
  };

  if (loading) {
    return (
      <div className="admin-loading-container">
        <span className="spinner"></span>
        <p>Inizializzazione gestione utenti...</p>
        <style jsx>{`
          .admin-loading-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #080810;
            color: #ffffff;
            gap: 1rem;
          }
          .spinner {
            width: 30px;
            height: 30px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            border-top-color: #e40329;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Background decoration */}
      <div className="bg-glow"></div>

      {notification && (
        <div className={`toast toast-${notification.type}`}>
          {notification.msg}
        </div>
      )}

      {/* Header */}
      <header className="admin-header">
        <div className="header-brand">
          <button onClick={handleGoHome} className="btn-back">
            ← Dashboard
          </button>
          <div>
            <h1>Gestione Utenti e Ruoli</h1>
            <p className="admin-subtitle">Amministratore attivo: {currentUser}</p>
          </div>
        </div>
        
        <div className="header-actions">
          <span className="subdomain-badge">admin.gulliverancona.it</span>
          <button onClick={handleLogout} className="btn-logout">Esci</button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="admin-main animate-fade-up">
        <div className="admin-grid">
          {/* User List Panel */}
          <section className="admin-panel user-list-section">
            <h2>Utenti Registrati</h2>
            {users.length > 0 ? (
              <div className="users-list">
                {users.map((user) => (
                  <div key={user.username} className={`user-item ${user.username === currentUser ? 'self-user' : ''}`}>
                    <div className="user-info">
                      <div className="username-row">
                        <h3>{user.username}</h3>
                        {user.username === currentUser && <span className="self-tag">Tu</span>}
                      </div>
                      <div className="roles-row">
                        {user.roles.map((r) => {
                          const config = getRoleConfig(r);
                          return (
                            <span 
                              key={r} 
                              className="role-badge"
                              style={{ color: config.color, background: config.bg, borderColor: config.border }}
                            >
                              {config.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="user-actions">
                      <button 
                        onClick={() => {
                          setEditingUser(user);
                          setEditRoles(user.roles);
                        }}
                        className="btn-user-action edit"
                      >
                        Modifica
                      </button>
                      
                      {user.username !== currentUser && (
                        <button 
                          onClick={() => handleDeleteUser(user.username)}
                          className="btn-user-action delete"
                        >
                          Elimina
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-users">Nessun utente configurato.</div>
            )}
          </section>

          {/* Add User Panel */}
          <section className="admin-panel add-user-section">
            <h2>Registra Nuovo Utente</h2>
            <form onSubmit={handleCreateUser} className="create-user-form">
              <div className="form-group">
                <label htmlFor="new-username">Username</label>
                <input
                  id="new-username"
                  type="text"
                  required
                  placeholder="Es. mario.rossi"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="new-password">Password Temporanea</label>
                <input
                  id="new-password"
                  type="password"
                  required
                  placeholder="Password temporanea"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Seleziona Ruoli</label>
                <div className="roles-selectors-grid">
                  {AVAILABLE_ROLES.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => toggleNewRole(role.id)}
                      className={`role-selector-card ${newRoles.includes(role.id) ? 'selected' : ''}`}
                      style={{ '--role-color-glow': role.color } as React.CSSProperties}
                    >
                      <div className="selector-title-row">
                        <span className="selector-checkbox"></span>
                        <span className="selector-label">{role.label}</span>
                      </div>
                      <span className="selector-desc">{role.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={creating} className="btn-create-submit">
                {creating ? 'Registrazione in corso...' : 'Registra Utente'}
              </button>
            </form>
          </section>
        </div>
      </main>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="modal-card animate-fade-up">
            <h2>Modifica Utente: {editingUser.username}</h2>
            <div className="divider-red"></div>

            <form onSubmit={handleUpdateUser} className="modal-form">
              <div className="form-group">
                <label htmlFor="edit-password">Nuova Password (lascia vuoto per non cambiare)</label>
                <input
                  id="edit-password"
                  type="password"
                  placeholder="Cambia password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Configura Ruoli</label>
                <div className="roles-selectors-grid">
                  {AVAILABLE_ROLES.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => toggleEditRole(role.id)}
                      className={`role-selector-card ${editRoles.includes(role.id) ? 'selected' : ''}`}
                      style={{ '--role-color-glow': role.color } as React.CSSProperties}
                    >
                      <div className="selector-title-row">
                        <span className="selector-checkbox"></span>
                        <span className="selector-label">{role.label}</span>
                      </div>
                      <span className="selector-desc">{role.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingUser(null);
                    setEditPassword('');
                  }}
                  className="btn-modal cancel"
                >
                  Annulla
                </button>
                <button 
                  type="submit" 
                  disabled={updating}
                  className="btn-modal save"
                >
                  {updating ? 'Salvataggio...' : 'Salva Modifiche'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        .admin-container {
          min-height: 100vh;
          background: #080810;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 2.5rem 1.5rem;
        }

        .bg-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(228, 3, 41, 0.05) 0%, transparent 70%);
          filter: blur(100px);
          top: -10%;
          left: -10%;
          pointer-events: none;
        }

        .toast {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 9999;
          padding: 0.9rem 1.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: var(--shadow-lg);
          backdrop-filter: blur(20px);
          animation: fadeIn 0.3s ease;
        }

        .toast-ok {
          background: rgba(74,222,128,0.12);
          border: 1px solid rgba(74,222,128,0.3);
          color: #4ade80;
        }

        .toast-err {
          background: rgba(248,113,113,0.12);
          border: 1px solid rgba(248,113,113,0.3);
          color: #f87171;
        }

        .admin-header {
          max-width: var(--max-width);
          margin: 0 auto 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          padding-bottom: 1.5rem;
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .btn-back {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          color: #ffffff;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 500;
          font-size: 0.85rem;
          transition: all var(--transition-base);
        }

        .btn-back:hover {
          background: rgba(255,255,255,0.1);
        }

        .admin-header h1 {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          margin: 0;
        }

        .admin-subtitle {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.45);
          margin-top: 0.15rem;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .subdomain-badge {
          background: rgba(228, 3, 41, 0.08);
          border: 1px solid rgba(228, 3, 41, 0.2);
          color: #e40329;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
        }

        .btn-logout {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7);
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          cursor: pointer;
        }

        .btn-logout:hover {
          background: rgba(228, 3, 41, 0.1);
          color: #ff4d6d;
        }

        .admin-main {
          max-width: var(--max-width);
          margin: 0 auto;
        }

        .admin-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2rem;
        }

        .admin-panel {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
        }

        .admin-panel h2 {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 2rem;
          border-left: 3px solid #e40329;
          padding-left: 0.75rem;
        }

        .users-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .user-item {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
        }

        .user-item.self-user {
          border-color: rgba(228, 3, 41, 0.25);
          background: rgba(228, 3, 41, 0.02);
        }

        .user-item:hover {
          background: rgba(255,255,255,0.04);
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          flex: 1;
        }

        .username-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .username-row h3 {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0;
        }

        .self-tag {
          font-size: 0.65rem;
          font-weight: 700;
          background: rgba(228, 3, 41, 0.15);
          color: #ff4d6d;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .roles-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .role-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          border: 1px solid transparent;
        }

        .user-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-user-action {
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          border: 1px solid transparent;
        }

        .btn-user-action.edit {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.85);
        }

        .btn-user-action.edit:hover {
          background: rgba(255,255,255,0.12);
        }

        .btn-user-action.delete {
          background: rgba(228, 3, 41, 0.05);
          border-color: rgba(228, 3, 41, 0.15);
          color: #f87171;
        }

        .btn-user-action.delete:hover {
          background: rgba(228, 3, 41, 0.15);
        }

        .empty-users {
          text-align: center;
          padding: 2rem;
          font-style: italic;
          color: rgba(255,255,255,0.45);
        }

        .create-user-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius-md);
          padding: 0.85rem 1.25rem;
          color: #ffffff;
          font-size: 0.95rem;
          outline: none;
          width: 100%;
          box-sizing: border-box;
        }

        .form-group input:focus {
          border-color: #e40329;
          background: rgba(255,255,255,0.08);
        }

        .roles-selectors-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          max-height: 280px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        /* Custom Scrollbar for Roles Grid */
        .roles-selectors-grid::-webkit-scrollbar {
          width: 6px;
        }
        .roles-selectors-grid::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .roles-selectors-grid::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 3px;
        }

        .role-selector-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          padding: 0.75rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .role-selector-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .role-selector-card.selected {
          border-color: var(--role-color-glow);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 0 0 1px var(--role-color-glow);
        }

        .selector-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.2rem;
        }

        .selector-checkbox {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          display: inline-block;
          position: relative;
          transition: all 0.2s ease;
        }

        .role-selector-card.selected .selector-checkbox {
          border-color: var(--role-color-glow);
          background: var(--role-color-glow);
        }

        .role-selector-card.selected .selector-checkbox::after {
          content: '✓';
          color: white;
          font-size: 10px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: 700;
        }

        .selector-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffffff;
        }

        .selector-desc {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.45);
          padding-left: 1.6rem;
        }

        .btn-create-submit {
          background: linear-gradient(135deg, #e40329, #ff4444);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          padding: 0.85rem;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(228, 3, 41, 0.25);
        }

        .btn-create-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(228, 3, 41, 0.4);
        }

        /* Modal styling */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .modal-card {
          background: #121217;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
          position: relative;
        }

        .modal-card h2 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0;
        }

        .divider-red {
          width: 50px;
          height: 3px;
          background: #e40329;
          border-radius: 99px;
          margin: 0.75rem 0 1.5rem;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .btn-modal {
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-modal.cancel {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
        }

        .btn-modal.cancel:hover {
          background: rgba(255,255,255,0.1);
        }

        .btn-modal.save {
          background: linear-gradient(135deg, #e40329, #ff4444);
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(228, 3, 41, 0.2);
        }

        .btn-modal.save:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(228, 3, 41, 0.35);
        }

        @media (max-width: 900px) {
          .admin-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .admin-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
          .header-actions {
            width: 100%;
            justify-content: space-between;
          }
          .admin-panel {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
