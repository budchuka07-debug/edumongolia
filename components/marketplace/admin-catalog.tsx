"use client";

import Link from "next/link";
import { useI18n } from "@/components/language-provider";
import { catalog } from "@/lib/marketplace/catalog";
import { paths } from "@/lib/marketplace/paths";

export function InternationalCatalog() {
  const { locale } = useI18n();
  const en = locale === "en";
  const text = (value: { mn: string; en: string }) => (en ? value.en : value.mn);
  return (
    <section className="mt-12">
      <h2 className="font-heading text-2xl font-semibold">{en ? "International education" : "Олон улсын боловсрол"}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
        {en
          ? "Read-only view of the demonstration catalog. This desk does not edit universities, and it does not connect to Supabase. A row is not verified unless its source says so. Fees, scores, and deadlines stay empty when they are unpublished."
          : "Үзүүлэнгийн каталогийн унших горим. Энэ самбар их сургууль засахгүй, Supabase-д холбогдохгүй. Эх сурвалж нь баталгаажуулсан гээгүй бол мөр баталгаатай биш. Нийтлэгдээгүй төлбөр, оноо, хугацаа хоосон."}
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-3 py-2 font-medium">{en ? "University" : "Их сургууль"}</th>
              <th className="px-3 py-2 font-medium">{en ? "Record" : "Бүртгэл"}</th>
              <th className="px-3 py-2 font-medium">{en ? "Source" : "Эх сурвалж"}</th>
            </tr>
          </thead>
          <tbody>
            {catalog.universities.map((university) => {
              const source = catalog.sources.find((item) => item.id === university.sourceId);
              return (
                <tr key={university.id} className="border-b border-border">
                  <td className="px-3 py-2">
                    <Link href={paths.university(university.slug)} className="font-medium text-primary">
                      {text(university.name)}
                    </Link>
                    <p className="text-muted-foreground">{university.name.zh}</p>
                  </td>
                  <td className="px-3 py-2">{university.demonstration ? (en ? "Demonstration" : "Үзүүлэн") : en ? "Catalog" : "Каталог"}</td>
                  <td className="px-3 py-2">{source ? `${text(source.title)} · ${source.status}` : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h3 className="mt-8 font-heading text-xl font-semibold">{en ? "Scholarships" : "Тэтгэлэг"}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {catalog.scholarships.map((scholarship) => (
          <li key={scholarship.id}>
            <Link href={paths.scholarship(scholarship.slug)} className="text-primary">
              {text(scholarship.name)}
            </Link>
            <span className="text-muted-foreground"> · {scholarship.name.zh} · {en ? "amounts unpublished" : "мөнгөн дүн нийтлэгдээгүй"}</span>
          </li>
        ))}
      </ul>
      <h3 className="mt-8 font-heading text-xl font-semibold">{en ? "Sources" : "Эх сурвалж"}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {catalog.sources.map((source) => (
          <li key={source.id}>
            <a href={source.url} className="text-primary">
              {text(source.title)}
            </a>
            <span className="text-muted-foreground">
              {" "}
              · {source.sourceType} · {source.status}
              {source.verifiedOn ? ` · ${source.verifiedOn}` : ""}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">
        <Link href={paths.programs} className="text-primary">{en ? "Programs" : "Хөтөлбөр"}</Link>
        {" · "}
        <Link href={paths.exams} className="text-primary">{en ? "Examinations" : "Шалгалт"}</Link>
        {" · "}
        <Link href={paths.eligibility} className="text-primary">{en ? "Eligibility checker" : "Шалгуур"}</Link>
      </p>
    </section>
  );
}
