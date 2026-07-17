import { cookies } from "next/headers";

const COOKIE_NAME = "mihis_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "safat",
    password: process.env.ADMIN_PASSWORD ?? "Saatsaat123!@",
  };
}

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "mihis-local-admin-secret";
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );
  return toHex(signature);
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function verifyCredentials(username: string, password: string) {
  const creds = getAdminCredentials();
  return (
    safeEqual(username.trim(), creds.username) &&
    safeEqual(password, creds.password)
  );
}

export async function createSessionToken(username: string) {
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${username}|${expiresAt}`;
  const signature = await sign(payload);
  return `${payload}|${signature}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
): Promise<{ valid: boolean; username?: string }> {
  if (!token) return { valid: false };
  const parts = token.split("|");
  if (parts.length !== 3) return { valid: false };
  const [username, expiresAtRaw, signature] = parts;
  const expiresAt = Number(expiresAtRaw);
  if (!username || !Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return { valid: false };
  }
  const expected = await sign(`${username}|${expiresAtRaw}`);
  if (!safeEqual(signature, expected)) return { valid: false };
  return { valid: true, username };
}

export async function getAdminSession() {
  const jar = await cookies();
  return verifySessionToken(jar.get(COOKIE_NAME)?.value);
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}

export function clearSessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}

export { COOKIE_NAME };
