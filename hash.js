const { createHash, timingSafeEqual } = require('crypto');
const bcrypt = require('bcrypt');
/**
 * Hash a string using SHA-256.
 * (In production for passwords you should use a slow hash: argon2, bcrypt, scrypt, PBKDF2.)
 * @param {string|Buffer} input
 * @returns {string} hex digest
 */
function hash(input, saltRounds = 12) {
    // Use bcrypt for password hashing
    return bcrypt.hashSync(input, saltRounds);
}

/**
 * Constant‑time comparison of two hex hashes (length must match)
 */
function hashesEqual(a, b) {
    if (a.length !== b.length) return false;
    return timingSafeEqual(Buffer.from(a, 'hex'), Buffer.from(b, 'hex'));
}

module.exports = { hash, hashesEqual };

// Example usage when run directly
if (require.main === module) {
    const password = 'hi-mom!';
    const saltRounds = 12;
    const hash1 = hash(password, saltRounds);
    console.log('hash1', hash1);
    // To verify, use bcrypt.compareSync
    const match = bcrypt.compareSync(password, hash1);
    console.log('match?', match);
}
