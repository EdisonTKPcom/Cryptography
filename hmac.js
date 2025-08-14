const { createHmac, timingSafeEqual } = require('crypto');

function sign(message, secret) {
    return createHmac('sha256', secret).update(message).digest('hex');
}

function verify(message, secret, givenHex) {
    const expected = sign(message, secret);
    if (expected.length !== givenHex.length) return false;
    return timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(givenHex, 'hex'));
}

module.exports = { sign, verify };

if (require.main === module) {
    const secret = 'super-secret';
    const msg = 'hello';
    const mac = sign(msg, secret);
    console.log('mac', mac);
    console.log('verify ok?', verify(msg, secret, mac));
}
