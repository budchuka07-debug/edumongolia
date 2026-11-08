"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useI18n } from "@/components/language-provider";
import { marketCopy, type MarketCopy } from "@/lib/marketplace/copy";
import { pick } from "@/lib/marketplace/text";
import type { DegreeLevel, InstructionLanguage, Localized, ScholarshipCategory, VerificationStatus } from "@/lib/marketplace/types";

export function useMarket() {
  const { locale } = useI18n();
  const lang = locale === "en" ? "en" : "mn";
  const t = marketCopy[lang];
  return {
    lang,
    t,
    text: (value: Localized) => pick(value, lang),
  };
}

export function Shell({
  kicker,
  title,
  lead,
  children,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  const { t } = useMarket();
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-10">
      <p className="rounded-2xl bg-accent px-4 py-3 text-sm leading-6 text-accent-foreground">{t.demo}</p>
      <header>
        {kicker ? <p className="text-sm font-semibold tracking-wide text-primary uppercase">{kicker}</p> : null}
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        {lead ? <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">{lead}</p> : null}
      </header>
      {children}
    </div>
  );
}

export function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-border py-3 sm:grid-cols-[13rem_1fr] sm:gap-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm leading-6">{children}</dd>
    </div>
  );
}

export function StatusPill({ status }: { status: VerificationStatus }) {
  const { t } = useMarket();
  const label = {
    verified: t.verified,
    pending: t.pending,
    expired: t.expired,
    needs_update: t.needsUpdate,
  }[status];
  return (
    <span className="inline-flex rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
      {label}
    </span>
  );
}

export function MatchPill({ status }: { status: "eligible" | "potential" | "ineligible" }) {
  const { t } = useMarket();
  const label = { eligible: t.eligible, potential: t.potential, ineligible: t.ineligible }[status];
  const tone = {
    eligible: "bg-pine/15 text-pine",
    potential: "bg-accent text-accent-foreground",
    ineligible: "bg-clay/15 text-clay",
  }[status];
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${tone}`}>{label}</span>;
}

export function money(value: number | null, empty: string, unit: string) {
  if (value == null) return empty;
  return `${value.toLocaleString("en-US")} ${unit}`;
}

export function degreeLabel(degree: DegreeLevel | "any", t: MarketCopy) {
  if (degree === "bachelor") return t.bachelor;
  if (degree === "master") return t.master;
  if (degree === "phd") return t.phd;
  if (degree === "non_degree") return t.nonDegree;
  return t.levelAny;
}

export function languageLabel(language: InstructionLanguage | "any", t: MarketCopy) {
  if (language === "zh") return t.langZh;
  if (language === "en") return t.langEn;
  if (language === "both") return t.langBoth;
  return t.anyLanguage;
}

export function categoryLabel(category: ScholarshipCategory, t: MarketCopy) {
  const map: Record<ScholarshipCategory, string> = {
    csc: t.catCsc,
    university: t.catUniversity,
    provincial: t.catProvincial,
    municipal: t.catMunicipal,
    silk_road: t.catSilk,
    belt_road: t.catBelt,
    confucius: t.catConfucius,
    full: t.catFull,
    partial: t.catPartial,
    tuition_waiver: t.catWaiver,
  };
  return map[category];
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-primary underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}
