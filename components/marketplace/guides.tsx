"use client";

import Link from "next/link";
import { Fact, Shell, StatusPill, useMarket } from "@/components/marketplace/chrome";
import { catalog } from "@/lib/marketplace/catalog";
import { sessionsFor, sourceOf, subjectsFor } from "@/lib/marketplace/queries";
import type { Article, Examination } from "@/lib/marketplace/types";

export function GuideIndex() {
  const { t, text } = useMarket();
  return (
    <Shell kicker={t.chinaKicker} title={t.guides} lead={t.examLead}>
      <div className="grid gap-3 md:grid-cols-2">
        {catalog.articles.map((article) => (
          <Link key={article.slug} href={`/admission-guide/${article.slug}`} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
            <h2 className="font-heading text-2xl font-semibold">{text(article.title)}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{text(article.description)}</p>
          </Link>
        ))}
      </div>
      <h2 className="font-heading text-2xl font-semibold">{t.examTitle}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.examinations.map((exam) => (
          <Link key={exam.id} href={`/admission-guide/${exam.slug}`} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
            <p className="font-heading text-xl font-semibold">{text(exam.name)}</p>
            <p className="mt-1 text-sm text-muted-foreground">{exam.family}</p>
          </Link>
        ))}
      </div>
    </Shell>
  );
}

export function ArticleView({ article }: { article: Article }) {
  const { t, text, lang } = useMarket();
  const paragraphs = article.paragraphs[lang === "en" ? "en" : "mn"];
  return (
    <Shell kicker={t.guides} title={text(article.title)} lead={text(article.description)}>
      <div className="max-w-3xl space-y-4 text-sm leading-7 sm:text-base">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{article.updatedOn}</p>
    </Shell>
  );
}

export function ExamView({ exam }: { exam: Examination }) {
  const { t, text } = useMarket();
  const source = sourceOf(exam.sourceId);
  const subjects = subjectsFor(exam.id);
  const sessions = sessionsFor(exam.id);
  return (
    <Shell kicker={t.examTitle} title={text(exam.name)} lead={t.examLead}>
      {source ? <StatusPill status={source.status} /> : null}
      <dl>
        <Fact label={t.website}>
          {exam.officialUrl ? (
            <a className="break-all text-primary" href={exam.officialUrl}>{exam.officialUrl}</a>
          ) : (
            t.unpublished
          )}
        </Fact>
        <Fact label={t.passScore}>{exam.scoreValidity ? text(exam.scoreValidity) : t.unpublished}</Fact>
      </dl>
      <section>
        <h2 className="font-heading text-2xl font-semibold">{t.subjects}</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="text-muted-foreground">
              <tr>
                <th className="py-2 pr-3 font-medium">{t.subjects}</th>
                <th className="py-2 pr-3 font-medium">{t.maximum}</th>
                <th className="py-2 font-medium">{t.passScore}</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id} className="border-t border-border">
                  <td className="py-2 pr-3">{text(subject.name)}</td>
                  <td className="py-2 pr-3">{subject.maximumScore ?? t.unpublished}</td>
                  <td className="py-2">{subject.examPassScore ?? t.unpublished}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {sessions.length ? (
        <section>
          <h2 className="font-heading text-2xl font-semibold">{t.sessions}</h2>
          <div className="mt-3 grid gap-3">
            {sessions.map((session) => (
              <article key={session.id} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
                <p className="font-semibold">{session.startsOn} – {session.endsOn}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t.registration}: {session.registrationOpensOn && session.registrationClosesOn ? `${session.registrationOpensOn} – ${session.registrationClosesOn}` : t.notStarted}
                </p>
                {session.note ? <p className="mt-2 text-sm leading-6">{text(session.note)}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}
      <p className="text-sm leading-6 text-muted-foreground">{t.otherExamsBody}</p>
    </Shell>
  );
}
