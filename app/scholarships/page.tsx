import type { Metadata } from "next";
import { Suspense } from "react";
import { OfferBrowser } from "@/components/pages/offer-browser";

export const metadata: Metadata = {
  title: "Тэтгэлэг",
  description: "Тэтгэлэг болон гадаадын их сургуулийн бэлтгэлийн хөтөлбөр.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="px-4 py-10" />}>
      <OfferBrowser pageKey="scholarships" kinds={["scholarship"]} />
    </Suspense>
  );
}
