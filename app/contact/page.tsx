import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Холбоо барих",
  description: "EduMongolia-тай холбогдох.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">Холбоо барих</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Сургалт, шалгалт, төслийн талаар зөвлөгөө авах бол бүртгэлийн маягтыг бөглөнө. Төлбөрийн асуудлыг QPay баталгаажуулсны дараа бүртгэл дээр харна.
      </p>
      <p className="mt-6">
        <Link href="/apply" className="font-semibold text-primary">Зөвлөгөө авах</Link>
      </p>
    </div>
  );
}
