export type ProgrammeLevel = "undergraduate" | "postgraduate";
export type YearLevel = 1 | 2 | 3 | 4; // 4 = Honours

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  yearLevel: YearLevel;
  level: ProgrammeLevel;
  semester: "first" | "second" | "year";
  prerequisites?: string[];
}

export interface CourseNodeAttributes {
  title: string;
  field_code: string;
  field_description: { value: string; processed: string } | null;
  field_credits: number;
  field_year: number;
  field_level: string;
  field_semester: string;
  field_prerequisites: string | null;
}
