import { id } from "@/lib/marketplace/ids";
import { L } from "@/lib/marketplace/text";
import type {
  AcademicRequirement,
  AcademicYear,
  Article,
  City,
  Country,
  Discipline,
  ExamRequirement,
  Examination,
  ExaminationSession,
  ExaminationSubject,
  LanguageRequirement,
  Program,
  Province,
  Scholarship,
  ScholarshipBenefit,
  ScholarshipDeadline,
  ScholarshipProgram,
  ScholarshipUniversity,
  SourceReference,
  University,
} from "@/lib/marketplace/types";

/**
 * Үзүүлэнгийн каталог.
 * Төлбөр, тэтгэлгийн мөнгөн дүн, доод GPA, HSK, IELTS, TOEFL, CSCA оноо, элсэлтийн хугацааг зохиогоогүй.
 * null нь «их сургууль эсвэл албан эх сурвалж тодорхойлоогүй» гэсэн утгатай.
 * CSCA-ийн шалгалтын өдрүүдийг 2026-11-08-нд https://www.csca.cn/ хуудаснаас авсан.
 */

const pendingNote = L(
  "Албан хуудастай тулгаж дахин баталгаажуулаагүй.",
  "Not re-checked against the live official page.",
  "尚未与官方页面复核。",
);

export const countries: Country[] = [
  { id: id.countryCn, code: "CN", name: L("Хятад", "China", "中国") },
];

export const provinces: Province[] = [
  { id: id.provinceBj, countryId: id.countryCn, name: L("Бээжин", "Beijing", "北京") },
  { id: id.provinceSh, countryId: id.countryCn, name: L("Шанхай", "Shanghai", "上海") },
  { id: id.provinceZj, countryId: id.countryCn, name: L("Жөжян", "Zhejiang", "浙江") },
];

export const cities: City[] = [
  { id: id.cityBj, provinceId: id.provinceBj, name: L("Бээжин", "Beijing", "北京") },
  { id: id.citySh, provinceId: id.provinceSh, name: L("Шанхай", "Shanghai", "上海") },
  { id: id.cityHz, provinceId: id.provinceZj, name: L("Ханжоу", "Hangzhou", "杭州") },
];

export const academicYears: AcademicYear[] = [
  {
    id: id.year2627,
    label: "2026/2027",
    startsOn: "2026-09-01",
    endsOn: "2027-07-31",
  },
  {
    id: id.year2728,
    label: "2027/2028",
    startsOn: "2027-09-01",
    endsOn: "2028-07-31",
  },
];

export const sources: SourceReference[] = [
  {
    id: id.srcCsca,
    title: L("CSCA албан ёсны сайт", "Official CSCA website", "CSCA 官网"),
    url: "https://www.csca.cn/",
    sourceType: "csca",
    academicYearId: null,
    verifiedOn: "2026-11-08",
    updatedOn: "2026-11-08",
    status: "verified",
    note: L(
      "Шалгалтын өдрүүдийг энэ хуудаснаас авсан. Доод оноо нийтлээгүй.",
      "Exam dates were taken from this page. No cut scores were published there.",
      "考试日期取自该页。页面未公布分数线。",
    ),
  },
  {
    id: id.srcCampus,
    title: L("Campus China", "Campus China", "留学中国"),
    url: "https://www.campuschina.org/",
    sourceType: "csc",
    academicYearId: null,
    verifiedOn: null,
    updatedOn: "2026-11-08",
    status: "pending",
    note: pendingNote,
  },
  {
    id: id.srcStudy,
    title: L(
      "Хятадын засгийн газрын тэтгэлгийн систем",
      "Chinese Government Scholarship system",
      "中国政府奖学金系统",
    ),
    url: "https://studyinchina.csc.edu.cn/",
    sourceType: "csc",
    academicYearId: null,
    verifiedOn: null,
    updatedOn: "2026-11-08",
    status: "pending",
    note: pendingNote,
  },
  {
    id: id.srcEmbassy,
    title: L(
      "Монгол дахь Хятадын элчин сайдын яам",
      "Embassy of China in Mongolia",
      "中国驻蒙古国大使馆",
    ),
    url: "https://mn.china-embassy.gov.cn/eng/",
    sourceType: "embassy",
    academicYearId: null,
    verifiedOn: null,
    updatedOn: "2026-11-08",
    status: "pending",
    note: pendingNote,
  },
  {
    id: id.srcChsi,
    title: L("CHSI", "CHSI", "学信网"),
    url: "https://www.chsi.com.cn/en/",
    sourceType: "government_portal",
    academicYearId: null,
    verifiedOn: null,
    updatedOn: "2026-11-08",
    status: "pending",
    note: pendingNote,
  },
  {
    id: id.srcDemo,
    title: L(
      "EduMongolia үзүүлэнгийн бүртгэл",
      "EduMongolia demonstration record",
      "EduMongolia 演示记录",
    ),
    url: "https://edumongolia.com/china",
    sourceType: "platform_note",
    academicYearId: null,
    verifiedOn: null,
    updatedOn: "2026-11-08",
    status: "pending",
    note: L(
      "Нэр, хот, албан сайт нь олон нийтэд танигдсан боловч энэ хувилбарт албан хуудастай нэг бүрчлэн тулгаагүй. Төлбөр, оноо, хугацааг хоосон үлдээсэн.",
      "Names, cities, and official sites are publicly known, but this version was not checked line by line against each live page. Fees, scores, and deadlines are left empty.",
      "名称、城市和官网为公开信息，但本版未逐条对照活页。费用、分数和截止日期留空。",
    ),
  },
];

export const disciplines: Discipline[] = [
  { id: id.discCs, slug: "computer-science", name: L("Компьютерийн шинжлэх ухаан", "Computer science", "计算机科学") },
  { id: id.discZh, slug: "chinese-language", name: L("Хятад хэл", "Chinese language", "汉语言") },
  { id: id.discEcon, slug: "international-economics", name: L("Олон улсын эдийн засаг", "International economics", "国际经济") },
  { id: id.discMed, slug: "clinical-medicine", name: L("Клиникийн анагаах", "Clinical medicine", "临床医学") },
  { id: id.discCivil, slug: "civil-engineering", name: L("Барилгын инженер", "Civil engineering", "土木工程") },
];

function university(input: Omit<University, "countryId" | "logoUrl" | "campusImageUrls" | "email" | "phone" | "address" | "demonstration" | "sourceId">): University {
  return {
    ...input,
    countryId: id.countryCn,
    address: null,
    email: null,
    phone: null,
    logoUrl: null,
    campusImageUrls: [],
    demonstration: true,
    sourceId: id.srcDemo,
  };
}

export const universities: University[] = [
  university({
    id: id.uniTsinghua,
    slug: "tsinghua-university",
    name: L("Цинхуа их сургууль", "Tsinghua University", "清华大学"),
    provinceId: id.provinceBj,
    cityId: id.cityBj,
    type: "public",
    foundedYear: 1911,
    introduction: L(
      "Бээжинд байрладаг улсын их сургууль. Олон улсын элсэлтийн нөхцөлийг энэ бүртгэлд тусгаагүй. Албан сайтаас шалгана уу.",
      "A public university in Beijing. International admission rules are not copied into this record. Check the official site.",
      "位于北京的公立大学。本记录未收录国际招生条件，请以官网为准。",
    ),
    website: "https://www.tsinghua.edu.cn/",
    internationalWebsite: null,
  }),
  university({
    id: id.uniPku,
    slug: "peking-university",
    name: L("Бээжингийн их сургууль", "Peking University", "北京大学"),
    provinceId: id.provinceBj,
    cityId: id.cityBj,
    type: "public",
    foundedYear: 1898,
    introduction: L(
      "Бээжинд байрладаг улсын их сургууль. Хөтөлбөр, төлбөр, хэлний доод оноо баталгаажаагүй.",
      "A public university in Beijing. Programs, fees, and language cut scores are not verified here.",
      "位于北京的公立大学。项目、学费和语言分数线尚未在此核实。",
    ),
    website: "https://www.pku.edu.cn/",
    internationalWebsite: null,
  }),
  university({
    id: id.uniFudan,
    slug: "fudan-university",
    name: L("Фудань их сургууль", "Fudan University", "复旦大学"),
    provinceId: id.provinceSh,
    cityId: id.citySh,
    type: "public",
    foundedYear: 1905,
    introduction: L(
      "Шанхайд байрладаг улсын их сургууль. Элсэлтийн шаардлагыг их сургууль бүрт тусад нь хадгална, улсын дундаж оноо ашиглаагүй.",
      "A public university in Shanghai. Requirements stay on this university, not a national average.",
      "位于上海的公立大学。录取要求按本校单独保存，不使用全国统一分数。",
    ),
    website: "https://www.fudan.edu.cn/",
    internationalWebsite: null,
  }),
  university({
    id: id.uniSjtu,
    slug: "shanghai-jiao-tong-university",
    name: L("Шанхайн Жяо Тун их сургууль", "Shanghai Jiao Tong University", "上海交通大学"),
    provinceId: id.provinceSh,
    cityId: id.citySh,
    type: "public",
    foundedYear: 1896,
    introduction: L(
      "Шанхайд байрладаг улсын их сургууль. Үзүүлэнгийн хөтөлбөр нь тухайн жилийн олон улсын элсэлтийн жагсаалт биш.",
      "A public university in Shanghai. Demonstration programs are not that year's international admissions list.",
      "位于上海的公立大学。演示项目并非该年国际招生目录。",
    ),
    website: "https://www.sjtu.edu.cn/",
    internationalWebsite: null,
  }),
  university({
    id: id.uniZju,
    slug: "zhejiang-university",
    name: L("Жөжян их сургууль", "Zhejiang University", "浙江大学"),
    provinceId: id.provinceZj,
    cityId: id.cityHz,
    type: "public",
    foundedYear: 1897,
    introduction: L(
      "Ханжоуд байрладаг улсын их сургууль. Сургалтын төлбөр, дотуур байр, өргөдлийн хураамжийг хоосон үлдээсэн.",
      "A public university in Hangzhou. Tuition, housing, and application fees are left empty.",
      "位于杭州的公立大学。学费、住宿费和申请费留空。",
    ),
    website: "https://www.zju.edu.cn/",
    internationalWebsite: null,
  }),
  university({
    id: id.uniBlcu,
    slug: "beijing-language-and-culture-university",
    name: L(
      "Бээжингийн хэл, соёлын их сургууль",
      "Beijing Language and Culture University",
      "北京语言大学",
    ),
    provinceId: id.provinceBj,
    cityId: id.cityBj,
    type: "public",
    foundedYear: 1962,
    introduction: L(
      "Гадаад оюутанд хятад хэл заахаараа танигдсан Бээжингийн улсын их сургууль. HSK-ийн доод түвшинг энд зохиогоогүй.",
      "A public Beijing university known for teaching Chinese to international students. No HSK cut score is invented here.",
      "位于北京、以外国学生汉语教学闻名的公立大学。此处不编造 HSK 分数线。",
    ),
    website: "https://www.blcu.edu.cn/",
    internationalWebsite: null,
  }),
];

const programSeed: Array<Omit<Program, "durationYears" | "annualTuitionCny" | "applicationFeeCny" | "annualAccommodationCny" | "intake" | "officialUrl" | "demonstration" | "sourceId" | "facultyName">> = [
  {
    id: "50000000-0000-4000-8000-000000000001",
    slug: "tsinghua-university-computer-science",
    universityId: id.uniTsinghua,
    disciplineId: id.discCs,
    name: L("Компьютерийн шинжлэх ухаан", "Computer science", "计算机科学"),
    degree: "bachelor",
    instructionLanguage: "zh",
  },
  {
    id: "50000000-0000-4000-8000-000000000002",
    slug: "tsinghua-university-international-economics",
    universityId: id.uniTsinghua,
    disciplineId: id.discEcon,
    name: L("Олон улсын эдийн засаг", "International economics", "国际经济"),
    degree: "master",
    instructionLanguage: "en",
  },
  {
    id: "50000000-0000-4000-8000-000000000003",
    slug: "peking-university-chinese-language",
    universityId: id.uniPku,
    disciplineId: id.discZh,
    name: L("Хятад хэл", "Chinese language", "汉语言"),
    degree: "bachelor",
    instructionLanguage: "zh",
  },
  {
    id: "50000000-0000-4000-8000-000000000004",
    slug: "peking-university-clinical-medicine",
    universityId: id.uniPku,
    disciplineId: id.discMed,
    name: L("Клиникийн анагаах", "Clinical medicine", "临床医学"),
    degree: "bachelor",
    instructionLanguage: "en",
  },
  {
    id: "50000000-0000-4000-8000-000000000005",
    slug: "fudan-university-international-economics",
    universityId: id.uniFudan,
    disciplineId: id.discEcon,
    name: L("Олон улсын эдийн засаг", "International economics", "国际经济"),
    degree: "bachelor",
    instructionLanguage: "zh",
  },
  {
    id: "50000000-0000-4000-8000-000000000006",
    slug: "fudan-university-chinese-language",
    universityId: id.uniFudan,
    disciplineId: id.discZh,
    name: L("Хятад хэл", "Chinese language", "汉语言"),
    degree: "non_degree",
    instructionLanguage: "zh",
  },
  {
    id: "50000000-0000-4000-8000-000000000007",
    slug: "shanghai-jiao-tong-university-computer-science",
    universityId: id.uniSjtu,
    disciplineId: id.discCs,
    name: L("Компьютерийн шинжлэх ухаан", "Computer science", "计算机科学"),
    degree: "bachelor",
    instructionLanguage: "en",
  },
  {
    id: "50000000-0000-4000-8000-000000000008",
    slug: "shanghai-jiao-tong-university-civil-engineering",
    universityId: id.uniSjtu,
    disciplineId: id.discCivil,
    name: L("Барилгын инженер", "Civil engineering", "土木工程"),
    degree: "master",
    instructionLanguage: "zh",
  },
  {
    id: "50000000-0000-4000-8000-000000000009",
    slug: "zhejiang-university-computer-science",
    universityId: id.uniZju,
    disciplineId: id.discCs,
    name: L("Компьютерийн шинжлэх ухаан", "Computer science", "计算机科学"),
    degree: "phd",
    instructionLanguage: "en",
  },
  {
    id: "50000000-0000-4000-8000-000000000010",
    slug: "zhejiang-university-clinical-medicine",
    universityId: id.uniZju,
    disciplineId: id.discMed,
    name: L("Клиникийн анагаах", "Clinical medicine", "临床医学"),
    degree: "bachelor",
    instructionLanguage: "zh",
  },
  {
    id: "50000000-0000-4000-8000-000000000011",
    slug: "blcu-chinese-language",
    universityId: id.uniBlcu,
    disciplineId: id.discZh,
    name: L("Хятад хэл", "Chinese language", "汉语言"),
    degree: "bachelor",
    instructionLanguage: "zh",
  },
  {
    id: "50000000-0000-4000-8000-000000000012",
    slug: "blcu-chinese-language-non-degree",
    universityId: id.uniBlcu,
    disciplineId: id.discZh,
    name: L("Хятад хэлний бэлтгэл", "Chinese language preparation", "汉语进修"),
    degree: "non_degree",
    instructionLanguage: "zh",
  },
];

export const programs: Program[] = programSeed.map((program) => ({
  ...program,
  facultyName: null,
  durationYears: null,
  annualTuitionCny: null,
  applicationFeeCny: null,
  annualAccommodationCny: null,
  intake: null,
  officialUrl: null,
  demonstration: true,
  sourceId: id.srcDemo,
}));

export const academicRequirements: AcademicRequirement[] = [
  ...programs.flatMap((program) =>
    academicYears.map((year) => ({
      id: `academic-${program.id}-${year.id}`,
      ownerType: "program" as const,
      ownerId: program.id,
      academicYearId: year.id,
      minAge: null,
      maxAge: null,
      minEducation: null,
      minGpa: null,
      gpaScale: null,
      qualificationNotes: null,
    })),
  ),
];

export const scholarships: Scholarship[] = [
  {
    id: id.schCsc2627,
    slug: "chinese-government-scholarship-2026-2027",
    name: L(
      "Хятадын засгийн газрын тэтгэлэг 2026/2027",
      "Chinese Government Scholarship 2026/2027",
      "中国政府奖学金 2026/2027",
    ),
    categories: ["csc"],
    countryId: id.countryCn,
    academicYearId: id.year2627,
    degreeLevels: ["bachelor", "master", "phd", "non_degree"],
    eligibleNationalities: null,
    officialUrl: "https://www.campuschina.org/",
    procedure: L(
      "Өргөдлийн алхмыг энэ хувилбарт хуулж оруулаагүй. Campus China болон studyinchina.csc.edu.cn дээрх тухайн жилийн зааврыг уншина уу.",
      "The application steps are not copied in this version. Read that year's instructions on Campus China and studyinchina.csc.edu.cn.",
      "本版未抄录申请步骤。请阅读 Campus China 与 studyinchina.csc.edu.cn 上该学年的说明。",
    ),
    demonstration: true,
    sourceId: id.srcCampus,
  },
  {
    id: id.schCsc2728,
    slug: "chinese-government-scholarship-2027-2028",
    name: L(
      "Хятадын засгийн газрын тэтгэлэг 2027/2028",
      "Chinese Government Scholarship 2027/2028",
      "中国政府奖学金 2027/2028",
    ),
    categories: ["csc"],
    countryId: id.countryCn,
    academicYearId: id.year2728,
    degreeLevels: ["bachelor", "master", "phd", "non_degree"],
    eligibleNationalities: null,
    officialUrl: "https://www.campuschina.org/",
    procedure: L(
      "2026/2027 оны нөхцөлийг энэ жил рүү хуулаагүй. Шаардлага хараахан ороогүй.",
      "Rules from 2026/2027 were not copied into this year. Requirements are not entered yet.",
      "未把 2026/2027 的条件复制到本学年。要求尚未录入。",
    ),
    demonstration: true,
    sourceId: id.srcCampus,
  },
  {
    id: id.schConfucius2627,
    slug: "international-chinese-language-teachers-scholarship-2026-2027",
    name: L(
      "Олон улсын хятад хэлний багшийн тэтгэлэг 2026/2027",
      "International Chinese Language Teachers Scholarship 2026/2027",
      "国际中文教师奖学金 2026/2027",
    ),
    categories: ["confucius"],
    countryId: id.countryCn,
    academicYearId: id.year2627,
    degreeLevels: ["bachelor", "master", "non_degree"],
    eligibleNationalities: null,
    officialUrl: null,
    procedure: L(
      "Өмнө нь Кунзийн институтын тэтгэлэг гэж нэрлэгддэг байсан. Албан сайт, мөнгөн дүн, HSK-ийн босгыг энд баталгаажуулаагүй.",
      "Previously known as the Confucius Institute Scholarship. The official site, stipend, and HSK threshold are not verified here.",
      "此前称孔子学院奖学金。官网、津贴和 HSK 分数线尚未在此核实。",
    ),
    demonstration: true,
    sourceId: id.srcDemo,
  },
];

export const scholarshipBenefits: ScholarshipBenefit[] = scholarships.map((scholarship) => ({
  id: `benefit-${scholarship.id}`,
  scholarshipId: scholarship.id,
  academicYearId: scholarship.academicYearId,
  tuitionCoverage: null,
  accommodationCoverage: null,
  monthlyStipendCny: null,
  medicalInsurance: null,
  applicationFeeCny: null,
}));

export const scholarshipDeadlines: ScholarshipDeadline[] = scholarships.map((scholarship) => ({
  id: `deadline-${scholarship.id}`,
  scholarshipId: scholarship.id,
  academicYearId: scholarship.academicYearId,
  opensOn: null,
  closesOn: null,
}));

/** Их сургуультай холбоогүй. Хоосон жагсаалт нь «бүх сургуульд нээлттэй» гэсэн үг биш. */
export const scholarshipUniversities: ScholarshipUniversity[] = [];

export const scholarshipPrograms: ScholarshipProgram[] = [];

/** Хэл, CSCA-ийн их сургуулийн доод оноо нийтлэгдээгүй тул мөр үүсгээгүй. */
export const languageRequirements: LanguageRequirement[] = [];

export const examRequirements: ExamRequirement[] = [];

scholarshipAcademic();

function scholarshipAcademic() {
  for (const scholarship of scholarships) {
    academicRequirements.push({
      id: `academic-${scholarship.id}`,
      ownerType: "scholarship",
      ownerId: scholarship.id,
      academicYearId: scholarship.academicYearId,
      minAge: null,
      maxAge: null,
      minEducation: null,
      minGpa: null,
      gpaScale: null,
      qualificationNotes: null,
    });
  }
}

export const examinations: Examination[] = [
  {
    id: id.examHsk,
    slug: "hsk",
    name: L("HSK", "HSK", "汉语水平考试"),
    family: "chinese",
    officialUrl: "https://www.chinesetest.cn/",
    scoreValidity: null,
    sourceId: id.srcDemo,
  },
  {
    id: id.examHskk,
    slug: "hskk",
    name: L("HSKK", "HSKK", "汉语水平口语考试"),
    family: "chinese",
    officialUrl: "https://www.chinesetest.cn/",
    scoreValidity: null,
    sourceId: id.srcDemo,
  },
  {
    id: id.examIelts,
    slug: "ielts-academic",
    name: L("IELTS Academic", "IELTS Academic", "雅思学术类"),
    family: "english",
    officialUrl: "https://ielts.org/",
    scoreValidity: null,
    sourceId: id.srcDemo,
  },
  {
    id: id.examToefl,
    slug: "toefl-ibt",
    name: L("TOEFL iBT", "TOEFL iBT", "托福 iBT"),
    family: "english",
    officialUrl: "https://www.ets.org/toefl.html",
    scoreValidity: null,
    sourceId: id.srcDemo,
  },
  {
    id: id.examDuolingo,
    slug: "duolingo-english-test",
    name: L("Duolingo English Test", "Duolingo English Test", "多邻国英语测试"),
    family: "english",
    officialUrl: "https://englishtest.duolingo.com/",
    scoreValidity: null,
    sourceId: id.srcDemo,
  },
  {
    id: id.examCsca,
    slug: "csca",
    name: L(
      "CSCA, Хятадын сургалтын чадамжийн үнэлгээ",
      "CSCA, China Scholastic Competency Assessment",
      "中国入学学业水平测试",
    ),
    family: "csca",
    officialUrl: "https://www.csca.cn/",
    scoreValidity: null,
    sourceId: id.srcCsca,
  },
  {
    id: id.examSat,
    slug: "sat",
    name: L("SAT", "SAT", "SAT"),
    family: "other",
    officialUrl: "https://satsuite.collegeboard.org/sat",
    scoreValidity: null,
    sourceId: id.srcDemo,
  },
];

export const examinationSubjects: ExaminationSubject[] = [
  ...[1, 2, 3, 4, 5, 6].map((level) => ({
    id: `70000000-0000-4000-8000-00000000001${level}`,
    examinationId: id.examHsk,
    slug: `hsk-${level}`,
    name: L(`HSK ${level}`, `HSK ${level}`, `HSK ${level}`),
    category: "chinese",
    testLanguage: L("Хятад", "Chinese", "中文"),
    maximumScore: null,
    examPassScore: null,
  })),
  {
    id: "70000000-0000-4000-8000-000000000020",
    examinationId: id.examHskk,
    slug: "hskk",
    name: L("HSKK", "HSKK", "HSKK"),
    category: "chinese-speaking",
    testLanguage: L("Хятад", "Chinese", "中文"),
    maximumScore: null,
    examPassScore: null,
  },
  {
    id: "70000000-0000-4000-8000-000000000030",
    examinationId: id.examIelts,
    slug: "ielts-academic",
    name: L("IELTS Academic", "IELTS Academic", "雅思学术类"),
    category: "english",
    testLanguage: L("Англи", "English", "英文"),
    maximumScore: null,
    examPassScore: null,
  },
  {
    id: "70000000-0000-4000-8000-000000000040",
    examinationId: id.examToefl,
    slug: "toefl-ibt",
    name: L("TOEFL iBT", "TOEFL iBT", "托福 iBT"),
    category: "english",
    testLanguage: L("Англи", "English", "英文"),
    maximumScore: null,
    examPassScore: null,
  },
  {
    id: "70000000-0000-4000-8000-000000000050",
    examinationId: id.examDuolingo,
    slug: "duolingo",
    name: L("Duolingo English Test", "Duolingo English Test", "多邻国英语测试"),
    category: "english",
    testLanguage: L("Англи", "English", "英文"),
    maximumScore: null,
    examPassScore: null,
  },
  {
    id: "70000000-0000-4000-8000-000000000061",
    examinationId: id.examCsca,
    slug: "professional-chinese",
    name: L("Мэргэжлийн хятад хэл", "Professional Chinese", "专业中文"),
    category: "csca",
    testLanguage: L("Хятад", "Chinese", "中文"),
    maximumScore: null,
    examPassScore: null,
  },
  {
    id: "70000000-0000-4000-8000-000000000062",
    examinationId: id.examCsca,
    slug: "mathematics",
    name: L("Математик", "Mathematics", "数学"),
    category: "csca",
    testLanguage: null,
    maximumScore: null,
    examPassScore: null,
  },
  {
    id: "70000000-0000-4000-8000-000000000063",
    examinationId: id.examCsca,
    slug: "physics",
    name: L("Физик", "Physics", "物理"),
    category: "csca",
    testLanguage: null,
    maximumScore: null,
    examPassScore: null,
  },
  {
    id: "70000000-0000-4000-8000-000000000064",
    examinationId: id.examCsca,
    slug: "chemistry",
    name: L("Хими", "Chemistry", "化学"),
    category: "csca",
    testLanguage: null,
    maximumScore: null,
    examPassScore: null,
  },
  {
    id: "70000000-0000-4000-8000-000000000070",
    examinationId: id.examSat,
    slug: "sat",
    name: L("SAT", "SAT", "SAT"),
    category: "other",
    testLanguage: L("Англи", "English", "英文"),
    maximumScore: null,
    examPassScore: null,
  },
];

const sessionNote = L(
  "Огноог 2026-11-08-нд csca.cn нүүр хуудаснаас авсан. Элсэлтийн жилтэй нь албан ёсоор холбоогүй.",
  "Dates taken from the csca.cn homepage on 2026-11-08. Not officially tied to an admission year here.",
  "日期于 2026-11-08 取自 csca.cn 首页。此处未将其正式绑定到招生学年。",
);

export const examinationSessions: ExaminationSession[] = [
  {
    id: "71000000-0000-4000-8000-000000000001",
    examinationId: id.examCsca,
    academicYearId: null,
    startsOn: "2026-11-14",
    endsOn: "2026-11-15",
    registrationOpensOn: "2026-10-15",
    registrationClosesOn: "2026-10-21",
    note: L(
      "Бүртгэл хаагдсан гэж тухайн хуудас мэдээлсэн. Бүртгэлийн цаг: Бээжингийн цагаар 2026-10-15 15:00-оос 2026-10-21 23:59.",
      "The page said registration had closed. Registration window: 15:00 on 2026-10-15 to 23:59 on 2026-10-21, Beijing time.",
      "该页显示报名已结束。报名时间：北京时间 2026-10-15 15:00 至 2026-10-21 23:59。",
    ),
    sourceId: id.srcCsca,
  },
  ...[
    ["71000000-0000-4000-8000-000000000002", "2026-12-19", "2026-12-20"],
    ["71000000-0000-4000-8000-000000000003", "2027-01-23", "2027-01-24"],
    ["71000000-0000-4000-8000-000000000004", "2027-03-13", "2027-03-14"],
    ["71000000-0000-4000-8000-000000000005", "2027-04-24", "2027-04-25"],
    ["71000000-0000-4000-8000-000000000006", "2027-06-26", "2027-06-27"],
  ].map(([sessionId, startsOn, endsOn]) => ({
    id: sessionId,
    examinationId: id.examCsca,
    academicYearId: null,
    startsOn,
    endsOn,
    registrationOpensOn: null,
    registrationClosesOn: null,
    note: L(
      `${sessionNote.mn} Бүртгэл эхлээгүй гэж хуудас мэдээлсэн.`,
      `${sessionNote.en} The page said registration had not started.`,
      `${sessionNote.zh} 页面显示报名未开始。`,
    ),
    sourceId: id.srcCsca,
  })),
];

export const articles: Article[] = [
  {
    slug: "csca-exam",
    title: L("CSCA шалгалт", "The CSCA exam", "CSCA 考试"),
    description: L(
      "CSCA-ийн нийтлэгдсэн шалгалтын өдрүүд, судлагдахуун, хоосон үлдээсэн оноо.",
      "Published CSCA dates, subjects, and scores left empty on purpose.",
      "已公布的 CSCA 日期、科目，以及有意留空的分数。",
    ),
    updatedOn: "2026-11-08",
    paragraphs: {
      mn: [
        "CSCA нь Хятадын их сургуульд бакалаврт элсэхэд ашиглагдаж буй шалгалт. Албан сайт нь https://www.csca.cn/ юм.",
        "2026-11-08-нд нүүр хуудас дараах шалгалтын өдрүүдийг нийтэлсэн: 2026 оны 11 сарын 14–15, 12 сарын 19–20, 2027 оны 1 сарын 23–24, 3 сарын 13–14, 4 сарын 24–25, 6 сарын 26–27.",
        "11 сарын шалгалтын бүртгэл хаагдсан, бусад бүртгэл эхлээгүй гэж тэмдэглэсэн байсан. Бүртгэлийн дэлгэрэнгүй хугацааг зөвхөн 11 сарын шалгалт дээр харсан.",
        "Мэргэжлийн хятад хэл, математик, физик, химийг энэ платформ дээр судлагдахуунаар нь хадгална. Аль хөтөлбөр аль хичээлийг заавал авч, ямар оноо нэхдэгийг их сургууль тус бүр өөрөө заана. Нийтлэгдээгүй бол хоосон, дэлгэц дээр «Их сургууль тодорхойлоогүй» гэж харагдана.",
        "Энэ хуудас CSCA өгөхийг зөвлөж байгаа хэрэг биш. Тухайн хөтөлбөрийн албан нөхцөлийг уншина уу.",
      ],
      en: [
        "CSCA is an exam used for undergraduate admission to Chinese universities. The official site is https://www.csca.cn/.",
        "On 2026-11-08 the homepage listed these exam dates: 14–15 November 2026, 19–20 December 2026, 23–24 January 2027, 13–14 March 2027, 24–25 April 2027, and 26–27 June 2027.",
        "The November sitting was marked closed for registration. The others were marked not started. A full registration window was visible only for the November sitting.",
        "Professional Chinese, mathematics, physics, and chemistry are stored as subjects. Each program must say which subjects are required and what score is needed. Unpublished scores stay empty and read as not specified by the university.",
        "This page does not tell a student to take CSCA. Read the program's own official conditions.",
      ],
    },
  },
  {
    slug: "how-eligibility-works",
    title: L(
      "Элсэлтийн шалгуур хэрхэн ажилладаг",
      "How the eligibility check works",
      "资格核对如何工作",
    ),
    description: L(
      "Тохиролт, нэмэлт мэдээлэл, тохирохгүй гэсэн гурван үр дүн. Элсэлт батлахгүй.",
      "Three results: matches published rules, more information needed, or does not meet published rules. Not an offer.",
      "三种结果：符合已公布规则、需要更多信息、不符合已公布规则。不是录取。",
    ),
    updatedOn: "2026-11-08",
    paragraphs: {
      mn: [
        "Шалгагч сурагчийн нас, боловсрол, голч, хэл, CSCA-ийн оноог тухайн хөтөлбөр, тэтгэлгийн тухайн хичээлийн жилд нийтлэгдсэн тоотой жишиж үздэг.",
        "Нийтлэгдсэн тоо байхгүй бол тэнцсэн гэж үзэхгүй. «Нэмэлт мэдээлэл хэрэгтэй» гэж гарна. Дутуу оноог тэг гэж тооцохгүй.",
        "Сонголтот шалгалтыг өгөөгүй нь унагаах үндэслэл болохгүй.",
        "2026/2027 ба 2027/2028 оны нөхцөлийг холихгүй. Жил сонгоно.",
        "Үр дүн нь элсэлт, тэтгэлэг, виз батлагдсан гэсэн үг биш.",
      ],
      en: [
        "The checker compares age, education, GPA, language, and CSCA scores with the numbers published for that program or scholarship in the selected academic year.",
        "If no number is published, the result is not a pass. It is marked as needing more information. A missing score is not treated as zero.",
        "Skipping an optional exam is not a reason to fail.",
        "2026/2027 and 2027/2028 are never mixed. You pick the year.",
        "A result is not an admission, a scholarship, or a visa.",
      ],
    },
  },
  {
    slug: "national-and-university-scholarships",
    title: L(
      "Улсын тэтгэлэг ба их сургуулийн тэтгэлэг",
      "National scholarships and university scholarships",
      "国家奖学金与高校奖学金",
    ),
    description: L(
      "Хятадын засгийн газрын тэтгэлгийг их сургуулийн өөрийн дүрэмтэй холихгүй.",
      "The Chinese Government Scholarship is kept apart from each university's own rules.",
      "中国政府奖学金与各校自己的规则分开存放。",
    ),
    updatedOn: "2026-11-08",
    paragraphs: {
      mn: [
        "Хятадын засгийн газрын тэтгэлэг улсын хөтөлбөр. Campus China болон studyinchina.csc.edu.cn нь албан эхлэл.",
        "Их сургууль өөрийн тэтгэлэг, сургалтын төлбөрөөс чөлөөлөх, байр, сарын тэтгэмжээ тусад нь зарлана. Нэгийг нөгөөд нь хуулахгүй.",
        "Энэ каталогт тэтгэлгийг их сургууль, хөтөлбөртэй холбоогүй. Холбоо баталгаажаагүй бол «бүх сургуульд байна» гэж харуулахгүй.",
        "Төлбөр хаасан хувь, сарын мөнгө, даатгал, өргөдлийн хураамж, нээгдэх ба хаагдах огноо хоосон. Албан зар гармагц тухайн хичээлийн жил дээр нь оруулна.",
      ],
      en: [
        "The Chinese Government Scholarship is a national program. Campus China and studyinchina.csc.edu.cn are the official starting points.",
        "A university publishes its own scholarship, tuition waiver, housing, and stipend separately. One is not copied onto the other.",
        "Scholarships in this catalog are not linked to universities or programs. An unverified link is not shown as available everywhere.",
        "Coverage, stipend, insurance, fees, and dates are empty. They are added to that academic year when an official notice exists.",
      ],
    },
  },
];

export const catalog = {
  countries,
  provinces,
  cities,
  academicYears,
  sources,
  disciplines,
  universities,
  programs,
  academicRequirements,
  scholarships,
  scholarshipBenefits,
  scholarshipDeadlines,
  scholarshipUniversities,
  scholarshipPrograms,
  languageRequirements,
  examRequirements,
  examinations,
  examinationSubjects,
  examinationSessions,
  articles,
};

export type MarketplaceCatalog = typeof catalog;
