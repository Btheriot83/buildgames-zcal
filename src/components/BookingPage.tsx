"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSundial } from "@/lib/useSundial";
import { availableSlots, nextDays } from "@/lib/slots";
import { Toast } from "./Toast";
import { SuccessCheck } from "./SuccessCheck";
import { SiteHeader } from "./SiteHeader";
import { SundialMark } from "./SundialMark";
import type { SlotOption } from "@/lib/slots";
import type { MeetingType as MT } from "@/lib/types";

export function BookingPage({ slug }: { slug: string }) {
  const api = useSundial();
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [slot, setSlot] = useState<SlotOption | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const days = useMemo(() => nextDays(14), []);

  if (!api.ready || !api.state) {
    return (
      <div className="shell book-shell">
        <SiteHeader />
        <div className="t-skel">
          <div className="t-skel-skeleton is-pulsing">
            <div className="skel-block" />
            <div className="skel-block short" />
          </div>
        </div>
      </div>
    );
  }

  const { state } = api;
  const isHostSlug = state.profile.slug === slug;

  if (!isHostSlug) {
    return (
      <div className="shell book-shell">
        <SiteHeader />
        <section className="book-hero">
          <h1 className="display">Unknown page</h1>
          <p className="lede">
            No host profile for <code>/{slug}</code> in this browser&apos;s IndexedDB. Open the{" "}
            <Link href="/desk">desk</Link> to seed the sample host, or import a backup.
          </p>
        </section>
      </div>
    );
  }

  const meeting: MT | undefined =
    state.meetingTypes.find((m) => m.id === meetingId) ?? state.meetingTypes[0];

  const activeMeetingId = meeting?.id ?? null;
  const slots =
    meeting && dateKey ? availableSlots(state, meeting, dateKey) : [];

  const submit = async () => {
    if (!meeting || !slot) return;
    setErr(null);
    const res = await api.book({
      meetingTypeId: meeting.id,
      guestName: name,
      guestEmail: email,
      note,
      startIso: slot.startIso,
      endIso: slot.endIso,
    });
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="shell book-shell">
        <SiteHeader slug={slug} />
        <Toast message={api.toast} />
        <section className="success-pane t-texts-reveal" data-reveal="in">
          <SuccessCheck show />
          <h1 className="display">You&apos;re on the sundial</h1>
          <p className="lede">
            {meeting?.title} with {state.profile.displayName}
            {slot ? ` · ${slot.label}` : ""}.
          </p>
          <p className="muted">
            Event written to the local calendar store in this browser. Confirmation email is not
            sent (no accounts / no mailer).
          </p>
          <div className="hero-actions">
            <Link className="btn primary" href="/desk">
              View host desk
            </Link>
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setDone(false);
                setSlot(null);
                setName("");
                setEmail("");
                setNote("");
              }}
            >
              Book another
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="shell book-shell">
      <SiteHeader slug={slug} />
      <Toast message={api.toast} />

      <section className="book-hero t-texts-reveal" data-reveal="in">
        <div>
          <p className="eyebrow">Book time</p>
          <h1 className="display">{state.profile.displayName}</h1>
          <p className="lede">{state.profile.headline}</p>
          <p className="degraded">{state.profile.accentNote}</p>
        </div>
        <SundialMark size={120} />
      </section>

      <div className="book-grid">
        <aside className="meet-col">
          <h2 className="panel-title">Meeting</h2>
          <div className="t-tabs vertical" role="tablist">
            {state.meetingTypes.map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                className={`meet-card ${activeMeetingId === m.id ? "is-active" : ""}`}
                onClick={() => {
                  setMeetingId(m.id);
                  setSlot(null);
                }}
              >
                <strong>{m.title}</strong>
                <span className="muted">{m.durationMin} min</span>
                <p>{m.description}</p>
              </button>
            ))}
          </div>
        </aside>

        <section className="day-col">
          <h2 className="panel-title">Day</h2>
          <div className="day-grid">
            {days.map((dk) => {
              const d = new Date(dk + "T12:00:00");
              const label = d.toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              });
              return (
                <button
                  key={dk}
                  type="button"
                  className={`day-chip ${dateKey === dk ? "is-active" : ""}`}
                  onClick={() => {
                    setDateKey(dk);
                    setSlot(null);
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="slot-col">
          <h2 className="panel-title">Time</h2>
          {!dateKey ? (
            <p className="muted">Pick a day.</p>
          ) : slots.length === 0 ? (
            <p className="muted">No open slots this day.</p>
          ) : (
            <div className="slot-grid">
              {slots.map((s) => (
                <button
                  key={s.startIso}
                  type="button"
                  className={`slot-chip mono ${slot?.startIso === s.startIso ? "is-active" : ""}`}
                  onClick={() => setSlot(s)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className={`confirm-panel ${api.errorShake ? "is-shaking" : ""}`}>
        <h2 className="panel-title">Confirm</h2>
        <div className="grid-2">
          <label>
            Your name
            <input
              className={`t-input ${err ? "is-error" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </label>
          <label>
            Email
            <input
              className={`t-input ${err ? "is-error" : ""}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
        </div>
        <label>
          Note (optional)
          <textarea
            className="t-input"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        {err ? <p className="t-error-msg is-error">{err}</p> : null}
        <button
          type="button"
          className="btn primary"
          disabled={!slot || !meeting}
          onClick={submit}
        >
          Reserve slot
        </button>
      </section>
    </div>
  );
}
