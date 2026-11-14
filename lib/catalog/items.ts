export type CatalogKind = "quiz" | "iq" | "story";
export type Difficulty = "easy" | "medium" | "hard";

export type CatalogText = { mn: string; en: string };

export type CatalogItem = {
  slug: string;
  kind: CatalogKind;
  title: CatalogText;
  summary: CatalogText;
  grade: number | null;
  subject: string;
  difficulty: Difficulty;
  language: "mn" | "en";
  paragraphs: CatalogText[];
  source: CatalogText;
};

/** Original short pieces. No copied book or exam paper. */
export const catalogItems: CatalogItem[] = [
  {
    slug: "place-value-check",
    kind: "quiz",
    title: { mn: "Оронгийн утга", en: "Place value" },
    summary: { mn: "8-р ангийн богино асуулт. Тооны оронг шалгана.", en: "A short grade 8 check on the value of a digit." },
    grade: 8,
    subject: "math",
    difficulty: "easy",
    language: "mn",
    source: { mn: "EduMongolia, өөрийн даалгавар", en: "EduMongolia original" },
    paragraphs: [
      { mn: "Тооны орон бүр өөр үнэ цэнэтэй. 4, 40, 400 нь нэг цифр боловч өөр утгатай.", en: "Each place has its own value. 4, 40, and 400 use the same digit and mean different amounts." },
      { mn: "Төлбөр баталгаажсаны дараа гурван асуулт нээгдэнэ. Хариуг сервер дээр хадгална.", en: "Three questions open after payment is verified. The answers stay on the server." },
    ],
  },
  {
    slug: "pattern-grids",
    kind: "iq",
    title: { mn: "Дарааллын тор", en: "Pattern grids" },
    summary: { mn: "Дүрсний дарааллыг үргэлжлүүлэх IQ даалгавар.", en: "An IQ task about continuing a visual pattern." },
    grade: null,
    subject: "logic",
    difficulty: "medium",
    language: "mn",
    source: { mn: "EduMongolia, өөрийн даалгавар", en: "EduMongolia original" },
    paragraphs: [
      { mn: "Энэ сорил дүрсийн тоо, чиг, давталтыг харьцуулна. Цаг 12 минут.", en: "This task compares count, direction, and repetition. The limit is 12 minutes." },
      { mn: "Зөв хариу, тайлбар төлбөр баталгаажиж, хугацаа дууссан эсвэл бөглөсний дараа гарна.", en: "Correct answers and explanations appear after verified payment and after the attempt ends." },
    ],
  },
  {
    slug: "steppe-morning",
    kind: "story",
    title: { mn: "Талын өглөө", en: "A steppe morning" },
    summary: { mn: "Богино уншлага. Зохиогч: EduMongolia.", en: "A short reading. Author: EduMongolia." },
    grade: 8,
    subject: "mongolian",
    difficulty: "easy",
    language: "mn",
    source: { mn: "EduMongolia, өөрийн зохиол", en: "EduMongolia original" },
    paragraphs: [
      { mn: "Нар мандахаас өмнө хонин сүрэг хөдлөв. Салхи өвсний үзүүрээр явж, алс дахь уулыг цэнхэр болгожээ.", en: "Before sunrise the flock began to move. Wind crossed the grass and turned the far mountain blue." },
      { mn: "Хүү хувингаа дүүргэж, ээждээ өгөв. Өглөөний цай буцлах үед тэд өчигдрийн ажлаа хоёулхнаа ярив. Энэ түүх EduMongolia-ийн өөрийн зохиол.", en: "The boy filled the bucket and gave it to his mother. As the tea boiled they talked through yesterday's work. This story is EduMongolia's own writing." },
    ],
  },
];

export function getCatalogItem(kind: CatalogKind, slug: string) {
  return catalogItems.find((item) => item.kind === kind && item.slug === slug);
}
