"use client";

/** Decorative sundial — CSS conic + rotating gnomon (craft, not chrome). */
export function SundialMark({ size = 160 }: { size?: number }) {
  return (
    <div
      className="sundial-mark"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="sundial-face" />
      <div className="sundial-gnomon" />
      <div className="sundial-tick sundial-tick-n" />
      <div className="sundial-tick sundial-tick-e" />
      <div className="sundial-tick sundial-tick-s" />
      <div className="sundial-tick sundial-tick-w" />
    </div>
  );
}
