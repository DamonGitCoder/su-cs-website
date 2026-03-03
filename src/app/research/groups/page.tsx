import type { Metadata } from "next";
import { ResearchGroupsContent } from "@/components/research/ResearchGroupsContent";
import { getAllResearchGroups } from "@/lib/drupal/research";

export const metadata: Metadata = {
  title: "Research Groups",
  description: "Research groups, labs, and centres of excellence in the Stellenbosch University CS Department.",
};

export default async function ResearchGroupsPage() {
  const groups = await getAllResearchGroups();
  return <ResearchGroupsContent groups={groups} />;
}
