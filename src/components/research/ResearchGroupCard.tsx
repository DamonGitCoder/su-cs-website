"use client";

import Link from "next/link";
import { Users, ArrowRight, ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import type { ResearchGroup } from "@/types/research";

interface ResearchGroupCardProps {
  group: ResearchGroup;
}

export function ResearchGroupCard({ group }: ResearchGroupCardProps) {
  return (
    <GlassCard className="group h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-maroon/15 border border-brand-maroon/25 flex items-center justify-center shrink-0 font-display font-bold text-brand-maroon text-xs">
            {group.shortName.substring(0, 3)}
          </div>
          {group.websiteUrl && group.websiteUrl !== "#" && (
            <a
              href={group.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-muted hover:text-brand-maroon transition-colors"
              aria-label={`${group.name} website`}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        <h3 className="font-display font-semibold text-brand-ink text-lg leading-tight mb-2 group-hover:text-brand-maroon transition-colors">
          {group.name}
        </h3>

        {group.leaderName && (
          <p className="text-brand-maroon text-sm mb-3">
            Led by {group.leaderName}
          </p>
        )}

        <p className="text-brand-muted text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
          {group.description.replace(/<[^>]*>/g, "")}
        </p>

        {/* Focus tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {group.focus.slice(0, 4).map((f) => (
            <span
              key={f}
              className="px-2.5 py-1 rounded-full bg-brand-ink/5 border border-black/8 text-brand-muted text-[10px]"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-black/6">
          <div className="flex items-center gap-1.5 text-brand-muted text-xs">
            <Users size={12} />
            {group.memberCount} members
          </div>
          <Link
            href={`/research/groups`}
            className="flex items-center gap-1.5 text-brand-maroon/70 hover:text-brand-maroon text-xs font-medium transition-colors group-hover:gap-2"
          >
            Details <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}
