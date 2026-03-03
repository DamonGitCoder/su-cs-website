import type { Metadata } from "next";
import { EventsContent } from "@/components/events/EventsContent";
import { getAllEvents } from "@/lib/drupal/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming seminars, workshops, and events at the Stellenbosch University Department of Computer Science.",
};

export default async function EventsPage() {
  const events = await getAllEvents();
  return <EventsContent events={events} />;
}
