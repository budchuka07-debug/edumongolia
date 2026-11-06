import type { Metadata } from "next";
import { TeachersPage } from "@/components/pages/teachers-page";

export const metadata: Metadata = { title: "Багш" };

export default function Page() {
  return <TeachersPage />;
}
