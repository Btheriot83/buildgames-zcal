export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface TimeWindow {
  /** minutes from midnight */
  startMin: number;
  endMin: number;
}

export interface DayAvailability {
  weekday: Weekday;
  enabled: boolean;
  windows: TimeWindow[];
}

export interface MeetingType {
  id: string;
  title: string;
  durationMin: number;
  description: string;
  bufferMin: number;
}

export interface Profile {
  slug: string;
  displayName: string;
  headline: string;
  timezone: string;
  accentNote: string;
}

export interface Booking {
  id: string;
  meetingTypeId: string;
  guestName: string;
  guestEmail: string;
  note: string;
  /** ISO start in host timezone wall time stored as UTC instant */
  startIso: string;
  endIso: string;
  createdAt: string;
}

export interface SundialState {
  version: 1;
  profile: Profile;
  availability: DayAvailability[];
  meetingTypes: MeetingType[];
  bookings: Booking[];
  /** local calendar events (includes bookings + manual blocks) */
  calendar: Booking[];
}
