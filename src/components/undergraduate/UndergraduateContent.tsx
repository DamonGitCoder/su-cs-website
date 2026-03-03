"use client";

import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const PROGRAMMES = [
  {
    code: "BSc",
    titleEn: "BSc Computer Science",
    titleAf: "BSc Rekenaarwetenskap",
    durationEn: "3 years",
    durationAf: "3 jaar",
    descEn: "The BSc in Computer Science provides a strong theoretical and practical foundation in algorithms, software engineering, databases, and networks. Graduates are prepared for industry or postgraduate study.",
    descAf: "Die BSc in Rekenaarwetenskap bied 'n sterk teoretiese en praktiese grondslag in algoritmes, sagteware-ingenieurswese, databasisse en netwerke. Gegradueerdes is gereed vir nywerheid of nagraadse studie.",
    highlights: ["Data Structures & Algorithms", "Operating Systems", "Machine Learning", "Software Engineering", "Computer Networks"],
    aps: "36+",
    mathEn: "Mathematics HG/NSC level 6+",
    mathAf: "Wiskunde HG/NSK vlak 6+",
  },
  {
    code: "BEng",
    titleEn: "BEng Computer Systems",
    titleAf: "BIng Rekenaarstelsels",
    durationEn: "4 years",
    durationAf: "4 jaar",
    descEn: "The BEng blends computer science with electrical engineering principles. Graduates are equipped for careers in embedded systems, hardware design, and systems engineering.",
    descAf: "Die BIng kombineer rekenaarwetenskap met elektriese ingenieurswesebeginsels. Gegradueerdes is toegerus vir loopbane in ingebedde stelsels, hardeware-ontwerp en stelsels-ingenieurswese.",
    highlights: ["Digital Logic", "Embedded Systems", "Computer Architecture", "Signal Processing", "VLSI Design"],
    aps: "38+",
    mathEn: "Mathematics HG/NSC level 7+",
    mathAf: "Wiskunde HG/NSK vlak 7+",
  },
];

const ADMISSION_EN = [
  "National Senior Certificate or equivalent international qualification",
  "Mathematics: minimum 70% at NSC Higher Grade",
  "Physical Sciences: minimum 60%",
  "English: minimum 60%",
  "Meeting faculty APS score requirements",
];

const ADMISSION_AF = [
  "Nasionale Senior Sertifikaat of ekwivalente internasionale kwalifikasie",
  "Wiskunde: minimum 70% op NSK Hoër Graad",
  "Fisiese Wetenskappe: minimum 60%",
  "Engels: minimum 60%",
  "Voldoen aan fakulteits-TPS-punte-vereistes",
];

export function UndergraduateContent() {
  const { lang } = useLanguage();
  const t = translations[lang].undergraduate;
  const admission = lang === "en" ? ADMISSION_EN : ADMISSION_AF;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Programmes */}
        <section>
          <SectionHeader eyebrow={t.degreesEyebrow} title={t.degreesTitle} className="mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PROGRAMMES.map((prog, i) => (
              <MotionWrapper key={prog.code} delay={i * 0.1}>
                <GlassCard className="h-full" variant="maroon">
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-brand-gold text-xs font-semibold tracking-widest uppercase">{prog.code}</span>
                        <h3 className="font-display font-bold text-2xl text-brand-ink mt-1">
                          {lang === "en" ? prog.titleEn : prog.titleAf}
                        </h3>
                      </div>
                      <span className="glass border border-black/10 px-3 py-1 rounded-full text-brand-muted text-xs">
                        {lang === "en" ? prog.durationEn : prog.durationAf}
                      </span>
                    </div>
                    <p className="text-brand-muted leading-relaxed mb-6">
                      {lang === "en" ? prog.descEn : prog.descAf}
                    </p>
                    <div className="mb-6">
                      <p className="text-brand-muted text-xs uppercase tracking-wide mb-3">{t.keyModules}</p>
                      <div className="flex flex-wrap gap-2">
                        {prog.highlights.map((h) => (
                          <span key={h} className="px-2.5 py-1 rounded-full bg-brand-ink/5 border border-black/8 text-brand-muted text-xs">{h}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-black/6 flex items-center gap-6 text-xs text-brand-muted">
                      <span>APS {prog.aps}</span>
                      <span>{lang === "en" ? prog.mathEn : prog.mathAf}</span>
                    </div>
                  </div>
                </GlassCard>
              </MotionWrapper>
            ))}
          </div>
        </section>

        {/* Admission */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <MotionWrapper>
              <SectionHeader eyebrow={t.admissionsEyebrow} title={t.admissionsTitle} />
              <ul className="mt-6 space-y-3">
                {admission.map((req) => (
                  <li key={req} className="flex items-start gap-3 text-brand-muted text-sm">
                    <CheckCircle size={16} className="text-brand-gold mt-0.5 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </MotionWrapper>
            <MotionWrapper delay={0.2}>
              <GlassCard>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-brand-ink text-xl mb-4">{t.readyToApply}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-6">{t.applyDesc}</p>
                  <div className="flex flex-col gap-3">
                    <Button asChild className="bg-brand-maroon hover:bg-brand-maroon-light text-white w-full">
                      <a href="https://www.sun.ac.za/english/Pages/apply.aspx" target="_blank" rel="noopener noreferrer">
                        {t.applyPortal} <ArrowRight size={16} className="ml-2" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="border-black/20 text-brand-ink hover:bg-brand-ink/5 w-full">
                      <Link href="/contact">{t.contactAdmissions}</Link>
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </MotionWrapper>
          </div>
        </section>

        {/* Course catalogue CTA */}
        <MotionWrapper>
          <GlassCard variant="gold" className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-brand-ink text-2xl mb-2">{t.browseCatalogue}</h3>
              <p className="text-brand-muted">{t.browseDesc}</p>
            </div>
            <Button asChild className="bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold shrink-0">
              <Link href="/undergraduate/courses">
                {t.viewCourses} <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </GlassCard>
        </MotionWrapper>
      </div>
    </>
  );
}
