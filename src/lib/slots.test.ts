import { describe, expect, it } from "vitest";
import { availableSlots, formatMin, wallToUtcIso } from "./slots";
import { seedState } from "./seed";

describe("slots", () => {
  it("formats minutes", () => {
    expect(formatMin(9 * 60)).toBe("9:00 AM");
    expect(formatMin(13 * 60 + 30)).toBe("1:30 PM");
  });

  it("builds phoenix wall times", () => {
    const iso = wallToUtcIso("2026-09-15", 9 * 60, "America/Phoenix");
    // 9:00 AM MST = 16:00 UTC
    expect(iso.startsWith("2026-09-15T16:00:00")).toBe(true);
  });

  it("returns weekday slots for seeded availability", () => {
    const state = seedState();
    // Pick a Monday far ahead
    const slots = availableSlots(state, state.meetingTypes[0], "2026-09-21");
    expect(slots.length).toBeGreaterThan(0);
    expect(slots[0].label).toMatch(/AM|PM/);
  });
});
