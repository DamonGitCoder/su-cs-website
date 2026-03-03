import type { Metadata } from "next";
import { NewsContent } from "@/components/news/NewsContent";
import { getAllNews } from "@/lib/drupal/news";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news, announcements, and press releases from the Stellenbosch University Department of Computer Science.",
};

export default async function NewsPage() {
  const articles = await getAllNews();
  return <NewsContent articles={articles} />;
}
