"use client";

export function Toast({ message }: { message: string | null }) {
  return (
    <div
      className={`t-toast sundial-toast ${message ? "is-open" : ""}`} data-recipe="toast"
      role="status"
      aria-live="polite"
    >
      {message ?? ""}
    </div>
  );
}
