import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Stellenbosch University Department of Computer Science.",
};

export default function ContactPage() {
  return <ContactContent />;
}
