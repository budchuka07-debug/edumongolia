"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { centers, offers, teachers } from "@/lib/content/directory";
import { papers } from "@/lib/content/papers";
import { PaperCard } from "@/components/pages/paper-board";
import { useHub } from "@/components/directory/use-hub";
import { CenterCard, OfferCard, TeacherCard } from "@/components/directory/cards";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

function Section({
  id,
  title,
  href,
  seeAll,
  children,
}: {
  id: string;
  title: string;
  href: string;
  seeAll: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">{title}</h2>
        <Link href={href} className="shrink-0 text-sm font-semibold text-primary">
          {seeAll}
        </Link>
      </div>
      {children}
    </section>
  );
}

function Row({ children }: { children: ReactNode }) {
  return (
    <div className="flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
      {children}
    </div>
  );
}

export function HubHome() {
  const hub = useHub();
  const homeTutors = teachers.filter((teacher) => teacher.delivery.includes("home"));
  const online = teachers.filter((teacher) => teacher.delivery.includes("online"));
  const individual = teachers.filter((teacher) => teacher.grouping.includes("individual"));
  const semi = teachers.filter((teacher) => teacher.grouping.includes("semi"));
  const licensed = centers.filter((center) => center.licensed);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-8 sm:py-12">
      <section className="steppe-grid rounded-3xl border border-border bg-card px-5 py-8 sm:px-8">
        <p className="text-sm font-medium text-primary">{hub.outside}</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">{hub.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{hub.lead}</p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{hub.sample}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/tutors" className={cn(buttonVariants({ size: "lg" }))}>
            {hub.find}
          </Link>
          <Link href="/register/student" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
            {hub.registerStudent}
          </Link>
          <Link href="/register/teacher" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
            {hub.registerTeacher}
          </Link>
        </div>
      </section>

      <Section id="classroom" title={hub.sections.classroom} href="/centers" seeAll={hub.seeAll}>
        <Row>
          {centers
            .filter((center) => center.delivery.includes("classroom"))
            .map((center) => (
              <div key={center.id} className="w-[20rem] shrink-0 snap-start">
                <CenterCard center={center} />
              </div>
            ))}
        </Row>
      </Section>

      <Section id="home" title={hub.sections.home} href="/tutors" seeAll={hub.seeAll}>
        <p className="mb-4 max-w-2xl text-sm leading-6 text-muted-foreground">{hub.pages.tutors.lead}</p>
        <Row>
          {homeTutors.map((teacher) => (
            <div key={teacher.id} className="w-[20rem] shrink-0 snap-start">
              <TeacherCard teacher={teacher} />
            </div>
          ))}
        </Row>
      </Section>

      <Section id="online" title={hub.sections.online} href="/online" seeAll={hub.seeAll}>
        <Row>
          {online.map((teacher) => (
            <div key={teacher.id} className="w-[20rem] shrink-0 snap-start">
              <TeacherCard teacher={teacher} />
            </div>
          ))}
        </Row>
      </Section>

      <Section id="individual" title={hub.sections.individual} href="/tutors?group=individual" seeAll={hub.seeAll}>
        <Row>
          {individual.slice(0, 4).map((teacher) => (
            <div key={teacher.id} className="w-[20rem] shrink-0 snap-start">
              <TeacherCard teacher={teacher} />
            </div>
          ))}
        </Row>
      </Section>

      <Section id="semi" title={hub.sections.semi} href="/tutors?group=semi" seeAll={hub.seeAll}>
        <Row>
          {semi.slice(0, 4).map((teacher) => (
            <div key={teacher.id} className="w-[20rem] shrink-0 snap-start">
              <TeacherCard teacher={teacher} />
            </div>
          ))}
        </Row>
      </Section>

      <Section id="centers" title={hub.sections.centers} href="/centers" seeAll={hub.seeAll}>
        <div className="grid gap-3 md:grid-cols-2">
          {centers.map((center) => (
            <CenterCard key={center.id} center={center} />
          ))}
        </div>
      </Section>

      <Section id="licensed" title={hub.sections.licensed} href="/centers?licensed=1" seeAll={hub.seeAll}>
        <div className="grid gap-3 md:grid-cols-2">
          {licensed.map((center) => (
            <CenterCard key={center.id} center={center} />
          ))}
        </div>
      </Section>

      <Section id="papers" title={hub.sections.papers} href="/papers" seeAll={hub.seeAll}>
        <p className="mb-4 max-w-2xl text-sm leading-6 text-muted-foreground">{hub.pages.papers.lead}</p>
        <Row>
          {papers.map((paper) => (
            <div key={paper.id} className="w-[20rem] shrink-0 snap-start">
              <PaperCard paper={paper} />
            </div>
          ))}
        </Row>
      </Section>

      <Section id="scholarships" title={hub.sections.scholarships} href="/scholarships" seeAll={hub.seeAll}>
        <div className="grid gap-3 md:grid-cols-2">
          {offers
            .filter((offer) => offer.kind === "scholarship")
            .map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
        </div>
      </Section>

      <Section id="discounts" title={hub.sections.discounts} href="/discounts" seeAll={hub.seeAll}>
        <div className="grid gap-3 md:grid-cols-3">
          {offers
            .filter((offer) => offer.kind === "discount")
            .map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
        </div>
      </Section>

      <Section id="foreign" title={hub.sections.foreignTeachers} href="/programs/foreign" seeAll={hub.seeAll}>
        <div className="grid gap-3 md:grid-cols-2">
          {offers
            .filter((offer) => offer.kind === "foreign-teacher")
            .map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
        </div>
      </Section>

      <Section id="international" title={hub.sections.international} href="/programs/international" seeAll={hub.seeAll}>
        <div className="grid gap-3 md:grid-cols-2">
          {offers
            .filter((offer) => offer.kind === "international")
            .map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
        </div>
      </Section>

      <Section id="travel" title={hub.sections.travel} href="/programs/travel" seeAll={hub.seeAll}>
        <div className="grid gap-3 md:grid-cols-2">
          {offers
            .filter((offer) => offer.kind === "travel")
            .map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
        </div>
      </Section>

      <Section id="foreign-uni" title={hub.sections.foreignUni} href="/scholarships?scope=foreign" seeAll={hub.seeAll}>
        <div className="grid gap-3 md:grid-cols-2">
          {offers
            .filter((offer) => offer.kind === "foreign-uni")
            .map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
        </div>
      </Section>
    </div>
  );
}
