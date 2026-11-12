"use client";

import Link from "next/link";
import { useState } from "react";
import {
  bandLabel,
  choiceLabel,
  drawSchoolAttempt,
  getSchoolTopic,
  readCustomTopics,
  SCHOOL_CUSTOM_KEY,
  schoolText,
  subjectName,
  type SchoolQuestion,
} from "@/lib/content/school-exams";
import { usePersistedState } from "@/lib/use-persisted-state";
import { useI18n } from "@/components/language-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const copy = {
  mn: {
    back: "Шалгалтын сан руу",
    missing: "Энэ сэдэв энэ хөтөч дээр алга.",
    start: "Шалгалт эхлүүлэх",
    lesson: "Хичээл",
    note: "Хариугаа дуусгасны дараа эхлээд алдаа, түүний учир гарна. Оноо түүний дараа гарна. Дахин өгөхөд сангаас өөр багц гарна. Энэ нь албан ёсны улсын, Cambridge, IB-ийн хуудас биш.",
    previous: "Өмнөх",
    next: "Дараагийн асуулт",
    finish: "Хариултаа дуусгах",
    mistakesTitle: "Алдаа",
    none: "Алдаа гараагүй.",
    yourAnswer: "Таны хариу",
    why: "Ийм алдаа гарах учир",
    right: "Зөв хариу",
    rule: "Дүрэм",
    scoreButton: "Оноогоо харах",
    scoreTitle: "Оноо",
    correct: "Зөв",
    retry: "Өөр хувилбараар дахин",
    review: "Алдаа руу буцах",
    custom: "Таны оруулсан",
  },
  en: {
    back: "Back to the exam bank",
    missing: "This topic is not in this browser.",
    start: "Start the exam",
    lesson: "Lesson",
    note: "After you finish, the mistakes and the reason for each one appear first. The score comes after that. A retry draws a different set. This is not an official national, Cambridge, or IB paper.",
    previous: "Previous",
    next: "Next question",
    finish: "Finish the answers",
    mistakesTitle: "Mistakes",
    none: "No mistakes.",
    yourAnswer: "Your answer",
    why: "Why this mistake happens",
    right: "Correct answer",
    rule: "Rule",
    scoreButton: "See the score",
    scoreTitle: "Score",
    correct: "Correct",
    retry: "Try a different variant",
    review: "Back to the mistakes",
    custom: "Added by you",
  },
} as const;

function avoidKey(slug: string) {
  return `edumongolia-school-avoid-${slug}`;
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

export function SchoolRunner({ slug }: { slug: string }) {
  const { locale } = useI18n();
  const t = copy[locale];
  const [custom] = usePersistedState<unknown[]>(SCHOOL_CUSTOM_KEY, []);
  const topic = getSchoolTopic(slug) ?? readCustomTopics(custom).find((item) => item.slug === slug);
  const [activeSlug, setActiveSlug] = useState(slug);
  const [phase, setPhase] = useState<"lesson" | "quiz" | "mistakes" | "score">("lesson");
  const [pack, setPack] = useState<SchoolQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Record<string, number>>({});

  if (activeSlug !== slug) {
    setActiveSlug(slug);
    setPack(null);
    setIndex(0);
    setPicked({});
    setPhase("lesson");
  }

  if (!topic) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-sm text-muted-foreground">{t.missing}</p>
        <Link href="/school" className="mt-4 inline-block text-sm font-medium text-primary">{t.back}</Link>
      </div>
    );
  }

  function begin() {
    if (!topic) return;
    setPack(drawSchoolAttempt(topic, readAvoid(topic.slug)));
    setIndex(0);
    setPicked({});
    setPhase("quiz");
  }

  function startNew() {
    if (!topic || !pack) return;
    const avoid = pack.map((item) => item.id);
    sessionStorage.setItem(avoidKey(topic.slug), JSON.stringify(avoid));
    setPack(drawSchoolAttempt(topic, avoid));
    setIndex(0);
    setPicked({});
    setPhase("quiz");
  }

  const current = pack?.[index];
  const wrong = pack?.filter((item) => picked[item.id] !== item.answer) ?? [];
  const correctCount = pack ? pack.length - wrong.length : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link href="/school" className="text-sm font-medium text-primary">{t.back}</Link>
      <p className="mt-4 text-sm text-muted-foreground">
        {schoolText(bandLabel[topic.band], locale)} · {subjectName(topic.subject, locale)} · {schoolText(topic.grades, locale)}
        {topic.custom ? ` · ${t.custom}` : ""}
      </p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{schoolText(topic.title, locale)}</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{t.note}</p>

      {phase === "lesson" && (
        <section className="mt-8 rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-xl font-semibold">{t.lesson}</h2>
          <div className="mt-3 space-y-3 text-sm leading-6">
            {topic.lesson.map((paragraph) => (
              <p key={paragraph.mn}>{schoolText(paragraph, locale)}</p>
            ))}
          </div>
          <Button className="mt-5" onClick={begin}>{t.start}</Button>
        </section>
      )}

      {phase === "quiz" && pack && current && (
        <Quiz
          pack={pack}
          current={current}
          index={index}
          picked={picked}
          locale={locale}
          onPick={(choice) => setPicked((currentPicks) => ({ ...currentPicks, [current.id]: choice }))}
          onPrevious={() => setIndex((value) => Math.max(0, value - 1))}
          onNext={() => {
            if (index + 1 >= pack.length) setPhase("mistakes");
            else setIndex(index + 1);
          }}
        />
      )}

      {phase === "mistakes" && pack && (
        <section className="mt-8 rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl font-semibold">{t.mistakesTitle}</h2>
          {wrong.length === 0 ? (
            <p className="mt-3 text-sm">{t.none}</p>
          ) : (
            <ol className="mt-4 space-y-5">
              {wrong.map((item, itemIndex) => {
                const selected = picked[item.id] ?? 0;
                const chosen = item.choices[selected];
                return (
                  <li key={item.id} className="text-sm leading-6">
                    <p className="font-medium">{itemIndex + 1}. {schoolText(item.prompt, locale)}</p>
                    <p className="mt-2 text-muted-foreground">{t.yourAnswer}: {choiceLabel(selected)}. {schoolText(chosen, locale)}</p>
                    <p className="mt-1">{t.why}: {chosen.why ? schoolText(chosen.why, locale) : schoolText(item.rule, locale)}</p>
                    <p className="mt-1">{t.right}: {choiceLabel(item.answer)}. {schoolText(item.choices[item.answer], locale)}</p>
                    <p className="mt-1">{t.rule}: {schoolText(item.rule, locale)}</p>
                  </li>
                );
              })}
            </ol>
          )}
          <Button className="mt-6" onClick={() => setPhase("score")}>{t.scoreButton}</Button>
        </section>
      )}

      {phase === "score" && pack && (
        <section className="mt-8 rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl font-semibold">{t.scoreTitle}</h2>
          <p className="mt-3 font-heading text-4xl font-semibold">{correctCount}/{pack.length}</p>
          <p className="mt-2 text-sm">{t.correct} · {Math.round((correctCount / pack.length) * 100)}%</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={startNew}>{t.retry}</Button>
            <Button variant="outline" onClick={() => setPhase("mistakes")}>{t.review}</Button>
          </div>
        </section>
      )}

      <Link href="/school" className={cn(buttonVariants({ variant: "outline" }), "mt-4")}>{t.back}</Link>
    </div>
  );
}

function Quiz({
  pack,
  current,
  index,
  picked,
  locale,
  onPick,
  onPrevious,
  onNext,
}: {
  pack: SchoolQuestion[];
  current: SchoolQuestion;
  index: number;
  picked: Record<string, number>;
  locale: "mn" | "en";
  onPick: (choice: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const t = copy[locale];
  const selected = picked[current.id];
  return (
    <section className="mt-8 rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
      <p className="text-sm text-muted-foreground">{index + 1}/{pack.length}</p>
      <h2 className="mt-2 font-heading text-2xl font-semibold">{schoolText(current.prompt, locale)}</h2>
      <fieldset className="mt-4 space-y-2">
        <legend className="sr-only">{schoolText(current.prompt, locale)}</legend>
        {current.choices.map((choice, choiceIndex) => (
          <label key={`${current.id}-${choice.mn}`} className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl px-3 py-3 text-sm ring-1 ring-foreground/10">
            <input
              type="radio"
              className="mt-1"
              name={current.id}
              checked={selected === choiceIndex}
              onChange={() => onPick(choiceIndex)}
            />
            <span><strong>{choiceLabel(choiceIndex)}.</strong> {schoolText(choice, locale)}</span>
          </label>
        ))}
      </fieldset>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button variant="outline" disabled={index === 0} onClick={onPrevious}>{t.previous}</Button>
        <Button disabled={selected === undefined} onClick={onNext}>
          {index + 1 >= pack.length ? t.finish : t.next}
        </Button>
      </div>
    </section>
  );
}
