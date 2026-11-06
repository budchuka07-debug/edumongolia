import type { Metadata } from "next";
import { Suspense } from "react";
import { PaperList } from "@/components/pages/paper-board";

export const metadata: Metadata = {
  title: "Төсөл, диплом, даалгавар",
  description: "Дипломын ажил, курсын ажил, бие даалт, төслийг захиалгаар бичүүлнэ.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="px-4 py-10" />}>
      <PaperList />
    </Suspense>
  );
}
