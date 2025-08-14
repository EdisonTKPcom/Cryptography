const { createHmac, pbkdf2Sync } = require('crypto');

// HKDF (RFC 5869) using SHA-256
function hkdfExtract(salt, ikm) {
  return createHmac('sha256', salt).update(ikm).digest();
}
function hkdfExpand(prk, info, length) {
  const blocks = [];
  let prev = Buffer.alloc(0);
  let i = 0;
  while (Buffer.concat(blocks).length < length) {
    i += 1;
    const h = createHmac('sha256', prk);
    h.update(prev); h.update(info); h.update(Buffer.from([i]));
    prev = h.digest();
    blocks.push(prev);
  }
  return Buffer.concat(blocks).slice(0, length);
}
function hkdf(ikm, salt, info, length = 32) {
  const prk = hkdfExtract(salt, ikm);
  return hkdfExpand(prk, info, length);
}

function pbkdf2(password, salt, iterations = 310000, keyLen = 32, digest = 'sha256') {
  return pbkdf2Sync(password, salt, iterations, keyLen, digest);
}

module.exports = { hkdf, hkdfExtract, hkdfExpand, pbkdf2 };

if (require.main === module) {
  const okm = hkdf(Buffer.from('input'), Buffer.from('salt'), Buffer.from('info'), 42);
  console.log('hkdf len', okm.length);
  console.log('pbkdf2', pbkdf2('pw', 'salt').toString('hex').slice(0,16));
}
