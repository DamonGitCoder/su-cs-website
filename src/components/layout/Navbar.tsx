"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { SuEmblem } from "@/components/shared/SuEmblem";

type NavItem = {
  labelKey: string;
  href?: string;
  children?: { labelKey: string; href: string; descKey: string }[];
};

type AnyTranslation = (typeof translations)["en"] | (typeof translations)["af"];
function buildNavItems(t: AnyTranslation) {
  return [
    { labelKey: t.nav.about, href: "/about" },
    {
      labelKey: t.nav.people,
      children: [
        { labelKey: t.nav.academicStaff, href: "/people", descKey: t.nav.academicStaffDesc },
        { labelKey: t.nav.researchGroups, href: "/research/groups", descKey: t.nav.researchGroupsDesc },
      ],
    },
    {
      labelKey: t.nav.research,
      children: [
        { labelKey: t.nav.overview, href: "/research", descKey: t.nav.overviewDesc },
        { labelKey: t.nav.publications, href: "/research/publications", descKey: t.nav.publicationsDesc },
        { labelKey: t.nav.researchGroups, href: "/research/groups", descKey: t.nav.researchGroupsDesc2 },
      ],
    },
    {
      labelKey: t.nav.programmes,
      children: [
        { labelKey: t.nav.undergraduate, href: "/undergraduate", descKey: t.nav.undergraduateDesc },
        { labelKey: t.nav.postgraduate, href: "/postgraduate", descKey: t.nav.postgraduateDesc },
        { labelKey: t.nav.courseCatalogue, href: "/undergraduate/courses", descKey: t.nav.courseCatalogueDesc },
      ],
    },
    {
      labelKey: t.nav.newsEvents,
      children: [
        { labelKey: t.nav.news, href: "/news", descKey: t.nav.newsDesc },
        { labelKey: t.nav.events, href: "/events", descKey: t.nav.eventsDesc },
      ],
    },
    { labelKey: t.nav.students, href: "/students" },
    { labelKey: t.nav.contact, href: "/contact" },
  ];
}


function DropdownMenu({ items }: { items: { labelKey: string; href: string; descKey: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.16, ease: "easeOut" as const }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl glass border border-black/8 shadow-lg shadow-black/8 overflow-hidden z-50"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col px-4 py-3 hover:bg-brand-maroon/5 transition-colors group"
        >
          <span className="text-sm font-medium text-brand-ink group-hover:text-brand-maroon transition-colors">
            {item.labelKey}
          </span>
          <span className="text-xs text-brand-muted mt-0.5">{item.descKey}</span>
        </Link>
      ))}
    </motion.div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { lang, toggle } = useLanguage();
  const t = translations[lang];
  const navItems = buildNavItems(t);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Build mobile nav items for MobileNav component
  const mobileNavItems = navItems.map((item) => ({
    label: item.labelKey,
    href: item.href,
    children: item.children?.map((c) => ({
      label: c.labelKey,
      href: c.href,
      description: c.descKey,
    })),
  }));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-black/8 shadow-sm shadow-black/5"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">

            {/* ── Logo / Branding ── */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <SuEmblem className="w-8 h-10 transition-transform duration-200 group-hover:scale-105" />
              <div className="hidden sm:flex flex-col leading-none">
                <span
                  className="font-display font-bold text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: "#caa258" }}
                >
                  Stellenbosch University
                </span>
                <span className="text-brand-ink font-semibold text-[13px] tracking-tight leading-tight mt-0.5">
                  {lang === "en" ? "Department of Computer Science" : "Departement Rekenaarwetenskap"}
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <div
                  key={item.labelKey}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenMenu(item.labelKey)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  {item.href && !item.children ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        pathname === item.href
                          ? "text-brand-maroon bg-brand-maroon/8"
                          : "text-brand-ink/70 hover:text-brand-ink hover:bg-brand-ink/5"
                      )}
                    >
                      {item.labelKey}
                    </Link>
                  ) : (
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        openMenu === item.labelKey
                          ? "text-brand-maroon bg-brand-maroon/8"
                          : "text-brand-ink/70 hover:text-brand-ink hover:bg-brand-ink/5"
                      )}
                    >
                      {item.labelKey}
                      <ChevronDown
                        size={13}
                        className={cn(
                          "transition-transform duration-200",
                          openMenu === item.labelKey && "rotate-180"
                        )}
                      />
                    </button>
                  )}
                  <AnimatePresence>
                    {item.children && openMenu === item.labelKey && (
                      <DropdownMenu items={item.children} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-ink/15 text-brand-ink/60 hover:text-brand-ink hover:border-brand-ink/30 text-xs font-medium transition-all"
                aria-label="Toggle language"
              >
                {lang === "en" ? "EN" : "AF"} / {lang === "en" ? "AF" : "EN"}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-brand-ink/60 hover:text-brand-ink hover:bg-brand-ink/8 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileNav
            items={mobileNavItems}
            onClose={() => setMobileOpen(false)}
            lang={lang}
            onToggleLang={toggle}
          />
        )}
      </AnimatePresence>
    </>
  );
}
