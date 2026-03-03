export type EventType =
  | "seminar"
  | "workshop"
  | "conference"
  | "social"
  | "deadline"
  | "other";

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO date-time
  endDate: string;
  location: string;
  type: EventType;
  speaker?: string;
  registrationUrl?: string;
  isOnline: boolean;
}

export interface EventNodeAttributes {
  title: string;
  field_description: { value: string; processed: string } | null;
  field_start_date: string;
  field_end_date: string;
  field_location: string | null;
  field_event_type: string | null;
  field_speaker: string | null;
  field_registration_url: string | null;
  field_is_online: boolean;
}
