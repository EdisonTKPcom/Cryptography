const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

function hashPassword(password, salt = randomBytes(16).toString('hex')) {
    const hashed = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hashed}`;
}

function verifyPassword(stored, passwordAttempt) {
    const [salt, key] = stored.split(':');
    const hashedAttempt = scryptSync(passwordAttempt, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');
    if (keyBuffer.length !== hashedAttempt.length) return false;
    return timingSafeEqual(hashedAttempt, keyBuffer);
}

class InMemoryUserStore {
    constructor() { this.users = new Map(); }
    signup(email, password) {
        const record = hashPassword(password);
        this.users.set(email, record);
        return { email };
    }
    login(email, password) {
        const stored = this.users.get(email);
        if (!stored) return false;
        return verifyPassword(stored, password);
    }
}

module.exports = { hashPassword, verifyPassword, InMemoryUserStore };

if (require.main === module) {
    const store = new InMemoryUserStore();
    store.signup('foo@bar.com', 'pa$$word');
    console.log('login correct?', store.login('foo@bar.com', 'pa$$word'));
    console.log('login wrong?', store.login('foo@bar.com', 'password'));
}
