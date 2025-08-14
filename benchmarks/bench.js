/* Simple micro benchmarks (NOT rigorous). Run: npm run bench */
const { performance } = require('perf_hooks');
const { hash } = require('../hash');
const { sign: hmacSign } = require('../hmac');
const { generateKey, generateIv, encrypt, decrypt } = require('../symmetric');
const { gcmKey, gcmEncrypt, gcmDecrypt } = require('../symmetric_gcm');
const { generateKeyPair, sign: rsaSign, verify: rsaVerify } = require('../signing');
const { argon2Hash } = require('../argon2pw');

async function time(label, fn) {
  const t0 = performance.now();
  const result = await fn();
  const t1 = performance.now();
  console.log(label.padEnd(28), (t1 - t0).toFixed(2), 'ms');
  return result;
}

(async () => {
  console.log('--- Benchmarks (approx) ---');
  await time('hash (sha256) x1000', () => { for (let i=0;i<1000;i++) hash('data'+i); });
  await time('hmac (sha256) x1000', () => { for (let i=0;i<1000;i++) hmacSign('data'+i, 'secret'); });
  const key = generateKey(); const iv = generateIv();
  let c; await time('AES-256-CBC encrypt+decrypt', () => { c = encrypt('hello world', key, iv); decrypt(c, key, iv); });
  const gk = gcmKey(); let ge; await time('AES-256-GCM encrypt+decrypt', () => { ge = gcmEncrypt(gk, 'hello'); gcmDecrypt(gk, ge); });
  const { privateKey, publicKey } = generateKeyPair();
  const sig = await time('RSA sign', () => rsaSign(privateKey, 'msg'));
  await time('RSA verify', () => rsaVerify(publicKey, 'msg', sig));
  await time('Argon2 hash (1x)', () => argon2Hash('password'));
})();
