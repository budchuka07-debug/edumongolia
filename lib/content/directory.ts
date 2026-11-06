import type { Copy } from "@/lib/i18n/types";

export type Education = "specialist" | "bachelor" | "master" | "doctor";

export type Category =
  | "math"
  | "mongolian"
  | "english"
  | "science"
  | "history"
  | "music"
  | "exam"
  | "code";

export type Delivery = "classroom" | "home" | "online";

export type Grouping = "individual" | "semi";

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type Slot = {
  day: Weekday;
  time: string;
};

export const weekdays: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat"];
export const slotTimes = ["10:00", "16:00", "17:30", "19:00"];

export type Teacher = {
  id: string;
  name: string;
  education: Education;
  school: Copy;
  categories: Category[];
  delivery: Delivery[];
  grouping: Grouping[];
  district: Copy;
  years: number;
  rate: Copy;
  bio: Copy;
  foreign: boolean;
  schedule?: Slot[];
};

export type Center = {
  id: string;
  name: Copy;
  district: Copy;
  licensed: boolean;
  license: Copy;
  categories: Category[];
  delivery: Delivery[];
  grouping: Grouping[];
  summary: Copy;
  foreignTeachers: boolean;
};

export type OfferKind =
  | "scholarship"
  | "foreign-uni"
  | "discount"
  | "foreign-teacher"
  | "international"
  | "travel";

export type Offer = {
  id: string;
  kind: OfferKind;
  title: Copy;
  org: Copy;
  summary: Copy;
  detail: Copy;
  meta: Copy;
  href?: string;
  linkLabel?: Copy;
};

export const teachers: Teacher[] = [
  {
    id: "oyun-chimeg",
    name: "Г. Оюунчимэг",
    education: "master",
    school: {
      mn: "МУИС, математик, магистр",
      en: "National University of Mongolia, mathematics, master's",
    },
    categories: ["math", "exam"],
    delivery: ["home", "online"],
    grouping: ["individual", "semi"],
    district: { mn: "Баянгол, Улаанбаатар", en: "Bayangol, Ulaanbaatar" },
    years: 9,
    rate: { mn: "Цагт 45,000₮", en: "45,000₮ an hour" },
    bio: {
      mn: "Сургуулиас гадуур 8–11-р ангийн математик, ЭЕШ-ийн бэлтгэлийг гэрт нь очиж заадаг.",
      en: "Visits homes for grades 8–11 mathematics and university-entrance practice.",
    },
    foreign: false,
    schedule: [
      { day: "mon", time: "16:00" },
      { day: "wed", time: "16:00" },
      { day: "sat", time: "10:00" },
    ],
  },
  {
    id: "temuulen",
    name: "Б. Тэмүүлэн",
    education: "bachelor",
    school: {
      mn: "МУБИС, монгол хэл, уран зохиол, бакалавр",
      en: "Mongolian National University of Education, Mongolian language, bachelor's",
    },
    categories: ["mongolian", "exam"],
    delivery: ["home"],
    grouping: ["individual"],
    district: { mn: "Сүхбаатар, Улаанбаатар", en: "Sukhbaatar, Ulaanbaatar" },
    years: 4,
    rate: { mn: "Цагт 35,000₮", en: "35,000₮ an hour" },
    bio: {
      mn: "Зөв бичих дүрэм, найруулга, шалгалтын эхийг гэрийн нөхцөлд ганцаарчилж заана.",
      en: "Spelling, composition, and exam writing, one to one at home.",
    },
    foreign: false,
    schedule: [
      { day: "tue", time: "17:30" },
      { day: "thu", time: "17:30" },
    ],
  },
  {
    id: "ankhtuya",
    name: "С. Анхтуяа",
    education: "master",
    school: {
      mn: "МУИС, англи хэл шинжлэл, магистр",
      en: "National University of Mongolia, English linguistics, master's",
    },
    categories: ["english"],
    delivery: ["home", "online"],
    grouping: ["individual", "semi"],
    district: { mn: "Хан-Уул, Улаанбаатар", en: "Khan-Uul, Ulaanbaatar" },
    years: 7,
    rate: { mn: "Цагт 50,000₮", en: "50,000₮ an hour" },
    bio: {
      mn: "Яриа, IELTS-ийн уншлага, сургуулийн англи хэлийг гэрт болон онлайн заана.",
      en: "Speaking, IELTS reading, and school English at home or online.",
    },
    foreign: false,
    schedule: [
      { day: "mon", time: "19:00" },
      { day: "wed", time: "19:00" },
      { day: "fri", time: "16:00" },
    ],
  },
  {
    id: "enkhbat",
    name: "Л. Энхбат",
    education: "doctor",
    school: {
      mn: "ШУТИС, физик, доктор",
      en: "MUST, physics, doctorate",
    },
    categories: ["science", "exam"],
    delivery: ["home", "classroom"],
    grouping: ["individual", "semi"],
    district: { mn: "Баянзүрх, Улаанбаатар", en: "Bayanzurkh, Ulaanbaatar" },
    years: 14,
    rate: { mn: "Цагт 60,000₮", en: "60,000₮ an hour" },
    bio: {
      mn: "Физик, химийн бодлого. Гэрийн хичээл болон жижиг бүлгийн танхим хоёуланг хийнэ.",
      en: "Physics and chemistry problems, at home or in a small classroom group.",
    },
    foreign: false,
    schedule: [
      { day: "tue", time: "16:00" },
      { day: "thu", time: "16:00" },
      { day: "sat", time: "10:00" },
    ],
  },
  {
    id: "sarangerel",
    name: "М. Сарангэрэл",
    education: "specialist",
    school: {
      mn: "Соёл урлагийн их сургууль, хөгжим, мэргэшсэн",
      en: "University of Culture and Arts, music, specialist diploma",
    },
    categories: ["music"],
    delivery: ["home"],
    grouping: ["individual"],
    district: { mn: "Чингэлтэй, Улаанбаатар", en: "Chingeltei, Ulaanbaatar" },
    years: 11,
    rate: { mn: "Цагт 40,000₮", en: "40,000₮ an hour" },
    bio: {
      mn: "Морин хуур, төгөлдөр хуурыг сурагчийн гэрт ганцаарчилж заана.",
      en: "Morin khuur and piano, one to one in the student's home.",
    },
    foreign: false,
    schedule: [
      { day: "sat", time: "10:00" },
      { day: "sat", time: "16:00" },
    ],
  },
  {
    id: "bolormaa",
    name: "Н. Болормаа",
    education: "bachelor",
    school: {
      mn: "ШУТИС, програм хангамж, бакалавр",
      en: "MUST, software, bachelor's",
    },
    categories: ["code", "math"],
    delivery: ["online"],
    grouping: ["individual", "semi"],
    district: { mn: "Онлайн, Улаанбаатар цаг", en: "Online, Ulaanbaatar time" },
    years: 5,
    rate: { mn: "Цагт 40,000₮", en: "40,000₮ an hour" },
    bio: {
      mn: "Python, вэб, сургуулийн мэдээлэл зүйг онлайн ганцаарчилсан болон хагас бүлгээр заана.",
      en: "Python, web, and school computing online, one to one or in a small group.",
    },
    foreign: false,
    schedule: [
      { day: "mon", time: "19:00" },
      { day: "wed", time: "19:00" },
      { day: "fri", time: "19:00" },
    ],
  },
  {
    id: "james-miller",
    name: "James Miller",
    education: "master",
    school: {
      mn: "Эдинбургийн их сургууль, TESOL, магистр",
      en: "University of Edinburgh, TESOL, master's",
    },
    categories: ["english"],
    delivery: ["online", "classroom"],
    grouping: ["individual", "semi"],
    district: { mn: "Онлайн, Их Британи", en: "Online, United Kingdom" },
    years: 12,
    rate: { mn: "Цагт 70,000₮", en: "70,000₮ an hour" },
    bio: {
      mn: "Гадаад багш. Ярианы англи, эссэ бичлэгийг онлайн болон төвийн танхимд заана.",
      en: "A foreign teacher. Spoken English and essays online or in a center classroom.",
    },
    foreign: true,
    schedule: [
      { day: "tue", time: "19:00" },
      { day: "thu", time: "19:00" },
    ],
  },
  {
    id: "kim-hana",
    name: "Kim Hana",
    education: "bachelor",
    school: {
      mn: "Ёнсэй их сургууль, солонгос хэлний боловсрол, бакалавр",
      en: "Yonsei University, Korean language education, bachelor's",
    },
    categories: ["english", "exam"],
    delivery: ["online"],
    grouping: ["semi"],
    district: { mn: "Онлайн, Сөүл", en: "Online, Seoul" },
    years: 6,
    rate: { mn: "Цагт 55,000₮", en: "55,000₮ an hour" },
    bio: {
      mn: "Солонгос хэл, TOPIK-ийн бэлтгэлийг 4 хүртэлх сурагчтай хагас бүлгээр онлайн заана.",
      en: "Korean and TOPIK prep online, in groups of up to four.",
    },
    foreign: true,
    schedule: [
      { day: "sat", time: "10:00" },
      { day: "sat", time: "17:30" },
    ],
  },
];

export const centers: Center[] = [
  {
    id: "altan-tuya",
    name: { mn: "Алтан туяа сургалтын төв", en: "Altan Tuya learning center" },
    district: { mn: "Сүхбаатар дүүрэг", en: "Sukhbaatar district" },
    licensed: true,
    license: { mn: "Жишээ зөвшөөрөл АА-24018", en: "Sample license AA-24018" },
    categories: ["math", "english", "exam"],
    delivery: ["classroom"],
    grouping: ["individual", "semi"],
    summary: {
      mn: "Тусгай зөвшөөрөлтэй танхим. ЭЕШ, сургуулийн математик, англи хэл.",
      en: "A licensed classroom for entrance exams, school math, and English.",
    },
    foreignTeachers: false,
  },
  {
    id: "khangai",
    name: { mn: "Хангай бэлтгэл төв", en: "Khangai prep center" },
    district: { mn: "Баянгол дүүрэг", en: "Bayangol district" },
    licensed: true,
    license: { mn: "Жишээ зөвшөөрөл АА-23102", en: "Sample license AA-23102" },
    categories: ["mongolian", "history", "exam"],
    delivery: ["classroom"],
    grouping: ["semi"],
    summary: {
      mn: "Нийгэм, монгол хэлний хагас бүлэг. Анги дүүргэлт 6–8 сурагч.",
      en: "Social studies and Mongolian in groups of six to eight.",
    },
    foreignTeachers: false,
  },
  {
    id: "steppe",
    name: { mn: "Степпе академи", en: "Steppe Academy" },
    district: { mn: "Хан-Уул дүүрэг", en: "Khan-Uul district" },
    licensed: true,
    license: { mn: "Жишээ зөвшөөрөл АА-25007", en: "Sample license AA-25007" },
    categories: ["english", "science", "code"],
    delivery: ["classroom", "online"],
    grouping: ["individual", "semi"],
    summary: {
      mn: "Гадаад багштай танхим, онлайн анги. Англи хэл, байгалийн ухаан, код.",
      en: "Classrooms and online classes with foreign teachers. English, science, and code.",
    },
    foreignTeachers: true,
  },
  {
    id: "od",
    name: { mn: "Оддын аялал сургалт", en: "Odyn travel study" },
    district: { mn: "Хөвсгөл, Дархан", en: "Khuvsgul and Darkhan" },
    licensed: false,
    license: { mn: "Зөвшөөрөлгүй жишээ хөтөлбөр", en: "Sample program without a license" },
    categories: ["science", "history"],
    delivery: ["classroom"],
    grouping: ["semi"],
    summary: {
      mn: "Аялалтай сургалт. Байгаль, орон нутгийн түүхийг газар дээр нь үздэг.",
      en: "Study with travel. Nature and local history on site.",
    },
    foreignTeachers: false,
  },
];

export const offers: Offer[] = [
  {
    id: "aimag-grant",
    kind: "scholarship",
    title: { mn: "Аймагтны хичээлийн тэтгэлэг", en: "Aimag study grant" },
    org: { mn: "EduMongolia жишээ сан", en: "EduMongolia sample fund" },
    summary: {
      mn: "Орон нутгийн сурагчийн гэрийн багшийн 8 цагийг хавар улиралд даана.",
      en: "Covers eight hours of home tutoring in spring for a student outside the capital.",
    },
    detail: {
      mn: "Анги 9–12. Математик, монгол хэл, англи хэлээс нэг ангилал сонгоно. Энэ бол жишээ зар.",
      en: "Grades 9–12. One subject among math, Mongolian, or English. This is a sample listing.",
    },
    meta: { mn: "Хүсэлт 4-р сарын 15", en: "Requests by 15 April" },
  },
  {
    id: "teacher-day",
    kind: "discount",
    title: { mn: "Багшийн өдрийн хөнгөлөлт", en: "Teachers' day discount" },
    org: { mn: "Алтан туяа сургалтын төв", en: "Altan Tuya learning center" },
    summary: {
      mn: "Танхимын улирлын төлбөрөөс 20 хувь.",
      en: "20 percent off a classroom term.",
    },
    detail: {
      mn: "10-р сард бүртгүүлсэн шинэ сурагчид. Ганцаарчилсан болон хагас бүлэгт хамаарна.",
      en: "New students who register in October. Applies to individual and small-group classes.",
    },
    meta: { mn: "20%", en: "20%" },
  },
  {
    id: "sibling",
    kind: "discount",
    title: { mn: "Ах дүүгийн хөнгөлөлт", en: "Sibling discount" },
    org: { mn: "Хангай бэлтгэл төв", en: "Khangai prep center" },
    summary: {
      mn: "Нэг гэрийн хоёр дахь сурагчид 15 хувь.",
      en: "15 percent for a second student from the same home.",
    },
    detail: {
      mn: "Хагас ганцаарчилсан бүлэгт. Эхний сурагч бүтэн төлбөртэй.",
      en: "For semi-individual groups. The first student pays the full fee.",
    },
    meta: { mn: "15%", en: "15%" },
  },
  {
    id: "early",
    kind: "discount",
    title: { mn: "Эрт бүртгэлийн хөнгөлөлт", en: "Early registration discount" },
    org: { mn: "Степпе академи", en: "Steppe Academy" },
    summary: {
      mn: "Улирал эхлэхээс 30 хоногийн өмнө 10 хувь.",
      en: "10 percent when you register 30 days before the term.",
    },
    detail: {
      mn: "Онлайн болон танхимын англи хэл. Гадаад багштай ангид мөн үйлчилнэ.",
      en: "Online and classroom English, including classes with a foreign teacher.",
    },
    meta: { mn: "10%", en: "10%" },
  },
  {
    id: "uk-prep",
    kind: "foreign-uni",
    title: {
      mn: "Их Британийн их сургуулийн бэлтгэл",
      en: "United Kingdom university preparation",
    },
    org: { mn: "EduMongolia жишээ хөтөлбөр", en: "EduMongolia sample program" },
    summary: {
      mn: "Гадаадын их сургуульд өгөх эссэ, зөвлөмж, IELTS-ийн 12 долоо хоног.",
      en: "Twelve weeks of essays, references, and IELTS for study abroad.",
    },
    detail: {
      mn: "Жинхэнэ их сургуулийн элсэлт биш. Сурагч материалаа өөрөө илгээнэ. Тэтгэлэг нь бэлтгэлийн төлбөрийг даана.",
      en: "This is not a university admission. The student sends their own application. The grant covers prep fees.",
    },
    meta: { mn: "12 долоо хоног", en: "12 weeks" },
  },
  {
    id: "korea-track",
    kind: "foreign-uni",
    title: {
      mn: "Солонгосын их сургуулийн хэлний зам",
      en: "Korean university language track",
    },
    org: { mn: "EduMongolia жишээ хөтөлбөр", en: "EduMongolia sample program" },
    summary: {
      mn: "TOPIK 3-т хүргэх онлайн бүлэг, дараа нь хэлний бэлтгэлийн тэтгэлгийн зөвлөгөө.",
      en: "An online group toward TOPIK 3, then advice on language-study grants.",
    },
    detail: {
      mn: "Хагас ганцаарчилсан, 6 хүн. Гадаад багш Kim Hana заана. Энэ бол жишээ зар.",
      en: "Semi-individual, six students, taught by Kim Hana. This is a sample listing.",
    },
    meta: { mn: "16 долоо хоног", en: "16 weeks" },
  },
  {
    id: "foreign-english",
    kind: "foreign-teacher",
    title: { mn: "Гадаад багштай ярианы анги", en: "Speaking class with a foreign teacher" },
    org: { mn: "Степпе академи", en: "Steppe Academy" },
    summary: {
      mn: "James Miller танхимд болон онлайн ярианы англи заана.",
      en: "James Miller teaches spoken English in class and online.",
    },
    detail: {
      mn: "Ганцаарчилсан цаг, эсвэл 4 хүний хагас бүлэг. Долоо хоногт хоёр уулзалт.",
      en: "An individual hour, or a group of four. Two meetings a week.",
    },
    meta: { mn: "Долоо хоногт 2 удаа", en: "Twice a week" },
  },
  {
    id: "ib-sample",
    kind: "international",
    title: { mn: "Олон улсын шалгалтын бэлтгэл", en: "International exam preparation" },
    org: { mn: "Степпе академи", en: "Steppe Academy" },
    summary: {
      mn: "IELTS, TOPIK-ийн жишээ зам. Олон улсын хөтөлбөрийн нэрээр элсэлт амлахгүй.",
      en: "A sample path for IELTS and TOPIK. It does not promise admission to an international program.",
    },
    detail: {
      mn: "Онлайн хагас бүлэг. Материал монгол, англи хэл дээр.",
      en: "Online small groups. Materials in Mongolian and English.",
    },
    meta: { mn: "8 долоо хоног", en: "8 weeks" },
  },
  {
    id: "english-immersion",
    kind: "travel",
    title: {
      mn: "Англи хэлний вакуум аялал",
      en: "English immersion in the wild",
    },
    org: { mn: "Booking Mongolia", en: "Booking Mongolia" },
    summary: {
      mn: "7 хоног, 100% англи. Хөвсгөл нуур, Тэрэлж, Цонжин болдог. Англи хичээл болон морь унах хичээлд хамт сууна.",
      en: "Seven days, 100% English. Khuvsgul Lake, Terelj, and Tsonjin Boldog. Join the English class and the horse-riding lesson.",
    },
    detail: {
      mn: "Жижиг бүлэг хөдөөний малчин айлын буудалд байрлаж болно. Огноо, үнэ Booking Mongolia дээр.",
      en: "A small group can stay in a herder family camp. Dates and price are on Booking Mongolia.",
    },
    meta: { mn: "7 хоног", en: "7 days" },
    href: "/programs/english",
    linkLabel: { mn: "Хөтөлбөрийг нээх", en: "Open the program" },
  },
  {
    id: "khuvsgul-trip",
    kind: "travel",
    title: { mn: "Хөвсгөлийн экологийн аялал", en: "Khuvsgul ecology trip" },
    org: { mn: "Оддын аялал сургалт", en: "Odyn travel study" },
    summary: {
      mn: "7 хоног. Нуурын эрэг дээр байгаль, орон нутгийн түүх үзэж тэмдэглэл хөтөлнө.",
      en: "Seven days. Nature and local history beside the lake, with a field notebook.",
    },
    detail: {
      mn: "9–11-р анги, хагас бүлэг 10 хүртэл. Байр, хоол багтсан жишээ үнэ 890,000₮.",
      en: "Grades 9–11, groups up to 10. Sample price 890,000₮ with lodging and meals.",
    },
    meta: { mn: "7 хоног", en: "7 days" },
  },
];

export function getTeacher(id: string) {
  return teachers.find((teacher) => teacher.id === id);
}

export function getCenter(id: string) {
  return centers.find((center) => center.id === id);
}

export const STUDENTS_KEY = "edumongolia-students";
export const EXTRA_TEACHERS_KEY = "edumongolia-teachers";

export type StudentRecord = {
  id: string;
  name: string;
  grade: string;
  category: Category;
  delivery: Delivery;
  grouping: Grouping;
  day: Weekday;
  time: string;
  teacherId: string;
};
