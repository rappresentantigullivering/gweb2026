import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { cookies } from 'next/headers';
import { verifyAndDecodeSession, hashPassword } from '@/lib/auth';

const redis = Redis.fromEnv();
const USERS_KEY = 'gulliver:users';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gulliver2026';

// Helper to check if the current user is an admin
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

// Ensure the database has seeded admin users if empty
async function ensureSeeded(usersMap: Record<string, any> | null) {
  if (usersMap && Object.keys(usersMap).length > 0) {
    return usersMap;
  }

  // Seed default admin accounts
  const defaultPasswordHash = await hashPassword('linganguli');
  const seededUsers = {
    lorenzo: {
      username: 'lorenzo',
      passwordHash: defaultPasswordHash,
      roles: ['admin', 'tesserato', 'appunti', 'popup', 'forms', 'comunicazione', 'direttivo'],
    },
    presidente: {
      username: 'presidente',
      passwordHash: defaultPasswordHash,
      roles: ['admin', 'tesserato', 'appunti', 'popup', 'forms', 'comunicazione', 'direttivo'],
    },
  };

  await redis.set(USERS_KEY, seededUsers);
  return seededUsers;
}

export async function GET() {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    let usersMap = (await redis.get<Record<string, any>>(USERS_KEY)) || null;
    usersMap = await ensureSeeded(usersMap);

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

    let usersMap = (await redis.get<Record<string, any>>(USERS_KEY)) || null;
    usersMap = await ensureSeeded(usersMap);

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
