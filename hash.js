const { createHash } = require('crypto');

// Create a string hash

function hash(str) {
    return createHash('sha256').update(str).digest('hex');
}

// Compare two hashed passwords

let password = 'hi-mom!';
const hash1 = hash(password);
console.log(hash1)

/// ... some time later

password = 'hi-mom';
const hash2 = hash(password);
const match = hash1 === hash2;

console.log(match ? '✔️  good password' : '❌  password does not match');
