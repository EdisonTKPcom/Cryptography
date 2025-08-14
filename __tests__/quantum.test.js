const { simulateBB84 } = require('../quantum/bb84');

describe('BB84 simulation', () => {
  test('produces sifted key', () => {
    const result = simulateBB84(16);
    expect(result.siftedKey.length).toBeGreaterThan(0);
    expect(result.siftedKey.length).toBeLessThanOrEqual(16);
  });
});
