import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Intercetta tutte le rotte tranne:
     * - api (chiamate al backend)
     * - _next/static (file statici generati da Next)
     * - _next/image (immagini ottimizzate)
     * - favicon.ico, sitemap.xml, robots.txt (file root)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  
  // Otteniamo l'host reale (es. admin.gulliverancona.it)
  const hostname = req.headers.get('host') || '';

  // 1. Gestione Pannello Admin
  if (hostname.includes('admin.gulliverancona.it') || hostname.includes('admin.localhost')) {
    // Se l'utente visita admin.gulliverancona.it/ (pathname = '/')
    // Riscriviamo internamente per puntare alla cartella /admin di Next.js
    if (!url.pathname.startsWith('/admin')) {
      url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // 2. Gestione Redirect Form (Tally)
  if (hostname.includes('forms.gulliverancona.it') || hostname.includes('forms.localhost')) {
    // Se l'utente visita forms.gulliverancona.it/volontari (pathname = '/volontari')
    // Riscriviamo internamente per puntare alla cartella /f/[slug]
    if (!url.pathname.startsWith('/f')) {
      url.pathname = `/f${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
