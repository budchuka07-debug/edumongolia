"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { subjectName } from "@/lib/content/school-play";
import type { BrowseCard, Difficulty } from "@/lib/catalog/listings";
import { useI18n } from "@/components/language-provider";

const subjectOrder = ["math", "physics", "chemistry", "biology", "mongolian", "english", "history", "geography", "civics", "logic"];
const levelOrder: Difficulty[] = ["easy", "medium", "hard"];

const levelLabel = {
  mn: { easy: "Амар", medium: "Дунд", hard: "Хэцүү" },
  en: { easy: "Easy", medium: "Medium", hard: "Hard" },
} as const;

export function TestLibrary({ cards }: { cards: BrowseCard[] }) {
  const { locale } = useI18n();
  const levels = levelLabel[locale];
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("all");
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");

  const grades = [...new Set(cards.flatMap((card) => card.grades))].sort((a, b) => Number(a) - Number(b));

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return cards.filter((card) => {
      const text = `${card.title.mn} ${card.title.en} ${card.summary.mn} ${subjectName(card.subject, "mn")} ${subjectName(card.subject, "en")}`.toLowerCase();
      if (needle && !text.includes(needle)) return false;
      if (grade !== "all" && !card.grades.includes(grade)) return false;
      if (difficulty !== "all" && card.difficulty !== difficulty) return false;
      return true;
    });
  }, [cards, query, grade, difficulty]);

  const subjects = [...new Set(filtered.map((card) => card.subject))].sort((a, b) => {
    const left = subjectOrder.indexOf(a);
    const right = subjectOrder.indexOf(b);
    return (left === -1 ? 99 : left) - (right === -1 ? 99 : right);
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <p className="text-sm font-medium text-primary">{locale === "en" ? "All paid tests" : "Бүх төлбөртэй тест"}</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{locale === "en" ? "Tests by lesson" : "Хичээл бүрийн тест"}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
        {locale === "en"
          ? "Every exam, quiz, and IQ test is in this list. Each lesson is its own section. Easy, medium, and hard are marked on the card. The first 40% is open."
          : "Шалгалт, асуулт, IQ тест бүгд энд. Хичээл бүр өөрийн хэсэгтэй. Амар, дунд, хэцүү гэсэн түвшин карт дээр байна. Эхний 40% нээлттэй."}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", ...levelOrder] as const).map((level) => (
          <button
            key={level}
            type="button"
            aria-pressed={difficulty === level}
            className={`rounded-full px-3 py-1.5 text-sm ${difficulty === level ? "bg-primary text-primary-foreground" : "bg-card ring-1 ring-foreground/10"}`}
            onClick={() => setDifficulty(level)}
          >
            {level === "all" ? (locale === "en" ? "All levels" : "Бүх түвшин") : levels[level]}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" aria-pressed={grade === "all"} className={`rounded-full px-3 py-1.5 text-sm ${grade === "all" ? "bg-primary text-primary-foreground" : "bg-card ring-1 ring-foreground/10"}`} onClick={() => setGrade("all")}>
          {locale === "en" ? "All grades" : "Бүх анги"}
        </button>
        {grades.map((item) => (
          <button key={item} type="button" aria-pressed={grade === item} className={`rounded-full px-3 py-1.5 text-sm ${grade === item ? "bg-primary text-primary-foreground" : "bg-card ring-1 ring-foreground/10"}`} onClick={() => setGrade(item)}>
            {item}
          </button>
        ))}
      </div>
      <input className="mt-4 h-11 w-full max-w-md rounded-xl border border-border bg-background px-3" value={query} placeholder={locale === "en" ? "Search a lesson" : "Хичээл хайх"} onChange={(event) => setQuery(event.target.value)} />
      <div className="mt-8 space-y-10">
        {subjects.map((subject) => {
          const rows = filtered
            .filter((card) => card.subject === subject)
            .sort((a, b) => levelOrder.indexOf(a.difficulty) - levelOrder.indexOf(b.difficulty) || a.grade.localeCompare(b.grade, "mn"));
          return (
            <section key={subject}>
              <h2 className="font-heading text-2xl font-semibold">{subjectName(subject, locale)}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{rows.length} {locale === "en" ? "tests" : "тест"}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {rows.map((card) => (
                  <Link key={card.href} href={card.href} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
                    <p className="text-sm text-muted-foreground">{[card.grade, levels[card.difficulty]].filter(Boolean).join(" · ")}</p>
                    <h3 className="mt-1 font-heading text-lg font-semibold">{card.title[locale]}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.summary[locale]}</p>
                    <p className="mt-3 text-sm font-semibold">{card.priceMnt.toLocaleString("mn-MN")}₮</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      {subjects.length === 0 ? <p className="mt-6 text-sm text-muted-foreground">{locale === "en" ? "Nothing matches." : "Тохирох тест алга."}</p> : null}
    </div>
  );
}
