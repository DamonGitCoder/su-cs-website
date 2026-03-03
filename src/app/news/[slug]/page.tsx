import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { MotionWrapper } from "@/components/shared/MotionWrapper";
import { getNewsBySlug, getAllNews } from "@/lib/drupal/news";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const news = await getAllNews();
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <Link href="/news" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-ink text-sm mb-8 transition-colors">
            <ArrowLeft size={16} />Back to News
          </Link>
        </MotionWrapper>

        <MotionWrapper delay={0.1}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border text-brand-gold bg-brand-gold/10 border-brand-gold/20">
              {article.category}
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-brand-ink leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-brand-muted text-sm mb-10">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {new Date(article.publishedAt).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User size={13} />{article.author}
              </span>
            )}
          </div>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <GlassCard>
            <div
              className="p-8 prose prose-invert prose-sm max-w-none prose-headings:font-display prose-a:text-brand-gold"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          </GlassCard>
        </MotionWrapper>
      </div>
    </div>
  );
}
