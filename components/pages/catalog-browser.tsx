"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/language-provider";
import type { BrowseCard } from "@/lib/catalog/listings";

export type { BrowseCard };

const pageSize = 8;

export function CatalogBrowser({
  eyebrow,
  title,
  lead,
  cards,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  cards: BrowseCard[];
}) {
  const { locale } = useI18n();
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [subject, setSubject] = useState("all");
  const [page, setPage] = useState(1);

  const grades = [...new Set(cards.map((card) => card.grade).filter(Boolean))].sort();
  const subjects = [...new Set(cards.map((card) => card.subject).filter(Boolean))].sort();
  const levels = [...new Set(cards.map((card) => card.difficulty).filter(Boolean))].sort();

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return cards.filter((card) => {
      const text = `${card.title.mn} ${card.title.en} ${card.summary.mn} ${card.summary.en}`.toLowerCase();
      if (needle && !text.includes(needle)) return false;
      if (grade !== "all" && card.grade !== grade && !card.grades.includes(grade)) return false;
      if (difficulty !== "all" && card.difficulty !== difficulty) return false;
      if (subject !== "all" && card.subject !== subject) return false;
      return true;
    });
  }, [cards, query, grade, difficulty, subject]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize);

  function setFilter(next: () => void) {
    next();
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <p className="text-sm font-medium text-primary">{eyebrow}</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{lead}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input className="h-11 rounded-xl border border-border bg-background px-3" value={query} placeholder={locale === "en" ? "Search" : "Хайх"} onChange={(event) => setFilter(() => setQuery(event.target.value))} />
        <select className="h-11 rounded-xl border border-border bg-background px-3" value={grade} onChange={(event) => setFilter(() => setGrade(event.target.value))}>
          <option value="all">{locale === "en" ? "All grades" : "Бүх анги"}</option>
          {grades.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select className="h-11 rounded-xl border border-border bg-background px-3" value={subject} onChange={(event) => setFilter(() => setSubject(event.target.value))}>
          <option value="all">{locale === "en" ? "All subjects" : "Бүх хичээл"}</option>
          {subjects.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select className="h-11 rounded-xl border border-border bg-background px-3" value={difficulty} onChange={(event) => setFilter(() => setDifficulty(event.target.value))}>
          <option value="all">{locale === "en" ? "All levels" : "Бүх түвшин"}</option>
          {levels.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {visible.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
            <p className="text-sm text-muted-foreground">{[card.grade, card.subject, card.difficulty].filter(Boolean).join(" · ")}</p>
            <h2 className="mt-1 font-heading text-lg font-semibold">{card.title[locale]}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.summary[locale]}</p>
            <p className="mt-3 text-sm font-semibold">{card.priceMnt.toLocaleString("mn-MN")}₮</p>
          </Link>
        ))}
      </div>
      {visible.length === 0 ? <p className="mt-6 text-sm text-muted-foreground">{locale === "en" ? "Nothing matches." : "Тохирох зүйл алга."}</p> : null}
      <div className="mt-6 flex items-center gap-3 text-sm">
        <button type="button" className="rounded-lg border border-border px-3 py-2" disabled={current <= 1} onClick={() => setPage(current - 1)}>{locale === "en" ? "Previous" : "Өмнөх"}</button>
        <span>{current} / {pages}</span>
        <button type="button" className="rounded-lg border border-border px-3 py-2" disabled={current >= pages} onClick={() => setPage(current + 1)}>{locale === "en" ? "Next" : "Дараах"}</button>
      </div>
    </div>
  );
}
