import type { Metadata } from "next";
import { CoursesPage } from "@/components/pages/courses-page";

export const metadata: Metadata = { title: "Хичээл" };

export default function Page() {
  return <CoursesPage />;
}
