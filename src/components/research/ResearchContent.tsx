"use client";

import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { ResearchGroupCard } from "@/components/research/ResearchGroupCard";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import type { ResearchGroup } from "@/types/research";
import type { Publication } from "@/types/publication";

const THEMES_EN = [
  { title: "Artificial Intelligence & ML", description: "Deep learning, reinforcement learning, NLP, and responsible AI for African contexts." },
  { title: "Robotics & Autonomous Systems", description: "Perception, manipulation, navigation, and multi-agent coordination in real-world environments." },
  { title: "Software Engineering", description: "Formal verification, model checking, automated testing, and software quality assurance." },
  { title: "Systems & Security", description: "Distributed computing, consensus protocols, network security, and privacy-preserving systems." },
  { title: "Human-Computer Interaction", description: "Accessible design, participatory methods, and inclusive technology for diverse populations." },
  { title: "Theoretical Computer Science", description: "Algorithms, complexity theory, formal language theory, and automata." },
];

const THEMES_AF = [
  { title: "Kunsmatige Intelligensie & ML", description: "Diep leer, versterkingsleer, NLP en verantwoordelike KI vir Afrika-kontekste." },
  { title: "Robotika & Outonome Stelsels", description: "Persepsie, manipulasie, navigasie en multi-agent-koördinasie in werklike omgewings." },
  { title: "Sagteware-ingenieurswese", description: "Formele verifikasie, modellering, outomatiese toetsing en sagtewarekwaliteitsversekering." },
  { title: "Stelsels & Sekuriteit", description: "Verspreide rekenaarkunde, konsensus-protokolle, netwerksekuriteit en privaatsybewarende stelsels." },
  { title: "Mens-Rekenaar-Interaksie", description: "Toeganklike ontwerp, deelnemende metodes en inklusiewe tegnologie vir diverse bevolkings." },
  { title: "Teoretiese Rekenaarwetenskap", description: "Algoritmes, kompleksiteitsteorie, formele taalteorie en outomata." },
];

export function ResearchContent({
  groups,
  recentPubs,
}: {
  groups: ResearchGroup[];
  recentPubs: Publication[];
}) {
  const { lang } = useLanguage();
  const t = translations[lang].research;
  const themes = lang === "en" ? THEMES_EN : THEMES_AF;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Research themes */}
        <section>
          <SectionHeader eyebrow={t.themesEyebrow} title={t.themesTitle} className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme, i) => (
              <MotionWrapper key={theme.title} delay={i * 0.07}>
                <GlassCard className="h-full">
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-brand-ink text-base mb-2">{theme.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{theme.description}</p>
                  </div>
                </GlassCard>
              </MotionWrapper>
            ))}
          </div>
        </section>

        {/* Research groups */}
        <section>
          <div className="flex items-end justify-between gap-4 mb-12">
            <SectionHeader eyebrow={t.labsEyebrow} title={t.labsTitle} />
            <Link href="/research/groups" className="flex items-center gap-2 text-brand-maroon text-sm font-semibold hover:gap-3 transition-all shrink-0">
              {t.allGroups} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {groups.map((g) => (
              <MotionWrapper key={g.id}>
                <ResearchGroupCard group={g} />
              </MotionWrapper>
            ))}
          </div>
        </section>

        {/* Recent publications CTA */}
        <section>
          <div className="flex items-end justify-between gap-4 mb-8">
            <SectionHeader eyebrow={t.outputEyebrow} title={t.outputTitle} />
            <Link href="/research/publications" className="flex items-center gap-2 text-brand-maroon text-sm font-semibold hover:gap-3 transition-all shrink-0">
              {t.allPublications} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-4">
            {recentPubs.slice(0, 3).map((pub, i) => (
              <MotionWrapper key={pub.id} delay={i * 0.08}>
                <GlassCard>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-brand-ink text-base mb-1">{pub.title}</h3>
                    <p className="text-brand-muted text-sm">{pub.authors.join("; ")} · {pub.year}</p>
                    {pub.venue && <p className="text-brand-muted/60 text-xs italic mt-1">{pub.venue}</p>}
                  </div>
                </GlassCard>
              </MotionWrapper>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
