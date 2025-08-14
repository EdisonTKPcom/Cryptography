const argon2 = require('argon2');

async function argon2Hash(password) {
  return argon2.hash(password, { type: argon2.argon2id, memoryCost: 19456, timeCost: 2, parallelism: 1 });
}

async function argon2Verify(hash, password) {
  try { return await argon2.verify(hash, password); } catch { return false; }
}

module.exports = { argon2Hash, argon2Verify };

if (require.main === module) {
  (async () => {
    const h = await argon2Hash('pw');
    console.log(h);
    console.log('verify', await argon2Verify(h, 'pw'));
  })();
}
