'use client';

import { useState } from 'react';
import {
  RaPage, RaMain, RaSection, RaToolbar, RaHeader, RaButton, RaCard,
  RaField, RaInput, RaSelect, RaTextarea, RaInputWithPrefix,
  RaTable, RaTabs, RaModal, RaAlert, RaBadge, RaSpinner, RaLoadingScreen,
  RaEmptyState, RaStatCard, RaStatGrid, RaToggle, RaRoleSelector,
  RaList, RaListItem, raToast, raConfirm,
  AREA_ACCENT, AREA_LABEL, AVAILABLE_ROLES, roleAccent,
  type AreaId,
} from '@/components/riservata';
import hub from '../tesserati/page.module.css';

const AREAS = Object.keys(AREA_ACCENT) as AreaId[];
const VARIANTS = ['primary', 'accent', 'outline', 'subtle', 'ghost', 'danger', 'success', 'link'] as const;

export default function RiservataPreview() {
  const [area, setArea] = useState<AreaId>('admin');
  const [tab, setTab] = useState<'uno' | 'due' | 'tre'>('uno');
  const [toggleOn, setToggleOn] = useState(true);
  const [roles, setRoles] = useState<string[]>(['tesserato', 'appunti']);
  const [modalOpen, setModalOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  if (showLoading) {
    return (
      <RaPage area={area} title="Anteprima" center>
        <RaLoadingScreen message="Verifica dell'identità in corso…" />
        <div style={{ position: 'fixed', bottom: '2rem' }}>
          <RaButton variant="outline" onClick={() => setShowLoading(false)}>Torna al banco</RaButton>
        </div>
      </RaPage>
    );
  }

  return (
    <RaPage area={area} title="Anteprima design system">
      {/* Su localhost nudo il layout root mostra la navbar pubblica in
          position: fixed. In produzione, sui sottodomini, non c'e'. */}
      <div style={{ height: 44 }} aria-hidden="true" />
      <RaHeader area={area} meta="lorecalif" showLogout showBack sticky={false}>
        <RaTabs
          tabs={[{ id: 'uno', label: 'Calendario' }, { id: 'due', label: 'Bacheca' }, { id: 'tre', label: 'Lista' }]}
          active={tab}
          onChange={setTab}
          size="sm"
          ariaLabel="Esempio di tab nell'header"
        />
      </RaHeader>

      <RaMain>
        {/* ── Selettore area ── */}
        <RaSection title="Area attiva">
          <RaToolbar>
            <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
              {AREAS.map((a) => (
                <RaButton
                  key={a}
                  size="sm"
                  variant={a === area ? 'accent' : 'subtle'}
                  onClick={() => setArea(a)}
                >
                  {AREA_LABEL[a]}
                </RaButton>
              ))}
            </div>
            <code style={{ fontSize: '.8rem', opacity: .6 }}>--ra-accent: {AREA_ACCENT[area]}</code>
          </RaToolbar>
        </RaSection>

        {/* ── Composizione: griglia dell'hub con 1, 2 e 6 card ── */}
        <RaSection title="Hub tesserati · tenuta della griglia">
          {[1, 2, 6].map((n) => (
            <div key={n}>
              <p style={{ fontSize: '.75rem', opacity: .45, margin: '.75rem 0 .35rem' }}>
                utente con {n} {n === 1 ? 'ruolo' : 'ruoli'}
              </p>
              <div className={hub.grid} style={{ paddingBottom: '1rem' }}>
                {AREAS.filter((a) => a !== 'tesserati').slice(0, n).map((a) => (
                  <RaCard key={a} accent={AREA_ACCENT[a]} interactive topBar padding="lg" href="#" className={hub.serviceCard}>
                    <span className={hub.serviceIcon}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /></svg>
                    </span>
                    <h2 className={hub.serviceTitle}>{AREA_LABEL[a]}</h2>
                    <p className={hub.serviceSubtitle}>Descrizione di esempio del servizio, lunga quanto quelle reali della dashboard.</p>
                    <span className={hub.serviceFooter}>
                      <span className={hub.serviceHost}>{a}.gulliverancona.it</span>
                      <span className={hub.serviceArrow}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                      </span>
                    </span>
                  </RaCard>
                ))}
              </div>
            </div>
          ))}
        </RaSection>

        {/* ── Statistiche ── */}
        <RaSection title="Stat card">
          <RaStatGrid>
            <RaStatCard value="14" label="Contenuti" />
            <RaStatCard value="7" label="Da preparare" accent="var(--ra-danger)" />
            <RaStatCard value="2" label="Pronti" accent="var(--ra-ok)" />
            <RaStatCard value="128" label="Utenti" accent="var(--ra-info)" hint="+12 questo mese" />
          </RaStatGrid>
        </RaSection>

        {/* ── Pulsanti ── */}
        <RaSection title="Pulsanti">
          <RaCard padding="md">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.75rem', alignItems: 'center' }}>
                <span style={{ fontSize: '.7rem', opacity: .45, width: 28 }}>{size}</span>
                {VARIANTS.map((v) => (
                  <RaButton key={v} variant={v} size={size}>{v}</RaButton>
                ))}
              </div>
            ))}
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '.7rem', opacity: .45, width: 28 }}>—</span>
              <RaButton variant="primary" loading>In corso</RaButton>
              <RaButton variant="accent" disabled>Disabilitato</RaButton>
              <RaButton variant="outline" href="#">Come link</RaButton>
              <RaButton variant="ghost" icon={<span>←</span>}>Con icona</RaButton>
            </div>
          </RaCard>
        </RaSection>

        {/* ── Badge ── */}
        <RaSection title="Badge">
          <RaCard padding="md">
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.75rem' }}>
              <RaBadge tone="neutral">neutral</RaBadge>
              <RaBadge tone="accent">accent</RaBadge>
              <RaBadge tone="success" dot>attivo</RaBadge>
              <RaBadge tone="danger" dot>sospeso</RaBadge>
              <RaBadge tone="warning">in corso</RaBadge>
            </div>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              {AVAILABLE_ROLES.map((r) => (
                <RaBadge key={r.id} accent={roleAccent(r.id)}>{r.label}</RaBadge>
              ))}
              <RaBadge accent={roleAccent('ruolo-legacy')}>ruolo ignoto</RaBadge>
            </div>
          </RaCard>
        </RaSection>

        {/* ── Campi ── */}
        <RaSection title="Campi">
          <RaCard padding="md">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '1rem' }}>
              <RaField label="Username" htmlFor="p1" hint="Minimo 3 caratteri">
                <RaInput id="p1" placeholder="Inserisci il tuo username" />
              </RaField>
              <RaField label="Password" htmlFor="p2" error="La password deve contenere almeno 6 caratteri">
                <RaInput id="p2" type="password" invalid defaultValue="abc" />
              </RaField>
              <RaField label="Facoltà" htmlFor="p3">
                <RaSelect id="p3" defaultValue="ing">
                  <option value="ing">Ingegneria</option>
                  <option value="eco">Economia</option>
                </RaSelect>
              </RaField>
              <RaField label="Link Canva" htmlFor="p4" optional>
                <RaInput id="p4" placeholder="https://www.canva.com/…" />
              </RaField>
              <RaField label="Slug pubblico" htmlFor="p5" hint="forms.gulliverancona.it/il-tuo-slug">
                <RaInputWithPrefix id="p5" prefix="/" placeholder="iscrizione-2026" />
              </RaField>
              <RaField label="Disabilitato" htmlFor="p6">
                <RaInput id="p6" disabled defaultValue="non modificabile" />
              </RaField>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <RaField label="Didascalia" htmlFor="p7">
                <RaTextarea id="p7" placeholder="Testo del post, call to action e hashtag…" />
              </RaField>
            </div>
          </RaCard>
        </RaSection>

        {/* ── Alert ── */}
        <RaSection title="Messaggi">
          <div style={{ display: 'grid', gap: '.6rem' }}>
            <RaAlert tone="error">Password errata. Riprova.</RaAlert>
            <RaAlert tone="success" title="Richiesta inviata">Attendi l&apos;approvazione di un amministratore.</RaAlert>
            <RaAlert tone="warning">Questo modulo è sospeso: il link pubblico non risponde.</RaAlert>
            <RaAlert tone="info">Il calendario mostra solo i contenuti del mese corrente.</RaAlert>
          </div>
        </RaSection>

        {/* ── Card ── */}
        <RaSection title="Card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 380px))', gap: '1.25rem', justifyContent: 'center' }}>
            {AREAS.slice(0, 3).map((a) => (
              <RaCard key={a} accent={AREA_ACCENT[a]} interactive topBar padding="lg" href="#">
                <h3 style={{ margin: '0 0 .4rem', fontSize: '1.05rem' }}>{AREA_LABEL[a]}</h3>
                <p style={{ margin: 0, fontSize: '.85rem' }}>
                  Card cliccabile con barra superiore che eredita il colore dell&apos;area.
                </p>
              </RaCard>
            ))}
          </div>
        </RaSection>

        {/* ── Tabella ── */}
        <RaSection title="Tabella">
          <RaTable>
            <thead>
              <tr><th>Materia</th><th>Anno</th><th>Docente</th><th>Watermark</th><th>Azioni</th></tr>
            </thead>
            <tbody>
              {[
                ['Analisi Matematica 1', '1º', 'Rossi', true],
                ['Fisica Generale', '1º', 'Bianchi', false],
                ['Elettrotecnica', '2º', 'Verdi', true],
              ].map(([m, y, d, w]) => (
                <tr key={m as string}>
                  <td>{m}</td><td>{y}</td><td>{d}</td>
                  <td><RaBadge tone={w ? 'success' : 'neutral'} dot>{w ? 'Sì' : 'No'}</RaBadge></td>
                  <td>
                    <div style={{ display: 'flex', gap: '.3rem' }}>
                      <RaButton size="sm" variant="outline">Apri</RaButton>
                      <RaButton size="sm" variant="ghost">Copia</RaButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </RaTable>
          <RaTable>
            <thead><tr><th>Materia</th><th>Anno</th></tr></thead>
            <tbody><RaTable.Empty colSpan={2}>Nessun risultato per i filtri attivi.</RaTable.Empty></tbody>
          </RaTable>
        </RaSection>

        {/* ── Lista ── */}
        <RaSection title="Lista">
          <RaList>
            <RaListItem
              title={<>iscrizione-gita-2026 <RaBadge tone="success" dot>attivo</RaBadge></>}
              meta={<><span>Creato il 12 set 2026</span>·<span>tally: w4Xk9p</span></>}
              actions={<>
                <RaButton size="sm" variant="ghost">Sospendi</RaButton>
                <RaButton size="sm" variant="danger">Elimina</RaButton>
              </>}
            />
            <RaListItem
              title={<>tesseramento <RaBadge tone="warning" dot>sospeso</RaBadge></>}
              meta={<span>Creato il 3 ago 2026</span>}
              actions={<>
                <RaButton size="sm" variant="success">Riattiva</RaButton>
                <RaButton size="sm" variant="danger">Elimina</RaButton>
              </>}
            />
          </RaList>
        </RaSection>

        {/* ── Ruoli ── */}
        <RaSection title="Selettore ruoli">
          <RaCard padding="md">
            <RaRoleSelector
              selected={roles}
              onToggle={(id) => setRoles((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id])}
            />
          </RaCard>
        </RaSection>

        {/* ── Controlli e feedback ── */}
        <RaSection title="Controlli e feedback">
          <RaCard padding="md">
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
              <RaToggle checked={toggleOn} onChange={setToggleOn} label={toggleOn ? 'Pop-up attivo' : 'Pop-up spento'} />
              <RaToggle checked={false} onChange={() => {}} disabled label="Disabilitato" />
              <RaSpinner size="sm" /><RaSpinner size="md" /><RaSpinner size="lg" />
            </div>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              <RaButton variant="accent" onClick={() => setModalOpen(true)}>Apri modale</RaButton>
              <RaButton variant="outline" onClick={() => raToast('Contenuto salvato', 'success')}>Toast ok</RaButton>
              <RaButton variant="outline" onClick={() => raToast('Errore di connessione', 'error')}>Toast errore</RaButton>
              <RaButton variant="outline" onClick={() => raToast('Sincronizzazione in corso', 'info')}>Toast info</RaButton>
              <RaButton variant="danger" onClick={async () => {
                const ok = await raConfirm({
                  title: "Eliminare l'utente?",
                  message: '"mariorossi" verrà rimosso definitivamente.',
                  confirmLabel: 'Elimina', tone: 'danger',
                });
                raToast(ok ? 'Eliminato' : 'Annullato', ok ? 'success' : 'info');
              }}>Chiedi conferma</RaButton>
              <RaButton variant="subtle" onClick={() => setShowLoading(true)}>Schermata di attesa</RaButton>
            </div>
          </RaCard>
        </RaSection>

        {/* ── Stato vuoto ── */}
        <RaSection title="Stato vuoto">
          <RaCard padding="none">
            <RaEmptyState
              icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
              title="Nessun servizio attivo"
              description="Il tuo account non ha ancora ruoli operativi assegnati. Contatta un amministratore."
              action={<RaButton variant="primary">Contatta un admin</RaButton>}
            />
          </RaCard>
        </RaSection>
      </RaMain>

      <RaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Modifica utente"
        description="Lascia vuota la password per non cambiarla."
        footer={<>
          <RaButton variant="outline" onClick={() => setModalOpen(false)}>Annulla</RaButton>
          <RaButton variant="primary" onClick={() => { setModalOpen(false); raToast('Utente aggiornato', 'success'); }}>Salva</RaButton>
        </>}
      >
        <RaField label="Nuova password" htmlFor="mp" optional>
          <RaInput id="mp" type="password" placeholder="••••••••" />
        </RaField>
        <RaField label="Ruoli">
          <RaRoleSelector selected={roles} onToggle={(id) => setRoles((p) => p.includes(id) ? p.filter((r) => r !== id) : [...p, id])} />
        </RaField>
      </RaModal>
    </RaPage>
  );
}
