import type { Metadata } from "next";
import { Suspense } from "react";
import { TutorList } from "@/components/pages/tutor-list";

export const metadata: Metadata = {
  title: "Онлайн сургалтын багш",
  description: "Онлайн ганцаарчилсан болон хагас бүлгийн багш.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="px-4 py-10" />}>
      <TutorList mode="online" />
    </Suspense>
  );
}
