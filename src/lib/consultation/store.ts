import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { get, list, put } from "@vercel/blob";

import {
  consultationRecordSchema,
  isValidConsultationId,
  type ConsultationRecord,
  type ConsultationSummary,
} from "@/lib/consultation/types";
import { isVercelBlobEnabled } from "@/lib/use-vercel-blob";

/**
 * Persistent storage for consultation records.
 *
 * Blob is currently disabled via USE_VERCEL_BLOB in src/lib/use-vercel-blob.ts.
 * Flip that flag to true after the Blob store is ready.
 *
 * Until then:
 * - Local/dev writes files under content/consultations
 * - Vercel keeps records in memory for the running instance
 * - The browser also holds the session so rounds still work across cold starts
 */

const LOCAL_DIR = path.join(process.cwd(), "content", "consultations");
const BLOB_PREFIX = "mihis-consultations/";

/** In-process cache used when Blob is off (especially on Vercel). */
const memoryStore = new Map<string, ConsultationRecord>();

export class ConsultationStorageError extends Error {}

function isVercel() {
  return process.env.VERCEL === "1";
}

function blobOptions() {
  return {
    token: process.env.BLOB_READ_WRITE_TOKEN,
    ...(process.env.BLOB_STORE_ID ? { storeId: process.env.BLOB_STORE_ID } : {}),
  };
}

function blobErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function isBlobStoreUnavailable(error: unknown): boolean {
  const message = blobErrorMessage(error).toLowerCase();
  return (
    message.includes("suspended") ||
    message.includes("store not found") ||
    (message.includes("not found") && message.includes("store"))
  );
}

function blobWriteFailure(error: unknown): ConsultationStorageError {
  const message = blobErrorMessage(error);
  if (isBlobStoreUnavailable(error)) {
    return new ConsultationStorageError(
      "Consultation storage is unavailable because the Vercel Blob store is suspended or missing. " +
        "Create a new Blob store in the Vercel dashboard and update BLOB_READ_WRITE_TOKEN and BLOB_STORE_ID.",
    );
  }
  return new ConsultationStorageError(
    `Could not save the consultation (${message}). Please try again.`,
  );
}

function blobPathname(id: string) {
  return `${BLOB_PREFIX}${id}.json`;
}

function localPathname(id: string) {
  return path.join(LOCAL_DIR, `${id}.json`);
}

function parseRecord(text: string): ConsultationRecord | null {
  try {
    const parsed = consultationRecordSchema.safeParse(JSON.parse(text));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

async function readFromLocal(id: string): Promise<ConsultationRecord | null> {
  try {
    const raw = await fs.readFile(localPathname(id), "utf8");
    return parseRecord(raw);
  } catch {
    return null;
  }
}

async function writeToLocal(record: ConsultationRecord, serialized: string): Promise<void> {
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  await fs.writeFile(localPathname(record.id), serialized, "utf8");
}

async function readFromBlob(id: string): Promise<ConsultationRecord | null> {
  const result = await get(blobPathname(id), {
    access: "private",
    useCache: false,
    ...blobOptions(),
  });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  return text ? parseRecord(text) : null;
}

async function writeToBlob(record: ConsultationRecord, serialized: string): Promise<void> {
  await put(blobPathname(record.id), serialized, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    ...blobOptions(),
  });
}

async function readRaw(id: string): Promise<ConsultationRecord | null> {
  const fromMemory = memoryStore.get(id);
  if (fromMemory) return fromMemory;

  // Blob path — re-enable with USE_VERCEL_BLOB = true
  if (isVercelBlobEnabled()) {
    try {
      const fromBlob = await readFromBlob(id);
      if (fromBlob) {
        memoryStore.set(id, fromBlob);
        return fromBlob;
      }
    } catch (error) {
      console.error("[consultation-store] blob read failed:", error);
      if (isVercel()) return null;
    }
  }

  const fromLocal = await readFromLocal(id);
  if (fromLocal) memoryStore.set(id, fromLocal);
  return fromLocal;
}

async function writeRaw(record: ConsultationRecord): Promise<void> {
  const serialized = JSON.stringify(record, null, 2);
  memoryStore.set(record.id, record);

  // Blob path — re-enable with USE_VERCEL_BLOB = true
  if (isVercelBlobEnabled()) {
    try {
      await writeToBlob(record, serialized);
      return;
    } catch (error) {
      console.error("[consultation-store] blob write failed:", error);
      if (isVercel()) throw blobWriteFailure(error);
    }
  }

  if (isVercel()) return;
  await writeToLocal(record, serialized);
}

export async function createConsultation(
  input: Pick<ConsultationRecord, "journeyId" | "journeyTitle" | "locale"> & {
    email?: string;
  },
): Promise<ConsultationRecord> {
  const now = new Date().toISOString();
  const record: ConsultationRecord = {
    id: randomUUID(),
    locale: input.locale,
    journeyId: input.journeyId,
    journeyTitle: input.journeyTitle,
    status: "in_progress",
    currentRoundIndex: 0,
    rounds: [],
    report: null,
    ...(input.email ? { email: input.email } : {}),
    createdAt: now,
    updatedAt: now,
  };

  await writeRaw(record);
  return record;
}

export async function readConsultation(
  id: string,
): Promise<ConsultationRecord | null> {
  if (!isValidConsultationId(id)) return null;
  return readRaw(id);
}

export async function updateConsultation(
  record: ConsultationRecord,
): Promise<ConsultationRecord> {
  if (!isValidConsultationId(record.id)) {
    throw new ConsultationStorageError("Invalid consultation id.");
  }
  const validated = consultationRecordSchema.parse({
    ...record,
    updatedAt: new Date().toISOString(),
  });
  await writeRaw(validated);
  return validated;
}

function toSummary(record: ConsultationRecord): ConsultationSummary {
  return {
    id: record.id,
    journeyId: record.journeyId,
    journeyTitle: record.journeyTitle,
    status: record.status,
    roundsCompleted: record.rounds.length,
    hasReport: Boolean(record.report),
    ...(record.email ? { email: record.email } : {}),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

async function listFromLocal(): Promise<ConsultationSummary[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(LOCAL_DIR);
  } catch {
    files = [];
  }

  const summaries: ConsultationSummary[] = [];
  for (const file of files) {
    const base = file.replace(/\.json$/, "");
    if (!isValidConsultationId(base)) continue;
    const record = await readFromLocal(base);
    if (record) summaries.push(toSummary(record));
  }
  return summaries;
}

/** Admin-only listing. Reads every record; fine for moderate volumes. */
export async function listConsultations(): Promise<ConsultationSummary[]> {
  const summaries: ConsultationSummary[] = [];
  const seen = new Set<string>();

  for (const record of memoryStore.values()) {
    seen.add(record.id);
    summaries.push(toSummary(record));
  }

  // Blob path — re-enable with USE_VERCEL_BLOB = true
  if (isVercelBlobEnabled()) {
    try {
      let cursor: string | undefined;
      do {
        const page = await list({
          prefix: BLOB_PREFIX,
          cursor,
          limit: 1000,
          ...blobOptions(),
        });
        for (const blob of page.blobs) {
          const base = blob.pathname.slice(BLOB_PREFIX.length).replace(/\.json$/, "");
          if (!isValidConsultationId(base) || seen.has(base)) continue;
          const record = await readRaw(base);
          if (record) {
            seen.add(record.id);
            summaries.push(toSummary(record));
          }
        }
        cursor = page.hasMore ? page.cursor : undefined;
      } while (cursor);
    } catch (error) {
      console.error("[consultation-store] blob list failed:", error);
      if (isVercel()) throw blobWriteFailure(error);
    }
  }

  if (!isVercel()) {
    for (const summary of await listFromLocal()) {
      if (seen.has(summary.id)) continue;
      summaries.push(summary);
    }
  }

  summaries.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return summaries;
}
