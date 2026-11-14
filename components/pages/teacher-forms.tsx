"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { TeacherFormKind } from "@/lib/content/teacher-forms";
import { ContinuePay, type UnlockedReading } from "@/components/payments/continue-pay";
import { useI18n } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

type ListedForm = {
  id: string;
  teacher: string;
  title: string;
  kind: TeacherFormKind;
  priceMnt: number;
  embedUrl: string | null;
};

const copy = {
  mn: {
    title: "Багшийн Google Form",
    lead: "Багш Google Form дээр шалгалтаа хийж, холбоосоо энд үлдээнэ. Үнэгүй шалгалт шууд нээгдэнэ. Үнэтэй шалгалт 5,000₮. QPay баталсны дараа форм нээгдэнэ. Холбоос төлөөгүй хуудсанд гарахгүй.",
    stepsTitle: "Яаж холбох вэ",
    steps: [
      "forms.google.com дээр шалгалтаа хийнэ. Quizzes-ийг нээж, сурагч илгээнгүүт оноо гаргана.",
      "Send дээрх холбоосоо доор хийнэ. Холбоос зөвхөн docs.google.com/forms байна.",
      "Үнэгүй гэвэл форм шууд нээгдэнэ. 5,000₮ гэвэл сурагч QPay-ээр төлнө.",
      "Ингэснээр форм энэ хөтөч дээр биш, сайт дээр хадгалагдана. Өөр сурагч нээж болно.",
    ],
    teacher: "Багшийн нэр",
    examTitle: "Шалгалтын нэр",
    kind: "Төрөл",
    paid: "5,000₮. Төлбөр баталгаажмагц нээнэ",
    url: "Google Form-ын холбоос",
    add: "Шалгалт холбох",
    saved: "Холбогдлоо. Сурагчид энэ жагсаалтаас нээнэ.",
    invalid: "docs.google.com/forms холбоос биш байна.",
    required: "Нэр, шалгалт, холбоосоо бөглөнө.",
    yours: "Холбогдсон шалгалт",
    empty: "Одоогоор холбогдсон форм алга.",
    free: "Үнэгүй",
    fee: "5,000₮",
    kinds: { eesh: "ЭЕШ-ийн жишээ", olympiad: "Мини олимпиад", kids: "Хүүхдийн тест" } as Record<TeacherFormKind, string>,
  },
  en: {
    title: "A teacher's Google Form",
    lead: "A teacher builds the test in Google Forms and leaves the link here. A free test opens at once. A paid test is 5,000 MNT. The form opens after QPay confirms the payment. The link is not on the page before that.",
    stepsTitle: "How to connect it",
    steps: [
      "Build the test at forms.google.com. Turn on Quizzes so the score appears after the student sends it.",
      "Paste the Send link below. Only a docs.google.com/forms link is accepted.",
      "Free opens the form immediately. 5,000 MNT means the student pays with QPay.",
      "The form is stored on the site, not only in this browser. Another student can open it.",
    ],
    teacher: "Teacher name",
    examTitle: "Test title",
    kind: "Type",
    paid: "5,000 MNT. Open it after the payment is confirmed",
    url: "Google Form link",
    add: "Connect the test",
    saved: "Connected. Students open it from this list.",
    invalid: "That is not a docs.google.com/forms link.",
    required: "Add a name, a title, and a link.",
    yours: "Connected tests",
    empty: "No form is connected yet.",
    free: "Free",
    fee: "5,000 MNT",
    kinds: { eesh: "EESH-style", olympiad: "Mini olympiad", kids: "Children's test" } as Record<TeacherFormKind, string>,
  },
} as const;

export function TeacherForms() {
  const { locale } = useI18n();
  const t = copy[locale];
  const [forms, setForms] = useState<ListedForm[]>([]);
  const [teacher, setTeacher] = useState("");
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState<TeacherFormKind>("kids");
  const [paid, setPaid] = useState(true);
  const [formUrl, setFormUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    void fetch("/api/teacher-forms").then(async (response) => {
      const body = await response.json().catch(() => ({}));
      if (Array.isArray(body.forms)) setForms(body.forms);
    });
  }, []);

  async function addForm(event: FormEvent) {
    event.preventDefault();
    if (!teacher.trim() || !title.trim() || !formUrl.trim()) {
      setMessage(t.required);
      return;
    }
    const response = await fetch("/api/teacher-forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teacher, title, kind, formUrl, paid }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok || !body.form) {
      setMessage(t.invalid);
      return;
    }
    setForms((current) => [body.form, ...current.filter((item: ListedForm) => item.id !== body.form.id)]);
    setTitle("");
    setFormUrl("");
    setMessage(t.saved);
  }

  function unlock(id: string, reading: UnlockedReading) {
    if (!reading.embedUrl) return;
    setForms((current) => current.map((item) => item.id === id ? { ...item, embedUrl: reading.embedUrl ?? null } : item));
  }

  return (
    <section className="rounded-3xl bg-card p-5 ring-1 ring-foreground/10 sm:p-8">
      <h2 className="font-heading text-2xl font-semibold">{t.title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{t.lead}</p>
      <h3 className="mt-6 font-heading text-xl font-semibold">{t.stepsTitle}</h3>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">
        {t.steps.map((step) => <li key={step}>{step}</li>)}
      </ol>
      <form onSubmit={(event) => { void addForm(event); }} className="mt-6 grid gap-3 sm:grid-cols-2">
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
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" checked={paid} onChange={(event) => setPaid(event.target.checked)} />
          {t.paid}
        </label>
        <label className="text-sm font-medium sm:col-span-2">{t.url}
          <input className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3" value={formUrl} onChange={(event) => setFormUrl(event.target.value)} placeholder="https://docs.google.com/forms/..." />
        </label>
        <div>
          <Button type="submit">{t.add}</Button>
        </div>
      </form>
      {message ? <p className="mt-3 text-sm">{message}</p> : null}
      <h3 className="mt-8 font-heading text-xl font-semibold">{t.yours}</h3>
      {forms.length === 0 ? <p className="mt-3 text-sm text-muted-foreground">{t.empty}</p> : (
        <ul className="mt-4 space-y-4">
          {forms.map((form) => (
            <li key={form.id} className="rounded-2xl bg-background p-4 ring-1 ring-foreground/10">
              <p className="text-xs text-muted-foreground">{t.kinds[form.kind]} · {form.teacher}</p>
              <h4 className="font-heading text-lg font-semibold">{form.title}</h4>
              <p className="mt-1 text-sm">{form.priceMnt > 0 ? t.fee : t.free}</p>
              {form.embedUrl ? (
                <iframe title={form.title} src={form.embedUrl} className="mt-4 h-[32rem] w-full rounded-xl border border-border" />
              ) : (
                <ContinuePay kind="form" id={form.id} priceMnt={form.priceMnt} onUnlocked={(reading) => unlock(form.id, reading)} />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
