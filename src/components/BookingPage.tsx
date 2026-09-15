"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSundial } from "@/lib/useSundial";
import { availableSlots, nextDays } from "@/lib/slots";
import {
  addDaysKey,
  addMonths,
  buildDayStrip,
  buildMonthGrid,
  monthLabel,
  startOfWeekMonday,
  todayKeyLocal,
  weekRangeLabel,
} from "@/lib/calendar";
import { Toast } from "./Toast";
import { SuccessCheck } from "./SuccessCheck";
import { SiteHeader } from "./SiteHeader";
import type { SlotOption } from "@/lib/slots";
import type { MeetingType as MT } from "@/lib/types";

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
  const [weekStart, setWeekStart] = useState(() => startOfWeekMonday(todayKeyLocal()));
  const [calMode, setCalMode] = useState<"week" | "month">("week");
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [slot, setSlot] = useState<SlotOption | null>(null);
  const [step, setStep] = useState<Step>("pick");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const daysAhead = useMemo(() => nextDays(21), []);

  // Auto-pick first open day (gauntlet density) — Clearline
  useEffect(() => {
    if (!api.ready || !api.state) return;
    const mt = api.state.meetingTypes.find((m) => m.id === meetingId) ?? api.state.meetingTypes[0];
    if (!mt) return;
    if (dateKey && availableSlots(api.state, mt, dateKey).length > 0) return;
    for (const dk of daysAhead) {
      if (availableSlots(api.state, mt, dk).length > 0) {
        const [y, m] = dk.split("-").map(Number);
        setMonth({ y, m0: m - 1 });
        setWeekStart(startOfWeekMonday(dk));
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
    <div className="shell book-shell book-shell-product">
      <div className="book-brand-rail" aria-label="Sundial">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden />
          <span className="brand-name">Sundial</span>
        </Link>
        <Link className="book-desk-link" href="/desk">
          Host desk
        </Link>
      </div>
      <Toast message={api.toast} />

      <div className="book-stage t-texts-reveal" data-reveal="in">
        <aside className="book-host host-card surface-card">
          <div className="host-portrait" aria-hidden>
            <img
              src="/assets/host-maya.jpg"
              alt=""
              className="host-photo"
              width={280}
              height={280}
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <p className="eyebrow">Public booking · pick a slot</p>
          <h1 className="display host-name">{state.profile.displayName}</h1>
          <p className="host-headline">{state.profile.headline}</p>
          <p className="host-tz mono">{state.profile.timezone}</p>

          {meeting ? (
            <h2 className="host-meeting-title">{meeting.title}</h2>
          ) : null}
          <div className="duration-card-row" role="listbox" aria-label="Meeting type">
            {state.meetingTypes.map((m) => (
              <button
                key={m.id}
                type="button"
                role="option"
                aria-selected={activeMeetingId === m.id}
                className={`duration-card surface-card ${activeMeetingId === m.id ? "is-active" : ""}`}
                onClick={() => {
                  setMeetingId(m.id);
                  setSlot(null);
                  setStep("pick");
                }}
              >
                <span className="duration-card-dur mono">{m.durationMin}</span>
                <span className="duration-card-unit">min</span>
                <span className="duration-card-title">{m.title}</span>
              </button>
            ))}
          </div>

          {/* assist deferred to desk — cut from public booker */}

        </aside>

        <section className="book-card surface-card">
          {step === "confirm" && slot && meeting && dateKey ? (
            <div className={`confirm-flow ${api.errorShake ? "is-shaking" : ""}`} data-transition="error-state-shake">
              <button
                type="button"
                className="back-link"
                onClick={() => setStep("pick")}
              >
                ← Back to times
              </button>
              <h2 className="panel-title">Confirm this time</h2>
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
            <div className="pick-flow elevate-pick">
              <div className="pick-toolbar">
                <div className="pick-toolbar-left">
                  <h2 className="book-job-label">Pick a time</h2>
                  {meeting ? (
                    <p className="card-meeting-chip mono">
                      {meeting.durationMin} min · {state.profile.timezone.replace(/_/g, " ")}
                    </p>
                  ) : null}
                </div>
                <div className="cal-mode-toggle is-quiet" role="tablist" aria-label="Calendar density">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={calMode === "week"}
                    className={`mode-chip ${calMode === "week" ? "is-active" : ""}`}
                    onClick={() => setCalMode("week")}
                  >
                    Week
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={calMode === "month"}
                    className={`mode-chip ${calMode === "month" ? "is-active" : ""}`}
                    onClick={() => setCalMode("month")}
                  >
                    Full month
                  </button>
                </div>
              </div>

              <div className="week-strip-wrap week-density-wrap" hidden={calMode !== "week"}>
                <div className="week-strip-head">
                  <button
                    type="button"
                    className="btn ghost sm week-nav"
                    aria-label="Previous week"
                    onClick={() => setWeekStart((w) => addDaysKey(w, -7))}
                  >
                    ‹
                  </button>
                  <p className="week-range mono">
                    {weekRangeLabel(weekStart, addDaysKey(weekStart, 6))}
                  </p>
                  <button
                    type="button"
                    className="btn ghost sm week-nav"
                    aria-label="Next week"
                    onClick={() => setWeekStart((w) => addDaysKey(w, 7))}
                  >
                    ›
                  </button>
                </div>
                {/* SavvyCal steal: week-of-columns density — slots live under each day */}
                <div className="week-density" role="grid" aria-label="Week availability">
                  {buildDayStrip(weekStart, 7, today).map((d) => {
                    const open = !d.isPast && dayHasSlots(d.key);
                    const disabled = d.isPast || !dayHasSlots(d.key);
                    const daySlots =
                      meeting && open ? availableSlots(state, meeting, d.key) : [];
                    const isActive = dateKey === d.key;
                    return (
                      <div
                        key={d.key}
                        role="gridcell"
                        className={[
                          "week-col",
                          d.isToday ? "is-today" : "",
                          isActive ? "is-active" : "",
                          open ? "is-open" : "",
                          disabled ? "is-disabled" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <button
                          type="button"
                          className="week-col-head"
                          disabled={disabled}
                          aria-pressed={isActive}
                          aria-label={`${d.weekdayShort} ${d.day}${open ? `, ${daySlots.length} open` : ""}`}
                          onClick={() => {
                            if (disabled) return;
                            setDateKey(d.key);
                            setSlot(null);
                            const [y, m] = d.key.split("-").map(Number);
                            setMonth({ y, m0: m - 1 });
                          }}
                        >
                          <span className="week-day-wd">{d.weekdayShort}</span>
                          <span className="week-day-num">{d.day}</span>
                          <span className={`week-day-count mono ${open ? "" : "is-empty"}`}>
                            {open ? daySlots.length : "·"}
                          </span>
                        </button>
                        <div className="week-col-slots">
                          {open ? (
                            daySlots.slice(0, 8).map((s) => (
                              <button
                                key={s.startIso}
                                type="button"
                                className={`week-slot mono ${slot?.startIso === s.startIso && isActive ? "is-active" : ""}`}
                                onClick={() => {
                                  setDateKey(d.key);
                                  setSlot(s);
                                  setStep("confirm");
                                  const [y, m] = d.key.split("-").map(Number);
                                  setMonth({ y, m0: m - 1 });
                                }}
                              >
                                {s.label}
                              </button>
                            ))
                          ) : (
                            <span className="week-col-empty" aria-hidden>
                              —
                            </span>
                          )}
                          {open && daySlots.length > 8 ? (
                            <button
                              type="button"
                              className="week-col-more mono"
                              onClick={() => {
                                setDateKey(d.key);
                                setSlot(null);
                                const [y, m] = d.key.split("-").map(Number);
                                setMonth({ y, m0: m - 1 });
                              }}
                            >
                              +{daySlots.length - 8}
                            </button>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pick-split elevate-split" data-mode={calMode}>
              <div className="pick-cal" hidden={calMode !== "month"}>
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
                        setWeekStart(startOfWeekMonday(cell.key));
                        setSlot(null);
                      }}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>

              <div className="book-tz-foot" aria-label="Timezone">
                <span className="book-tz-label mono">{state.profile.timezone.replace(/_/g, " ")}</span>
              </div>
              </div>

              <div className="slot-pane pick-slots slots-hero" key={dateKey || "none"} data-transition="clearline-panel" hidden={calMode === "week"}>
                <h3 className="slot-heading">
                  {dateKey ? (
                    <span>
                      {new Date(dateKey + "T12:00:00").toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  ) : (
                    "Open hours"
                  )}
                </h3>
                {!dateKey ? (
                  <div className="slot-empty">
                    <p className="muted">Choose an open day.</p>
                  </div>
                ) : slots.length === 0 ? (
                  <p className="muted">No hours left — pick another day.</p>
                ) : (
                  <div className="slot-groups slot-groups-flat">
                    <div className="slot-grid slot-grid-hero slot-card-grid">
                      {slots.map((s, i) => (
                        <button
                          key={s.startIso}
                          type="button"
                          className={`slot-card surface-card mono ${slot?.startIso === s.startIso ? "is-active" : ""}`}
                          style={{ animationDelay: `${i * 16}ms` }}
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
                )}
              </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
