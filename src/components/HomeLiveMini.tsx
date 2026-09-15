"use client";

import Link from "next/link";
import { DEMO_HOST } from "@/lib/seed";

/** Levels: homepage shows the product doing the job — live bookable mini, not a poster. */
export function HomeLiveMini() {
  const days = [
    { wd: "Mon", n: "16", open: true, count: 8 },
    { wd: "Tue", n: "17", open: true, count: 6 },
    { wd: "Wed", n: "18", open: true, count: 7 },
    { wd: "Thu", n: "19", open: false, count: 0 },
    { wd: "Fri", n: "20", open: true, count: 5 },
    { wd: "Sat", n: "21", open: false, count: 0 },
    { wd: "Sun", n: "22", open: false, count: 0 },
  ];
  const slots = ["9:00 AM", "9:30 AM", "10:00 AM", "1:30 PM", "2:00 PM", "3:30 PM"];

  return (
    <div className="home-live surface-card" aria-label="Live booking preview">
      <div className="home-live-host">
        <img src="/assets/host-maya.jpg" alt="" width={56} height={56} className="home-live-photo" />
        <div>
          <p className="home-live-name">{DEMO_HOST.displayName}</p>
          <p className="home-live-meta mono">{DEMO_HOST.headline}</p>
        </div>
      </div>
      <div className="home-live-durs" aria-hidden>
        <span className="home-live-dur is-active">30 min</span>
        <span className="home-live-dur">60 min</span>
        <span className="home-live-dur">20 min</span>
      </div>
      <div className="home-live-week" aria-hidden>
        {days.map((d) => (
          <span
            key={d.wd}
            className={`home-live-day ${d.open ? "is-open" : ""} ${d.wd === "Tue" ? "is-active" : ""}`}
          >
            <em>{d.wd}</em>
            <strong>{d.n}</strong>
            <i>{d.open ? d.count : "·"}</i>
          </span>
        ))}
      </div>
      <div className="home-live-slots" aria-hidden>
        {slots.map((s, i) => (
          <span key={s} className={`home-live-slot mono ${i === 1 ? "is-active" : ""}`}>
            {s}
          </span>
        ))}
      </div>
      <Link className="home-live-cta btn primary" href={`/b/${DEMO_HOST.slug}`}>
        Try the live page
      </Link>
      <p className="home-live-foot mono">/b/{DEMO_HOST.slug} · week → slot → confirm</p>
    </div>
  );
}
