"use client";

import { PageHero } from "@/components/shared/PageHero";
import { ResearchGroupCard } from "@/components/research/ResearchGroupCard";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import type { ResearchGroup } from "@/types/research";

export function ResearchGroupsContent({ groups }: { groups: ResearchGroup[] }) {
  const { lang } = useLanguage();
  const t = translations[lang].researchGroups;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {groups.map((group, i) => (
            <MotionWrapper key={group.id} delay={i * 0.1}>
              <ResearchGroupCard group={group} />
            </MotionWrapper>
          ))}
        </div>
        {groups.length === 0 && (
          <div className="text-center py-20 text-brand-muted">{t.noResults}</div>
        )}
      </div>
    </>
  );
}
