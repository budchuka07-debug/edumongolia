import type { Metadata } from "next";
import { UniversityBrowser } from "@/components/marketplace/university-browser";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Хятадын их сургуулиуд",
  description: "Хятадын их сургуулийн лавлах. Нэр, хот, хөтөлбөр. Төлбөр, элсэлтийн оноог зохиогоогүй.",
  path: "/universities",
});

export default function Page() {
  return <UniversityBrowser />;
}
