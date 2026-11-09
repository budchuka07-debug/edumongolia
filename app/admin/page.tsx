import type { Metadata } from "next";
import { UniversityCoverage } from "@/components/marketplace/university-coverage";
import { AdminDesk } from "@/components/pages/admin-desk";

export const metadata: Metadata = {
  title: "Админ самбар",
  description: "Сурагч, багшийн бүртгэл ба цагийн хуваарь.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <AdminDesk />
      <div className="mx-auto max-w-6xl px-4 pb-12">
        <UniversityCoverage />
      </div>
    </>
  );
}
