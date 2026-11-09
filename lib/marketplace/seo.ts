import type { Metadata } from "next";

export const siteUrl = "https://edumongolia.com";

export function pageMeta(input: { title: string; description: string; path: string; image?: string }): Metadata {
  const description = input.description.slice(0, 180);
  const images = input.image ? [input.image] : undefined;
  return {
    title: input.title,
    description,
    alternates: { canonical: input.path },
    openGraph: {
      title: input.title,
      description,
      url: input.path,
      siteName: "EduMongolia",
      locale: "mn_MN",
      type: "website",
      images,
    },
    twitter: {
      card: input.image ? "summary_large_image" : "summary",
      title: input.title,
      description,
      images,
    },
  };
}
