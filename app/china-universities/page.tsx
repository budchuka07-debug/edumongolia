import type { Metadata } from "next";
import { HostDirectory } from "@/components/marketplace/host-directory";
import { UniversityBrowser } from "@/components/marketplace/university-browser";
import { pageMeta } from "@/lib/marketplace/seo";
import { listPublishedUniversities } from "@/lib/marketplace/queries";

export const metadata: Metadata = pageMeta({
  title: "Гадаад оюутан хүлээн авах их сургуулиуд",
  description: "China Link-ийн 295 хүлээн авагч ба DongXueJi-ийн 256 хамтрагч сургууль. Хөтөлбөрийн чиглэл, суудал, хугацааг эхэд нь байгаагаар нь харуулна.",
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
