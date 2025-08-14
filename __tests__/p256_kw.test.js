const { generateP256KeyPair, p256SharedSecret, aesKwWrap, aesKwUnwrap } = require('../ecdhe_p256_kw');
const { randomBytes } = require('crypto');

describe('P-256 ECDH + AES-KW', () => {
  test('shared secret & wrap/unwrap', () => {
    const a = generateP256KeyPair();
    const b = generateP256KeyPair();
    const sA = p256SharedSecret(a.privateKey, b.publicKey);
    const sB = p256SharedSecret(b.privateKey, a.publicKey);
    expect(sA.equals(sB)).toBe(true);
    const kek = sA.slice(0,32);
    const keyToWrap = randomBytes(32);
    const wrapped = aesKwWrap(kek, keyToWrap);
    const unwrapped = aesKwUnwrap(kek, wrapped);
    expect(keyToWrap.equals(unwrapped)).toBe(true);
  });
});
