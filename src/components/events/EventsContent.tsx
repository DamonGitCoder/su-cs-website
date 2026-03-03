"use client";

import { PageHero } from "@/components/shared/PageHero";
import { EventCard } from "@/components/events/EventCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import type { CalendarEvent } from "@/types/event";

export function EventsContent({ events }: { events: CalendarEvent[] }) {
  const { lang } = useLanguage();
  const t = translations[lang].events;

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.startDate) >= now);
  const past = events.filter((e) => new Date(e.startDate) < now);

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {upcoming.length > 0 && (
          <section>
            <SectionHeader eyebrow={t.comingUp} title={t.upcomingTitle} className="mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event, i) => (
                <MotionWrapper key={event.id} delay={i * 0.07}>
                  <EventCard event={event} />
                </MotionWrapper>
              ))}
            </div>
          </section>
        )}
        {past.length > 0 && (
          <section>
            <SectionHeader eyebrow={t.archiveEyebrow} title={t.pastTitle} className="mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event, i) => (
                <MotionWrapper key={event.id} delay={i * 0.07}>
                  <EventCard event={event} />
                </MotionWrapper>
              ))}
            </div>
          </section>
        )}
        {events.length === 0 && (
          <div className="text-center py-20 text-brand-muted">{t.noResults}</div>
        )}
      </div>
    </>
  );
}
