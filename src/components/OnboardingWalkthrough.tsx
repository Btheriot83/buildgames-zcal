"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ONBOARD_CARDS,
  markOnboarded,
  readOnboardStep,
  readOnboarded,
  writeOnboardStep,
  type OnboardCardId,
} from "@/lib/onboarding";
import { DEMO_HOST } from "@/lib/seed";

type Props = {
  slug?: string;
  /** Desk can jump tabs when the card asks for hours/lengths context */
  onFocusTab?: (tab: "availability" | "meetings" | "calendar") => void;
};

function MiniPreview({ id, slug }: { id: OnboardCardId; slug: string }) {
  if (id === "hours") {
    return (
      <div className="ob-mini ob-mini-hours" aria-hidden>
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
          <span key={d} className="ob-mini-day">
            <em>{d}</em>
            <span>9–12 · 1:30–5</span>
          </span>
        ))}
      </div>
    );
  }
  if (id === "lengths") {
    return (
      <div className="ob-mini ob-mini-durs" aria-hidden>
        {[
          ["Intro", "30"],
          ["Walkthrough", "60"],
          ["Check-in", "20"],
        ].map(([t, m]) => (
          <span key={t} className="ob-mini-dur">
            <strong>{m}</strong>
            <em>min</em>
            <span>{t}</span>
          </span>
        ))}
      </div>
    );
  }
  if (id === "link") {
    return (
      <div className="ob-mini ob-mini-link" aria-hidden>
        <code>/b/{slug}</code>
        <span className="ob-mini-path">week → slot → confirm</span>
      </div>
    );
  }
  if (id === "done") {
    return (
      <div className="ob-mini ob-mini-check" aria-hidden>
        <span className="ob-check-mark" aria-hidden>
          ✓
        </span>
        <span>Link ready to share</span>
      </div>
    );
  }
  return (
    <div className="ob-mini ob-mini-desk" aria-hidden>
      <span className="ob-mini-rail" />
      <span className="ob-mini-card" />
    </div>
  );
}

export function OnboardingWalkthrough({ slug = DEMO_HOST.slug, onFocusTab }: Props) {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (readOnboarded()) {
      setActive(false);
      return;
    }
    const s = readOnboardStep();
    setStep(s);
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const card = ONBOARD_CARDS[step];
    if (!card || !onFocusTab) return;
    if (card.id === "hours") onFocusTab("availability");
    if (card.id === "lengths") onFocusTab("meetings");
    if (card.id === "start" || card.id === "done") onFocusTab("calendar");
  }, [active, step, onFocusTab]);

  if (!active) return null;

  const card = ONBOARD_CARDS[step] ?? ONBOARD_CARDS[0];
  const total = ONBOARD_CARDS.length;
  const index = step + 1;

  const finish = () => {
    markOnboarded();
    setActive(false);
  };

  const advance = () => {
    if (card.id === "link") {
      writeOnboardStep(Math.min(step + 1, total - 1));
      setStep((s) => Math.min(s + 1, total - 1));
      // navigation handled by Link CTA
      return;
    }
    if (card.id === "done" || step >= total - 1) {
      finish();
      return;
    }
    const next = step + 1;
    writeOnboardStep(next);
    setStep(next);
  };

  const primaryIsLink = card.id === "link";

  return (
    <div className="ob-root" role="dialog" aria-modal="true" aria-labelledby="ob-title">
      <div className="ob-backdrop" aria-hidden />
      <div className="ob-card surface-card">
        <div className="ob-progress" aria-label={`Step ${index} of ${total}`}>
          {ONBOARD_CARDS.map((c, i) => (
            <span
              key={c.id}
              className={`ob-dot ${i === step ? "is-active" : ""} ${i < step ? "is-done" : ""}`}
            />
          ))}
          <span className="ob-progress-label mono">
            {index} of {total}
          </span>
        </div>

        <MiniPreview id={card.id} slug={slug} />

        <h2 id="ob-title" className="ob-title">
          {card.title}
        </h2>
        <p className="ob-body">{card.body}</p>

        <div className="ob-actions">
          {primaryIsLink ? (
            <Link
              className="btn primary ob-cta"
              href={`/b/${slug}`}
              onClick={() => {
                writeOnboardStep(Math.min(step + 1, total - 1));
              }}
            >
              {card.cta}
            </Link>
          ) : (
            <button type="button" className="btn primary ob-cta" onClick={advance}>
              {card.cta}
            </button>
          )}
          <button type="button" className="btn ghost ob-skip" onClick={finish}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
