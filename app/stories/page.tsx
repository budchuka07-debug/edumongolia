import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/pages/catalog-browser";
import { chargedPrice } from "@/lib/catalog/charge";
import { kindCards } from "@/lib/catalog/listings";

export const metadata: Metadata = { title: "Уншлага", description: "Богино өгүүллэг. Үнэ каталогоос." };

export default function Page() {
  return (
    <CatalogBrowser
      eyebrow="EduMongolia"
      title="Уншлага"
      lead="Өөрийн болон зөвшөөрөлтэй богино уншлага. Эхний хэсэг нээлттэй."
      cards={kindCards("story", chargedPrice("story"))}
    />
  );
}
