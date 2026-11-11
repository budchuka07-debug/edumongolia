"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { practiceExams, textOf, type ExamKind } from "@/lib/content/practice-exams";
import {
  embedUrl,
  studentCanOpen,
  TEACHER_FORMS_KEY,
  type TeacherForm,
  type TeacherFormKind,
} from "@/lib/content/teacher-forms";
import { usePersistedState } from "@/lib/use-persisted-state";
import { useI18n } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

const copy = {
  mn: {
    eyebrow: "Хүүхдийн тест",
    title: "Асуултын сантай шалгалт",
    lead: "Хүүхдэд хэрэгтэй асуулт, ЭЕШ-ийн жишээ, мини олимпиад энд байна. Нэг туршилтад асуулт бүтнээрээ давтагдахгүй. Хариулснаас хойш оноо шууд гарна.",
    open: "Туршиж үзэх",
    bank: "санд",
    each: "туршилтад",
    formsTitle: "Багшийн Google Form",
    formsLead: "Багш Google Form дээр шалгалтаа хийж, шууд хариу гаргаад, энд холбоосоо үлдээнэ. Төлбөрийг сайт хураахгүй. Үнээ бичээд, мөнгийг багшийн данс руу авна.",
    stepsTitle: "Google Form-оор яаж оруулах вэ",
    steps: [
      "forms.google.com дээр хоосон форм нээнэ. Асуултаа олон сонголттой болгоно.",
      "Тохиргоо → Quizzes → Make this a quiz. Release grade-ийг Immediately after each submission гэж сонгоно. Correct answers болон point values-ийг нээнэ. Ингэснээр сурагч илгээнгүүт оноо, зөв хариу гарна.",
      "Send дээрээс холбоосоо хуулна. Доорх маягтад багшийн нэр, шалгалтын нэр, төрөл, үнэ, утас, холбоосоо хийнэ.",
      "Үнэ 0 бол форм шууд нээгдэнэ. Үнэтэй бөгөөд «Төлбөр орсон хойно холбоосыг нээ» гэж сонговол сурагчид зөвхөн үнэ, утас харагдана. Холбоосыг багш төлбөр ирсний дараа өөрөө илгээнэ.",
      "Энэ хөтөч дээр хадгалагдана. Бүх зочдод гаргах бол холбоосоо EduMongolia руу илгээнэ.",
    ],
    teacher: "Багшийн нэр",
    examTitle: "Шалгалтын нэр",
    kind: "Төрөл",
    price: "Үнэ, төгрөг. 0 бол үнэгүй",
    phone: "Утас",
    url: "Google Form-ын холбоос",
    hide: "Төлбөр орсон хойно холбоосыг нууна",
    add: "Шалгалт нэмэх",
    saved: "Энэ хөтөч дээр хадгалагдлаа.",
    invalid: "docs.google.com/forms холбоос биш байна.",
    required: "Нэр, шалгалт, холбоосоо бөглөнө.",
    yours: "Энэ хөтөч дээрх багшийн шалгалт",
    empty: "Одоогоор багшийн форм алга. Дээрх алхмаар нэмнэ.",
    paid: "төгрөг",
    free: "Үнэгүй",
    hidden: "Холбоос нуугдсан. Багштай утсаар тохирно.",
    openForm: "Формыг нээх",
    remove: "Хасах",
    kinds: { eesh: "ЭЕШ-ийн жишээ", olympiad: "Мини олимпиад", kids: "Хүүхдийн тест" } as Record<TeacherFormKind, string>,
    groups: { kids: "Хүүхдэд хэрэгтэй", eesh: "ЭЕШ-ийн жишээ", olympiad: "Мини олимпиад" } as Record<ExamKind, string>,
  },
  en: {
    eyebrow: "Children's tests",
    title: "Tests drawn from a question bank",
    lead: "Useful questions, EESH-style practice, and a mini olympiad. A try does not repeat the whole set. The score appears as soon as you finish.",
    open: "Try it",
    bank: "in the bank",
    each: "each try",
    formsTitle: "A teacher's Google Form",
    formsLead: "A teacher builds the quiz in Google Forms, turns on instant results, and leaves the link here. This site does not take the payment. Write the price and collect it on the teacher's account.",
    stepsTitle: "How to add a Google Form",
    steps: [
      "Open a blank form at forms.google.com and use multiple-choice questions.",
      "Settings → Quizzes → Make this a quiz. Set Release grade to Immediately after each submission, and turn on correct answers and point values. The student then sees the score and the right answers after sending.",
      "Copy the link from Send. Add the teacher, title, type, price, phone, and link in the form below.",
      "A price of 0 opens the form here. If it has a price and “Hide the link until paid” is on, visitors only see the price and phone. The teacher sends the link after payment.",
      "It is stored in this browser. Send the link to EduMongolia when it should appear for every visitor.",
    ],
    teacher: "Teacher name",
    examTitle: "Test title",
    kind: "Type",
    price: "Price in tögrög. 0 means free",
    phone: "Phone",
    url: "Google Form link",
    hide: "Hide the link until paid",
    add: "Add the test",
    saved: "Saved in this browser.",
    invalid: "That is not a docs.google.com/forms link.",
    required: "Add a name, a title, and a link.",
    yours: "Teacher tests saved in this browser",
    empty: "No teacher form yet. Use the steps above.",
    paid: "tögrög",
    free: "Free",
    hidden: "The link stays hidden. Arrange payment with the teacher.",
    openForm: "Open the form",
    remove: "Remove",
    kinds: { eesh: "EESH-style", olympiad: "Mini olympiad", kids: "Children's test" } as Record<TeacherFormKind, string>,
    groups: { kids: "Useful for children", eesh: "EESH-style practice", olympiad: "Mini olympiad" } as Record<ExamKind, string>,
  },
} as const;

export function KidsPage() {
  const { locale } = useI18n();
  const t = copy[locale];
  const [forms, setForms] = usePersistedState<TeacherForm[]>(TEACHER_FORMS_KEY, []);
  const [teacher, setTeacher] = useState("");
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<TeacherFormKind>("eesh");
  const [price, setPrice] = useState("0");
  const [phone, setPhone] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [hideUntilPaid, setHideUntilPaid] = useState(true);
  const [message, setMessage] = useState("");

  function addForm(event: FormEvent) {
    event.preventDefault();
    if (!teacher.trim() || !title.trim() || !formUrl.trim()) {
      setMessage(t.required);
      return;
    }
    if (!embedUrl(formUrl)) {
      setMessage(t.invalid);
      return;
    }
    const amount = Math.max(0, Math.round(Number(price) || 0));
    const next: TeacherForm = {
      id: `${Date.now()}`,
      teacher: teacher.trim(),
      title: title.trim(),
      kind,
      price: amount,
      phone: phone.trim(),
      formUrl: formUrl.trim(),
      hideUntilPaid: amount > 0 && hideUntilPaid,
    };
    setForms((current) => [next, ...current]);
    setTitle("");
    setFormUrl("");
    setMessage(t.saved);
  }

  const groups: ExamKind[] = ["kids", "eesh", "olympiad"];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-8 sm:py-12">
      <header>
        <p className="text-sm font-medium text-primary">{t.eyebrow}</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{t.lead}</p>
      </header>

      {groups.map((group) => (
        <section key={group}>
          <h2 className="font-heading text-2xl font-semibold">{t.groups[group]}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {practiceExams.filter((exam) => exam.kind === group).map((exam) => (
              <article key={exam.slug} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
                <h3 className="font-heading text-xl font-semibold">{textOf(exam.title, locale)}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{textOf(exam.summary, locale)}</p>
                <p className="mt-3 text-sm">{textOf(exam.age, locale)} · {exam.questions.length} {t.bank} · {exam.perAttempt} {t.each}</p>
                <Link href={`/kids/${exam.slug}`} className="mt-4 inline-block text-sm font-semibold text-primary">{t.open}</Link>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="rounded-3xl bg-card p-5 ring-1 ring-foreground/10 sm:p-8">
        <h2 className="font-heading text-2xl font-semibold">{t.formsTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{t.formsLead}</p>
        <h3 className="mt-6 font-heading text-xl font-semibold">{t.stepsTitle}</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">
          {t.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>

        <form onSubmit={addForm} className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">{t.teacher}
            <input className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3" value={teacher} onChange={(event) => setTeacher(event.target.value)} />
          </label>
          <label className="text-sm font-medium">{t.examTitle}
            <input className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3" value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <label className="text-sm font-medium">{t.kind}
            <select className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3" value={kind} onChange={(event) => setKind(event.target.value as TeacherFormKind)}>
              {(Object.keys(t.kinds) as TeacherFormKind[]).map((item) => <option key={item} value={item}>{t.kinds[item]}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium">{t.price}
            <input className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3" inputMode="numeric" value={price} onChange={(event) => setPrice(event.target.value)} />
          </label>
          <label className="text-sm font-medium">{t.phone}
            <input className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3" value={phone} onChange={(event) => setPhone(event.target.value)} />
          </label>
          <label className="text-sm font-medium sm:col-span-2">{t.url}
            <input className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3" value={formUrl} onChange={(event) => setFormUrl(event.target.value)} placeholder="https://docs.google.com/forms/..." />
          </label>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" checked={hideUntilPaid} onChange={(event) => setHideUntilPaid(event.target.checked)} />
            {t.hide}
          </label>
          <div>
            <Button type="submit">{t.add}</Button>
          </div>
        </form>
        {message && <p className="mt-3 text-sm">{message}</p>}

        <h3 className="mt-8 font-heading text-xl font-semibold">{t.yours}</h3>
        {forms.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">{t.empty}</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {forms.map((form) => {
              const open = studentCanOpen(form);
              const src = embedUrl(form.formUrl);
              return (
                <li key={form.id} className="rounded-2xl bg-background p-4 ring-1 ring-foreground/10">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">{t.kinds[form.kind]} · {form.teacher}</p>
                      <h4 className="font-heading text-lg font-semibold">{form.title}</h4>
                      <p className="mt-1 text-sm">{form.price > 0 ? `${form.price.toLocaleString("mn-MN")} ${t.paid}` : t.free}{form.phone ? ` · ${form.phone}` : ""}</p>
                    </div>
                    <Button type="button" variant="outline" onClick={() => setForms((current) => current.filter((item) => item.id !== form.id))}>{t.remove}</Button>
                  </div>
                  {open && src ? (
                    <iframe title={form.title} src={src} className="mt-4 h-[32rem] w-full rounded-xl border border-border" />
                  ) : (
                    <p className="mt-3 text-sm">{t.hidden}</p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
