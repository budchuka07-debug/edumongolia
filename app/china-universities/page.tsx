import type { Metadata } from "next";
import { HostDirectory } from "@/components/marketplace/host-directory";
import { UniversityBrowser } from "@/components/marketplace/university-browser";
import { pageMeta } from "@/lib/marketplace/seo";
import { listPublishedUniversities } from "@/lib/marketplace/queries";

export const metadata: Metadata = pageMeta({
  title: "Гадаад оюутан хүлээн авах их сургуулиуд",
  description: "2026 оны China Link тэтгэлгийн 295 хүлээн авагч их сургууль. Квот, чиглэл, хугацааг хавсралтад байхгүй бол хоосон.",
  path: "/china-universities",
});

export default function Page() {
  const published = listPublishedUniversities();
  return (
    <>
      <HostDirectory />
      {published.length > 0 ? <UniversityBrowser /> : null}
    </>
  );
}
