import { drupalList } from "./client";
import type { DrupalNode } from "@/types/drupal";
import type { Publication, PublicationNodeAttributes, PublicationType } from "@/types/publication";
import { mockPublications } from "@/lib/mock-data";

const ENDPOINT = "node/publication";
const PARAMS = {
  "fields[node--publication]":
    "title,field_authors,field_abstract,field_year,field_doi,field_venue,field_publication_type,field_url",
  sort: "-field_year",
};

function toPublication(node: DrupalNode<PublicationNodeAttributes>): Publication {
  return {
    id: node.id,
    title: node.attributes.title,
    authors: node.attributes.field_authors
      ? node.attributes.field_authors.split(";").map((s) => s.trim())
      : [],
    abstract: node.attributes.field_abstract?.processed ?? "",
    year: node.attributes.field_year ?? new Date().getFullYear(),
    doi: node.attributes.field_doi ?? undefined,
    venue: node.attributes.field_venue ?? undefined,
    type: (node.attributes.field_publication_type ?? "journal") as PublicationType,
    url: node.attributes.field_url ?? undefined,
  };
}

export async function getAllPublications(): Promise<Publication[]> {
  const res = await drupalList<DrupalNode<PublicationNodeAttributes>>(
    ENDPOINT,
    PARAMS,
    ["publications"]
  );
  if (!res) return mockPublications;
  return res.data.map(toPublication);
}

export async function getRecentPublications(limit = 10): Promise<Publication[]> {
  const res = await drupalList<DrupalNode<PublicationNodeAttributes>>(
    ENDPOINT,
    { ...PARAMS, "page[limit]": String(limit) },
    ["publications"]
  );
  if (!res) return mockPublications.slice(0, limit);
  return res.data.map(toPublication);
}
