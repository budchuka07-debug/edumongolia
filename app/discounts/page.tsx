import type { Metadata } from "next";
import { Suspense } from "react";
import { OfferBrowser } from "@/components/pages/offer-browser";

export const metadata: Metadata = {
  title: "Хөнгөлөлт",
  description: "Сургалтын хөнгөлөлтийн жишээ.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="px-4 py-10" />}>
      <OfferBrowser pageKey="discounts" kinds={["discount"]} />
    </Suspense>
  );
}
