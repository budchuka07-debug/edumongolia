import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/marketplace/json-ld";
import { ProgramBrowser } from "@/components/marketplace/program-browser";
import { ProgramView } from "@/components/marketplace/program-view";
import { OfferBrowser } from "@/components/pages/offer-browser";
import type { OfferKind } from "@/lib/content/directory";
import { listDisciplines, listPublishedPrograms, getDiscipline, getProgram, isPublicProgram, universityOf } from "@/lib/marketplace/queries";
import { pageMeta } from "@/lib/marketplace/seo";

const pages = {
  foreign: { pageKey: "foreign", kinds: ["foreign-teacher"] },
  international: { pageKey: "international", kinds: ["international"] },
  travel: { pageKey: "travel", kinds: ["travel"] },
} as const;

const titles = {
  foreign: "Гадаад багштай сургалт",
  international: "Олон улсын сургалтууд",
  travel: "Аялалтай сургалт",
} as const;

export function generateStaticParams() {
  return [
    ...Object.keys(pages).map((kind) => ({ kind })),
    ...listPublishedPrograms().map((program) => ({ kind: program.slug })),
    ...listDisciplines().map((discipline) => ({ kind: discipline.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ kind: string }> }): Promise<Metadata> {
  const { kind } = await params;
  if (kind in titles) return { title: titles[kind as keyof typeof titles] };
  const program = getProgram(kind);
  if (program && !isPublicProgram(program)) return { title: "Хөтөлбөр", robots: { index: false, follow: false } };
  if (program) {
    const university = universityOf(program.universityId);
    return pageMeta({
      title: program.name.mn,
      description: `${program.name.mn}, ${university?.name.mn ?? ""}. ${program.name.zh}. Сургалтын төлбөр, доод оноо нийтлэгдээгүй бол хоосон.`,
      path: `/china-programs/${program.slug}`,
    });
  }
  const discipline = getDiscipline(kind);
  if (discipline) {
    return pageMeta({
      title: discipline.name.mn,
      description: `${discipline.name.mn} (${discipline.name.zh}) хөтөлбөрүүд.`,
      path: `/china-programs/${discipline.slug}`,
    });
  }
  return { title: "Сургалт" };
}

export default async function Page({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (kind in pages) {
    const page = pages[kind as keyof typeof pages];
    return (
      <Suspense fallback={<div className="px-4 py-10" />}>
        <OfferBrowser pageKey={page.pageKey} kinds={[...page.kinds] as OfferKind[]} />
      </Suspense>
    );
  }
  const program = getProgram(kind);
  if (program && !isPublicProgram(program)) notFound();
  if (program) {
    const university = universityOf(program.universityId);
    return (
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Course",
            name: program.name.en,
            alternateName: [program.name.mn, program.name.zh],
            provider: university ? { "@type": "CollegeOrUniversity", name: university.name.en } : undefined,
            inLanguage: program.instructionLanguage === "en" ? "en" : "zh",
          }}
        />
        <ProgramView program={program} />
      </>
    );
  }
  const discipline = getDiscipline(kind);
  if (discipline) return <ProgramBrowser disciplineSlug={discipline.slug} />;
  notFound();
}
