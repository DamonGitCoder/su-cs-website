import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Department of Computer Science at Stellenbosch University — our history, mission, and values.",
};

export default function AboutPage() {
  return <AboutContent />;
}
