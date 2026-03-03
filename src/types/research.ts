export interface ResearchGroup {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  focus: string[];
  leaderId: string;
  leaderName: string;
  memberCount: number;
  imageUrl: string | null;
  websiteUrl?: string;
  publicationCount?: number;
}

export interface ResearchGroupNodeAttributes {
  title: string;
  field_short_name: string | null;
  field_description: { value: string; processed: string } | null;
  field_focus_areas: string | null;
  field_leader_name: string | null;
  field_member_count: number;
  field_website_url: string | null;
  path: { alias: string } | null;
}
