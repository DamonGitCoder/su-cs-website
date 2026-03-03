"use client";

import { ExternalLink, BookOpen, FileText, Newspaper } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import type { Publication, PublicationType } from "@/types/publication";

const TYPE_CONFIG: Record<PublicationType, { label: string; color: string; Icon: React.ElementType }> = {
  journal:    { label: "Journal",    color: "text-blue-700 bg-blue-600/10 border-blue-600/20",      Icon: Newspaper },
  conference: { label: "Conference", color: "text-emerald-700 bg-emerald-600/10 border-emerald-600/20", Icon: FileText },
  book:       { label: "Book",       color: "text-amber-700 bg-brand-gold/10 border-brand-gold/20",  Icon: BookOpen },
  chapter:    { label: "Chapter",    color: "text-orange-700 bg-orange-600/10 border-orange-600/20", Icon: BookOpen },
  thesis:     { label: "Thesis",     color: "text-purple-700 bg-purple-600/10 border-purple-600/20", Icon: FileText },
  preprint:   { label: "Preprint",   color: "text-brand-muted bg-brand-ink/5 border-black/10",       Icon: FileText },
};

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const typeConfig = TYPE_CONFIG[publication.type];
  const Icon = typeConfig.Icon;

  return (
    <GlassCard className="group">
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className={`mt-0.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold flex items-center gap-1 ${typeConfig.color} shrink-0`}>
            <Icon size={10} />
            {typeConfig.label}
          </div>
          <span className="text-brand-muted/60 text-xs ml-auto shrink-0">{publication.year}</span>
        </div>

        <h3 className="font-display font-semibold text-brand-ink text-base leading-snug mb-2 group-hover:text-brand-maroon transition-colors">
          {publication.title}
        </h3>

        <p className="text-brand-maroon text-xs mb-3 line-clamp-1">
          {publication.authors.join("; ")}
        </p>

        {publication.venue && (
          <p className="text-brand-muted text-xs italic mb-3 line-clamp-1">
            {publication.venue}
          </p>
        )}

        {publication.abstract && (
          <p className="text-brand-muted text-sm leading-relaxed line-clamp-2 mb-4">
            {publication.abstract.replace(/<[^>]*>/g, "")}
          </p>
        )}

        <div className="flex items-center gap-3 pt-3 border-t border-black/6">
          {publication.doi && (
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-brand-muted hover:text-brand-maroon transition-colors text-xs"
            >
              <ExternalLink size={12} />
              DOI
            </a>
          )}
          {publication.url && (
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-brand-muted hover:text-brand-maroon transition-colors text-xs"
            >
              <ExternalLink size={12} />
              PDF
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
