// const { createHmac } = require('crypto');

// const password = 'super-secret!';
// const message = '🎃 hello jack'

// const hmac = createHmac('sha256', password).update(message).digest('hex');

// console.log(hmac)

const crypto = require('crypto');

// Your secret key (should be kept private)
const secret = 'your-secret-key';

// The original message
const message = 'your message';

// The received HMAC
const receivedHMAC = 'the received hmac';

// Create a HMAC using the SHA256 hash function
const hmac = crypto.createHmac('sha256', secret);

// Update the HMAC with the message
hmac.update(message);

// Generate the HMAC
const calculatedHMAC = hmac.digest('hex');

// Compare the received HMAC to the calculated HMAC
if (receivedHMAC === calculatedHMAC) {
    console.log('The message is verified.');
} else {
    console.log('The message is not verified.');
}
