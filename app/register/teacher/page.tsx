import type { Metadata } from "next";
import { TeacherRegister } from "@/components/pages/register-forms";

export const metadata: Metadata = {
  title: "Багш бүртгүүлэх",
  description: "Багшийн боловсролын зэрэг, ангилал, заах хэлбэрийн бүртгэл.",
};

export default function Page() {
  return <TeacherRegister />;
}