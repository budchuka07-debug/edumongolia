import type { MetadataRoute } from "next";
import { schoolTopics } from "@/lib/content/school-exams";
import { marketplacePaths } from "@/lib/marketplace/queries";
import { siteUrl } from "@/lib/marketplace/seo";

const existing = [
  "",
  "/about",
  "/tutors",
  "/centers",
  "/online",
  "/scholarships",
  "/discounts",
  "/courses",
  "/kids",
  "/school",
  ...schoolTopics.map((topic) => `/school/${topic.slug}`),
  "/resources",
  "/papers",
  "/register/student",
  "/register/teacher",
  "/programs/english",
  "/programs/foreign",
  "/programs/international",
  "/programs/travel",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...existing, ...marketplacePaths()];
  return [...new Set(paths)].map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    changeFrequency: "weekly",
    priority: path === "" || path === "/study-abroad/china" ? 1 : 0.7,
  }));
}
