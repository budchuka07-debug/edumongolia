import type { Metadata } from "next";
import { HubHome } from "@/components/pages/hub-home";

export const metadata: Metadata = {
  title: "EduMongolia",
  description: "Сургалт, багш, тэтгэлэг, гадаадад суралцах боломжийг нэг дороос.",
};

export default function Page() {
  return <HubHome />;
}
