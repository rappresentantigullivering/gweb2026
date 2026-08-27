'use client';

import { useEffect, useSyncExternalStore } from 'react';
import s from './riservata.module.css';
import { cx } from './types';
import { RaButton } from './RaButton';
import { RaModal } from './RaModal';
import {
  subscribeFeedback,
  getToastSnapshot,
  getConfirmSnapshot,
  getServerSnapshot,
  registerFeedbackHost,
  settleConfirm,
  dismissToast,
} from './feedback';

/**
 * Host di notifiche e conferme, montato una volta sola da RaPage.
 * Finche' non e' montato, raConfirm ricade su window.confirm.
 */
export function RaFeedbackHost() {
  const toast = useSyncExternalStore(subscribeFeedback, getToastSnapshot, getServerSnapshot);
  const confirm = useSyncExternalStore(subscribeFeedback, getConfirmSnapshot, getServerSnapshot);

  useEffect(() => registerFeedbackHost(), []);

  return (
    <>
      {toast && (
        <div className={s.toastHost}>
          <div
            key={toast.id}
            className={cx(s.toast, s[`toast_${toast.tone}`])}
            role={toast.tone === 'error' ? 'alert' : 'status'}
            onClick={dismissToast}
          >
            {toast.message}
          </div>
        </div>
      )}

      <RaModal
        open={confirm !== null}
        onClose={() => settleConfirm(false)}
        title={confirm?.title ?? ''}
        description={confirm?.message}
        size="sm"
        footer={
          <>
            <RaButton variant="outline" onClick={() => settleConfirm(false)}>
              {confirm?.cancelLabel ?? 'Annulla'}
            </RaButton>
            <RaButton
              variant={confirm?.tone === 'danger' ? 'danger' : 'primary'}
              onClick={() => settleConfirm(true)}
            >
              {confirm?.confirmLabel ?? 'Conferma'}
            </RaButton>
          </>
        }
      />
    </>
  );
}
