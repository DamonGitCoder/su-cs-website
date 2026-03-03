"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SuEmblem } from "@/components/shared/SuEmblem";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const currentYear = new Date().getFullYear();

  const FOOTER_LINKS = {
    [t.footer.academic]: [
      { label: t.nav.undergraduate, href: "/undergraduate" },
      { label: t.nav.postgraduate, href: "/postgraduate" },
      { label: t.nav.courseCatalogue, href: "/undergraduate/courses" },
      { label: t.nav.students, href: "/students" },
    ],
    [t.footer.research]: [
      { label: t.nav.overview, href: "/research" },
      { label: t.nav.publications, href: "/research/publications" },
      { label: t.nav.researchGroups, href: "/research/groups" },
      { label: t.nav.newsEvents, href: "/news" },
    ],
    [t.footer.department]: [
      { label: t.nav.about, href: "/about" },
      { label: t.nav.academicStaff, href: "/people" },
      { label: t.nav.events, href: "/events" },
      { label: t.nav.contact, href: "/contact" },
    ],
  };

  const EXTERNAL_LINKS = [
    {
      label: lang === "en" ? "Stellenbosch University" : "Universiteit Stellenbosch",
      href: "https://www.sun.ac.za",
    },
    {
      label: lang === "en" ? "Faculty of Science" : "Fakulteit Natuur- en Sterrewetenskappe",
      href: "https://science.sun.ac.za",
    },
    { label: lang === "en" ? "SUNLearn (e-learning)" : "SUNLearn (e-leer)", href: "https://learn.sun.ac.za" },
    { label: lang === "en" ? "SU Library" : "SU Biblioteek", href: "https://library.sun.ac.za" },
  ];

  return (
    <footer className="bg-brand-warm border-t border-black/8 mt-20">
      {/* Maroon accent bar */}
      <div className="h-1 bg-brand-maroon" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group w-fit">
              <SuEmblem className="w-8 h-10 transition-transform duration-200 group-hover:scale-105" />
              <div className="flex flex-col leading-none">
                <span
                  className="font-display font-bold text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: "#caa258" }}
                >
                  {lang === "en" ? "Stellenbosch University" : "Universiteit Stellenbosch"}
                </span>
                <span className="text-brand-ink font-semibold text-[13px] tracking-tight leading-tight mt-0.5">
                  {lang === "en" ? "Department of Computer Science" : "Departement Rekenaarwetenskap"}
                </span>
              </div>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed mb-6 max-w-xs">
              {t.footer.description}
            </p>

            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:secretary@cs.sun.ac.za"
                className="flex items-center gap-2 text-brand-muted hover:text-brand-maroon transition-colors text-sm"
              >
                <Mail size={14} />
                secretary@cs.sun.ac.za
              </a>
              <a
                href="tel:+27218084232"
                className="flex items-center gap-2 text-brand-muted hover:text-brand-maroon transition-colors text-sm"
              >
                <Phone size={14} />
                +27 (0)21 808 4232
              </a>
              <span className="flex items-start gap-2 text-brand-muted text-sm">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                {lang === "en"
                  ? "Mathematical Sciences Building, Stellenbosch University, 7600"
                  : "Wiskundige Wetenskappe-gebou, Universiteit Stellenbosch, 7600"}
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-brand-ink text-xs font-semibold tracking-widest uppercase mb-4">
                {title}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-brand-muted hover:text-brand-maroon text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-black/8" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-brand-muted/70 text-xs">
            © {currentYear} {t.footer.copyright} {t.footer.rights}
          </p>
          <div className="flex flex-wrap gap-4">
            {EXTERNAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-brand-muted/60 hover:text-brand-maroon text-xs transition-colors"
              >
                {link.label}
                <ExternalLink size={10} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
