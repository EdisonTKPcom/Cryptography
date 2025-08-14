const { generateEd25519KeyPair, ed25519Sign, ed25519Verify, generateX25519KeyPair, x25519SharedSecret } = require('../ed25519_x25519');

describe('Ed25519 & X25519', () => {
  test('sign/verify', () => {
    const { privateKey, publicKey } = generateEd25519KeyPair();
    const sig = ed25519Sign(privateKey, 'hello');
    expect(ed25519Verify(publicKey, 'hello', sig)).toBe(true);
    expect(ed25519Verify(publicKey, 'hello!', sig)).toBe(false);
  });
  test('shared secret equality', () => {
    const a = generateX25519KeyPair();
    const b = generateX25519KeyPair();
    const s1 = x25519SharedSecret(a.privateKey, b.publicKey);
    const s2 = x25519SharedSecret(b.privateKey, a.publicKey);
    expect(s1).toBe(s2);
  });
});
