import { drupalList } from "./client";
import type { DrupalNode } from "@/types/drupal";
import type { Course, CourseNodeAttributes, YearLevel, ProgrammeLevel } from "@/types/course";
import { mockCourses } from "@/lib/mock-data";

const ENDPOINT = "node/course";
const PARAMS = {
  "fields[node--course]":
    "title,field_code,field_description,field_credits,field_year,field_level,field_semester,field_prerequisites",
  sort: "field_year,field_code",
};

function toCourse(node: DrupalNode<CourseNodeAttributes>): Course {
  return {
    id: node.id,
    code: node.attributes.field_code ?? node.attributes.title,
    title: node.attributes.title,
    description: node.attributes.field_description?.processed ?? "",
    credits: node.attributes.field_credits ?? 16,
    yearLevel: (node.attributes.field_year ?? 1) as YearLevel,
    level: (node.attributes.field_level ?? "undergraduate") as ProgrammeLevel,
    semester: (node.attributes.field_semester ?? "first") as Course["semester"],
    prerequisites: node.attributes.field_prerequisites
      ? node.attributes.field_prerequisites.split(",").map((s) => s.trim())
      : [],
  };
}

export async function getAllCourses(): Promise<Course[]> {
  const res = await drupalList<DrupalNode<CourseNodeAttributes>>(
    ENDPOINT,
    PARAMS,
    ["courses"]
  );
  if (!res) return mockCourses;
  return res.data.map(toCourse);
}

export async function getCoursesByLevel(level: ProgrammeLevel): Promise<Course[]> {
  const res = await drupalList<DrupalNode<CourseNodeAttributes>>(
    ENDPOINT,
    { ...PARAMS, "filter[field_level]": level },
    ["courses", `courses:${level}`]
  );
  if (!res) return mockCourses.filter((c) => c.level === level);
  return res.data.map(toCourse);
}
