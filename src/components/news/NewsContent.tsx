"use client";

import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { GlassCard } from "@/components/shared/GlassCard";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import type { NewsArticle } from "@/types/news";

const CATEGORY_COLORS: Record<string, string> = {
  Research: "text-blue-400 bg-blue-600/10 border-blue-600/20",
  Awards: "text-brand-gold bg-brand-gold/10 border-brand-gold/20",
  Events: "text-emerald-400 bg-emerald-600/10 border-emerald-600/20",
  Announcements: "text-brand-muted bg-brand-ink/5 border-black/10",
  Student: "text-purple-400 bg-purple-600/10 border-purple-600/20",
  Industry: "text-orange-400 bg-orange-600/10 border-orange-600/20",
};

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function NewsContent({ articles }: { articles: NewsArticle[] }) {
  const { lang } = useLanguage();
  const t = translations[lang].news;
  const locale = lang === "en" ? "en-ZA" : "af-ZA";

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          {articles.map((article, i) => (
            <MotionWrapper key={article.id} delay={i * 0.07}>
              <Link href={`/news/${article.slug}`} className="block">
                <GlassCard className="group">
                  <div className="p-6 flex flex-col sm:flex-row gap-6">
                    {/* Date column */}
                    <div className="sm:w-32 shrink-0 flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0">
                      <Calendar size={14} className="text-brand-muted/60 sm:mb-2" />
                      <span className="text-brand-muted text-xs">{formatDate(article.publishedAt, locale)}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS["Announcements"]}`}>
                          {article.category}
                        </span>
                      </div>
                      <h2 className="font-display font-semibold text-brand-ink text-xl mb-2 group-hover:text-brand-maroon transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-brand-muted text-sm leading-relaxed line-clamp-2">{article.excerpt}</p>
                      {article.author && (
                        <p className="text-brand-muted/60 text-xs mt-3">{t.by} {article.author}</p>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </MotionWrapper>
          ))}
          {articles.length === 0 && (
            <div className="text-center py-20 text-brand-muted">{t.noResults}</div>
          )}
        </div>
      </div>
    </>
  );
}
