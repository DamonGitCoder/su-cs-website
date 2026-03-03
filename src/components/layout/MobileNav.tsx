"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lang } from "@/contexts/LanguageContext";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; description?: string }[];
}

interface MobileNavProps {
  items: NavItem[];
  onClose: () => void;
  lang: Lang;
  onToggleLang: () => void;
}

export function MobileNav({ items, onClose, lang, onToggleLang }: MobileNavProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 top-16 z-40 glass border-t border-black/10 overflow-y-auto"
    >
      <nav className="flex flex-col p-6 gap-1 max-w-sm ml-auto min-h-full bg-white/95">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {item.href && !item.children ? (
              <Link
                href={item.href}
                onClick={onClose}
                className="flex items-center px-4 py-3 rounded-xl text-brand-ink/70 hover:text-brand-ink hover:bg-brand-ink/5 font-medium transition-all"
              >
                {item.label}
              </Link>
            ) : (
              <div>
                <button
                  onClick={() =>
                    setOpenSection(openSection === item.label ? null : item.label)
                  }
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-brand-ink/70 hover:text-brand-ink hover:bg-brand-ink/5 font-medium transition-all"
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={cn(
                      "transition-transform duration-200 text-brand-muted",
                      openSection === item.label && "rotate-180"
                    )}
                  />
                </button>
                {openSection === item.label && item.children && (
                  <div className="ml-4 border-l border-black/10 pl-4 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className="px-3 py-2.5 rounded-lg text-sm text-brand-muted hover:text-brand-ink hover:bg-brand-ink/5 transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}

        <div className="mt-6 pt-6 border-t border-black/10">
          <button
            onClick={onToggleLang}
            className="w-full px-4 py-2 rounded-lg border border-black/10 text-brand-muted text-sm font-medium hover:border-brand-maroon/30 hover:text-brand-maroon transition-all"
          >
            {lang === "en" ? "Switch to Afrikaans" : "Skakel na Engels"}
          </button>
        </div>
      </nav>
    </motion.div>
  );
}
