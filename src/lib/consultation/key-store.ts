import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { get, put } from "@vercel/blob";

/**
 * Private, encrypted-at-rest storage for the admin-configured Groq API key.
 *
 * - Lives in a store separate from SiteContent (never returned by content APIs).
 * - Encrypted with AES-256-GCM using AI_SETTINGS_ENCRYPTION_KEY.
 * - AI_SETTINGS_ENCRYPTION_KEY must decode to exactly 32 bytes and may be
 *   provided as base64 (e.g. `openssl rand -base64 32`) or as 64 hex chars
 *   (e.g. `openssl rand -hex 32`).
 * - If AI_SETTINGS_ENCRYPTION_KEY is not configured, saving an admin key fails
 *   with a clear error, while the GROQ_API_KEY env variable keeps working.
 */

const PRIVATE_DIR = path.join(process.cwd(), "content", "private");
const KEY_FILE = path.join(PRIVATE_DIR, "ai-settings.json");
const BLOB_PATHNAME = "mihis-private/ai-settings.json";

const ALGORITHM = "aes-256-gcm";
const IV_BYTES = 12;

type EncryptedPayload = {
  v: 1;
  algorithm: typeof ALGORITHM;
  iv: string; // base64
  tag: string; // base64
  data: string; // base64
};

type PrivateAiSettings = {
  groqApiKey?: EncryptedPayload;
  updatedAt?: string;
};

export class KeyStoreConfigError extends Error {}

function isVercel() {
  return process.env.VERCEL === "1";
}

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function decodeEncryptionKey(raw: string): Buffer | null {
  const trimmed = raw.trim();
  if (/^[0-9a-f]{64}$/i.test(trimmed)) {
    return Buffer.from(trimmed, "hex");
  }
  try {
    const decoded = Buffer.from(trimmed, "base64");
    if (decoded.length === 32) return decoded;
  } catch {
    // fall through
  }
  return null;
}

function getEncryptionKey(): Buffer {
  const raw = process.env.AI_SETTINGS_ENCRYPTION_KEY;
  if (!raw) {
    throw new KeyStoreConfigError(
      "AI_SETTINGS_ENCRYPTION_KEY is not configured. Set it to a 32-byte secret " +
        "(base64, e.g. `openssl rand -base64 32`, or 64 hex characters) to save " +
        "an API key from the admin panel. Alternatively, set GROQ_API_KEY directly.",
    );
  }
  const key = decodeEncryptionKey(raw);
  if (!key) {
    throw new KeyStoreConfigError(
      "AI_SETTINGS_ENCRYPTION_KEY is invalid. It must decode to exactly 32 bytes; " +
        "use base64 (`openssl rand -base64 32`) or 64 hex characters (`openssl rand -hex 32`).",
    );
  }
  return key;
}

export function isEncryptionConfigured(): boolean {
  const raw = process.env.AI_SETTINGS_ENCRYPTION_KEY;
  return Boolean(raw && decodeEncryptionKey(raw));
}

function encrypt(plaintext: string): EncryptedPayload {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const data = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return {
    v: 1,
    algorithm: ALGORITHM,
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    data: data.toString("base64"),
  };
}

function decrypt(payload: EncryptedPayload): string {
  const key = getEncryptionKey();
  const decipher = createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(payload.iv, "base64"),
  );
  decipher.setAuthTag(Buffer.from(payload.tag, "base64"));
  const plain = Buffer.concat([
    decipher.update(Buffer.from(payload.data, "base64")),
    decipher.final(),
  ]);
  return plain.toString("utf8");
}

async function readPrivateSettings(): Promise<PrivateAiSettings | null> {
  if (hasBlobToken()) {
    try {
      const result = await get(BLOB_PATHNAME, {
        access: "private",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        storeId: process.env.BLOB_STORE_ID,
        useCache: false,
      });
      if (result && result.statusCode === 200 && result.stream) {
        const text = await new Response(result.stream).text();
        if (text) return JSON.parse(text) as PrivateAiSettings;
      }
      return null;
    } catch (error) {
      console.error("[key-store] blob read failed:", error);
      return null;
    }
  }

  if (isVercel()) return null;

  try {
    const raw = await fs.readFile(KEY_FILE, "utf8");
    return JSON.parse(raw) as PrivateAiSettings;
  } catch {
    return null;
  }
}

async function writePrivateSettings(settings: PrivateAiSettings): Promise<void> {
  const serialized = JSON.stringify(settings, null, 2);

  if (hasBlobToken()) {
    await put(BLOB_PATHNAME, serialized, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      storeId: process.env.BLOB_STORE_ID,
    });
    return;
  }

  if (isVercel()) {
    throw new KeyStoreConfigError(
      "Persistent private storage is not configured on Vercel. " +
        "Add BLOB_READ_WRITE_TOKEN (Vercel Blob) to save the API key.",
    );
  }

  await fs.mkdir(PRIVATE_DIR, { recursive: true });
  await fs.writeFile(KEY_FILE, serialized, "utf8");
}

/** Basic shape check so obviously wrong values are rejected early. */
function isPlausibleGroqKey(value: string): boolean {
  return /^[A-Za-z0-9_-]{20,256}$/.test(value);
}

export async function saveAdminGroqKey(apiKey: string): Promise<void> {
  const trimmed = apiKey.trim();
  if (!isPlausibleGroqKey(trimmed)) {
    throw new KeyStoreConfigError(
      "The provided API key does not look valid. Paste the key exactly as issued by GroqCloud.",
    );
  }
  const encrypted = encrypt(trimmed);
  await writePrivateSettings({
    groqApiKey: encrypted,
    updatedAt: new Date().toISOString(),
  });
}

export async function clearAdminGroqKey(): Promise<void> {
  await writePrivateSettings({ updatedAt: new Date().toISOString() });
}

async function readAdminGroqKey(): Promise<string | null> {
  if (!isEncryptionConfigured()) return null;
  const settings = await readPrivateSettings();
  if (!settings?.groqApiKey) return null;
  try {
    return decrypt(settings.groqApiKey);
  } catch (error) {
    console.error("[key-store] decrypt failed (wrong AI_SETTINGS_ENCRYPTION_KEY?):", error);
    return null;
  }
}

/**
 * Resolve the Groq API key for server-side use.
 * Environment variable wins; the encrypted admin-configured key is the fallback.
 * Never expose the returned value to clients.
 */
export async function resolveGroqApiKey(): Promise<{
  apiKey: string;
  source: "env" | "admin";
} | null> {
  const fromEnv = process.env.GROQ_API_KEY?.trim();
  if (fromEnv) return { apiKey: fromEnv, source: "env" };

  const fromAdmin = await readAdminGroqKey();
  if (fromAdmin) return { apiKey: fromAdmin, source: "admin" };

  return null;
}

function maskKey(key: string): string {
  if (key.length <= 8) return "****";
  return `${key.slice(0, 4)}…${key.slice(-4)}`;
}

export type GroqKeyStatus = {
  configured: boolean;
  source: "env" | "admin" | "none";
  masked: string | null;
  encryptionConfigured: boolean;
};

/** Masked status for the admin panel. Never includes the key itself. */
export async function getGroqKeyStatus(): Promise<GroqKeyStatus> {
  const resolved = await resolveGroqApiKey();
  return {
    configured: Boolean(resolved),
    source: resolved?.source ?? "none",
    masked: resolved ? maskKey(resolved.apiKey) : null,
    encryptionConfigured: isEncryptionConfigured(),
  };
}
