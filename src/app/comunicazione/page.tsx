'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  RaPage, RaHeader, RaButton, RaField, RaInput, RaSelect, RaTextarea,
  RaModal, RaTabs, RaStatCard, RaStatGrid, RaLoadingScreen,
  raToast, raConfirm, requireSession, redirectToUnauthorized,
} from '@/components/riservata';
import styles from './page.module.css';

/* ────────────────────────────────────────────────────────────────
   Modello dati
   ──────────────────────────────────────────────────────────────── */

type Stato = 'idea' | 'todo' | 'in_progress' | 'done' | 'published';
type Tipo = 'post' | 'carosello' | 'reel' | 'storia' | 'collab' | 'annuncio';

interface Post {
  id: string;
  titolo: string;
  data_pubblicazione: string; // ISO string oppure YYYY-MM-DDTHH:mm
  canva_link?: string;        // opzionale: reel/storie spesso non hanno Canva
  didascalia: string;
  stato_grafica: Stato;
  tipo?: Tipo;                // default: 'post' (retrocompatibilità)
  responsabile?: string;
  note?: string;
  reminders_sent?: string[];
}

const TIPI: { id: Tipo; label: string; icon: string }[] = [
  { id: 'post', label: 'Post', icon: '🖼️' },
  { id: 'carosello', label: 'Carosello', icon: '🎠' },
  { id: 'reel', label: 'Reel', icon: '🎬' },
  { id: 'storia', label: 'Storia', icon: '⚡' },
  { id: 'collab', label: 'Collab', icon: '🤝' },
  { id: 'annuncio', label: 'Annuncio', icon: '📣' },
];

const STATI: { id: Stato; label: string; short: string }[] = [
  { id: 'idea', label: 'Idea', short: 'Idea' },
  { id: 'todo', label: 'Da fare', short: 'Da fare' },
  { id: 'in_progress', label: 'In corso', short: 'In corso' },
  { id: 'done', label: 'Pronto', short: 'Pronto' },
  { id: 'published', label: 'Pubblicato', short: 'Online' },
];

const CAPTION_LIMIT = 2200;   // limite didascalia Instagram
const HASHTAG_LIMIT = 30;     // limite hashtag per post

const MESI = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
];

const GIORNI_CORTI = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

/* ────────────────────────────────────────────────────────────────
   Helper
   ──────────────────────────────────────────────────────────────── */

const pad = (n: number) => String(n).padStart(2, '0');

function tipoOf(post: Post): Tipo {
  return (post.tipo && TIPI.some(t => t.id === post.tipo) ? post.tipo : 'post') as Tipo;
}

function statoOf(post: Post): Stato {
  return (post.stato_grafica && STATI.some(s => s.id === post.stato_grafica)
    ? post.stato_grafica
    : 'todo') as Stato;
}

function tipoLabel(t: Tipo) {
  return TIPI.find(x => x.id === t)?.label ?? 'Post';
}

function statoLabel(s: Stato) {
  return STATI.find(x => x.id === s)?.label ?? 'Da fare';
}

/** Variabili CSS per colorare badge/bordi in base a formato e stato. */
function accentVars(post: Post): React.CSSProperties {
  return {
    ['--accent' as string]: `var(--tipo-${tipoOf(post)})`,
    ['--stato-color' as string]: `var(--stato-${statoOf(post)})`,
  } as React.CSSProperties;
}

function dayKeyOf(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

/** Sposta un contenuto su un altro giorno mantenendo l'orario. */
function moveToDay(iso: string, y: number, m: number, d: number) {
  const src = new Date(iso);
  const hh = Number.isNaN(src.getTime()) ? 14 : src.getHours();
  const mm = Number.isNaN(src.getTime()) ? 0 : src.getMinutes();
  return `${y}-${pad(m + 1)}-${pad(d)}T${pad(hh)}:${pad(mm)}`;
}

function countHashtags(text: string) {
  return (text.match(/#[\p{L}\p{N}_]+/gu) || []).length;
}

const emptyForm: Partial<Post> = {
  id: '',
  titolo: '',
  data_pubblicazione: '',
  canva_link: '',
  didascalia: '',
  stato_grafica: 'todo',
  tipo: 'post',
  responsabile: '',
  note: '',
};

/* ────────────────────────────────────────────────────────────────
   Componente
   ──────────────────────────────────────────────────────────────── */

export default function ComunicazionePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [posts, setPosts] = useState<Record<string, Post>>({});
  const [activeTab, setActiveTab] = useState<'calendar' | 'board' | 'list'>('calendar');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Stato>('all');
  const [tipoFilter, setTipoFilter] = useState<'all' | Tipo>('all');

  const [currentDate, setCurrentDate] = useState(new Date());

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [dayModal, setDayModal] = useState<{ y: number; m: number; d: number } | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [formPost, setFormPost] = useState<Partial<Post>>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [dragId, setDragId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const showToast = useCallback((msg: string, tone: 'info' | 'success' | 'error' = 'info') => {
    raToast(msg, tone);
  }, []);

  /* ── Auth ─────────────────────────────────────────────────────── */
  useEffect(() => {
    async function checkAuth() {
      const session = await requireSession();
      if (!session) return;
      if (session.roles.includes('comunicazione') || session.roles.includes('admin')) {
        setIsAuthenticated(true);
      } else {
        redirectToUnauthorized();
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchPosts();
  }, [isAuthenticated]);

  async function fetchPosts() {
    try {
      const res = await fetch('/api/comunicazione');
      if (res.ok) setPosts(await res.json());
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  }

  /* ── CRUD ─────────────────────────────────────────────────────── */

  /** Salva (create o update) e aggiorna lo stato locale. */
  const persistPost = useCallback(async (post: Post, isEdit: boolean) => {
    const res = await fetch('/api/comunicazione', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: isEdit ? 'update' : 'create', post }),
    });
    if (!res.ok) throw new Error('save failed');
    const result = await res.json();
    const saved: Post = result.post || post;
    setPosts(prev => ({ ...prev, [saved.id]: saved }));
    return saved;
  }, []);

  async function handleSavePost(e: React.FormEvent) {
    e.preventDefault();
    if (!formPost.titolo?.trim() || !formPost.data_pubblicazione) {
      showToast('Titolo e data di pubblicazione sono obbligatori.', 'error');
      return;
    }

    const isEdit = !!formPost.id;
    const postData: Post = {
      ...(formPost as Post),
      titolo: formPost.titolo.trim(),
      canva_link: formPost.canva_link?.trim() || '',
      didascalia: formPost.didascalia || '',
      responsabile: formPost.responsabile?.trim() || '',
      note: formPost.note?.trim() || '',
      tipo: (formPost.tipo as Tipo) || 'post',
      stato_grafica: (formPost.stato_grafica as Stato) || 'todo',
      id: isEdit ? formPost.id! : 'post_' + Date.now(),
    };

    setSaving(true);
    try {
      await persistPost(postData, isEdit);
      setIsFormModalOpen(false);
      setFormPost(emptyForm);
      showToast(isEdit ? 'Contenuto aggiornato.' : 'Contenuto aggiunto in calendario.', 'success');
    } catch (err) {
      console.error('Save error:', err);
      showToast('Errore nel salvataggio. Riprova.', 'error');
    } finally {
      setSaving(false);
    }
  }

  /** Aggiorna al volo alcuni campi (drag&drop, cambio stato rapido). */
  const patchPost = useCallback(async (id: string, patch: Partial<Post>) => {
    const current = posts[id];
    if (!current) return;
    const updated: Post = { ...current, ...patch };
    setPosts(prev => ({ ...prev, [id]: updated }));      // ottimistico
    setSelectedPost(prev => (prev && prev.id === id ? updated : prev));
    try {
      await persistPost(updated, true);
    } catch (err) {
      console.error('Patch error:', err);
      setPosts(prev => ({ ...prev, [id]: current }));    // rollback
      showToast('Errore di salvataggio, modifica annullata.', 'error');
    }
  }, [posts, persistPost, showToast]);

  async function handleDeletePost(id: string) {
    const confermato = await raConfirm({
      title: 'Eliminare il contenuto?',
      message: 'Verrà rimosso dal calendario e dai promemoria Telegram.',
      confirmLabel: 'Elimina',
      tone: 'danger',
    });
    if (!confermato) return;
    try {
      const res = await fetch('/api/comunicazione', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', post: { id } }),
      });
      if (res.ok) {
        setPosts(prev => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        setIsDetailModalOpen(false);
        setSelectedPost(null);
        showToast('Contenuto eliminato.', 'success');
      } else {
        showToast('Errore nell\'eliminazione.', 'error');
      }
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Errore di connessione.', 'error');
    }
  }

  function handleDuplicate(post: Post) {
    const next = new Date(post.data_pubblicazione);
    next.setDate(next.getDate() + 7);
    setFormPost({
      ...post,
      id: '',
      titolo: post.titolo + ' (copia)',
      stato_grafica: 'todo',
      reminders_sent: [],
      data_pubblicazione: `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}T${pad(next.getHours())}:${pad(next.getMinutes())}`,
    });
    setIsDetailModalOpen(false);
    setIsFormModalOpen(true);
  }

  function openNewPost(prefillDate?: string) {
    setFormPost({ ...emptyForm, data_pubblicazione: prefillDate || '' });
    setIsFormModalOpen(true);
  }

  function openEdit(post: Post) {
    setFormPost({ ...emptyForm, ...post, tipo: tipoOf(post), stato_grafica: statoOf(post) });
    setIsDetailModalOpen(false);
    setIsFormModalOpen(true);
  }

  const handleCopyCaption = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Didascalia copiata negli appunti.', 'success');
  };

  /* ── Date & derivazioni ───────────────────────────────────────── */
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = new Date(year, month, 1).getDay();
  const adjustedStartOffset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const postsList = useMemo(() => Object.values(posts), [posts]);

  const matchesFilters = useCallback((post: Post) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      post.titolo.toLowerCase().includes(q) ||
      (post.didascalia || '').toLowerCase().includes(q) ||
      (post.responsabile || '').toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || statoOf(post) === statusFilter;
    const matchesTipo = tipoFilter === 'all' || tipoOf(post) === tipoFilter;
    return matchesSearch && matchesStatus && matchesTipo;
  }, [searchQuery, statusFilter, tipoFilter]);

  const filteredPosts = useMemo(
    () => postsList
      .filter(matchesFilters)
      .sort((a, b) => new Date(a.data_pubblicazione).getTime() - new Date(b.data_pubblicazione).getTime()),
    [postsList, matchesFilters],
  );

  /** Mappa giorno → contenuti (già filtrati) per il calendario. */
  const postsByDay = useMemo(() => {
    const map: Record<string, Post[]> = {};
    for (const post of filteredPosts) {
      const d = new Date(post.data_pubblicazione);
      if (Number.isNaN(d.getTime())) continue;
      const key = dayKeyOf(d);
      (map[key] ||= []).push(post);
    }
    return map;
  }, [filteredPosts]);

  /** Statistiche del mese visualizzato (non filtrate). */
  const monthStats = useMemo(() => {
    const inMonth = postsList.filter(p => {
      const d = new Date(p.data_pubblicazione);
      return !Number.isNaN(d.getTime()) && d.getFullYear() === year && d.getMonth() === month;
    });
    const byStato = Object.fromEntries(STATI.map(s => [s.id, 0])) as Record<Stato, number>;
    const byTipo = Object.fromEntries(TIPI.map(t => [t.id, 0])) as Record<Tipo, number>;
    for (const p of inMonth) {
      byStato[statoOf(p)] += 1;
      byTipo[tipoOf(p)] += 1;
    }
    const now = Date.now();
    const daFare = inMonth.filter(p => {
      const s = statoOf(p);
      return s !== 'done' && s !== 'published' && new Date(p.data_pubblicazione).getTime() >= now;
    }).length;
    const inRitardo = inMonth.filter(p => {
      const s = statoOf(p);
      return s !== 'done' && s !== 'published' && new Date(p.data_pubblicazione).getTime() < now;
    }).length;
    return { total: inMonth.length, byStato, byTipo, daFare, inRitardo };
  }, [postsList, year, month]);

  /* ── Drag & drop ──────────────────────────────────────────────── */
  function onDragStartPost(e: React.DragEvent, id: string) {
    setDragId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  }

  function onDropOnDay(e: React.DragEvent, day: number) {
    e.preventDefault();
    setDropTarget(null);
    const id = dragId || e.dataTransfer.getData('text/plain');
    setDragId(null);
    const post = posts[id];
    if (!post) return;
    const nextDate = moveToDay(post.data_pubblicazione, year, month, day);
    if (nextDate === post.data_pubblicazione) return;
    patchPost(id, { data_pubblicazione: nextDate });
    showToast(`Spostato al ${day} ${MESI[month].toLowerCase()}`);
  }

  function onDropOnColumn(e: React.DragEvent, stato: Stato) {
    e.preventDefault();
    setDropTarget(null);
    const id = dragId || e.dataTransfer.getData('text/plain');
    setDragId(null);
    const post = posts[id];
    if (!post || statoOf(post) === stato) return;
    patchPost(id, { stato_grafica: stato });
    showToast(`Spostato in "${statoLabel(stato)}"`);
  }

  /* ── Schermate di servizio ────────────────────────────────────── */
  if (isAuthenticated !== true) {
    return (
      <RaPage area="comunicazione" center className={styles.palette}>
        <RaLoadingScreen message="Verifica autorizzazione in corso…" />
      </RaPage>
    );
  }

  /* ── Dashboard ────────────────────────────────────────────────── */
  const captionLength = (formPost.didascalia || '').length;
  const hashtagCount = countHashtags(formPost.didascalia || '');

  return (
    <RaPage area="comunicazione" title="Calendario editoriale" className={styles.palette}>
      <RaHeader area="comunicazione" label="Comunicazione" showLogout>
        <RaTabs
          tabs={[
            { id: 'calendar', label: 'Calendario' },
            { id: 'board', label: 'Bacheca' },
            { id: 'list', label: 'Lista' },
          ]}
          active={activeTab}
          onChange={setActiveTab}
          size="sm"
          ariaLabel="Vista del calendario editoriale"
        />
        <RaButton variant="accent" size="sm" onClick={() => openNewPost()}>
          + Nuovo
        </RaButton>
      </RaHeader>

      <main className={styles.contentArea}>
        {/* STATISTICHE DEL MESE */}
        <RaStatGrid>
          <RaStatCard value={monthStats.total} label={`Contenuti · ${MESI[month]}`} />
          <RaStatCard value={monthStats.daFare} label="Da preparare" accent="var(--ra-danger)" />
          <RaStatCard value={monthStats.byStato.done} label="Grafiche pronte" accent="var(--ra-ok)" />
          <RaStatCard value={monthStats.byStato.published} label="Pubblicati" accent="var(--ra-info)" />
          <RaStatCard
            value={monthStats.byTipo.reel + monthStats.byTipo.storia}
            label="Reel + storie"
            accent="var(--tipo-reel)"
          />
          <RaStatCard
            value={monthStats.inRitardo}
            label="Scaduti non pronti"
            accent={monthStats.inRitardo > 0 ? 'var(--ra-warn)' : 'var(--ra-line-strong)'}
          />
        </RaStatGrid>

        {/* TOOLBAR: navigazione mese + ricerca */}
        <div className={styles.toolbar}>
          {activeTab === 'calendar' ? (
            <div className={styles.monthControls}>
              <button className={styles.monthNavBtn} onClick={prevMonth} aria-label="Mese precedente">←</button>
              <h2 className={styles.monthTitle}>{MESI[month]} {year}</h2>
              <button className={styles.monthNavBtn} onClick={nextMonth} aria-label="Mese successivo">→</button>
              <button className={styles.todayBtn} onClick={goToday}>Oggi</button>
            </div>
          ) : (
            <h2 className={styles.monthTitle}>
              {activeTab === 'board' ? 'Flusso di produzione' : 'Tutti i contenuti'}
            </h2>
          )}

          <input
            type="text"
            className={styles.searchInput}
            placeholder="Cerca titolo, didascalia o responsabile…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FILTRI */}
        <div className={styles.toolbar}>
          <div className={styles.filterRow}>
            <button
              className={`${styles.chip} ${tipoFilter === 'all' ? styles.chipActive : ''}`}
              onClick={() => setTipoFilter('all')}
            >
              Tutti i formati
            </button>
            {TIPI.map(t => (
              <button
                key={t.id}
                className={`${styles.chip} ${tipoFilter === t.id ? styles.chipActive : ''}`}
                style={{ ['--accent' as string]: `var(--tipo-${t.id})` } as React.CSSProperties}
                onClick={() => setTipoFilter(tipoFilter === t.id ? 'all' : t.id)}
              >
                <span className={styles.chipDot} />
                {t.label}
              </button>
            ))}
          </div>

          <div className={styles.filterRow}>
            <button
              className={`${styles.chip} ${statusFilter === 'all' ? styles.chipActive : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              Ogni stato
            </button>
            {STATI.map(s => (
              <button
                key={s.id}
                className={`${styles.chip} ${statusFilter === s.id ? styles.chipActive : ''}`}
                style={{ ['--accent' as string]: `var(--stato-${s.id})` } as React.CSSProperties}
                onClick={() => setStatusFilter(statusFilter === s.id ? 'all' : s.id)}
              >
                <span className={styles.chipDot} />
                {s.short}
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- CALENDARIO ---------------- */}
        {activeTab === 'calendar' && (
          <div className={styles.calendarGrid}>
            {GIORNI_CORTI.map(d => (
              <div key={d} className={styles.calendarHeaderDay}>{d}</div>
            ))}

            {Array.from({ length: adjustedStartOffset }).map((_, i) => (
              <div key={'empty-' + i} className={`${styles.calendarCell} ${styles.calendarCellEmpty}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const cellDate = new Date(year, month, day);
              const today = new Date();
              const isToday =
                today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
              const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const weekdayIdx = (cellDate.getDay() + 6) % 7;
              const isWeekend = weekdayIdx >= 5;
              const dayPosts = postsByDay[dayKeyOf(cellDate)] || [];
              const visible = dayPosts.slice(0, 4);
              const hidden = dayPosts.length - visible.length;
              const dropKey = 'day-' + day;

              return (
                <div
                  key={dropKey}
                  className={[
                    styles.calendarCell,
                    isToday ? styles.calendarCellToday : '',
                    isPast && !isToday ? styles.calendarCellPast : '',
                    isWeekend ? styles.calendarCellWeekend : '',
                    dayPosts.length === 0 ? styles.calendarCellNoPosts : '',
                    dropTarget === dropKey ? styles.calendarCellDrop : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => openNewPost(`${year}-${pad(month + 1)}-${pad(day)}T14:00`)}
                  onDragOver={(e) => { e.preventDefault(); setDropTarget(dropKey); }}
                  onDragLeave={() => setDropTarget(prev => (prev === dropKey ? null : prev))}
                  onDrop={(e) => onDropOnDay(e, day)}
                >
                  <div className={styles.cellHead}>
                    <span className={styles.dayNumber}>{day}</span>
                    <span className={styles.dayWeekdayLabel}>{GIORNI_CORTI[weekdayIdx]}</span>
                    <span className={styles.addHint}>+</span>
                  </div>

                  <div className={styles.cellPostList}>
                    {visible.map(post => {
                      const dateObj = new Date(post.data_pubblicazione);
                      const hhmm = dateObj.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
                      return (
                        <div
                          key={post.id}
                          role="button"
                          tabIndex={0}
                          draggable
                          onDragStart={(e) => { e.stopPropagation(); onDragStartPost(e, post.id); }}
                          onDragEnd={() => { setDragId(null); setDropTarget(null); }}
                          className={`${styles.cellPostBadge} ${dragId === post.id ? styles.cellPostBadgeDragging : ''}`}
                          style={accentVars(post)}
                          title={`${tipoLabel(tipoOf(post))} · ${post.titolo}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPost(post);
                            setIsDetailModalOpen(true);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedPost(post);
                              setIsDetailModalOpen(true);
                            }
                          }}
                        >
                          <span className={styles.badgeMeta}>
                            <span className={styles.statusDot} />
                            <span className={styles.badgeTime}>{hhmm}</span>
                            <span className={styles.badgeTipo}>{tipoLabel(tipoOf(post))}</span>
                          </span>
                          <span className={styles.badgeTitle}>{post.titolo}</span>
                        </div>
                      );
                    })}

                    {hidden > 0 && (
                      <button
                        className={styles.cellMore}
                        onClick={(e) => { e.stopPropagation(); setDayModal({ y: year, m: month, d: day }); }}
                      >
                        +{hidden} altri
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ---------------- BACHECA (KANBAN) ---------------- */}
        {activeTab === 'board' && (
          <div className={styles.boardGrid}>
            {STATI.map(col => {
              const colPosts = filteredPosts.filter(p => statoOf(p) === col.id);
              const dropKey = 'col-' + col.id;
              return (
                <div
                  key={col.id}
                  className={`${styles.boardColumn} ${dropTarget === dropKey ? styles.boardColumnDrop : ''}`}
                  style={{ ['--accent' as string]: `var(--stato-${col.id})` } as React.CSSProperties}
                  onDragOver={(e) => { e.preventDefault(); setDropTarget(dropKey); }}
                  onDragLeave={() => setDropTarget(prev => (prev === dropKey ? null : prev))}
                  onDrop={(e) => onDropOnColumn(e, col.id)}
                >
                  <div className={styles.boardColumnHead}>
                    <span className={styles.chipDot} />
                    <span className={styles.boardColumnTitle}>{col.label}</span>
                    <span className={styles.boardCount}>{colPosts.length}</span>
                  </div>

                  {colPosts.length === 0 ? (
                    <div className={styles.boardEmpty}>Trascina qui</div>
                  ) : (
                    colPosts.map(post => {
                      const d = new Date(post.data_pubblicazione);
                      return (
                        <div
                          key={post.id}
                          className={styles.boardCard}
                          style={accentVars(post)}
                          draggable
                          onDragStart={(e) => onDragStartPost(e, post.id)}
                          onDragEnd={() => { setDragId(null); setDropTarget(null); }}
                          onClick={() => { setSelectedPost(post); setIsDetailModalOpen(true); }}
                        >
                          <span className={styles.boardCardTitle}>{post.titolo}</span>
                          <span className={styles.boardCardMeta}>
                            <span className={styles.badgeTipo}>{tipoLabel(tipoOf(post))}</span>
                            ·
                            <span>
                              {d.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })} ·{' '}
                              {d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {post.responsabile ? <span>· {post.responsabile}</span> : null}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ---------------- LISTA ---------------- */}
        {activeTab === 'list' && (
          filteredPosts.length > 0 ? (
            <div className={styles.listContainer}>
              {filteredPosts.map((post, idx) => {
                const dateObj = new Date(post.data_pubblicazione);
                const prev = idx > 0 ? new Date(filteredPosts[idx - 1].data_pubblicazione) : null;
                const newDay = !prev || dayKeyOf(prev) !== dayKeyOf(dateObj);
                const dayHeader = dateObj.toLocaleDateString('it-IT', {
                  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                });
                const hhmm = dateObj.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

                return (
                  <div key={post.id}>
                    {newDay && <div className={styles.listDayHeader}>{dayHeader}</div>}

                    <div className={styles.postCard} style={accentVars(post)}>
                      <div className={styles.cardHeader}>
                        <div className={styles.cardTitleArea}>
                          <span className={styles.cardDate}>Ore {hhmm}</span>
                          <h3 className={styles.cardTitle}>{post.titolo}</h3>
                        </div>
                        <div className={styles.cardBadges}>
                          <span className={styles.tipoBadge}>{tipoLabel(tipoOf(post))}</span>
                          <span className={styles.statusBadge}>{statoLabel(statoOf(post))}</span>
                        </div>
                      </div>

                      {post.didascalia && (
                        <div className={styles.captionBox}>
                          <p className={`${styles.captionText} ${styles.captionClamp}`}>{post.didascalia}</p>
                          <button
                            className={styles.copyBtn}
                            onClick={() => handleCopyCaption(post.didascalia)}
                            title="Copia didascalia"
                          >
                            📋
                          </button>
                        </div>
                      )}

                      <div className={styles.cardFooter}>
                        {post.canva_link ? (
                          <a href={post.canva_link} target="_blank" rel="noopener noreferrer" className={styles.canvaBtn}>
                            <span>Apri Canva</span>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="7" y1="17" x2="17" y2="7" />
                              <polyline points="7 7 17 7 17 17" />
                            </svg>
                          </a>
                        ) : (
                          <span className={styles.noLinkHint}>
                            {post.responsabile ? `Responsabile: ${post.responsabile}` : 'Nessun link allegato'}
                          </span>
                        )}

                        <div className={styles.footerActions}>
                          <button className={styles.dupBtn} onClick={() => handleDuplicate(post)}>Duplica</button>
                          <button className={styles.editBtn} onClick={() => openEdit(post)}>Modifica</button>
                          <button className={styles.deleteBtn} onClick={() => handleDeletePost(post.id)}>Elimina</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateSvg}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <p>Nessun contenuto corrisponde ai filtri attivi.</p>
            </div>
          )
        )}
      </main>

      {/* --- MODALE FORM (NUOVO / MODIFICA) --- */}
      <RaModal
        open={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={formPost.id ? 'Modifica contenuto' : 'Nuovo contenuto'}
        footer={
          <>
            <RaButton variant="outline" onClick={() => setIsFormModalOpen(false)}>Annulla</RaButton>
            <RaButton variant="accent" onClick={handleSavePost} disabled={saving} loading={saving}>
              {saving ? 'Salvataggio…' : 'Salva'}
            </RaButton>
          </>
        }
      >
        <form onSubmit={handleSavePost} className={styles.form}>
          <RaField label="Formato">
            <div className={styles.tipoPicker}>
              {TIPI.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.tipoOption} ${(formPost.tipo || 'post') === t.id ? styles.tipoOptionActive : ''}`}
                  style={{ ['--accent' as string]: `var(--tipo-${t.id})` } as React.CSSProperties}
                  onClick={() => setFormPost(prev => ({ ...prev, tipo: t.id }))}
                >
                  <span>{t.icon}</span> {t.label}
                </button>
              ))}
            </div>
          </RaField>

          <RaField label="Titolo *" htmlFor="titolo">
            <RaInput
              type="text" id="titolo" required
              placeholder="Es. Reel gruppi matricole"
              value={formPost.titolo || ''}
              onChange={(e) => setFormPost(prev => ({ ...prev, titolo: e.target.value }))}
            />
          </RaField>

          <div className={styles.formRow}>
            <RaField label="Data e ora *" htmlFor="data_pub">
              <RaInput
                type="datetime-local" id="data_pub" required
                value={formPost.data_pubblicazione || ''}
                onChange={(e) => setFormPost(prev => ({ ...prev, data_pubblicazione: e.target.value }))}
              />
            </RaField>

            <RaField label="Stato" htmlFor="stato_g">
              <RaSelect
                id="stato_g"
                value={formPost.stato_grafica || 'todo'}
                onChange={(e) => setFormPost(prev => ({ ...prev, stato_grafica: e.target.value as Stato }))}
              >
                {STATI.map(st => <option key={st.id} value={st.id}>{st.label}</option>)}
              </RaSelect>
            </RaField>
          </div>

          <div className={styles.formRow}>
            <RaField label="Link Canva / materiale" htmlFor="canva_l" optional>
              <RaInput
                type="url" id="canva_l"
                placeholder="https://www.canva.com/…"
                value={formPost.canva_link || ''}
                onChange={(e) => setFormPost(prev => ({ ...prev, canva_link: e.target.value }))}
              />
            </RaField>

            <RaField label="Responsabile" htmlFor="resp" optional>
              <RaInput
                type="text" id="resp"
                placeholder="Chi se ne occupa"
                value={formPost.responsabile || ''}
                onChange={(e) => setFormPost(prev => ({ ...prev, responsabile: e.target.value }))}
              />
            </RaField>
          </div>

          <RaField label="Didascalia" htmlFor="cap">
            <RaTextarea
              id="cap"
              placeholder="Testo del post, call to action e hashtag…"
              value={formPost.didascalia || ''}
              onChange={(e) => setFormPost(prev => ({ ...prev, didascalia: e.target.value }))}
            />
            <div className={styles.charCounter}>
              <span className={captionLength > CAPTION_LIMIT ? styles.charCounterOver : ''}>
                {captionLength} / {CAPTION_LIMIT} caratteri
              </span>
              <span className={hashtagCount > HASHTAG_LIMIT ? styles.charCounterOver : ''}>
                {hashtagCount} / {HASHTAG_LIMIT} hashtag
              </span>
            </div>
          </RaField>

          <RaField label="Note interne" htmlFor="note" optional>
            <RaTextarea
              id="note"
              style={{ minHeight: '80px' }}
              placeholder="Riferimenti, musica del reel, chi gira le clip, cosa manca…"
              value={formPost.note || ''}
              onChange={(e) => setFormPost(prev => ({ ...prev, note: e.target.value }))}
            />
          </RaField>
        </form>
      </RaModal>

      {/* --- MODALE DETTAGLIO --- */}
      <RaModal
        open={isDetailModalOpen && selectedPost !== null}
        onClose={() => setIsDetailModalOpen(false)}
        title={selectedPost?.titolo ?? ''}
        description={selectedPost ? (
          <span className={styles.detailHead}>
            <span className={styles.tipoBadge}>{tipoLabel(tipoOf(selectedPost))}</span>
            <span className={styles.statusBadge}>{statoLabel(statoOf(selectedPost))}</span>
            <span className={styles.cardDate}>
              {new Date(selectedPost.data_pubblicazione).toLocaleString('it-IT', {
                weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
              })}
            </span>
          </span>
        ) : undefined}
        footer={selectedPost ? (
          <div className={styles.detailFooter}>
            <RaButton variant="danger" onClick={() => handleDeletePost(selectedPost.id)}>Elimina</RaButton>
            <div className={styles.detailFooterRight}>
              <RaButton variant="outline" onClick={() => handleDuplicate(selectedPost)}>Duplica</RaButton>
              <RaButton variant="outline" onClick={() => openEdit(selectedPost)}>Modifica</RaButton>
              <RaButton variant="accent" onClick={() => setIsDetailModalOpen(false)}>Chiudi</RaButton>
            </div>
          </div>
        ) : undefined}
      >
        {selectedPost && (
          <div style={accentVars(selectedPost)}>
            <div className={styles.detailMetaGrid}>
              <RaField label="Stato" htmlFor="detail_stato">
                <RaSelect
                  id="detail_stato"
                  value={statoOf(selectedPost)}
                  onChange={(e) => patchPost(selectedPost.id, { stato_grafica: e.target.value as Stato })}
                >
                  {STATI.map(st => <option key={st.id} value={st.id}>{st.label}</option>)}
                </RaSelect>
              </RaField>

              <RaField label="Responsabile">
                <span className={styles.detailMetaValue}>{selectedPost.responsabile || '—'}</span>
              </RaField>

              <RaField label="Materiale">
                {selectedPost.canva_link ? (
                  <RaButton variant="outline" size="sm" href={selectedPost.canva_link} target="_blank" rel="noopener noreferrer">
                    Apri Canva
                  </RaButton>
                ) : (
                  <span className={styles.noLinkHint}>Nessun link allegato</span>
                )}
              </RaField>
            </div>

            {selectedPost.didascalia && (
              <RaField
                label="Didascalia"
                hint={`${selectedPost.didascalia.length} caratteri · ${countHashtags(selectedPost.didascalia)} hashtag`}
              >
                <div className={styles.captionBox}>
                  <p className={styles.captionText}>{selectedPost.didascalia}</p>
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCopyCaption(selectedPost.didascalia)}
                    title="Copia didascalia"
                    type="button"
                  >
                    📋
                  </button>
                </div>
              </RaField>
            )}

            {selectedPost.note && (
              <RaField label="Note interne">
                <div className={styles.captionBox}>
                  <p className={styles.captionText} style={{ marginRight: 0 }}>{selectedPost.note}</p>
                </div>
              </RaField>
            )}
          </div>
        )}
      </RaModal>

      {/* --- MODALE GIORNO (elenco completo) --- */}
      <RaModal
        open={dayModal !== null}
        onClose={() => setDayModal(null)}
        title={dayModal ? new Date(dayModal.y, dayModal.m, dayModal.d).toLocaleDateString('it-IT', {
          weekday: 'long', day: 'numeric', month: 'long',
        }) : ''}
        footer={
          <RaButton
            variant="accent"
            onClick={() => {
              if (!dayModal) return;
              const { y, m, d } = dayModal;
              setDayModal(null);
              openNewPost(`${y}-${pad(m + 1)}-${pad(d)}T14:00`);
            }}
          >
            + Aggiungi contenuto
          </RaButton>
        }
      >
        <div className={styles.dayList}>
          {dayModal && (postsByDay[`${dayModal.y}-${dayModal.m}-${dayModal.d}`] || []).map(post => (
            <div
              key={post.id}
              className={styles.boardCard}
              style={accentVars(post)}
              onClick={() => { setSelectedPost(post); setDayModal(null); setIsDetailModalOpen(true); }}
            >
              <span className={styles.boardCardTitle}>{post.titolo}</span>
              <span className={styles.boardCardMeta}>
                <span className={styles.badgeTipo}>{tipoLabel(tipoOf(post))}</span>
                ·
                <span>{new Date(post.data_pubblicazione).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>
                · <span>{statoLabel(statoOf(post))}</span>
              </span>
            </div>
          ))}
        </div>
      </RaModal>
    </RaPage>
  );
}
