const { createHmac } = require('crypto');

const password = 'super-secret!';
const message = '🎃 hello jack'

const hmac = createHmac('sha256', password).update(message).digest('hex');

console.log(hmac)
