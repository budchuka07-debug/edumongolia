import type { Metadata } from "next";
import { Suspense } from "react";
import { PaperOrderForm } from "@/components/pages/paper-board";

export const metadata: Metadata = {
  title: "Захиалгаар бичүүлэх",
  description: "Диплом, курсын ажил, бие даалт, төслийн захиалга.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="px-4 py-10" />}>
      <PaperOrderForm />
    </Suspense>
  );
}
