import type { Metadata } from "next";
import { ChinaHome } from "@/components/marketplace/china-home";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Хятад дахь их сургууль",
  description: "Хятадын их сургууль, хөтөлбөр, тэтгэлэг, CSCA. Төлбөр, оноог баталгаажуулаагүй бол хоосон.",
  path: "/china",
});

export default function Page() {
  return <ChinaHome />;
}
