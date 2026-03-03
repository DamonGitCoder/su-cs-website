import type { Metadata } from "next";
import { PublicationsContent } from "@/components/research/PublicationsContent";
import { getAllPublications } from "@/lib/drupal/publications";

export const metadata: Metadata = {
  title: "Publications",
  description: "Research publications from the Stellenbosch University Department of Computer Science.",
};

export default async function PublicationsPage() {
  const publications = await getAllPublications();
  return <PublicationsContent publications={publications} />;
}
