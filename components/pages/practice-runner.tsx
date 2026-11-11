"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { choiceLabel, drawAttempt, textOf, type DrawnQuestion, type PracticeExam } from "@/lib/content/practice-exams";
import { useI18n } from "@/components/language-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const copy = {
  mn: {
    back: "Тест рүү буцах",
    preparing: "Асуултын сангаас багц бэлдэж байна.",
    next: "Дараагийн асуулт",
    finish: "Оноогоо харах",
    retry: "Өөр асуултаар дахин",
    score: "Зөв",
    of: "/",
    note: "Энэ дасгал. Албан ёсны ЭЕШ, олимпиад, IQ хэмжилт биш. Дараагийн туршилтад сангаас өөр асуулт гарна.",
    correct: "Зөв.",
    incorrect: "Өөр хариулт. Зөвийг доор үлдээв.",
  },
  en: {
    back: "Back to tests",
    preparing: "Drawing a new set from the question bank.",
    next: "Next question",
    finish: "See the score",
    retry: "Try a different set",
    score: "Correct",
    of: "/",
    note: "This is practice, not an official EESH paper, olympiad, or IQ measurement. The next try draws different questions.",
    correct: "Correct.",
    incorrect: "Not this one. The correct choice is marked below.",
  },
} as const;

function avoidKey(slug: string) {
  return `edumongolia-exam-avoid-${slug}`;
}

function readAvoid(slug: string) {
  try {
    const raw = sessionStorage.getItem(avoidKey(slug));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function PracticeRunner({ exam }: { exam: PracticeExam }) {
  const { locale } = useI18n();
  const t = copy[locale];
  const [pack, setPack] = useState<DrawnQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const next = drawAttempt(exam, readAvoid(exam.slug));
    setPack(next);
    setIndex(0);
    setPicked({});
    setDone(false);
  }, [exam]);

  function startNew() {
    const avoid = pack?.map((item) => item.id) ?? [];
    sessionStorage.setItem(avoidKey(exam.slug), JSON.stringify(avoid));
    setPack(drawAttempt(exam, avoid));
    setIndex(0);
    setPicked({});
    setDone(false);
  }

  if (!pack) {
    return <p className="mx-auto max-w-3xl px-4 py-16 text-sm text-muted-foreground">{t.preparing}</p>;
  }

  const current = pack[index];
  const correctCount = pack.filter((item) => picked[item.id] === item.answer).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link href="/kids" className="text-sm font-medium text-primary">{t.back}</Link>
      <p className="mt-4 text-sm text-muted-foreground">{textOf(exam.age, locale)} · {pack.length} {locale === "en" ? "questions" : "асуулт"}</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{textOf(exam.title, locale)}</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{t.note}</p>

      {done ? (
        <section className="mt-8 rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <p className="font-heading text-4xl font-semibold">{correctCount}{t.of}{pack.length}</p>
          <p className="mt-2 text-sm">{t.score}</p>
          <ol className="mt-6 space-y-4">
            {pack.map((item, itemIndex) => (
              <li key={item.id}>
                <p className="text-sm font-medium">{itemIndex + 1}. {textOf(item.prompt, locale)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{choiceLabel(item.answer)}. {textOf(item.choices[item.answer], locale)}</p>
                <p className="mt-1 text-sm">{textOf(item.explain, locale)}</p>
              </li>
            ))}
          </ol>
          <Button className="mt-6" onClick={startNew}>{t.retry}</Button>
        </section>
      ) : (
        <section className="mt-8 rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <p className="text-sm text-muted-foreground">{index + 1}{t.of}{pack.length}</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold">{textOf(current.prompt, locale)}</h2>
          <fieldset className="mt-4 space-y-2">
            <legend className="sr-only">{textOf(current.prompt, locale)}</legend>
            {current.choices.map((choice, choiceIndex) => {
              const selected = picked[current.id];
              const show = selected !== undefined;
              const right = choiceIndex === current.answer;
              return (
                <label
                  key={choice.mn}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-start gap-3 rounded-xl px-3 py-3 text-sm ring-1 ring-foreground/10",
                    show && right && "bg-primary/10",
                    show && selected === choiceIndex && !right && "bg-destructive/10",
                  )}
                >
                  <input
                    type="radio"
                    className="mt-1"
                    name={current.id}
                    checked={selected === choiceIndex}
                    onChange={() => setPicked((currentPicks) => ({ ...currentPicks, [current.id]: choiceIndex }))}
                  />
                  <span><strong>{choiceLabel(choiceIndex)}.</strong> {textOf(choice, locale)}</span>
                </label>
              );
            })}
          </fieldset>
          {picked[current.id] !== undefined && (
            <p className="mt-3 text-sm">
              {picked[current.id] === current.answer ? t.correct : t.incorrect} {textOf(current.explain, locale)}
            </p>
          )}
          <Button
            className="mt-5"
            disabled={picked[current.id] === undefined}
            onClick={() => {
              if (index + 1 >= pack.length) setDone(true);
              else setIndex(index + 1);
            }}
          >
            {index + 1 >= pack.length ? t.finish : t.next}
          </Button>
        </section>
      )}
      <Link href="/kids" className={cn(buttonVariants({ variant: "outline" }), "mt-4")}>{t.back}</Link>
    </div>
  );
}
