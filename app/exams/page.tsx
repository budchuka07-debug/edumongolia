import type { Metadata } from "next";
import { TestLibrary } from "@/components/pages/test-library";
import { chargedPrice } from "@/lib/catalog/charge";
import { allTestCards } from "@/lib/catalog/listings";

export const metadata: Metadata = {
  title: "Хичээл бүрийн тест",
  description: "Бүх төлбөртэй тест нэг хуудсанд, хичээлээр, амар, дунд, хэцүү түвшинтэй.",
};

export default function Page() {
  return (
    <TestLibrary
      cards={allTestCards({
        exam: chargedPrice("exam"),
        quiz: chargedPrice("quiz"),
        iq: chargedPrice("iq"),
      })}
    />
  );
}
