'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  RaPage, RaMain, RaSection, RaHeader, RaCard, RaButton, RaField, RaInput,
  RaBadge, RaList, RaListItem, RaEmptyState, RaModal, RaRoleSelector,
  RaLoadingScreen, raToast, raConfirm,
  requireSession, roleAccent, roleLabel,
} from '@/components/riservata';
import styles from './page.module.css';

interface User {
  username: string;
  roles: string[];
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<{ username: string; requestedAt: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRoles, setNewRoles] = useState<string[]>(['tesserato']);
  const [creating, setCreating] = useState(false);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editRoles, setEditRoles] = useState<string[]>([]);
  const [editPassword, setEditPassword] = useState('');
  const [updating, setUpdating] = useState(false);

  const [approvingRequest, setApprovingRequest] = useState<{ username: string } | null>(null);
  const [approveRoles, setApproveRoles] = useState<string[]>(['tesserato']);
  const [moderating, setModerating] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Impossibile caricare gli utenti');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      raToast(err instanceof Error ? err.message : 'Errore di connessione', 'error');
    }
  }, []);

  const fetchRequests = useCallback(async () => {
    try {
      const res = await fetch('/api/users/requests');
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      } else {
        // Prima falliva in silenzio: chi guardava non sapeva che l'elenco
        // poteva essere incompleto.
        raToast('Impossibile caricare le richieste di registrazione.', 'error');
      }
    } catch (err) {
      console.error('Errore nel caricamento delle richieste:', err);
      raToast('Impossibile caricare le richieste di registrazione.', 'error');
    }
  }, []);

  useEffect(() => {
    async function checkAuth() {
      const session = await requireSession();
      if (!session) return;
      setCurrentUser(session.username);
      await fetchUsers();
      await fetchRequests();
      setLoading(false);
    }
    checkAuth();
  }, [fetchUsers, fetchRequests]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', username: newUsername, password: newPassword, roles: newRoles }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
        setNewUsername('');
        setNewPassword('');
        setNewRoles(['tesserato']);
        raToast('Utente registrato con successo.', 'success');
      } else {
        raToast(data.error || 'Errore durante la creazione', 'error');
      }
    } catch {
      raToast('Errore di rete', 'error');
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
        raToast('Utente aggiornato con successo.', 'success');
      } else {
        raToast(data.error || 'Errore di aggiornamento', 'error');
      }
    } catch {
      raToast('Errore di rete', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteUser = async (username: string) => {
    if (username === currentUser) {
      raToast('Non puoi eliminare te stesso.', 'error');
      return;
    }

    const confermato = await raConfirm({
      title: "Eliminare l'utente?",
      message: `"${username}" verrà rimosso definitivamente e perderà l'accesso a tutti i portali.`,
      confirmLabel: 'Elimina',
      tone: 'danger',
    });
    if (!confermato) return;

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', username }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
        raToast('Utente eliminato.', 'success');
      } else {
        raToast(data.error || 'Errore di eliminazione', 'error');
      }
    } catch {
      raToast('Errore di rete', 'error');
    }
  };

  const handleApproveRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!approvingRequest) return;
    setModerating(true);
    try {
      const res = await fetch('/api/users/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve', username: approvingRequest.username, roles: approveRoles }),
      });
      const data = await res.json();
      if (res.ok) {
        setApprovingRequest(null);
        setApproveRoles(['tesserato']);
        await fetchUsers();
        await fetchRequests();
        raToast('Richiesta approvata con successo.', 'success');
      } else {
        raToast(data.error || "Errore durante l'approvazione", 'error');
      }
    } catch {
      raToast('Errore di rete', 'error');
    } finally {
      setModerating(false);
    }
  };

  const handleRejectRequest = async (username: string) => {
    const confermato = await raConfirm({
      title: 'Rifiutare la richiesta?',
      message: `La richiesta di registrazione di "${username}" verrà eliminata. La persona dovrà inviarne una nuova.`,
      confirmLabel: 'Rifiuta',
      tone: 'danger',
    });
    if (!confermato) return;

    try {
      const res = await fetch('/api/users/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', username }),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchRequests();
        raToast('Richiesta rifiutata.', 'success');
      } else {
        raToast(data.error || 'Errore durante il rifiuto', 'error');
      }
    } catch {
      raToast('Errore di rete', 'error');
    }
  };

  const toggle = (list: string[], setList: (v: string[]) => void) => (roleId: string) => {
    setList(list.includes(roleId) ? list.filter((r) => r !== roleId) : [...list, roleId]);
  };

  if (loading) {
    return (
      <RaPage area="admin" center>
        <RaLoadingScreen message="Verifica delle credenziali in corso…" />
      </RaPage>
    );
  }

  return (
    <RaPage area="admin">
      <RaHeader
        area="admin"
        label="Amministrazione"
        meta={currentUser ? `Sessione: ${currentUser}` : undefined}
        showLogout
      />

      <RaMain>
        <div className={styles.columns}>
          <div className={styles.colMain}>
            <RaSection title={`Utenti registrati (${users.length})`}>
              {users.length > 0 ? (
                <RaList>
                  {users.map((user) => (
                    <RaListItem
                      key={user.username}
                      className={user.username === currentUser ? styles.selfUser : undefined}
                      title={
                        <>
                          {user.username}
                          {user.username === currentUser && <RaBadge tone="accent">Tu</RaBadge>}
                        </>
                      }
                      meta={user.roles.map((role) => (
                        <RaBadge key={role} accent={roleAccent(role)}>
                          {roleLabel(role)}
                        </RaBadge>
                      ))}
                      actions={
                        <>
                          <RaButton
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingUser(user);
                              setEditRoles(user.roles);
                              setEditPassword('');
                            }}
                          >
                            Modifica
                          </RaButton>
                          {user.username !== currentUser && (
                            <RaButton size="sm" variant="danger" onClick={() => handleDeleteUser(user.username)}>
                              Elimina
                            </RaButton>
                          )}
                        </>
                      }
                    />
                  ))}
                </RaList>
              ) : (
                <RaCard padding="none">
                  <RaEmptyState title="Nessun utente" description="Non ci sono ancora account registrati." />
                </RaCard>
              )}
            </RaSection>

            <RaSection title={`Richieste di registrazione (${requests.length})`}>
              {requests.length > 0 ? (
                <RaList>
                  {requests.map((req) => (
                    <RaListItem
                      key={req.username}
                      title={req.username}
                      meta={
                        <span>
                          Richiesta il{' '}
                          {new Date(req.requestedAt).toLocaleString('it-IT', {
                            day: 'numeric', month: 'long', year: 'numeric',
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </span>
                      }
                      actions={
                        <>
                          <RaButton
                            size="sm"
                            variant="success"
                            onClick={() => {
                              setApprovingRequest({ username: req.username });
                              setApproveRoles(['tesserato']);
                            }}
                          >
                            Accetta
                          </RaButton>
                          <RaButton size="sm" variant="danger" onClick={() => handleRejectRequest(req.username)}>
                            Rifiuta
                          </RaButton>
                        </>
                      }
                    />
                  ))}
                </RaList>
              ) : (
                <RaCard padding="none">
                  <RaEmptyState
                    title="Nessuna richiesta in attesa"
                    description="Le nuove richieste di registrazione compariranno qui."
                  />
                </RaCard>
              )}
            </RaSection>
          </div>

          <aside className={styles.colSide}>
            <RaSection title="Nuovo utente">
              <RaCard padding="lg">
                <form onSubmit={handleCreateUser} className={styles.form}>
                  <RaField label="Username" htmlFor="newUsername" hint="Verrà ripulito da spazi e caratteri non ammessi.">
                    <RaInput
                      id="newUsername" type="text" required
                      placeholder="es. nome.cognome"
                      value={newUsername} onChange={(e) => setNewUsername(e.target.value)}
                      autoComplete="off"
                    />
                  </RaField>

                  <RaField label="Password" htmlFor="newPassword">
                    <RaInput
                      id="newPassword" type="password" required
                      placeholder="Almeno 6 caratteri"
                      value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </RaField>

                  <RaField label="Ruoli">
                    <RaRoleSelector selected={newRoles} onToggle={toggle(newRoles, setNewRoles)} />
                  </RaField>

                  <RaButton type="submit" variant="accent" size="lg" block disabled={creating} loading={creating}>
                    {creating ? 'Creazione…' : 'Crea utente'}
                  </RaButton>
                </form>
              </RaCard>
            </RaSection>
          </aside>
        </div>
      </RaMain>

      {/* Modifica utente */}
      <RaModal
        open={editingUser !== null}
        onClose={() => setEditingUser(null)}
        title={`Modifica ${editingUser?.username ?? ''}`}
        description="Lascia vuota la password per non cambiarla."
        footer={
          <>
            <RaButton variant="outline" onClick={() => setEditingUser(null)}>Annulla</RaButton>
            <RaButton variant="accent" onClick={handleUpdateUser} disabled={updating} loading={updating}>
              {updating ? 'Salvataggio…' : 'Salva modifiche'}
            </RaButton>
          </>
        }
      >
        <form onSubmit={handleUpdateUser} className={styles.form}>
          <RaField label="Nuova password" htmlFor="editPassword" optional>
            <RaInput
              id="editPassword" type="password"
              placeholder="Lascia vuoto per non cambiarla"
              value={editPassword} onChange={(e) => setEditPassword(e.target.value)}
              autoComplete="new-password"
            />
          </RaField>

          <RaField label="Ruoli">
            <RaRoleSelector selected={editRoles} onToggle={toggle(editRoles, setEditRoles)} />
          </RaField>
        </form>
      </RaModal>

      {/* Approvazione richiesta */}
      <RaModal
        open={approvingRequest !== null}
        onClose={() => setApprovingRequest(null)}
        title={`Approva ${approvingRequest?.username ?? ''}`}
        description="Scegli i ruoli con cui abilitare l'account."
        footer={
          <>
            <RaButton variant="outline" onClick={() => setApprovingRequest(null)}>Annulla</RaButton>
            <RaButton variant="accent" onClick={handleApproveRequest} disabled={moderating} loading={moderating}>
              {moderating ? 'Approvazione…' : 'Approva e abilita'}
            </RaButton>
          </>
        }
      >
        <form onSubmit={handleApproveRequest}>
          <RaField label="Ruoli">
            <RaRoleSelector selected={approveRoles} onToggle={toggle(approveRoles, setApproveRoles)} />
          </RaField>
        </form>
      </RaModal>
    </RaPage>
  );
}
