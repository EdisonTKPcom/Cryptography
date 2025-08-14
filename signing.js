const { createSign, createVerify, generateKeyPairSync } = require('crypto');

function generateKeyPair() {
  return generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
}

function sign(privateKey, data) {
  const signer = createSign('rsa-sha256');
  signer.update(data);
  return signer.sign(privateKey, 'hex');
}

function verify(publicKey, data, signatureHex) {
  const verifier = createVerify('rsa-sha256');
  verifier.update(data);
  return verifier.verify(publicKey, signatureHex, 'hex');
}

module.exports = { generateKeyPair, sign, verify };

if (require.main === module) {
  const { privateKey, publicKey } = generateKeyPair();
  const data = 'this data must be signed';
  const signature = sign(privateKey, data);
  console.log('signature', signature.slice(0, 32) + '...');
  console.log('valid?', verify(publicKey, data, signature));
}
