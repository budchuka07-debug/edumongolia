import type { Metadata } from "next";
import { AccountEntry } from "@/components/pages/marketplace-entry";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Миний бүртгэл",
  description: "Нэвтрэлт холбогдоогүй. Багшийн бүртгэл энэ хөтөч дээр. Их сургуулийн өргөдлийг хөтөчид хадгалахгүй.",
  path: "/account",
});

export default function Page() {
  return <AccountEntry />;
}
