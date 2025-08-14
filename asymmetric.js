const { publicEncrypt, privateDecrypt, generateKeyPairSync } = require('crypto');

/**
 * Generate an RSA key pair (2048 bits) and return PEM strings.
 */
function generateKeyPair() {
  return generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
}

/**
 * Encrypt a UTF-8 string with a PEM public key, returning a hex string.
 */
function encrypt(publicKey, message) {
  const encrypted = publicEncrypt(publicKey, Buffer.from(message, 'utf8'));
  return encrypted.toString('hex');
}

/**
 * Decrypt a hex string with a PEM private key, returning the original UTF-8 string.
 */
function decrypt(privateKey, hexCiphertext) {
  const decrypted = privateDecrypt(privateKey, Buffer.from(hexCiphertext, 'hex'));
  return decrypted.toString('utf8');
}

module.exports = { generateKeyPair, encrypt, decrypt };

// Example when run directly
if (require.main === module) {
  const { publicKey, privateKey } = generateKeyPair();
  const message = 'secret message';
  const cipher = encrypt(publicKey, message);
  const plain = decrypt(privateKey, cipher);
  console.log({ cipher, plain });
}
