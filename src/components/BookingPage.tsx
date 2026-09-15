"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSundial } from "@/lib/useSundial";
import { availableSlots, nextDays } from "@/lib/slots";
import {
  addMonths,
  buildMonthGrid,
  monthLabel,
  todayKeyLocal,
} from "@/lib/calendar";
import { Toast } from "./Toast";
import { SuccessCheck } from "./SuccessCheck";
import { SiteHeader } from "./SiteHeader";
import type { SlotOption } from "@/lib/slots";
import type { MeetingType as MT } from "@/lib/types";
import type { AssistResponse } from "@/lib/assist";

type Step = "pick" | "confirm" | "done";

export function BookingPage({ slug }: { slug: string }) {
  const api = useSundial();
  const today = useMemo(() => todayKeyLocal(), []);
  const now = useMemo(() => {
    const d = new Date();
    return { y: d.getFullYear(), m0: d.getMonth() };
  }, []);

  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [month, setMonth] = useState(now);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [slot, setSlot] = useState<SlotOption | null>(null);
  const [step, setStep] = useState<Step>("pick");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [intent, setIntent] = useState("");
  const [assist, setAssist] = useState<AssistResponse | null>(null);
  const [assistLoading, setAssistLoading] = useState(false);

  const daysAhead = useMemo(() => nextDays(21), []);

  // Auto-pick first open day (gauntlet density) — within Courtyard Meridian
  useEffect(() => {
    if (!api.ready || !api.state) return;
    const mt = api.state.meetingTypes.find((m) => m.id === meetingId) ?? api.state.meetingTypes[0];
    if (!mt) return;
    if (dateKey && availableSlots(api.state, mt, dateKey).length > 0) return;
    for (const dk of daysAhead) {
      if (availableSlots(api.state, mt, dk).length > 0) {
        const [y, m] = dk.split("-").map(Number);
        setMonth({ y, m0: m - 1 });
        setDateKey(dk);
        return;
      }
    }
  }, [api.ready, api.state, meetingId, daysAhead]); // eslint-disable-line react-hooks/exhaustive-deps


  if (!api.ready || !api.state) {
    return (
      <div className="shell book-shell">
        <SiteHeader />
        <div className="t-skel book-skel">
          <div className="skel-block" />
          <div className="skel-block short" />
          <div className="skel-card" />
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
        <section className="book-empty">
          <Image
            src="/assets/empty-book.jpg"
            alt=""
            width={480}
            height={360}
            className="empty-art"
            priority
          />
          <h1 className="display">No host on this page</h1>
          <p className="lede">
            Nothing seeded for <code>/b/{slug}</code> in this browser. Open the{" "}
            <Link href="/desk">host desk</Link> to set Maya&apos;s availability, or import a backup.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" href="/desk">
              Set availability
            </Link>
            <Link className="btn ghost" href="/b/maya">
              Try /b/maya
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const meeting: MT | undefined =
    state.meetingTypes.find((m) => m.id === meetingId) ?? state.meetingTypes[0];
  const activeMeetingId = meeting?.id ?? null;

  const slots =
    meeting && dateKey ? availableSlots(state, meeting, dateKey) : [];

  const grid = buildMonthGrid(month.y, month.m0, today);

  const dayHasSlots = (key: string) => {
    if (!meeting) return false;
    return availableSlots(state, meeting, key).length > 0;
  };

  const runAssist = async () => {
    if (!meeting) return;
    setAssistLoading(true);
    try {
      const candidates = daysAhead.map((dk) => ({
        dateKey: dk,
        slots: availableSlots(state, meeting, dk),
      })).filter((c) => c.slots.length > 0);
      const res = await fetch("/api/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hostName: state.profile.displayName,
          guestIntent: intent,
          meeting,
          availability: state.availability,
          candidates: candidates.slice(0, 10),
        }),
      });
      if (!res.ok) throw new Error("assist failed");
      const data = (await res.json()) as AssistResponse;
      setAssist(data);
    } catch {
      setAssist(null);
      api.flash("Assist unavailable — browse the calendar");
    } finally {
      setAssistLoading(false);
    }
  };

  const applySuggestion = (s: AssistResponse["suggestions"][0]) => {
    const [y, m] = s.dateKey.split("-").map(Number);
    setMonth({ y, m0: m - 1 });
    setDateKey(s.dateKey);
    if (meeting) {
      const found = availableSlots(state, meeting, s.dateKey).find(
        (x) => x.startIso === s.startIso
      );
      if (found) {
        setSlot(found);
        setStep("confirm");
      }
    }
  };

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
    setStep("done");
  };

  if (step === "done") {
    return (
      <div className="shell book-shell">
        <SiteHeader slug={slug} />
        <Toast message={api.toast} />
        <section className="success-pane t-texts-reveal" data-reveal="in">
          <SuccessCheck show />{/* recipe: success-check on book done */}
          <h1 className="display">You&apos;re booked</h1>
          <p className="lede">
            {meeting?.title} with {state.profile.displayName}
            {slot ? ` · ${slot.label}` : ""}
            {dateKey ? ` · ${dateKey}` : ""}.
          </p>
          <p className="muted success-note">
            Written to this browser&apos;s local calendar for the host. No email is sent.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" href="/desk">
              See it on the host desk
            </Link>
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setStep("pick");
                setSlot(null);
                setDateKey(null);
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

      <div className="book-stage t-texts-reveal" data-reveal="in">
        <aside className="book-host">
          <div className="host-portrait" aria-hidden>
            <video
              className="host-video"
              autoPlay
              muted
              loop
              playsInline
              poster="/assets/sundial-hero.jpg"
            >
              <source src="/assets/gnomon-drift.webm" type="video/webm" />
              <source src="/assets/gnomon-drift.mp4" type="video/mp4" />
            </video>
            <img
              src="/assets/sundial-hero.jpg"
              alt=""
              className="host-photo"
              width={280}
              height={280}
            />
          </div>
          <p className="eyebrow">Public booking · pick a slot</p>
          <h1 className="display host-name">{state.profile.displayName}</h1>
          <p className="host-headline">{state.profile.headline}</p>
          <p className="host-tz mono">{state.profile.timezone}</p>

          <div className="meet-list" role="listbox" aria-label="Meeting type">
            {state.meetingTypes.map((m) => (
              <button
                key={m.id}
                type="button"
                role="option"
                aria-selected={activeMeetingId === m.id}
                className={`meet-card ${activeMeetingId === m.id ? "is-active" : ""}`}
                onClick={() => {
                  setMeetingId(m.id);
                  setSlot(null);
                  setStep("pick");
                  setAssist(null);
                }}
              >
                <span className="meet-row">
                  <span className="meet-title">{m.title}</span>
                  <span className="meet-meta mono">{m.durationMin} min</span>
                </span>
                <span className="meet-desc">{m.description}</span>
              </button>
            ))}
          </div>

          <div className="assist-box">
            <label className="assist-label">
              Anything I should know?
              <input
                className="t-input"
                placeholder="e.g. courtyard intro before noon, shade coffee…"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
              />
            </label>
            <button
              type="button"
              className="btn secondary sm assist-btn"
              disabled={assistLoading || !meeting}
              onClick={runAssist}
            >
              {assistLoading ? "Checking open hours…" : "Find a good hour"}
            </button>
            {assist ? (
              <div className="assist-result">
                <p className="assist-copy">{assist.copy}</p>
                <ul className="assist-suggestions">
                  {assist.suggestions.map((s) => (
                    <li key={s.startIso}>
                      <button
                        type="button"
                        className="assist-chip"
                        onClick={() => applySuggestion(s)}
                      >
                        <strong>
                          {s.dateKey} · {s.label}
                        </strong>
                        <span>{s.reason}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="assist-note mono">{assist.mode === "local" ? "Local ranking" : "Live model"} · {assist.note}</p>
              </div>
            ) : null}
          </div>
        </aside>

        <section className="book-card">
          {step === "confirm" && slot && meeting && dateKey ? (
            <div className={`confirm-flow ${api.errorShake ? "is-shaking" : ""}`} data-transition="error-state-shake">
              <button
                type="button"
                className="back-link"
                onClick={() => setStep("pick")}
              >
                ← Back to times
              </button>
              <h2 className="panel-title">Confirm</h2>
              <p className="confirm-summary">
                <strong>{meeting.title}</strong>
                <span>
                  {new Date(dateKey + "T12:00:00").toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  · {slot.label}
                </span>
                <span className="muted">{meeting.durationMin} min · {state.profile.timezone}</span>
              </p>
              <div className="grid-2">
                <label>
                  Your name
                  <input
                    className={`t-input ${err ? "is-error is-shaking" : ""}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </label>
                <label>
                  Email
                  <input
                    className={`t-input ${err ? "is-error is-shaking" : ""}`}
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
                className="btn primary confirm-cta"
                disabled={!name.trim() || !email.includes("@")}
                onClick={submit}
              >
                Confirm booking
              </button>
            </div>
          ) : (
            <div className="pick-flow">
              <h2 className="book-job-label">Select date and time</h2>
              {meeting ? (
                <p className="card-meeting-chip mono">
                  {meeting.title} · {meeting.durationMin} min · {state.profile.timezone.replace(/_/g, " ")}
                </p>
              ) : null}
              <div className="cal-head">
                <h3 className="panel-title cal-month-label">{monthLabel(month.y, month.m0)}</h3>
                <div className="cal-nav">
                  <button
                    type="button"
                    className="btn ghost sm"
                    aria-label="Previous month"
                    onClick={() => setMonth((m) => addMonths(m.y, m.m0, -1))}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="btn ghost sm"
                    aria-label="Next month"
                    onClick={() => setMonth((m) => addMonths(m.y, m.m0, 1))}
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="cal-weekdays" aria-hidden>
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <span key={`${d}-${i}`}>{d}</span>
                ))}
              </div>

              <div className="cal-grid" role="grid" aria-label="Choose a day">
                {grid.map((cell) => {
                  const open = cell.inMonth && !cell.isPast && dayHasSlots(cell.key);
                  const disabled = !cell.inMonth || cell.isPast || !dayHasSlots(cell.key);
                  return (
                    <button
                      key={cell.key + (cell.inMonth ? "" : "-out")}
                      type="button"
                      role="gridcell"
                      disabled={disabled}
                      className={[
                        "cal-day",
                        cell.inMonth ? "in-month" : "out-month",
                        cell.isToday ? "is-today" : "",
                        dateKey === cell.key ? "is-active" : "",
                        open ? "is-open" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => {
                        setDateKey(cell.key);
                        setSlot(null);
                      }}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>

              <div className="book-tz-foot" aria-label="Timezone">
                <span className="book-tz-globe" aria-hidden>🌐</span>
                <span className="book-tz-label mono">{state.profile.timezone.replace(/_/g, " ")}</span>
              </div>

              <div className="slot-pane">
                <h3 className="slot-heading">
                  {dateKey ? (
                    <>
                      <span className="slot-globe" aria-hidden>🌐</span>
                      <span>
                        {new Date(dateKey + "T12:00:00").toLocaleDateString(undefined, {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </>
                  ) : (
                    "Pick an open day"
                  )}
                </h3>
                {!dateKey ? (
                  <div className="slot-empty">
                    <Image
                      src="/assets/empty-book.jpg"
                      alt=""
                      width={220}
                      height={165}
                      className="slot-empty-art"
                    />
                    <p className="muted">Sage days are open hours — tap one to see times.</p>
                  </div>
                ) : slots.length === 0 ? (
                  <p className="muted">No open hours left this day — try another sage mark.</p>
                ) : (
                  <div className="slot-groups">
                    {[
                      { title: "Morning", items: slots.filter((s) => s.startMin < 12 * 60) },
                      { title: "Afternoon", items: slots.filter((s) => s.startMin >= 12 * 60 && s.startMin < 17 * 60) },
                      { title: "Evening", items: slots.filter((s) => s.startMin >= 17 * 60) },
                    ]
                      .filter((g) => g.items.length)
                      .map((g) => (
                        <div key={g.title} className="slot-group">
                          <p className="slot-group-label">{g.title}</p>
                          <div className="slot-grid">
                            {g.items.map((s, i) => (
                              <button
                                key={s.startIso}
                                type="button"
                                className={`slot-chip mono ${slot?.startIso === s.startIso ? "is-active" : ""}`}
                                style={{ animationDelay: `${i * 18}ms` }}
                                onClick={() => {
                                  setSlot(s);
                                  setStep("confirm");
                                }}
                              >
                                {s.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
