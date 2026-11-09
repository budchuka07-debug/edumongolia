import { connection } from "next/server";
import { filterScholarships } from "@/lib/scholarships/global";
import { publicScholarshipStatus } from "@/lib/scholarships/status";

export async function GET() {
  await connection();
  const lines = ["slug,name_mn,name_original,country,academic_year,public_status,closes_at,source_url"];
  for (const item of filterScholarships()) {
    const cells = [
      item.slug,
      item.nameMn,
      item.nameOriginal,
      item.countryCode,
      item.academicYear,
      publicScholarshipStatus(item),
      item.closesAt ?? "",
      item.officialSourceUrl,
    ];
    lines.push(cells.map((cell) => `"${cell.replaceAll("\"", "\"\"")}"`).join(","));
  }
  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": "attachment; filename=edumongolia-scholarships.csv",
      "x-robots-tag": "noindex",
    },
  });
}
