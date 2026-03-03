"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlassCard } from "@/components/shared/GlassCard";
import { StaggerContainer, staggerItem } from "@/components/shared/MotionWrapper";
import { motion } from "framer-motion";
import type { NewsArticle } from "@/types/news";

const CATEGORY_COLORS: Record<string, string> = {
  Research:      "bg-blue-600/10 text-blue-700 border-blue-600/20",
  Awards:        "bg-brand-gold/15 text-amber-700 border-brand-gold/25",
  Events:        "bg-emerald-600/10 text-emerald-700 border-emerald-600/20",
  Announcements: "bg-brand-ink/8 text-brand-muted border-black/10",
  Student:       "bg-purple-600/10 text-purple-700 border-purple-600/20",
  Industry:      "bg-orange-600/10 text-orange-700 border-orange-600/20",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function NewsCard({ article }: { article: NewsArticle }) {
  const colorClass =
    CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS["Announcements"];
  return (
    <motion.div variants={staggerItem} className="h-full">
      <Link href={`/news/${article.slug}`} className="block h-full">
        <GlassCard className="h-full group">
          {/* Image placeholder */}
          <div className="h-40 bg-gradient-to-br from-brand-maroon/12 via-brand-warm to-brand-cream relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/80 to-transparent" />
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${colorClass}`}>
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-brand-muted/60 text-xs">
                <Calendar size={11} />
                {formatDate(article.publishedAt)}
              </span>
            </div>
            <h3 className="font-display font-semibold text-brand-ink text-base leading-snug mb-2 group-hover:text-brand-maroon transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed line-clamp-2">
              {article.excerpt}
            </p>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}

interface NewsPreviewProps {
  articles: NewsArticle[];
}

export function NewsPreview({ articles }: NewsPreviewProps) {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <SectionHeader
            eyebrow="Latest"
            title="News & Announcements"
            description="Stay up to date with research breakthroughs, department announcements, and student achievements."
          />
          <Link
            href="/news"
            className="flex items-center gap-2 text-brand-maroon text-sm font-semibold hover:gap-3 transition-all shrink-0"
          >
            All News <ArrowRight size={16} />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
