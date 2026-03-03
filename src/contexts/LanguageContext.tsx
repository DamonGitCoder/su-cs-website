"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "af";

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
}

const LanguageContext = createContext<LangContextValue>({ lang: "en", toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("su-cs-lang") as Lang | null;
      if (saved === "af") setLang("af");
    } catch {}
  }, []);

  const toggle = () =>
    setLang((l) => {
      const next: Lang = l === "en" ? "af" : "en";
      try { localStorage.setItem("su-cs-lang", next); } catch {}
      return next;
    });

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
