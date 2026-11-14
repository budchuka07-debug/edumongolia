import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/pages/catalog-browser";
import { chargedPrice } from "@/lib/catalog/charge";
import { kindCards } from "@/lib/catalog/listings";

export const metadata: Metadata = { title: "Асуултын сан", description: "Богино асуулт. Үнэ каталогоос." };

export default function Page() {
  return (
    <CatalogBrowser
      eyebrow="EduMongolia"
      title="Асуултын сан"
      lead="Богино асуулт. Эхний хэсэг нээлттэй. Үлдсэн хэсэг төлбөр баталгаажсаны дараа нээгдэнэ."
      cards={kindCards("quiz", chargedPrice("quiz"))}
    />
  );
}
