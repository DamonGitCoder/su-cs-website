// Base Drupal JSON:API response shapes

export interface DrupalJsonApiLink {
  href: string;
}

export interface DrupalJsonApiLinks {
  self?: DrupalJsonApiLink;
  related?: DrupalJsonApiLink;
}

export interface DrupalFile {
  id: string;
  type: "file--file";
  attributes: {
    uri: { value: string; url: string };
    url: string;
    filename: string;
    filemime: string;
  };
}

export interface DrupalMediaImage {
  id: string;
  type: "media--image";
  attributes: { name: string };
  relationships: {
    field_media_image: { data: { id: string; type: "file--file" } };
  };
}

export interface DrupalResourceIdentifier {
  id: string;
  type: string;
}

export interface DrupalRelationship {
  data: DrupalResourceIdentifier | DrupalResourceIdentifier[] | null;
  links?: DrupalJsonApiLinks;
}

export interface DrupalNode<T = Record<string, unknown>> {
  id: string;
  type: string;
  attributes: T;
  relationships: Record<string, DrupalRelationship>;
  links?: DrupalJsonApiLinks;
}

export interface DrupalListResponse<T> {
  data: T[];
  included?: (DrupalFile | DrupalMediaImage | DrupalNode)[];
  links?: DrupalJsonApiLinks;
  meta?: { count: number };
}

export interface DrupalSingleResponse<T> {
  data: T;
  included?: (DrupalFile | DrupalMediaImage | DrupalNode)[];
  links?: DrupalJsonApiLinks;
}

export interface DrupalError {
  errors: Array<{
    status: string;
    title: string;
    detail: string;
  }>;
}

/** Extract a file URL from the included array by media relationship id */
export function extractImageUrl(
  mediaId: string | null | undefined,
  included: (DrupalFile | DrupalMediaImage | DrupalNode)[] = [],
  baseUrl: string = ""
): string | null {
  if (!mediaId) return null;
  const media = included.find((n) => n.id === mediaId) as
    | DrupalMediaImage
    | undefined;
  if (!media) return null;
  const fileId =
    media.relationships?.field_media_image?.data?.id as string | undefined;
  if (!fileId) return null;
  const file = included.find((n) => n.id === fileId) as DrupalFile | undefined;
  if (!file) return null;
  const url = file.attributes.uri?.url ?? file.attributes.url;
  return url ? `${baseUrl}${url}` : null;
}
