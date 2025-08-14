const { randomBytes, createCipheriv, createDecipheriv } = require('crypto');

function gcmKey() { return randomBytes(32); }
function gcmIv() { return randomBytes(12); }

function gcmEncrypt(key, plaintext, iv = gcmIv(), aad) {
  const cipher = createCipheriv('aes-256-gcm', key, iv, { authTagLength: 16 });
  if (aad) cipher.setAAD(Buffer.from(aad));
  let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
  ciphertext += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return { ciphertext, iv: iv.toString('hex'), authTag, aad };
}

function gcmDecrypt(key, { ciphertext, iv, authTag, aad }) {
  const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'), { authTagLength: 16 });
  if (aad) decipher.setAAD(Buffer.from(aad));
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  let plaintext = decipher.update(ciphertext, 'hex', 'utf8');
  plaintext += decipher.final('utf8');
  return plaintext;
}

module.exports = { gcmKey, gcmIv, gcmEncrypt, gcmDecrypt };

if (require.main === module) {
  const key = gcmKey();
  const enc = gcmEncrypt(key, 'hello world', undefined, 'aad');
  console.log(enc);
  console.log(gcmDecrypt(key, enc));
}
