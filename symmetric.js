const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');

// Node docs prefer aes-256-cbc naming.
const ALGO = 'aes-256-cbc';

function generateKey() { return randomBytes(32); }
function generateIv() { return randomBytes(16); }

function encrypt(message, key, iv) {
	const cipher = createCipheriv(ALGO, key, iv);
	return cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
}

function decrypt(ciphertextHex, key, iv) {
	const decipher = createDecipheriv(ALGO, key, iv);
	return (decipher.update(ciphertextHex, 'hex', 'utf8') + decipher.final('utf8'));
}

module.exports = { generateKey, generateIv, encrypt, decrypt, ALGO };

if (require.main === module) {
	const key = generateKey();
	const iv = generateIv();
	const msg = 'i like turtles';
	const c = encrypt(msg, key, iv);
	const p = decrypt(c, key, iv);
	console.log({ cipher: c, plain: p });
}
