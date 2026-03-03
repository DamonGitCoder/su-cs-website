export type PublicationType =
  | "journal"
  | "conference"
  | "book"
  | "chapter"
  | "thesis"
  | "preprint";

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  doi?: string;
  venue?: string; // journal or conference name
  type: PublicationType;
  url?: string;
  citationCount?: number;
}

export interface PublicationNodeAttributes {
  title: string;
  field_authors: string | null;
  field_abstract: { value: string; processed: string } | null;
  field_year: number;
  field_doi: string | null;
  field_venue: string | null;
  field_publication_type: string | null;
  field_url: string | null;
}
