import type { MetadataRoute } from "next";
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
    priority: path === "" || path === "/china" ? 1 : 0.7,
  }));
}
