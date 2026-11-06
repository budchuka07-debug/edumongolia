"use client";

import Link from "next/link";
import { courseLessons, courseMinutes } from "@/lib/content/courses";
import type { Course } from "@/lib/i18n/types";
import { useI18n } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";

export function CourseCard({ course }: { course: Course }) {
  const { locale, t } = useI18n();
  const lessons = courseLessons(course).length;

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col rounded-2xl bg-card p-5 ring-1 ring-foreground/10 transition hover:-translate-y-0.5 hover:ring-primary/40"
    >
      <div className="flex flex-wrap gap-2">
        <Badge>{t.subjects[course.subject]}</Badge>
        <Badge variant="outline">{t.levels[course.level]}</Badge>
      </div>
      <h3 className="mt-4 font-heading text-xl leading-snug font-semibold group-hover:text-primary">
        {course.title[locale]}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
        {course.summary[locale]}
      </p>
      <p className="mt-4 text-xs tracking-wide text-foreground/70 uppercase">
        {lessons} {t.courses.lessons} · {courseMinutes(course)} {t.courses.minutes}
      </p>
    </Link>
  );
}
