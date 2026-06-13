'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface Post {
  id: string;
  titolo: string;
  data_pubblicazione: string; // ISO string or YYYY-MM-DDTHH:mm
  canva_link: string;
  didascalia: string;
  stato_grafica: 'todo' | 'in_progress' | 'done';
  reminders_sent?: string[];
}

export default function ComunicazionePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // App state
  const [posts, setPosts] = useState<Record<string, Post>>({});
  const [activeTab, setActiveTab] = useState<'calendar' | 'list'>('calendar');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [formPost, setFormPost] = useState<Partial<Post>>({
    id: '',
    titolo: '',
    data_pubblicazione: '',
    canva_link: '',
    didascalia: '',
    stato_grafica: 'todo',
  });

  // Verify auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/check');
        const data = await res.json();
        setIsAuthenticated(data.authenticated === true);
      } catch (err) {
        console.error('Auth check error:', err);
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  // Fetch posts if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  async function fetchPosts() {
    try {
      const res = await fetch('/api/comunicazione');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        const data = await res.json();
        setLoginError(data.error || 'Password incorretta');
      }
    } catch (err) {
      setLoginError('Impossibile connettersi al server');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setPosts({});
    } catch (err) {
      console.error('Logout error:', err);
    }
  }

  async function handleSavePost(e: React.FormEvent) {
    e.preventDefault();
    if (!formPost.titolo || !formPost.data_pubblicazione || !formPost.canva_link) {
      alert('Tutti i campi obbligatori devono essere compilati.');
      return;
    }

    const isEdit = !!formPost.id;
    const postData = {
      ...formPost,
      id: isEdit ? formPost.id : 'post_' + Date.now(),
    };

    try {
      const res = await fetch('/api/comunicazione', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isEdit ? 'update' : 'create',
          post: postData,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setPosts(prev => ({
          ...prev,
          [postData.id!]: result.post || postData as Post,
        }));
        setIsFormModalOpen(false);
        setFormPost({
          id: '',
          titolo: '',
          data_pubblicazione: '',
          canva_link: '',
          didascalia: '',
          stato_grafica: 'todo',
        });
      } else {
        alert('Errore nel salvataggio del post.');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Errore di connessione.');
    }
  }

  async function handleDeletePost(id: string) {
    if (!confirm('Sei sicuro di voler eliminare questo post?')) return;
    try {
      const res = await fetch('/api/comunicazione', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          post: { id },
        }),
      });

      if (res.ok) {
        setPosts(prev => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        setIsDetailModalOpen(false);
        setSelectedPost(null);
      } else {
        alert('Errore nell\'eliminazione.');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  }

  async function handleUpdateStatus(id: string, status: 'todo' | 'in_progress' | 'done') {
    const post = posts[id];
    if (!post) return;

    const updated = { ...post, stato_grafica: status };
    try {
      const res = await fetch('/api/comunicazione', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          post: updated,
        }),
      });

      if (res.ok) {
        setPosts(prev => ({
          ...prev,
          [id]: updated,
        }));
        if (selectedPost && selectedPost.id === id) {
          setSelectedPost(updated);
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  }

  // Helper date calculations
  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = new Date(year, month, 1).getDay(); // Sun = 0, Mon = 1...
  // Convert Sunday=0 to Sunday=6 and Monday=1 to Monday=0
  const adjustedStartOffset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Copy text helper
  const handleCopyCaption = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Didascalia copiata negli appunti! 📋');
  };

  // Filter & Search logic
  const postsList = Object.values(posts);
  const filteredPosts = postsList.filter(post => {
    const matchesSearch =
      post.titolo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.didascalia.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || post.stato_grafica === statusFilter;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(a.data_pubblicazione).getTime() - new Date(b.data_pubblicazione).getTime());

  // Group posts by publication day for the calendar
  const getPostsForDay = (day: number) => {
    return postsList.filter(post => {
      const d = new Date(post.data_pubblicazione);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
    }).sort((a, b) => new Date(a.data_pubblicazione).getTime() - new Date(b.data_pubblicazione).getTime());
  };

  if (isAuthenticated === null) {
    return (
      <div className={styles.pageWrapper}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)' }}>Caricamento...</div>
        </div>
      </div>
    );
  }

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loginContainer}>
          <div className={styles.loginCard}>
            <div className={styles.loginIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h1 className={styles.loginTitle}>Area Comunicazione</h1>
            <p className={styles.loginDesc}>Inserisci la password di amministrazione per accedere al calendario editoriale.</p>
            
            <form onSubmit={handleLogin}>
              <div className={styles.formGroup} style={{ textAlign: 'left' }}>
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  id="pass"
                  className={styles.input}
                  placeholder="Password di sistema"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {loginError && <p style={{ color: 'var(--red-light)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{loginError}</p>}
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', border: 'none', background: 'var(--red-primary)' }} disabled={loading}>
                {loading ? 'Verifica...' : 'Accedi'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD ---
  return (
    <div className={styles.pageWrapper}>
      {/* NAVBAR */}
      <header className={styles.navHeader}>
        <div className={styles.navInner}>
          <div className={styles.logoArea}>
            <span className={styles.logoTitle}>GULLIVER</span>
            <div className={styles.logoDot} />
            <span className={styles.logoSub}>Comunicazione</span>
          </div>

          <div className={styles.navControls}>
            <div className={styles.tabGroup}>
              <button
                className={`${styles.tabButton} ${activeTab === 'calendar' ? styles.tabButtonActive : ''}`}
                onClick={() => setActiveTab('calendar')}
              >
                Calendario
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === 'list' ? styles.tabButtonActive : ''}`}
                onClick={() => setActiveTab('list')}
              >
                Lista Post
              </button>
            </div>

            <button
              className="btn btn-primary"
              style={{ background: 'var(--red-primary)', border: 'none', padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
              onClick={() => {
                setFormPost({
                  id: '',
                  titolo: '',
                  data_pubblicazione: '',
                  canva_link: '',
                  didascalia: '',
                  stato_grafica: 'todo',
                });
                setIsFormModalOpen(true);
              }}
            >
              + Nuovo Post
            </button>

            <button className={styles.logoutBtn} onClick={handleLogout} title="Disconnetti">
              Esci
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className={styles.contentArea}>
        {activeTab === 'calendar' ? (
          // --- CALENDAR TAB ---
          <div>
            <div className={styles.monthControls}>
              <button className={styles.monthNavBtn} onClick={prevMonth}>&larr;</button>
              <h2 className={styles.monthTitle}>{monthNames[month]} {year}</h2>
              <button className={styles.monthNavBtn} onClick={nextMonth}>&rarr;</button>
            </div>

            <div className={styles.calendarGrid}>
              {/* Day headers */}
              {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(d => (
                <div key={d} className={styles.calendarHeaderDay}>{d}</div>
              ))}

              {/* Offset days */}
              {Array.from({ length: adjustedStartOffset }).map((_, i) => (
                <div key={'empty-' + i} className={`${styles.calendarCell} ${styles.calendarCellEmpty}`} />
              ))}

              {/* Real days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday =
                  new Date().getDate() === day &&
                  new Date().getMonth() === month &&
                  new Date().getFullYear() === year;

                const dayPosts = getPostsForDay(day);

                return (
                  <div
                    key={'day-' + day}
                    className={`${styles.calendarCell} ${isToday ? styles.calendarCellToday : ''}`}
                    onClick={() => {
                      // Imposta la data nel form
                      const pad = (n: number) => String(n).padStart(2, '0');
                      const defaultDateTime = `${year}-${pad(month + 1)}-${pad(day)}T14:00`;
                      setFormPost({
                        id: '',
                        titolo: '',
                        data_pubblicazione: defaultDateTime,
                        canva_link: '',
                        didascalia: '',
                        stato_grafica: 'todo',
                      });
                      setIsFormModalOpen(true);
                    }}
                  >
                    <span className={styles.dayNumber}>{day}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', width: '100%', flex: 1 }}>
                      {dayPosts.map(post => {
                        const dateObj = new Date(post.data_pubblicazione);
                        const hhmm = dateObj.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

                        return (
                          <div
                            key={post.id}
                            className={styles.cellPostBadge}
                            onClick={(e) => {
                              e.stopPropagation(); // Previeni apertura form inserimento
                              setSelectedPost(post);
                              setIsDetailModalOpen(true);
                            }}
                          >
                            <span className={`${styles.statusDot} ${styles['statusDot_' + post.stato_grafica]}`} />
                            <span className={styles.badgeTime}>{hhmm}</span>
                            <span className={styles.badgeTitle}>{post.titolo}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // --- LIST TAB ---
          <div>
            <div className={styles.filterBar}>
              <input
                type="text"
                className={styles.input}
                style={{ flex: 1 }}
                placeholder="Cerca per titolo o descrizione..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className={styles.tabGroup}>
                {[
                  { id: 'all', label: 'Tutti' },
                  { id: 'todo', label: 'Da fare' },
                  { id: 'in_progress', label: 'In corso' },
                  { id: 'done', label: 'Pronti' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    className={`${styles.tabButton} ${statusFilter === opt.id ? styles.tabButtonActive : ''}`}
                    style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                    onClick={() => setStatusFilter(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className={styles.listContainer}>
                {filteredPosts.map(post => {
                  const dateObj = new Date(post.data_pubblicazione);
                  const formattedDate = dateObj.toLocaleString('it-IT', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div key={post.id} className={styles.postCard}>
                      <div className={styles.cardHeader}>
                        <div className={styles.cardTitleArea}>
                          <span className={styles.cardDate}>{formattedDate}</span>
                          <h3 className={styles.cardTitle}>{post.titolo}</h3>
                        </div>

                        <span className={`${styles.statusBadge} ${styles['statusBadge_' + post.stato_grafica]}`}>
                          {post.stato_grafica === 'todo' && '🔴 Da fare'}
                          {post.stato_grafica === 'in_progress' && '🟡 In corso'}
                          {post.stato_grafica === 'done' && '🟢 Pronto'}
                        </span>
                      </div>

                      {post.didascalia && (
                        <div className={styles.captionBox}>
                          <p className={styles.captionText}>{post.didascalia}</p>
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
                        <a href={post.canva_link} target="_blank" rel="noopener noreferrer" className={styles.canvaBtn}>
                          <span>Apri Canva</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </a>

                        <div className={styles.footerActions}>
                          <button
                            className={styles.editBtn}
                            onClick={() => {
                              setFormPost(post);
                              setIsFormModalOpen(true);
                            }}
                          >
                            Modifica
                          </button>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDeletePost(post.id)}
                          >
                            Elimina
                          </button>
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
                <p>Nessun post programmato corrisponde alla ricerca.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- FORM MODAL (ADD / EDIT) --- */}
      {isFormModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsFormModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{formPost.id ? 'Modifica Post' : 'Nuovo Post'}</h3>
              <button className={styles.closeBtn} onClick={() => setIsFormModalOpen(false)}>&times;</button>
            </div>
            
            <form onSubmit={handleSavePost}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label htmlFor="titolo">Titolo del Post *</label>
                  <input
                    type="text"
                    id="titolo"
                    className={styles.input}
                    required
                    value={formPost.titolo || ''}
                    onChange={(e) => setFormPost(prev => ({ ...prev, titolo: e.target.value }))}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className={styles.formGroup}>
                    <label htmlFor="data_pub">Data e Ora *</label>
                    <input
                      type="datetime-local"
                      id="data_pub"
                      className={styles.input}
                      required
                      value={formPost.data_pubblicazione || ''}
                      onChange={(e) => setFormPost(prev => ({ ...prev, data_pubblicazione: e.target.value }))}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="stato_g">Stato Grafica</label>
                    <select
                      id="stato_g"
                      className={styles.select}
                      value={formPost.stato_grafica || 'todo'}
                      onChange={(e) => setFormPost(prev => ({ ...prev, stato_grafica: e.target.value as any }))}
                    >
                      <option value="todo">🔴 Da fare</option>
                      <option value="in_progress">🟡 In corso</option>
                      <option value="done">🟢 Pronto</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="canva_l">Link Progetto Canva *</label>
                  <input
                    type="url"
                    id="canva_l"
                    className={styles.input}
                    required
                    placeholder="https://www.canva.com/..."
                    value={formPost.canva_link || ''}
                    onChange={(e) => setFormPost(prev => ({ ...prev, canva_link: e.target.value }))}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cap">Didascalia (Caption)</label>
                  <textarea
                    id="cap"
                    className={styles.textarea}
                    placeholder="Scrivi qui gli hashtag e il testo del post..."
                    value={formPost.didascalia || ''}
                    onChange={(e) => setFormPost(prev => ({ ...prev, didascalia: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className={styles.modalFooter}>
                <button type="button" className="btn btn-outline" style={{ color: 'var(--red-light)', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => setIsFormModalOpen(false)}>
                  Annulla
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: 'var(--red-primary)', border: 'none' }}>
                  Salva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DETAILED VIEW MODAL (FROM CALENDAR CLICK) --- */}
      {isDetailModalOpen && selectedPost && (
        <div className={styles.modalOverlay} onClick={() => setIsDetailModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className={styles.cardDate}>{new Date(selectedPost.data_pubblicazione).toLocaleString('it-IT')}</span>
                <h3 className={styles.modalTitle} style={{ marginTop: '0.25rem' }}>{selectedPost.titolo}</h3>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsDetailModalOpen(false)}>&times;</button>
            </div>

            <div className={styles.modalBody}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <div>
                  <span className={styles.artistRole} style={{ margin: 0, fontSize: '0.7rem' }}>Link Condiviso</span>
                  <div style={{ marginTop: '0.5rem' }}>
                    <a href={selectedPost.canva_link} target="_blank" rel="noopener noreferrer" className={styles.canvaBtn} style={{ width: '100%', justifyContent: 'center' }}>
                      🎨 Apri Canva Project
                    </a>
                  </div>
                </div>

                <div className={styles.formGroup} style={{ margin: 0 }}>
                  <label htmlFor="detail_status">Stato Grafica</label>
                  <select
                    id="detail_status"
                    className={styles.select}
                    value={selectedPost.stato_grafica}
                    onChange={(e) => handleUpdateStatus(selectedPost.id, e.target.value as any)}
                  >
                    <option value="todo">🔴 Da fare</option>
                    <option value="in_progress">🟡 In corso</option>
                    <option value="done">🟢 Pronto</option>
                  </select>
                </div>
              </div>

              {selectedPost.didascalia && (
                <div className={styles.formGroup}>
                  <label>Didascalia</label>
                  <div className={styles.captionBox}>
                    <p className={styles.captionText}>{selectedPost.didascalia}</p>
                    <button
                      className={styles.copyBtn}
                      onClick={() => handleCopyCaption(selectedPost.didascalia)}
                      title="Copia didascalia"
                    >
                      📋
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter} style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                className={styles.deleteBtn}
                style={{ padding: '0.5rem 0' }}
                onClick={() => handleDeletePost(selectedPost.id)}
              >
                Elimina
              </button>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)' }}
                  onClick={() => {
                    setFormPost(selectedPost);
                    setIsDetailModalOpen(false);
                    setIsFormModalOpen(true);
                  }}
                >
                  Modifica
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ background: 'var(--red-primary)', border: 'none' }}
                  onClick={() => setIsDetailModalOpen(false)}
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
