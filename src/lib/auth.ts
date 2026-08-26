const encoder = new TextEncoder();

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const keyData = encoder.encode(secret);
  return crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function bufToHex(buf: ArrayBuffer | Uint8Array): string {
  const arr = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return Array.from(arr)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBuf(hex: string): Uint8Array {
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return arr;
}

export interface SessionPayload {
  username: string;
  roles: string[];
  expires: number;
  sessionId?: string;
}

/**
 * Signs a session with a JSON payload containing user details and expiration.
 * Returns `base64Payload.signatureHex`
 */
export async function signSession(payload: SessionPayload, secret: string): Promise<string> {
  const key = await getCryptoKey(secret);
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = Buffer.from(payloadStr).toString('base64');
  const data = encoder.encode(payloadB64);
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, data);
  const signatureHex = bufToHex(signatureBuffer);
  return `${payloadB64}.${signatureHex}`;
}

/**
 * Verifies if a session token is valid, not expired, and returns the decoded payload.
 */
export async function verifyAndDecodeSession(token: string, secret: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payloadB64, signatureHex] = parts;

    const key = await getCryptoKey(secret);
    const data = encoder.encode(payloadB64);

    const signatureBuffer = await crypto.subtle.sign('HMAC', key, data);
    const expectedHex = bufToHex(signatureBuffer);

    if (expectedHex !== signatureHex) {
      return null;
    }

    const payloadStr = Buffer.from(payloadB64, 'base64').toString('utf-8');
    const payload = JSON.parse(payloadStr) as SessionPayload;

    if (payload.expires < Date.now()) {
      return null;
    }

    return payload;
  } catch (e) {
    console.error('Session verify error:', e);
    return null;
  }
}

/**
 * Securely hashes a password using PBKDF2 with a unique random salt.
 * Returns `saltHex:keyHex`
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const baseKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const derivedBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    baseKey,
    256 // 32 bytes
  );

  const saltHex = bufToHex(salt);
  const keyHex = bufToHex(derivedBuffer);
  return `${saltHex}:${keyHex}`;
}

/**
 * Verifies a password against its stored PBKDF2 hash.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const parts = storedHash.split(':');
    if (parts.length !== 2) return false;
    const [saltHex, keyHex] = parts;
    const salt = hexToBuf(saltHex);

    const baseKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    const derivedBuffer = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt as any,
        iterations: 100000,
        hash: 'SHA-256',
      },
      baseKey,
      256
    );

    const expectedHex = bufToHex(derivedBuffer);
    return expectedHex === keyHex;
  } catch (e) {
    console.error('Password verification failure:', e);
    return false;
  }
}

/**
 * Normalizza uno username nella forma con cui viene salvato su Redis.
 * Registrazione, creazione da pannello admin e login devono usare questa
 * stessa funzione: altrimenti un nome scritto con spazi o accenti viene
 * salvato ripulito ma cercato al login nella forma originale, e l'utente
 * riceve "Utente non registrato" pur essendo stato approvato.
 */
export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '');
}

/**
 * Cerca uno username in una mappa di utenti tollerando le differenze di
 * formattazione. Prova prima la corrispondenza esatta, cosi' le vecchie
 * chiavi non normalizzate continuano a funzionare, poi quella normalizzata.
 * Restituisce la chiave reale trovata, oppure null.
 */
export function resolveUsernameKey(
  username: string,
  map: Record<string, unknown>,
): string | null {
  const exact = username.trim().toLowerCase();
  if (Object.prototype.hasOwnProperty.call(map, exact)) return exact;

  const normalized = normalizeUsername(username);
  if (normalized && Object.prototype.hasOwnProperty.call(map, normalized)) return normalized;

  return null;
}
