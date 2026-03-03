import type { Metadata } from "next";
import { PostgraduateContent } from "@/components/postgraduate/PostgraduateContent";

export const metadata: Metadata = {
  title: "Postgraduate Programmes",
  description: "Honours, Masters, and PhD programmes in Computer Science at Stellenbosch University.",
};

export default function PostgraduatePage() {
  return <PostgraduateContent />;
}
