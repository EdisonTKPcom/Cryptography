export function hash(input: string | Buffer): string;
export function hashesEqual(a: string, b: string): boolean;

export function sign(message: string, secret: string): string; // HMAC sign
export function verify(message: string, secret: string, givenHex: string): boolean; // HMAC verify

// symmetric (CBC)
export const ALGO: string;
export function generateKey(): Buffer;
export function generateIv(): Buffer;
export function encrypt(message: string, key: Buffer, iv: Buffer): string;
export function decrypt(ciphertextHex: string, key: Buffer, iv: Buffer): string;

// symmetric GCM
export function gcmKey(): Buffer;
export function gcmIv(): Buffer;
export function gcmEncrypt(key: Buffer, plaintext: string, iv?: Buffer, aad?: string): {
  ciphertext: string; iv: string; authTag: string; aad?: string;
};
export function gcmDecrypt(key: Buffer, data: { ciphertext: string; iv: string; authTag: string; aad?: string }): string;

// RSA asymmetric
export function generateKeyPair(): { publicKey: string; privateKey: string };
export function encrypt(publicKey: string, message: string): string;
export function decrypt(privateKey: string, hexCiphertext: string): string;

// Signing (RSA)
export function sign(privateKey: string, data: string): string; // overloaded name
export function verify(publicKey: string, data: string, signatureHex: string): boolean; // overloaded name

// Salted password store
export function hashPassword(password: string, salt?: string): string;
export function verifyPassword(stored: string, attempt: string): boolean;
export class InMemoryUserStore {
  signup(email: string, password: string): { email: string };
  login(email: string, password: string): boolean;
}

// Argon2 password hashing
export function argon2Hash(password: string): Promise<string>;
export function argon2Verify(hash: string, password: string): Promise<boolean>;

// Quantum (BB84 simulation)
export function simulateBB84(length?: number, eavesdropProbability?: number): {
  aliceBits: string;
  aliceBases: string;
  bobBases: string;
  siftedKey: string;
  siftedLength: number;
  eveCount: number;
  estimatedErrorRate: number;
};

// Hybrid RSA + AES-GCM
export function hybridEncrypt(publicKey: string, plaintext: string, aad?: string): {
  wrappedKey: string; ciphertext: string; iv: string; authTag: string; aad?: string;
};
export function hybridDecrypt(privateKey: string, payload: { wrappedKey: string; ciphertext: string; iv: string; authTag: string; aad?: string }): string;

// Ed25519 & X25519
import { KeyObject } from 'crypto';
export function generateEd25519KeyPair(): { privateKey: KeyObject; publicKey: KeyObject };
export function ed25519Sign(privateKey: KeyObject, data: string): string;
export function ed25519Verify(publicKey: KeyObject, data: string, signatureHex: string): boolean;
export function generateX25519KeyPair(): { privateKey: KeyObject; publicKey: KeyObject };
export function x25519SharedSecret(privateKey: KeyObject, publicKey: KeyObject): string;

// ECDH P-256 + AES Key Wrap (RFC3394) example
export function generateP256KeyPair(): { privateKey: KeyObject; publicKey: KeyObject };
export function p256SharedSecret(aPriv: KeyObject, bPub: KeyObject): Buffer;
export function aesKwWrap(kek: Buffer, keyToWrap: Buffer): Buffer;
export function aesKwUnwrap(kek: Buffer, wrapped: Buffer): Buffer;

// WebCrypto (browser compatible) helpers (may throw if not in browser / lacks subtle)
export namespace webcryptoHelpers {
  function importAesGcmKey(raw: ArrayBuffer | Uint8Array): Promise<CryptoKey>;
  function aesGcmEncrypt(key: CryptoKey, plaintext: string, iv?: Uint8Array, aad?: Uint8Array): Promise<{ ciphertext: Uint8Array; iv: Uint8Array; authTag: Uint8Array; }>;
  function aesGcmDecrypt(key: CryptoKey, data: { ciphertext: Uint8Array; iv: Uint8Array; authTag: Uint8Array; aad?: Uint8Array }): Promise<string>;
}

// HKDF & PBKDF2
export function hkdf(ikm: Buffer | Uint8Array, salt: Buffer | Uint8Array, info: Buffer | Uint8Array, length?: number): Buffer;
export function hkdfExtract(salt: Buffer | Uint8Array, ikm: Buffer | Uint8Array): Buffer;
export function hkdfExpand(prk: Buffer | Uint8Array, info: Buffer | Uint8Array, length: number): Buffer;
export function pbkdf2(password: string | Buffer, salt: string | Buffer, iterations?: number, keyLen?: number, digest?: string): Buffer;
