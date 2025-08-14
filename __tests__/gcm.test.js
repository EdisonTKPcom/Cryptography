const { gcmKey, gcmEncrypt, gcmDecrypt } = require('../symmetric_gcm');

describe('aes-256-gcm', () => {
  test('round trip', () => {
    const key = gcmKey();
    const enc = gcmEncrypt(key, 'hello', undefined, 'aad');
    const dec = gcmDecrypt(key, enc);
    expect(dec).toBe('hello');
  });
});
