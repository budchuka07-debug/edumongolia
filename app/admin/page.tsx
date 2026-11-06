import type { Metadata } from "next";
import { AdminDesk } from "@/components/pages/admin-desk";

export const metadata: Metadata = {
  title: "Админ самбар",
  description: "Сурагч, багшийн бүртгэл ба цагийн хуваарь.",
};

export default function Page() {
  return <AdminDesk />;
}
