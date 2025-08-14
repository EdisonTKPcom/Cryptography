const { hash, hashesEqual } = require('../hash');

describe('hash', () => {
  test('deterministic', () => {
    const a = hash('test');
    const b = hash('test');
    expect(a).toBe(b);
  });
  test('hashesEqual constant time helper', () => {
    const a = hash('x');
    const b = hash('x');
    expect(hashesEqual(a, b)).toBe(true);
  });
});
