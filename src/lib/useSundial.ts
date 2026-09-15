"use client";

import { useCallback, useEffect, useState } from "react";
import { loadState, saveState, resetState as resetDb, importJson, exportJson } from "./db";
import { newId } from "./seed";
import type { Booking, DayAvailability, MeetingType, Profile, SundialState } from "./types";

export function useSundial() {
  const [state, setState] = useState<SundialState | null>(null);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [errorShake, setErrorShake] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadState().then((s) => {
      if (!cancelled) {
        setState(s);
        setReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(async (next: SundialState) => {
    setState(next);
    await saveState(next);
  }, []);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const shake = useCallback(() => {
    setErrorShake(true);
    window.setTimeout(() => setErrorShake(false), 500);
  }, []);

  const updateProfile = useCallback(
    async (patch: Partial<Profile>) => {
      if (!state) return;
      await persist({ ...state, profile: { ...state.profile, ...patch } });
      flash("Profile saved");
    },
    [state, persist, flash]
  );

  const setAvailability = useCallback(
    async (availability: DayAvailability[]) => {
      if (!state) return;
      await persist({ ...state, availability });
      flash("Availability updated");
    },
    [state, persist, flash]
  );

  const upsertMeeting = useCallback(
    async (mt: MeetingType) => {
      if (!state) return;
      const exists = state.meetingTypes.some((m) => m.id === mt.id);
      const meetingTypes = exists
        ? state.meetingTypes.map((m) => (m.id === mt.id ? mt : m))
        : [...state.meetingTypes, mt];
      await persist({ ...state, meetingTypes });
      flash(exists ? "Meeting type saved" : "Meeting type added");
    },
    [state, persist, flash]
  );

  const removeMeeting = useCallback(
    async (id: string) => {
      if (!state) return;
      await persist({
        ...state,
        meetingTypes: state.meetingTypes.filter((m) => m.id !== id),
      });
      flash("Meeting type removed");
    },
    [state, persist, flash]
  );

  const book = useCallback(
    async (input: {
      meetingTypeId: string;
      guestName: string;
      guestEmail: string;
      note: string;
      startIso: string;
      endIso: string;
    }) => {
      if (!state) return { ok: false as const, error: "Not ready" };
      const name = input.guestName.trim();
      const email = input.guestEmail.trim();
      if (!name || !email.includes("@")) {
        shake();
        return { ok: false as const, error: "Name and valid email required" };
      }
      const clash = [...state.bookings, ...state.calendar].some((b) => {
        const a0 = new Date(input.startIso).getTime();
        const a1 = new Date(input.endIso).getTime();
        const b0 = new Date(b.startIso).getTime();
        const b1 = new Date(b.endIso).getTime();
        return a0 < b1 && b0 < a1;
      });
      if (clash) {
        shake();
        return { ok: false as const, error: "That slot just filled" };
      }
      const booking: Booking = {
        id: newId("bk"),
        meetingTypeId: input.meetingTypeId,
        guestName: name,
        guestEmail: email,
        note: input.note.trim(),
        startIso: input.startIso,
        endIso: input.endIso,
        createdAt: new Date().toISOString(),
      };
      const next = {
        ...state,
        bookings: [...state.bookings, booking],
        calendar: [...state.calendar, booking],
      };
      await persist(next);
      flash("Booked — written to local calendar");
      return { ok: true as const, booking };
    },
    [state, persist, flash, shake]
  );

  const cancelBooking = useCallback(
    async (id: string) => {
      if (!state) return;
      await persist({
        ...state,
        bookings: state.bookings.filter((b) => b.id !== id),
        calendar: state.calendar.filter((b) => b.id !== id),
      });
      flash("Booking cleared");
    },
    [state, persist, flash]
  );

  const reset = useCallback(async () => {
    const fresh = await resetDb();
    setState(fresh);
    flash("Reset to sample desk");
  }, [flash]);

  const doExport = useCallback(() => {
    if (!state) return;
    const blob = new Blob([exportJson(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sundial-${state.profile.slug}.json`;
    a.click();
    URL.revokeObjectURL(url);
    flash("Export downloaded");
  }, [state, flash]);

  const doImport = useCallback(
    async (raw: string) => {
      try {
        const next = importJson(raw);
        await persist(next);
        flash("Import applied");
        return true;
      } catch {
        shake();
        flash("Import failed");
        return false;
      }
    },
    [persist, flash, shake]
  );

  return {
    state,
    ready,
    toast,
    errorShake,
    updateProfile,
    setAvailability,
    upsertMeeting,
    removeMeeting,
    book,
    cancelBooking,
    reset,
    doExport,
    doImport,
    flash,
  };
}
