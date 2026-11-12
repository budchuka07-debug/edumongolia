"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  bandLabel,
  buildCustomTopic,
  readCustomTopics,
  SCHOOL_CUSTOM_KEY,
  schoolBands,
  schoolText,
  schoolTopics,
  subjectName,
  type CustomDraft,
  type CustomError,
  type SchoolBand,
} from "@/lib/content/school-exams";
import { usePersistedState } from "@/lib/use-persisted-state";
import { useI18n } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

const copy = {
  mn: {
    eyebrow: "EduMongolia шалгалт",
    title: "Сэдвийн дагуу шалгалтын сан",
    lead: "Дунд, ахлах анги, Cambridge, олон улсын төгсөлтийн шалгалтыг хичээл, сэдвээр нь дасна. Хариулж дууссаны дараа эхлээд юу буруу, яагаад тэр алдаа гарсан бэ гэдэг гарна. Оноо түүний дараа гарна. Дахин өгөхөд асуулт солигдоно.",
    open: "Хичээл, шалгалт",
    bank: "санд",
    each: "нэг хувилбарт",
    yours: "Таны оруулсан",
    remove: "Хасах",
    addTitle: "Хичээл, шалгалт нэмэх",
    addLead: "Өөрийн хичээлийн текст, асуултаа энд оруулна. Буруу сонголт бүрт яагаад тэр алдаа гардгийг бичнэ. Энэ хөтөч дээр хадгалагдана. 4-өөс олон асуулт бол нэг удаад 4 гарна.",
    band: "Ангилал",
    subject: "Хичээл",
    grades: "Анги эсвэл түвшин",
    topic: "Сэдвийн нэр",
    lesson: "Хичээлийн текст. Мөр бүр нэг догол мөр.",
    prompt: "Асуулт",
    rule: "Зөв хариуны дүрэм",
    correct: "Зөв хариу",
    choice: "Сонголт",
    why: "Энэ буруу сонголт яагаад гарах вэ",
    addQuestion: "Асуулт нэмэх",
    removeQuestion: "Асуултыг хасах",
    save: "Сэдэв хадгалах",
    saved: "Энэ хөтөч дээр хадгалагдлаа.",
    errors: {
      subject: "Хичээлийн нэрийг бичнэ.",
      grades: "Анги эсвэл түвшинг бичнэ.",
      title: "Сэдвийн нэрийг бичнэ.",
      lesson: "Хичээлийн текстаа бичнэ.",
      questions: "Дор хаяж хоёр асуулт оруулна.",
      prompt: "Асуулт бүрийг бичнэ.",
      rule: "Асуулт бүрийн дүрмийг бичнэ.",
      choice: "Асуулт бүрт дор хаяж хоёр сонголт бичнэ.",
      why: "Буруу сонголт бүрийн учир шалтгааныг бичнэ.",
      answer: "Зөв хариуг сонгоно.",
    } as Record<CustomError, string>,
  },
  en: {
    eyebrow: "EduMongolia exams",
    title: "A topic exam bank",
    lead: "Practice middle school, high school, Cambridge, and international graduation exams by lesson and topic. After the answers, the wrong items and the reason for each mistake appear first. The score comes after that. A retry changes the questions.",
    open: "Lesson and exam",
    bank: "in the bank",
    each: "in one variant",
    yours: "Added by you",
    remove: "Remove",
    addTitle: "Add a lesson and an exam",
    addLead: "Add your own lesson text and questions here. For every wrong choice, write why that mistake happens. It is stored in this browser. More than four questions means one try draws four.",
    band: "Section",
    subject: "Subject",
    grades: "Grade or level",
    topic: "Topic title",
    lesson: "Lesson text. Each line is one paragraph.",
    prompt: "Question",
    rule: "Rule for the correct answer",
    correct: "Correct answer",
    choice: "Choice",
    why: "Why this wrong choice happens",
    addQuestion: "Add a question",
    removeQuestion: "Remove this question",
    save: "Save the topic",
    saved: "Saved in this browser.",
    errors: {
      subject: "Add a subject.",
      grades: "Add a grade or level.",
      title: "Add a topic title.",
      lesson: "Add the lesson text.",
      questions: "Add at least two questions.",
      prompt: "Write every question.",
      rule: "Write the rule for every question.",
      choice: "Give every question at least two choices.",
      why: "Explain every wrong choice.",
      answer: "Mark the correct answer.",
    } as Record<CustomError, string>,
  },
} as const;

function emptyQuestion(): CustomDraft["questions"][number] {
  return {
    prompt: "",
    rule: "",
    answer: 0,
    choices: [
      { text: "", why: "" },
      { text: "", why: "" },
      { text: "", why: "" },
      { text: "", why: "" },
    ],
  };
}

export function SchoolCatalog() {
  const { locale } = useI18n();
  const t = copy[locale];
  const [stored, setStored] = usePersistedState<unknown[]>(SCHOOL_CUSTOM_KEY, []);
  const custom = readCustomTopics(stored);
  const [draft, setDraft] = useState<CustomDraft>({
    band: "middle",
    subject: "",
    grades: "",
    title: "",
    lesson: "",
    questions: [emptyQuestion(), emptyQuestion()],
  });
  const [message, setMessage] = useState("");

  function save(event: FormEvent) {
    event.preventDefault();
    const built = buildCustomTopic(draft);
    if (!built.ok) {
      setMessage(t.errors[built.error]);
      return;
    }
    setStored((current) => [built.topic, ...readCustomTopics(current)]);
    setDraft({
      band: draft.band,
      subject: "",
      grades: "",
      title: "",
      lesson: "",
      questions: [emptyQuestion(), emptyQuestion()],
    });
    setMessage(t.saved);
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-8 sm:py-12">
      <header>
        <p className="text-sm font-medium text-primary">{t.eyebrow}</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{t.lead}</p>
      </header>

      {schoolBands.map((band) => {
        const builtIn = schoolTopics.filter((item) => item.band === band);
        const added = custom.filter((item) => item.band === band);
        const subjects = [...new Set([...builtIn.map((item) => item.subject), ...added.map((item) => item.subject)])];
        return (
          <section key={band} className="flex flex-col gap-6">
            <h2 className="font-heading text-2xl font-semibold">{schoolText(bandLabel[band], locale)}</h2>
            {subjects.map((subject) => (
              <div key={`${band}-${subject}`}>
                <h3 className="font-heading text-lg font-semibold">{subjectName(subject, locale)}</h3>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {builtIn.filter((item) => item.subject === subject).map((item) => (
                    <article key={item.slug} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
                      <h4 className="font-heading text-xl font-semibold">{schoolText(item.title, locale)}</h4>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{schoolText(item.summary, locale)}</p>
                      <p className="mt-3 text-sm">{schoolText(item.grades, locale)} · {item.questions.length} {t.bank} · {item.perAttempt} {t.each}</p>
                      <Link href={`/school/${item.slug}`} className="mt-4 inline-block text-sm font-semibold text-primary">{t.open}</Link>
                    </article>
                  ))}
                  {added.filter((item) => item.subject === subject).map((item) => (
                    <article key={item.slug} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
                      <p className="text-xs font-medium text-primary">{t.yours}</p>
                      <h4 className="mt-1 font-heading text-xl font-semibold">{schoolText(item.title, locale)}</h4>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{schoolText(item.summary, locale)}</p>
                      <p className="mt-3 text-sm">{schoolText(item.grades, locale)} · {item.questions.length} {t.bank} · {item.perAttempt} {t.each}</p>
                      <div className="mt-4 flex gap-4">
                        <Link href={`/school/${item.slug}`} className="text-sm font-semibold text-primary">{t.open}</Link>
                        <button
                          type="button"
                          className="text-sm font-medium text-muted-foreground"
                          onClick={() => setStored((current) => readCustomTopics(current).filter((saved) => saved.slug !== item.slug))}
                        >
                          {t.remove}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}

      <form onSubmit={save} className="rounded-3xl bg-card p-5 ring-1 ring-foreground/10 sm:p-8">
        <h2 className="font-heading text-2xl font-semibold">{t.addTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{t.addLead}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">{t.band}
            <select
              className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3"
              value={draft.band}
              onChange={(event) => setDraft({ ...draft, band: event.target.value as SchoolBand })}
            >
              {schoolBands.map((band) => <option key={band} value={band}>{schoolText(bandLabel[band], locale)}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium">{t.subject}
            <input className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3" value={draft.subject} onChange={(event) => setDraft({ ...draft, subject: event.target.value })} />
          </label>
          <label className="text-sm font-medium">{t.grades}
            <input className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3" value={draft.grades} onChange={(event) => setDraft({ ...draft, grades: event.target.value })} />
          </label>
          <label className="text-sm font-medium">{t.topic}
            <input className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
          </label>
        </div>
        <label className="mt-3 block text-sm font-medium">{t.lesson}
          <textarea className="mt-1 min-h-28 w-full rounded-xl border border-border bg-background px-3 py-2" value={draft.lesson} onChange={(event) => setDraft({ ...draft, lesson: event.target.value })} />
        </label>

        <div className="mt-6 flex flex-col gap-4">
          {draft.questions.map((question, questionIndex) => (
            <fieldset key={questionIndex} className="rounded-2xl p-4 ring-1 ring-foreground/10">
              <legend className="px-1 text-sm font-semibold">{questionIndex + 1}</legend>
              <label className="mt-2 block text-sm font-medium">{t.prompt}
                <textarea className="mt-1 min-h-16 w-full rounded-xl border border-border bg-background px-3 py-2" value={question.prompt} onChange={(event) => updateQuestion(questionIndex, { prompt: event.target.value })} />
              </label>
              <label className="mt-3 block text-sm font-medium">{t.rule}
                <textarea className="mt-1 min-h-16 w-full rounded-xl border border-border bg-background px-3 py-2" value={question.rule} onChange={(event) => updateQuestion(questionIndex, { rule: event.target.value })} />
              </label>
              <div className="mt-3 grid gap-3">
                {question.choices.map((choice, choiceIndex) => (
                  <div key={choiceIndex} className="grid gap-2 sm:grid-cols-[auto_1fr]">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input
                        type="radio"
                        name={`answer-${questionIndex}`}
                        checked={question.answer === choiceIndex}
                        onChange={() => updateQuestion(questionIndex, { answer: choiceIndex })}
                      />
                      {t.correct}
                    </label>
                    <div>
                      <label className="block text-sm font-medium">{t.choice} {choiceIndex + 1}
                        <input className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3" value={choice.text} onChange={(event) => updateChoice(questionIndex, choiceIndex, { text: event.target.value })} />
                      </label>
                      {question.answer !== choiceIndex && (
                        <label className="mt-2 block text-sm font-medium">{t.why}
                          <input className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3" value={choice.why} onChange={(event) => updateChoice(questionIndex, choiceIndex, { why: event.target.value })} />
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {draft.questions.length > 2 && (
                <button type="button" className="mt-3 text-sm font-medium text-muted-foreground" onClick={() => setDraft({ ...draft, questions: draft.questions.filter((_, itemIndex) => itemIndex !== questionIndex) })}>
                  {t.removeQuestion}
                </button>
              )}
            </fieldset>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => setDraft({ ...draft, questions: [...draft.questions, emptyQuestion()] })}>{t.addQuestion}</Button>
          <Button type="submit">{t.save}</Button>
        </div>
        {message && <p className="mt-3 text-sm">{message}</p>}
      </form>
    </div>
  );

  function updateQuestion(questionIndex: number, patch: Partial<CustomDraft["questions"][number]>) {
    setDraft({
      ...draft,
      questions: draft.questions.map((item, index) => index === questionIndex ? { ...item, ...patch } : item),
    });
  }

  function updateChoice(questionIndex: number, choiceIndex: number, patch: Partial<CustomDraft["questions"][number]["choices"][number]>) {
    setDraft({
      ...draft,
      questions: draft.questions.map((item, index) => {
        if (index !== questionIndex) return item;
        return {
          ...item,
          choices: item.choices.map((choice, current) => current === choiceIndex ? { ...choice, ...patch } : choice),
        };
      }),
    });
  }
}
