// Ed25519 (sign) & X25519 (ECDH) using Node.js crypto (Node 19+ recommended)
const { generateKeyPairSync, createPrivateKey, diffieHellman, createPublicKey, sign, verify } = require('crypto');

function generateEd25519KeyPair() {
  return generateKeyPairSync('ed25519');
}

function ed25519Sign(privateKey, data) {
  return sign(null, Buffer.from(data), privateKey).toString('hex');
}

function ed25519Verify(publicKey, data, signatureHex) {
  return verify(null, Buffer.from(data), publicKey, Buffer.from(signatureHex, 'hex'));
}

function generateX25519KeyPair() {
  return generateKeyPairSync('x25519');
}

function x25519SharedSecret(privateKey, publicKey) {
  // Node's diffieHellman needs objects with type 'private'/'public'
  return diffieHellman({ privateKey, publicKey }).toString('hex');
}

module.exports = { generateEd25519KeyPair, ed25519Sign, ed25519Verify, generateX25519KeyPair, x25519SharedSecret };

if (require.main === module) {
  const { privateKey: edPriv, publicKey: edPub } = generateEd25519KeyPair();
  const sig = ed25519Sign(edPriv, 'message');
  console.log('ed25519 sig valid?', ed25519Verify(edPub, 'message', sig));
  const alice = generateX25519KeyPair();
  const bob = generateX25519KeyPair();
  const s1 = x25519SharedSecret(alice.privateKey, bob.publicKey);
  const s2 = x25519SharedSecret(bob.privateKey, alice.publicKey);
  console.log('x25519 secret equal?', s1 === s2);
}
