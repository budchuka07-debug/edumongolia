"use client";

import Link from "next/link";
import { learner, seedProgress, weekTasks } from "@/lib/content/classroom";
import { courseLessons, courses } from "@/lib/content/courses";
import { getResource } from "@/lib/content/resources";
import { usePersistedState } from "@/lib/use-persisted-state";
import { useI18n } from "@/components/language-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export function StudentsPage() {
  const { locale, t } = useI18n();
  const [progress] = usePersistedState<Record<string, string[]>>(
    "edumongolia-progress",
    seedProgress,
  );
  const [saved] = usePersistedState<string[]>("edumongolia-saved", []);
  const [tasks, setTasks] = usePersistedState<string[]>("edumongolia-tasks", ["spelling"]);

  const doneCount = Object.values(progress).reduce((sum, list) => sum + list.length, 0);
  const openCourses = courses.filter((course) => {
    const total = courseLessons(course).length;
    const done = (progress[course.slug] ?? []).length;
    return done > 0 && done < total;
  });
  const savedResources = saved
    .map((slug) => getResource(slug))
    .filter((resource) => resource !== undefined);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm font-semibold text-primary">{learner.school[locale]}</p>
      <h1 className="mt-2 font-heading text-4xl font-semibold">{t.students.title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{t.students.lead}</p>
      <p className="mt-2 text-sm">
        {learner.name} · {learner.grade[locale]}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">{t.students.local}</p>
      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { value: doneCount, label: t.students.lessonsDone },
          { value: openCourses.length, label: t.students.inProgress },
          { value: savedResources.length, label: t.students.saved },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-card px-4 py-4 ring-1 ring-foreground/10">
            <dt className="font-heading text-3xl font-semibold">{item.value}</dt>
            <dd className="text-sm text-muted-foreground">{item.label}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          <h2 className="font-heading text-2xl font-semibold">{t.students.continue}</h2>
          <ul className="mt-4 space-y-3">
            {(openCourses.length > 0 ? openCourses : courses.slice(0, 3)).map((course) => {
              const total = courseLessons(course).length;
              const done = (progress[course.slug] ?? []).length;
              const percent = Math.round((done / total) * 100);
              return (
                <li key={course.slug} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-medium">{course.title[locale]}</h3>
                    <Link href={`/courses/${course.slug}`} className="text-sm font-semibold text-primary">
                      {t.students.openCourse}
                    </Link>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {done}/{total}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
        <div className="space-y-6">
          <section className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
            <h2 className="font-heading text-2xl font-semibold">{t.students.week}</h2>
            <ul className="mt-3 space-y-3">
              {weekTasks.map((task) => (
                <li key={task.id}>
                  <label className="flex items-start gap-2 text-sm leading-6">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={tasks.includes(task.id)}
                      onChange={() =>
                        setTasks((current) =>
                          current.includes(task.id)
                            ? current.filter((item) => item !== task.id)
                            : [...current, task.id],
                        )
                      }
                    />
                    <span className={tasks.includes(task.id) ? "text-muted-foreground line-through" : ""}>
                      {task.title[locale]}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
            <h2 className="font-heading text-2xl font-semibold">{t.resources.saved}</h2>
            {savedResources.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">{t.students.noneSaved}</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {savedResources.map((resource) => (
                  <li key={resource.slug}>
                    <Link href={`/resources/${resource.slug}`} className="text-primary">
                      {resource.title[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/resources" className={cn(buttonVariants({ variant: "outline" }), "mt-4")}>
              {t.nav.resources}
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
