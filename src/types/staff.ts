export interface StaffMember {
  id: string;
  slug: string;
  name: string;
  position: string;
  bio: string;
  email: string;
  imageUrl: string | null;
  researchAreas: string[];
  googleScholarUrl?: string;
  orcidUrl?: string;
  personalWebsite?: string;
  officeLocation?: string;
  phone?: string;
}

export interface StaffNodeAttributes {
  title: string;
  field_position: string;
  field_bio: { value: string; processed: string } | null;
  field_email: string | null;
  field_research_areas: string | null;
  field_google_scholar: string | null;
  field_orcid: string | null;
  field_personal_website: string | null;
  field_office: string | null;
  field_phone: string | null;
  path: { alias: string } | null;
}
