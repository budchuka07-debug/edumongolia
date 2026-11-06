import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home-page";

export const metadata: Metadata = {
  title: "EduMongolia",
  description: "Аймаг бүрийн ангид хүрэх хичээл, нөөц, сурагч ба багшийн хэсэг.",
};

export default function Page() {
  return <HomePage />;
}
