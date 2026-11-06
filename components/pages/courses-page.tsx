"use client";

import { useMemo, useState } from "react";
import { courses } from "@/lib/content/courses";
import type { Level, Subject } from "@/lib/i18n/types";
import { CourseCard } from "@/components/course-card";
import { useI18n } from "@/components/language-provider";
import { Input } from "@/components/ui/input";

const subjects: Array<Subject | "all"> = ["all", "language", "stem", "humanities", "teaching"];
const levels: Array<Level | "all"> = ["all", "middle", "secondary", "teacher"];

export function CoursesPage() {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState<Subject | "all">("all");
  const [level, setLevel] = useState<Level | "all">("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return courses.filter((course) => {
      const haystack = `${course.title[locale]} ${course.summary[locale]}`.toLowerCase();
      const matchesQuery = needle.length === 0 || haystack.includes(needle);
      const matchesSubject = subject === "all" || course.subject === subject;
      const matchesLevel = level === "all" || course.level === level;
      return matchesQuery && matchesSubject && matchesLevel;
    });
  }, [level, locale, query, subject]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-heading text-4xl font-semibold">{t.courses.title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{t.courses.lead}</p>
      <div className="mt-6 grid gap-3">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.courses.search}
          aria-label={t.courses.search}
        />
        <div className="flex flex-wrap gap-2">
          {subjects.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={subject === item}
              onClick={() => setSubject(item)}
              className={`rounded-full px-3 py-1.5 text-sm ring-1 ring-foreground/10 ${
                subject === item ? "bg-primary text-primary-foreground" : "bg-card"
              }`}
            >
              {item === "all" ? t.courses.allSubjects : t.subjects[item]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {levels.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={level === item}
              onClick={() => setLevel(item)}
              className={`rounded-full px-3 py-1.5 text-sm ring-1 ring-foreground/10 ${
                level === item ? "bg-foreground text-background" : "bg-card"
              }`}
            >
              {item === "all" ? t.courses.allLevels : t.levels[item]}
            </button>
          ))}
        </div>
      </div>
      {visible.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-card px-4 py-8 text-sm text-muted-foreground ring-1 ring-foreground/10">
          {t.courses.empty}
        </p>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
