import type { Metadata } from "next";
import { InquiryForm } from "@/components/marketplace/inquiry-form";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Зөвлөгөө авах",
  description: "Хятадын их сургуулийн талаар зөвлөгөө авах хүсэлт. Их сургуулийн өргөдөл биш.",
  path: "/apply",
});

export default function Page() {
  return <InquiryForm />;
}
