//** @vitest-environment jsdom */
import { describe, expect, it, beforeEach } from "vitest";
import {
  ONBOARD_CARDS,
  ONBOARD_DONE_KEY,
  ONBOARD_STEP_KEY,
  markOnboarded,
  readOnboardStep,
  readOnboarded,
  writeOnboardStep,
  clearOnboardFlags,
} from "./onboarding";

describe("onboarding copy deck", () => {
  it("caps at 5 friend-voice cards", () => {
    expect(ONBOARD_CARDS.length).toBeLessThanOrEqual(5);
    expect(ONBOARD_CARDS.length).toBeGreaterThanOrEqual(3);
    for (const c of ONBOARD_CARDS) {
      expect(c.title.length).toBeGreaterThan(8);
      expect(c.cta.length).toBeGreaterThan(2);
      expect(c.title).not.toMatch(/AI-powered|✨|New!/i);
    }
  });
});

describe("onboarding persistence", () => {
  beforeEach(() => {
    clearOnboardFlags();
  });

  it("starts not onboarded with step 0", () => {
    expect(readOnboarded()).toBe(false);
    expect(readOnboardStep()).toBe(0);
  });

  it("resumes step and completes without replay", () => {
    writeOnboardStep(2);
    expect(window.localStorage.getItem(ONBOARD_STEP_KEY)).toBe("2");
    expect(readOnboardStep()).toBe(2);
    markOnboarded();
    expect(readOnboarded()).toBe(true);
    expect(window.localStorage.getItem(ONBOARD_DONE_KEY)).toBe("1");
    expect(window.localStorage.getItem(ONBOARD_STEP_KEY)).toBeNull();
  });
});
