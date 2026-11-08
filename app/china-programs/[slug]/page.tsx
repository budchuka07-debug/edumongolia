import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/marketplace/json-ld";
import { ProgramBrowser } from "@/components/marketplace/program-browser";
import { ProgramView } from "@/components/marketplace/program-view";
import { paths } from "@/lib/marketplace/paths";
import { getDiscipline, getProgram, isPublicProgram, listDisciplines, listPublishedPrograms, universityOf } from "@/lib/marketplace/queries";
import { pageMeta } from "@/lib/marketplace/seo";

export function generateStaticParams() {
  const programs = listPublishedPrograms().map((program) => ({ slug: program.slug }));
  const disciplines = listDisciplines().map((discipline) => ({ slug: discipline.slug }));
  const rows = [...programs, ...disciplines];
  return rows.length ? rows : [{ slug: "__unpublished__" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (program && !isPublicProgram(program)) return { title: "Хөтөлбөр", robots: { index: false, follow: false } };
  if (program) {
    const university = universityOf(program.universityId);
    return pageMeta({
      title: program.name.mn,
      description: `${program.name.mn}, ${university?.name.mn ?? ""}. ${program.name.zh}. Сургалтын төлбөр, доод оноо нийтлэгдээгүй бол хоосон.`,
      path: paths.program(program.slug),
    });
  }
  const discipline = getDiscipline(slug);
  if (discipline) {
    return pageMeta({
      title: discipline.name.mn,
      description: `${discipline.name.mn} (${discipline.name.zh}) хөтөлбөрүүд.`,
      path: paths.program(discipline.slug),
    });
  }
  return { title: "Сургалт" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
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
  const discipline = getDiscipline(slug);
  if (discipline) return <ProgramBrowser disciplineSlug={discipline.slug} />;
  notFound();
}
