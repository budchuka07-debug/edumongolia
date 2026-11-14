import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/pages/catalog-browser";
import { chargedPrice } from "@/lib/catalog/charge";
import { kindCards } from "@/lib/catalog/listings";

export const metadata: Metadata = { title: "IQ тест", description: "IQ сорил. Үнэ каталогоос." };

export default function Page() {
  return (
    <CatalogBrowser
      eyebrow="EduMongolia"
      title="IQ тест"
      lead="Логик, дарааллын сорил. Бүтэн даалгавар төлбөр баталгаажсаны дараа нээгдэнэ."
      cards={kindCards("iq", chargedPrice("iq"))}
    />
  );
}
