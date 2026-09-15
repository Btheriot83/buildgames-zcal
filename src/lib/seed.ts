import { nanoid } from "nanoid";
import type { DayAvailability, MeetingType, Profile, SundialState } from "./types";

export const PRODUCT = {
  name: "Sundial",
  tagline: "Freeform hours. Quiet bookings.",
  aesthetic: "Sundial Atelier",
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
    id: "mt-intro",
    title: "Intro call",
    durationMin: 30,
    description: "A short hello — what you're building and how I can help.",
    bufferMin: 10,
  },
  {
    id: "mt-deep",
    title: "Deep work review",
    durationMin: 60,
    description: "Walk a draft, a deck, or a sticky product decision.",
    bufferMin: 15,
  },
  {
    id: "mt-coffee",
    title: "Coffee chat",
    durationMin: 20,
    description: "No agenda. Just a warm slot on the sundial.",
    bufferMin: 5,
  },
];

export function seedState(): SundialState {
  const profile: Profile = {
    slug: "brandon",
    displayName: "Brandon Theriot",
    headline: "Build Games · scheduling without the SaaS fog",
    timezone: "America/Phoenix",
    accentNote: "Local calendar only — Google Calendar not connected (degraded mode).",
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
