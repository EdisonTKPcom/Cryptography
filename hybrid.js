// Hybrid RSA + AES-GCM example (encrypt with random symmetric key, wrap key with RSA)
const { randomBytes, publicEncrypt, privateDecrypt } = require('crypto');
const { gcmKey, gcmEncrypt, gcmDecrypt } = require('./symmetric_gcm');
const { generateKeyPair } = require('./asymmetric');

function hybridEncrypt(publicKey, plaintext, aad) {
  const key = gcmKey();
  const enc = gcmEncrypt(key, plaintext, undefined, aad);
  const wrappedKey = publicEncrypt(publicKey, key).toString('hex');
  return { wrappedKey, ...enc };
}

function hybridDecrypt(privateKey, payload) {
  const { wrappedKey, ciphertext, iv, authTag, aad } = payload;
  const key = privateDecrypt(privateKey, Buffer.from(wrappedKey, 'hex'));
  return gcmDecrypt(key, { ciphertext, iv, authTag, aad });
}

module.exports = { hybridEncrypt, hybridDecrypt };

if (require.main === module) {
  const { publicKey, privateKey } = generateKeyPair();
  const payload = hybridEncrypt(publicKey, 'top secret', 'aad');
  console.log('payload', payload);
  console.log('plain', hybridDecrypt(privateKey, payload));
}
