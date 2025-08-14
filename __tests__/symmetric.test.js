const { generateKey, generateIv, encrypt, decrypt } = require('../symmetric');

describe('symmetric', () => {
  test('encrypt/decrypt round trip', () => {
    const key = generateKey();
    const iv = generateIv();
    const msg = 'hello world';
    const c = encrypt(msg, key, iv);
    const p = decrypt(c, key, iv);
    expect(p).toBe(msg);
  });
});
