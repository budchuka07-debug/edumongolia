import type { Metadata } from "next";
import { SchoolCatalog } from "@/components/pages/school-catalog";

export const metadata: Metadata = {
  title: "Дунд, ахлах, Cambridge, олон улсын шалгалт",
  description: "Сэдвийн дагуу хичээл, шалгалтын сан. Хариулсны дараа алдааны учир, дараа нь оноо гарна. Дахин өгөхөд хувилбар солигдоно.",
};

export default function Page() {
  return <SchoolCatalog />;
}
