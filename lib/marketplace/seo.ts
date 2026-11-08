import type { Metadata } from "next";

export const siteUrl = "https://edumongolia.com";

export function pageMeta(input: { title: string; description: string; path: string }): Metadata {
  const description = input.description.slice(0, 180);
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
    },
  };
}
