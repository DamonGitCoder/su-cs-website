import type { Metadata } from "next";
import { StudentsContent } from "@/components/students/StudentsContent";

export const metadata: Metadata = {
  title: "Student Resources",
  description: "Resources, FAQs, forms, and useful links for CS students at Stellenbosch University.",
};

export default function StudentsPage() {
  return <StudentsContent />;
}
