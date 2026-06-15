import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { cookies } from 'next/headers';
import { verifyAndDecodeSession, hashPassword } from '@/lib/auth';

const redis = Redis.fromEnv();
const USERS_KEY = 'gulliver:users';
const SESSION_SECRET = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || 'gweb_sso_fallback_signing_secret_do_not_use_in_prod';

// Helper to check if the current user is an admin
async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('gulliver_session')?.value;
  if (!token) return null;

  const payload = await verifyAndDecodeSession(token, SESSION_SECRET);
  if (!payload || !payload.roles.includes('admin')) {
    return null;
  }

  if (payload.sessionId) {
    const isActive = await redis.exists(`gulliver:session:${payload.sessionId}`);
    if (!isActive) return null;
  }
  return payload;
}



export async function GET() {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const usersMap = (await redis.get<Record<string, any>>(USERS_KEY)) || {};

    // Remove password hashes before sending
    const sanitizedUsers = Object.values(usersMap).map((user) => {
      const { passwordHash, ...rest } = user;
      return rest;
    });

    return NextResponse.json({ users: sanitizedUsers });
  } catch (error) {
    console.error('Error listing users:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const { action, username, password, roles } = await req.json();

    if (!action || !username) {
      return NextResponse.json({ error: 'Parametri mancanti' }, { status: 400 });
    }

    const sanitizedUsername = username.trim().toLowerCase();
    if (!sanitizedUsername) {
      return NextResponse.json({ error: 'Username non valido' }, { status: 400 });
    }

    const usersMap = (await redis.get<Record<string, any>>(USERS_KEY)) || {};

    if (action === 'create') {
      if (usersMap[sanitizedUsername]) {
        return NextResponse.json({ error: 'Utente già esistente' }, { status: 400 });
      }
      if (!password) {
        return NextResponse.json({ error: 'Password richiesta per nuovi utenti' }, { status: 400 });
      }

      const passwordHash = await hashPassword(password);
      usersMap[sanitizedUsername] = {
        username: sanitizedUsername,
        passwordHash,
        roles: roles || ['tesserato'],
      };
    } else if (action === 'update') {
      if (!usersMap[sanitizedUsername]) {
        return NextResponse.json({ error: 'Utente non trovato' }, { status: 404 });
      }

      const updatedUser = { ...usersMap[sanitizedUsername] };

      if (roles) {
        // Prevent admins from removing their own admin role
        if (sanitizedUsername === admin.username && !roles.includes('admin')) {
          return NextResponse.json({ error: 'Non puoi revocare il tuo stesso ruolo di amministratore' }, { status: 400 });
        }
        updatedUser.roles = roles;
      }

      if (password) {
        updatedUser.passwordHash = await hashPassword(password);
      }

      usersMap[sanitizedUsername] = updatedUser;
    } else if (action === 'delete') {
      if (!usersMap[sanitizedUsername]) {
        return NextResponse.json({ error: 'Utente non trovato' }, { status: 404 });
      }
      // Prevent self-deletion
      if (sanitizedUsername === admin.username) {
        return NextResponse.json({ error: 'Non puoi eliminare il tuo account amministratore' }, { status: 400 });
      }

      delete usersMap[sanitizedUsername];
    } else {
      return NextResponse.json({ error: 'Azione non supportata' }, { status: 400 });
    }

    await redis.set(USERS_KEY, usersMap);

    // Return sanitized list
    const sanitizedUsers = Object.values(usersMap).map((user) => {
      const { passwordHash, ...rest } = user;
      return rest;
    });

    return NextResponse.json({ success: true, users: sanitizedUsers });
  } catch (error) {
    console.error('Error modifying users:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
