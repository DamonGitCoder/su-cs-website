import { drupalList, drupalSingle, DRUPAL_BASE_URL } from "./client";
import type { DrupalNode } from "@/types/drupal";
import type { NewsArticle, NewsNodeAttributes, NewsCategory } from "@/types/news";
import { extractImageUrl } from "@/types/drupal";
import { mockNews } from "@/lib/mock-data";

const ENDPOINT = "node/news";
const PARAMS = {
  include: "field_image",
  "fields[node--news]":
    "title,field_body,field_excerpt,field_category,field_author,created,path,field_image",
  sort: "-created",
};

function toNewsArticle(
  node: DrupalNode<NewsNodeAttributes>,
  included: Parameters<typeof extractImageUrl>[1] = []
): NewsArticle {
  const imageId =
    (node.relationships.field_image?.data as { id: string } | null)?.id ?? null;
  const body = node.attributes.field_body?.processed ?? "";
  return {
    id: node.id,
    slug: node.attributes.path?.alias?.replace("/news/", "") ?? node.id,
    title: node.attributes.title,
    excerpt: node.attributes.field_excerpt ?? body.slice(0, 200).replace(/<[^>]*>/g, "") + "…",
    body,
    imageUrl: extractImageUrl(imageId, included, DRUPAL_BASE_URL),
    category: (node.attributes.field_category ?? "Announcements") as NewsCategory,
    publishedAt: node.attributes.created,
    author: node.attributes.field_author ?? undefined,
  };
}

export async function getAllNews(limit?: number): Promise<NewsArticle[]> {
  const params = limit ? { ...PARAMS, "page[limit]": String(limit) } : PARAMS;
  const res = await drupalList<DrupalNode<NewsNodeAttributes>>(ENDPOINT, params, ["news"]);
  if (!res) return limit ? mockNews.slice(0, limit) : mockNews;
  return res.data.map((n) => toNewsArticle(n, res.included ?? []));
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const res = await drupalList<DrupalNode<NewsNodeAttributes>>(
    ENDPOINT,
    { ...PARAMS, "filter[path.alias]": `/news/${slug}` },
    ["news", `news:${slug}`]
  );
  if (!res || res.data.length === 0)
    return mockNews.find((n) => n.slug === slug) ?? null;
  return toNewsArticle(res.data[0], res.included ?? []);
}
