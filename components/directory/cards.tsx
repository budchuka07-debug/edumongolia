"use client";

import Link from "next/link";
import type { Center, Offer, Teacher } from "@/lib/content/directory";
import { useI18n } from "@/components/language-provider";
import { useHub } from "@/components/directory/use-hub";
import { Badge } from "@/components/ui/badge";

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  const { locale } = useI18n();
  const hub = useHub();
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{hub.levels[teacher.education]}</Badge>
        {teacher.foreign ? <Badge>{hub.foreign}</Badge> : null}
        <Badge variant="outline">{hub.outside}</Badge>
      </div>
      <h3 className="mt-3 font-heading text-xl font-semibold">{teacher.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{teacher.school[locale]}</p>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6">{teacher.bio[locale]}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {teacher.categories.map((category) => (
          <li key={category}>
            <Badge variant="outline">{hub.categories[category]}</Badge>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm">
        <span className="text-muted-foreground">{teacher.district[locale]}</span>
        <span className="mx-2 text-border">/</span>
        {teacher.years} {hub.years}
      </p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm font-medium">{teacher.rate[locale]}</p>
        <Link href={`/tutors/${teacher.id}`} className="text-sm font-semibold text-primary">
          {hub.sections.teacherInfo}
        </Link>
      </div>
    </article>
  );
}

export function CenterCard({ center }: { center: Center }) {
  const { locale } = useI18n();
  const hub = useHub();
  return (
    <article className="rounded-2xl border border-border bg-card p-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant={center.licensed ? "default" : "outline"}>
          {center.licensed ? hub.licensed : hub.unlicensed}
        </Badge>
        {center.foreignTeachers ? <Badge variant="secondary">{hub.foreign}</Badge> : null}
      </div>
      <h3 className="mt-3 font-heading text-xl font-semibold">{center.name[locale]}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{center.district[locale]}</p>
      <p className="mt-3 text-sm leading-6">{center.summary[locale]}</p>
      <p className="mt-3 text-xs text-muted-foreground">{center.license[locale]}</p>
    </article>
  );
}

export function OfferCard({ offer }: { offer: Offer }) {
  const { locale } = useI18n();
  return (
    <article className="rounded-2xl border border-border bg-card p-4">
      <p className="text-sm font-semibold text-primary">{offer.meta[locale]}</p>
      <h3 className="mt-2 font-heading text-xl font-semibold">{offer.title[locale]}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{offer.org[locale]}</p>
      <p className="mt-3 text-sm leading-6">{offer.summary[locale]}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{offer.detail[locale]}</p>
      {offer.href && offer.linkLabel ? (
        <Link href={offer.href} className="mt-3 inline-block text-sm font-semibold text-primary">
          {offer.linkLabel[locale]}
        </Link>
      ) : null}
    </article>
  );
}
