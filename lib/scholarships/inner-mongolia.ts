/** Inner Mongolia Government Scholarship, kept separate from CSC and other awards.
 * Quota and age lines are the previous 2026/2027 cycle only.
 * Chinese names and cities are the MOE list as of 2026-06-17.
 * A website is included only when that homepage was opened on 2026-11-08 and its title matched the school.
 */

export const innerMongoliaScholarshipPath = "/china-scholarships/inner-mongolia-government";

export const innerMongoliaDraftKey = "edumongolia-im-scholarship-draft";

export type InnerMongoliaUniversity = {
  nameEn: string;
  nameZh: string;
  nameMn: string;
  cityZh: string;
  cityMn: string;
  code: string;
  website: string | null;
};

export const innerMongoliaUniversities: InnerMongoliaUniversity[] = [
  {
    nameEn: "Inner Mongolia University",
    nameZh: "内蒙古大学",
    nameMn: "Өвөр Монголын их сургууль",
    cityZh: "呼和浩特市",
    cityMn: "Хөх хот",
    code: "4115010126",
    website: "https://www.imu.edu.cn/",
  },
  {
    nameEn: "Inner Mongolia Normal University",
    nameZh: "内蒙古师范大学",
    nameMn: "Өвөр Монголын багшийн их сургууль",
    cityZh: "呼和浩特市",
    cityMn: "Хөх хот",
    code: "4115010135",
    website: "https://www.imnu.edu.cn/",
  },
  {
    nameEn: "Inner Mongolia Agricultural University",
    nameZh: "内蒙古农业大学",
    nameMn: "Өвөр Монголын хөдөө аж ахуйн их сургууль",
    cityZh: "呼和浩特市",
    cityMn: "Хөх хот",
    code: "4115010129",
    website: "https://www.imau.edu.cn/",
  },
  {
    nameEn: "Inner Mongolia University of Technology",
    nameZh: "内蒙古工业大学",
    nameMn: "Өвөр Монголын технологийн их сургууль",
    cityZh: "呼和浩特市",
    cityMn: "Хөх хот",
    code: "4115010128",
    website: "https://www.imut.edu.cn/",
  },
  {
    nameEn: "Inner Mongolia Minzu University",
    nameZh: "内蒙古民族大学",
    nameMn: "Өвөр Монголын үндэстний их сургууль",
    cityZh: "通辽市",
    cityMn: "Тунляо",
    code: "4115010136",
    website: null,
  },
  {
    nameEn: "Inner Mongolia University of Science and Technology",
    nameZh: "内蒙古科技大学",
    nameMn: "Өвөр Монголын шинжлэх ухаан, технологийн их сургууль",
    cityZh: "包头市",
    cityMn: "Баотоу",
    code: "4115010127",
    website: "https://www.imust.edu.cn/",
  },
  {
    nameEn: "Inner Mongolia Medical University",
    nameZh: "内蒙古医科大学",
    nameMn: "Өвөр Монголын анагаахын их сургууль",
    cityZh: "呼和浩特市",
    cityMn: "Хөх хот",
    code: "4115010132",
    website: null,
  },
  {
    nameEn: "Inner Mongolia University of Finance and Economics",
    nameZh: "内蒙古财经大学",
    nameMn: "Өвөр Монголын санхүү, эдийн засгийн их сургууль",
    cityZh: "呼和浩特市",
    cityMn: "Хөх хот",
    code: "4115010139",
    website: null,
  },
  {
    nameEn: "Chifeng University",
    nameZh: "赤峰大学",
    nameMn: "Улаанхадын их сургууль",
    cityZh: "赤峰市",
    cityMn: "Улаанхад",
    code: "4115010138",
    website: null,
  },
];

export const innerMongoliaPublishedStatus = {
  previousCycle: "2026/2027",
  previousStateMn: "хаагдсан",
  nextCycle: "2027/2028",
  nextStateMn: "зар хүлээгдэж байна",
  opensOn: null as string | null,
  closesOn: null as string | null,
};

export type InnerMongoliaDraft = {
  academicYear: string;
  opensOn: string;
  closesOn: string;
  quotaTotal: string;
  quotaBachelor: string;
  quotaMaster: string;
  quotaDoctoral: string;
};

export const emptyInnerMongoliaDraft: InnerMongoliaDraft = {
  academicYear: "",
  opensOn: "",
  closesOn: "",
  quotaTotal: "",
  quotaBachelor: "",
  quotaMaster: "",
  quotaDoctoral: "",
};
