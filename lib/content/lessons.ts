import path from "node:path";
import { splitBilingual, type Bilingual } from "@/lib/payments/preview";

export type Lesson = {
  slug: string;
  title: Bilingual;
  parts: Bilingual[];
};

const lessons: Lesson[] = [
  {
    slug: "cambridge-balancing-redox",
    title: {
      mn: "Cambridge 10: тэгшитгэл тэнцүүлэх ба исэлдэлт-ангижрал",
      en: "Cambridge grade 10: balancing and redox",
    },
    parts: [
      {
        mn: "Энэ хичээл Cambridge IGCSE хими, 10-р анги. Эхлээд атом тоолох, коэффициент тавих, хамгийн бага бүхэл харьцаагаар шалгах аргыг уншина.",
        en: "This is a Cambridge IGCSE chemistry lesson for grade 10. It starts with counting atoms, adding coefficients, and checking the smallest whole-number ratio.",
      },
      {
        mn: "Индекс өөрчлөхгүй. H₂O бол ус. H₂O₂ бол устөрөгчийн хэт исэл. Индекс өөрчлөгдвөл бодис өөрөө өөрчлөгдөнө.",
        en: "Never change a subscript. H₂O is water. H₂O₂ is hydrogen peroxide. Changing a subscript changes the substance.",
      },
      {
        mn: "Исэлдэлт-ангижралд исэлдэлт, ангижрал зэрэг явагдана. Энэ түвшинд хүчилтөрөгч болон электрон шилжихийг ашиглана.",
        en: "In a redox reaction, oxidation and reduction happen together. At this level, use oxygen transfer and electron transfer.",
      },
      {
        mn: "Исэлдэхэд хүчилтөрөгч авна, электрон алдана, исэлдэлтийн зэрэг өснө. Ангижрахад хүчилтөрөгч алдана, электрон авна, исэлдэлтийн зэрэг буурна.",
        en: "Oxidation gains oxygen, loses electrons, and the oxidation number increases. Reduction loses oxygen, gains electrons, and the oxidation number decreases.",
      },
      {
        mn: "Жишээ нь магни хүчилтөрөгчтэй урвалд орно. Магни 0-оос +2 болж исэлдэнэ. Хүчилтөрөгч 0-оос −2 болж ангижирна.",
        en: "Magnesium reacts with oxygen. Magnesium goes from 0 to +2 and is oxidised. Oxygen goes from 0 to −2 and is reduced.",
      },
      {
        mn: "Үргэлжлэлд 10 тэгшитгэлийг чирж тавьж тэнцүүлнэ. Дараа нь исэлдэлт, ангижралыг шалгана. Хариу нь төлбөр баталгаажсаны дараа нээгдэнэ.",
        en: "The continuation is ten drag-and-drop equations, then a redox check. The answers open after the payment is confirmed.",
      },
    ],
  },
  {
    slug: "cambridge-balance-equation",
    title: {
      mn: "Cambridge 10: тэгшитгэл тэнцүүлэх дасгал",
      en: "Cambridge grade 10: balance the equation",
    },
    parts: [
      {
        mn: "Энэ дасгал Cambridge IGCSE хими, 10-р анги. Коэффициентийг нүдэнд чирж тавина. Хамгийн бага бүхэл тоог ашиглана.",
        en: "This exercise is Cambridge IGCSE chemistry for grade 10. Drag a number into each coefficient box. Use the smallest whole numbers.",
      },
      {
        mn: "Коэффициент бөөмийн тоог өөрчилнө. Химийн томьёоны индексийг хэзээ ч өөрчлөхгүй.",
        en: "Coefficients change the number of particles. Never change the subscripts in a chemical formula.",
      },
      {
        mn: "Гурван даалгавар бий: эхлэл, үндсэн, хүнд. Шалгах, дараагийнх, дахин эхлүүлэх товчтой.",
        en: "There are three tasks: starter, core, and challenge. Check, next, and reset are on the page.",
      },
      {
        mn: "Зөв коэффициент, оноо нь төлбөр баталгаажсаны дараа нээгдэнэ.",
        en: "The correct coefficients and the score open after the payment is confirmed.",
      },
    ],
  },
];

export function lessonPreview(slug: string) {
  const lesson = lessons.find((item) => item.slug === slug);
  if (!lesson) return null;
  const parts = splitBilingual(lesson.parts);
  return { slug, title: lesson.title, preview: parts.preview, rest: parts.rest };
}

export function lessonCatalog() {
  return lessons.map((lesson) => ({ slug: lesson.slug, title: lesson.title }));
}

export function lessonFile(slug: string) {
  if (!lessons.some((item) => item.slug === slug)) return null;
  return path.join(process.cwd(), "content", "lessons", `${slug}.html`);
}
