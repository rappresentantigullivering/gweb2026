'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface Edition {
  year: string;
  artists: string;
}

export default function PastEditions({ editions }: { editions: Edition[] }) {
  const [selectedDecade, setSelectedDecade] = useState('all');

  const filteredEditions = editions.filter((edition) => {
    // Decade filter
    if (selectedDecade === 'all') return true;
    
    const yearNum = parseInt(edition.year);
    if (isNaN(yearNum)) {
      // "Prime edizioni" goes to 90s
      return selectedDecade === '1990s';
    }

    if (selectedDecade === '2020s') return yearNum >= 2020 && yearNum <= 2029;
    if (selectedDecade === '2010s') return yearNum >= 2010 && yearNum <= 2019;
    if (selectedDecade === '2000s') return yearNum >= 2000 && yearNum <= 2009;
    if (selectedDecade === '1990s') return yearNum >= 1990 && yearNum <= 1999;

    return true;
  });

  return (
    <div className={styles.archiveContainer}>
      {/* FILTERS */}
      <div className={styles.archiveControls}>
        <div className={styles.filterTabs}>
          {([
            { id: 'all', label: 'Tutte' },
            { id: '2020s', label: 'Anni 2020' },
            { id: '2010s', label: 'Anni 2010' },
            { id: '2000s', label: 'Anni 2000' },
            { id: '1990s', label: "Anni '90" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedDecade(tab.id)}
              className={`${styles.tabBtn} ${selectedDecade === tab.id ? styles.tabBtnActive : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS GRID / TABLE */}
      {filteredEditions.length > 0 ? (
        <div className={styles.editionsTable}>
          {filteredEditions.slice().reverse().map((edition, i) => (
            <div key={i} className={styles.editionRow}>
              <div className={styles.editionYearBadge}>
                <span className={styles.editionYearLabel}>{edition.year}</span>
              </div>
              <div className={styles.editionArtists}>
                {edition.artists.split(', ').map((artist, idx) => (
                  <span key={idx} className={styles.artistName}>
                    {artist}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Nessun risultato trovato.</p>
        </div>
      )}
    </div>
  );
}
