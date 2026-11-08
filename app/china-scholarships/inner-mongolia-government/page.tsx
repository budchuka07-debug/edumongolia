import type { Metadata } from "next";
import { JsonLd } from "@/components/marketplace/json-ld";
import { InnerMongoliaScholarshipPage } from "@/components/scholarships/inner-mongolia-page";
import { innerMongoliaScholarshipPath } from "@/lib/scholarships/inner-mongolia";
import { pageMeta } from "@/lib/marketplace/seo";

export const metadata: Metadata = pageMeta({
  title: "Өвөр Монголын Засгийн газрын тэтгэлэг",
  description: "Inner Mongolia Government Scholarship for Mongolian Students. 内蒙古自治区政府奖学金. CSC-ээс тусдаа. 2026/2027 квот түүхэн.",
  path: innerMongoliaScholarshipPath,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalProgram",
          name: "Inner Mongolia Government Scholarship for Mongolian Students",
          alternateName: ["Өвөр Монголын Засгийн газрын тэтгэлэг", "内蒙古自治区政府奖学金"],
          url: "https://isms.imu.edu.cn/stu/#/login",
        }}
      />
      <InnerMongoliaScholarshipPage />
    </>
  );
}
