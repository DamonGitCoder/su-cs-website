"use client";

import { PageHero } from "@/components/shared/PageHero";
import { GlassCard } from "@/components/shared/GlassCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { CheckCircle, Award, Users, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const MILESTONES = [
  { year: "1972", en: "Department of Computer Science established at Stellenbosch University.", af: "Departement Rekenaarwetenskap gestig aan die Universiteit Stellenbosch." },
  { year: "1986", en: "First postgraduate research programme introduced in AI and algorithm theory.", af: "Eerste nagraadse navorsingsprogram in KI en algoritme-teorie bekendgestel." },
  { year: "2002", en: "Merger with Department of Mathematics to form Mathematical Sciences Division.", af: "Samesmelting met Departement Wiskunde om die Afdeling Wiskundige Wetenskappe te vorm." },
  { year: "2015", en: "Launch of the Robotics & Autonomous Systems research group.", af: "Bekendstelling van die navorsingsgroep Robotika en Outonome Stelsels." },
  { year: "2021", en: "Awarded NRF Centre of Excellence status for AI research.", af: "NNS Uitnemendheidssentrum-status vir KI-navorsing toegeken." },
  { year: "2024", en: "New state-of-the-art computing labs and robotics facility opened.", af: "Nuwe rekenaarlaboratoriums en robotika-fasiliteit geopen." },
];

const VALUES_EN = [
  { icon: Award, title: "Academic Excellence", description: "We hold ourselves to the highest standards of scholarship, rigorous research, and intellectual honesty." },
  { icon: Users, title: "Inclusive Community", description: "We foster a welcoming environment for students and staff of all backgrounds, with a focus on transformation in South African computing." },
  { icon: BookOpen, title: "Impactful Research", description: "Our work addresses real-world problems — from healthcare to agriculture — with demonstrable impact at a local and global scale." },
  { icon: CheckCircle, title: "Ethical Technology", description: "We are committed to responsible AI, data privacy, and the ethical implications of the systems we build." },
];

const VALUES_AF = [
  { icon: Award, title: "Akademiese Uitnemendheid", description: "Ons hou onsself aan die hoogste standaarde van geleerdheid, streng navorsing en intellektuele eerlikheid." },
  { icon: Users, title: "Inklusiewe Gemeenskap", description: "Ons bevorder 'n verwelkomende omgewing vir studente en personeel van alle agtergronde, met 'n fokus op transformasie in Suid-Afrikaanse rekenaarkunde." },
  { icon: BookOpen, title: "Impakvolle Navorsing", description: "Ons werk spreek werklike probleme aan — van gesondheidsorg tot landbou — met aantoonbare impak op plaaslike en globale skaal." },
  { icon: CheckCircle, title: "Etiese Tegnologie", description: "Ons is verbind tot verantwoordelike KI, data-privaatheid en die etiese implikasies van die stelsels wat ons bou." },
];

const STATS_EN = [
  { value: "1972", label: "Founded" },
  { value: "11+", label: "Academic Staff" },
  { value: "150+", label: "Students" },
  { value: "200+", label: "Publications" },
];

const STATS_AF = [
  { value: "1972", label: "Gestig" },
  { value: "11+", label: "Akademiese Personeel" },
  { value: "150+", label: "Studente" },
  { value: "200+", label: "Publikasies" },
];

export function AboutContent() {
  const { lang } = useLanguage();
  const t = translations[lang].about;
  const values = lang === "en" ? VALUES_EN : VALUES_AF;
  const stats = lang === "en" ? STATS_EN : STATS_AF;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Mission */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <MotionWrapper>
              <SectionHeader
                eyebrow={t.missionEyebrow}
                title={t.missionTitle}
              />
              <div className="mt-6 space-y-4 text-brand-muted leading-relaxed text-sm">
                {lang === "en" ? (
                  <>
                    <p>
                      The Department of Computer Science at Stellenbosch University is home to eleven
                      full academic staff members and a vibrant community of postgraduate researchers.
                      We are part of the Faculty of Science and reside within the Mathematical Sciences Division.
                    </p>
                    <p>
                      Our research spans machine learning, robotics, formal methods, human-computer interaction,
                      cybersecurity, and distributed systems. We collaborate with industry partners across South
                      Africa, Europe, and North America, translating fundamental research into practical solutions.
                    </p>
                    <p>
                      Our undergraduate programmes produce graduates who are immediately productive in the
                      technology industry, while our postgraduate programmes develop the next generation of
                      researchers and academic leaders.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Die Departement Rekenaarwetenskap aan die Universiteit Stellenbosch is tuis vir elf
                      voltydse akademiese personeellede en 'n lewendige gemeenskap van nagraadse navorsers.
                      Ons is deel van die Fakulteit Natuur- en Sterrewetenskappe en is binne die Afdeling Wiskundige Wetenskappe geleë.
                    </p>
                    <p>
                      Ons navorsing strek oor masjienleer, robotika, formele metodes, mens-rekenaarinteraksie,
                      kubersekuriteit en verspreide stelsels. Ons werk saam met nywerheidsvennote regoor Suid-Afrika,
                      Europa en Noord-Amerika, en vertaal fundamentele navorsing in praktiese oplossings.
                    </p>
                    <p>
                      Ons voorgraadse programme lewer gegradueerdes wat onmiddellik produktief is in die
                      tegnologiebedryf, terwyl ons nagraadse programme die volgende geslag navorsers en
                      akademiese leiers ontwikkel.
                    </p>
                  </>
                )}
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.2} direction="left">
              <GlassCard variant="maroon">
                <div className="p-8 grid grid-cols-2 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="font-display font-bold text-3xl text-brand-ink mb-1">{stat.value}</div>
                      <div className="text-brand-muted text-xs uppercase tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </MotionWrapper>
          </div>
        </section>

        {/* Values */}
        <section>
          <SectionHeader
            eyebrow={t.valuesEyebrow}
            title={t.valuesTitle}
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <MotionWrapper key={value.title} delay={i * 0.1}>
                <GlassCard className="h-full">
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-maroon/20 border border-brand-maroon/20 flex items-center justify-center mb-4">
                      <value.icon size={20} className="text-brand-maroon-light" />
                    </div>
                    <h3 className="font-display font-semibold text-brand-ink text-base mb-2">{value.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{value.description}</p>
                  </div>
                </GlassCard>
              </MotionWrapper>
            ))}
          </div>
        </section>

        {/* History timeline */}
        <section>
          <SectionHeader eyebrow={t.historyEyebrow} title={t.historyTitle} className="mb-12" />
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-brand-maroon via-brand-gold/50 to-transparent" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <MotionWrapper key={m.year} delay={i * 0.08} className="flex gap-8 items-start">
                  <div className="w-16 text-right shrink-0">
                    <span className="font-display font-bold text-brand-gold text-sm">{m.year}</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-brand-maroon border-2 border-brand-black" />
                    <GlassCard className="flex-1">
                      <p className="p-4 text-brand-ink/60 text-sm leading-relaxed">
                        {lang === "en" ? m.en : m.af}
                      </p>
                    </GlassCard>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
