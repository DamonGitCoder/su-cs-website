"use client";

import { CalendarDays, MapPin, User, ExternalLink, Wifi } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import type { CalendarEvent, EventType } from "@/types/event";

const EVENT_TYPE_CONFIG: Record<EventType, { label: string; color: string }> = {
  seminar:    { label: "Seminar",    color: "text-blue-700 bg-blue-600/10 border-blue-600/20" },
  workshop:   { label: "Workshop",   color: "text-emerald-700 bg-emerald-600/10 border-emerald-600/20" },
  conference: { label: "Conference", color: "text-amber-700 bg-brand-gold/10 border-brand-gold/20" },
  social:     { label: "Social",     color: "text-pink-700 bg-pink-600/10 border-pink-600/20" },
  deadline:   { label: "Deadline",   color: "text-red-700 bg-red-600/10 border-red-600/20" },
  other:      { label: "Event",      color: "text-brand-muted bg-brand-ink/8 border-black/10" },
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", hour12: false }),
  };
}

interface EventCardProps {
  event: CalendarEvent;
}

export function EventCard({ event }: EventCardProps) {
  const typeConfig = EVENT_TYPE_CONFIG[event.type];
  const { date, time } = formatDateTime(event.startDate);
  const isPast = new Date(event.startDate) < new Date();

  return (
    <GlassCard className={`group ${isPast ? "opacity-60" : ""}`}>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${typeConfig.color}`}>
            {typeConfig.label}
          </span>
          {event.isOnline && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] text-cyan-700 bg-cyan-600/10 border-cyan-600/20">
              <Wifi size={9} />
              Online
            </span>
          )}
          {isPast && (
            <span className="ml-auto text-brand-muted/50 text-[10px]">Past</span>
          )}
        </div>

        <h3 className="font-display font-semibold text-brand-ink text-base leading-snug mb-3 group-hover:text-brand-maroon transition-colors line-clamp-2">
          {event.title}
        </h3>

        <p className="text-brand-muted text-sm leading-relaxed line-clamp-2 mb-4">
          {event.description.replace(/<[^>]*>/g, "")}
        </p>

        <div className="flex flex-col gap-2 pt-3 border-t border-black/6">
          <div className="flex items-center gap-2 text-brand-muted text-xs">
            <CalendarDays size={12} />
            {date} · {time}
          </div>
          <div className="flex items-center gap-2 text-brand-muted text-xs">
            <MapPin size={12} />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          {event.speaker && (
            <div className="flex items-center gap-2 text-brand-muted text-xs">
              <User size={12} />
              {event.speaker}
            </div>
          )}
          {event.registrationUrl && !isPast && (
            <a
              href={event.registrationUrl}
              className="mt-2 flex items-center gap-1.5 text-brand-maroon text-xs font-medium hover:gap-2.5 transition-all"
            >
              Register <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
