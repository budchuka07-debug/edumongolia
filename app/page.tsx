import type { Metadata } from "next";
import { HubHome } from "@/components/pages/hub-home";

export const metadata: Metadata = {
  title: "EduMongolia",
  description: "Сургуулиас гадуур гэрийн багш, танхим, онлайн сургалт, тэтгэлэг, хөнгөлөлт.",
};

export default function Page() {
  return <HubHome />;
}
