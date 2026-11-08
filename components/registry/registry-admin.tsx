"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePersistedState } from "@/lib/use-persisted-state";
import { moeInstitutions, moeSummary, unpublishedMn } from "@/lib/registry/moe";
import { paths } from "@/lib/marketplace/paths";

const REVIEW_KEY = "edumongolia-registry-review";
const DRAFT_KEY = "edumongolia-registry-drafts";
const LOG_KEY = "edumongolia-registry-log";

type ReviewStatus = "published" | "pending_review" | "archived";
type Draft = { code: string; nameZh: string; note: string };
type Change = { at: string; code: string; previous: string; next: string };

function parseImport(text: string, fileName: string): { drafts: Draft[]; errors: string[] } {
  const trimmed = text.trim();
  if (!trimmed) return { drafts: [], errors: ["Файл хоосон."] };
  let rows: { code?: string; nameZh?: string }[] = [];
  if (fileName.endsWith(".json") || trimmed.startsWith("[") || trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      const list = Array.isArray(parsed) ? parsed : [parsed];
      rows = list.map((item) => {
        const row = item as { code?: unknown; nameZh?: unknown };
        return { code: String(row.code ?? ""), nameZh: String(row.nameZh ?? "") };
      });
    } catch {
      return { drafts: [], errors: ["JSON уншигдсангүй."] };
    }
  } else {
    const lines = trimmed.split(/\r?\n/).filter(Boolean);
    const header = lines[0].split(",").map((cell) => cell.trim());
    const codeIndex = header.indexOf("code");
    const nameIndex = header.indexOf("nameZh");
    if (codeIndex < 0 || nameIndex < 0) return { drafts: [], errors: ["CSV толгойд code, nameZh байна."] };
    rows = lines.slice(1).map((line) => {
      const cells = line.split(",");
      return { code: cells[codeIndex]?.trim(), nameZh: cells[nameIndex]?.trim() };
    });
  }
  const drafts: Draft[] = [];
  const errors: string[] = [];
  const seen = new Set<string>();
  rows.forEach((row, index) => {
    const code = row.code ?? "";
    const nameZh = row.nameZh ?? "";
    if (!/^\d{10}$/.test(code)) errors.push(`${index + 1}: код 10 орон биш.`);
    else if (!nameZh) errors.push(`${code}: хятад нэр хоосон.`);
    else if (seen.has(code)) errors.push(`${code}: файл дотроо давхардсан.`);
    else {
      seen.add(code);
      const known = moeInstitutions.some((item) => item.code === code);
      drafts.push({ code, nameZh, note: known ? "Бүртгэлд байгаа код. Нийтэд гаргаагүй." : "Шинэ мөр. Нийтэд гаргаагүй." });
    }
  });
  return { drafts, errors };
}

export function RegistryAdmin() {
  const [query, setQuery] = useState("");
  const [importNote, setImportNote] = useState("");
  const [review, setReview] = usePersistedState<Record<string, ReviewStatus>>(REVIEW_KEY, {});
  const [drafts, setDrafts] = usePersistedState<Draft[]>(DRAFT_KEY, []);
  const [changes, setChanges] = usePersistedState<Change[]>(LOG_KEY, []);
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
                    onChange={(event) => {
                      const next = event.target.value as ReviewStatus;
                      setReview({ ...review, [item.code]: next });
                      setChanges([{ at: new Date().toISOString(), code: item.code, previous: review[item.code] ?? "published", next }, ...changes].slice(0, 30));
                    }}
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
      <h3 className="mt-8 font-medium">CSV эсвэл JSON оруулах</h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        Багана: code, nameZh. Оруулсан мөр энэ хөтөчид ноорог хэвээр үлдэнэ. Нийтийн хуудсанд гарахгүй.
      </p>
      <input
        className="mt-3 block text-sm"
        type="file"
        accept=".csv,.json,text/csv,application/json"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            const parsed = parseImport(String(reader.result ?? ""), file.name);
            setDrafts(parsed.drafts);
            setImportNote(parsed.errors.slice(0, 8).join(" ") || `${parsed.drafts.length} ноорог. Нийтлэгдээгүй.`);
            setChanges([{ at: new Date().toISOString(), code: "import", previous: "", next: file.name }, ...changes].slice(0, 30));
          };
          reader.readAsText(file);
        }}
      />
      {importNote ? <p className="mt-2 text-sm">{importNote}</p> : null}
      {drafts.length > 0 ? (
        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
          {drafts.slice(0, 20).map((draft) => (
            <li key={draft.code}>{draft.code} · {draft.nameZh} · {draft.note}</li>
          ))}
        </ul>
      ) : null}
      <h3 className="mt-8 font-medium">Өөрчлөлтийн тэмдэглэл</h3>
      {changes.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">Тэмдэглэл алга.</p> : null}
      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
        {changes.map((change) => (
          <li key={`${change.at}-${change.code}`}>{change.at} · {change.code} · {change.previous || "—"} → {change.next}</li>
        ))}
      </ul>
    </section>
  );
}
