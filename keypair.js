const { generateKeyPairSync } = require('crypto');

function generateKeyPair() {
  return generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
}

module.exports = { generateKeyPair };

if (require.main === module) {
  const { publicKey, privateKey } = generateKeyPair();
  console.log(publicKey);
  console.log(privateKey);
}
