"use client";

import Link from "next/link";
import { courses } from "@/lib/content/courses";
import { resources } from "@/lib/content/resources";
import { CourseCard } from "@/components/course-card";
import { useI18n } from "@/components/language-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export function HomePage() {
  const { locale, t } = useI18n();
  const featured = courses.filter((course) => course.featured);

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
              {t.home.eyebrow}
            </p>
            <h1 className="mt-3 max-w-xl font-heading text-4xl leading-tight font-semibold sm:text-5xl">
              {t.home.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              {t.home.lead}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/courses" className={cn(buttonVariants({ size: "lg" }), "h-11 px-4")}>
                {t.home.primary}
              </Link>
              <Link
                href="/students"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-4")}
              >
                {t.home.secondary}
              </Link>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              {t.home.facts.map((fact) => (
                <div key={fact.label} className="rounded-xl bg-card px-3 py-3 ring-1 ring-foreground/10">
                  <dt className="font-heading text-2xl font-semibold">{fact.value}</dt>
                  <dd className="text-xs text-muted-foreground">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="steppe-grid rounded-3xl p-4 ring-1 ring-foreground/10 sm:p-6">
            <article className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/10">
              <p className="text-xs font-semibold tracking-wide text-gold uppercase">
                {t.home.deskLabel}
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold">{t.home.deskCourse}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t.home.deskMeta}</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-2/3 rounded-full bg-primary" />
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{t.home.sample}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-heading text-3xl font-semibold">{t.home.pathsTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link href="/students" className="rounded-2xl bg-primary p-6 text-primary-foreground">
            <h3 className="font-heading text-2xl font-semibold">{t.home.studentTitle}</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-primary-foreground/85">
              {t.home.studentBody}
            </p>
            <span className="mt-5 inline-block text-sm font-semibold underline underline-offset-4">
              {t.home.studentCta}
            </span>
          </Link>
          <Link href="/teachers" className="rounded-2xl bg-card p-6 ring-1 ring-foreground/10">
            <h3 className="font-heading text-2xl font-semibold">{t.home.teacherTitle}</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              {t.home.teacherBody}
            </p>
            <span className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4">
              {t.home.teacherCta}
            </span>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-heading text-3xl font-semibold">{t.home.coursesTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {t.home.coursesLead}
            </p>
          </div>
          <Link href="/courses" className="text-sm font-semibold text-primary">
            {t.home.allCourses}
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-3">
          <h2 className="font-heading text-3xl font-semibold md:col-span-3">{t.home.stepsTitle}</h2>
          {t.home.steps.map((step, index) => (
            <article key={step.title}>
              <p className="font-heading text-3xl text-gold">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-heading text-3xl font-semibold">{t.home.resourcesTitle}</h2>
          <Link href="/resources" className="text-sm font-semibold text-primary">
            {t.home.allResources}
          </Link>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {resources.slice(0, 4).map((resource) => (
            <li key={resource.slug}>
              <Link
                href={`/resources/${resource.slug}`}
                className="block rounded-xl bg-card px-4 py-4 ring-1 ring-foreground/10 hover:ring-primary/40"
              >
                <p className="font-medium">{resource.title[locale]}</p>
                <p className="mt-1 text-sm text-muted-foreground">{resource.summary[locale]}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <blockquote className="rounded-3xl bg-primary px-6 py-8 text-primary-foreground sm:px-10">
          <p className="font-heading text-2xl leading-snug sm:text-3xl">“{t.home.quote}”</p>
          <footer className="mt-4 text-sm text-primary-foreground/80">{t.home.quoteBy}</footer>
        </blockquote>
        <div className="mt-8">
          <h2 className="font-heading text-2xl font-semibold">{t.home.closeTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{t.home.closeBody}</p>
        </div>
      </section>
    </div>
  );
}
