import type { Copy } from "@/lib/i18n/types";

export type PaperKind = "diploma" | "course" | "assignment" | "project";

export type PaperLevel = "college" | "bachelor" | "master";

export type Paper = {
  id: string;
  kind: PaperKind;
  title: Copy;
  field: Copy;
  pages: number;
  level: PaperLevel;
  format: string;
  summary: Copy;
  from: number;
};

export const papers: Paper[] = [
  {
    id: "finance-stability",
    kind: "diploma",
    title: {
      mn: "Санхүүгийн тогтвортой байдлын шинжилгээ",
      en: "A study of financial stability",
    },
    field: { mn: "Санхүү, нягтлан бодох бүртгэл", en: "Finance and accounting" },
    pages: 70,
    level: "bachelor",
    format: "DOCX",
    summary: {
      mn: "Бакалаврын дипломын бүтэц: оршил, онол, компанийн жишээ шинжилгээ, дүгнэлт, эх сурвалж.",
      en: "A bachelor diploma shape: introduction, theory, a company case, conclusion, sources.",
    },
    from: 350000,
  },
  {
    id: "meat-market",
    kind: "diploma",
    title: {
      mn: "Махны зах зээлийн судалгаа",
      en: "A meat-market study",
    },
    field: { mn: "Эдийн засаг", en: "Economics" },
    pages: 45,
    level: "bachelor",
    format: "DOCX",
    summary: {
      mn: "Дотоод зах зээл, үнэ, экспортын боломжийг хүснэгт, графиктай тайлбарлана.",
      en: "Home market, prices, and export room, with tables and charts.",
    },
    from: 280000,
  },
  {
    id: "govi-marketing",
    kind: "course",
    title: {
      mn: "Олон улсын зах зээлд гарах маркетингийн төлөвлөгөө",
      en: "A marketing plan for a foreign market",
    },
    field: { mn: "Маркетинг", en: "Marketing" },
    pages: 28,
    level: "bachelor",
    format: "DOCX",
    summary: {
      mn: "Курсын ажлын стандарт: зорилго, зах зээлийн шинжилгээ, стратеги, төсөв.",
      en: "A course-paper shape: aim, market reading, strategy, budget.",
    },
    from: 120000,
  },
  {
    id: "budget-control",
    kind: "course",
    title: {
      mn: "Байгууллагын төсөвлөлт ба зардлын хяналт",
      en: "Budgeting and cost control",
    },
    field: { mn: "Менежмент", en: "Management" },
    pages: 24,
    level: "college",
    format: "DOCX",
    summary: {
      mn: "Курсын ажил. Төсвийн төрөл, хазайлт, сарын хяналтын хүснэгт.",
      en: "A course paper on budget types, variance, and a monthly control sheet.",
    },
    from: 90000,
  },
  {
    id: "labor-contract",
    kind: "assignment",
    title: {
      mn: "Хөдөлмөрийн гэрээний задлан шинжилгээ",
      en: "A reading of an employment contract",
    },
    field: { mn: "Эрх зүй", en: "Law" },
    pages: 10,
    level: "bachelor",
    format: "DOCX",
    summary: {
      mn: "Бие даалт. Гэрээний заалтыг хуулийн зүйлтэй харьцуулж, 8–12 хуудсанд багтаана.",
      en: "An assignment. Contract clauses set next to the statute, in 8–12 pages.",
    },
    from: 45000,
  },
  {
    id: "attila",
    kind: "assignment",
    title: {
      mn: "Манлайллын жишээ тойм",
      en: "A short leadership case",
    },
    field: { mn: "Удирдлага", en: "Management" },
    pages: 8,
    level: "college",
    format: "DOCX",
    summary: {
      mn: "Бие даалт. Нэг түүхэн жишээг орчин үеийн багийн удирдлагатай харьцуулна.",
      en: "An assignment. One historical case set next to how a team is led now.",
    },
    from: 35000,
  },
  {
    id: "kindergarten",
    kind: "project",
    title: {
      mn: "Цэцэрлэг байгуулах төсөл",
      en: "A plan to open a kindergarten",
    },
    field: { mn: "Боловсрол, төсөл", en: "Education, project" },
    pages: 40,
    level: "bachelor",
    format: "DOCX",
    summary: {
      mn: "Төслийн баримт: зорилго, хэрэгцээ, төсөв, хугацаа, эрсдэл.",
      en: "A project file: aim, need, budget, calendar, and risk.",
    },
    from: 180000,
  },
  {
    id: "syllabus",
    kind: "project",
    title: {
      mn: "Хичээлийн жилийн хөтөлбөр",
      en: "A year syllabus",
    },
    field: { mn: "Багшлахуй", en: "Teaching" },
    pages: 16,
    level: "college",
    format: "DOCX",
    summary: {
      mn: "Нэг ангийн жил: сэдэв, цаг, үнэлгээ, эх сурвалж.",
      en: "One class year: topics, hours, assessment, and sources.",
    },
    from: 70000,
  },
];

export const PAPER_ORDERS_KEY = "edumongolia-paper-orders";

export type PaperOrder = {
  id: string;
  kind: PaperKind;
  topic: string;
  field: string;
  level: PaperLevel;
  pages: string;
  deadline: string;
  name: string;
  phone: string;
  note: string;
  sampleId: string;
};
