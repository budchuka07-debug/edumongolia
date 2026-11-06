import type { Metadata } from "next";
import { StudentsPage } from "@/components/pages/students-page";

export const metadata: Metadata = { title: "Сурагч" };

export default function Page() {
  return <StudentsPage />;
}
