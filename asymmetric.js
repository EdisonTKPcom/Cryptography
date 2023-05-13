const {  publicEncrypt, privateDecrypt } = require('crypto');
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


const encryptedData = publicEncrypt(
    publicKey,
    Buffer.from(secretMessage)
  );


console.log(encryptedData.toString('hex'))


const decryptedData = privateDecrypt(
    privateKey,
    encryptedData
);

console.log(decryptedData.toString('utf-8'));
