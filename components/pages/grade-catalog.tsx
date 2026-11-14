"use client";

import Link from "next/link";
import { subjectName, schoolText } from "@/lib/content/school-play";
import { gradeCatalog } from "@/lib/content/grade-bank";
import { EXAM_PRICE_MNT } from "@/lib/payments/pricing";
import { useI18n } from "@/components/language-provider";

const copy = {
  mn: {
    eyebrow: "Тусдаа шалгалтын сан",
    title: "8–12-р ангийн шалгалтын сан",
    lead: "Анги, хичээл бүрээр тусдаа. Хичээлийн эхний 40% нээлттэй. Үргэлжлүүлэхэд 5,000₮. Төлбөр баталгаажмагц үлдсэн хичээл, асуулт татагдана.",
    open: "Хичээл, шалгалт",
    questions: "асуулт",
    each: "нэг хувилбарт",
  },
  en: {
    eyebrow: "Separate exam bank",
    title: "Exam bank for grades 8–12",
    lead: "Each grade and each lesson is separate. The first 40% of the lesson is open. Continuing costs 5,000 MNT. The rest of the lesson and the questions load after payment is confirmed.",
    open: "Lesson and exam",
    questions: "questions",
    each: "in one variant",
  },
} as const;

export function GradeCatalog() {
  const { locale } = useI18n();
  const t = copy[locale];
  const grades = gradeCatalog();
  const price = new Intl.NumberFormat("mn-MN").format(EXAM_PRICE_MNT);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <p className="text-sm font-medium text-primary">{t.eyebrow}</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{t.lead}</p>
      <div className="mt-10 space-y-10">
        {grades.map((group) => (
          <section key={group.grade}>
            <h2 className="font-heading text-2xl font-semibold">{locale === "en" ? `Grade ${group.grade}` : `${group.grade}-р анги`}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {group.lessons.map((lesson) => (
                <Link key={lesson.slug} href={`/bank/${lesson.slug}`} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
                  <p className="text-sm text-muted-foreground">{subjectName(lesson.subject, locale)}</p>
                  <h3 className="mt-1 font-heading text-lg font-semibold">{schoolText(lesson.title, locale)}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{schoolText(lesson.summary, locale)}</p>
                  <p className="mt-3 text-sm">
                    {lesson.questions.length} {t.questions} · {lesson.perAttempt} {t.each} · {price}₮
                  </p>
                  <p className="mt-2 text-sm font-semibold text-primary">{t.open}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
