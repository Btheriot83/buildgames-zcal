"use client";

import Link from "next/link";
import { DEMO_HOST } from "@/lib/seed";

/** Levels: homepage shows the product doing the job — live bookable mini, not a poster. */
export function HomeLiveMini() {
  const days = [
    { wd: "Mo", n: "15", open: true, slots: ["1:30", "2:00", "2:30"] },
    { wd: "Tu", n: "16", open: true, slots: ["9:00", "9:30", "10:00", "1:30"] },
    { wd: "We", n: "17", open: true, slots: ["9:00", "10:00", "1:30"] },
    { wd: "Th", n: "18", open: true, slots: ["9:30", "2:00", "3:30"] },
    { wd: "Fr", n: "19", open: true, slots: ["9:00", "11:00"] },
    { wd: "Sa", n: "20", open: false, slots: [] as string[] },
    { wd: "Su", n: "21", open: false, slots: [] as string[] },
  ];

  return (
    <div className="home-live surface-card home-live-density" aria-label="Live booking preview">
      <div className="home-live-host">
        <img src="/assets/host-maya.jpg" alt="" width={48} height={48} className="home-live-photo" />
        <div>
          <p className="home-live-name">{DEMO_HOST.displayName}</p>
          <p className="home-live-meta mono">30 min · Intro call</p>
        </div>
      </div>
      <div className="home-live-week-cols" aria-hidden>
        {days.map((d) => (
          <div
            key={d.wd}
            className={`home-live-col ${d.open ? "is-open" : ""} ${d.wd === "Tu" ? "is-active" : ""}`}
          >
            <div className="home-live-col-head">
              <em>{d.wd}</em>
              <strong>{d.n}</strong>
            </div>
            <div className="home-live-col-slots">
              {d.open ? (
                d.slots.map((s, i) => (
                  <span key={s} className={`home-live-slot mono ${d.wd === "Tu" && i === 1 ? "is-active" : ""}`}>
                    {s}
                  </span>
                ))
              ) : (
                <span className="home-live-col-empty">—</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <Link className="home-live-cta btn primary" href={`/b/${DEMO_HOST.slug}`}>
        Open /b/{DEMO_HOST.slug}
      </Link>
      <p className="home-live-foot mono">week columns → slot → one confirm</p>
    </div>
  );
}
