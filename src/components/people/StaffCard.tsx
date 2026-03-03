"use client";

import Link from "next/link";
import { Mail, ExternalLink, BookOpen } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import type { StaffMember } from "@/types/staff";

interface StaffCardProps {
  member: StaffMember;
}

export function StaffCard({ member }: StaffCardProps) {
  return (
    <GlassCard className="group h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Avatar */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-maroon flex items-center justify-center shrink-0 group-hover:glow-maroon transition-all duration-300">
            <span className="font-display font-bold text-xl text-white">
              {member.name
                .split(" ")
                .filter((w) => /^[A-Z]/.test(w))
                .slice(-2)
                .map((w) => w[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-brand-ink leading-tight group-hover:text-brand-maroon transition-colors line-clamp-2">
              {member.name}
            </h3>
            <p className="text-brand-maroon text-sm mt-0.5 line-clamp-1">
              {member.position}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-brand-muted text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
          {member.bio}
        </p>

        {/* Research areas */}
        {member.researchAreas.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {member.researchAreas.slice(0, 3).map((area) => (
              <span
                key={area}
                className="px-2 py-1 rounded-full bg-brand-maroon/8 border border-brand-maroon/15 text-brand-maroon text-[10px] leading-none"
              >
                {area}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-black/6">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-1.5 text-brand-muted hover:text-brand-maroon transition-colors text-xs"
              aria-label={`Email ${member.name}`}
            >
              <Mail size={13} />
              Email
            </a>
          )}
          {member.googleScholarUrl && (
            <a
              href={member.googleScholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-brand-muted hover:text-brand-maroon transition-colors text-xs"
              aria-label={`${member.name}'s Google Scholar`}
            >
              <BookOpen size={13} />
              Scholar
            </a>
          )}
          <Link
            href={`/people/${member.slug}`}
            className="ml-auto flex items-center gap-1.5 text-brand-maroon/70 hover:text-brand-maroon transition-colors text-xs font-medium"
          >
            Profile <ExternalLink size={11} />
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}
