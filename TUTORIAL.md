# Cryptography Tutorial (Step by Step)

## 1. Hashing
```js
const { hash } = require('./hash');
console.log(hash('hello'));
```

## 2. HMAC (Integrity + Authenticity)
```js
const { sign: hmacSign, verify: hmacVerify } = require('./hmac');
const mac = hmacSign('msg', 'secret');
console.log(hmacVerify('msg', 'secret', mac)); // true
```

## 3. Salted Password Storage (scrypt)
```js
const { InMemoryUserStore } = require('./salt');
const store = new InMemoryUserStore();
store.signup('a@b.com', 'pw');
console.log(store.login('a@b.com', 'pw')); // true
```

## 4. Symmetric Encryption (AES-CBC)
```js
const { generateKey, generateIv, encrypt, decrypt } = require('./symmetric');
const key = generateKey();
const iv = generateIv();
const cipher = encrypt('secret', key, iv);
console.log(decrypt(cipher, key, iv));
```

## 5. Symmetric Encryption (AES-GCM Authenticated)
```js
const { gcmEncrypt, gcmDecrypt, gcmKey } = require('./symmetric_gcm');
const key = gcmKey();
const { ciphertext, iv, authTag } = gcmEncrypt(key, 'hello');
console.log(gcmDecrypt(key, { ciphertext, iv, authTag }));
```

## 6. Asymmetric Encryption (RSA)
```js
const { generateKeyPair, encrypt: rsaEncrypt, decrypt: rsaDecrypt } = require('./asymmetric');
const { publicKey, privateKey } = generateKeyPair();
const c = rsaEncrypt(publicKey, 'hi');
console.log(rsaDecrypt(privateKey, c));
```

## 7. Digital Signatures (RSA)
```js
const { generateKeyPair: kp, sign, verify } = require('./signing');
const { privateKey, publicKey } = kp();
const sig = sign(privateKey, 'data');
console.log(verify(publicKey, 'data', sig));
```

## 8. Argon2 Password Hashing
```js
const { argon2Hash, argon2Verify } = require('./argon2pw');
(async () => {
  const hash = await argon2Hash('pw');
  console.log(await argon2Verify(hash, 'pw'));
})();
```

## 9. Quantum Key Distribution (Simulated BB84)
```js
const { simulateBB84 } = require('./quantum/bb84');
console.log(simulateBB84(32));
```

See `examples/` (future) for more scenarios.
