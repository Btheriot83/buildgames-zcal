"use client";

import { OnboardingWalkthrough } from "./OnboardingWalkthrough";
import { DEMO_HOST } from "@/lib/seed";

/** First-run friend walkthrough on the marketing home — same persist keys as desk. */
export function HomeOnboard() {
  return <OnboardingWalkthrough slug={DEMO_HOST.slug} />;
}
