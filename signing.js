const { createSign, createVerify } = require('crypto');
const { generateKeyPairSync } = require('crypto');

// const { publicKey, privateKey } = require('./keypair');
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048, // the length of your key in bits
    publicKeyEncoding: {
      type: 'spki', // recommended to be 'spki' by the Node.js docs
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8', // recommended to be 'pkcs8' by the Node.js docs
      format: 'pem',
    },
  });
  
const data = 'this data must be signed';

/// SIGN

const signer = createSign('rsa-sha256');

signer.update(data);

const siguature = signer.sign(privateKey, 'hex');

console.log(siguature);

/// VERIFY

const verifier = createVerify('rsa-sha256');

verifier.update(data);

const isVerified = verifier.verify(publicKey, siguature, 'hex');

console.log(isVerified);
