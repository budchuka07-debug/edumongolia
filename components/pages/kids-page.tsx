"use client";

import Link from "next/link";
import { practiceExams, textOf, type ExamKind } from "@/lib/content/practice-exams";
import { TeacherForms } from "@/components/pages/teacher-forms";
import { useI18n } from "@/components/language-provider";

const copy = {
  mn: {
    eyebrow: "Хүүхдийн тест",
    title: "Асуултын сантай шалгалт",
    lead: "Хүүхдэд хэрэгтэй асуулт, ЭЕШ-ийн жишээ, мини олимпиад энд байна. Нэг туршилтад асуулт бүтнээрээ давтагдахгүй. Хариулснаас хойш оноо шууд гарна.",
    open: "Туршиж үзэх",
    bank: "санд",
    each: "туршилтад",
    groups: { kids: "Хүүхдэд хэрэгтэй", eesh: "ЭЕШ-ийн жишээ", olympiad: "Мини олимпиад" } as Record<ExamKind, string>,
  },
  en: {
    eyebrow: "Children's tests",
    title: "Tests drawn from a question bank",
    lead: "Useful questions, EESH-style practice, and a mini olympiad. A try does not repeat the whole set. The score appears as soon as you finish.",
    open: "Try it",
    bank: "in the bank",
    each: "each try",
    groups: { kids: "Useful for children", eesh: "EESH-style practice", olympiad: "Mini olympiad" } as Record<ExamKind, string>,
  },
} as const;

export function KidsPage() {
  const { locale } = useI18n();
  const t = copy[locale];
  const groups: ExamKind[] = ["kids", "eesh", "olympiad"];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-8 sm:py-12">
      <header>
        <p className="text-sm font-medium text-primary">{t.eyebrow}</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{t.lead}</p>
      </header>

      {groups.map((group) => (
        <section key={group}>
          <h2 className="font-heading text-2xl font-semibold">{t.groups[group]}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {practiceExams.filter((exam) => exam.kind === group).map((exam) => (
              <article key={exam.slug} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
                <h3 className="font-heading text-xl font-semibold">{textOf(exam.title, locale)}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{textOf(exam.summary, locale)}</p>
                <p className="mt-3 text-sm">{textOf(exam.age, locale)} · {exam.questions.length} {t.bank} · {exam.perAttempt} {t.each}</p>
                <Link href={`/kids/${exam.slug}`} className="mt-4 inline-block text-sm font-semibold text-primary">{t.open}</Link>
              </article>
            ))}
          </div>
        </section>
      ))}

      <TeacherForms />
    </div>
  );
}
