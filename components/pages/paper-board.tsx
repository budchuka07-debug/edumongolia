"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PAPER_ORDERS_KEY,
  papers,
  type Paper,
  type PaperKind,
  type PaperLevel,
  type PaperOrder,
} from "@/lib/content/papers";
import { usePersistedState } from "@/lib/use-persisted-state";
import { useI18n } from "@/components/language-provider";
import { useHub } from "@/components/directory/use-hub";
import { EmptyState } from "@/components/empty-state";
import { publicPapers } from "@/lib/content/public";
import { PROJECT_PRICE_MNT } from "@/lib/payments/pricing";
import { isPublicStatus, paperStatus } from "@/lib/content/publication";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const kinds: PaperKind[] = ["diploma", "course", "assignment", "project"];
const levels: PaperLevel[] = ["college", "bachelor", "master"];
const field = "mt-1 h-10 w-full rounded-lg border border-input bg-card px-3 text-sm";

function money(value: number) {
  return `${new Intl.NumberFormat("mn-MN").format(value)}₮`;
}

export function PaperCard({ paper, projectPrice = PROJECT_PRICE_MNT }: { paper: Paper; projectPrice?: number }) {
  const { locale } = useI18n();
  const hub = useHub();
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-4">
      <div className="flex flex-wrap gap-2">
        <Badge>{hub.paper.kinds[paper.kind]}</Badge>
        <Badge variant="secondary">{hub.paper.levels[paper.level]}</Badge>
        <Badge variant="outline">{paper.format}</Badge>
      </div>
      <h3 className="mt-3 font-heading text-xl font-semibold">{paper.title[locale]}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{paper.field[locale]}</p>
      <p className="mt-3 flex-1 text-sm leading-6">{paper.summary[locale]}</p>
      <p className="mt-3 text-sm">
        {paper.pages} {hub.paper.pages.toLowerCase()} · {hub.paper.from} {money(paper.from)}
      </p>
      {paper.kind === "project" ? (
        <p className="mt-2 text-sm font-semibold">{money(projectPrice)} · {locale === "en" ? "to continue reading" : "уншихыг үргэлжлүүлэх"}</p>
      ) : null}
      <div className="mt-4 flex gap-4">
        {paper.kind === "project" ? (
          <Link href={`/papers/${paper.id}`} className="text-sm font-semibold text-primary">
            {locale === "en" ? "Read the first 40%" : "Эхний 40%-ийг унших"}
          </Link>
        ) : null}
        <Link
          href={`/papers/order?kind=${paper.kind}&sample=${paper.id}`}
          className="text-sm font-semibold text-primary"
        >
          {hub.sections.orderPaper}
        </Link>
      </div>
    </article>
  );
}

export function PaperList({ projectPrice = PROJECT_PRICE_MNT }: { projectPrice?: number }) {
  const { locale } = useI18n();
  const hub = useHub();
  const params = useSearchParams();
  const kind = params.get("kind");
  const active = kinds.includes(kind as PaperKind) ? (kind as PaperKind) : "all";
  const projects = papers.filter((paper) => paper.kind === "project");
  const published = publicPapers().filter((paper) => paper.kind !== "project");
  const pool = [...projects, ...published];
  const list = active === "all" ? pool : pool.filter((paper) => paper.kind === active);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{hub.pages.papers.title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{hub.pages.papers.lead}</p>
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        <Link
          href="/papers"
          className={cn(
            "shrink-0 rounded-full border px-3 py-1.5 text-sm",
            active === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card",
          )}
        >
          {hub.all}
        </Link>
        {kinds.map((item) => (
          <Link
            key={item}
            href={`/papers?kind=${item}`}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-sm",
              active === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card",
            )}
          >
            {hub.paper.kinds[item]}
          </Link>
        ))}
      </div>
      {list.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title={locale === "en" ? "There is no verified information to show yet." : "Одоогоор баталгаажсан мэдээлэл байхгүй байна."}
            lead={locale === "en" ? "You can still send an order. A price is quoted after the topic is checked." : "Захиалга илгээж болно. Үнийг сэдвийг шалгасны дараа хэлнэ."}
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {list.map((paper) => (
            <PaperCard key={paper.id} paper={paper} projectPrice={projectPrice} />
          ))}
        </div>
      )}
      <Link href="/papers/order" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
        {hub.sections.orderPaper}
      </Link>
    </div>
  );
}

export function PaperOrderForm() {
  const hub = useHub();
  const router = useRouter();
  const params = useSearchParams();
  const { locale } = useI18n();
  const [, setOrders] = usePersistedState<PaperOrder[]>(PAPER_ORDERS_KEY, []);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const requested = params.get("kind");
  const sampleId = params.get("sample") ?? "";
  const sample = papers.find((paper) => paper.id === sampleId && isPublicStatus(paperStatus()));
  const kind = kinds.includes(requested as PaperKind) ? (requested as PaperKind) : sample?.kind ?? "diploma";

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const topic = String(data.get("topic") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (!topic || !name) {
      setError(hub.form.required);
      return;
    }
    if (phone.length < 8) {
      setError(hub.paper.phoneRequired);
      return;
    }
    const order: PaperOrder = {
      id: `paper-${Date.now()}`,
      kind: String(data.get("kind") ?? kind) as PaperKind,
      topic,
      field: String(data.get("field") ?? "").trim(),
      level: String(data.get("level") ?? "bachelor") as PaperLevel,
      pages: String(data.get("pages") ?? "").trim(),
      deadline: String(data.get("deadline") ?? ""),
      name,
      phone,
      note: String(data.get("note") ?? "").trim(),
      sampleId,
    };
    setOrders((current) => [order, ...current]);
    setDone(true);
    setError("");
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
      <Link href="/papers" className="text-sm font-semibold text-primary">
        {hub.back}
      </Link>
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">{hub.pages.order.title}</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{hub.pages.order.lead}</p>
      {sample ? (
        <p className="mt-3 rounded-xl border border-border bg-card px-3 py-2 text-sm">
          {sample.title[locale]}
        </p>
      ) : null}
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium">
          {hub.category}
          <select className={field} name="kind" defaultValue={kind}>
            {kinds.map((item) => (
              <option key={item} value={item}>
                {hub.paper.kinds[item]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          {hub.paper.topic}
          <input className={field} name="topic" defaultValue={sample ? sample.title[locale] : ""} />
        </label>
        <label className="block text-sm font-medium">
          {hub.form.aim}
          <input className={field} name="field" defaultValue={sample ? sample.field[locale] : ""} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium">
            {hub.education}
            <select className={field} name="level" defaultValue={sample?.level ?? "bachelor"}>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {hub.paper.levels[level]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            {hub.paper.pages}
            <input className={field} name="pages" inputMode="numeric" defaultValue={sample ? String(sample.pages) : ""} />
          </label>
        </div>
        <label className="block text-sm font-medium">
          {hub.paper.deadline}
          <input className={field} name="deadline" type="date" />
        </label>
        <label className="block text-sm font-medium">
          {hub.form.name}
          <input className={field} name="name" autoComplete="name" />
        </label>
        <label className="block text-sm font-medium">
          {hub.paper.phone}
          <input className={field} name="phone" inputMode="tel" autoComplete="tel" placeholder="99112233" />
        </label>
        <label className="block text-sm font-medium">
          {hub.paper.note}
          <textarea className="mt-1 min-h-24 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" name="note" />
        </label>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {done ? <p className="text-sm text-pine">{hub.saved}</p> : null}
        <button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
          {hub.paper.order}
        </button>
      </form>
      {done ? (
        <button type="button" className="mt-4 text-sm font-semibold text-primary" onClick={() => router.push("/admin")}>
          {hub.form.openAdmin}
        </button>
      ) : null}
    </div>
  );
}
