import type { Metadata } from "next";
import { Suspense } from "react";
import { CenterList } from "@/components/pages/center-list";

export const metadata: Metadata = {
  title: "Танхимын сургалтын төвүүд",
  description: "Тусгай зөвшөөрөлтэй танхимын сургалтын төвүүд.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="px-4 py-10" />}>
      <CenterList />
    </Suspense>
  );
}
