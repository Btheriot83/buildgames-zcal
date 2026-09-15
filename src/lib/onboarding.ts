/** Clearline friend-walkthrough persistence — see docs/ONBOARDING.md */

export const ONBOARD_DONE_KEY = "clearline.onboarded.v1";
export const ONBOARD_STEP_KEY = "clearline.onboard.step.v1";

export type OnboardCardId = "start" | "hours" | "lengths" | "link" | "done";

export type OnboardCard = {
  id: OnboardCardId;
  title: string;
  body: string;
  cta: string;
};

/** Hand-locked copy — wire exactly (hand-rewrite-copy). */
export const ONBOARD_CARDS: OnboardCard[] = [
  {
    id: "start",
    title: "Hey — let's get your booking page live.",
    body: "I'll stay beside you for a minute. Skip anytime if you already know the drill.",
    cta: "Walk me through it",
  },
  {
    id: "hours",
    title: "Your hours are already on.",
    body: "Mon–Fri studio windows are seeded. Tweak them on the desk whenever you want — guests see what you save.",
    cta: "Got the hours",
  },
  {
    id: "lengths",
    title: "Guests pick a length.",
    body: "Intro, Walkthrough, Check-in — three cards, one tap. Add more later if you need them.",
    cta: "Next",
  },
  {
    id: "link",
    title: "This is your link.",
    body: "/b/maya — open it, scan the week, take a slot, confirm once. That's the whole job.",
    cta: "Open my page",
  },
  {
    id: "done",
    title: "You're set.",
    body: "Share that link when someone asks for time. I'll get out of the way.",
    cta: "Done",
  },
];

export function readOnboarded(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(ONBOARD_DONE_KEY) === "1";
  } catch {
    return true;
  }
}

export function readOnboardStep(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(ONBOARD_STEP_KEY);
    if (raw == null) return 0;
    const n = Number(raw);
    if (!Number.isFinite(n) || n < 0) return 0;
    return Math.min(n, ONBOARD_CARDS.length - 1);
  } catch {
    return 0;
  }
}

export function writeOnboardStep(step: number): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ONBOARD_STEP_KEY, String(step));
  } catch {
    /* private mode */
  }
}

export function markOnboarded(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ONBOARD_DONE_KEY, "1");
    window.localStorage.removeItem(ONBOARD_STEP_KEY);
  } catch {
    /* private mode */
  }
}

export function clearOnboardFlags(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(ONBOARD_DONE_KEY);
    window.localStorage.removeItem(ONBOARD_STEP_KEY);
  } catch {
    /* private mode */
  }
}
