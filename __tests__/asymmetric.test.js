const { generateKeyPair, encrypt, decrypt } = require('../asymmetric');

describe('asymmetric RSA', () => {
  test('encrypt -> decrypt', () => {
    const { publicKey, privateKey } = generateKeyPair();
    const msg = 'secret';
    const cipher = encrypt(publicKey, msg);
    const plain = decrypt(privateKey, cipher);
    expect(plain).toBe(msg);
  });
});
