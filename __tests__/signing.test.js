const { generateKeyPair, sign, verify } = require('../signing');

describe('signing', () => {
  test('sign + verify', () => {
    const { privateKey, publicKey } = generateKeyPair();
    const data = 'important';
    const sig = sign(privateKey, data);
    expect(verify(publicKey, data, sig)).toBe(true);
    expect(verify(publicKey, data + 'x', sig)).toBe(false);
  });
});
