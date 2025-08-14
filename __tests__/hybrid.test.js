const { generateKeyPair } = require('../asymmetric');
const { hybridEncrypt, hybridDecrypt } = require('../hybrid');

describe('hybrid encryption', () => {
  test('encrypt/decrypt', () => {
    const { publicKey, privateKey } = generateKeyPair();
    const payload = hybridEncrypt(publicKey, 'secret', 'aad');
    const plain = hybridDecrypt(privateKey, payload);
    expect(plain).toBe('secret');
  });
});
