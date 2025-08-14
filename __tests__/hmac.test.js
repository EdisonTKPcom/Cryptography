const { sign, verify } = require('../hmac');

describe('hmac', () => {
  test('sign + verify works', () => {
    const secret = 'sup3r';
    const msg = 'message';
    const mac = sign(msg, secret);
    expect(verify(msg, secret, mac)).toBe(true);
    expect(verify('different', secret, mac)).toBe(false);
  });
});
