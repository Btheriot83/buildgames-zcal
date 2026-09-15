"use client";

import { openDB, type IDBPDatabase } from "idb";
import { isSmokeHost, seedState } from "./seed";
import type { SundialState } from "./types";

const DB_NAME = "sundial-atelier";
const STORE = "state";
const KEY = "primary";

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      },
    });
  }
  return dbPromise;
}

export async function loadState(): Promise<SundialState> {
  try {
    const db = await getDb();
    const existing = (await db.get(STORE, KEY)) as SundialState | undefined;
    if (existing?.version === 2 && !isSmokeHost(existing)) {
      return existing;
    }
    // Clearline reseed (v2) or cheesy/smoke leftovers
    const fresh = seedState();
    await db.put(STORE, fresh, KEY);
    return fresh;
  } catch {
    // IndexedDB unavailable (private mode quirks) — fall back to seed in memory
  }
  return seedState();
}

export async function saveState(state: SundialState): Promise<void> {
  try {
    const db = await getDb();
    await db.put(STORE, state, KEY);
  } catch {
    // degraded: in-memory only for this session
  }
}

export async function resetState(): Promise<SundialState> {
  const fresh = seedState();
  await saveState(fresh);
  return fresh;
}

export function exportJson(state: SundialState): string {
  return JSON.stringify(state, null, 2);
}

export function importJson(raw: string): SundialState {
  const parsed = JSON.parse(raw) as SundialState;
  if (parsed?.version !== 2 || !parsed.profile?.slug) {
    throw new Error("Invalid Sundial export");
  }
  return parsed;
}
