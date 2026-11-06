"use client";

import Link from "next/link";
import { useState } from "react";
import { focusByStudent, sampleClass } from "@/lib/content/classroom";
import { courses } from "@/lib/content/courses";
import { resources } from "@/lib/content/resources";
import { usePersistedState } from "@/lib/use-persisted-state";
import { useI18n } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type Note = { id: string; text: string; at: string };

export function TeachersPage() {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [notes, setNotes] = usePersistedState<Note[]>("edumongolia-notes", []);
  const students = sampleClass.students.filter((student) =>
    student.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function addNote() {
    const text = draft.trim();
    if (!text) return;
    setNotes((current) => [
      { id: crypto.randomUUID(), text, at: new Date().toISOString() },
      ...current,
    ]);
    setDraft("");
  }

  const time = new Intl.DateTimeFormat(locale === "mn" ? "mn-MN" : "en-GB", {
    timeZone: "Asia/Ulaanbaatar",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Badge>{t.teachers.sample}</Badge>
      <h1 className="mt-3 font-heading text-4xl font-semibold">{t.teachers.title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{t.teachers.lead}</p>
      <p className="mt-2 text-sm">
        {sampleClass.name[locale]} · {sampleClass.school[locale]} · {sampleClass.teacher}
      </p>
      <Tabs defaultValue="class" className="mt-8">
        <TabsList className="h-auto w-full flex-wrap justify-start">
          <TabsTrigger value="class">{t.teachers.tabs.class}</TabsTrigger>
          <TabsTrigger value="library">{t.teachers.tabs.library}</TabsTrigger>
          <TabsTrigger value="notes">{t.teachers.tabs.notes}</TabsTrigger>
        </TabsList>
        <TabsContent value="class" className="mt-4">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.teachers.search}
            aria-label={t.teachers.search}
            className="max-w-sm"
          />
          {students.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">{t.courses.empty}</p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {students.map((student) => (
                <li key={student.id} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-medium">{student.name}</h2>
                    <Badge variant={student.status === "check" ? "destructive" : "secondary"}>
                      {student.status === "check" ? t.teachers.check : t.teachers.steady}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {t.teachers.focus}: {focusByStudent[student.id][locale]}
                  </p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs">{student.progress}%</p>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
        <TabsContent value="library" className="mt-4 grid gap-3 md:grid-cols-2">
          {courses
            .filter((course) => course.level === "teacher" || course.subject === "teaching")
            .concat(courses.filter((course) => course.level !== "teacher").slice(0, 3))
            .map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10 hover:ring-primary/40"
              >
                <p className="font-medium">{course.title[locale]}</p>
                <p className="mt-1 text-sm text-muted-foreground">{course.summary[locale]}</p>
              </Link>
            ))}
          {resources.slice(0, 3).map((resource) => (
            <Link
              key={resource.slug}
              href={`/resources/${resource.slug}`}
              className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10 hover:ring-primary/40"
            >
              <p className="font-medium">{resource.title[locale]}</p>
              <p className="mt-1 text-sm text-muted-foreground">{resource.summary[locale]}</p>
            </Link>
          ))}
        </TabsContent>
        <TabsContent value="notes" className="mt-4 max-w-2xl">
          <Textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={t.teachers.placeholder}
            aria-label={t.teachers.placeholder}
          />
          <Button className="mt-3" onClick={addNote} disabled={draft.trim().length === 0}>
            {t.teachers.post}
          </Button>
          {notes.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">{t.teachers.emptyNotes}</p>
          ) : (
            <ul className="mt-6 space-y-3">
              {notes.map((note) => (
                <li key={note.id} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
                  <p className="text-sm leading-6">{note.text}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <time className="text-xs text-muted-foreground" dateTime={note.at}>
                      {time.format(new Date(note.at))} · Ulaanbaatar
                    </time>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setNotes((current) => current.filter((item) => item.id !== note.id))
                      }
                    >
                      {t.teachers.remove}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
