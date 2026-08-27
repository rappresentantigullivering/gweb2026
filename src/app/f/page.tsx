'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  RaPage, RaMain, RaSection, RaHeader, RaCard, RaButton, RaField, RaInput,
  RaInputWithPrefix, RaBadge, RaList, RaListItem, RaEmptyState, RaSpinner,
  RaLoadingScreen, RaStatCard, RaStatGrid, raToast, raConfirm,
  requireSession, redirectToUnauthorized, areaUrl, useIsClient,
} from '@/components/riservata';
import styles from './page.module.css';

type FormStatus = 'active' | 'suspended';
type FormData = { tallyId: string; title: string; status: FormStatus };

export default function FormsManagerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [forms, setForms] = useState<Record<string, FormData>>({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const isClient = useIsClient();

  const [newSlug, setNewSlug] = useState('');
  const [newTallyId, setNewTallyId] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const fetchForms = useCallback(async () => {
    setFetchLoading(true);
    try {
      const res = await fetch('/api/forms/');
      const data = await res.json();
      setForms(data || {});
    } catch (e) {
      console.error(e);
      raToast('Impossibile caricare i form.', 'error');
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => {
    async function checkAuth() {
      const session = await requireSession();
      if (!session) return;
      if (session.roles.includes('forms') || session.roles.includes('admin')) {
        setIsAuthenticated(true);
        await fetchForms();
      } else {
        redirectToUnauthorized();
      }
    }
    checkAuth();
  }, [fetchForms]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sanitizedSlug = newSlug.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
      if (!sanitizedSlug) {
        raToast('Slug non valido.', 'error');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/forms/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          slug: sanitizedSlug,
          tallyId: newTallyId.trim(),
          title: newTitle.trim(),
        }),
      });

      if (res.ok) {
        setNewSlug('');
        setNewTallyId('');
        setNewTitle('');
        await fetchForms();
        raToast('Form creato con successo.', 'success');
      } else {
        const data = await res.json();
        raToast(data.error || 'Errore di creazione.', 'error');
      }
    } catch {
      raToast('Errore di rete.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (slug: string, newStatus: FormStatus) => {
    try {
      const form = forms[slug];
      const res = await fetch('/api/forms/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          slug,
          tallyId: form.tallyId,
          title: form.title,
          status: newStatus,
        }),
      });

      if (res.ok) {
        await fetchForms();
        raToast('Stato aggiornato con successo.', 'success');
      } else {
        raToast('Errore aggiornamento stato.', 'error');
      }
    } catch {
      raToast('Errore di rete.', 'error');
    }
  };

  const handleDelete = async (slug: string) => {
    const confermato = await raConfirm({
      title: 'Eliminare il modulo?',
      message: `Il link "/${slug}" verrà rimosso definitivamente e smetterà di rispondere.`,
      confirmLabel: 'Elimina',
      tone: 'danger',
    });
    if (!confermato) return;

    try {
      const res = await fetch('/api/forms/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', slug }),
      });
      if (res.ok) {
        await fetchForms();
        raToast('Form eliminato.', 'success');
      } else {
        raToast('Errore eliminazione.', 'error');
      }
    } catch {
      raToast('Errore di rete.', 'error');
    }
  };

  const publicFormUrl = (slug: string) => (isClient ? areaUrl('forms', `/${slug}`) : undefined);

  const formsArray = Object.entries(forms);
  const totalCount = formsArray.length;
  const activeCount = formsArray.filter(([, f]) => f.status === 'active').length;
  const suspendedCount = formsArray.filter(([, f]) => f.status === 'suspended').length;

  if (isAuthenticated === null) {
    return (
      <RaPage area="forms" center>
        <RaLoadingScreen message="Verifica autorizzazione in corso…" />
      </RaPage>
    );
  }

  return (
    <RaPage area="forms">
      <RaHeader area="forms" label="Moduli e form" />

      <RaMain>
        <RaStatGrid>
          <RaStatCard value={totalCount} label="Form totali" />
          <RaStatCard value={activeCount} label="Attivi" accent="var(--ra-ok)" />
          <RaStatCard value={suspendedCount} label="Sospesi" accent="var(--ra-danger)" />
        </RaStatGrid>

        <RaSection title="Crea un nuovo link">
          <RaCard padding="lg">
            <form onSubmit={handleCreate} className={styles.createForm}>
              <div className={styles.formRow}>
                <RaField label="Titolo descrittivo" htmlFor="title" className={styles.flex2}>
                  <RaInput
                    id="title" type="text" required
                    placeholder="Es. Iscrizione Assemblea Generale 2026"
                    value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                  />
                </RaField>

                <RaField label="Slug di reindirizzamento" htmlFor="slug" className={styles.flex1}>
                  <RaInputWithPrefix
                    id="slug" type="text" required prefix="/"
                    placeholder="assemblea-2026"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value.replace(/[^a-zA-Z0-9-]/g, ''))}
                  />
                </RaField>
              </div>

              <div className={styles.formRow}>
                <RaField label="ID modulo Tally" htmlFor="tallyId" hint="Solo l'identificativo finale del link Tally, es. w2Dk90." className={styles.flex2}>
                  <RaInput
                    id="tallyId" type="text" required
                    placeholder="w2Dk90"
                    value={newTallyId} onChange={(e) => setNewTallyId(e.target.value)}
                  />
                </RaField>

                <div className={styles.submitCell}>
                  <RaButton type="submit" variant="accent" size="lg" disabled={loading} loading={loading}>
                    {loading ? 'Creazione…' : 'Crea link'}
                  </RaButton>
                </div>
              </div>
            </form>
          </RaCard>
        </RaSection>

        <RaSection title="Moduli esistenti">
          {fetchLoading ? (
            <div className={styles.loading}>
              <RaSpinner size="md" />
              <p>Caricamento dei moduli…</p>
            </div>
          ) : formsArray.length > 0 ? (
            <RaList>
              {formsArray.map(([slug, form]) => (
                <RaListItem
                  key={slug}
                  title={
                    <>
                      {form.title}
                      {/* tone esplicito invece di una classe derivata dal
                          dato: un valore nuovo in Redis darebbe un badge nudo */}
                      <RaBadge tone={form.status === 'active' ? 'success' : 'warning'} dot>
                        {form.status === 'active' ? 'Attivo' : 'Sospeso'}
                      </RaBadge>
                    </>
                  }
                  meta={
                    <>
                      <a className={styles.publicLink} href={publicFormUrl(slug)} target="_blank" rel="noopener noreferrer">
                        /{slug}
                      </a>
                      <span>·</span>
                      <span>Tally: {form.tallyId}</span>
                    </>
                  }
                  actions={
                    <>
                      {form.status === 'active' ? (
                        <RaButton size="sm" variant="ghost" onClick={() => handleUpdateStatus(slug, 'suspended')}>
                          Sospendi
                        </RaButton>
                      ) : (
                        <RaButton size="sm" variant="success" onClick={() => handleUpdateStatus(slug, 'active')}>
                          Riattiva
                        </RaButton>
                      )}
                      <RaButton size="sm" variant="danger" onClick={() => handleDelete(slug)}>
                        Elimina
                      </RaButton>
                    </>
                  }
                />
              ))}
            </RaList>
          ) : (
            <RaCard padding="none">
              <RaEmptyState
                icon={
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                }
                title="Nessun modulo"
                description="Non è ancora stato creato alcun link form breve."
              />
            </RaCard>
          )}
        </RaSection>
      </RaMain>
    </RaPage>
  );
}
