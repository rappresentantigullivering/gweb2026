'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  RaPage, RaMain, RaHeader, RaCard, RaButton, RaField, RaInput, RaSelect,
  RaTable, RaTabs, RaBadge, RaAlert, RaSpinner, RaLoadingScreen, raToast,
  requireSession, redirectToUnauthorized,
} from '@/components/riservata';
import styles from './page.module.css';

type Appunto = {
  id: string;
  facolta: string;
  anno: string;
  semestre: string;
  materia: string;
  professore: string;
  tipo: string;
  annoAccademico: string;
  descrizione: string;
  qualita: string;
  watermark: boolean;
  link: string;
};

type SheetType = 'digitali' | 'cartacei';

export default function AppuntiPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [appunti, setAppunti] = useState<Appunto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterFacolta, setFilterFacolta] = useState('');
  const [filterAnno, setFilterAnno] = useState('');
  const [filterWatermark, setFilterWatermark] = useState('');
  const [sheetType, setSheetType] = useState<SheetType>('digitali');

  const fetchAppunti = useCallback(async (type: SheetType) => {
    setLoading(true);
    setError('');
    try {
      const r = await fetch(`/api/appunti/?sheet=${type}`);
      const data = await r.json();
      if (Array.isArray(data)) {
        setAppunti(data);
      } else {
        setError(data.error || 'Errore nel caricamento degli appunti.');
      }
    } catch {
      setError('Errore di rete.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function checkAuth() {
      const session = await requireSession();
      if (!session) return;
      if (session.roles.includes('appunti') || session.roles.includes('admin')) {
        setIsAuthenticated(true);
      } else {
        redirectToUnauthorized();
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchAppunti(sheetType);
  }, [sheetType, isAuthenticated, fetchAppunti]);

  const facolta = useMemo(
    () => [...new Set(appunti.map((a) => a.facolta).filter(Boolean))].sort(),
    [appunti],
  );
  const anni = useMemo(
    () => [...new Set(appunti.map((a) => a.anno).filter(Boolean))].sort(),
    [appunti],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return appunti.filter((a) => {
      if (filterFacolta && a.facolta !== filterFacolta) return false;
      if (filterAnno && a.anno !== filterAnno) return false;
      if (filterWatermark === 'si' && !a.watermark) return false;
      if (filterWatermark === 'no' && a.watermark) return false;
      if (q && ![a.materia, a.professore, a.descrizione, a.facolta].join(' ').toLowerCase().includes(q)) return false;
      return true;
    });
  }, [appunti, search, filterFacolta, filterAnno, filterWatermark]);

  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      raToast('Link copiato negli appunti.', 'success');
    } catch {
      raToast('Impossibile copiare il link.', 'error');
    }
  };

  /** Il cambio di foglio azzera i filtri: le colonne e i valori cambiano. */
  const handleSheetChange = (type: SheetType) => {
    setFilterFacolta('');
    setFilterAnno('');
    setFilterWatermark('');
    setSearch('');
    setSheetType(type);
  };

  const isDigitali = sheetType === 'digitali';
  const colonne = isDigitali ? 8 : 6;

  if (isAuthenticated === null) {
    return (
      <RaPage area="appunti" center>
        <RaLoadingScreen message="Verifica autorizzazione in corso…" />
      </RaPage>
    );
  }

  return (
    <RaPage area="appunti">
      <RaHeader area="appunti" label="Archivio appunti" />

      <RaMain>
        <div className={styles.toolbar}>
          <RaTabs
            tabs={[
              { id: 'digitali', label: 'Appunti digitali' },
              { id: 'cartacei', label: 'Appunti cartacei' },
            ]}
            active={sheetType}
            onChange={handleSheetChange}
            ariaLabel="Tipo di archivio"
          />
          <span className={styles.count}>
            {loading ? 'Caricamento in corso…' : `${filtered.length} risultati su ${appunti.length} totali`}
          </span>
        </div>

        <RaCard padding="md">
          <div className={styles.filters}>
            <RaField label="Cerca" htmlFor="search" className={styles.searchField}>
              <RaInput
                id="search" type="text"
                placeholder="Materia, professore, parole chiave…"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
            </RaField>

            <RaField label="Facoltà" htmlFor="facolta">
              <RaSelect id="facolta" value={filterFacolta} onChange={(e) => setFilterFacolta(e.target.value)}>
                <option value="">Tutte le facoltà</option>
                {facolta.map((f) => <option key={f} value={f}>{f}</option>)}
              </RaSelect>
            </RaField>

            <RaField label="Anno di corso" htmlFor="anno">
              <RaSelect id="anno" value={filterAnno} onChange={(e) => setFilterAnno(e.target.value)}>
                <option value="">Tutti gli anni</option>
                {anni.map((a) => <option key={a} value={a}>{a}° anno</option>)}
              </RaSelect>
            </RaField>

            {isDigitali && (
              <RaField label="Watermark" htmlFor="watermark">
                <RaSelect id="watermark" value={filterWatermark} onChange={(e) => setFilterWatermark(e.target.value)}>
                  <option value="">Tutti</option>
                  <option value="si">Solo con watermark</option>
                  <option value="no">Solo senza</option>
                </RaSelect>
              </RaField>
            )}
          </div>
        </RaCard>

        {loading ? (
          <div className={styles.loading}>
            <RaSpinner size="md" />
            <p>Download del database appunti in corso…</p>
          </div>
        ) : error ? (
          <RaAlert tone="error" title="Caricamento non riuscito">
            {error}
            <div style={{ marginTop: '0.75rem' }}>
              <RaButton size="sm" variant="outline" onClick={() => fetchAppunti(sheetType)}>
                Riprova
              </RaButton>
            </div>
          </RaAlert>
        ) : (
          <RaTable>
            <thead>
              <tr>
                <th>Facoltà</th>
                <th>Anno/Sem</th>
                <th>Materia e info</th>
                <th>Professore</th>
                <th>Tipo</th>
                {isDigitali && (
                  <>
                    <th>Qualità</th>
                    <th>Watermark</th>
                  </>
                )}
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <RaTable.Empty colSpan={colonne}>
                  Nessun appunto corrisponde ai filtri selezionati.
                </RaTable.Empty>
              ) : (
                filtered.map((appunto) => (
                  <tr key={appunto.id}>
                    <td className={styles.nowrap}>{appunto.facolta}</td>
                    <td className={styles.nowrap}>
                      {appunto.anno}{appunto.semestre ? ` / S${appunto.semestre}` : ''}
                    </td>
                    <td>
                      <span className={styles.materia}>{appunto.materia}</span>
                      {appunto.descrizione && <span className={styles.descrizione}>{appunto.descrizione}</span>}
                    </td>
                    <td>{appunto.professore || '—'}</td>
                    <td>{appunto.tipo || '—'}</td>
                    {isDigitali && (
                      <>
                        <td>{appunto.qualita || '—'}</td>
                        <td>
                          <RaBadge tone={appunto.watermark ? 'success' : 'neutral'} dot>
                            {appunto.watermark ? 'Sì' : 'No'}
                          </RaBadge>
                        </td>
                      </>
                    )}
                    <td>
                      {appunto.link ? (
                        <div className={styles.rowActions}>
                          <RaButton size="sm" variant="outline" href={appunto.link} target="_blank" rel="noopener noreferrer">
                            Apri
                          </RaButton>
                          <RaButton size="sm" variant="ghost" onClick={() => handleCopyLink(appunto.link)}>
                            Copia
                          </RaButton>
                        </div>
                      ) : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </RaTable>
        )}

        {!loading && !error && process.env.NEXT_PUBLIC_APPUNTI_SHEET_ID && (
          <div className={styles.sheetLink}>
            <RaButton
              variant="subtle"
              href={`https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_APPUNTI_SHEET_ID}/edit`}
              target="_blank"
              rel="noopener noreferrer"
              icon={
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
              }
            >
              Consulta il foglio master completo
            </RaButton>
          </div>
        )}
      </RaMain>
    </RaPage>
  );
}
