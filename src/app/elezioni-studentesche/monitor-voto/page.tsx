'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

const VOTING_DAYS = [
  { day: '12 MAGGIO', start: '2026-05-12T08:00:00', end: '2026-05-12T19:00:00', duration: '11:00:00' },
  { day: '13 MAGGIO', start: '2026-05-13T08:00:00', end: '2026-05-13T19:00:00', duration: '11:00:00' },
  { day: '14 MAGGIO', start: '2026-05-14T08:00:00', end: '2026-05-14T17:00:00', duration: '09:00:00' },
];

function CountdownCard({ day, start, end, duration }: { day: string, start: string, end: string, duration: string }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [status, setStatus] = useState<'pending' | 'active' | 'ended'>('pending');

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const startTime = new Date(start).getTime();
      const endTime = new Date(end).getTime();

      if (now < startTime) {
        setStatus('pending');
        setTimeLeft(duration);
      } else if (now > endTime) {
        setStatus('ended');
        setTimeLeft('00:00:00');
      } else {
        setStatus('active');
        const diff = endTime - now;
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      }
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [start, end, duration]);

  return (
    <div className={`${styles.card} ${status !== 'active' ? styles.flashing : ''} ${status === 'active' && timeLeft.startsWith('00:0') && parseInt(timeLeft.split(':')[1]) < 3 ? styles.critical : ''}`}>
      <div className={styles.dayLabel}>{day}</div>
      <div className={styles.timerContainer}>
        {status === 'ended' ? (
          <div className={styles.endedMessage}>GRAZIE.</div>
        ) : (
          <div className={styles.timer}>{timeLeft}</div>
        )}
      </div>
      <div className={styles.statusLabel}>
        {status === 'pending' ? 'PROGRAMMATO' : status === 'active' ? 'IN CORSO' : 'SESSIONE CONCLUSA'}
      </div>
    </div>
  );
}

export default function MonitorVotoPage() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {VOTING_DAYS.map(d => (
            <CountdownCard key={d.day} {...d} />
          ))}
        </div>
      </div>
    </div>
  );
}
