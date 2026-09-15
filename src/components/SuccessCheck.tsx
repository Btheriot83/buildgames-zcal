"use client";

export function SuccessCheck({ show }: { show: boolean }) {
  return (
    <span className="t-success-check" data-state={show ? "in" : "out"} aria-hidden="true">
      <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.35" />
        <path
          d="M14 25.5 L21 32.5 L34 16.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
