"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { courses } from "@/lib/content/courses";
import { publicOffers } from "@/lib/content/public";
import { useI18n } from "@/components/language-provider";
import { useHub } from "@/components/directory/use-hub";
import { EmptyState } from "@/components/empty-state";
import { OfferCard } from "@/components/directory/cards";
import { buttonVariants } from "@/components/ui/button";
import { paths } from "@/lib/marketplace/paths";
import { cn } from "cn";

const copy = {
  mn: {
    hero: "Сургалт, багш, тэтгэлэг, гадаадад суралцах боломжийг нэг дороос.",
    lead: "Бодит, шалгагдсан зарлал энд нийтлэгдэнэ. Баталгаажаагүй мөрийг харуулахгүй.",
    findTeacher: "Багш хайх",
    findStudy: "Сургалт хайх",
    findGrant: "Тэтгэлэг хайх",
    findChina: "Хятадын их сургууль хайх",
    services: "Үйлчилгээ",
    tutoring: "Багшийн үйлчилгээ",
    grants: "Тэтгэлэг",
    china: "Гадаадад суралцах",
    chinaLead: "Их сургууль, хөтөлбөр, тэтгэлэг, шалгалтын нөхцөл албан эх сурвалжаар баталгаажсаны дараа энд гарна.",
    discovery: "Их сургууль, хөтөлбөр",
    eduServices: "Боловсролын үйлчилгээ",
    travel: "Аялалтай сургалт",
    articles: "Сургалтын материал",
    partner: "Хамтрагч болох",
    partnerLead: "Багш, сурагч бүртгүүлнэ. Агент болон их сургуулийн эрх баталгаажсаны дараа нээгдэнэ.",
    empty: "Одоогоор баталгаажсан мэдээлэл байхгүй байна.",
    emptyLead: "Шинэ боломж нэмэгдэхэд энэ хэсэгт нийтлэгдэнэ.",
    consult: "Зөвлөгөө авах",
  },
  en: {
    hero: "Tutoring, teachers, scholarships, and study abroad in one place.",
    lead: "A listing appears here after it is checked. Unverified rows stay off the public site.",
    findTeacher: "Find a teacher",
    findStudy: "Find a course",
    findGrant: "Find a scholarship",
    findChina: "Find a Chinese university",
    services: "Services",
    tutoring: "Tutoring",
    grants: "Scholarships",
    china: "Study abroad",
    chinaLead: "Universities, programs, scholarships, and exam rules appear after an official source is checked.",
    discovery: "Universities and programs",
    eduServices: "Education services",
    travel: "Educational travel",
    articles: "Learning materials",
    partner: "Work with EduMongolia",
    partnerLead: "Teachers and students can register. Agent and university access opens after it is verified.",
    empty: "There is no verified information to show yet.",
    emptyLead: "A new opportunity will be published here after it is checked.",
    consult: "Ask for advice",
  },
} as const;

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="font-heading text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function HubHome() {
  const { locale } = useI18n();
  const hub = useHub();
  const t = copy[locale];
  const travel = publicOffers(["travel"]);
  const featuredCourses = courses.slice(0, 3);

  const categories = [
    [hub.sections.classroom, "/centers"],
    [hub.sections.home, "/tutors"],
    [hub.sections.online, "/online"],
    [hub.sections.individual, "/tutors?group=individual"],
    [hub.sections.centers, "/centers"],
    [hub.sections.foreignTeachers, "/programs/foreign"],
  ] as const;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-8 sm:py-10">
      <section className="steppe-grid rounded-3xl border border-border bg-card px-5 py-8 sm:px-8">
        <p className="text-sm font-medium text-primary">{hub.outside}</p>
        <h1 className="mt-3 max-w-3xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl">{t.hero}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{t.lead}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/tutors" className={cn(buttonVariants({ size: "lg" }))}>{t.findTeacher}</Link>
          <Link href="/centers" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>{t.findStudy}</Link>
          <Link href="/scholarships" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>{t.findGrant}</Link>
          <Link href={paths.universities} className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>{t.findChina}</Link>
        </div>
      </section>

      <Block id="services" title={t.services}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(([label, href]) => (
            <Link key={href + label} href={href} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
              <h3 className="font-heading text-xl font-semibold">{label}</h3>
            </Link>
          ))}
        </div>
      </Block>

      <Block id="tutoring" title={t.tutoring}>
        <EmptyState title={t.empty} lead={t.emptyLead} />
        <Link href="/register/teacher" className="mt-4 inline-block text-sm font-semibold text-primary">
          {hub.registerTeacher}
        </Link>
      </Block>

      <Block id="scholarships" title={t.grants}>
        <EmptyState title={t.empty} lead={t.emptyLead} />
        <Link href={paths.scholarships} className="mt-4 inline-block text-sm font-semibold text-primary">
          {t.findGrant}
        </Link>
      </Block>

      <Block id="china" title={t.china}>
        <p className="mb-4 max-w-2xl text-sm leading-6 text-muted-foreground">{t.chinaLead}</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [paths.china, locale === "en" ? "Study in China" : "Хятад дахь сургалт"],
            [paths.universities, locale === "en" ? "Universities" : "Их сургуулиуд"],
            [paths.programs, locale === "en" ? "Programs" : "Хөтөлбөр"],
            [paths.scholarships, locale === "en" ? "Scholarships" : "Тэтгэлэг"],
            [paths.eligibility, locale === "en" ? "Eligibility" : "Элсэлтийн шалгуур"],
            [paths.csca, "CSCA"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
              <h3 className="font-heading text-lg font-semibold">{label}</h3>
            </Link>
          ))}
        </div>
      </Block>

      <Block id="discovery" title={t.discovery}>
        <EmptyState title={t.empty} lead={t.emptyLead} />
      </Block>

      <Block id="papers" title={t.eduServices}>
        <EmptyState title={t.empty} lead={t.emptyLead} />
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/papers/order" className="text-primary">{hub.sections.orderPaper}</Link>
          <Link href="/discounts" className="text-primary">{hub.sections.discounts}</Link>
          <Link href="/programs/international" className="text-primary">{hub.sections.international}</Link>
        </div>
      </Block>

      <Block id="travel" title={t.travel}>
        {travel.length === 0 ? (
          <EmptyState title={t.empty} lead={t.emptyLead} />
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {travel.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </Block>

      <Block id="articles" title={t.articles}>
        <div className="grid gap-3 md:grid-cols-3">
          {featuredCourses.map((course) => (
            <Link key={course.slug} href={`/courses/${course.slug}`} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
              <h3 className="font-heading text-lg font-semibold">{course.title[locale]}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{course.summary[locale]}</p>
            </Link>
          ))}
        </div>
        <Link href="/courses" className="mt-4 inline-block text-sm font-semibold text-primary">{hub.seeAll}</Link>
      </Block>

      <section className="rounded-3xl border border-border bg-card px-5 py-8 sm:px-8">
        <h2 className="font-heading text-2xl font-semibold">{t.partner}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{t.partnerLead}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/partners" className={cn(buttonVariants({ size: "lg" }))}>{t.partner}</Link>
          <Link href={paths.apply} className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>{t.consult}</Link>
        </div>
      </section>
    </div>
  );
}
