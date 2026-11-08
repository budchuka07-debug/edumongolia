import type { Metadata } from "next";
import { AdminDesk } from "@/components/pages/admin-desk";

export const metadata: Metadata = {
  title: "Админ самбар",
  description: "Сурагч, багшийн бүртгэл ба цагийн хуваарь.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminDesk />;
}
