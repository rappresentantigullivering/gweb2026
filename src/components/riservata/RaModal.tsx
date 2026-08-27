'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import s from './riservata.module.css';
import { cx } from './types';

export interface RaModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeOnBackdrop?: boolean;
  children?: ReactNode;
}

/**
 * Modale su <dialog> nativo: porta con se' focus trap e chiusura con Esc,
 * che le modali precedenti non avevano. E' un'aggiunta, non una
 * sottrazione: il pulsante "Annulla" resta al suo posto.
 */
export function RaModal({
  open,
  onClose,
  title,
  description,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  children,
}: RaModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  // La callback in un ref: cosi' il listener nativo si aggancia una volta
  // sola e vede sempre l'ultima versione di onClose.
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  /**
   * Blocco dello scorrimento di fondo, legato al ciclo di vita e non al
   * nodo: quando `open` torna falso il <dialog> e' gia' uscito dal DOM,
   * quindi un ripristino appoggiato al ref non verrebbe mai eseguito e la
   * pagina resterebbe bloccata.
   */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /**
   * Chiusura con Esc. Va agganciata a mano: l'evento nativo `cancel` non
   * arriva a `onCancel` di React, quindi affidarsi a quello lascerebbe la
   * finestra aperta ignorando il tasto.
   */
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      closeRef.current();
    };
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={ref}
      className={cx(s.dialog, s[`dialog_${size}`])}
      aria-labelledby="ra-modal-title"
      onClick={(e) => {
        // Il click sul backdrop arriva al <dialog> stesso, non ai figli.
        if (closeOnBackdrop && e.target === ref.current) onClose();
      }}
    >
      <div className={s.dialogInner}>
        <div className={s.dialogHeader}>
          <div>
            <h2 className={s.dialogTitle} id="ra-modal-title">
              {title}
            </h2>
            {description && <p className={s.dialogDesc}>{description}</p>}
          </div>
          <button type="button" className={s.dialogClose} onClick={onClose} aria-label="Chiudi">
            &times;
          </button>
        </div>

        {children && <div className={s.dialogBody}>{children}</div>}
        {footer && <div className={s.dialogFooter}>{footer}</div>}
      </div>
    </dialog>
  );
}
