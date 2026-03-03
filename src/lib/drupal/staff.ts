import { drupalList, drupalSingle, DRUPAL_BASE_URL } from "./client";
import type { DrupalNode } from "@/types/drupal";
import type { StaffMember, StaffNodeAttributes } from "@/types/staff";
import { extractImageUrl } from "@/types/drupal";
import { mockStaff } from "@/lib/mock-data";

const ENDPOINT = "node/staff";
const PARAMS = {
  include: "field_image",
  "fields[node--staff]":
    "title,field_position,field_bio,field_email,field_research_areas,field_google_scholar,field_orcid,field_personal_website,field_office,field_phone,path,field_image",
};

function toStaffMember(
  node: DrupalNode<StaffNodeAttributes>,
  included: Parameters<typeof extractImageUrl>[2] extends string ? never : Parameters<typeof extractImageUrl>[1]
): StaffMember {
  const imageId =
    (node.relationships.field_image?.data as { id: string } | null)?.id ??
    null;
  return {
    id: node.id,
    slug: node.attributes.path?.alias?.replace("/people/", "") ?? node.id,
    name: node.attributes.title,
    position: node.attributes.field_position ?? "",
    bio: node.attributes.field_bio?.processed ?? "",
    email: node.attributes.field_email ?? "",
    imageUrl: extractImageUrl(imageId, included as Parameters<typeof extractImageUrl>[1], DRUPAL_BASE_URL),
    researchAreas: node.attributes.field_research_areas
      ? node.attributes.field_research_areas.split(",").map((s) => s.trim())
      : [],
    googleScholarUrl: node.attributes.field_google_scholar ?? undefined,
    orcidUrl: node.attributes.field_orcid ?? undefined,
    personalWebsite: node.attributes.field_personal_website ?? undefined,
    officeLocation: node.attributes.field_office ?? undefined,
    phone: node.attributes.field_phone ?? undefined,
  };
}

export async function getAllStaff(): Promise<StaffMember[]> {
  const res = await drupalList<DrupalNode<StaffNodeAttributes>>(
    ENDPOINT,
    PARAMS,
    ["staff"]
  );
  if (!res) return mockStaff;
  return res.data.map((node) => toStaffMember(node, res.included ?? []));
}

export async function getStaffBySlug(
  slug: string
): Promise<StaffMember | null> {
  const res = await drupalList<DrupalNode<StaffNodeAttributes>>(
    ENDPOINT,
    { ...PARAMS, "filter[path.alias]": `/people/${slug}` },
    ["staff", `staff:${slug}`]
  );
  if (!res || res.data.length === 0) {
    return mockStaff.find((s) => s.slug === slug) ?? null;
  }
  return toStaffMember(res.data[0], res.included ?? []);
}
