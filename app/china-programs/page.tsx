import type { Metadata } from "next";
import { ProgramBrowser } from "@/components/marketplace/program-browser";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Хятадын хөтөлбөр, мэргэжил",
  description: "Хятадын их сургуулийн хөтөлбөрийг мэргэжил, хот, зэрэг, хэлээр шүүнэ. Төлбөрийг хоосон үлдээнэ.",
  path: "/china-programs",
});

export default function Page() {
  return <ProgramBrowser />;
}
