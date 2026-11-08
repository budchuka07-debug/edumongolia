import type { Metadata } from "next";
import { PartnersEntry } from "@/components/pages/marketplace-entry";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Хамтрагчид",
  description: "Багш, сурагчийн бүртгэл нээлттэй. Агент болон их сургуулийн самбар хараахан нээгээгүй.",
  path: "/partners",
});

export default function Page() {
  return <PartnersEntry />;
}