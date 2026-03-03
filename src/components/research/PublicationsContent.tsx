"use client";

import { PageHero } from "@/components/shared/PageHero";
import { PublicationCard } from "@/components/research/PublicationCard";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import type { Publication } from "@/types/publication";

export function PublicationsContent({ publications }: { publications: Publication[] }) {
  const { lang } = useLanguage();
  const t = translations[lang].publications;

  const byYear = publications.reduce<Record<number, typeof publications>>((acc, pub) => {
    acc[pub.year] = [...(acc[pub.year] ?? []), pub];
    return acc;
  }, {});
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  const paperLabel = lang === "en" ? "paper" : "artikel";
  const papersLabel = lang === "en" ? "papers" : "artikels";

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={
          publications.length > 0
            ? lang === "en"
              ? `${publications.length} publications in journals, conferences, and books — spanning AI, robotics, software engineering, and beyond.`
              : `${publications.length} publikasies in joernale, konferensies en boeke — oor KI, robotika, sagteware-ingenieurswese en meer.`
            : t.subtitle
        }
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {years.map((year) => (
          <section key={year} className="mb-14">
            <MotionWrapper>
              <h2 className="font-display font-bold text-2xl text-brand-gold mb-6 flex items-center gap-3">
                {year}
                <span className="text-base font-normal text-brand-muted/60 font-sans">
                  ({byYear[year].length} {byYear[year].length !== 1 ? papersLabel : paperLabel})
                </span>
              </h2>
            </MotionWrapper>
            <div className="space-y-4">
              {byYear[year].map((pub, i) => (
                <MotionWrapper key={pub.id} delay={i * 0.05}>
                  <PublicationCard publication={pub} />
                </MotionWrapper>
              ))}
            </div>
          </section>
        ))}
        {publications.length === 0 && (
          <div className="text-center py-20 text-brand-muted">{t.noResults}</div>
        )}
      </div>
    </>
  );
}
