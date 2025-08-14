const { argon2Hash, argon2Verify } = require('../argon2pw');

describe('argon2 password hashing', () => {
  test('hash & verify', async () => {
    const h = await argon2Hash('pw');
    expect(await argon2Verify(h, 'pw')).toBe(true);
    expect(await argon2Verify(h, 'no')).toBe(false);
  });
});
