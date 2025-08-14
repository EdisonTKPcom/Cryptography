<div align="center">

# 🔐 Cryptography Mini Lab (Node.js + WebCrypto)

[![CI](https://github.com/EdisonTKPcom/Cryptography/actions/workflows/ci.yml/badge.svg)](https://github.com/EdisonTKPcom/Cryptography/actions)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)  

An easy-to-read collection of tiny, focused examples that show how to do common cryptography building blocks in Node.js using the built‑in `crypto` module:

| Topic                                             | File                  |
|---------------------------------------------------|-----------------------|
| SHA‑256 hashing + constant time compare           | `hash.js`             |
| HMAC signing & verification                       | `hmac.js`             |
| Symmetric AES‑256‑CBC encryption                  | `symmetric.js`        |
| Authenticated AES‑256‑GCM encryption              | `symmetric_gcm.js`    |
| RSA public key encryption (hybrid building block) | `asymmetric.js`       |
| Hybrid RSA + AES‑GCM key wrapping                 | `hybrid.js`           |
| ECDH P-256 + AES Key Wrap (RFC3394)               | `ecdhe_p256_kw.js`    |
| RSA signatures                                    | `signing.js`          |
| Ed25519 signatures                                | `ed25519_x25519.js`   |
| X25519 key agreement (ECDH)                       | `ed25519_x25519.js`   |
| WebCrypto AES-GCM helpers (browser)               | `webcrypto.js`        |
| Salted password storage with scrypt               | `salt.js`             |
| Argon2 password hashing (modern KDF)              | `argon2pw.js`         |
| RSA keypair generation helper                     | `keypair.js`          |
| Quantum key distribution (BB84 simulation)        | `quantum/bb84.js`     |
| HKDF (RFC5869) & PBKDF2                           | `hkdf_pbkdf2.js`      |

> ⚠️ These examples are for learning. For production security: use vetted higher‑level libs, prefer AEAD modes (AES‑256‑GCM / ChaCha20-Poly1305), memory‑hard password hashing (Argon2id), robust key management, and keep dependencies patched.

---

## ✨ Why star this repo?
Starring helps others discover a clean, minimal cryptography reference without extra complexity. More stars = more examples, docs, and security footnotes. If this saved you 5+ minutes of searching, please ⭐ now – it really helps.

---

## 🚀 Install

```bash
npm install cryptography-mini-lab
# or clone and run tests
git clone https://github.com/EdisonTKPcom/Cryptography.git
cd Cryptography
npm install
npm test
```

Node.js 18+ recommended (modern crypto defaults & stable APIs).

## 📦 Quick usage

You can import individual modules or the aggregate `index.js`.

```js
const cryptoLab = require('cryptography-mini-lab');

const { hash, hashesEqual } = cryptoLab;
const h1 = hash('hello');
const h2 = hash('hello');
console.log('match?', hashesEqual(h1, h2));

const { generateKey, generateIv, encrypt, decrypt } = cryptoLab;
const key = generateKey();
const iv = generateIv();
const c = encrypt('secret', key, iv);
console.log('plain', decrypt(c, key, iv));
```

Each source file can also be run directly for a live demo:

```bash
node hash.js
node symmetric.js
node asymmetric.js
node signing.js
node hmac.js
node salt.js
```

## 🧪 Tests

Lightweight Jest tests ensure round‑trip correctness of the primitives.

```bash
npm test
```

Run micro benchmarks (approximate):

```bash
npm run bench
```

### Publish (maintainer)

Tag a new semver version to trigger the publish workflow:

```bash
git tag v1.4.0 && git push origin v1.4.0
```

Ensure `NPM_TOKEN` secret is configured in the repository settings.

## 🛠️ Roadmap / Ideas

See `ROADMAP.md` for a longer list. Highlights:

- [ ] ECDSA / Ed25519 examples
- [ ] Hybrid encryption (RSA/ECDH + AES-GCM)
- [ ] HKDF + PBKDF2 utilities
 - [x] HKDF + PBKDF2 utilities
- [ ] Streaming GCM + file encryption
- [ ] PQC (Kyber/Dilithium) integration when stable libs available

Open an issue to request more examples or vote on priorities.

## 🤝 Contributing

1. Fork
2. Create a branch: `feat/add-example-x`
3. Add or update tests
4. Submit a PR – small & focused preferred

Security-related clarifications welcome. Please avoid submitting intentionally weak patterns unless accompanied by an educational warning.

## 📘 Tutorial

Prefer a guided path? See `TUTORIAL.md` for a step‑by‑step walk‑through from hashing → authenticated encryption → signatures → Argon2 → quantum key distribution simulation.

## ❤️ Support & Sponsor

If this repo helps you teach, prototype, or learn: starring, forking, or sharing is the easiest way to support. For feature funding or security review sponsorship:

- Click the GitHub Sponsor button (see `FUNDING.yml`)
- Open a discussion with ideas
- (Future) OpenCollective / Patreon

## 🔐 Security & Scanning

Automated CI runs Jest + ESLint. CodeQL workflow performs static analysis weekly & on PRs.

AES Key Wrap implementation provided is minimal & educational; prefer a vetted library if using in production.

## 📚 Learning Resources

- Node.js Crypto Docs: https://nodejs.org/api/crypto.html
 - OWASP Cryptographic Storage Cheat Sheet
 - NIST SP 800-57 & 800-63 (key management & digital identity)
 - IETF RFC 5869 (HKDF), RFC 8446 (TLS 1.3 for modern cipher suites)

## 📄 License

MIT – see LICENSE. Attribution appreciated but not required.

---

Star now so you can find this again later. 🔖

</div>

## TODO / Roadmap
[] a safer AES-KW swap, semantic-release integration

