import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView, ExamView } from "@/components/marketplace/guides";
import { examinations, getArticle, listArticles } from "@/lib/marketplace/queries";
import { pageMeta } from "@/lib/marketplace/seo";

export function generateStaticParams() {
  return [
    ...listArticles().map((article) => ({ slug: article.slug })),
    ...examinations().map((exam) => ({ slug: exam.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (article) {
    return pageMeta({
      title: article.title.mn,
      description: article.description.mn,
      path: `/admission-requirements/${article.slug}`,
    });
  }
  const exam = examinations().find((item) => item.slug === slug);
  if (exam) {
    return pageMeta({
      title: exam.name.mn,
      description: `${exam.name.mn}. ${exam.name.zh}. Их сургуулийн доод оноог зохиогоогүй.`,
      path: exam.slug === "csca" ? "/csca" : `/examination-requirements/${exam.slug}`,
    });
  }
  return { title: "Тайлбар" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (article) return <ArticleView article={article} />;
  const exam = examinations().find((item) => item.slug === slug);
  if (exam) return <ExamView exam={exam} />;
  notFound();
}
