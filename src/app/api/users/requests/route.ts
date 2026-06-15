import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { cookies } from 'next/headers';
import { verifyAndDecodeSession, hashPassword } from '@/lib/auth';

const redis = Redis.fromEnv();
const USERS_KEY = 'gulliver:users';
const REQUESTS_KEY = 'gulliver:users:requests';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gulliver2026';

// Helper to check if current user is admin
async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('gulliver_session')?.value;
  if (!token) return null;

  const payload = await verifyAndDecodeSession(token, ADMIN_PASSWORD);
  if (!payload || !payload.roles.includes('admin')) {
    return null;
  }
  return payload;
}

// GET - List all pending requests (admin only, sanitizes password hashes)
export async function GET() {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const requestsMap = (await redis.get<Record<string, any>>(REQUESTS_KEY)) || {};
    
    // Sanitize and sort requests by requestedAt descending
    const sanitizedRequests = Object.values(requestsMap)
      .map(({ passwordHash, ...rest }) => rest)
      .sort((a, b) => b.requestedAt - a.requestedAt);

    return NextResponse.json({ requests: sanitizedRequests });
  } catch (error) {
    console.error('Error fetching registration requests:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

// POST - Handles both public self-registration requests AND admin moderation actions
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, username, password, roles } = body;

    // --- MODERATION ACTION (ADMIN ONLY) ---
    if (action === 'approve' || action === 'reject') {
      const admin = await getAdminUser();
      if (!admin) {
        return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
      }

      if (!username) {
        return NextResponse.json({ error: 'Username richiesto' }, { status: 400 });
      }

      const sanitizedUsername = username.trim().toLowerCase();
      const requestsMap = (await redis.get<Record<string, any>>(REQUESTS_KEY)) || {};
      const pendingUser = requestsMap[sanitizedUsername];

      if (!pendingUser) {
        return NextResponse.json({ error: 'Richiesta di registrazione non trovata' }, { status: 404 });
      }

      if (action === 'approve') {
        const usersMap = (await redis.get<Record<string, any>>(USERS_KEY)) || {};
        
        // Add to users map
        usersMap[sanitizedUsername] = {
          username: sanitizedUsername,
          passwordHash: pendingUser.passwordHash,
          roles: roles && roles.length > 0 ? roles : ['tesserato']
        };

        // Remove from requests map
        delete requestsMap[sanitizedUsername];

        await redis.set(USERS_KEY, usersMap);
        await redis.set(REQUESTS_KEY, requestsMap);

        return NextResponse.json({ success: true, message: 'Richiesta approvata con successo' });
      } else {
        // reject
        delete requestsMap[sanitizedUsername];
        await redis.set(REQUESTS_KEY, requestsMap);

        return NextResponse.json({ success: true, message: 'Richiesta rifiutata con successo' });
      }
    }

    // --- SELF REGISTRATION REQUEST (PUBLIC) ---
    if (!username || !password) {
      return NextResponse.json({ error: 'Username e password richiesti' }, { status: 400 });
    }

    const sanitizedUsername = username.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '');
    if (!sanitizedUsername || sanitizedUsername.length < 3) {
      return NextResponse.json({ error: 'Username non valido (minimo 3 caratteri alfanumerici, punti o trattini)' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'La password deve contenere almeno 6 caratteri' }, { status: 400 });
    }

    // Check if user already exists
    const usersMap = (await redis.get<Record<string, any>>(USERS_KEY)) || {};
    if (usersMap[sanitizedUsername]) {
      return NextResponse.json({ error: 'Questo username è già registrato' }, { status: 400 });
    }

    // Check if request is already pending
    const requestsMap = (await redis.get<Record<string, any>>(REQUESTS_KEY)) || {};
    if (requestsMap[sanitizedUsername]) {
      return NextResponse.json({ error: 'Una richiesta di registrazione per questo username è già in attesa di approvazione' }, { status: 400 });
    }

    // Hash password and store request
    const passwordHash = await hashPassword(password);
    requestsMap[sanitizedUsername] = {
      username: sanitizedUsername,
      passwordHash,
      requestedAt: Date.now()
    };

    await redis.set(REQUESTS_KEY, requestsMap);

    return NextResponse.json({ success: true, message: 'Richiesta inviata con successo. Attendi l\'approvazione di un amministratore.' });
  } catch (error) {
    console.error('Error handling user request POST:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
