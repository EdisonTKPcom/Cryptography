// Minimal BB84 (quantum key distribution) simulation for educational purposes.
// NOTE: This is a classical simulation; not real quantum networking.

const BASES = ['+', 'x']; // + = rectilinear, x = diagonal

function randomBit() { return Math.random() < 0.5 ? 0 : 1; }
function randomBase() { return BASES[Math.random() < 0.5 ? 0 : 1]; }

function measure(bit, prepBase, measBase) {
  if (prepBase === measBase) return bit; // same basis: deterministic
  // different basis: 50% chance of flip
  return randomBit();
}

function simulateBB84(length = 32, eavesdropProbability = 0) {
  const aliceBits = Array.from({ length }, randomBit);
  const aliceBases = Array.from({ length }, randomBase);
  const bobBases = Array.from({ length }, randomBase);

  // Optional eavesdropper (Eve)
  const eveMeasurements = [];
  for (let i = 0; i < length; i++) {
    if (Math.random() < eavesdropProbability) {
      const eveBase = randomBase();
      const eveBit = measure(aliceBits[i], aliceBases[i], eveBase);
      // Eve resends measured bit in her basis (potential error introduced by basis mismatch)
      const resentBit = eveBit;
      // Replace original bit seen by Bob with possibly corrupted resentBit
      // Simulate by overwriting aliceBits for Bob's perspective during interception phase
      aliceBits[i] = resentBit; // eslint-disable-line no-param-reassign
      eveMeasurements.push({ i, eveBase, eveBit });
    }
  }

  // Bob measures
  const bobBits = aliceBits.map((bit, i) => measure(bit, aliceBases[i], bobBases[i]));

  // Public basis comparison -> sifted key
  const sifted = [];
  let disagreements = 0;
  for (let i = 0; i < length; i++) {
    if (aliceBases[i] === bobBases[i]) {
      sifted.push(aliceBits[i]);
      if (aliceBits[i] !== bobBits[i]) disagreements++;
    }
  }

  return {
    aliceBits: aliceBits.join(''),
    aliceBases: aliceBases.join(''),
    bobBases: bobBases.join(''),
  siftedKey: sifted.join(''),
    siftedLength: sifted.length,
  eveCount: eveMeasurements.length,
  estimatedErrorRate: sifted.length ? disagreements / sifted.length : 0,
  };
}

module.exports = { simulateBB84 };

if (require.main === module) {
  console.log(simulateBB84(32, 0.1));
}
