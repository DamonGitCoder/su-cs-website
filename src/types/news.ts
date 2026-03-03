export type NewsCategory =
  | "Research"
  | "Awards"
  | "Events"
  | "Announcements"
  | "Student"
  | "Industry";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  imageUrl: string | null;
  category: NewsCategory;
  publishedAt: string; // ISO date string
  author?: string;
}

export interface NewsNodeAttributes {
  title: string;
  field_body: { value: string; processed: string } | null;
  field_excerpt: string | null;
  field_category: string | null;
  field_author: string | null;
  created: string;
  path: { alias: string } | null;
}
