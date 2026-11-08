import type { Metadata } from "next";
import { ScholarshipBrowser } from "@/components/marketplace/scholarship-pages";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Хятадын тэтгэлэг",
  description: "Хятадын засгийн газрын болон их сургуулийн тэтгэлэг. Хичээлийн жилээр тусад нь. Мөнгөн дүнг зохиогоогүй.",
  path: "/study/scholarships",
});

export default function Page() {
  return <ScholarshipBrowser />;
}
