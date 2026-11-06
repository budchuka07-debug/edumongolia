import type { Metadata } from "next";
import { StudentRegister } from "@/components/pages/register-forms";

export const metadata: Metadata = {
  title: "Сурагч бүртгүүлэх",
  description: "Сурагчийн нэр, анги, хүссэн сургалтын бүртгэл.",
};

export default function Page() {
  return <StudentRegister />;
}
