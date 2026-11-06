import type { Copy } from "@/lib/i18n/types";

export const learner = {
  name: "Тэмүүлэн",
  grade: { mn: "8-р анги", en: "Grade 8" } satisfies Copy,
  school: {
    mn: "Нийслэлийн 23 дугаар сургууль",
    en: "School No. 23, Ulaanbaatar",
  } satisfies Copy,
};

export const seedProgress: Record<string, string[]> = {
  "mongol-zuv-bichig": ["separators"],
  "fractions-percent": ["part-of-whole", "of-a-quantity"],
};

export const weekTasks: { id: string; title: Copy }[] = [
  {
    id: "fraction",
    title: {
      mn: "Бутархайн хичээлээс 24/32 гэсэн бодлогыг дэвтэртээ дахин бод",
      en: "Redo the 24/32 fraction problem in your notebook",
    },
  },
  {
    id: "spelling",
    title: {
      mn: "явъя, өгье, модны гэсэн гурван үгийг өгүүлбэрт оруул",
      en: "Use явъя, өгье, and модны in three sentences",
    },
  },
  {
    id: "ecology",
    title: {
      mn: "Гэр, сургуулийнхаа орчмын нэг газрыг ажиглаж тэмдэглэл бич",
      en: "Observe one place near home or school and write a field note",
    },
  },
];

export const sampleClass = {
  name: { mn: "8Б анги", en: "Class 8B" } satisfies Copy,
  school: learner.school,
  teacher: "О. Оюунчимэг",
  students: [
    { id: "temuulen", name: "Тэмүүлэн", progress: 68, status: "steady" as const },
    { id: "sarantuya", name: "Сарантуяа", progress: 84, status: "steady" as const },
    { id: "enkhjin", name: "Энхжин", progress: 41, status: "check" as const },
    { id: "bayar", name: "Баяр", progress: 73, status: "steady" as const },
    { id: "nomin", name: "Номин", progress: 55, status: "check" as const },
    { id: "ochir", name: "Очир", progress: 90, status: "steady" as const },
    { id: "misheel", name: "Мишээл", progress: 36, status: "check" as const },
    { id: "anakhuu", name: "Анархүү", progress: 62, status: "steady" as const },
  ],
};

export const focusByStudent: Record<string, Copy> = {
  temuulen: { mn: "Бутархай ба хувь", en: "Fractions and percent" },
  sarantuya: { mn: "Зөв бичих дүрэм", en: "Spelling" },
  enkhjin: { mn: "Бутархай ба хувь", en: "Fractions and percent" },
  bayar: { mn: "Сургуулийн англи хэл", en: "Classroom English" },
  nomin: { mn: "Тал хээрийн ажиглалт", en: "Steppe observation" },
  ochir: { mn: "Монголын түүх", en: "Mongolian history" },
  misheel: { mn: "Зөв бичих дүрэм", en: "Spelling" },
  anakhuu: { mn: "Сургуулийн англи хэл", en: "Classroom English" },
};
