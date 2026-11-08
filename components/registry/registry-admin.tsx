"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePersistedState } from "@/lib/use-persisted-state";
import { moeInstitutions, moeSummary, unpublishedMn } from "@/lib/registry/moe";
import { paths } from "@/lib/marketplace/paths";

const REVIEW_KEY = "edumongolia-registry-review";

type ReviewStatus = "published" | "pending_review" | "archived";

export function RegistryAdmin() {
  const [query, setQuery] = useState("");
  const [review, setReview] = usePersistedState<Record<string, ReviewStatus>>(REVIEW_KEY, {});
  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return moeInstitutions.slice(0, 20);
    return moeInstitutions
      .filter((item) => `${item.nameZh} ${item.code}`.toLowerCase().includes(needle))
      .slice(0, 20);
  }, [query]);
  const missing = [
    ["Монгол нэр", moeSummary.total],
    ["Англи нэр", moeSummary.total],
    ["Албан сайт", moeSummary.total],
    ["Хаяг, солбицол", moeSummary.total],
    ["Оюутны тоо", moeSummary.total],
    ["Элсэлтийн огноо", moeSummary.total],
    ["Төлбөр", moeSummary.total],
    ["Тэтгэлэг", moeSummary.total],
  ] as const;

  return (
    <section className="mt-12">
      <h2 className="font-heading text-2xl font-semibold">Яамны бүртгэл</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        2026 оны 6 сарын 17-ны албан файл: {moeSummary.total} сургууль. Код, хятад нэр, муж, байршил, эрхлэх байгууллага, түвшин нийтэд гарсан. Бусад талбар хоосон, {unpublishedMn} Supabase холбоогүй тул эндхийн төлөв зөвхөн энэ хөтөчид үлдэнэ. Бүх зочдын хуудсыг солихдоо `python3 scripts/import_moe_registry.py` дахин ажиллуулна.
      </p>
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
        <div className="rounded-xl bg-card px-3 py-2 ring-1 ring-foreground/10">Ердийн: {moeSummary.regular}</div>
        <div className="rounded-xl bg-card px-3 py-2 ring-1 ring-foreground/10">Бакалавр: {moeSummary.undergraduate}</div>
        <div className="rounded-xl bg-card px-3 py-2 ring-1 ring-foreground/10">Мэргэжлийн дээд: {moeSummary.vocational}</div>
        <div className="rounded-xl bg-card px-3 py-2 ring-1 ring-foreground/10">Насанд хүрэгчдийн: {moeSummary.adult}</div>
        <div className="rounded-xl bg-card px-3 py-2 ring-1 ring-foreground/10">Тусгай тэмдэглэл: {moeSummary.privateRemark}</div>
        <div className="rounded-xl bg-card px-3 py-2 ring-1 ring-foreground/10">Шалгасан: {moeSummary.checkedOn}</div>
      </dl>
      <h3 className="mt-6 font-medium">Дутуу талбар</h3>
      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
        {missing.map(([label, count]) => (
          <li key={label}>{label}: {count} сургууль дээр нийтлэгдээгүй</li>
        ))}
      </ul>
      <label className="mt-6 block text-sm">
        <span className="mb-1 block text-muted-foreground">Код эсвэл нэрээр шалгах</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 w-full max-w-md rounded-lg border border-input bg-card px-2" />
      </label>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-3 py-2 font-medium">Сургууль</th>
              <th className="px-3 py-2 font-medium">Нийтийн төлөв</th>
              <th className="px-3 py-2 font-medium">Энэ хөтөч</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((item) => (
              <tr key={item.code} className="border-b border-border">
                <td className="px-3 py-2">
                  <Link className="font-medium text-primary" href={paths.registryInstitution(item.code)}>{item.nameZh}</Link>
                  <p className="text-muted-foreground">{item.code}</p>
                </td>
                <td className="px-3 py-2">Нийтэлсэн, зөвхөн жагсаалтын талбар</td>
                <td className="px-3 py-2">
                  <select
                    className="h-9 rounded-lg border border-input bg-card px-2"
                    value={review[item.code] ?? "published"}
                    onChange={(event) => setReview({ ...review, [item.code]: event.target.value as ReviewStatus })}
                  >
                    <option value="published">Нийтэлсэн</option>
                    <option value="pending_review">Хянаж байна</option>
                    <option value="archived">Архив</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
