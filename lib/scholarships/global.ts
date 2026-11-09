import { publicScholarshipStatus, type StoredScholarshipStatus } from "@/lib/scholarships/status";

export type ScholarshipDegree = "bachelor" | "master" | "doctoral" | "language" | "high_school" | "short_term" | "non_degree";
export type ScholarshipFunding = "full" | "partial" | "waiver";

export type GlobalScholarship = {
  slug: string;
  nameOriginal: string;
  nameMn: string;
  countryCode: string;
  sponsorMn: string;
  sponsorOriginal: string;
  categories: string[];
  degrees: ScholarshipDegree[];
  funding: ScholarshipFunding[];
  citizenships: string[];
  majorsMn: string | null;
  excludedMajorsMn: string | null;
  eligibilityMn: string[];
  ageMn: string | null;
  gpaMn: string | null;
  languageMn: string | null;
  documentsMn: string[];
  statementMn: string | null;
  tuitionMn: string | null;
  stipendMn: string | null;
  accommodationMn: string | null;
  insuranceMn: string | null;
  travelMn: string | null;
  otherBenefitsMn: string | null;
  excludedMn: string | null;
  opensAt: string | null;
  closesAt: string | null;
  timezone: string | null;
  academicYear: string;
  nextAnnounced: boolean;
  storedStatus: StoredScholarshipStatus;
  selectionMn: string | null;
  interviewMn: string | null;
  applicationUrl: string | null;
  guidelineUrl: string | null;
  contactMn: string | null;
  officialSourceUrl: string;
  sourceType: string;
  lastVerifiedAt: string;
  verifierNotesMn: string;
  detailHref?: string;
};

export const scholarshipCountries = [
  ["jp", "Япон", "Japan"],
  ["kr", "Өмнөд Солонгос", "South Korea"],
  ["cn", "Хятад", "China"],
  ["de", "Герман", "Germany"],
  ["gb", "Их Британи", "United Kingdom"],
  ["us", "Америкийн Нэгдсэн Улс", "United States"],
  ["au", "Австрали", "Australia"],
  ["ca", "Канад", "Canada"],
  ["fr", "Франц", "France"],
  ["it", "Итали", "Italy"],
  ["hu", "Унгар", "Hungary"],
  ["tr", "Турк", "Türkiye"],
  ["nl", "Нидерланд", "Netherlands"],
  ["ch", "Швейцарь", "Switzerland"],
  ["se", "Швед", "Sweden"],
  ["fi", "Финланд", "Finland"],
  ["no", "Норвеги", "Norway"],
  ["pl", "Польш", "Poland"],
  ["cz", "Чех", "Czech Republic"],
  ["at", "Австри", "Austria"],
  ["sg", "Сингапур", "Singapore"],
  ["my", "Малайз", "Malaysia"],
  ["th", "Тайланд", "Thailand"],
  ["other", "Бусад улс", "Other countries"],
] as const;

export const degreeLabels: Record<ScholarshipDegree, string> = {
  bachelor: "Бакалавр",
  master: "Магистр",
  doctoral: "Доктор",
  language: "Хэлний бэлтгэл",
  high_school: "Ахлах анги",
  short_term: "Богино хугацааны хөтөлбөр",
  non_degree: "Зэрэг олгохгүй хөтөлбөр",
};

export const fundingLabels: Record<ScholarshipFunding, string> = {
  full: "Бүрэн санхүүжилт",
  partial: "Хэсэгчилсэн санхүүжилт",
  waiver: "Сургалтын төлбөрөөс чөлөөлөлт",
};

export const globalScholarships: GlobalScholarship[] = [
  {
    slug: "stipendium-hungaricum-2026-2027",
    nameOriginal: "Stipendium Hungaricum",
    nameMn: "Унгарын Засгийн газрын тэтгэлэг, Stipendium Hungaricum",
    countryCode: "hu",
    sponsorMn: "Унгарын Гадаад харилцаа, худалдааны яам. Хэрэгжүүлэгч нь Tempus Public Foundation.",
    sponsorOriginal: "Ministry of Foreign Affairs and Trade of Hungary; Tempus Public Foundation",
    categories: ["Засгийн газрын тэтгэлэг", "Сургалтын төлбөрөөс чөлөөлөлт", "Хэсэгчилсэн амьжиргааны дэмжлэг"],
    degrees: ["bachelor", "master", "language", "non_degree", "short_term"],
    funding: ["partial", "waiver"],
    citizenships: ["Монгол Улсын иргэн илгээгч түншээр бичигдсэн. Өргөдлийг тухайн улсын эрх бүхий байгууллага нэр дэвшүүлсэн тохиолдолд авч үзнэ."],
    majorsMn: "Тухайн улстай байгуулсан боловсролын хэлэлцээрт заасан чиглэлээр л өргөдөл гаргана. Монголын чиглэлийн жагсаалтыг энэ хуудсанд хуулаагүй.",
    excludedMajorsMn: null,
    eligibilityMn: [
      "Бүрэн цагийн хөтөлбөрт Монгол Улс илгээгч түншийн жагсаалтад бий.",
      "Унгар иргэн, хоёрдмол иргэншилтэй хүн хамрагдахгүй.",
      "Илгээгч улсаас өөр иргэншилтэй хүн тэр улсаар дамжуулж өргөдөл гаргахгүй.",
      "2008 оны 8 дугаар сарын 31-нээс хойш төрсөн хүн ерөнхийдөө хамрагдахгүй. Бүжгийн чиглэлд онцгой нөхцөл бий. Энэ нь 2026 оны 8 дугаар сарын 31-ний байдлаар 18 нас хүрээгүй гэсэн үг.",
    ],
    ageMn: "Доод нас: 2026 оны 8 дугаар сарын 31-нд 18 хүрсэн байх. Бүжгийн чиглэлд онцгой нөхцөл бий. Дээд насыг энэ уриалгад нэг тоогоор заагаагүй.",
    gpaMn: null,
    languageMn: "Нэг IELTS, TOEFL оноо заагаагүй. Сонгосон сургууль хэлний доод түвшинг өөрөө тогтооно. Унгар хэлээр сурах бол хэлний нотолгоо шаардана. Хэл хүрэхгүй бол зөвхөн унгар хэлний бэлтгэлд, дараа нь унгар хэлээр сурах нөхцөлөөр хамрагдаж болно.",
    documentsMn: [
      "Онлайн өргөдлийн маягт, англи хэлээр, сүүлийн 2 жилд авхуулсан зурагтай.",
      "Сонгосон хөтөлбөрийн хэлээр эсвэл унгар хэлээр бичсэн, хамгийн багадаа 1 нүүр сэдлийн захидал.",
      "Хэлний нотолгоо ба орчуулга. Өмнөх шат нь тухайн хэлээр байсан бол түүнийг нотолж болно.",
      "Боловсролын үнэмлэх, дүнгийн хуулбар, орчуулга.",
      "Паспорт, байхгүй бол иргэний үнэмлэх.",
      "Систем дээрх өргөдлийн мэдэгдлийг зөвшөөрсөн байх.",
      "Эрүүл мэндийн тодорхойлолтыг тэтгэлэг авсан хойноо Унгар дахь үзлэгт үзүүлнэ. 2025 оны 11 дүгээр сарын 1-нээс өмнө гарсан тодорхойлолт хүчингүй.",
    ],
    statementMn: "Сэдлийн захидал хамгийн багадаа 1 нүүр, Times New Roman 12, сонгосон хөтөлбөрийн хэлээр эсвэл унгар хэлээр.",
    tuitionMn: "Сургалтын төлбөрөөс чөлөөлнө.",
    stipendMn: "Зэрэг олгохгүй, бакалавр, магистр, нэг мөчлөгт магистрын түвшинд сард 43,700 форинт, жилд 12 сар. Евро дүнг хуулаагүй.",
    accommodationMn: "Байрны багтаамжаас шалтгаалж дотуур байр, эсвэл сард 40,000 форинтын дэмжлэг. Энэ дүн түрээсийг бүтнээр нь хаах албагүй гэж уриалгад бичсэн.",
    insuranceMn: "Унгарын хуулиар үзүүлэх эрүүл мэндийн үйлчилгээ, нэмэлт даатгал жилд нэг хүнд 65,000 форинт хүртэл.",
    travelMn: null,
    otherBenefitsMn: "Эхний жилдээ «Унгар хэл гадаад хэлээр» хичээлд сууж, хоёрдугаар улирлын төгсгөлд шалгалт өгнө. Суухгүй бол сарын мөнгийг авахгүй. Шалгалтад унавал сарын мөнгө 30,000 форинт болж буурна. Унгар хэлээр сурч байгаа хүн энэ хичээлээс чөлөөлөгдөнө.",
    excludedMn: "Эдгээр дүн амьжиргааны бүх зардлыг хаахгүй. Оюутан өөрийн мөнгө нэмнэ. Нислэгийг хамрах жагсаалтад оруулаагүй.",
    opensAt: null,
    closesAt: "2026-01-15T14:00:00+01:00",
    timezone: "Europe/Budapest",
    academicYear: "2026/2027",
    nextAnnounced: false,
    storedStatus: "verified",
    selectionMn: "Эхлээд Tempus Public Foundation болон илгээгч түншийн техникийн шалгалт, нэр дэвшүүлэлт. Дараа нь сургуулийн элсэлт. Өргөдөл үнэгүй. Зуучлагчаар дамжуулахгүй байхыг зөвлөсөн.",
    interviewMn: null,
    applicationUrl: "https://apply.stipendiumhungaricum.hu/",
    guidelineUrl: "https://stipendiumhungaricum.hu/wp-content/uploads/2025/10/BA_MA_OTM_Call_for_Applications_2026_27.pdf",
    contactMn: "stipendiumhungaricum@tpf.hu",
    officialSourceUrl: "https://stipendiumhungaricum.hu/apply/",
    sourceType: "programme_administrator",
    lastVerifiedAt: "2026-11-09",
    verifierNotesMn: "Бакалавр, магистрын уриалгын PDF болон apply хуудсыг 2026-11-09-нд уншсан. Докторын уриалгын мөнгөн дүнг энэ мөрөнд хуулаагүй. Евро ханшны тайлбарыг хуулаагүй.",
  },
  {
    slug: "inner-mongolia-government-2026-2027",
    nameOriginal: "内蒙古自治区政府奖学金",
    nameMn: "Өвөр Монголын Засгийн газрын тэтгэлэг",
    countryCode: "cn",
    sponsorMn: "Өвөр Монголын өөртөө засах орны засгийн газар",
    sponsorOriginal: "Inner Mongolia Autonomous Region Government",
    categories: ["Засгийн газрын тэтгэлэг", "Бүс нутгийн тэтгэлэг"],
    degrees: ["bachelor", "master", "doctoral"],
    funding: ["partial"],
    citizenships: ["Монгол Улсын иргэн. Энэ мөр CSC биш."],
    majorsMn: null,
    excludedMajorsMn: null,
    eligibilityMn: ["Дэлгэрэнгүй шалгуур, 9 сургууль, өмнөх жилийн квот тусдаа хуудсанд бий."],
    ageMn: null,
    gpaMn: null,
    languageMn: null,
    documentsMn: [],
    statementMn: null,
    tuitionMn: null,
    stipendMn: null,
    accommodationMn: null,
    insuranceMn: null,
    travelMn: null,
    otherBenefitsMn: null,
    excludedMn: null,
    opensAt: null,
    closesAt: null,
    timezone: null,
    academicYear: "2026/2027",
    nextAnnounced: false,
    storedStatus: "closed",
    selectionMn: null,
    interviewMn: null,
    applicationUrl: "https://isms.imu.edu.cn/stu/#/login",
    guidelineUrl: "https://mn.china-embassy.gov.cn/",
    contactMn: null,
    officialSourceUrl: "https://mn.china-embassy.gov.cn/",
    sourceType: "embassy",
    lastVerifiedAt: "2026-11-08",
    verifierNotesMn: "Өмнөх хуудсанд нийтэлсэн түүхэн квот, портал. 2027/2028 оны хугацааг энд нэмээгүй.",
    detailHref: "/china-scholarships/inner-mongolia-government",
  },
];

export function countryByCode(code: string) {
  return scholarshipCountries.find((item) => item[0] === code) ?? null;
}

export function scholarshipBySlug(slug: string) {
  return globalScholarships.find((item) => item.slug === slug) ?? null;
}

export function visibleScholarships(now = new Date()) {
  return globalScholarships.filter((item) => {
    const status = publicScholarshipStatus(item);
    return status !== "archived" && item.storedStatus !== "draft" && item.storedStatus !== "pending";
  }).map((item) => ({ ...item, publicStatus: publicScholarshipStatus({ ...item, now }) }));
}

export function filterScholarships(input: {
  q?: string;
  country?: string;
  degree?: string;
  funding?: string;
  status?: string;
  citizenship?: string;
  now?: Date;
} = {}) {
  const now = input.now ?? new Date();
  const q = (input.q ?? "").trim().toLowerCase();
  return visibleScholarships(now)
    .filter((item) => !input.country || item.countryCode === input.country)
    .filter((item) => !input.degree || item.degrees.includes(input.degree as ScholarshipDegree))
    .filter((item) => !input.funding || item.funding.includes(input.funding as ScholarshipFunding))
    .filter((item) => !input.status || item.publicStatus === input.status)
    .filter((item) => !input.citizenship || input.citizenship !== "mn" || item.citizenships.some((line) => line.includes("Монгол")))
    .filter((item) => !q || `${item.nameMn} ${item.nameOriginal} ${item.sponsorMn}`.toLowerCase().includes(q))
    .sort((a, b) => {
      if (a.closesAt && b.closesAt) return a.closesAt < b.closesAt ? 1 : -1;
      if (a.closesAt) return -1;
      if (b.closesAt) return 1;
      return a.nameMn.localeCompare(b.nameMn, "mn");
    });
}
