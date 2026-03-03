import { drupalList, DRUPAL_BASE_URL } from "./client";
import type { DrupalNode } from "@/types/drupal";
import type { ResearchGroup, ResearchGroupNodeAttributes } from "@/types/research";
import { extractImageUrl } from "@/types/drupal";
import { mockResearchGroups } from "@/lib/mock-data";

const ENDPOINT = "node/research_group";
const PARAMS = {
  include: "field_image",
  "fields[node--research_group]":
    "title,field_short_name,field_description,field_focus_areas,field_leader_name,field_member_count,field_website_url,path,field_image",
};

function toResearchGroup(
  node: DrupalNode<ResearchGroupNodeAttributes>,
  included: Parameters<typeof extractImageUrl>[1] = []
): ResearchGroup {
  const imageId =
    (node.relationships.field_image?.data as { id: string } | null)?.id ?? null;
  return {
    id: node.id,
    slug: node.attributes.path?.alias?.replace("/research/", "") ?? node.id,
    name: node.attributes.title,
    shortName: node.attributes.field_short_name ?? node.attributes.title,
    description: node.attributes.field_description?.processed ?? "",
    focus: node.attributes.field_focus_areas
      ? node.attributes.field_focus_areas.split(",").map((s) => s.trim())
      : [],
    leaderId: "",
    leaderName: node.attributes.field_leader_name ?? "",
    memberCount: node.attributes.field_member_count ?? 0,
    imageUrl: extractImageUrl(imageId, included, DRUPAL_BASE_URL),
    websiteUrl: node.attributes.field_website_url ?? undefined,
  };
}

export async function getAllResearchGroups(): Promise<ResearchGroup[]> {
  const res = await drupalList<DrupalNode<ResearchGroupNodeAttributes>>(
    ENDPOINT,
    PARAMS,
    ["research"]
  );
  if (!res) return mockResearchGroups;
  return res.data.map((n) => toResearchGroup(n, res.included ?? []));
}
