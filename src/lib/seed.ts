import { nanoid } from "nanoid";
import type { DayAvailability, MeetingType, Profile, SundialState } from "./types";

export const PRODUCT = {
  name: "Sundial",
  tagline: "Set your hours. Guests book a slot.",
  aesthetic: "Courtyard Meridian",
} as const;

/** Canonical demo host — never Brandon smoke. */
export const DEMO_HOST = {
  slug: "maya",
  displayName: "Maya Ortega",
  headline: "Courtyard studio hours — Phoenix",
  timezone: "America/Phoenix",
  accentNote: "Bookings stay in this browser until you export.",
} as const;

const week: DayAvailability[] = [0, 1, 2, 3, 4, 5, 6].map((weekday) => ({
  weekday: weekday as DayAvailability["weekday"],
  enabled: weekday >= 1 && weekday <= 5,
  windows:
    weekday >= 1 && weekday <= 5
      ? [
          { startMin: 9 * 60, endMin: 12 * 60 },
          { startMin: 13 * 60 + 30, endMin: 17 * 60 },
        ]
      : [],
}));

const meetings: MeetingType[] = [
  {
    id: "mt-courtyard",
    title: "Courtyard intro",
    durationMin: 30,
    description: "First chat under the linen — what you're shipping and where you're stuck.",
    bufferMin: 10,
  },
  {
    id: "mt-walkthrough",
    title: "Draft walkthrough",
    durationMin: 60,
    description: "Walk a deck, prototype, or sticky product decision together.",
    bufferMin: 15,
  },
  {
    id: "mt-shade",
    title: "Shade coffee",
    durationMin: 20,
    description: "Short catch-up. No deck required — just a warm open hour.",
    bufferMin: 5,
  },
];

export function seedState(): SundialState {
  const profile: Profile = {
    slug: DEMO_HOST.slug,
    displayName: DEMO_HOST.displayName,
    headline: DEMO_HOST.headline,
    timezone: DEMO_HOST.timezone,
    accentNote: DEMO_HOST.accentNote,
  };

  return {
    version: 1,
    profile,
    availability: week,
    meetingTypes: meetings,
    bookings: [],
    calendar: [],
  };
}

export function newId(prefix = "id") {
  return `${prefix}_${nanoid(10)}`;
}

/** True when stored state is leftover Brandon smoke / pre-R2 sample. */
export function isSmokeHost(state: SundialState | null | undefined): boolean {
  if (!state?.profile) return true;
  const slug = state.profile.slug?.toLowerCase() ?? "";
  const name = state.profile.displayName?.toLowerCase() ?? "";
  return (
    slug === "brandon" ||
    slug === "sample" ||
    name.includes("brandon") ||
    name.includes("smoke") ||
    state.meetingTypes.some((m) => /intro call|deep work review|coffee chat/i.test(m.title))
  );
}
