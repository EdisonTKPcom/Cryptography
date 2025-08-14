// Browser/WebCrypto helper wrappers (best-effort). In Node 20+ globalThis.crypto.subtle exists.
function subtle() {
  if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.subtle) return globalThis.crypto.subtle;
  throw new Error('WebCrypto subtle API not available in this environment');
}

async function importAesGcmKey(raw) {
  const keyData = raw instanceof Uint8Array ? raw : new Uint8Array(raw);
  return subtle().importKey('raw', keyData, { name: 'AES-GCM' }, false, ['encrypt','decrypt']);
}

async function aesGcmEncrypt(key, plaintext, iv, aad) {
  iv = iv || crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  const data = enc.encode(plaintext);
  const params = { name: 'AES-GCM', iv };
  if (aad) params.additionalData = aad instanceof Uint8Array ? aad : new TextEncoder().encode(aad);
  const result = await subtle().encrypt(params, key, data);
  const buf = new Uint8Array(result);
  // Split ciphertext & tag (last 16 bytes) for parity with Node example
  const authTag = buf.slice(buf.length - 16);
  const ciphertext = buf.slice(0, buf.length - 16);
  return { ciphertext, iv, authTag };
}

async function aesGcmDecrypt(key, { ciphertext, iv, authTag, aad }) {
  const params = { name: 'AES-GCM', iv };
  if (aad) params.additionalData = aad instanceof Uint8Array ? aad : new TextEncoder().encode(aad);
  const combined = new Uint8Array(ciphertext.length + authTag.length);
  combined.set(ciphertext); combined.set(authTag, ciphertext.length);
  const plainBuf = await subtle().decrypt(params, key, combined);
  return new TextDecoder().decode(plainBuf);
}

module.exports = { webcryptoHelpers: { importAesGcmKey, aesGcmEncrypt, aesGcmDecrypt } };
