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

/**
 * Signs a session with an expiration timestamp.
 * Returns `expiresTimestamp.signatureHex`
 */
export async function signSession(expires: number, secret: string): Promise<string> {
  const key = await getCryptoKey(secret);
  const data = encoder.encode(expires.toString());
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, data);
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `${expires}.${signatureHex}`;
}

/**
 * Verifies if a session token is valid and not expired.
 */
export async function verifySession(token: string, secret: string): Promise<boolean> {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [expiresStr, signatureHex] = parts;
    const expires = parseInt(expiresStr);
    if (isNaN(expires) || expires < Date.now()) return false;
    
    const key = await getCryptoKey(secret);
    const data = encoder.encode(expiresStr);
    
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, data);
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const expectedHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return expectedHex === signatureHex;
  } catch (e) {
    console.error('Session verify error:', e);
    return false;
  }
}
