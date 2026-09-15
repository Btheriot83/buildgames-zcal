import type { Booking, DayAvailability, MeetingType, SundialState } from "./types";

export function formatMin(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/** Local-date key YYYY-MM-DD in a given IANA zone (best-effort via Intl). */
export function dateKeyInZone(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const y = parts.find((p) => p.type === "year")!.value;
  const m = parts.find((p) => p.type === "month")!.value;
  const d = parts.find((p) => p.type === "day")!.value;
  return `${y}-${m}-${d}`;
}

export function weekdayInZone(date: Date, timeZone: string): number {
  const w = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short" }).format(date);
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return map[w] ?? date.getDay();
}

/** Build a Date for Y-M-D + minutes in host timezone approximated as offset-fixed Phoenix (UTC-7). */
export function wallToUtcIso(dateKey: string, startMin: number, timeZone: string): string {
  // America/Phoenix is UTC-7 year-round — exact for Brandon demo.
  // For other zones we still treat as fixed offset from Intl when possible.
  const offsetMin = guessOffsetMinutes(dateKey, timeZone);
  const [y, m, d] = dateKey.split("-").map(Number);
  const utcMs = Date.UTC(y, m - 1, d, 0, 0) + startMin * 60_000 + offsetMin * 60_000;
  return new Date(utcMs).toISOString();
}

function guessOffsetMinutes(dateKey: string, timeZone: string): number {
  if (timeZone === "America/Phoenix") return 7 * 60; // add to local to get UTC
  try {
    const probe = new Date(`${dateKey}T12:00:00Z`);
    const local = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(probe);
    const [hh, mm] = local.split(":").map(Number);
    const localMin = hh * 60 + mm;
    const utcMin = 12 * 60;
    // offset such that utc = local + offset
    let diff = utcMin - localMin;
    if (diff < -12 * 60) diff += 24 * 60;
    if (diff > 12 * 60) diff -= 24 * 60;
    return diff;
  } catch {
    return 7 * 60;
  }
}

export interface SlotOption {
  startMin: number;
  endMin: number;
  startIso: string;
  endIso: string;
  label: string;
}

function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && bStart < aEnd;
}

export function availableSlots(
  state: SundialState,
  meeting: MeetingType,
  dateKey: string
): SlotOption[] {
  const tz = state.profile.timezone;
  const [y, m, d] = dateKey.split("-").map(Number);
  const noonUtc = new Date(Date.UTC(y, m - 1, d, 19, 0)); // rough midday for weekday
  const weekday = weekdayInZone(noonUtc, tz);
  const day: DayAvailability | undefined = state.availability.find((a) => a.weekday === weekday);
  if (!day || !day.enabled || day.windows.length === 0) return [];

  const busy = [...state.bookings, ...state.calendar].map((b) => ({
    start: new Date(b.startIso).getTime(),
    end: new Date(b.endIso).getTime(),
  }));

  const slots: SlotOption[] = [];
  const step = 15;
  for (const win of day.windows) {
    for (let t = win.startMin; t + meeting.durationMin <= win.endMin; t += step) {
      const end = t + meeting.durationMin;
      const startIso = wallToUtcIso(dateKey, t, tz);
      const endIso = wallToUtcIso(dateKey, end, tz);
      const startMs = new Date(startIso).getTime();
      const endMs = new Date(endIso).getTime();
      const bufferMs = meeting.bufferMin * 60_000;
      const conflict = busy.some((b) =>
        overlaps(startMs - bufferMs, endMs + bufferMs, b.start, b.end)
      );
      if (conflict) continue;
      if (startMs < Date.now() + 5 * 60_000) continue;
      slots.push({
        startMin: t,
        endMin: end,
        startIso,
        endIso,
        label: formatMin(t),
      });
    }
  }
  return slots;
}

export function nextDays(count: number, from = new Date()): string[] {
  const keys: string[] = [];
  const d = new Date(from);
  for (let i = 0; i < count + 14 && keys.length < count; i++) {
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    keys.push(key);
    d.setDate(d.getDate() + 1);
  }
  return keys.slice(0, count);
}

export function bookingTitle(b: Booking, state: SundialState): string {
  const mt = state.meetingTypes.find((m) => m.id === b.meetingTypeId);
  return `${mt?.title ?? "Meeting"} · ${b.guestName}`;
}
