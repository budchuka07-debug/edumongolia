"use client";

import Link from "next/link";
import { useI18n } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const booking =
  "https://bookingmongolia.com/tours/english-immersion-tour.html";
const dates =
  "https://bookingmongolia.com/tours-dates.html#tour-english-immersion-7d";

const copy = {
  mn: {
    eyebrow: "Оюутан, суралцагч",
    title: "Англи хэлний вакуум аялал",
    lead: "7 хоног. Хичээл, зам, хоол, оройн тойрог англи хэл дээр. Монгол бол зөвхөн байгаль.",
    book: "Booking Mongolia дээр захиалах",
    dates: "Огноо харах",
    back: "Аялалтай сургалт",
    places: "Газар",
    stay: "Байр",
    join: "Хамт суух",
    placeValue: "Хөвсгөл нуур, Тэрэлж, Цонжин болдог",
    stayValue: "Үзэсгэлэнт бааз, эсвэл жижиг бүлэгт малчин айл",
    joinValue: "Англи хэлний хичээл ба морь унах хичээл",
    daysTitle: "7 хоног",
    days: [
      ["1-р өдөр", "Улаанбаатарт ирнэ. Оройн тойрог англи хэлээр эхэлнэ."],
      ["2-р өдөр", "Цонжин болдог, дараа нь Тэрэлж. Анхны морьтой танилцана."],
      ["3-р өдөр", "Тэрэлж. Өглөө англи хичээл, дараа нь морь унах хичээл. Хоёуланд сууж болно."],
      ["4-р өдөр", "Хөвсгөл рүү явна. Замд бүлэг англиар ярина."],
      ["5-р өдөр", "Нуурын эрэг. Англи хичээл, дараа нь морь эсвэл улирлын завь."],
      ["6-р өдөр", "Дахин морь. Нэг газрынхаа тухай англиар богино ярина."],
      ["7-р өдөр", "Улаанбаатар луу буцна. Богино яриагаар хаана."],
    ],
    smallTitle: "Жижиг бүлэг",
    small: "Хэдхэн хүн бол томоохон баазын оронд хөдөөний малчин айлын буудалд байрлана. Англи хичээл, морь унах хичээл хэвээрээ. Айлын танилцуулгыг багш англиар өгнө.",
    note: "Огноо, үнэ Booking Mongolia дээр. Энд төлбөр авахгүй.",
  },
  en: {
    eyebrow: "Students and learners",
    title: "English immersion in the wild",
    lead: "Seven days. Class, road, meals, and the evening circle stay in English. Mongolia is the landscape, not the lesson.",
    book: "Book on Booking Mongolia",
    dates: "See dates",
    back: "Study with travel",
    places: "Places",
    stay: "Stay",
    join: "Join both",
    placeValue: "Khuvsgul Lake, Terelj, Tsonjin Boldog",
    stayValue: "Scenic camps, or a herder family if the group is small",
    joinValue: "English class and horse-riding lessons",
    daysTitle: "Seven days",
    days: [
      ["Day 1", "Arrive in Ulaanbaatar. The evening circle starts in English."],
      ["Day 2", "Tsonjin Boldog, then Terelj. A first look at the horses."],
      ["Day 3", "Terelj. Morning English class, then a horse-riding lesson. You may join both."],
      ["Day 4", "Travel toward Khuvsgul. The group keeps speaking English."],
      ["Day 5", "The lake shore. English class, then a ride or a seasonal boat."],
      ["Day 6", "A second ride, and a short talk in English about one place."],
      ["Day 7", "Return to Ulaanbaatar. A short spoken review closes the week."],
    ],
    smallTitle: "Small group",
    small: "A few people can stay in a herder family camp in the countryside instead of the larger camps. The English class and the riding lessons stay. The teacher explains the family visit in English.",
    note: "Dates and price are on Booking Mongolia. This page does not take payment.",
  },
} as const;

export function EnglishImmersion() {
  const { locale } = useI18n();
  const t = copy[locale];

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link href="/programs/travel" className="text-sm font-semibold text-primary">
        {t.back}
      </Link>
      <p className="mt-4 text-sm font-medium text-primary">{t.eyebrow}</p>
      <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight">{t.title}</h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">{t.lead}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>100% English</Badge>
        <Badge variant="secondary">{t.placeValue}</Badge>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <a className={cn(buttonVariants({ size: "lg" }))} href={booking} target="_blank" rel="noreferrer">
          {t.book}
        </a>
        <a
          className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          href={dates}
          target="_blank"
          rel="noreferrer"
        >
          {t.dates}
        </a>
      </div>
      <dl className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
        {[
          [t.places, t.placeValue],
          [t.stay, t.stayValue],
          [t.join, t.joinValue],
        ].map(([label, value]) => (
          <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr]">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
      <h2 className="mt-10 font-heading text-2xl font-semibold">{t.daysTitle}</h2>
      <ol className="mt-4 space-y-3">
        {t.days.map(([day, body]) => (
          <li key={day} className="rounded-2xl border border-border bg-card px-4 py-3">
            <p className="text-sm font-semibold text-primary">{day}</p>
            <p className="mt-1 text-sm leading-6">{body}</p>
          </li>
        ))}
      </ol>
      <h2 className="mt-10 font-heading text-2xl font-semibold">{t.smallTitle}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{t.small}</p>
      <p className="mt-6 text-sm text-muted-foreground">{t.note}</p>
    </article>
  );
}
