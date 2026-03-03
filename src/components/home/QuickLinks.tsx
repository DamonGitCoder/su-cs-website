"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export function QuickLinks() {
  const { lang } = useLanguage();
  const t = translations[lang].home;

  const LINKS = [
    { label: t.undergraduateProgrammes, href: "/undergraduate" },
    { label: t.postgraduateProgrammes, href: "/postgraduate" },
    { label: t.researchGroupsLink, href: "/research/groups" },
    { label: t.academicStaffLink, href: "/people" },
    { label: t.eventsLink, href: "/events" },
    { label: t.publicationsLink, href: "/research/publications" },
    { label: t.studentFaqs, href: "/students" },
    { label: t.findUs, href: "/contact" },
  ];

  return (
    <section className="py-10 border-t border-black/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-brand-muted/40 text-[10px] tracking-[0.22em] uppercase text-center mb-6 font-medium">
          {t.quickAccess}
        </p>
        <div className="flex flex-wrap items-center justify-center divide-x divide-black/10">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 sm:px-5 py-1.5 text-sm text-brand-ink/50 hover:text-brand-maroon transition-colors duration-200 font-medium whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
