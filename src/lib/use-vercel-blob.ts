/**
 * Temporary kill-switch for Vercel Blob.
 *
 * Keep this `false` until you create a Blob store and set
 * BLOB_READ_WRITE_TOKEN + BLOB_STORE_ID. Then set it to `true`.
 *
 * While false:
 * - Consultations are not saved to Blob (session/memory + local files in dev).
 * - Site content and the Groq key store skip Blob reads/writes.
 */
export const USE_VERCEL_BLOB = false;

export function isVercelBlobEnabled(): boolean {
  return USE_VERCEL_BLOB && Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}
