import type { Metadata } from "next";
import { Suspense } from "react";
import { TutorList } from "@/components/pages/tutor-list";

export const metadata: Metadata = {
  title: "Гэрийн багш",
  description: "Сургуулиас гадуурх гэрийн багшийг боловсролын зэрэг, ангиллаар шүүнэ.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="px-4 py-10" />}>
      <TutorList mode="home" />
    </Suspense>
  );
}
