import type { Metadata } from "next";
import { UndergraduateContent } from "@/components/undergraduate/UndergraduateContent";

export const metadata: Metadata = {
  title: "Undergraduate Programmes",
  description: "Undergraduate computer science degree programmes at Stellenbosch University.",
};

export default function UndergraduatePage() {
  return <UndergraduateContent />;
}
