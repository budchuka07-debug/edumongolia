"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { courseLessons, getCourse } from "@/lib/content/courses";
import { seedProgress } from "@/lib/content/classroom";
import { usePersistedState } from "@/lib/use-persisted-state";
import { useI18n } from "@/components/language-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export function CourseDetail({ slug }: { slug: string }) {
  const { locale, t } = useI18n();
  const course = getCourse(slug);
  const [progress, setProgress] = usePersistedState<Record<string, string[]>>(
    "edumongolia-progress",
    seedProgress,
  );
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const lessons = useMemo(() => (course ? courseLessons(course) : []), [course]);
  const done = course ? progress[course.slug] ?? [] : [];
  const firstOpen = lessons.find((lesson) => !done.includes(lesson.id)) ?? lessons[0];
  const [selectedId, setSelectedId] = useState(firstOpen?.id ?? "");
  const selected = lessons.find((lesson) => lesson.id === selectedId) ?? lessons[0];

  if (!course || !selected) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-semibold">{t.courses.notFound}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{t.courses.notFoundBody}</p>
        <Link href="/courses" className={cn(buttonVariants(), "mt-6")}>
          {t.courses.back}
        </Link>
      </div>
    );
  }

  function toggleLesson(id: string) {
    setProgress((current) => {
      const list = current[course!.slug] ?? [];
      const next = list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
      return { ...current, [course!.slug]: next };
    });
  }

  const percent = Math.round((done.length / lessons.length) * 100);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <article>
        <Link href="/courses" className="text-sm font-medium text-primary">
          {t.courses.back}
        </Link>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>{t.subjects[course.subject]}</Badge>
          <Badge variant="outline">{t.levels[course.level]}</Badge>
        </div>
        <h1 className="mt-3 font-heading text-4xl font-semibold">{course.title[locale]}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          {course.summary[locale]}
        </p>
        <p className="mt-3 text-sm">
          {course.instructor.name} · {course.instructor.role[locale]}
        </p>
        <h2 className="mt-8 font-heading text-2xl font-semibold">{t.courses.outcomes}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
          {course.outcomes[locale].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-8">
          <Accordion defaultValue={[course.modules[0]?.id]}>
            {course.modules.map((module) => (
              <AccordionItem key={module.id} value={module.id}>
                <AccordionTrigger className="text-base">{module.title[locale]}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(lesson.id)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm",
                            selected.id === lesson.id ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                          )}
                        >
                          <span>{lesson.title[locale]}</span>
                          <span>{done.includes(lesson.id) ? "✓" : `${lesson.minutes}m`}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <section className="mt-8 rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl font-semibold">{selected.title[locale]}</h2>
          <div className="mt-4 space-y-4 text-sm leading-7">
            {selected.body[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Button className="mt-5" variant="secondary" onClick={() => toggleLesson(selected.id)}>
            {done.includes(selected.id) ? t.courses.markUndone : t.courses.markDone}
          </Button>
        </section>
      </article>
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <section className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
          <p className="text-sm font-semibold">{t.courses.progress}</p>
          <p className="mt-1 font-heading text-3xl font-semibold">{percent}%</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t.students.local}</p>
          <Link href="/students" className={cn(buttonVariants({ variant: "outline" }), "mt-4 w-full")}>
            {t.courses.openDesk}
          </Link>
        </section>
        <section className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
          <h2 className="font-heading text-xl font-semibold">{t.courses.practice}</h2>
          <ol className="mt-4 space-y-5">
            {course.checks.map((check, index) => {
              const picked = answers[check.id];
              return (
                <li key={check.id}>
                  <p className="text-sm font-medium">
                    {index + 1}. {check.prompt[locale]}
                  </p>
                  <fieldset className="mt-2 space-y-1">
                    {check.options[locale].map((option, optionIndex) => {
                      const show = picked !== undefined;
                      const right = optionIndex === check.answer;
                      return (
                        <label
                          key={option}
                          className={cn(
                            "flex cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 text-sm",
                            show && right && "bg-pine/10",
                            show && picked === optionIndex && !right && "bg-destructive/10",
                          )}
                        >
                          <input
                            type="radio"
                            name={check.id}
                            className="mt-1"
                            checked={picked === optionIndex}
                            onChange={() =>
                              setAnswers((current) => ({ ...current, [check.id]: optionIndex }))
                            }
                          />
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </fieldset>
                  {picked !== undefined && (
                    <p className="mt-1 text-xs">
                      {picked === check.answer ? t.courses.correct : t.courses.incorrect}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      </aside>
    </div>
  );
}
