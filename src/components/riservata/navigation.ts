'use client';

import { useEffect, useState } from 'react';
import type { AreaId } from './areas';

/**
 * Navigazione fra i sottodomini dell'area riservata.
 *
 * Sostituisce `handleGoHome` / `redirectToLogin` / `getSubdomainUrl`,
 * finora ricopiati in sette pagine.
 */

/** `localhost:3000` o `127.0.0.1:3000`, senza sottodominio davanti. */
function isBareLocalhost(host: string): boolean {
  return /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host);
}

function isLocal(host: string): boolean {
  return host.includes('localhost') || host.startsWith('127.0.0.1');
}

/**
 * URL di un'area.
 *
 * In produzione e sui sottodomini locali il comportamento e' quello di
 * sempre. Su `localhost` nudo si passa ai percorsi interni: il cookie di
 * sessione e' host-only fuori da gulliverancona.it (si veda il campo
 * `domain` in src/app/api/auth/login/route.ts), quindi saltare da
 * `localhost` a `tesserati.localhost` perderebbe la sessione e
 * rimanderebbe al login in circolo. Il proxy non intercetta `localhost`
 * nudo, per cui i percorsi interni rispondono direttamente.
 */
export function areaUrl(area: AreaId, path = ''): string {
  if (typeof window === 'undefined') return '#';
  const host = window.location.host;
  const suffix = path && path !== '/' ? path : '';

  if (isBareLocalhost(host)) {
    const base = area === 'forms' ? '/f' : `/${area}`;
    return `${base}${suffix}`;
  }

  if (isLocal(host)) {
    const port = host.split(':')[1] || '3000';
    return `http://${area}.localhost:${port}${suffix}`;
  }

  return `https://${area}.gulliverancona.it${suffix}`;
}

/** Hub dei tesserati: il "Torna alla Dashboard" di ogni pagina. */
export function dashboardUrl(): string {
  return areaUrl('tesserati');
}

/** Pagina di login, con eventuale ritorno all'indirizzo corrente. */
export function loginUrl(redirect?: string): string {
  const base = areaUrl('tesserati', '/login');
  if (!redirect) return base;
  return `${base}?redirect=${encodeURIComponent(redirect)}`;
}

/** Manda al login conservando la pagina di partenza. */
export function redirectToLogin(): void {
  if (typeof window === 'undefined') return;
  window.location.href = loginUrl(window.location.href);
}

/** Manda alla schermata "accesso negato". */
export function redirectToUnauthorized(): void {
  if (typeof window === 'undefined') return;
  window.location.href = areaUrl('tesserati', '/unauthorized');
}

/**
 * Verifica la sessione. Restituisce il profilo, oppure null dopo aver
 * avviato il rimando al login.
 */
export async function requireSession(): Promise<{ username: string; roles: string[] } | null> {
  try {
    const res = await fetch('/api/auth/check');
    if (!res.ok) {
      redirectToLogin();
      return null;
    }
    const data = await res.json();
    if (data.authenticated === false) {
      redirectToLogin();
      return null;
    }
    return { username: data.username, roles: data.roles ?? [] };
  } catch (err) {
    console.error('Auth check error:', err);
    redirectToLogin();
    return null;
  }
}

/** Chiude la sessione e torna al login. */
export async function logout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch (err) {
    console.error('Logout error:', err);
  } finally {
    window.location.href = loginUrl();
  }
}

/**
 * Versione a hook di `areaUrl`.
 *
 * L'URL dipende da `window.location.host`, che sul server non esiste:
 * calcolarlo durante il render darebbe valori diversi fra HTML servito e
 * primo render nel browser, cioe' un errore di idratazione. Qui il primo
 * render restituisce `undefined` su entrambi i lati e l'indirizzo compare
 * subito dopo il montaggio.
 */
export function useAreaUrl(area: AreaId, path = ''): string | undefined {
  const [url, setUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    setUrl(areaUrl(area, path));
  }, [area, path]);
  return url;
}

/** Come sopra, per l'hub dei tesserati. */
export function useDashboardUrl(): string | undefined {
  return useAreaUrl('tesserati');
}
