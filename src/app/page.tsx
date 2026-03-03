import { HeroSection } from "@/components/home/HeroSection";
import { ResearchPreview } from "@/components/home/ResearchPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import { QuickLinks } from "@/components/home/QuickLinks";
import { getAllResearchGroups } from "@/lib/drupal/research";
import { getAllNews } from "@/lib/drupal/news";

export default async function HomePage() {
  const [researchGroups, news] = await Promise.all([
    getAllResearchGroups(),
    getAllNews(3),
  ]);

  return (
    <>
      <HeroSection />
      <QuickLinks />
      <ResearchPreview groups={researchGroups} />
      <NewsPreview articles={news} />
    </>
  );
}
