import type { Metadata } from "next";
import { PeopleContent } from "@/components/people/PeopleContent";
import { getAllStaff } from "@/lib/drupal/staff";

export const metadata: Metadata = {
  title: "Academic Staff",
  description: "Meet the academic staff and faculty of the Stellenbosch University Department of Computer Science.",
};

export default async function PeoplePage() {
  const staff = await getAllStaff();
  return <PeopleContent staff={staff} />;
}
