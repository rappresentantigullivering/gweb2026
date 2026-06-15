import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAndDecodeSession } from './lib/auth';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gulliver2026';

export const config = {
  matcher: [
    /*
     * Intercetta tutte le rotte tranne:
     * - api (chiamate al backend)
     * - _next/static (file statici generati da Next)
     * - _next/image (immagini ottimizzate)
     * - file con estensioni tipiche da public/ come .png, .ico, .webmanifest
     */
    '/((?!api|_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest|json)).*)',
  ],
};

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  // Estrae il sottodominio reale o di sviluppo (localhost)
  let subdomain = '';
  if (hostname.includes('gulliverancona.it')) {
    const parts = hostname.split('.');
    if (parts.length > 2 && parts[0] !== 'www') {
      subdomain = parts[0];
    }
  } else if (hostname.includes('localhost')) {
    const parts = hostname.split('.');
    if (parts.length > 1) {
      subdomain = parts[0];
    }
  }

  // Se siamo sul dominio principale (es. www.gulliverancona.it o localhost senza sottodominio)
  if (!subdomain || subdomain === 'www') {
    return NextResponse.next();
  }

  // Mappatura dei sottodomini e dei ruoli richiesti
  const subdomainRoleMap: Record<string, string> = {
    admin: 'admin',
    tesserati: 'tesserato',
    appunti: 'appunti',
    popup: 'popup',
    forms: 'forms',
    comunicazione: 'comunicazione',
    direttivo: 'direttivo',
  };

  // Se il sottodominio non rientra nella nostra configurazione, procediamo normalmente
  if (!subdomainRoleMap[subdomain]) {
    return NextResponse.next();
  }

  // Percorsi pubblici del portale tesserati (es. login, register e unauthorized) non richiedono auth
  if (subdomain === 'tesserati' && (pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/unauthorized'))) {
    if (!pathname.startsWith('/tesserati')) {
      url.pathname = `/tesserati${pathname === '/' ? '' : pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Per forms.gulliverancona.it, le rotte forms.gulliverancona.it/[slug] sono form pubblici
  // e non richiedono autenticazione. La home "/" gestisce invece i form e richiede auth.
  const isPublicFormRoute = subdomain === 'forms' && pathname !== '/';
  if (isPublicFormRoute) {
    if (!pathname.startsWith('/f')) {
      url.pathname = `/f${pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // --- CONTROLLO ACCESSO (SSO / RBAC) ---
  const token = req.cookies.get('gulliver_session')?.value;
  let userPayload = null;

  if (token) {
    userPayload = await verifyAndDecodeSession(token, ADMIN_PASSWORD);
  }

  const devPort = hostname.split(':')[1] || '3000';
  const loginHost = hostname.includes('localhost')
    ? `tesserati.localhost:${devPort}`
    : 'tesserati.gulliverancona.it';

  // 1. Utente non loggato -> Redirezione al login di tesserati.gulliverancona.it
  if (!userPayload) {
    const fromUrl = encodeURIComponent(`https://${hostname}${pathname}`);
    const loginUrl = new URL(`https://${loginHost}/login?redirect=${fromUrl}`);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Utente loggato ma senza il ruolo idoneo per questo sottodominio
  const requiredRole = subdomainRoleMap[subdomain];
  const hasRole = userPayload.roles.includes(requiredRole) || userPayload.roles.includes('admin');

  if (!hasRole) {
    const unauthorizedUrl = new URL(`https://${loginHost}/unauthorized`);
    return NextResponse.redirect(unauthorizedUrl);
  }

  // 3. Utente loggato e autorizzato -> Riscriviamo il percorso interno verso la cartella corretta
  const internalPrefix = subdomain === 'forms' ? '/f' : `/${subdomain}`;
  if (!pathname.startsWith(internalPrefix)) {
    url.pathname = `${internalPrefix}${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
