import { partnerMediaFor } from "@/lib/marketplace/dongxueji-media";
import { dongxuejiUniversities } from "@/lib/marketplace/dongxueji-universities";

export function GET() {
  const lines = ["slug,name_zh,name_en,city_zh,photo_count,program_count"];
  for (const item of dongxuejiUniversities) {
    const photos = partnerMediaFor(item.slug)?.images.length ?? 0;
    const cells = [item.slug, item.nameZh, item.nameEn, item.cityZh, String(photos), String(item.programs.length)];
    lines.push(cells.map((cell) => `"${cell.replaceAll("\"", "\"\"")}"`).join(","));
  }
  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": "attachment; filename=edumongolia-universities.csv",
      "x-robots-tag": "noindex",
    },
  });
}
