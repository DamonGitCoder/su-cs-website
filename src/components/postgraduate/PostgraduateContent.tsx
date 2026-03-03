"use client";

import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const DEGREES = [
  {
    code: "BSc(Hons)",
    titleEn: "Honours in Computer Science",
    titleAf: "Honneurs in Rekenaarwetenskap",
    durationEn: "1 year",
    durationAf: "1 jaar",
    descEn: "The Honours programme provides advanced coursework and a research mini-thesis. It serves as a gateway to Masters study and is offered full-time.",
    descAf: "Die Honneursgraadprogram bied gevorderde kursuswerk en 'n navorsing-minitesis. Dit dien as toegangsweg tot Meesterstudie en word voltyds aangebied.",
    entryEn: "BSc CS or equivalent with 65%+ average in final year",
    entryAf: "BSc RW of ekwivalent met 65%+ gemiddeld in eindejaar",
    modulesEn: ["Advanced Machine Learning", "Formal Methods", "Distributed Systems", "Research Methodology"],
    modulesAf: ["Gevorderde Masjienleer", "Formele Metodes", "Verspreide Stelsels", "Navorsingsmetodologie"],
  },
  {
    code: "MSc",
    titleEn: "Masters in Computer Science",
    titleAf: "Meesters in Rekenaarwetenskap",
    durationEn: "2 years",
    durationAf: "2 jaar",
    descEn: "The MSc is research-based, culminating in a substantial thesis under supervision by a faculty member. Students publish in international venues and present at conferences.",
    descAf: "Die MSc is navorsingsgebaseerd en kulmineer in 'n substansiële tesis onder toesig van 'n personeellid. Studente publiseer in internasionale venues en hou aanbiedings by konferensies.",
    entryEn: "Honours degree or equivalent with 65%+ average",
    entryAf: "Honneursgraad of ekwivalent met 65%+ gemiddeld",
    modulesEn: ["Supervised research thesis", "Seminar participation", "Annual progress reviews"],
    modulesAf: ["Toesig-navorsingsetsis", "Seminaardeeelname", "Jaarlikse vorderingsoorsigte"],
  },
  {
    code: "PhD",
    titleEn: "PhD in Computer Science",
    titleAf: "PhD in Rekenaarwetenskap",
    durationEn: "3–4 years",
    durationAf: "3–4 jaar",
    descEn: "The PhD produces original, internationally significant contributions to computer science. Students work closely with supervisors and are expected to publish in top-tier venues.",
    descAf: "Die PhD lewer oorspronklike, internasionaal beduidende bydraes tot rekenaarwetenskap. Studente werk nou saam met toesighouers en word verwag om in toprangse venues te publiseer.",
    entryEn: "MSc or equivalent; proposal-based admission",
    entryAf: "MSc of ekwivalent; voorstel-gebaseerde toelating",
    modulesEn: ["Original research thesis", "International conference presentations", "Graduate school requirements"],
    modulesAf: ["Oorspronklike navorsingsetsis", "Internasionale konferensieaanbiedings", "Nagraadse skool-vereistes"],
  },
];

const SUPPORT_EN = [
  "NRF bursaries and scholarships for South African citizens",
  "SU Postgraduate Merit Awards",
  "Departmental research assistantships",
  "International exchange programmes (EU, UK, US)",
  "Dedicated postgraduate student workspace",
  "Access to HPC computing clusters",
];

const SUPPORT_AF = [
  "NNS-beurse en -studiebeurse vir Suid-Afrikaanse burgers",
  "SU Nagraadse Verdienste-toekennings",
  "Departementele navorsingassistentskappe",
  "Internasionale uitruilprogramme (EU, VK, VS)",
  "Toegewyde nagraadse studentewerkruimte",
  "Toegang tot HPC-rekenaarklusters",
];

export function PostgraduateContent() {
  const { lang } = useLanguage();
  const t = translations[lang].postgraduate;
  const support = lang === "en" ? SUPPORT_EN : SUPPORT_AF;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Degrees */}
        <section>
          <SectionHeader eyebrow={t.degreesEyebrow} title={t.degreesTitle} className="mb-10" />
          <div className="space-y-6">
            {DEGREES.map((deg, i) => (
              <MotionWrapper key={deg.code} delay={i * 0.1}>
                <GlassCard>
                  <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <span className="text-brand-gold text-xs font-semibold tracking-widest uppercase">{deg.code}</span>
                      <h3 className="font-display font-bold text-2xl text-brand-ink mt-1 mb-2">
                        {lang === "en" ? deg.titleEn : deg.titleAf}
                      </h3>
                      <span className="glass border border-black/10 px-3 py-1 rounded-full text-brand-muted text-xs">
                        {lang === "en" ? deg.durationEn : deg.durationAf}
                      </span>
                    </div>
                    <div className="lg:col-span-2">
                      <p className="text-brand-muted leading-relaxed mb-4">
                        {lang === "en" ? deg.descEn : deg.descAf}
                      </p>
                      <p className="text-xs text-brand-muted mb-4">
                        <span className="text-brand-muted font-medium">{t.entry}: </span>
                        {lang === "en" ? deg.entryEn : deg.entryAf}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(lang === "en" ? deg.modulesEn : deg.modulesAf).map((m) => (
                          <span key={m} className="px-2.5 py-1 rounded-full bg-brand-ink/5 border border-black/8 text-brand-muted text-xs">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </MotionWrapper>
            ))}
          </div>
        </section>

        {/* Support */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <MotionWrapper>
              <SectionHeader eyebrow={t.fundingEyebrow} title={t.fundingTitle} />
              <ul className="mt-6 space-y-3">
                {support.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-brand-muted text-sm">
                    <CheckCircle size={16} className="text-brand-gold mt-0.5 shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </MotionWrapper>
            <MotionWrapper delay={0.2}>
              <GlassCard variant="maroon">
                <div className="p-6">
                  <h3 className="font-display font-semibold text-brand-ink text-xl mb-3">{t.interestedTitle}</h3>
                  <p className="text-brand-muted text-sm mb-6">{t.interestedDesc}</p>
                  <div className="flex flex-col gap-3">
                    <Button asChild className="bg-brand-maroon hover:bg-brand-maroon-light text-white w-full">
                      <a href="mailto:postgrad@cs.sun.ac.za">
                        <Mail size={16} className="mr-2" />{t.emailCoordinator}
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="border-black/20 text-brand-ink hover:bg-brand-ink/5 w-full">
                      <Link href="/research">{t.exploreGroups}</Link>
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </MotionWrapper>
          </div>
        </section>
      </div>
    </>
  );
}
