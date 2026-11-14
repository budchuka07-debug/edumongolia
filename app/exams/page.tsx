import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/pages/catalog-browser";
import { chargedPrice } from "@/lib/catalog/charge";
import { examCards } from "@/lib/catalog/listings";

export const metadata: Metadata = {
  title: "Шалгалт",
  description: "Анги, хичээлээр шүүсэн шалгалтын сан. Үргэлжлүүлэх үнэ админаас засна.",
};

export default function Page() {
  return (
    <CatalogBrowser
      eyebrow="EduMongolia"
      title="Шалгалт"
      lead="8–12-р ангийн сан болон сэдвийн шалгалт. Эхний 40% нээлттэй. Үнэ сервер дээрх каталогоос гарна."
      cards={examCards(chargedPrice("exam"))}
    />
  );
}
