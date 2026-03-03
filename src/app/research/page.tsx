import type { Metadata } from "next";
import { ResearchContent } from "@/components/research/ResearchContent";
import { getAllResearchGroups } from "@/lib/drupal/research";
import { getRecentPublications } from "@/lib/drupal/publications";

export const metadata: Metadata = {
  title: "Research",
  description: "Explore world-class research in AI, robotics, software engineering, and formal methods at Stellenbosch University Computer Science.",
};

export default async function ResearchPage() {
  const [groups, recentPubs] = await Promise.all([
    getAllResearchGroups(),
    getRecentPublications(3),
  ]);
  return <ResearchContent groups={groups} recentPubs={recentPubs} />;
}
