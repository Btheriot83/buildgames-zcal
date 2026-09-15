/** Month-grid helpers for the public booking card */

export function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function toDateKey(y: number, m0: number, d: number) {
  return `${y}-${pad(m0 + 1)}-${pad(d)}`;
}

export function parseDateKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return { y, m0: m - 1, d };
}

export function addMonths(y: number, m0: number, delta: number) {
  const d = new Date(y, m0 + delta, 1);
  return { y: d.getFullYear(), m0: d.getMonth() };
}

export function monthLabel(y: number, m0: number) {
  return new Date(y, m0, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

export type DayCell = {
  key: string;
  day: number;
  inMonth: boolean;
  isToday: boolean;
  isPast: boolean;
};

/** Sunday-start month grid (6 weeks). */
export function buildMonthGrid(y: number, m0: number, todayKey: string): DayCell[] {
  const first = new Date(y, m0, 1);
  const startPad = first.getDay(); // 0=Sun
  const daysInMonth = new Date(y, m0 + 1, 0).getDate();
  const cells: DayCell[] = [];
  const prevDays = new Date(y, m0, 0).getDate();

  for (let i = 0; i < startPad; i++) {
    const day = prevDays - startPad + 1 + i;
    const py = m0 === 0 ? y - 1 : y;
    const pm = m0 === 0 ? 11 : m0 - 1;
    const key = toDateKey(py, pm, day);
    cells.push({
      key,
      day,
      inMonth: false,
      isToday: key === todayKey,
      isPast: key < todayKey,
    });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const key = toDateKey(y, m0, day);
    cells.push({
      key,
      day,
      inMonth: true,
      isToday: key === todayKey,
      isPast: key < todayKey,
    });
  }
  while (cells.length < 42) {
    const i = cells.length - (startPad + daysInMonth);
    const day = i + 1;
    const ny = m0 === 11 ? y + 1 : y;
    const nm = m0 === 11 ? 0 : m0 + 1;
    const key = toDateKey(ny, nm, day);
    cells.push({
      key,
      day,
      inMonth: false,
      isToday: key === todayKey,
      isPast: key < todayKey,
    });
  }
  return cells;
}

export function todayKeyLocal() {
  const d = new Date();
  return toDateKey(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Rolling day strip for week-density booking (SavvyCal steal). */
export type StripDay = {
  key: string;
  day: number;
  weekday: string;
  weekdayShort: string;
  isToday: boolean;
  isPast: boolean;
};

export function addDaysKey(key: string, delta: number): string {
  const { y, m0, d } = parseDateKey(key);
  const dt = new Date(y, m0, d + delta);
  return toDateKey(dt.getFullYear(), dt.getMonth(), dt.getDate());
}

/** Build `count` consecutive days starting at `startKey` (inclusive). */
export function buildDayStrip(startKey: string, count: number, todayKey: string): StripDay[] {
  const out: StripDay[] = [];
  for (let i = 0; i < count; i++) {
    const key = addDaysKey(startKey, i);
    const { y, m0, d } = parseDateKey(key);
    const label = new Date(y, m0, d).toLocaleDateString(undefined, { weekday: "short" });
    out.push({
      key,
      day: d,
      weekday: label,
      weekdayShort: label.slice(0, 2),
      isToday: key === todayKey,
      isPast: key < todayKey,
    });
  }
  return out;
}

/** Monday of the week containing `key` (local). */
export function startOfWeekMonday(key: string): string {
  const { y, m0, d } = parseDateKey(key);
  const dt = new Date(y, m0, d);
  const dow = dt.getDay(); // 0 Sun
  const delta = dow === 0 ? -6 : 1 - dow;
  dt.setDate(dt.getDate() + delta);
  return toDateKey(dt.getFullYear(), dt.getMonth(), dt.getDate());
}

export function weekRangeLabel(startKey: string, endKey: string): string {
  const a = parseDateKey(startKey);
  const b = parseDateKey(endKey);
  const left = new Date(a.y, a.m0, a.d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const right = new Date(b.y, b.m0, b.d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${left} – ${right}`;
}
