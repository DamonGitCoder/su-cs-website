import { drupalList } from "./client";
import type { DrupalNode } from "@/types/drupal";
import type { CalendarEvent, EventNodeAttributes, EventType } from "@/types/event";
import { mockEvents } from "@/lib/mock-data";

const ENDPOINT = "node/event";
const PARAMS = {
  "fields[node--event]":
    "title,field_description,field_start_date,field_end_date,field_location,field_event_type,field_speaker,field_registration_url,field_is_online",
  sort: "field_start_date",
};

function toEvent(node: DrupalNode<EventNodeAttributes>): CalendarEvent {
  return {
    id: node.id,
    title: node.attributes.title,
    description: node.attributes.field_description?.processed ?? "",
    startDate: node.attributes.field_start_date,
    endDate: node.attributes.field_end_date,
    location: node.attributes.field_location ?? "TBD",
    type: (node.attributes.field_event_type ?? "other") as EventType,
    speaker: node.attributes.field_speaker ?? undefined,
    registrationUrl: node.attributes.field_registration_url ?? undefined,
    isOnline: node.attributes.field_is_online ?? false,
  };
}

export async function getUpcomingEvents(): Promise<CalendarEvent[]> {
  const now = new Date().toISOString();
  const res = await drupalList<DrupalNode<EventNodeAttributes>>(
    ENDPOINT,
    { ...PARAMS, "filter[field_start_date][operator]": ">=", "filter[field_start_date][value]": now },
    ["events"]
  );
  if (!res) return mockEvents.filter((e) => new Date(e.startDate) >= new Date());
  return res.data.map(toEvent);
}

export async function getAllEvents(): Promise<CalendarEvent[]> {
  const res = await drupalList<DrupalNode<EventNodeAttributes>>(
    ENDPOINT,
    PARAMS,
    ["events"]
  );
  if (!res) return mockEvents;
  return res.data.map(toEvent);
}
