import institutions from "@/data/moe/2026-06-17/institutions.json";
import nameLinks from "@/data/moe/2026-06-17/name-links.json";
import summary from "@/data/moe/2026-06-17/summary.json";

export type MoeInstitution = {
  code: string;
  seq: number;
  nameZh: string;
  kind: "regular" | "adult";
  level: "undergraduate" | "vocational" | null;
  institutionType: "regular_undergraduate" | "higher_vocational" | "adult";
  provinceZh: string;
  provinceMn: string;
  locationZh: string | null;
  authorityZh: string;
  ownership: "private" | null;
  remarkZh: string | null;
};

export type MoeNameLink = { chinaLink?: string; dongxueji?: string };

export const moeSummary = summary;
export const moeInstitutions = institutions as MoeInstitution[];
export const moeNameLinks = nameLinks as Record<string, MoeNameLink>;

const byCode = new Map(moeInstitutions.map((item) => [item.code, item]));

export function getMoeInstitution(code: string) {
  return byCode.get(code) ?? null;
}

export function moeProvinces() {
  const seen = new Map<string, MoeInstitution>();
  for (const item of moeInstitutions) {
    if (!seen.has(item.provinceZh)) seen.set(item.provinceZh, item);
  }
  return [...seen.values()];
}

export const unpublishedMn = "Албан ёсоор мэдээлэл одоогоор нийтлэгдээгүй.";

export function levelLabel(item: MoeInstitution) {
  if (item.level === "undergraduate") return "Бакалаврын түвшин";
  if (item.level === "vocational") return "Мэргэжлийн дээд (коллеж)";
  if (item.kind === "adult") return "Насанд хүрэгчдийн дээд боловсрол";
  return unpublishedMn;
}

export function filterMoeInstitutions(input: { q?: string; province?: string; level?: string; page?: number }) {
  const needle = (input.q ?? "").trim().toLowerCase();
  const rows = moeInstitutions.filter((item) => {
    if (input.province && item.provinceZh !== input.province) return false;
    if (input.level === "undergraduate" && item.level !== "undergraduate") return false;
    if (input.level === "vocational" && item.level !== "vocational") return false;
    if (input.level === "adult" && item.kind !== "adult") return false;
    if (input.level === "private" && item.ownership !== "private") return false;
    if (!needle) return true;
    return `${item.nameZh} ${item.code} ${item.provinceZh} ${item.provinceMn} ${item.locationZh ?? ""} ${item.authorityZh}`.toLowerCase().includes(needle);
  });
  const pageSize = 40;
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const page = Math.min(pages, Math.max(1, input.page ?? 1));
  return {
    total: rows.length,
    page,
    pages,
    pageSize,
    rows: rows.slice((page - 1) * pageSize, page * pageSize),
  };
}
