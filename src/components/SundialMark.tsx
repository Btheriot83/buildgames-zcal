"use client";

/** Desk mark — Clearline still, flat chrome (no CSS gradient disc). */
export function SundialMark({ size = 160 }: { size?: number }) {
  return (
    <div
      className="sundial-mark"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="sundial-mark-photo"
        src="/assets/sundial-hero.jpg"
        alt=""
        width={size}
        height={size}
      />
    </div>
  );
}
