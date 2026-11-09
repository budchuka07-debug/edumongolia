import { publicScholarshipStatus, type StoredScholarshipStatus } from "@/lib/scholarships/status";
import { moreScholarships } from "@/lib/scholarships/more";

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
  scoreCardMn: string | null;
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
  ["eu", "Европын холбоо", "European Union"],
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
    scoreCardMn: "Нэг IELTS, TOEFL, SAT босго заагаагүй. Сургууль өөрөө тогтооно.",
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
    scoreCardMn: null,
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
  {
    slug: "turkiye-scholarships-2026",
    nameOriginal: "Türkiye Scholarships",
    nameMn: "Туркийн засгийн газрын тэтгэлэг",
    countryCode: "tr",
    sponsorMn: "Туркийн засгийн газрын тэтгэлгийн хөтөлбөр",
    sponsorOriginal: "Türkiye Scholarships",
    categories: ["Засгийн газрын тэтгэлэг", "Өндөр онооны өрсөлдөөн"],
    degrees: ["bachelor", "master", "doctoral", "language"],
    funding: ["full"],
    citizenships: ["2026 оны зар дээр олон улсын оюутан, бүх улсаас гэж бичсэн. Монгол иргэнийг тусад нь хассан заалт тэр зард алга."],
    majorsMn: "Бакалаврт инженер, нийгэм, эрүүл мэнд, суурь шинжлэх ухаан. Магистр, докторт нийгэм, хүмүүнлэг, байгалийн шинжлэх ухаан, инженер. Эрүүл мэндийн чиглэлд магистр, доктор олгохгүй.",
    excludedMajorsMn: "Магистр, докторын эрүүл мэндийн шинжлэх ухаан.",
    eligibilityMn: [
      "Өндөр амжилтын шалгуур нь тусдаа. Бакалаврт голч 90 хувь, түүн дээр SAT, IB, улсынхаа шалгалтын эхний 10, эсвэл олимпиадын медалиас нэгийг хангана.",
      "Энгийн өргөдөлд SAT, IELTS, TOEFL-ийг сонгосон сургууль шаардсан үед л хавсаргана.",
    ],
    ageMn: null,
    gpaMn: "Өндөр амжилтын бакалавр, магистр, докторт голч 90 хувь.",
    languageMn: "Өндөр амжилтын бакалавр: TOEFL iBT 80/120 эсвэл IELTS 6.5/9.0. Магистр: ALES тоон 80 инженер, 75 шинжлэх ухаан, тэнцүү жин 75 бусад, эсвэл GRE тоон 155 инженер, 153 бусад. Доктор: ALES тоон 85 инженер, 75 шинжлэх ухаан, тэнцүү жин 75 бусад, эсвэл GRE тоон 160 инженер, 157 бусад. Магистр, доктор: TOEFL iBT 90/120 эсвэл IELTS 7.0/9.0. Турк хэлний C1 байхгүй бол нэг жил турк хэл үзнэ. Англи хөтөлбөрт орсон хүн ч энэ жилд сууна.",
    scoreCardMn: "Бакалаврын өндөр амжилт: SAT 1400, математик 680, инженерийн чиглэл. Бусад чиглэлд SAT 1350. TOEFL iBT 80 эсвэл IELTS 6.5. Магистр, доктор: TOEFL iBT 90 эсвэл IELTS 7.0. GRE-ийн тоо тусдаа.",
    documentsMn: [
      "Хүчинтэй үнэмлэх эсвэл паспорт.",
      "Сүүлийн 1 жилд авхуулсан зураг.",
      "Диплом эсвэл түр төгссөн тодорхойлолт.",
      "Дүнгийн хуулбар.",
      "Сонгосон хөтөлбөр шаардвал SAT, GRE, GMAT, TOEFL, IELTS.",
      "Докторт судалгааны санал, бичсэн ажлын жишээ.",
    ],
    statementMn: null,
    tuitionMn: "Сургалтын төлбөрийг хамруулна гэж бүрэн цагийн хуудсанд бичсэн.",
    stipendMn: "Бакалавр сард 6,500 TL. Магистр сард 9,500 TL. Доктор сард 13,000 TL. Өндөр амжилтын тэтгэлэгт сарын мөнгө ердийн дүнгийн хоёр дахин.",
    accommodationMn: "Байрыг хамруулна гэж бичсэн. Түрээсийн дээд үнийг тусад нь заагаагүй.",
    insuranceMn: "Эрүүл мэндийн даатгалыг хамруулна гэж бичсэн. Дүнг тусад нь заагаагүй.",
    travelMn: "Сургалт эхлэхэд болон төгсөхөд нэг удаагийн онгоцны тийз.",
    otherBenefitsMn: "Их сургууль, хөтөлбөрт байршуулна. Турк хэлний нэг жилийн курс.",
    excludedMn: null,
    opensAt: "2026-01-10T00:00:00Z",
    closesAt: "2026-02-21T00:00:00Z",
    timezone: null,
    academicYear: "2026",
    nextAnnounced: false,
    storedStatus: "verified",
    selectionMn: "Өргөдлийг TBBS системээр авна. 2026 онд нэг үе, 1 сарын 10-оос 2 сарын 20.",
    interviewMn: null,
    applicationUrl: "https://tbbs.turkiyeburslari.gov.tr/",
    guidelineUrl: "https://turkiyeburslari.gov.tr/fulltimeprograms",
    contactMn: null,
    officialSourceUrl: "https://www.turkiyeburslari.gov.tr/announcements/turkiye-scholarships-2026-applications-121",
    sourceType: "government_portal",
    lastVerifiedAt: "2026-11-09",
    verifierNotesMn: "2026 оны зар болон бүрэн цагийн хуудсыг 2026-11-09-нд уншсан. Хуудсан дээр жил бүрийн цонх 1 сарын 10-оос 2 сарын 20 гэж бичсэн. 2027 оны тусдаа зарыг баталгаажуулаагүй. Цагийг зар дээр заагаагүй.",
  },
  {
    slug: "chevening-mongolia-2027-2028",
    nameOriginal: "Chevening Scholarship",
    nameMn: "Их Британийн Chevening тэтгэлэг, Монгол",
    countryCode: "gb",
    sponsorMn: "Их Британийн Гадаад, хамтын нөхөрлөл, хөгжлийн алба болон хамтрагч байгууллагууд",
    sponsorOriginal: "UK Foreign, Commonwealth and Development Office",
    categories: ["Засгийн газрын тэтгэлэг", "Бүрэн санхүүжилт", "Магистр"],
    degrees: ["master"],
    funding: ["full"],
    citizenships: ["Монгол Улсын Chevening хуудас бий. 2027/2028 оны өргөдөл хаагдсан гэж тэр хуудсанд бичсэн."],
    majorsMn: "Их Британийн нэг жилийн магистрын гурван хөтөлбөр сонгоно. Чиглэлийн хаалттай жагсаалтыг энэ хуудсанд хуулаагүй.",
    excludedMajorsMn: null,
    eligibilityMn: [
      "Бакалаврын зэрэг авсан байх. Сүүлийн курст байгаа хүн өргөдөл гаргахгүй.",
      "Бакалавраа төгссөний дараах ажил эрхлэлт хамгийн багадаа хоёр жил, эсвэл 2,800 цаг. Өргөдөл илгээхээс өмнө хангасан байх.",
      "Ажил нь бүрэн, хагас цаг, сайн дурынх, цалинтай эсвэл цалингүй дадлага байж болно.",
    ],
    ageMn: null,
    gpaMn: null,
    languageMn: "Chevening 2020 оноос өөрийн англи хэлний шалгалтын болзлоо хассан. IELTS, TOEFL-ийн нэг босгыг Chevening заахгүй. Сонгосон их сургууль өөрийн англи хэлний болзлоо тавина. Өргөдлийн маягтыг англиар бөглөнө.",
    scoreCardMn: "Chevening IELTS, TOEFL, SAT-ын нэг босго заахгүй. Өндөр англи хэл нь өргөдөл, ярилцлага, их сургуулийн болзолд хэрэгтэй. Их сургуулийн оноог тухайн хөтөлбөрөөс нь шалгана.",
    documentsMn: [
      "Ярилцлагад уригдвал ярилцлагаас ажлын долоо хоногоос өмнө зургийн үнэмлэх, бакалаврын үнэмлэх, тодорхойлолт оруулна.",
      "Ярилцлагад тэнцвэл 2027 оны 7 сарын 8, Их Британийн цагаар 17:00 гэхэд нэг болзолгүй элсэлтийн санал өгнө.",
    ],
    statementMn: "Өргөдлийг өөрөө англиар бичнэ. Хиймэл оюун ухаанаар бичүүлсэн хариуг хориглоно.",
    tuitionMn: "Бүрэн санхүүжилттэй гэж албан хуудсанд бичсэн. Сургалтын төлбөрийн тусдаа дүнг энд хуулаагүй.",
    stipendMn: null,
    accommodationMn: null,
    insuranceMn: null,
    travelMn: null,
    otherBenefitsMn: null,
    excludedMn: "Сарын мөнгө, байр, нислэгийн дүнг энэ хуудсанд албан эхээс хуулаагүй.",
    opensAt: null,
    closesAt: null,
    timezone: "UTC",
    academicYear: "2027/2028",
    nextAnnounced: false,
    storedStatus: "closed",
    selectionMn: "Эхлээд шалгуур. Дараа нь уншлагын хороо. Дараа нь элчин сайдын яам ярилцлагад урина. Ярилцлага 2027 оны 3–4 сард. Дүн 6 сарын дундаас. Ерөнхий хуваарьт өргөдөл 2026 оны 10 сард, 11:00 UTC хаагдана. Монголын өдрийг тусад нь заагаагүй.",
    interviewMn: "Ярилцлага Их Британийн элчин сайдын яам эсвэл дээд комисст. 2027 оны 2 сарын дундаас урилга.",
    applicationUrl: "https://www.chevening.org/scholarship/mongolia/",
    guidelineUrl: "https://www.chevening.org/scholarships/application-timeline/",
    contactMn: null,
    officialSourceUrl: "https://www.chevening.org/scholarship/mongolia/",
    sourceType: "government_portal",
    lastVerifiedAt: "2026-11-09",
    verifierNotesMn: "Монголын хуудас, цагийн хуваарь, англи хэлний түгээмэл асуултыг 2026-11-09-нд уншсан. Монголын хаах өдрийг тусад нь заагаагүй. 10 сард хаагдана, 11:00 UTC гэж ерөнхий хуваарьт бичсэн. Сарын мөнгөний дүнг хуулаагүй.",
  },
  ...moreScholarships,
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
