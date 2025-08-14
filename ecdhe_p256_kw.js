// ECDH P-256 + AES Key Wrap (RFC 3394) example.
// Node core does not expose AES Key Wrap directly; implement minimal RFC3394 for 128/256-bit keys.
const { createECDH, randomBytes, createCipheriv, createDecipheriv } = require('crypto');

function generateP256KeyPair() {
  const ecdh = createECDH('prime256v1');
  ecdh.generateKeys();
  return { privateKey: ecdh, publicKey: ecdh.getPublicKey() };
}

function p256SharedSecret(aPriv, bPub) {
  // aPriv is an ECDH object returned in privateKey field.
  return aPriv.computeSecret(bPub);
}

// Minimal AES Key Wrap (RFC 3394) using Node AES-256-ECB primitive for educational purposes.
// For production, use a vetted implementation.
function aesKwWrap(kek, keyToWrap) {
  if (![16,24,32].includes(kek.length)) throw new Error('KEK must be 128/192/256 bits');
  if (keyToWrap.length % 8 !== 0) throw new Error('Key to wrap must be multiple of 64 bits');
  const n = keyToWrap.length / 8;
  const R = [];
  for (let i=0;i<n;i++) R[i+1] = keyToWrap.slice(8*i, 8*(i+1));
  let A = Buffer.from('A6A6A6A6A6A6A6A6', 'hex');
  const cipher = (b) => {
    const c = createCipheriv('aes-256-ecb', kek, null);
    c.setAutoPadding(false);
    return Buffer.concat([c.update(b), c.final()]);
  };
  for (let j=0;j<6;j++) {
    for (let i=1;i<=n;i++) {
      const B = cipher(Buffer.concat([A, R[i]]));
      const t = Buffer.alloc(8);
      const val = n*j + i; t.writeUIntBE(val, 8-6, 6); // write in last 6 bytes
      A = Buffer.from(B.slice(0,8).map((v,k)=> v ^ t[k]));
      R[i] = B.slice(8);
    }
  }
  return Buffer.concat([A, ...R.slice(1)]);
}

function aesKwUnwrap(kek, wrapped) {
  if (![16,24,32].includes(kek.length)) throw new Error('KEK must be 128/192/256 bits');
  if (wrapped.length < 24 || wrapped.length % 8 !== 0) throw new Error('Invalid wrapped length');
  const n = (wrapped.length / 8) - 1;
  let A = wrapped.slice(0,8);
  const R = [];
  for (let i=1;i<=n;i++) R[i] = wrapped.slice(8*i, 8*(i+1));
  const decipherBlock = (b) => {
    const d = createDecipheriv('aes-256-ecb', kek, null);
    d.setAutoPadding(false);
    return Buffer.concat([d.update(b), d.final()]);
  };
  for (let j=5;j>=0;j--) {
    for (let i=n;i>=1;i--) {
      const t = Buffer.alloc(8); const val = n*j + i; t.writeUIntBE(val, 8-6, 6);
      const A_xor_t = Buffer.from(A.map((v,k)=> v ^ t[k]));
      const B = decipherBlock(Buffer.concat([A_xor_t, R[i]]));
      A = B.slice(0,8);
      R[i] = B.slice(8);
    }
  }
  if (A.toString('hex').toUpperCase() !== 'A6A6A6A6A6A6A6A6') throw new Error('Integrity check failed');
  return Buffer.concat(R.slice(1));
}

module.exports = { generateP256KeyPair, p256SharedSecret, aesKwWrap, aesKwUnwrap };

if (require.main === module) {
  const a = generateP256KeyPair();
  const b = generateP256KeyPair();
  const secretA = p256SharedSecret(a.privateKey, b.publicKey);
  const secretB = p256SharedSecret(b.privateKey, a.publicKey);
  console.log('secrets match?', secretA.equals(secretB));
  const kek = secretA.slice(0,32); // derive simple KEK (not KDF), educational only
  const keyToWrap = randomBytes(32);
  const wrapped = aesKwWrap(kek, keyToWrap);
  const unwrapped = aesKwUnwrap(kek, wrapped);
  console.log('unwrap ok?', keyToWrap.equals(unwrapped));
}
