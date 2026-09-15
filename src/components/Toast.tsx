"use client";

export function Toast({ message }: { message: string | null }) {
  return (
    <div
      className={`t-toast sundial-toast ${message ? "is-open" : ""}`}
      role="status"
      aria-live="polite"
    >
      {message ?? ""}
    </div>
  );
}
