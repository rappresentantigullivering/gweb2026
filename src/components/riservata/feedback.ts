/**
 * Notifiche e conferme dell'area riservata.
 *
 * L'API e' imperativa e appoggiata a uno store esterno, non a un Context:
 * il provider sarebbe montato da RaPage, che e' figlio del componente
 * pagina, quindi un `useToast()` chiamato dalla pagina non lo vedrebbe.
 * Cosi' invece la migrazione dalle vecchie `notify()` e dai
 * `window.confirm` resta una sostituzione riga per riga.
 */

export type RaToastTone = 'info' | 'success' | 'error';

export interface RaToast {
  id: number;
  message: string;
  tone: RaToastTone;
}

export interface RaConfirmOptions {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'danger' | 'default';
}

interface RaConfirmState extends RaConfirmOptions {
  resolve: (value: boolean) => void;
}

const listeners = new Set<() => void>();
let toast: RaToast | null = null;
let confirmState: RaConfirmState | null = null;
let hostCount = 0;
let nextId = 1;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeFeedback(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getToastSnapshot(): RaToast | null {
  return toast;
}

export function getConfirmSnapshot(): RaConfirmState | null {
  return confirmState;
}

/** Lo snapshot lato server e' sempre vuoto: niente disallineamenti di idratazione. */
export function getServerSnapshot(): null {
  return null;
}

export function registerFeedbackHost(): () => void {
  hostCount += 1;
  return () => {
    hostCount -= 1;
  };
}

/**
 * Mostra una notifica. Come nelle `notify()` originali c'e' un solo slot:
 * l'ultimo messaggio sostituisce il precedente.
 */
export function raToast(message: string, tone: RaToastTone = 'info', ms = 3500): void {
  if (hideTimer) clearTimeout(hideTimer);
  toast = { id: nextId++, message, tone };
  emit();
  hideTimer = setTimeout(() => {
    toast = null;
    hideTimer = null;
    emit();
  }, ms);
}

export function dismissToast(): void {
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = null;
  toast = null;
  emit();
}

/**
 * Chiede conferma. Se nessun host e' montato ricade su `window.confirm`,
 * cosi' una chiamata non perde mai la risposta.
 */
export function raConfirm(options: RaConfirmOptions): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);

  if (hostCount === 0) {
    return Promise.resolve(window.confirm(options.message ?? options.title));
  }

  // Una conferma gia' aperta viene annullata prima di aprirne un'altra.
  if (confirmState) confirmState.resolve(false);

  return new Promise<boolean>((resolve) => {
    confirmState = { ...options, resolve };
    emit();
  });
}

export function settleConfirm(value: boolean): void {
  const pending = confirmState;
  confirmState = null;
  emit();
  pending?.resolve(value);
}
