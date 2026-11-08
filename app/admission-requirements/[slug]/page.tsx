import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/marketplace/guides";
import { paths } from "@/lib/marketplace/paths";
import { getArticle, listArticles } from "@/lib/marketplace/queries";
import { pageMeta } from "@/lib/marketplace/seo";

export function generateStaticParams() {
  return listArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Тайлбар" };
  return pageMeta({
    title: article.title.mn,
    description: article.description.mn,
    path: paths.article(article.slug),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
