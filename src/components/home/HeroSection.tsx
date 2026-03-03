"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AsciiCanvas } from "./AsciiCanvas";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export function HeroSection() {
  const { lang } = useLanguage();
  const t = translations[lang].home;

  const STATS = [
    { value: "1972", label: t.founded },
    { value: "11+", label: t.academicStaff },
    { value: "4", label: t.researchLabs },
    { value: "200+", label: t.publications },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-brand-cream">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      {/* Faint maroon radial glow behind canvas */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-maroon/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative pt-28 pb-4 text-center"
      >
        <span className="inline-flex items-center gap-3 text-brand-muted text-xs font-semibold tracking-[0.22em] uppercase">
          <span className="block w-8 h-px bg-brand-maroon/35" />
          {t.eyebrow}
          <span className="block w-8 h-px bg-brand-maroon/35" />
        </span>
      </motion.div>

      {/* ASCII Canvas — the hero centrepiece */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" as const }}
        className="relative mx-3 sm:mx-6 lg:mx-10 rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm"
        style={{ height: "clamp(340px, 52vw, 680px)" }}
      >
        <AsciiCanvas />
      </motion.div>

      {/* Bottom content */}
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.9, ease: "easeOut" as const }}
          className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.5rem] text-brand-ink leading-[1.08] mb-4 tracking-tight"
        >
          {t.heading}{" "}
          <span className="text-gradient-maroon">{t.headingHighlight}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" as const }}
          className="text-brand-muted text-lg leading-relaxed max-w-xl mx-auto mb-8"
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3, ease: "easeOut" as const }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          <Button
            asChild
            size="lg"
            className="bg-brand-maroon hover:bg-brand-maroon-light text-white font-semibold px-8 rounded-xl glow-maroon group"
          >
            <Link href="/research">
              {t.exploreResearch}
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-brand-ink/20 text-brand-ink hover:bg-brand-ink/5 hover:border-brand-ink/40 font-semibold px-8 rounded-xl bg-transparent"
          >
            <Link href="/undergraduate">{t.viewProgrammes}</Link>
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex justify-center gap-8 sm:gap-14"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-2xl sm:text-3xl text-brand-maroon">
                {stat.value}
              </div>
              <div className="text-brand-muted text-[10px] tracking-widest uppercase mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-brand-muted/40 text-[10px] tracking-widest uppercase">
          {t.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-brand-muted/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
