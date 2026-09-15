"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSundial } from "@/lib/useSundial";
import { Toast } from "./Toast";
import { SiteHeader } from "./SiteHeader";
import { SundialMark } from "./SundialMark";
import { formatMin, bookingTitle } from "@/lib/slots";
import { newId, DEMO_HOST } from "@/lib/seed";
import type { DayAvailability, MeetingType } from "@/lib/types";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Tab = "calendar" | "availability" | "meetings" | "backup";

export function DeskApp() {
  const api = useSundial();
  const [tab, setTab] = useState<Tab>("calendar");

  if (!api.ready || !api.state) {
    return (
      <div className="shell">
        <SiteHeader />
        <div className="t-skel desk-skeleton">
          <div className="t-skel-skeleton is-pulsing">
            <div className="skel-block" />
            <div className="skel-block short" />
            <div className="skel-block" />
          </div>
        </div>
      </div>
    );
  }

  const { state } = api;
  const bookingCount = state.bookings.length;

  return (
    <div className="shell">
      <SiteHeader slug={state.profile.slug} />
      <Toast message={api.toast} />

      <section className="desk-hero t-texts-reveal" data-reveal="in">
        <div>
          <p className="eyebrow">Host desk · set availability</p>
          <h1 className="display">{state.profile.displayName}</h1>
          <p className="lede">{state.profile.headline}</p>
          <p className="degraded">{state.profile.accentNote}</p>
          <p className="desk-job">
            Mark weekday windows → save → share{" "}
            <Link href={`/b/${state.profile.slug}`}>/b/{state.profile.slug}</Link>. Guests book
            from that page.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => setTab("availability")}
            >
              Edit availability
            </button>
            <Link className="btn ghost" href={`/b/${state.profile.slug}`}>
              Preview public page
            </Link>
            <button type="button" className="btn ghost" onClick={() => api.doExport()}>
              Export JSON
            </button>
          </div>
        </div>
        <div className="hero-side">
          <SundialMark size={140} />
          <div className="stat">
            <span className="t-number-pop" data-pop="in" key={bookingCount}>
              {bookingCount}
            </span>
            <span className="stat-label">bookings on local calendar</span>
          </div>
        </div>
      </section>

      <div className="t-tabs desk-tabs" role="tablist">
        {(
          [
            ["calendar", "Calendar"],
            ["availability", "Availability"],
            ["meetings", "Meeting types"],
            ["backup", "Backup"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={`t-tab ${tab === id ? "is-active" : ""}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
        <span className="t-tabs-pill" data-tab={tab} aria-hidden />
      </div>

      <div className={`panel t-panel-reveal ${api.errorShake ? "t-input is-error" : ""}`} data-open="true">
        {tab === "calendar" && <CalendarPane api={api} />}
        {tab === "availability" && <AvailabilityPane api={api} />}
        {tab === "meetings" && <MeetingsPane api={api} />}
        {tab === "backup" && <BackupPane api={api} />}
      </div>
    </div>
  );
}

function CalendarPane({ api }: { api: ReturnType<typeof useSundial> }) {
  const events = useMemo(() => {
    const list = [...(api.state?.calendar ?? [])];
    list.sort((a, b) => +new Date(a.startIso) - +new Date(b.startIso));
    return list;
  }, [api.state]);

  if (!api.state) return null;

  return (
    <div>
      <h2 className="panel-title">Local calendar store</h2>
      <p className="muted">
        Bookings land here. No Google Calendar connection — degraded mode is intentional and
        documented.
      </p>
      {events.length === 0 ? (
        <p className="empty">
          No bookings yet. Save availability, then share{" "}
          <Link href={`/b/${api.state.profile.slug}`}>/b/{api.state.profile.slug}</Link> — guests book
          there.
        </p>
      ) : (
        <ul className="event-list">
          {events.map((b) => (
            <li key={b.id} className="event-card">
              <div>
                <strong>{bookingTitle(b, api.state!)}</strong>
                <div className="muted mono">
                  {new Date(b.startIso).toLocaleString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                  {" · "}
                  {b.guestEmail}
                </div>
                {b.note ? <div className="note">{b.note}</div> : null}
              </div>
              <button type="button" className="btn ghost sm" onClick={() => api.cancelBooking(b.id)}>
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AvailabilityPane({ api }: { api: ReturnType<typeof useSundial> }) {
  const [draft, setDraft] = useState<DayAvailability[]>(api.state!.availability);
  const [savedFlash, setSavedFlash] = useState(false);

  const toggle = (weekday: number) => {
    setDraft((prev) =>
      prev.map((d) =>
        d.weekday === weekday
          ? {
              ...d,
              enabled: !d.enabled,
              windows:
                !d.enabled && d.windows.length === 0
                  ? [
                      { startMin: 9 * 60, endMin: 12 * 60 },
                      { startMin: 13 * 60 + 30, endMin: 17 * 60 },
                    ]
                  : d.windows,
            }
          : d
      )
    );
  };

  const setWindowEdge = (
    weekday: number,
    index: number,
    edge: "startMin" | "endMin",
    minutes: number
  ) => {
    setDraft((prev) =>
      prev.map((d) => {
        if (d.weekday !== weekday) return d;
        const windows = d.windows.length
          ? d.windows.map((w, i) => (i === index ? { ...w, [edge]: minutes } : w))
          : [{ startMin: 9 * 60, endMin: 17 * 60 }];
        return { ...d, windows };
      })
    );
  };

  const timeValue = (min: number) =>
    `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

  return (
    <div>
      <h2 className="panel-title">Weekly availability</h2>
      <p className="muted">
        Open windows in {api.state!.profile.timezone}. Morning and afternoon stay separate — guests
        only see hours you mark open.
      </p>
      <ul className="avail-list">
        {draft.map((d) => (
          <li key={d.weekday} className="avail-row avail-row-rich">
            <label className="check-row">
              <input
                type="checkbox"
                checked={d.enabled}
                onChange={() => toggle(d.weekday)}
              />
              <span>{DAYS[d.weekday]}</span>
            </label>
            {d.enabled ? (
              <div className="window-stack">
                {(d.windows.length ? d.windows : [{ startMin: 9 * 60, endMin: 17 * 60 }]).map(
                  (w, wi) => (
                    <div key={wi} className="window-edit">
                      <span className="window-label mono">
                        {wi === 0 ? "AM" : wi === 1 ? "PM" : `W${wi + 1}`}
                      </span>
                      <input
                        className="t-input"
                        type="time"
                        value={timeValue(w.startMin)}
                        onChange={(e) => {
                          const [h, m] = e.target.value.split(":").map(Number);
                          setWindowEdge(d.weekday, wi, "startMin", h * 60 + m);
                        }}
                      />
                      <span className="muted">to</span>
                      <input
                        className="t-input"
                        type="time"
                        value={timeValue(w.endMin)}
                        onChange={(e) => {
                          const [h, m] = e.target.value.split(":").map(Number);
                          setWindowEdge(d.weekday, wi, "endMin", h * 60 + m);
                        }}
                      />
                      <span className="mono muted sm">
                        {formatMin(w.startMin)}–{formatMin(w.endMin)}
                      </span>
                    </div>
                  )
                )}
              </div>
            ) : (
              <span className="muted">Off</span>
            )}
          </li>
        ))}
      </ul>
      <div className="avail-actions">
        <button
          type="button"
          className="btn primary"
          onClick={async () => {
            await api.setAvailability(draft);
            setSavedFlash(true);
            window.setTimeout(() => setSavedFlash(false), 2200);
          }}
        >
          Save availability
        </button>
        <Link className="btn ghost" href={`/b/${api.state!.profile.slug}`}>
          Open public booking page
        </Link>
        {savedFlash ? (
          <span className="save-pill mono">Saved — guests see these hours now</span>
        ) : null}
      </div>
    </div>
  );
}

function MeetingsPane({ api }: { api: ReturnType<typeof useSundial> }) {
  const blank: MeetingType = {
    id: newId("mt"),
    title: "",
    durationMin: 30,
    description: "",
    bufferMin: 10,
  };
  const [draft, setDraft] = useState<MeetingType | null>(null);

  return (
    <div>
      <h2 className="panel-title">Meeting types</h2>
      <ul className="mt-list">
        {api.state!.meetingTypes.map((m) => (
          <li key={m.id} className="mt-card">
            <div>
              <strong>{m.title}</strong>
              <div className="muted">
                {m.durationMin} min · {m.bufferMin} min buffer
              </div>
              <p>{m.description}</p>
            </div>
            <div className="row-actions">
              <button type="button" className="btn ghost sm" onClick={() => setDraft(m)}>
                Edit
              </button>
              <button type="button" className="btn ghost sm" onClick={() => api.removeMeeting(m.id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className="btn ghost" onClick={() => setDraft(blank)}>
        Add meeting type
      </button>

      {draft ? (
        <div className={`t-modal ${draft ? "is-open" : ""}`} role="dialog">
          <div className="modal-card">
            <h3>Meeting type</h3>
            <label>
              Title
              <input
                className="t-input"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </label>
            <label>
              Description
              <textarea
                className="t-input"
                rows={3}
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            </label>
            <div className="grid-2">
              <label>
                Duration (min)
                <input
                  className="t-input"
                  type="number"
                  min={10}
                  step={5}
                  value={draft.durationMin}
                  onChange={(e) => setDraft({ ...draft, durationMin: Number(e.target.value) })}
                />
              </label>
              <label>
                Buffer (min)
                <input
                  className="t-input"
                  type="number"
                  min={0}
                  step={5}
                  value={draft.bufferMin}
                  onChange={(e) => setDraft({ ...draft, bufferMin: Number(e.target.value) })}
                />
              </label>
            </div>
            <div className="row-actions">
              <button type="button" className="btn ghost" onClick={() => setDraft(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn primary"
                onClick={async () => {
                  if (!draft.title.trim()) return;
                  await api.upsertMeeting({ ...draft, title: draft.title.trim() });
                  setDraft(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BackupPane({ api }: { api: ReturnType<typeof useSundial> }) {
  return (
    <div>
      <h2 className="panel-title">Backup & reset</h2>
      <p className="muted">
        Everything lives in this browser&apos;s IndexedDB. Export JSON before clearing site data.
        Cross-device sync and Google Calendar are out of scope (degraded mode).
      </p>
      <div className="row-actions wrap">
        <button type="button" className="btn primary" onClick={() => api.doExport()}>
          Download JSON
        </button>
        <label className="btn ghost file-btn">
          Import JSON
          <input
            type="file"
            accept="application/json,.json"
            hidden
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const text = await file.text();
              await api.doImport(text);
              e.target.value = "";
            }}
          />
        </label>
        <button type="button" className="btn danger" onClick={() => api.reset()}>
          Reset Maya desk
        </button>
      </div>
      <label className="profile-edit">
        Display name
        <input
          className="t-input"
          defaultValue={api.state!.profile.displayName}
          onBlur={(e) => api.updateProfile({ displayName: e.target.value })}
        />
      </label>
      <label className="profile-edit">
        Headline
        <input
          className="t-input"
          defaultValue={api.state!.profile.headline}
          onBlur={(e) => api.updateProfile({ headline: e.target.value })}
        />
      </label>
      <label className="profile-edit">
        Public slug
        <input
          className="t-input"
          defaultValue={api.state!.profile.slug}
          onBlur={(e) =>
            api.updateProfile({
              slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") || DEMO_HOST.slug,
            })
          }
        />
      </label>
    </div>
  );
}
