/**
 * Fonte di verita' unica per identita' e colore delle aree riservate.
 *
 * Il colore NON vive piu' nel CSS: RaPage lo scrive inline come
 * `--ra-accent` sullo scope, e il foglio di stile lo consuma soltanto.
 * Cosi' le sei aree stanno in un solo blocco di regole.
 */

/** Sottodomini dell'area riservata (la mappa e' in src/proxy.ts). */
export type AreaId =
  | 'tesserati'
  | 'admin'
  | 'appunti'
  | 'popup'
  | 'forms'
  | 'comunicazione'
  | 'direttivo';

/** I ruoli RBAC coincidono con le aree, tranne `tesserato` (accesso base). */
export type RoleId = Exclude<AreaId, 'tesserati'> | 'tesserato';

/** Colore identitario di ogni ruolo. Le aree lo ereditano da qui. */
export const ROLE_ACCENT: Record<RoleId, string> = {
  admin: '#e40329',
  tesserato: '#6b7280',
  appunti: '#3b82f6',
  popup: '#f59e0b',
  forms: '#10b981',
  comunicazione: '#8b5cf6',
  direttivo: '#ec4899',
};

/**
 * Colore di ogni area. `tesserati` e' l'hub comune, quindi porta il rosso
 * Gulliver e non il grigio del ruolo `tesserato`.
 */
export const AREA_ACCENT: Record<AreaId, string> = {
  tesserati: '#e40329',
  admin: ROLE_ACCENT.admin,
  appunti: ROLE_ACCENT.appunti,
  popup: ROLE_ACCENT.popup,
  forms: ROLE_ACCENT.forms,
  comunicazione: ROLE_ACCENT.comunicazione,
  direttivo: ROLE_ACCENT.direttivo,
};

/** Etichetta breve mostrata accanto al logo nell'header. */
export const AREA_LABEL: Record<AreaId, string> = {
  tesserati: 'Tesserati',
  admin: 'Amministrazione',
  appunti: 'Appunti',
  popup: 'Pop-up',
  forms: 'Moduli',
  comunicazione: 'Comunicazione',
  direttivo: 'Direttivo',
};

/** Titolo della scheda del browser. */
export const AREA_TITLE: Record<AreaId, string> = {
  tesserati: 'Area Tesserati',
  admin: 'Gestione utenti e ruoli',
  appunti: 'Archivio appunti',
  popup: 'Gestione pop-up',
  forms: 'Moduli e form',
  comunicazione: 'Calendario editoriale',
  direttivo: 'Portale direttivo',
};

/** Host pubblico, mostrato nel badge dell'header. */
export const AREA_HOST: Record<AreaId, string> = {
  tesserati: 'tesserati.gulliverancona.it',
  admin: 'admin.gulliverancona.it',
  appunti: 'appunti.gulliverancona.it',
  popup: 'popup.gulliverancona.it',
  forms: 'forms.gulliverancona.it',
  comunicazione: 'comunicazione.gulliverancona.it',
  direttivo: 'direttivo.gulliverancona.it',
};

/** Ruoli assegnabili dal pannello admin, con etichetta e descrizione. */
export const AVAILABLE_ROLES: { id: RoleId; label: string; desc: string }[] = [
  { id: 'admin', label: 'Admin', desc: 'Accesso completo e gestione utenti' },
  { id: 'tesserato', label: 'Tesserato', desc: 'Accesso base alla dashboard Cockpit' },
  { id: 'appunti', label: 'Appunti', desc: 'Consultazione e download del database appunti' },
  { id: 'popup', label: 'Popup', desc: 'Gestione e attivazione del pop-up avvisi sul sito' },
  { id: 'forms', label: 'Forms', desc: "Creazione e gestione moduli d'iscrizione tally" },
  { id: 'comunicazione', label: 'Comunicazione', desc: 'Programmazione del calendario post social' },
  { id: 'direttivo', label: 'Direttivo', desc: 'Accesso ai documenti del portale Direttivo' },
];

/**
 * Colore di un ruolo, con fallback bianco per ruoli legacy eventualmente
 * ancora presenti in Redis ma non piu' in AVAILABLE_ROLES: senza questo,
 * un ruolo sconosciuto produrrebbe un badge non stilato.
 */
export function roleAccent(role: string): string {
  return ROLE_ACCENT[role as RoleId] ?? '#ffffff';
}

/** Etichetta di un ruolo, con fallback allo stesso identificativo. */
export function roleLabel(role: string): string {
  return AVAILABLE_ROLES.find((r) => r.id === role)?.label ?? role;
}
