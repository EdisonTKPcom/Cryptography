const { createHash, timingSafeEqual } = require('crypto');

/**
 * Hash a string using SHA-256.
 * (In production for passwords you should use a slow hash: argon2, bcrypt, scrypt, PBKDF2.)
 * @param {string|Buffer} input
 * @returns {string} hex digest
 */
function hash(input) {
    return createHash('sha256').update(input).digest('hex');
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
    const hash1 = hash(password);
    console.log('hash1', hash1);
    const hash2 = hash(password);
    console.log('match?', hashesEqual(hash1, hash2));
}
