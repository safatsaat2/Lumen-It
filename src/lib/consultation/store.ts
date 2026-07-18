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

/**
 * Persistent storage for consultation records.
 *
 * - Uses private Vercel Blob storage when BLOB_READ_WRITE_TOKEN is configured.
 * - Falls back to local files under content/consultations otherwise.
 * - Never uses GitHub: consultation records contain user-provided PII
 *   (answers, optional email) and must not be committed to a repository.
 * - Record ids are random UUIDs and double as unguessable resume tokens.
 */

const LOCAL_DIR = path.join(process.cwd(), "content", "consultations");
const BLOB_PREFIX = "mihis-consultations/";

export class ConsultationStorageError extends Error {}

function isVercel() {
  return process.env.VERCEL === "1";
}

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function assertStorageAvailable(): void {
  if (isVercel() && !hasBlobToken()) {
    throw new ConsultationStorageError(
      "Consultation storage is not configured. Vercel Blob (BLOB_READ_WRITE_TOKEN) " +
        "is required to store consultations on Vercel.",
    );
  }
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

async function readRaw(id: string): Promise<ConsultationRecord | null> {
  if (hasBlobToken()) {
    try {
      const result = await get(blobPathname(id), {
        access: "private",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        storeId: process.env.BLOB_STORE_ID,
        useCache: false,
      });
      if (!result || result.statusCode !== 200 || !result.stream) return null;
      const text = await new Response(result.stream).text();
      return text ? parseRecord(text) : null;
    } catch (error) {
      console.error("[consultation-store] blob read failed:", error);
      return null;
    }
  }

  assertStorageAvailable();

  try {
    const raw = await fs.readFile(localPathname(id), "utf8");
    return parseRecord(raw);
  } catch {
    return null;
  }
}

async function writeRaw(record: ConsultationRecord): Promise<void> {
  const serialized = JSON.stringify(record, null, 2);

  if (hasBlobToken()) {
    await put(blobPathname(record.id), serialized, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      storeId: process.env.BLOB_STORE_ID,
    });
    return;
  }

  assertStorageAvailable();

  await fs.mkdir(LOCAL_DIR, { recursive: true });
  await fs.writeFile(localPathname(record.id), serialized, "utf8");
}

export async function createConsultation(
  input: Pick<ConsultationRecord, "journeyId" | "journeyTitle" | "locale"> & {
    email?: string;
  },
): Promise<ConsultationRecord> {
  assertStorageAvailable();

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

/** Admin-only listing. Reads every record; fine for moderate volumes. */
export async function listConsultations(): Promise<ConsultationSummary[]> {
  assertStorageAvailable();

  const summaries: ConsultationSummary[] = [];

  if (hasBlobToken()) {
    let cursor: string | undefined;
    do {
      const page = await list({
        prefix: BLOB_PREFIX,
        cursor,
        limit: 1000,
        token: process.env.BLOB_READ_WRITE_TOKEN,
        storeId: process.env.BLOB_STORE_ID,
      });
      for (const blob of page.blobs) {
        const base = blob.pathname.slice(BLOB_PREFIX.length).replace(/\.json$/, "");
        if (!isValidConsultationId(base)) continue;
        const record = await readRaw(base);
        if (record) summaries.push(toSummary(record));
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } else {
    let files: string[] = [];
    try {
      files = await fs.readdir(LOCAL_DIR);
    } catch {
      files = [];
    }
    for (const file of files) {
      const base = file.replace(/\.json$/, "");
      if (!isValidConsultationId(base)) continue;
      const record = await readRaw(base);
      if (record) summaries.push(toSummary(record));
    }
  }

  summaries.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return summaries;
}
