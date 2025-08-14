const { hkdf, pbkdf2 } = require('../hkdf_pbkdf2');

describe('HKDF & PBKDF2', () => {
  test('hkdf length', () => {
    const okm = hkdf(Buffer.from('input'), Buffer.from('salt'), Buffer.from('info'), 42);
    expect(okm.length).toBe(42);
  });
  test('pbkdf2 deterministic', () => {
    const a = pbkdf2('pw', 'salt', 1000, 32).toString('hex');
    const b = pbkdf2('pw', 'salt', 1000, 32).toString('hex');
    expect(a).toBe(b);
  });
});
