/** DongXueJi public study-abroad catalog, checked 2026-11-08.
 * Partner: 重庆东学稷文化传播有限公司, https://www.dongxueji.cn/study-abroad
 * Schools are the public university directory plus every school that has a listed program.
 * Language scores, GPA, age, and CSCA minimums were empty on every program, so they are not stored.
 * Tuition period (year or whole program) is not stated by the source.
 */
export type DongxuejiMajor = {
  name: string;
  language: string;
  years: number | null;
  tuitionCny: number | null;
};

export type DongxuejiProgram = {
  id: number;
  name: string;
  degree: string;
  language: string;
  award: string | null;
  opens: string;
  closes: string;
  seats: number | null;
  applicationFeeCny: number | null;
  tuitionCny: number | null;
  majors: DongxuejiMajor[];
  figuresWithheld: boolean;
  url: string;
};

export type DongxuejiUniversity = {
  id: number;
  slug: string;
  nameEn: string;
  nameZh: string;
  provinceEn: string;
  provinceZh: string;
  provinceMn: string;
  cityEn: string;
  cityZh: string;
  partnerUrl: string;
  programs: DongxuejiProgram[];
};

export const dongxuejiSource = {
  listUrl: "https://www.dongxueji.cn/study-abroad",
  checkedOn: "2026-11-08",
  partner: "重庆东学稷文化传播有限公司",
};

export const dongxuejiUniversities: DongxuejiUniversity[] = [
  {
    "id": 37,
    "nameEn": "Anhui Agricultural University",
    "nameZh": "安徽农业大学",
    "provinceEn": "Anhui",
    "cityEn": "Hefei",
    "provinceZh": "安徽省",
    "cityZh": "合肥市",
    "provinceMn": "Аньхуй",
    "slug": "anhui-agricultural-university",
    "partnerUrl": "https://www.dongxueji.cn/university/37",
    "programs": [
      {
        "id": 354,
        "name": "27th Autumn Anhui Agricultural University Master's CSC National Scholarship",
        "degree": "Master",
        "language": "English",
        "award": "Anhui Agricultural University National Scholarship (CSC Type B)",
        "opens": "2026/11/05",
        "closes": "2027/02/20",
        "seats": 5,
        "applicationFeeCny": null,
        "tuitionCny": 25000,
        "majors": [
          {
            "name": "Tea Science",
            "language": "English",
            "years": 3,
            "tuitionCny": 25000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/354"
      },
      {
        "id": 353,
        "name": "Anhui Agricultural University Undergraduate Program (Anhui Provincial Government Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese",
        "award": "Anhui Agricultural University Provincial Government Scholarship",
        "opens": "2026/11/05",
        "closes": "2027/06/30",
        "seats": 40,
        "applicationFeeCny": null,
        "tuitionCny": 16000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 16000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/353"
      }
    ]
  },
  {
    "id": 152,
    "nameEn": "Anhui Finance and Trade Vocational College",
    "nameZh": "安徽财贸职业学院",
    "provinceEn": "Anhui",
    "cityEn": "Hefei",
    "provinceZh": "安徽省",
    "cityZh": "合肥市",
    "provinceMn": "Аньхуй",
    "slug": "anhui-finance-and-trade-vocational-college",
    "partnerUrl": "https://www.dongxueji.cn/university/152",
    "programs": []
  },
  {
    "id": 358,
    "nameEn": "Anhui Normal University",
    "nameZh": "安徽师范大学",
    "provinceEn": "Anhui",
    "cityEn": "Hefei",
    "provinceZh": "安徽省",
    "cityZh": "合肥市",
    "provinceMn": "Аньхуй",
    "slug": "anhui-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/358",
    "programs": [
      {
        "id": 259,
        "name": "Anhui Normal University Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Anhui Normal University President's Scholarship",
        "opens": "2026/10/27",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/259"
      }
    ]
  },
  {
    "id": 394,
    "nameEn": "Anhui Polytechnic University",
    "nameZh": "安徽工程大学",
    "provinceEn": "Anhui",
    "cityEn": "Wuhu",
    "provinceZh": "安徽省",
    "cityZh": "芜湖市",
    "provinceMn": "Аньхуй",
    "slug": "anhui-polytechnic-university",
    "partnerUrl": "https://www.dongxueji.cn/university/394",
    "programs": [
      {
        "id": 358,
        "name": "27th Autumn Anhui Engineering Master's School Award",
        "degree": "Master",
        "language": "English",
        "award": "Anhui Polytechnic University President's Scholarship",
        "opens": "2026/11/05",
        "closes": "2027/06/20",
        "seats": 25,
        "applicationFeeCny": null,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "international business",
            "language": "English",
            "years": 3,
            "tuitionCny": 20000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/358"
      }
    ]
  },
  {
    "id": 148,
    "nameEn": "Anhui University",
    "nameZh": "安徽大学",
    "provinceEn": "Anhui",
    "cityEn": "Hefei",
    "provinceZh": "安徽省",
    "cityZh": "合肥市",
    "provinceMn": "Аньхуй",
    "slug": "anhui-university",
    "partnerUrl": "https://www.dongxueji.cn/university/148",
    "programs": [
      {
        "id": 288,
        "name": "Undergraduate Program (Institutional Scholarship) — Anhui University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Anhui University President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/288"
      }
    ]
  },
  {
    "id": 153,
    "nameEn": "Anhui University of Arts",
    "nameZh": "安徽艺术学院",
    "provinceEn": "Anhui",
    "cityEn": "Hefei",
    "provinceZh": "安徽省",
    "cityZh": "合肥市",
    "provinceMn": "Аньхуй",
    "slug": "anhui-university-of-arts",
    "partnerUrl": "https://www.dongxueji.cn/university/153",
    "programs": []
  },
  {
    "id": 154,
    "nameEn": "Anhui University of Science and Technology",
    "nameZh": "安徽理工大学",
    "provinceEn": "Anhui",
    "cityEn": "Huainan",
    "provinceZh": "安徽省",
    "cityZh": "淮南市",
    "provinceMn": "Аньхуй",
    "slug": "anhui-university-of-science-and-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/154",
    "programs": [
      {
        "id": 286,
        "name": "Anhui University of Science and Technology Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Anhui University of Science and Technology President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 20000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/286"
      }
    ]
  },
  {
    "id": 287,
    "nameEn": "Anshun University",
    "nameZh": "安顺学院",
    "provinceEn": "Guizhou",
    "cityEn": "Anshun",
    "provinceZh": "贵州省",
    "cityZh": "安顺市",
    "provinceMn": "Гүйжоу",
    "slug": "anshun-university",
    "partnerUrl": "https://www.dongxueji.cn/university/287",
    "programs": []
  },
  {
    "id": 386,
    "nameEn": "Baise University",
    "nameZh": "百色学院",
    "provinceEn": "Guangxi",
    "cityEn": "Baise",
    "provinceZh": "广西壮族自治区",
    "cityZh": "百色市",
    "provinceMn": "Гуанси",
    "slug": "baise-university",
    "partnerUrl": "https://www.dongxueji.cn/university/386",
    "programs": []
  },
  {
    "id": 357,
    "nameEn": "Beijing Foreign Studies University",
    "nameZh": "北京外国语大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "beijing-foreign-studies-university",
    "partnerUrl": "https://www.dongxueji.cn/university/357",
    "programs": [
      {
        "id": 261,
        "name": "Undergraduate Program (Institutional Scholarship) — Beijing Foreign Studies University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Beijing Foreign Studies University President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/29",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 39900,
        "majors": [
          {
            "name": "Business Administration",
            "language": "English",
            "years": 4,
            "tuitionCny": 39900
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/261"
      }
    ]
  },
  {
    "id": 293,
    "nameEn": "Beijing Forestry University",
    "nameZh": "北京林业大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "beijing-forestry-university",
    "partnerUrl": "https://www.dongxueji.cn/university/293",
    "programs": [
      {
        "id": 338,
        "name": "Beijing Forestry University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Beijing Forestry University President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 24800,
        "majors": [
          {
            "name": "Business Administration",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 24800
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/338"
      }
    ]
  },
  {
    "id": 165,
    "nameEn": "Beijing Institute of Fashion Technology",
    "nameZh": "北京服装学院",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "beijing-institute-of-fashion-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/165",
    "programs": [
      {
        "id": 279,
        "name": "Undergraduate Program (Institutional Scholarship) — Beijing Institute of Fashion Technology, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Beijing Institute of Fashion Technology President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 36000,
        "majors": [
          {
            "name": "Business Administration",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 36000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/279"
      }
    ]
  },
  {
    "id": 219,
    "nameEn": "Beijing Institute of Graphic Communication",
    "nameZh": "北京印刷学院",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "beijing-institute-of-graphic-communication",
    "partnerUrl": "https://www.dongxueji.cn/university/219",
    "programs": [
      {
        "id": 308,
        "name": "Beijing Institute of Graphic Communication Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Beijing Institute of Graphic Communication President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 16000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 16000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/308"
      }
    ]
  },
  {
    "id": 30,
    "nameEn": "Beijing Institute of Petrochemical Technology",
    "nameZh": "北京石油化工学院",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "beijing-institute-of-petrochemical-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/30",
    "programs": []
  },
  {
    "id": 163,
    "nameEn": "Beijing International Studies University",
    "nameZh": "北京第二外国语大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "beijing-international-studies-university-163",
    "partnerUrl": "https://www.dongxueji.cn/university/163",
    "programs": [
      {
        "id": 281,
        "name": "Undergraduate Program (Institutional Scholarship) — Beijing International Studies University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Beijing International Studies University President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 22000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 22000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/281"
      }
    ]
  },
  {
    "id": 391,
    "nameEn": "Beijing No.39 Middle School",
    "nameZh": "北京市第三十九中学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "beijing-no-39-middle-school",
    "partnerUrl": "https://www.dongxueji.cn/university/391",
    "programs": []
  },
  {
    "id": 28,
    "nameEn": "Beijing University of Chemical Technology",
    "nameZh": "北京化工大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "beijing-university-of-chemical-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/28",
    "programs": []
  },
  {
    "id": 164,
    "nameEn": "Beijing University of Technology",
    "nameZh": "北京工业大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "beijing-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/164",
    "programs": [
      {
        "id": 280,
        "name": "Undergraduate Program (Institutional Scholarship) — Beijing University of Technology, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Beijing University of Technology President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 25000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 25000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/280"
      }
    ]
  },
  {
    "id": 269,
    "nameEn": "Capital Medical University",
    "nameZh": "首都医科大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "capital-medical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/269",
    "programs": [
      {
        "id": 344,
        "name": "Capital Medical University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Capital Medical University President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 42000,
        "majors": [
          {
            "name": "Clinical Medicine",
            "language": "Chinese",
            "years": 5,
            "tuitionCny": 42000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/344"
      }
    ]
  },
  {
    "id": 235,
    "nameEn": "Capital Normal University",
    "nameZh": "首都师范大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "capital-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/235",
    "programs": [
      {
        "id": 300,
        "name": "Undergraduate Program (Institutional Scholarship) — Capital Normal University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Capital Normal University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 23600,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 23600
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/300"
      }
    ]
  },
  {
    "id": 24,
    "nameEn": "Capital University of Economics and Business",
    "nameZh": "首都经济贸易大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "capital-university-of-economics-and-business",
    "partnerUrl": "https://www.dongxueji.cn/university/24",
    "programs": []
  },
  {
    "id": 192,
    "nameEn": "Central China Normal University",
    "nameZh": "华中师范大学",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "central-china-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/192",
    "programs": [
      {
        "id": 318,
        "name": "Central China Normal University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Central China Normal University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/318"
      }
    ]
  },
  {
    "id": 311,
    "nameEn": "Central South University",
    "nameZh": "中南大学",
    "provinceEn": "Hunan",
    "cityEn": "Changsha",
    "provinceZh": "湖南省",
    "cityZh": "长沙市",
    "provinceMn": "Хунань",
    "slug": "central-south-university",
    "partnerUrl": "https://www.dongxueji.cn/university/311",
    "programs": [
      {
        "id": 325,
        "name": "Central South University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Central South University President’s Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 20000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/325"
      }
    ]
  },
  {
    "id": 158,
    "nameEn": "Central University of Finance and Economics",
    "nameZh": "中央财经大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "central-university-of-finance-and-economics",
    "partnerUrl": "https://www.dongxueji.cn/university/158",
    "programs": [
      {
        "id": 285,
        "name": "Central University of Finance and Economics Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "President's Scholarship of the Central University of Finance and Economics",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 25000,
        "majors": [
          {
            "name": "Business Administration",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 25000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/285"
      }
    ]
  },
  {
    "id": 79,
    "nameEn": "Chang'An University",
    "nameZh": "长安大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "chang-an-university",
    "partnerUrl": "https://www.dongxueji.cn/university/79",
    "programs": [
      {
        "id": 245,
        "name": "Master's Degree Program (Institutional Scholarship) — Chang'an University, Autumn 2027 Intake",
        "degree": "Master",
        "language": "Chinese and English",
        "award": "Chang'an University President's Scholarship",
        "opens": "2026/10/21",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": null,
        "tuitionCny": 21000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "English",
            "years": 3,
            "tuitionCny": 21000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/245"
      }
    ]
  },
  {
    "id": 146,
    "nameEn": "Changde Vocational Technical College",
    "nameZh": "常德职业技术学院",
    "provinceEn": "Hunan",
    "cityEn": "Changde",
    "provinceZh": "湖南省",
    "cityZh": "常德市",
    "provinceMn": "Хунань",
    "slug": "changde-vocational-technical-college",
    "partnerUrl": "https://www.dongxueji.cn/university/146",
    "programs": []
  },
  {
    "id": 344,
    "nameEn": "Changzhou Vocational Institute of Textile and Garment",
    "nameZh": "常州纺织服装职业技术学院",
    "provinceEn": "Jiangsu",
    "cityEn": "Changzhou",
    "provinceZh": "江苏省",
    "cityZh": "常州市",
    "provinceMn": "Жянсү",
    "slug": "changzhou-vocational-institute-of-textile-and-garment",
    "partnerUrl": "https://www.dongxueji.cn/university/344",
    "programs": []
  },
  {
    "id": 43,
    "nameEn": "Chaohu University",
    "nameZh": "巢湖学院",
    "provinceEn": "Anhui",
    "cityEn": "Hefei",
    "provinceZh": "安徽省",
    "cityZh": "合肥市",
    "provinceMn": "Аньхуй",
    "slug": "chaohu-university",
    "partnerUrl": "https://www.dongxueji.cn/university/43",
    "programs": []
  },
  {
    "id": 113,
    "nameEn": "Chengde Medical College",
    "nameZh": "承德医学院",
    "provinceEn": "Hebei",
    "cityEn": "Chengde",
    "provinceZh": "河北省",
    "cityZh": "承德市",
    "provinceMn": "Хэбэй",
    "slug": "chengde-medical-college",
    "partnerUrl": "https://www.dongxueji.cn/university/113",
    "programs": []
  },
  {
    "id": 194,
    "nameEn": "Chengdu Technological University",
    "nameZh": "成都工业学院",
    "provinceEn": "Sichuan",
    "cityEn": "Chengdu",
    "provinceZh": "四川省",
    "cityZh": "成都市",
    "provinceMn": "Сычуань",
    "slug": "chengdu-technological-university",
    "partnerUrl": "https://www.dongxueji.cn/university/194",
    "programs": [
      {
        "id": 317,
        "name": "Chengdu Technological University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Chengdu Technological University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 16000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese and English",
            "years": 4,
            "tuitionCny": 16000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/317"
      }
    ]
  },
  {
    "id": 267,
    "nameEn": "Chengdu University",
    "nameZh": "成都大学",
    "provinceEn": "Sichuan",
    "cityEn": "Chengdu",
    "provinceZh": "四川省",
    "cityZh": "成都市",
    "provinceMn": "Сычуань",
    "slug": "chengdu-university",
    "partnerUrl": "https://www.dongxueji.cn/university/267",
    "programs": [
      {
        "id": 346,
        "name": "Chengdu University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Chengdu University President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 14000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 14000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/346"
      }
    ]
  },
  {
    "id": 222,
    "nameEn": "China Foreign Affairs University",
    "nameZh": "北京外交学院",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "china-foreign-affairs-university-222",
    "partnerUrl": "https://www.dongxueji.cn/university/222",
    "programs": [
      {
        "id": 307,
        "name": "China Foreign Affairs University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "China Foreign Affairs University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 24000,
        "majors": [
          {
            "name": "International Economics and Trade",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 24000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/307"
      }
    ]
  },
  {
    "id": 310,
    "nameEn": "China Medical University",
    "nameZh": "中国医科大学",
    "provinceEn": "Liaoning",
    "cityEn": "Shenyang",
    "provinceZh": "辽宁省",
    "cityZh": "沈阳市",
    "provinceMn": "Ляонин",
    "slug": "china-medical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/310",
    "programs": []
  },
  {
    "id": 122,
    "nameEn": "China Pharmaceutical University",
    "nameZh": "中国药科大学",
    "provinceEn": "Jiangsu",
    "cityEn": "Nanjing",
    "provinceZh": "江苏省",
    "cityZh": "南京市",
    "provinceMn": "Жянсү",
    "slug": "china-pharmaceutical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/122",
    "programs": [
      {
        "id": 297,
        "name": "China Pharmaceutical University Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "President's Scholarship of China Pharmaceutical University",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 19000,
        "majors": [
          {
            "name": "Business Administration",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 19000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/297"
      }
    ]
  },
  {
    "id": 356,
    "nameEn": "China Three Gorges University",
    "nameZh": "三峡大学",
    "provinceEn": "Hubei",
    "cityEn": "Yichang",
    "provinceZh": "湖北省",
    "cityZh": "宜昌市",
    "provinceMn": "Хүбэй",
    "slug": "china-three-gorges-university",
    "partnerUrl": "https://www.dongxueji.cn/university/356",
    "programs": [
      {
        "id": 262,
        "name": "Undergraduate Program (Institutional Scholarship) — China Three Gorges University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "China Three Gorges University President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "Civil Engineering",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/262"
      }
    ]
  },
  {
    "id": 355,
    "nameEn": "China University of Geosciences (Wuhan)",
    "nameZh": "中国地质大学（武汉）",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "china-university-of-geosciences-wuhan",
    "partnerUrl": "https://www.dongxueji.cn/university/355",
    "programs": [
      {
        "id": 263,
        "name": "Undergraduate Program (Institutional Scholarship) — China University of Geosciences (Wuhan), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "China University of Geosciences (Wuhan) President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 18000,
        "majors": [
          {
            "name": "Business Administration",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 18000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/263"
      }
    ]
  },
  {
    "id": 342,
    "nameEn": "China University of Petroleum (Beijing)",
    "nameZh": "中国石油大学（北京）",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "china-university-of-petroleum-beijing",
    "partnerUrl": "https://www.dongxueji.cn/university/342",
    "programs": [
      {
        "id": 267,
        "name": "China University of Petroleum (Beijing) Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "China University of Petroleum (Beijing) President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 25000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "English",
            "years": 4,
            "tuitionCny": 25000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/267"
      }
    ]
  },
  {
    "id": 21,
    "nameEn": "China University of Petroleum (East China)",
    "nameZh": "中国石油大学（华东）",
    "provinceEn": "Shandong",
    "cityEn": "Qingdao",
    "provinceZh": "山东省",
    "cityZh": "青岛市",
    "provinceMn": "Шаньдун",
    "slug": "china-university-of-petroleum-east-china",
    "partnerUrl": "https://www.dongxueji.cn/university/21",
    "programs": [
      {
        "id": 237,
        "name": "China University of Petroleum (East China) Self-Funded Pre-University Foundation Program, Spring 2027",
        "degree": "Preparatory program",
        "language": "English",
        "award": null,
        "opens": "2026/10/15",
        "closes": "2026/12/31",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": null,
        "majors": [],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/237"
      },
      {
        "id": 252,
        "name": "China University of Petroleum (East China) University Preparatory Program (Self-Funded), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": null,
        "opens": "2026/10/27",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 18000,
        "majors": [
          {
            "name": "Geology",
            "language": "English",
            "years": 4,
            "tuitionCny": 18000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/252"
      }
    ]
  },
  {
    "id": 193,
    "nameEn": "China West Normal University",
    "nameZh": "西华师范大学",
    "provinceEn": "Sichuan",
    "cityEn": "Nanchong",
    "provinceZh": "四川省",
    "cityZh": "南充市",
    "provinceMn": "Сычуань",
    "slug": "china-west-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/193",
    "programs": []
  },
  {
    "id": 93,
    "nameEn": "Chongqing Information Technology College",
    "nameZh": "重庆信息技术职业学院",
    "provinceEn": "Chongqing",
    "cityEn": "Chongqing",
    "provinceZh": "重庆",
    "cityZh": "重庆市",
    "provinceMn": "Чунцин",
    "slug": "chongqing-information-technology-college",
    "partnerUrl": "https://www.dongxueji.cn/university/93",
    "programs": []
  },
  {
    "id": 218,
    "nameEn": "Chongqing Jiaotong University",
    "nameZh": "重庆交通大学",
    "provinceEn": "Chongqing",
    "cityEn": "Chongqing",
    "provinceZh": "重庆",
    "cityZh": "重庆市",
    "provinceMn": "Чунцин",
    "slug": "chongqing-jiaotong-university",
    "partnerUrl": "https://www.dongxueji.cn/university/218",
    "programs": [
      {
        "id": 309,
        "name": "Chongqing Jiaotong University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Chongqing Jiaotong University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "International Economics and Trade",
            "language": "English",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/309"
      }
    ]
  },
  {
    "id": 157,
    "nameEn": "Chongqing Medical University",
    "nameZh": "重庆医科大学",
    "provinceEn": "Chongqing",
    "cityEn": "Chongqing",
    "provinceZh": "重庆",
    "cityZh": "重庆市",
    "provinceMn": "Чунцин",
    "slug": "chongqing-medical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/157",
    "programs": [
      {
        "id": 236,
        "name": "Chongqing Medical University Pre-University Foundation Program (Self-Funded), Spring 2027",
        "degree": "Preparatory program",
        "language": "English",
        "award": null,
        "opens": "2026/10/15",
        "closes": "2027/01/15",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": null,
        "majors": [],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/236"
      }
    ]
  },
  {
    "id": 175,
    "nameEn": "Chongqing Modern Manufacturing Vocational College",
    "nameZh": "重庆现代制造职业学院",
    "provinceEn": "Chongqing",
    "cityEn": "Chongqing",
    "provinceZh": "重庆",
    "cityZh": "重庆市",
    "provinceMn": "Чунцин",
    "slug": "chongqing-modern-manufacturing-vocational-college",
    "partnerUrl": "https://www.dongxueji.cn/university/175",
    "programs": []
  },
  {
    "id": 91,
    "nameEn": "Chongqing Normal University",
    "nameZh": "重庆师范大学",
    "provinceEn": "Chongqing",
    "cityEn": "Chongqing",
    "provinceZh": "重庆",
    "cityZh": "重庆市",
    "provinceMn": "Чунцин",
    "slug": "chongqing-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/91",
    "programs": []
  },
  {
    "id": 20,
    "nameEn": "Chongqing Technology and Business University",
    "nameZh": "重庆工商大学",
    "provinceEn": "Chongqing",
    "cityEn": "Chongqing",
    "provinceZh": "重庆",
    "cityZh": "重庆市",
    "provinceMn": "Чунцин",
    "slug": "chongqing-technology-and-business-university",
    "partnerUrl": "https://www.dongxueji.cn/university/20",
    "programs": [
      {
        "id": 330,
        "name": "Chongqing Technology and Business University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Chongqing Technology and Business University President’s Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "Business Administration",
            "language": "English",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/330"
      }
    ]
  },
  {
    "id": 89,
    "nameEn": "Chongqing University of Posts and Telecommunications",
    "nameZh": "重庆邮电大学",
    "provinceEn": "Chongqing",
    "cityEn": "Chongqing",
    "provinceZh": "重庆",
    "cityZh": "重庆市",
    "provinceMn": "Чунцин",
    "slug": "chongqing-university-of-posts-and-telecommunications",
    "partnerUrl": "https://www.dongxueji.cn/university/89",
    "programs": []
  },
  {
    "id": 92,
    "nameEn": "Chongqing University of Science and Technology",
    "nameZh": "重庆科技大学",
    "provinceEn": "Chongqing",
    "cityEn": "Chongqing",
    "provinceZh": "重庆",
    "cityZh": "重庆市",
    "provinceMn": "Чунцин",
    "slug": "chongqing-university-of-science-and-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/92",
    "programs": []
  },
  {
    "id": 296,
    "nameEn": "Chongqing University of Technology",
    "nameZh": "重庆理工大学",
    "provinceEn": "Chongqing",
    "cityEn": "Chongqing",
    "provinceZh": "重庆",
    "cityZh": "重庆市",
    "provinceMn": "Чунцин",
    "slug": "chongqing-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/296",
    "programs": [
      {
        "id": 333,
        "name": "Chongqing University of Technology Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Chongqing University of Technology President’s Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "International Economics and Trade",
            "language": "English",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/333"
      }
    ]
  },
  {
    "id": 118,
    "nameEn": "College of Arts & Information Engineering,Dalian Polytechnic University",
    "nameZh": "大连工业大学艺术与信息工程学院",
    "provinceEn": "Liaoning",
    "cityEn": "Dalian",
    "provinceZh": "辽宁省",
    "cityZh": "大连市",
    "provinceMn": "Ляонин",
    "slug": "college-of-arts-and-information-engineering-dalian-polytechnic-university",
    "partnerUrl": "https://www.dongxueji.cn/university/118",
    "programs": []
  },
  {
    "id": 179,
    "nameEn": "Communication University of Zhejiang",
    "nameZh": "浙江传媒学院",
    "provinceEn": "Zhejiang",
    "cityEn": "Hangzhou",
    "provinceZh": "浙江省",
    "cityZh": "杭州市",
    "provinceMn": "Жөжян",
    "slug": "communication-university-of-zhejiang",
    "partnerUrl": "https://www.dongxueji.cn/university/179",
    "programs": [
      {
        "id": 324,
        "name": "Communication University of Zhejiang Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Communication University of Zhejiang President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/324"
      }
    ]
  },
  {
    "id": 318,
    "nameEn": "Dalian Maple Leaf International Schoo",
    "nameZh": "大连枫叶国际学校",
    "provinceEn": "Liaoning",
    "cityEn": "Dalian",
    "provinceZh": "辽宁省",
    "cityZh": "大连市",
    "provinceMn": "Ляонин",
    "slug": "dalian-maple-leaf-international-schoo",
    "partnerUrl": "https://www.dongxueji.cn/university/318",
    "programs": []
  },
  {
    "id": 307,
    "nameEn": "Dalian Maritime University",
    "nameZh": "大连海事大学",
    "provinceEn": "Liaoning",
    "cityEn": "Dalian",
    "provinceZh": "辽宁省",
    "cityZh": "大连市",
    "provinceMn": "Ляонин",
    "slug": "dalian-maritime-university",
    "partnerUrl": "https://www.dongxueji.cn/university/307",
    "programs": [
      {
        "id": 328,
        "name": "Dalian Maritime University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Dalian Maritime University President’s Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 22000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 22000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/328"
      }
    ]
  },
  {
    "id": 241,
    "nameEn": "Dalian Polytechnic University",
    "nameZh": "大连工业大学",
    "provinceEn": "Liaoning",
    "cityEn": "Dalian",
    "provinceZh": "辽宁省",
    "cityZh": "大连市",
    "provinceMn": "Ляонин",
    "slug": "dalian-polytechnic-university",
    "partnerUrl": "https://www.dongxueji.cn/university/241",
    "programs": []
  },
  {
    "id": 308,
    "nameEn": "Dalian University of Foreign Languages",
    "nameZh": "大连外国语大学",
    "provinceEn": "Liaoning",
    "cityEn": "Dalian",
    "provinceZh": "辽宁省",
    "cityZh": "大连市",
    "provinceMn": "Ляонин",
    "slug": "dalian-university-of-foreign-languages",
    "partnerUrl": "https://www.dongxueji.cn/university/308",
    "programs": [
      {
        "id": 327,
        "name": "Dalian University of Foreign Languages Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Dalian University of Foreign Languages President’s Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 21400,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 21400
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/327"
      }
    ]
  },
  {
    "id": 317,
    "nameEn": "Dalian University of Technology",
    "nameZh": "大连理工大学",
    "provinceEn": "Liaoning",
    "cityEn": "Dalian",
    "provinceZh": "辽宁省",
    "cityZh": "大连市",
    "provinceMn": "Ляонин",
    "slug": "dalian-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/317",
    "programs": []
  },
  {
    "id": 309,
    "nameEn": "Dongbei University of Finance and Economics",
    "nameZh": "东北财经大学",
    "provinceEn": "Liaoning",
    "cityEn": "Dalian",
    "provinceZh": "辽宁省",
    "cityZh": "大连市",
    "provinceMn": "Ляонин",
    "slug": "dongbei-university-of-finance-and-economics",
    "partnerUrl": "https://www.dongxueji.cn/university/309",
    "programs": [
      {
        "id": 326,
        "name": "Dongbei University of Finance and Economics Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Dongbei University of Finance and Economics President’s Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 19000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 19000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/326"
      }
    ]
  },
  {
    "id": 329,
    "nameEn": "Dongying Vocational Institute",
    "nameZh": "东营职业学院",
    "provinceEn": "Shandong",
    "cityEn": "Dongying",
    "provinceZh": "山东省",
    "cityZh": "东营市",
    "provinceMn": "Шаньдун",
    "slug": "dongying-vocational-institute",
    "partnerUrl": "https://www.dongxueji.cn/university/329",
    "programs": []
  },
  {
    "id": 9,
    "nameEn": "Fudan University",
    "nameZh": "复旦大学",
    "provinceEn": "Shanghai",
    "cityEn": "Shanghai",
    "provinceZh": "上海",
    "cityZh": "上海市",
    "provinceMn": "Шанхай",
    "slug": "fudan-university",
    "partnerUrl": "https://www.dongxueji.cn/university/9",
    "programs": [
      {
        "id": 250,
        "name": "Fudan University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Fudan University University President's Scholarship",
        "opens": "2026/10/27",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": null,
        "tuitionCny": 23000,
        "majors": [
          {
            "name": "Chinese Language and Culture",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 23000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/250"
      }
    ]
  },
  {
    "id": 327,
    "nameEn": "Fujian Medical University",
    "nameZh": "福建医科大学",
    "provinceEn": "Fujian",
    "cityEn": "Fuzhou",
    "provinceZh": "福建省",
    "cityZh": "福州市",
    "provinceMn": "Фүжянь",
    "slug": "fujian-medical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/327",
    "programs": [
      {
        "id": 270,
        "name": "Undergraduate Program (Institutional Scholarship) — Fujian Medical University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Fujian Medical University President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 35000,
        "majors": [
          {
            "name": "MBBS",
            "language": "English",
            "years": 6,
            "tuitionCny": 35000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/270"
      }
    ]
  },
  {
    "id": 387,
    "nameEn": "Fuzhou Software Vocational and Technical College",
    "nameZh": "福州软件职业技术学院",
    "provinceEn": "Fujian",
    "cityEn": "Fuzhou",
    "provinceZh": "福建省",
    "cityZh": "福州市",
    "provinceMn": "Фүжянь",
    "slug": "fuzhou-software-vocational-and-technical-college",
    "partnerUrl": "https://www.dongxueji.cn/university/387",
    "programs": []
  },
  {
    "id": 85,
    "nameEn": "Gansu Medical College",
    "nameZh": "甘肃医学院",
    "provinceEn": "Gansu",
    "cityEn": "Pingliang",
    "provinceZh": "甘肃省",
    "cityZh": "平凉市",
    "provinceMn": "Ганьсү",
    "slug": "gansu-medical-college",
    "partnerUrl": "https://www.dongxueji.cn/university/85",
    "programs": []
  },
  {
    "id": 366,
    "nameEn": "Gansu University of Chinese Medicine",
    "nameZh": "甘肃中医药大学",
    "provinceEn": "Gansu",
    "cityEn": "Lanzhou",
    "provinceZh": "甘肃省",
    "cityZh": "兰州市",
    "provinceMn": "Ганьсү",
    "slug": "gansu-university-of-chinese-medicine",
    "partnerUrl": "https://www.dongxueji.cn/university/366",
    "programs": []
  },
  {
    "id": 207,
    "nameEn": "Guangdong Polytechnic Normal University",
    "nameZh": "广东技术师范大学",
    "provinceEn": "Guangdong",
    "cityEn": "Guangzhou",
    "provinceZh": "广东省",
    "cityZh": "广州市",
    "provinceMn": "Гуандун",
    "slug": "guangdong-polytechnic-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/207",
    "programs": []
  },
  {
    "id": 345,
    "nameEn": "Guangdong University of Finance",
    "nameZh": "广东金融学院",
    "provinceEn": "Guangdong",
    "cityEn": "Guangzhou",
    "provinceZh": "广东省",
    "cityZh": "广州市",
    "provinceMn": "Гуандун",
    "slug": "guangdong-university-of-finance",
    "partnerUrl": "https://www.dongxueji.cn/university/345",
    "programs": []
  },
  {
    "id": 69,
    "nameEn": "Guangdong University of Foreign Studies",
    "nameZh": "广东外语外贸大学",
    "provinceEn": "Guangdong",
    "cityEn": "Guangzhou",
    "provinceZh": "广东省",
    "cityZh": "广州市",
    "provinceMn": "Гуандун",
    "slug": "guangdong-university-of-foreign-studies",
    "partnerUrl": "https://www.dongxueji.cn/university/69",
    "programs": []
  },
  {
    "id": 208,
    "nameEn": "Guangdong University of Technology",
    "nameZh": "广东工业大学",
    "provinceEn": "Guangdong",
    "cityEn": "Guangzhou",
    "provinceZh": "广东省",
    "cityZh": "广州市",
    "provinceMn": "Гуандун",
    "slug": "guangdong-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/208",
    "programs": [
      {
        "id": 311,
        "name": "Guangdong University of Technology Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Guangdong University of Technology President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 23000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "English",
            "years": 4,
            "tuitionCny": 23000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/311"
      }
    ]
  },
  {
    "id": 197,
    "nameEn": "Guangxi University for Nationalities",
    "nameZh": "广西民族大学",
    "provinceEn": "Guangxi",
    "cityEn": "Nanning",
    "provinceZh": "广西壮族自治区",
    "cityZh": "南宁市",
    "provinceMn": "Гуанси",
    "slug": "guangxi-university-for-nationalities",
    "partnerUrl": "https://www.dongxueji.cn/university/197",
    "programs": [
      {
        "id": 315,
        "name": "Guangxi Minzu University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Guangxi Minzu University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/315"
      }
    ]
  },
  {
    "id": 339,
    "nameEn": "Guangxi Vocational and Technical College of Communications",
    "nameZh": "广西交通职业技术学院",
    "provinceEn": "Guangxi",
    "cityEn": "Nanning",
    "provinceZh": "广西壮族自治区",
    "cityZh": "南宁市",
    "provinceMn": "Гуанси",
    "slug": "guangxi-vocational-and-technical-college-of-communications",
    "partnerUrl": "https://www.dongxueji.cn/university/339",
    "programs": []
  },
  {
    "id": 332,
    "nameEn": "Guangxi Vocational College of Industry and Commerce",
    "nameZh": "广西工商职业技术学院",
    "provinceEn": "Guangxi",
    "cityEn": "Nanning",
    "provinceZh": "广西壮族自治区",
    "cityZh": "南宁市",
    "provinceMn": "Гуанси",
    "slug": "guangxi-vocational-college-of-industry-and-commerce",
    "partnerUrl": "https://www.dongxueji.cn/university/332",
    "programs": []
  },
  {
    "id": 202,
    "nameEn": "Guangzhou College of Commerce",
    "nameZh": "广州商学院",
    "provinceEn": "Guangdong",
    "cityEn": "Guangzhou",
    "provinceZh": "广东省",
    "cityZh": "广州市",
    "provinceMn": "Гуандун",
    "slug": "guangzhou-college-of-commerce",
    "partnerUrl": "https://www.dongxueji.cn/university/202",
    "programs": [
      {
        "id": 356,
        "name": "Spring 27th Guangshang Chinese Language School Award",
        "degree": "Chinese language studies",
        "language": "Chinese",
        "award": "Guangzhou Business University President's Scholarship",
        "opens": "2026/11/05",
        "closes": "2027/01/15",
        "seats": 10,
        "applicationFeeCny": null,
        "tuitionCny": null,
        "majors": [
          {
            "name": "Non-degree Chinese Language Training",
            "language": "Chinese",
            "years": null,
            "tuitionCny": 5000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/356"
      },
      {
        "id": 355,
        "name": "27th Autumn Guangshang Undergraduate School Award",
        "degree": "Undergraduate",
        "language": "English",
        "award": "Guangzhou Business University President's Scholarship",
        "opens": "2026/11/05",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": null,
        "tuitionCny": 29800,
        "majors": [
          {
            "name": "international business",
            "language": "English",
            "years": 4,
            "tuitionCny": 29800
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/355"
      },
      {
        "id": 357,
        "name": "27th Autumn Guangshang Chinese Language School Award",
        "degree": "Chinese language studies",
        "language": "Chinese",
        "award": "Guangzhou Business University President's Scholarship",
        "opens": "2026/11/05",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": null,
        "tuitionCny": null,
        "majors": [
          {
            "name": "Non-degree Chinese Language Training",
            "language": "Chinese",
            "years": null,
            "tuitionCny": 5000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/357"
      }
    ]
  },
  {
    "id": 201,
    "nameEn": "Guangzhou Maritime University",
    "nameZh": "广州航海学院",
    "provinceEn": "Guangdong",
    "cityEn": "Guangzhou",
    "provinceZh": "广东省",
    "cityZh": "广州市",
    "provinceMn": "Гуандун",
    "slug": "guangzhou-maritime-university",
    "partnerUrl": "https://www.dongxueji.cn/university/201",
    "programs": []
  },
  {
    "id": 285,
    "nameEn": "Guiyang University",
    "nameZh": "贵阳学院",
    "provinceEn": "Guizhou",
    "cityEn": "Guiyang",
    "provinceZh": "贵州省",
    "cityZh": "贵阳市",
    "provinceMn": "Гүйжоу",
    "slug": "guiyang-university",
    "partnerUrl": "https://www.dongxueji.cn/university/285",
    "programs": []
  },
  {
    "id": 388,
    "nameEn": "Guizhou Health Vocational College",
    "nameZh": "贵州健康职业学院",
    "provinceEn": "Guizhou",
    "cityEn": "Tongren",
    "provinceZh": "贵州省",
    "cityZh": "铜仁市",
    "provinceMn": "Гүйжоу",
    "slug": "guizhou-health-vocational-college",
    "partnerUrl": "https://www.dongxueji.cn/university/388",
    "programs": []
  },
  {
    "id": 46,
    "nameEn": "Guizhou Institute of Technology",
    "nameZh": "贵州理工学院",
    "provinceEn": "Guizhou",
    "cityEn": "Guiyang",
    "provinceZh": "贵州省",
    "cityZh": "贵阳市",
    "provinceMn": "Гүйжоу",
    "slug": "guizhou-institute-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/46",
    "programs": []
  },
  {
    "id": 176,
    "nameEn": "Guizhou Medical University",
    "nameZh": "贵州医科大学",
    "provinceEn": "Guizhou",
    "cityEn": "Guiyang",
    "provinceZh": "贵州省",
    "cityZh": "贵阳市",
    "provinceMn": "Гүйжоу",
    "slug": "guizhou-medical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/176",
    "programs": [
      {
        "id": 276,
        "name": "Guizhou Medical University Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "President's Scholarship of Guizhou Medical University",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 25000,
        "majors": [
          {
            "name": "Clinical Medicine",
            "language": "Chinese",
            "years": 6,
            "tuitionCny": 25000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/276"
      }
    ]
  },
  {
    "id": 289,
    "nameEn": "Guizhou University of Engineering Science",
    "nameZh": "贵州工程应用技术学院",
    "provinceEn": "Guizhou",
    "cityEn": "Bijie",
    "provinceZh": "贵州省",
    "cityZh": "毕节市",
    "provinceMn": "Гүйжоу",
    "slug": "guizhou-university-of-engineering-science",
    "partnerUrl": "https://www.dongxueji.cn/university/289",
    "programs": []
  },
  {
    "id": 301,
    "nameEn": "Guizhou University of Finance and Economics",
    "nameZh": "贵州财经大学",
    "provinceEn": "Guizhou",
    "cityEn": "Guiyang",
    "provinceZh": "贵州省",
    "cityZh": "贵阳市",
    "provinceMn": "Гүйжоу",
    "slug": "guizhou-university-of-finance-and-economics",
    "partnerUrl": "https://www.dongxueji.cn/university/301",
    "programs": [
      {
        "id": 329,
        "name": "Guizhou University of Finance and Economics Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Guizhou University of Finance and Economics President’s Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 4100,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 4100
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/329"
      }
    ]
  },
  {
    "id": 53,
    "nameEn": "Guizhou Vocational and Technical College of Water Resources and Hydropower",
    "nameZh": "贵州水利水电职业技术学院",
    "provinceEn": "Guizhou",
    "cityEn": "Guiyang",
    "provinceZh": "贵州省",
    "cityZh": "贵阳市",
    "provinceMn": "Гүйжоу",
    "slug": "guizhou-vocational-and-technical-college-of-water-resources-and-hydropower",
    "partnerUrl": "https://www.dongxueji.cn/university/53",
    "programs": []
  },
  {
    "id": 283,
    "nameEn": "Guizhou Vocational College of Economics and Trade",
    "nameZh": "贵州经贸职业技术学院",
    "provinceEn": "Guizhou",
    "cityEn": "Guiyang",
    "provinceZh": "贵州省",
    "cityZh": "贵阳市",
    "provinceMn": "Гүйжоу",
    "slug": "guizhou-vocational-college-of-economics-and-trade",
    "partnerUrl": "https://www.dongxueji.cn/university/283",
    "programs": []
  },
  {
    "id": 236,
    "nameEn": "Hainan College of Economics and Business",
    "nameZh": "海南经贸职业技术学院",
    "provinceEn": "Hainan",
    "cityEn": "Haikou",
    "provinceZh": "海南省",
    "cityZh": "海口市",
    "provinceMn": "Хайнань",
    "slug": "hainan-college-of-economics-and-business",
    "partnerUrl": "https://www.dongxueji.cn/university/236",
    "programs": []
  },
  {
    "id": 18,
    "nameEn": "Hainan Normal University",
    "nameZh": "海南师范大学",
    "provinceEn": "Hainan",
    "cityEn": "Haikou",
    "provinceZh": "海南省",
    "cityZh": "海口市",
    "provinceMn": "Хайнань",
    "slug": "hainan-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/18",
    "programs": []
  },
  {
    "id": 238,
    "nameEn": "Hainan Tropical Ocean University",
    "nameZh": "海南热带海洋学院",
    "provinceEn": "Hainan",
    "cityEn": "Sanya",
    "provinceZh": "海南省",
    "cityZh": "三亚市",
    "provinceMn": "Хайнань",
    "slug": "hainan-tropical-ocean-university",
    "partnerUrl": "https://www.dongxueji.cn/university/238",
    "programs": []
  },
  {
    "id": 83,
    "nameEn": "Hangzhou Normal University",
    "nameZh": "杭州师范大学",
    "provinceEn": "Zhejiang",
    "cityEn": "Hangzhou",
    "provinceZh": "浙江省",
    "cityZh": "杭州市",
    "provinceMn": "Жөжян",
    "slug": "hangzhou-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/83",
    "programs": []
  },
  {
    "id": 135,
    "nameEn": "Harbin Institute of Technology, Shenzhen",
    "nameZh": "哈尔滨工业大学（深圳）",
    "provinceEn": "Guangdong",
    "cityEn": "Shenzhen",
    "provinceZh": "广东省",
    "cityZh": "深圳市",
    "provinceMn": "Гуандун",
    "slug": "harbin-institute-of-technology-shenzhen",
    "partnerUrl": "https://www.dongxueji.cn/university/135",
    "programs": []
  },
  {
    "id": 261,
    "nameEn": "Harbin Institute of Technology, Weihai",
    "nameZh": "哈尔滨工业大学（威海）",
    "provinceEn": "Shandong",
    "cityEn": "Weihai",
    "provinceZh": "山东省",
    "cityZh": "威海市",
    "provinceMn": "Шаньдун",
    "slug": "harbin-institute-of-technology-weihai",
    "partnerUrl": "https://www.dongxueji.cn/university/261",
    "programs": []
  },
  {
    "id": 49,
    "nameEn": "Harbin Institute of Technology（Harbin）",
    "nameZh": "哈尔滨工业大学（哈尔滨）",
    "provinceEn": "Heilongjiang",
    "cityEn": "Harbin",
    "provinceZh": "黑龙江省",
    "cityZh": "哈尔滨市",
    "provinceMn": "Хэйлунжян",
    "slug": "harbin-institute-of-technology-harbin",
    "partnerUrl": "https://www.dongxueji.cn/university/49",
    "programs": []
  },
  {
    "id": 110,
    "nameEn": "HEBEI ACADEMY OF FINE ARTS",
    "nameZh": "河北美术学院",
    "provinceEn": "Hebei",
    "cityEn": "Shijiazhuang",
    "provinceZh": "河北省",
    "cityZh": "石家庄市",
    "provinceMn": "Хэбэй",
    "slug": "hebei-academy-of-fine-arts",
    "partnerUrl": "https://www.dongxueji.cn/university/110",
    "programs": []
  },
  {
    "id": 111,
    "nameEn": "Hebei Institute of Environmental Engineering",
    "nameZh": "河北环境工程学院",
    "provinceEn": "Hebei",
    "cityEn": "Qinhuangdao",
    "provinceZh": "河北省",
    "cityZh": "秦皇岛市",
    "provinceMn": "Хэбэй",
    "slug": "hebei-institute-of-environmental-engineering",
    "partnerUrl": "https://www.dongxueji.cn/university/111",
    "programs": []
  },
  {
    "id": 114,
    "nameEn": "Hebei Medical University",
    "nameZh": "河北医科大学",
    "provinceEn": "Hebei",
    "cityEn": "Shijiazhuang",
    "provinceZh": "河北省",
    "cityZh": "石家庄市",
    "provinceMn": "Хэбэй",
    "slug": "hebei-medical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/114",
    "programs": []
  },
  {
    "id": 115,
    "nameEn": "Hebei Normal University",
    "nameZh": "河北师范大学",
    "provinceEn": "Hebei",
    "cityEn": "Shijiazhuang",
    "provinceZh": "河北省",
    "cityZh": "石家庄市",
    "provinceMn": "Хэбэй",
    "slug": "hebei-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/115",
    "programs": []
  },
  {
    "id": 112,
    "nameEn": "Hebei University of Engineering",
    "nameZh": "河北工程大学",
    "provinceEn": "Hebei",
    "cityEn": "Handan",
    "provinceZh": "河北省",
    "cityZh": "邯郸市",
    "provinceMn": "Хэбэй",
    "slug": "hebei-university-of-engineering",
    "partnerUrl": "https://www.dongxueji.cn/university/112",
    "programs": []
  },
  {
    "id": 351,
    "nameEn": "Hefei Preschool Education College",
    "nameZh": "合肥幼儿师范高等专科学校",
    "provinceEn": "Anhui",
    "cityEn": "Hefei",
    "provinceZh": "安徽省",
    "cityZh": "合肥市",
    "provinceMn": "Аньхуй",
    "slug": "hefei-preschool-education-college",
    "partnerUrl": "https://www.dongxueji.cn/university/351",
    "programs": []
  },
  {
    "id": 149,
    "nameEn": "Hefei University",
    "nameZh": "合肥大学",
    "provinceEn": "Anhui",
    "cityEn": "Hefei",
    "provinceZh": "安徽省",
    "cityZh": "合肥市",
    "provinceMn": "Аньхуй",
    "slug": "hefei-university",
    "partnerUrl": "https://www.dongxueji.cn/university/149",
    "programs": [
      {
        "id": 287,
        "name": "Hefei University Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Hefei University President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 16000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 16000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/287"
      }
    ]
  },
  {
    "id": 359,
    "nameEn": "Heilongjiang Sanjiang Art Vocational College",
    "nameZh": "黑龙江三江美术职业学院",
    "provinceEn": "Heilongjiang",
    "cityEn": "Harbin",
    "provinceZh": "黑龙江省",
    "cityZh": "哈尔滨市",
    "provinceMn": "Хэйлунжян",
    "slug": "heilongjiang-sanjiang-art-vocational-college",
    "partnerUrl": "https://www.dongxueji.cn/university/359",
    "programs": []
  },
  {
    "id": 363,
    "nameEn": "Hexi University",
    "nameZh": "河西学院",
    "provinceEn": "Gansu",
    "cityEn": "Zhangye",
    "provinceZh": "甘肃省",
    "cityZh": "张掖市",
    "provinceMn": "Ганьсү",
    "slug": "hexi-university",
    "partnerUrl": "https://www.dongxueji.cn/university/363",
    "programs": []
  },
  {
    "id": 34,
    "nameEn": "Hohai University",
    "nameZh": "河海大学",
    "provinceEn": "Jiangsu",
    "cityEn": "Nanjing",
    "provinceZh": "江苏省",
    "cityZh": "南京市",
    "provinceMn": "Жянсү",
    "slug": "hohai-university",
    "partnerUrl": "https://www.dongxueji.cn/university/34",
    "programs": []
  },
  {
    "id": 340,
    "nameEn": "Huai'an University",
    "nameZh": "淮安大学",
    "provinceEn": "Jiangsu",
    "cityEn": "Huai'an",
    "provinceZh": "江苏省",
    "cityZh": "淮安市",
    "provinceMn": "Жянсү",
    "slug": "huai-an-university",
    "partnerUrl": "https://www.dongxueji.cn/university/340",
    "programs": []
  },
  {
    "id": 374,
    "nameEn": "Huanggang Normal University",
    "nameZh": "黄冈师范学院",
    "provinceEn": "Hubei",
    "cityEn": "Huanggang",
    "provinceZh": "湖北省",
    "cityZh": "黄冈市",
    "provinceMn": "Хүбэй",
    "slug": "huanggang-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/374",
    "programs": []
  },
  {
    "id": 150,
    "nameEn": "Huangshan University",
    "nameZh": "黄山学院",
    "provinceEn": "Anhui",
    "cityEn": "Huangshan",
    "provinceZh": "安徽省",
    "cityZh": "黄山市",
    "provinceMn": "Аньхуй",
    "slug": "huangshan-university",
    "partnerUrl": "https://www.dongxueji.cn/university/150",
    "programs": []
  },
  {
    "id": 189,
    "nameEn": "Huazhong University of Science and Technology",
    "nameZh": "华中科技大学",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "huazhong-university-of-science-and-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/189",
    "programs": [
      {
        "id": 319,
        "name": "Huazhong University of Science and Technology Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Huazhong University of Science and Technology President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 25000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 25000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/319"
      }
    ]
  },
  {
    "id": 376,
    "nameEn": "Hubei Business College",
    "nameZh": "湖北商贸学院",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "hubei-business-college",
    "partnerUrl": "https://www.dongxueji.cn/university/376",
    "programs": []
  },
  {
    "id": 191,
    "nameEn": "Hubei Open Vocational College",
    "nameZh": "湖北开放职业学院",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "hubei-open-vocational-college",
    "partnerUrl": "https://www.dongxueji.cn/university/191",
    "programs": []
  },
  {
    "id": 186,
    "nameEn": "Hubei University",
    "nameZh": "湖北大学",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "hubei-university",
    "partnerUrl": "https://www.dongxueji.cn/university/186",
    "programs": [
      {
        "id": 243,
        "name": "Hubei University Undergraduate Scholarship for International Students, Spring 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Hubei University President's Scholarship",
        "opens": "2026/10/09",
        "closes": "2027/01/15",
        "seats": 80,
        "applicationFeeCny": null,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "Finance",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 18000
          },
          {
            "name": "Robotics Engineering",
            "language": "English",
            "years": 4,
            "tuitionCny": 20000
          },
          {
            "name": "International Economics and Trade",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 18000
          },
          {
            "name": "International Economics and Trade",
            "language": "English",
            "years": 4,
            "tuitionCny": 18000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/243"
      }
    ]
  },
  {
    "id": 375,
    "nameEn": "Hubei University of Automotive Technology",
    "nameZh": "湖北汽车工业学院",
    "provinceEn": "Hubei",
    "cityEn": "Shiyan",
    "provinceZh": "湖北省",
    "cityZh": "十堰市",
    "provinceMn": "Хүбэй",
    "slug": "hubei-university-of-automotive-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/375",
    "programs": []
  },
  {
    "id": 266,
    "nameEn": "Hubei University of Chinese Medicine",
    "nameZh": "湖北中医药大学",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "hubei-university-of-chinese-medicine",
    "partnerUrl": "https://www.dongxueji.cn/university/266",
    "programs": []
  },
  {
    "id": 379,
    "nameEn": "Hubei University of Economics",
    "nameZh": "湖北经济学院",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "hubei-university-of-economics",
    "partnerUrl": "https://www.dongxueji.cn/university/379",
    "programs": []
  },
  {
    "id": 347,
    "nameEn": "Hubei University of Education",
    "nameZh": "湖北第二师范学院",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "hubei-university-of-education",
    "partnerUrl": "https://www.dongxueji.cn/university/347",
    "programs": []
  },
  {
    "id": 346,
    "nameEn": "Hubei University of Technology",
    "nameZh": "湖北工业大学",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "hubei-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/346",
    "programs": []
  },
  {
    "id": 393,
    "nameEn": "Hunan College of Foreign Studies",
    "nameZh": "湖南外国语职业学院",
    "provinceEn": "Hunan",
    "cityEn": "Changsha",
    "provinceZh": "湖南省",
    "cityZh": "长沙市",
    "provinceMn": "Хунань",
    "slug": "hunan-college-of-foreign-studies",
    "partnerUrl": "https://www.dongxueji.cn/university/393",
    "programs": [
      {
        "id": 239,
        "name": "Spring 2027 Hunan College of Foreign Studies Chinese Language University Scholarship",
        "degree": "Chinese language studies",
        "language": "Chinese",
        "award": "Hunan College of Foreign Studies President's Scholarship",
        "opens": "2026/10/16",
        "closes": "2027/01/15",
        "seats": 30,
        "applicationFeeCny": null,
        "tuitionCny": null,
        "majors": [],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/239"
      },
      {
        "id": 240,
        "name": "Chinese Language Program (Institutional Scholarship) — Hunan College of Foreign Languages, 2027 Intake",
        "degree": "Chinese language studies",
        "language": "Chinese",
        "award": "Hunan College of Foreign Studies President's Scholarship",
        "opens": "2026/10/16",
        "closes": "2027/06/30",
        "seats": 30,
        "applicationFeeCny": null,
        "tuitionCny": null,
        "majors": [],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/240"
      }
    ]
  },
  {
    "id": 144,
    "nameEn": "Hunan Institute of Technology",
    "nameZh": "湖南工学院",
    "provinceEn": "Hunan",
    "cityEn": "Hengyang",
    "provinceZh": "湖南省",
    "cityZh": "衡阳市",
    "provinceMn": "Хунань",
    "slug": "hunan-institute-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/144",
    "programs": []
  },
  {
    "id": 140,
    "nameEn": "Hunan Normal University",
    "nameZh": "湖南师范大学",
    "provinceEn": "Hunan",
    "cityEn": "Changsha",
    "provinceZh": "湖南省",
    "cityZh": "长沙市",
    "provinceMn": "Хунань",
    "slug": "hunan-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/140",
    "programs": [
      {
        "id": 291,
        "name": "Undergraduate Program (Institutional Scholarship) — Hunan Normal University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "President's Scholarship of Hunan Normal University",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 20000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/291"
      }
    ]
  },
  {
    "id": 141,
    "nameEn": "Hunan University of Technology and Business",
    "nameZh": "湖南工商大学",
    "provinceEn": "Hunan",
    "cityEn": "Changsha",
    "provinceZh": "湖南省",
    "cityZh": "长沙市",
    "provinceMn": "Хунань",
    "slug": "hunan-university-of-technology-and-business",
    "partnerUrl": "https://www.dongxueji.cn/university/141",
    "programs": [
      {
        "id": 290,
        "name": "Hunan University of Technology and Business Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Hunan University of Technology and Business President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 4,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": null,
            "tuitionCny": null
          }
        ],
        "figuresWithheld": true,
        "url": "https://www.dongxueji.cn/study-abroad/290"
      }
    ]
  },
  {
    "id": 291,
    "nameEn": "Jiangsu University",
    "nameZh": "江苏大学",
    "provinceEn": "Jiangsu",
    "cityEn": "Zhenjiang",
    "provinceZh": "江苏省",
    "cityZh": "镇江市",
    "provinceMn": "Жянсү",
    "slug": "jiangsu-university",
    "partnerUrl": "https://www.dongxueji.cn/university/291",
    "programs": [
      {
        "id": 340,
        "name": "Jiangsu University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Jiangsu University President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 18000,
        "majors": [
          {
            "name": "Business Administration",
            "language": "English",
            "years": 4,
            "tuitionCny": 18000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/340"
      }
    ]
  },
  {
    "id": 48,
    "nameEn": "Jiangsu University of Technology",
    "nameZh": "江苏理工学院",
    "provinceEn": "Jiangsu",
    "cityEn": "Changzhou",
    "provinceZh": "江苏省",
    "cityZh": "常州市",
    "provinceMn": "Жянсү",
    "slug": "jiangsu-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/48",
    "programs": []
  },
  {
    "id": 384,
    "nameEn": "Jiangsu Vocational Institute of Finance and Economics",
    "nameZh": "江苏财经职业技术学院",
    "provinceEn": "Jiangsu",
    "cityEn": "Huai'an",
    "provinceZh": "江苏省",
    "cityZh": "淮安市",
    "provinceMn": "Жянсү",
    "slug": "jiangsu-vocational-institute-of-finance-and-economics",
    "partnerUrl": "https://www.dongxueji.cn/university/384",
    "programs": []
  },
  {
    "id": 125,
    "nameEn": "Jinan University",
    "nameZh": "暨南大学",
    "provinceEn": "Guangdong",
    "cityEn": "Guangzhou",
    "provinceZh": "广东省",
    "cityZh": "广州市",
    "provinceMn": "Гуандун",
    "slug": "jinan-university",
    "partnerUrl": "https://www.dongxueji.cn/university/125",
    "programs": [
      {
        "id": 295,
        "name": "Jinan University Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Jinan University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 19000,
        "majors": [
          {
            "name": "Business Administration",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 19000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/295"
      }
    ]
  },
  {
    "id": 331,
    "nameEn": "Jinan Vocational College",
    "nameZh": "济南职业学院",
    "provinceEn": "Shandong",
    "cityEn": "Jinan",
    "provinceZh": "山东省",
    "cityZh": "济南市",
    "provinceMn": "Шаньдун",
    "slug": "jinan-vocational-college",
    "partnerUrl": "https://www.dongxueji.cn/university/331",
    "programs": [
      {
        "id": 213,
        "name": "Fall 2027 Jinan Vocational College Diploma Program University Scholarship",
        "degree": "Junior college",
        "language": "Chinese",
        "award": "Jinan Vocational College President's Scholarship",
        "opens": "2026/09/01",
        "closes": "2027/03/31",
        "seats": 10,
        "applicationFeeCny": null,
        "tuitionCny": 12000,
        "majors": [
          {
            "name": "Mechanical Design, Manufacturing and Automation",
            "language": "Chinese",
            "years": 3,
            "tuitionCny": 12000
          },
          {
            "name": "Intelligent Connected Vehicle Engineering Technology",
            "language": "Chinese",
            "years": 3,
            "tuitionCny": 12000
          },
          {
            "name": "Online Marketing and Live-stream E-commerce",
            "language": "Chinese",
            "years": 3,
            "tuitionCny": 12000
          },
          {
            "name": "Tourism Management",
            "language": "Chinese",
            "years": 3,
            "tuitionCny": 12000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/213"
      },
      {
        "id": 218,
        "name": "2027 Autumn Intake Jinan Polytechnic Chinese Language University Scholarship",
        "degree": "Chinese language studies",
        "language": "Chinese",
        "award": "Jinan Vocational College President's Scholarship",
        "opens": "2026/09/01",
        "closes": "2027/03/31",
        "seats": 10,
        "applicationFeeCny": null,
        "tuitionCny": null,
        "majors": [],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/218"
      }
    ]
  },
  {
    "id": 41,
    "nameEn": "Kaili University",
    "nameZh": "凯里学院",
    "provinceEn": "Guizhou",
    "cityEn": "Qiandongnan",
    "provinceZh": "贵州省",
    "cityZh": "黔东南苗族侗族自治州",
    "provinceMn": "Гүйжоу",
    "slug": "kaili-university",
    "partnerUrl": "https://www.dongxueji.cn/university/41",
    "programs": []
  },
  {
    "id": 137,
    "nameEn": "Liaoning Technical University",
    "nameZh": "辽宁工程技术大学",
    "provinceEn": "Liaoning",
    "cityEn": "Fuxin",
    "provinceZh": "辽宁省",
    "cityZh": "阜新市",
    "provinceMn": "Ляонин",
    "slug": "liaoning-technical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/137",
    "programs": []
  },
  {
    "id": 319,
    "nameEn": "Liaoning University of Technology",
    "nameZh": "辽宁工业大学",
    "provinceEn": "Liaoning",
    "cityEn": "Jinzhou",
    "provinceZh": "辽宁省",
    "cityZh": "锦州市",
    "provinceMn": "Ляонин",
    "slug": "liaoning-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/319",
    "programs": [
      {
        "id": 273,
        "name": "Liaoning University of Technology Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Liaoning University of Technology President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 18000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 18000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/273"
      }
    ]
  },
  {
    "id": 245,
    "nameEn": "Liaoning University of Traditional Chinese Medicine",
    "nameZh": "辽宁中医药大学",
    "provinceEn": "Liaoning",
    "cityEn": "Shenyang",
    "provinceZh": "辽宁省",
    "cityZh": "沈阳市",
    "provinceMn": "Ляонин",
    "slug": "liaoning-university-of-traditional-chinese-medicine",
    "partnerUrl": "https://www.dongxueji.cn/university/245",
    "programs": []
  },
  {
    "id": 343,
    "nameEn": "Liming Vocational University",
    "nameZh": "黎明职业大学",
    "provinceEn": "Fujian",
    "cityEn": "Quanzhou",
    "provinceZh": "福建省",
    "cityZh": "泉州市",
    "provinceMn": "Фүжянь",
    "slug": "liming-vocational-university",
    "partnerUrl": "https://www.dongxueji.cn/university/343",
    "programs": []
  },
  {
    "id": 40,
    "nameEn": "Liupanshui Normal University",
    "nameZh": "六盘水师范学院",
    "provinceEn": "Guizhou",
    "cityEn": "Liupanshui",
    "provinceZh": "贵州省",
    "cityZh": "六盘水市",
    "provinceMn": "Гүйжоу",
    "slug": "liupanshui-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/40",
    "programs": []
  },
  {
    "id": 36,
    "nameEn": "Mianyang Normal University",
    "nameZh": "绵阳师范学院",
    "provinceEn": "Sichuan",
    "cityEn": "Mianyang",
    "provinceZh": "四川省",
    "cityZh": "绵阳市",
    "provinceMn": "Сычуань",
    "slug": "mianyang-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/36",
    "programs": []
  },
  {
    "id": 383,
    "nameEn": "Mianyang Vocational and Technical College",
    "nameZh": "绵阳职业技术学院",
    "provinceEn": "Sichuan",
    "cityEn": "Mianyang",
    "provinceZh": "四川省",
    "cityZh": "绵阳市",
    "provinceMn": "Сычуань",
    "slug": "mianyang-vocational-and-technical-college",
    "partnerUrl": "https://www.dongxueji.cn/university/383",
    "programs": []
  },
  {
    "id": 52,
    "nameEn": "Minnan Normal University",
    "nameZh": "闽南师范大学",
    "provinceEn": "Fujian",
    "cityEn": "Zhangzhou",
    "provinceZh": "福建省",
    "cityZh": "漳州市",
    "provinceMn": "Фүжянь",
    "slug": "minnan-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/52",
    "programs": []
  },
  {
    "id": 371,
    "nameEn": "Nanjing Agricultural University",
    "nameZh": "南京农业大学",
    "provinceEn": "Jiangsu",
    "cityEn": "Nanjing",
    "provinceZh": "江苏省",
    "cityZh": "南京市",
    "provinceMn": "Жянсү",
    "slug": "nanjing-agricultural-university",
    "partnerUrl": "https://www.dongxueji.cn/university/371",
    "programs": []
  },
  {
    "id": 32,
    "nameEn": "Nanjing Forestry University",
    "nameZh": "南京林业大学",
    "provinceEn": "Jiangsu",
    "cityEn": "Nanjing",
    "provinceZh": "江苏省",
    "cityZh": "南京市",
    "provinceMn": "Жянсү",
    "slug": "nanjing-forestry-university",
    "partnerUrl": "https://www.dongxueji.cn/university/32",
    "programs": [
      {
        "id": 303,
        "name": "Nanjing Forestry University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Nanjing Forestry University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 16500,
        "majors": [
          {
            "name": "Business Administration",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 16500
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/303"
      }
    ]
  },
  {
    "id": 228,
    "nameEn": "Nanjing Medical University",
    "nameZh": "南京医科大学",
    "provinceEn": "Jiangsu",
    "cityEn": "Nanjing",
    "provinceZh": "江苏省",
    "cityZh": "南京市",
    "provinceMn": "Жянсү",
    "slug": "nanjing-medical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/228",
    "programs": [
      {
        "id": 302,
        "name": "Nanjing Medical University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Nanjing Medical University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 34000,
        "majors": [
          {
            "name": "Clinical Medicine",
            "language": "Chinese",
            "years": 5,
            "tuitionCny": 30000
          },
          {
            "name": "MBBS",
            "language": "English",
            "years": 6,
            "tuitionCny": 34000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/302"
      }
    ]
  },
  {
    "id": 131,
    "nameEn": "Nanjing University",
    "nameZh": "南京大学",
    "provinceEn": "Jiangsu",
    "cityEn": "Nanjing",
    "provinceZh": "江苏省",
    "cityZh": "南京市",
    "provinceMn": "Жянсү",
    "slug": "nanjing-university",
    "partnerUrl": "https://www.dongxueji.cn/university/131",
    "programs": [
      {
        "id": 293,
        "name": "Nanjing University Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Nanjing University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 21000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 21000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/293"
      }
    ]
  },
  {
    "id": 229,
    "nameEn": "Nanjing University of Finance and Economics",
    "nameZh": "南京财经大学",
    "provinceEn": "Jiangsu",
    "cityEn": "Nanjing",
    "provinceZh": "江苏省",
    "cityZh": "南京市",
    "provinceMn": "Жянсү",
    "slug": "nanjing-university-of-finance-and-economics",
    "partnerUrl": "https://www.dongxueji.cn/university/229",
    "programs": [
      {
        "id": 301,
        "name": "Nanjing University of Finance and Economics Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Nanjing University of Finance and Economics President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 17000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 17000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/301"
      }
    ]
  },
  {
    "id": 47,
    "nameEn": "Nanjing University of Information Science & Technology",
    "nameZh": "南京信息工程大学",
    "provinceEn": "Jiangsu",
    "cityEn": "Nanjing",
    "provinceZh": "江苏省",
    "cityZh": "南京市",
    "provinceMn": "Жянсү",
    "slug": "nanjing-university-of-information-science-and-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/47",
    "programs": []
  },
  {
    "id": 322,
    "nameEn": "Nanjing University of the Arts",
    "nameZh": "南京艺术学院",
    "provinceEn": "Jiangsu",
    "cityEn": "Nanjing",
    "provinceZh": "江苏省",
    "cityZh": "南京市",
    "provinceMn": "Жянсү",
    "slug": "nanjing-university-of-the-arts",
    "partnerUrl": "https://www.dongxueji.cn/university/322",
    "programs": []
  },
  {
    "id": 225,
    "nameEn": "Nankai University",
    "nameZh": "南开大学",
    "provinceEn": "Tianjin",
    "cityEn": "Tianjin",
    "provinceZh": "天津",
    "cityZh": "天津市",
    "provinceMn": "Тяньжин",
    "slug": "nankai-university",
    "partnerUrl": "https://www.dongxueji.cn/university/225",
    "programs": [
      {
        "id": 305,
        "name": "Nankai University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Nankai University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "Business Administration",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 20000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/305"
      }
    ]
  },
  {
    "id": 196,
    "nameEn": "Nanning Normal University",
    "nameZh": "南宁师范大学",
    "provinceEn": "Guangxi",
    "cityEn": "Nanning",
    "provinceZh": "广西壮族自治区",
    "cityZh": "南宁市",
    "provinceMn": "Гуанси",
    "slug": "nanning-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/196",
    "programs": [
      {
        "id": 316,
        "name": "Nanning Normal University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Nanning Normal University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/316"
      }
    ]
  },
  {
    "id": 12,
    "nameEn": "Neijiang Normal University",
    "nameZh": "内江师范学院",
    "provinceEn": "Sichuan",
    "cityEn": "Neijiang",
    "provinceZh": "四川省",
    "cityZh": "内江市",
    "provinceMn": "Сычуань",
    "slug": "neijiang-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/12",
    "programs": []
  },
  {
    "id": 169,
    "nameEn": "Ningbo University",
    "nameZh": "宁波大学",
    "provinceEn": "Zhejiang",
    "cityEn": "Ningbo",
    "provinceZh": "浙江省",
    "cityZh": "宁波市",
    "provinceMn": "Жөжян",
    "slug": "ningbo-university",
    "partnerUrl": "https://www.dongxueji.cn/university/169",
    "programs": [
      {
        "id": 278,
        "name": "Undergraduate Program (Institutional Scholarship) — Ningbo University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Ningbo University President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 20000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/278"
      }
    ]
  },
  {
    "id": 162,
    "nameEn": "North China University of Technology",
    "nameZh": "北方工业大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "north-china-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/162",
    "programs": [
      {
        "id": 282,
        "name": "Undergraduate Program (Institutional Scholarship) — North China University of Technology, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "President's Scholarship of North China University of Technology",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 19600,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 19600
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/282"
      }
    ]
  },
  {
    "id": 177,
    "nameEn": "North Sichuan Medical College",
    "nameZh": "川北医学院",
    "provinceEn": "Sichuan",
    "cityEn": "Nanchong",
    "provinceZh": "四川省",
    "cityZh": "南充市",
    "provinceMn": "Сычуань",
    "slug": "north-sichuan-medical-college",
    "partnerUrl": "https://www.dongxueji.cn/university/177",
    "programs": [
      {
        "id": 275,
        "name": "North Sichuan Medical College Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "North Sichuan Medical College President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 25000,
        "majors": [
          {
            "name": "Clinical Medicine",
            "language": "Chinese",
            "years": 6,
            "tuitionCny": 25000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/275"
      }
    ]
  },
  {
    "id": 240,
    "nameEn": "Northeastern University",
    "nameZh": "东北大学",
    "provinceEn": "Liaoning",
    "cityEn": "Shenyang",
    "provinceZh": "辽宁省",
    "cityZh": "沈阳市",
    "provinceMn": "Ляонин",
    "slug": "northeastern-university",
    "partnerUrl": "https://www.dongxueji.cn/university/240",
    "programs": [
      {
        "id": 351,
        "name": "Northeastern University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Northeastern University President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 18000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 18000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/351"
      }
    ]
  },
  {
    "id": 298,
    "nameEn": "Northwest A&F University",
    "nameZh": "西北农林科技大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xianyang",
    "provinceZh": "陕西省",
    "cityZh": "咸阳市",
    "provinceMn": "Шэньси",
    "slug": "northwest-a-and-f-university",
    "partnerUrl": "https://www.dongxueji.cn/university/298",
    "programs": []
  },
  {
    "id": 326,
    "nameEn": "Northwest Minzu University",
    "nameZh": "西北民族大学",
    "provinceEn": "Gansu",
    "cityEn": "Lanzhou",
    "provinceZh": "甘肃省",
    "cityZh": "兰州市",
    "provinceMn": "Ганьсү",
    "slug": "northwest-minzu-university",
    "partnerUrl": "https://www.dongxueji.cn/university/326",
    "programs": []
  },
  {
    "id": 325,
    "nameEn": "Northwest Normal University",
    "nameZh": "西北师范大学",
    "provinceEn": "Gansu",
    "cityEn": "Lanzhou",
    "provinceZh": "甘肃省",
    "cityZh": "兰州市",
    "provinceMn": "Ганьсү",
    "slug": "northwest-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/325",
    "programs": [
      {
        "id": 271,
        "name": "Undergraduate Program (Institutional Scholarship) — Northwest Normal University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Northwest Normal University President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/271"
      }
    ]
  },
  {
    "id": 272,
    "nameEn": "Northwest University",
    "nameZh": "西北大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "northwest-university",
    "partnerUrl": "https://www.dongxueji.cn/university/272",
    "programs": [
      {
        "id": 343,
        "name": "Northwest University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Northwest University President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "Business Administration",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 20000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/343"
      }
    ]
  },
  {
    "id": 124,
    "nameEn": "Northwestern Polytechnical University",
    "nameZh": "西北工业大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "northwestern-polytechnical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/124",
    "programs": [
      {
        "id": 296,
        "name": "Northwestern Polytechnical University Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Northwestern Polytechnical University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 25000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "English",
            "years": 4,
            "tuitionCny": 25000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/296"
      }
    ]
  },
  {
    "id": 264,
    "nameEn": "Ocean University of China",
    "nameZh": "中国海洋大学",
    "provinceEn": "Shandong",
    "cityEn": "Qingdao",
    "provinceZh": "山东省",
    "cityZh": "青岛市",
    "provinceMn": "Шаньдун",
    "slug": "ocean-university-of-china",
    "partnerUrl": "https://www.dongxueji.cn/university/264",
    "programs": [
      {
        "id": 347,
        "name": "Ocean University of China Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Ocean University of China President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 8000,
        "majors": [
          {
            "name": "International Economics and Trade",
            "language": "English",
            "years": 4,
            "tuitionCny": 8000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/347"
      }
    ]
  },
  {
    "id": 1,
    "nameEn": "Peking University",
    "nameZh": "北京大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "peking-university",
    "partnerUrl": "https://www.dongxueji.cn/university/1",
    "programs": [
      {
        "id": 247,
        "name": "Undergraduate Program (Institutional Scholarship) — Peking University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Peking University President's Scholarship",
        "opens": "2026/10/27",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 50000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "English",
            "years": 4,
            "tuitionCny": 50000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/247"
      }
    ]
  },
  {
    "id": 381,
    "nameEn": "Qilin Vocational and Technical School",
    "nameZh": "麒麟职业技术学校",
    "provinceEn": "Yunnan",
    "cityEn": "Qujing",
    "provinceZh": "云南省",
    "cityZh": "曲靖市",
    "provinceMn": "Юньнань",
    "slug": "qilin-vocational-and-technical-school",
    "partnerUrl": "https://www.dongxueji.cn/university/381",
    "programs": []
  },
  {
    "id": 216,
    "nameEn": "Qingdao Hengxing University of Science and Technology",
    "nameZh": "青岛恒星科技学院",
    "provinceEn": "Shandong",
    "cityEn": "Qingdao",
    "provinceZh": "山东省",
    "cityZh": "青岛市",
    "provinceMn": "Шаньдун",
    "slug": "qingdao-hengxing-university-of-science-and-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/216",
    "programs": [
      {
        "id": 310,
        "name": "Qingdao Hengxing University of Science and Technology Chinese Language Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Chinese language studies",
        "language": "Chinese and English",
        "award": "Qingdao Hengxing University of Science and Technology Non-degree Chinese Language Training Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 23800,
        "majors": [
          {
            "name": "Non-degree Chinese Language Training",
            "language": "Chinese",
            "years": 1,
            "tuitionCny": 14000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/310"
      }
    ]
  },
  {
    "id": 199,
    "nameEn": "Qingdao University",
    "nameZh": "青岛大学",
    "provinceEn": "Shandong",
    "cityEn": "Qingdao",
    "provinceZh": "山东省",
    "cityZh": "青岛市",
    "provinceMn": "Шаньдун",
    "slug": "qingdao-university",
    "partnerUrl": "https://www.dongxueji.cn/university/199",
    "programs": [
      {
        "id": 314,
        "name": "Qingdao University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Qingdao University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 18000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 18000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/314"
      }
    ]
  },
  {
    "id": 373,
    "nameEn": "Qinghai Institute of Technology",
    "nameZh": "青海理工学院",
    "provinceEn": "Qinghai",
    "cityEn": "Xining",
    "provinceZh": "青海省",
    "cityZh": "西宁市",
    "provinceMn": "Цинхай",
    "slug": "qinghai-institute-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/373",
    "programs": []
  },
  {
    "id": 372,
    "nameEn": "Qinghai University",
    "nameZh": "青海大学",
    "provinceEn": "Qinghai",
    "cityEn": "Xining",
    "provinceZh": "青海省",
    "cityZh": "西宁市",
    "provinceMn": "Цинхай",
    "slug": "qinghai-university",
    "partnerUrl": "https://www.dongxueji.cn/university/372",
    "programs": []
  },
  {
    "id": 259,
    "nameEn": "Qufu Normal University",
    "nameZh": "曲阜师范大学",
    "provinceEn": "Shandong",
    "cityEn": "Rizhao",
    "provinceZh": "山东省",
    "cityZh": "日照市",
    "provinceMn": "Шаньдун",
    "slug": "qufu-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/259",
    "programs": []
  },
  {
    "id": 187,
    "nameEn": "Qujing Normal University",
    "nameZh": "曲靖师范学院",
    "provinceEn": "Yunnan",
    "cityEn": "Qujing",
    "provinceZh": "云南省",
    "cityZh": "曲靖市",
    "provinceMn": "Юньнань",
    "slug": "qujing-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/187",
    "programs": []
  },
  {
    "id": 268,
    "nameEn": "Renmin University of China",
    "nameZh": "中国人民大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "renmin-university-of-china",
    "partnerUrl": "https://www.dongxueji.cn/university/268",
    "programs": [
      {
        "id": 345,
        "name": "Renmin University of China Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Renmin University of China President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 24000,
        "majors": [
          {
            "name": "Chinese Language",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 24000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/345"
      }
    ]
  },
  {
    "id": 97,
    "nameEn": "Shaanxi Normal University",
    "nameZh": "陕西师范大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "shaanxi-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/97",
    "programs": []
  },
  {
    "id": 107,
    "nameEn": "Shaanxi University of Industry and Technology",
    "nameZh": "陕西工业职业技术大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xianyang",
    "provinceZh": "陕西省",
    "cityZh": "咸阳市",
    "provinceMn": "Шэньси",
    "slug": "shaanxi-university-of-industry-and-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/107",
    "programs": []
  },
  {
    "id": 299,
    "nameEn": "Shaanxi University of Science & Technology",
    "nameZh": "陕西科技大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "shaanxi-university-of-science-and-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/299",
    "programs": [
      {
        "id": 331,
        "name": "Shaanxi University of Science and Technology Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Shaanxi University of Science & Technology President’s Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 20000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/331"
      }
    ]
  },
  {
    "id": 273,
    "nameEn": "Shaanxi Vocational and Technical University of Agriculture and Forestry",
    "nameZh": "陕西农林职业技术大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xianyang",
    "provinceZh": "陕西省",
    "cityZh": "咸阳市",
    "provinceMn": "Шэньси",
    "slug": "shaanxi-vocational-and-technical-university-of-agriculture-and-forestry",
    "partnerUrl": "https://www.dongxueji.cn/university/273",
    "programs": []
  },
  {
    "id": 215,
    "nameEn": "Shandong Engineering Vocational and Technical University",
    "nameZh": "山东工程职业技术大学",
    "provinceEn": "Shandong",
    "cityEn": "Jinan",
    "provinceZh": "山东省",
    "cityZh": "济南市",
    "provinceMn": "Шаньдун",
    "slug": "shandong-engineering-vocational-and-technical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/215",
    "programs": []
  },
  {
    "id": 210,
    "nameEn": "Shandong First Medical University",
    "nameZh": "山东第一医科大学",
    "provinceEn": "Shandong",
    "cityEn": "Jinan",
    "provinceZh": "山东省",
    "cityZh": "济南市",
    "provinceMn": "Шаньдун",
    "slug": "shandong-first-medical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/210",
    "programs": []
  },
  {
    "id": 214,
    "nameEn": "Shandong University of Political Science and Law",
    "nameZh": "山东政法学院",
    "provinceEn": "Shandong",
    "cityEn": "Jinan",
    "provinceZh": "山东省",
    "cityZh": "济南市",
    "provinceMn": "Шаньдун",
    "slug": "shandong-university-of-political-science-and-law",
    "partnerUrl": "https://www.dongxueji.cn/university/214",
    "programs": []
  },
  {
    "id": 14,
    "nameEn": "Shandong University of Technology",
    "nameZh": "山东理工大学",
    "provinceEn": "Shandong",
    "cityEn": "Zibo",
    "provinceZh": "山东省",
    "cityZh": "淄博市",
    "provinceMn": "Шаньдун",
    "slug": "shandong-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/14",
    "programs": []
  },
  {
    "id": 19,
    "nameEn": "Shandong University of Traditional",
    "nameZh": "山东中医药大学",
    "provinceEn": "Shandong",
    "cityEn": "Jinan",
    "provinceZh": "山东省",
    "cityZh": "济南市",
    "provinceMn": "Шаньдун",
    "slug": "shandong-university-of-traditional",
    "partnerUrl": "https://www.dongxueji.cn/university/19",
    "programs": []
  },
  {
    "id": 369,
    "nameEn": "Shanghai Business School",
    "nameZh": "上海商学院",
    "provinceEn": "Shanghai",
    "cityEn": "Shanghai",
    "provinceZh": "上海",
    "cityZh": "上海市",
    "provinceMn": "Шанхай",
    "slug": "shanghai-business-school",
    "partnerUrl": "https://www.dongxueji.cn/university/369",
    "programs": [
      {
        "id": 254,
        "name": "Undergraduate Program (Institutional Scholarship) — Shanghai Business School, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Shanghai Business School President's Scholarship",
        "opens": "2026/10/27",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 24000,
        "majors": [
          {
            "name": "Business Administration",
            "language": "English",
            "years": 4,
            "tuitionCny": 24000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/254"
      }
    ]
  },
  {
    "id": 119,
    "nameEn": "Shanghai International Studies University",
    "nameZh": "上海外国语大学",
    "provinceEn": "Shanghai",
    "cityEn": "Shanghai",
    "provinceZh": "上海",
    "cityZh": "上海市",
    "provinceMn": "Шанхай",
    "slug": "shanghai-international-studies-university",
    "partnerUrl": "https://www.dongxueji.cn/university/119",
    "programs": [
      {
        "id": 246,
        "name": "Shanghai International Studies University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "President's Scholarship of Shanghai International Studies University",
        "opens": "2026/10/22",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 22000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 22000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/246"
      }
    ]
  },
  {
    "id": 10,
    "nameEn": "Shanghai Jiao Tong University",
    "nameZh": "上海交通大学",
    "provinceEn": "Shanghai",
    "cityEn": "Shanghai",
    "provinceZh": "上海",
    "cityZh": "上海市",
    "provinceMn": "Шанхай",
    "slug": "shanghai-jiao-tong-university",
    "partnerUrl": "https://www.dongxueji.cn/university/10",
    "programs": [
      {
        "id": 352,
        "name": "Shanghai Jiao Tong University Undergraduate Program (Self-Financed), Fall 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": null,
        "opens": "2026/11/04",
        "closes": "2027/03/31",
        "seats": 20,
        "applicationFeeCny": 2700,
        "tuitionCny": 150000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "English",
            "years": 4,
            "tuitionCny": 150000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/352"
      },
      {
        "id": 249,
        "name": "Shanghai Jiao Tong University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Shanghai Jiao Tong University President's Scholarship",
        "opens": "2026/10/27",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 80000,
        "majors": [
          {
            "name": "Civil Engineering",
            "language": "English",
            "years": 4,
            "tuitionCny": 80000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/249"
      }
    ]
  },
  {
    "id": 367,
    "nameEn": "Shanghai Lida University",
    "nameZh": "上海立达学院",
    "provinceEn": "Shanghai",
    "cityEn": "Shanghai",
    "provinceZh": "上海",
    "cityZh": "上海市",
    "provinceMn": "Шанхай",
    "slug": "shanghai-lida-university",
    "partnerUrl": "https://www.dongxueji.cn/university/367",
    "programs": []
  },
  {
    "id": 121,
    "nameEn": "Shanghai University",
    "nameZh": "上海大学",
    "provinceEn": "Shanghai",
    "cityEn": "Shanghai",
    "provinceZh": "上海",
    "cityZh": "上海市",
    "provinceMn": "Шанхай",
    "slug": "shanghai-university",
    "partnerUrl": "https://www.dongxueji.cn/university/121",
    "programs": [
      {
        "id": 298,
        "name": "Shanghai University Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Shanghai University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 21000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 21000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/298"
      }
    ]
  },
  {
    "id": 120,
    "nameEn": "Shanghai University of Finance and Economics",
    "nameZh": "上海财经大学",
    "provinceEn": "Shanghai",
    "cityEn": "Shanghai",
    "provinceZh": "上海",
    "cityZh": "上海市",
    "provinceMn": "Шанхай",
    "slug": "shanghai-university-of-finance-and-economics",
    "partnerUrl": "https://www.dongxueji.cn/university/120",
    "programs": [
      {
        "id": 299,
        "name": "Shanghai University of Finance and Economics Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Shanghai University of Finance and Economics President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 30000,
        "majors": [
          {
            "name": "International Economics and Trade",
            "language": "English",
            "years": 4,
            "tuitionCny": 30000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/299"
      }
    ]
  },
  {
    "id": 100,
    "nameEn": "Shanghai University of Traditional Chinese Medicine",
    "nameZh": "上海中医药大学",
    "provinceEn": "Shanghai",
    "cityEn": "Shanghai",
    "provinceZh": "上海",
    "cityZh": "上海市",
    "provinceMn": "Шанхай",
    "slug": "shanghai-university-of-traditional-chinese-medicine",
    "partnerUrl": "https://www.dongxueji.cn/university/100",
    "programs": []
  },
  {
    "id": 368,
    "nameEn": "ShanghaiTech University",
    "nameZh": "上海科技大学",
    "provinceEn": "Shanghai",
    "cityEn": "Shanghai",
    "provinceZh": "上海",
    "cityZh": "上海市",
    "provinceMn": "Шанхай",
    "slug": "shanghaitech-university",
    "partnerUrl": "https://www.dongxueji.cn/university/368",
    "programs": []
  },
  {
    "id": 27,
    "nameEn": "Shanxi University",
    "nameZh": "山西大学",
    "provinceEn": "Shanxi",
    "cityEn": "Taiyuan",
    "provinceZh": "山西省",
    "cityZh": "太原市",
    "provinceMn": "Шаньси",
    "slug": "shanxi-university",
    "partnerUrl": "https://www.dongxueji.cn/university/27",
    "programs": []
  },
  {
    "id": 279,
    "nameEn": "Shanxi University of Traditional Chinese Medicine",
    "nameZh": "山西中医药大学",
    "provinceEn": "Shanxi",
    "cityEn": "Taiyuan",
    "provinceZh": "山西省",
    "cityZh": "太原市",
    "provinceMn": "Шаньси",
    "slug": "shanxi-university-of-traditional-chinese-medicine",
    "partnerUrl": "https://www.dongxueji.cn/university/279",
    "programs": []
  },
  {
    "id": 313,
    "nameEn": "Shenyang Ligong University",
    "nameZh": "沈阳理工大学",
    "provinceEn": "Liaoning",
    "cityEn": "Shenyang",
    "provinceZh": "辽宁省",
    "cityZh": "沈阳市",
    "provinceMn": "Ляонин",
    "slug": "shenyang-ligong-university",
    "partnerUrl": "https://www.dongxueji.cn/university/313",
    "programs": [
      {
        "id": 274,
        "name": "Undergraduate Program (Institutional Scholarship) — Shenyang Ligong University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Shenyang Ligong University President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 18000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 18000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/274"
      }
    ]
  },
  {
    "id": 246,
    "nameEn": "Shenyang Medical College",
    "nameZh": "沈阳医学院",
    "provinceEn": "Liaoning",
    "cityEn": "Shenyang",
    "provinceZh": "辽宁省",
    "cityZh": "沈阳市",
    "provinceMn": "Ляонин",
    "slug": "shenyang-medical-college",
    "partnerUrl": "https://www.dongxueji.cn/university/246",
    "programs": [
      {
        "id": 349,
        "name": "Shenyang Medical College Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Shenyang Medical College President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 25000,
        "majors": [
          {
            "name": "Clinical Medicine",
            "language": "Chinese",
            "years": 6,
            "tuitionCny": 25000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/349"
      }
    ]
  },
  {
    "id": 248,
    "nameEn": "Shenyang University",
    "nameZh": "沈阳大学",
    "provinceEn": "Liaoning",
    "cityEn": "Shenyang",
    "provinceZh": "辽宁省",
    "cityZh": "沈阳市",
    "provinceMn": "Ляонин",
    "slug": "shenyang-university",
    "partnerUrl": "https://www.dongxueji.cn/university/248",
    "programs": [
      {
        "id": 348,
        "name": "Shenyang University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Shenyang University President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 16000,
        "majors": [
          {
            "name": "Chinese Language",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 16000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/348"
      }
    ]
  },
  {
    "id": 126,
    "nameEn": "Shenzhen University",
    "nameZh": "深圳大学",
    "provinceEn": "Guangdong",
    "cityEn": "Shenzhen",
    "provinceZh": "广东省",
    "cityZh": "深圳市",
    "provinceMn": "Гуандун",
    "slug": "shenzhen-university",
    "partnerUrl": "https://www.dongxueji.cn/university/126",
    "programs": [
      {
        "id": 294,
        "name": "Undergraduate Program (Institutional Scholarship) — Shenzhen University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Shenzhen University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 26000,
        "majors": [
          {
            "name": "Business Administration",
            "language": "English",
            "years": 4,
            "tuitionCny": 26000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/294"
      }
    ]
  },
  {
    "id": 392,
    "nameEn": "Shijiazhuang Tiedao University",
    "nameZh": "石家庄铁道大学",
    "provinceEn": "Hebei",
    "cityEn": "Shijiazhuang",
    "provinceZh": "河北省",
    "cityZh": "石家庄市",
    "provinceMn": "Хэбэй",
    "slug": "shijiazhuang-tiedao-university",
    "partnerUrl": "https://www.dongxueji.cn/university/392",
    "programs": [
      {
        "id": 232,
        "name": "2027 Fall Shijiazhuang Tiedao University Master's President Scholarship",
        "degree": "Master",
        "language": "English",
        "award": "Shijiazhuang Tiedao University President's Scholarship",
        "opens": "2026/10/08",
        "closes": "2027/08/30",
        "seats": 10,
        "applicationFeeCny": 3500,
        "tuitionCny": 18000,
        "majors": [
          {
            "name": "Civil Engineering",
            "language": "English",
            "years": 3,
            "tuitionCny": 18000
          },
          {
            "name": "Mechanical Engineering",
            "language": "English",
            "years": 3,
            "tuitionCny": 18000
          },
          {
            "name": "Business Administration",
            "language": "English",
            "years": 3,
            "tuitionCny": 18000
          },
          {
            "name": "Computer Science and Technology",
            "language": "English",
            "years": 3,
            "tuitionCny": 18000
          },
          {
            "name": "Engineering Mechanics",
            "language": "English",
            "years": 3,
            "tuitionCny": 18000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/232"
      }
    ]
  },
  {
    "id": 11,
    "nameEn": "Sichuan Normal University",
    "nameZh": "四川师范大学",
    "provinceEn": "Sichuan",
    "cityEn": "Chengdu",
    "provinceZh": "四川省",
    "cityZh": "成都市",
    "provinceMn": "Сычуань",
    "slug": "sichuan-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/11",
    "programs": [
      {
        "id": 251,
        "name": "Undergraduate Program (Institutional Scholarship) — Sichuan Normal University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Sichuan Normal University President's Scholarship",
        "opens": "2026/10/27",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/251"
      }
    ]
  },
  {
    "id": 23,
    "nameEn": "Sichuan University",
    "nameZh": "四川大学",
    "provinceEn": "Sichuan",
    "cityEn": "Chengdu",
    "provinceZh": "四川省",
    "cityZh": "成都市",
    "provinceMn": "Сычуань",
    "slug": "sichuan-university",
    "partnerUrl": "https://www.dongxueji.cn/university/23",
    "programs": []
  },
  {
    "id": 173,
    "nameEn": "Sichuan Vocational and Technical College",
    "nameZh": "四川职业技术学院",
    "provinceEn": "Sichuan",
    "cityEn": "Suining",
    "provinceZh": "四川省",
    "cityZh": "遂宁市",
    "provinceMn": "Сычуань",
    "slug": "sichuan-vocational-and-technical-college",
    "partnerUrl": "https://www.dongxueji.cn/university/173",
    "programs": []
  },
  {
    "id": 320,
    "nameEn": "Soochow University",
    "nameZh": "苏州大学",
    "provinceEn": "Jiangsu",
    "cityEn": "Suzhou",
    "provinceZh": "江苏省",
    "cityZh": "苏州市",
    "provinceMn": "Жянсү",
    "slug": "soochow-university",
    "partnerUrl": "https://www.dongxueji.cn/university/320",
    "programs": [
      {
        "id": 272,
        "name": "Soochow University Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Soochow University President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 30000,
        "majors": [
          {
            "name": "MBBS",
            "language": "English",
            "years": 6,
            "tuitionCny": 30000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/272"
      }
    ]
  },
  {
    "id": 337,
    "nameEn": "South China Business College, Guangdong University of Foreign Studies",
    "nameZh": "广东外语外贸大学南国商学院",
    "provinceEn": "Guangdong",
    "cityEn": "Guangzhou",
    "provinceZh": "广东省",
    "cityZh": "广州市",
    "provinceMn": "Гуандун",
    "slug": "south-china-business-college-guangdong-university-of-foreign-studies",
    "partnerUrl": "https://www.dongxueji.cn/university/337",
    "programs": []
  },
  {
    "id": 206,
    "nameEn": "South China Normal University",
    "nameZh": "华南师范大学",
    "provinceEn": "Guangdong",
    "cityEn": "Guangzhou",
    "provinceZh": "广东省",
    "cityZh": "广州市",
    "provinceMn": "Гуандун",
    "slug": "south-china-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/206",
    "programs": [
      {
        "id": 312,
        "name": "South China Normal University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "South China Normal University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 17000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 17000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/312"
      }
    ]
  },
  {
    "id": 348,
    "nameEn": "South China University of Technology",
    "nameZh": "华南理工大学",
    "provinceEn": "Guangdong",
    "cityEn": "Guangzhou",
    "provinceZh": "广东省",
    "cityZh": "广州市",
    "provinceMn": "Гуандун",
    "slug": "south-china-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/348",
    "programs": [
      {
        "id": 266,
        "name": "Undergraduate Program (Institutional Scholarship) — South China University of Technology, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "South China University of Technology President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 23000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 23000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/266"
      }
    ]
  },
  {
    "id": 338,
    "nameEn": "Southern University of Science and Technology",
    "nameZh": "南方科技大学",
    "provinceEn": "Guangdong",
    "cityEn": "Shenzhen",
    "provinceZh": "广东省",
    "cityZh": "深圳市",
    "provinceMn": "Гуандун",
    "slug": "southern-university-of-science-and-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/338",
    "programs": [
      {
        "id": 268,
        "name": "Southern University of Science and Technology Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Southern University of Science and Technology President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/29",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 30000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 30000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/268"
      }
    ]
  },
  {
    "id": 96,
    "nameEn": "Southwest Jiaotong University",
    "nameZh": "西南交通大学",
    "provinceEn": "Sichuan",
    "cityEn": "Chengdu",
    "provinceZh": "四川省",
    "cityZh": "成都市",
    "provinceMn": "Сычуань",
    "slug": "southwest-jiaotong-university",
    "partnerUrl": "https://www.dongxueji.cn/university/96",
    "programs": []
  },
  {
    "id": 13,
    "nameEn": "Southwest University",
    "nameZh": "西南大学",
    "provinceEn": "Chongqing",
    "cityEn": "Chongqing",
    "provinceZh": "重庆",
    "cityZh": "重庆市",
    "provinceMn": "Чунцин",
    "slug": "southwest-university",
    "partnerUrl": "https://www.dongxueji.cn/university/13",
    "programs": []
  },
  {
    "id": 82,
    "nameEn": "Southwest University of Political Science & Law",
    "nameZh": "西南政法大学",
    "provinceEn": "Chongqing",
    "cityEn": "Chongqing",
    "provinceZh": "重庆",
    "cityZh": "重庆市",
    "provinceMn": "Чунцин",
    "slug": "southwest-university-of-political-science-and-law",
    "partnerUrl": "https://www.dongxueji.cn/university/82",
    "programs": []
  },
  {
    "id": 132,
    "nameEn": "Southwestern University of Finance and Economics",
    "nameZh": "西南财经大学",
    "provinceEn": "Sichuan",
    "cityEn": "Chengdu",
    "provinceZh": "四川省",
    "cityZh": "成都市",
    "provinceMn": "Сычуань",
    "slug": "southwestern-university-of-finance-and-economics",
    "partnerUrl": "https://www.dongxueji.cn/university/132",
    "programs": [
      {
        "id": 292,
        "name": "Southwestern University of Finance and Economics Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "President's Scholarship of Southwestern University of Finance and Economics",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 16000,
        "majors": [
          {
            "name": "Business Administration",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 16000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/292"
      }
    ]
  },
  {
    "id": 321,
    "nameEn": "Suqian University",
    "nameZh": "宿迁学院",
    "provinceEn": "Jiangsu",
    "cityEn": "Suqian",
    "provinceZh": "江苏省",
    "cityZh": "宿迁市",
    "provinceMn": "Жянсү",
    "slug": "suqian-university",
    "partnerUrl": "https://www.dongxueji.cn/university/321",
    "programs": []
  },
  {
    "id": 281,
    "nameEn": "Taiyuan Normal University",
    "nameZh": "太原师范学院",
    "provinceEn": "Shanxi",
    "cityEn": "Taiyuan",
    "provinceZh": "山西省",
    "cityZh": "太原市",
    "provinceMn": "Шаньси",
    "slug": "taiyuan-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/281",
    "programs": []
  },
  {
    "id": 278,
    "nameEn": "Taiyuan University of Technology",
    "nameZh": "太原理工大学",
    "provinceEn": "Shanxi",
    "cityEn": "Taiyuan",
    "provinceZh": "山西省",
    "cityZh": "太原市",
    "provinceMn": "Шаньси",
    "slug": "taiyuan-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/278",
    "programs": [
      {
        "id": 341,
        "name": "Taiyuan University of Technology Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Taiyuan University of Technology President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 10000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "English",
            "years": 4,
            "tuitionCny": 10000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/341"
      }
    ]
  },
  {
    "id": 370,
    "nameEn": "TaiZhou University",
    "nameZh": "泰州学院",
    "provinceEn": "Jiangsu",
    "cityEn": "Taizhou",
    "provinceZh": "江苏省",
    "cityZh": "泰州市",
    "provinceMn": "Жянсү",
    "slug": "taizhou-university",
    "partnerUrl": "https://www.dongxueji.cn/university/370",
    "programs": []
  },
  {
    "id": 134,
    "nameEn": "The Chinese University of Hong Kong, Shenzhen",
    "nameZh": "香港中文大学（深圳）",
    "provinceEn": "Guangdong",
    "cityEn": "Shenzhen",
    "provinceZh": "广东省",
    "cityZh": "深圳市",
    "provinceMn": "Гуандун",
    "slug": "the-chinese-university-of-hong-kong-shenzhen",
    "partnerUrl": "https://www.dongxueji.cn/university/134",
    "programs": []
  },
  {
    "id": 223,
    "nameEn": "Tianjin College of Transport",
    "nameZh": "天津交通职业学院",
    "provinceEn": "Tianjin",
    "cityEn": "Tianjin",
    "provinceZh": "天津",
    "cityZh": "天津市",
    "provinceMn": "Тяньжин",
    "slug": "tianjin-college-of-transport",
    "partnerUrl": "https://www.dongxueji.cn/university/223",
    "programs": []
  },
  {
    "id": 39,
    "nameEn": "Tianjin Conservatory of Music",
    "nameZh": "天津音乐学院",
    "provinceEn": "Tianjin",
    "cityEn": "Tianjin",
    "provinceZh": "天津",
    "cityZh": "天津市",
    "provinceMn": "Тяньжин",
    "slug": "tianjin-conservatory-of-music",
    "partnerUrl": "https://www.dongxueji.cn/university/39",
    "programs": []
  },
  {
    "id": 160,
    "nameEn": "Tianjin Foreign Studies University",
    "nameZh": "天津外国语大学",
    "provinceEn": "Tianjin",
    "cityEn": "Tianjin",
    "provinceZh": "天津",
    "cityZh": "天津市",
    "provinceMn": "Тяньжин",
    "slug": "tianjin-foreign-studies-university",
    "partnerUrl": "https://www.dongxueji.cn/university/160",
    "programs": [
      {
        "id": 284,
        "name": "Undergraduate Program (Institutional Scholarship) — Tianjin Foreign Studies University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Tianjin Foreign Studies University President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15400,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 15400
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/284"
      }
    ]
  },
  {
    "id": 224,
    "nameEn": "Tianjin Medical University",
    "nameZh": "天津医科大学",
    "provinceEn": "Tianjin",
    "cityEn": "Tianjin",
    "provinceZh": "天津",
    "cityZh": "天津市",
    "provinceMn": "Тяньжин",
    "slug": "tianjin-medical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/224",
    "programs": [
      {
        "id": 306,
        "name": "Tianjin Medical University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Tianjin Medical University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 25000,
        "majors": [
          {
            "name": "Clinical Medicine",
            "language": "Chinese",
            "years": 5,
            "tuitionCny": 25000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/306"
      }
    ]
  },
  {
    "id": 226,
    "nameEn": "Tianjin Normal University",
    "nameZh": "天津师范大学",
    "provinceEn": "Tianjin",
    "cityEn": "Tianjin",
    "provinceZh": "天津",
    "cityZh": "天津市",
    "provinceMn": "Тяньжин",
    "slug": "tianjin-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/226",
    "programs": [
      {
        "id": 304,
        "name": "Tianjin Normal University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Tianjin Normal University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 17800,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 17800
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/304"
      }
    ]
  },
  {
    "id": 161,
    "nameEn": "Tianjin University of Finance and Economics",
    "nameZh": "天津财经大学",
    "provinceEn": "Tianjin",
    "cityEn": "Tianjin",
    "provinceZh": "天津",
    "cityZh": "天津市",
    "provinceMn": "Тяньжин",
    "slug": "tianjin-university-of-finance-and-economics",
    "partnerUrl": "https://www.dongxueji.cn/university/161",
    "programs": [
      {
        "id": 283,
        "name": "Undergraduate Program (Institutional Scholarship) — Tianjin University of Finance and Economics, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Tianjin University of Finance and Economics President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 16600,
        "majors": [
          {
            "name": "Business Administration",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 16600
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/283"
      }
    ]
  },
  {
    "id": 166,
    "nameEn": "Tianjin University of Traditional Chinese Medicine",
    "nameZh": "天津中医药大学",
    "provinceEn": "Tianjin",
    "cityEn": "Tianjin",
    "provinceZh": "天津",
    "cityZh": "天津市",
    "provinceMn": "Тяньжин",
    "slug": "tianjin-university-of-traditional-chinese-medicine",
    "partnerUrl": "https://www.dongxueji.cn/university/166",
    "programs": []
  },
  {
    "id": 364,
    "nameEn": "Tianshui Normal University",
    "nameZh": "天水师范学院",
    "provinceEn": "Gansu",
    "cityEn": "Tianshui",
    "provinceZh": "甘肃省",
    "cityZh": "天水市",
    "provinceMn": "Ганьсү",
    "slug": "tianshui-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/364",
    "programs": []
  },
  {
    "id": 282,
    "nameEn": "Tongling University",
    "nameZh": "铜陵学院",
    "provinceEn": "Anhui",
    "cityEn": "Tongling",
    "provinceZh": "安徽省",
    "cityZh": "铜陵市",
    "provinceMn": "Аньхуй",
    "slug": "tongling-university",
    "partnerUrl": "https://www.dongxueji.cn/university/282",
    "programs": []
  },
  {
    "id": 284,
    "nameEn": "Tongren Polytechnic University",
    "nameZh": "铜仁职业技术大学",
    "provinceEn": "Guizhou",
    "cityEn": "Tongren",
    "provinceZh": "贵州省",
    "cityZh": "铜仁市",
    "provinceMn": "Гүйжоу",
    "slug": "tongren-polytechnic-university",
    "partnerUrl": "https://www.dongxueji.cn/university/284",
    "programs": [
      {
        "id": 244,
        "name": "Tongren Polytechnic University Institutional Scholarship for Chinese Language Program, Spring 2027",
        "degree": "Chinese language studies",
        "language": "Chinese",
        "award": "Tongren Polytechnic University President's Scholarship",
        "opens": "2026/10/20",
        "closes": "2026/12/01",
        "seats": 5,
        "applicationFeeCny": null,
        "tuitionCny": null,
        "majors": [],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/244"
      }
    ]
  },
  {
    "id": 7,
    "nameEn": "Tsinghua University",
    "nameZh": "清华大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "tsinghua-university",
    "partnerUrl": "https://www.dongxueji.cn/university/7",
    "programs": []
  },
  {
    "id": 95,
    "nameEn": "University of Electronic Science and Technology of China",
    "nameZh": "电子科技大学",
    "provinceEn": "Sichuan",
    "cityEn": "Chengdu",
    "provinceZh": "四川省",
    "cityZh": "成都市",
    "provinceMn": "Сычуань",
    "slug": "university-of-electronic-science-and-technology-of-china",
    "partnerUrl": "https://www.dongxueji.cn/university/95",
    "programs": []
  },
  {
    "id": 22,
    "nameEn": "University of Jinan",
    "nameZh": "济南大学",
    "provinceEn": "Shandong",
    "cityEn": "Jinan",
    "provinceZh": "山东省",
    "cityZh": "济南市",
    "provinceMn": "Шаньдун",
    "slug": "university-of-jinan",
    "partnerUrl": "https://www.dongxueji.cn/university/22",
    "programs": [
      {
        "id": 222,
        "name": "Spring 2027 Jinan University Chinese Language University Scholarship",
        "degree": "Chinese language studies",
        "language": "Chinese",
        "award": "University of Jinan President's Scholarship",
        "opens": "2026/09/17",
        "closes": "2026/12/30",
        "seats": 20,
        "applicationFeeCny": null,
        "tuitionCny": 14000,
        "majors": [],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/222"
      }
    ]
  },
  {
    "id": 292,
    "nameEn": "University of Science and Technology Beijing",
    "nameZh": "北京科技大学",
    "provinceEn": "Beijing",
    "cityEn": "Beijing",
    "provinceZh": "北京",
    "cityZh": "北京市",
    "provinceMn": "Бээжин",
    "slug": "university-of-science-and-technology-beijing",
    "partnerUrl": "https://www.dongxueji.cn/university/292",
    "programs": [
      {
        "id": 339,
        "name": "University of Science and Technology Beijing Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "University of Science and Technology Beijing President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2700,
        "tuitionCny": 23300,
        "majors": [
          {
            "name": "International Economics and Trade",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 23300
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/339"
      }
    ]
  },
  {
    "id": 143,
    "nameEn": "University of South China",
    "nameZh": "南华大学",
    "provinceEn": "Hunan",
    "cityEn": "Hengyang",
    "provinceZh": "湖南省",
    "cityZh": "衡阳市",
    "provinceMn": "Хунань",
    "slug": "university-of-south-china",
    "partnerUrl": "https://www.dongxueji.cn/university/143",
    "programs": [
      {
        "id": 289,
        "name": "University of South China Undergraduate Institutional Scholarship, Autumn 2027",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "University of South China President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "Software Engineering",
            "language": "English",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/289"
      }
    ]
  },
  {
    "id": 312,
    "nameEn": "Urban Vocational College of Sichuan",
    "nameZh": "四川城市职业学院",
    "provinceEn": "Sichuan",
    "cityEn": "Chengdu",
    "provinceZh": "四川省",
    "cityZh": "成都市",
    "provinceMn": "Сычуань",
    "slug": "urban-vocational-college-of-sichuan",
    "partnerUrl": "https://www.dongxueji.cn/university/312",
    "programs": []
  },
  {
    "id": 103,
    "nameEn": "Urumqi Vocational University",
    "nameZh": "乌鲁木齐职业大学",
    "provinceEn": "Xinjiang",
    "cityEn": "Urumqi",
    "provinceZh": "新疆维吾尔自治区",
    "cityZh": "乌鲁木齐市",
    "provinceMn": "Шинжаан",
    "slug": "urumqi-vocational-university",
    "partnerUrl": "https://www.dongxueji.cn/university/103",
    "programs": []
  },
  {
    "id": 389,
    "nameEn": "Wenzhou Institute of Technology",
    "nameZh": "温州理工学院",
    "provinceEn": "Zhejiang",
    "cityEn": "Wenzhou",
    "provinceZh": "浙江省",
    "cityZh": "温州市",
    "provinceMn": "Жөжян",
    "slug": "wenzhou-institute-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/389",
    "programs": []
  },
  {
    "id": 382,
    "nameEn": "Wenzhou Vocational and Technical College",
    "nameZh": "温州职业技术学院",
    "provinceEn": "Zhejiang",
    "cityEn": "Wenzhou",
    "provinceZh": "浙江省",
    "cityZh": "温州市",
    "provinceMn": "Жөжян",
    "slug": "wenzhou-vocational-and-technical-college",
    "partnerUrl": "https://www.dongxueji.cn/university/382",
    "programs": []
  },
  {
    "id": 380,
    "nameEn": "Wenzhou Vocational Institute of Science and Technology",
    "nameZh": "温州科技职业科技学院",
    "provinceEn": "Zhejiang",
    "cityEn": "Wenzhou",
    "provinceZh": "浙江省",
    "cityZh": "温州市",
    "provinceMn": "Жөжян",
    "slug": "wenzhou-vocational-institute-of-science-and-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/380",
    "programs": []
  },
  {
    "id": 378,
    "nameEn": "WUCHANG SHOUYI UNIVERSITY",
    "nameZh": "武昌首义学院",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "wuchang-shouyi-university",
    "partnerUrl": "https://www.dongxueji.cn/university/378",
    "programs": []
  },
  {
    "id": 354,
    "nameEn": "Wuchang University of Technology",
    "nameZh": "武昌理工学院",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "wuchang-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/354",
    "programs": [
      {
        "id": 264,
        "name": "Undergraduate Program (Institutional Scholarship) — Wuchang University of Technology, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Wuchang University of Technology President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 12000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 12000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/264"
      }
    ]
  },
  {
    "id": 38,
    "nameEn": "Wuhan Conservatory of Music",
    "nameZh": "武汉音乐学院",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "wuhan-conservatory-of-music",
    "partnerUrl": "https://www.dongxueji.cn/university/38",
    "programs": []
  },
  {
    "id": 360,
    "nameEn": "Wuhan Institute of Business and Technology",
    "nameZh": "武汉工商学院",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "wuhan-institute-of-business-and-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/360",
    "programs": []
  },
  {
    "id": 377,
    "nameEn": "Wuhan Qingchuan University",
    "nameZh": "武汉晴川学院",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "wuhan-qingchuan-university",
    "partnerUrl": "https://www.dongxueji.cn/university/377",
    "programs": []
  },
  {
    "id": 362,
    "nameEn": "Wuhan Textile University",
    "nameZh": "武汉纺织大学",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "wuhan-textile-university",
    "partnerUrl": "https://www.dongxueji.cn/university/362",
    "programs": []
  },
  {
    "id": 185,
    "nameEn": "Wuhan University",
    "nameZh": "武汉大学",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "wuhan-university",
    "partnerUrl": "https://www.dongxueji.cn/university/185",
    "programs": [
      {
        "id": 320,
        "name": "Wuhan University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Wuhan University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 20000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/320"
      }
    ]
  },
  {
    "id": 181,
    "nameEn": "Wuhan University of Technology",
    "nameZh": "武汉理工大学",
    "provinceEn": "Hubei",
    "cityEn": "Wuhan",
    "provinceZh": "湖北省",
    "cityZh": "武汉市",
    "provinceMn": "Хүбэй",
    "slug": "wuhan-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/181",
    "programs": [
      {
        "id": 323,
        "name": "Wuhan University of Technology Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Wuhan University of Technology President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 20000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/323"
      }
    ]
  },
  {
    "id": 86,
    "nameEn": "Wuxi University of Technology",
    "nameZh": "无锡职业技术大学",
    "provinceEn": "Jiangsu",
    "cityEn": "Wuxi",
    "provinceZh": "江苏省",
    "cityZh": "无锡市",
    "provinceMn": "Жянсү",
    "slug": "wuxi-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/86",
    "programs": []
  },
  {
    "id": 108,
    "nameEn": "Xi'an Academy of Drama",
    "nameZh": "西安戏剧学院",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xi-an-academy-of-drama",
    "partnerUrl": "https://www.dongxueji.cn/university/108",
    "programs": []
  },
  {
    "id": 105,
    "nameEn": "Xi'an Aeronautical University",
    "nameZh": "西安航空学院",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xi-an-aeronautical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/105",
    "programs": []
  },
  {
    "id": 109,
    "nameEn": "Xi'an Fanyi University",
    "nameZh": "西安翻译学院",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xi-an-fanyi-university",
    "partnerUrl": "https://www.dongxueji.cn/university/109",
    "programs": []
  },
  {
    "id": 276,
    "nameEn": "Xi'An International Studies University",
    "nameZh": "西安外国语大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xi-an-international-studies-university",
    "partnerUrl": "https://www.dongxueji.cn/university/276",
    "programs": [
      {
        "id": 342,
        "name": "Xi'an International Studies University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Xi’an International Studies University President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 16000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 16000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/342"
      }
    ]
  },
  {
    "id": 17,
    "nameEn": "Xi'An Jiaotong University",
    "nameZh": "西安交通大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xi-an-jiaotong-university",
    "partnerUrl": "https://www.dongxueji.cn/university/17",
    "programs": []
  },
  {
    "id": 104,
    "nameEn": "Xi'an University of Posts and Telecommunications",
    "nameZh": "西安邮电大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xi-an-university-of-posts-and-telecommunications",
    "partnerUrl": "https://www.dongxueji.cn/university/104",
    "programs": []
  },
  {
    "id": 31,
    "nameEn": "Xi'an University of Technology",
    "nameZh": "西安理工大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xi-an-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/31",
    "programs": []
  },
  {
    "id": 303,
    "nameEn": "Xi`an Medical University",
    "nameZh": "西安医学院",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xi-an-medical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/303",
    "programs": []
  },
  {
    "id": 334,
    "nameEn": "Xiamen University of Technology",
    "nameZh": "厦门理工学院",
    "provinceEn": "Fujian",
    "cityEn": "Xiamen",
    "provinceZh": "福建省",
    "cityZh": "厦门市",
    "provinceMn": "Фүжянь",
    "slug": "xiamen-university-of-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/334",
    "programs": [
      {
        "id": 269,
        "name": "Undergraduate Program (Institutional Scholarship) — Xiamen University of Technology, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Xiamen University of Technology President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 20000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/269"
      }
    ]
  },
  {
    "id": 139,
    "nameEn": "Xiangtan University",
    "nameZh": "湘潭大学",
    "provinceEn": "Hunan",
    "cityEn": "Xiangtan",
    "provinceZh": "湖南省",
    "cityZh": "湘潭市",
    "provinceMn": "Хунань",
    "slug": "xiangtan-university",
    "partnerUrl": "https://www.dongxueji.cn/university/139",
    "programs": []
  },
  {
    "id": 302,
    "nameEn": "Xidian University",
    "nameZh": "西安电子科技大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xidian-university",
    "partnerUrl": "https://www.dongxueji.cn/university/302",
    "programs": []
  },
  {
    "id": 102,
    "nameEn": "Xinjiang Agricultural Vocational and Technical University",
    "nameZh": "新疆农业职业技术大学",
    "provinceEn": "Xinjiang",
    "cityEn": "Changji",
    "provinceZh": "新疆维吾尔自治区",
    "cityZh": "昌吉回族自治州",
    "provinceMn": "Шинжаан",
    "slug": "xinjiang-agricultural-vocational-and-technical-university",
    "partnerUrl": "https://www.dongxueji.cn/university/102",
    "programs": []
  },
  {
    "id": 349,
    "nameEn": "Xishuangbanna Vocational and Technical College",
    "nameZh": "西双版纳职业技术学院",
    "provinceEn": "Yunnan",
    "cityEn": "Xishuangbanna",
    "provinceZh": "云南省",
    "cityZh": "西双版纳傣族自治州",
    "provinceMn": "Юньнань",
    "slug": "xishuangbanna-vocational-and-technical-college",
    "partnerUrl": "https://www.dongxueji.cn/university/349",
    "programs": []
  },
  {
    "id": 305,
    "nameEn": "Xi’an Eurasia University",
    "nameZh": "西安欧亚学院",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xi-an-eurasia-university",
    "partnerUrl": "https://www.dongxueji.cn/university/305",
    "programs": []
  },
  {
    "id": 306,
    "nameEn": "Xi’an International University",
    "nameZh": "西安外事学院",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xi-an-international-university",
    "partnerUrl": "https://www.dongxueji.cn/university/306",
    "programs": []
  },
  {
    "id": 304,
    "nameEn": "Xi’an Peihua University",
    "nameZh": "西安培华学院",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xi-an-peihua-university",
    "partnerUrl": "https://www.dongxueji.cn/university/304",
    "programs": []
  },
  {
    "id": 350,
    "nameEn": "Xian Shiyou University",
    "nameZh": "西安石油大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xian-shiyou-university",
    "partnerUrl": "https://www.dongxueji.cn/university/350",
    "programs": [
      {
        "id": 265,
        "name": "Undergraduate Program (Institutional Scholarship) — Xi'an Shiyou University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Xi’an Shiyou University President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15500,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 15500
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/265"
      }
    ]
  },
  {
    "id": 297,
    "nameEn": "Xi’an University of Architecture & Technology",
    "nameZh": "西安建筑科技大学",
    "provinceEn": "Shaanxi",
    "cityEn": "Xi'an",
    "provinceZh": "陕西省",
    "cityZh": "西安市",
    "provinceMn": "Шэньси",
    "slug": "xi-an-university-of-architecture-and-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/297",
    "programs": [
      {
        "id": 332,
        "name": "Xi'an University of Architecture and Technology Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Xi’an University of Architecture and Technology President’s Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 20000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/332"
      }
    ]
  },
  {
    "id": 252,
    "nameEn": "Yangtze Normal University",
    "nameZh": "长江师范学院",
    "provinceEn": "Chongqing",
    "cityEn": "Chongqing",
    "provinceZh": "重庆",
    "cityZh": "重庆市",
    "provinceMn": "Чунцин",
    "slug": "yangtze-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/252",
    "programs": []
  },
  {
    "id": 78,
    "nameEn": "Yangtze University",
    "nameZh": "长江大学",
    "provinceEn": "Hubei",
    "cityEn": "Jingzhou",
    "provinceZh": "湖北省",
    "cityZh": "荆州市",
    "provinceMn": "Хүбэй",
    "slug": "yangtze-university",
    "partnerUrl": "https://www.dongxueji.cn/university/78",
    "programs": []
  },
  {
    "id": 45,
    "nameEn": "Yunnan Technology and Business University",
    "nameZh": "云南工商学院",
    "provinceEn": "Yunnan",
    "cityEn": "Kunming",
    "provinceZh": "云南省",
    "cityZh": "昆明市",
    "provinceMn": "Юньнань",
    "slug": "yunnan-technology-and-business-university",
    "partnerUrl": "https://www.dongxueji.cn/university/45",
    "programs": []
  },
  {
    "id": 182,
    "nameEn": "Yunnan University",
    "nameZh": "云南大学",
    "provinceEn": "Yunnan",
    "cityEn": "Kunming",
    "provinceZh": "云南省",
    "cityZh": "昆明市",
    "provinceMn": "Юньнань",
    "slug": "yunnan-university",
    "partnerUrl": "https://www.dongxueji.cn/university/182",
    "programs": [
      {
        "id": 322,
        "name": "Yunnan University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Yunnan University President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 10000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 10000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/322"
      }
    ]
  },
  {
    "id": 183,
    "nameEn": "Yunnan University of Finance and Economics",
    "nameZh": "云南财经大学",
    "provinceEn": "Yunnan",
    "cityEn": "Kunming",
    "provinceZh": "云南省",
    "cityZh": "昆明市",
    "provinceMn": "Юньнань",
    "slug": "yunnan-university-of-finance-and-economics",
    "partnerUrl": "https://www.dongxueji.cn/university/183",
    "programs": [
      {
        "id": 321,
        "name": "Yunnan University of Finance and Economics Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Yunnan University of Finance and Economics President's Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 16600,
        "majors": [
          {
            "name": "International Economics and Trade",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 16600
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/321"
      }
    ]
  },
  {
    "id": 294,
    "nameEn": "Zhejiang A&F University",
    "nameZh": "浙江农林大学",
    "provinceEn": "Zhejiang",
    "cityEn": "Hangzhou",
    "provinceZh": "浙江省",
    "cityZh": "杭州市",
    "provinceMn": "Жөжян",
    "slug": "zhejiang-a-and-f-university",
    "partnerUrl": "https://www.dongxueji.cn/university/294",
    "programs": [
      {
        "id": 337,
        "name": "Zhejiang A&F University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Zhejiang A&F University President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 20000,
        "majors": [
          {
            "name": "Computer Science and Technology",
            "language": "English",
            "years": 4,
            "tuitionCny": 20000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/337"
      }
    ]
  },
  {
    "id": 170,
    "nameEn": "Zhejiang Normal University",
    "nameZh": "浙江师范大学",
    "provinceEn": "Zhejiang",
    "cityEn": "Jinhua",
    "provinceZh": "浙江省",
    "cityZh": "金华市",
    "provinceMn": "Жөжян",
    "slug": "zhejiang-normal-university",
    "partnerUrl": "https://www.dongxueji.cn/university/170",
    "programs": [
      {
        "id": 277,
        "name": "Undergraduate Program (Institutional Scholarship) — Zhejiang Normal University, Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Zhejiang Normal University President's Scholarship",
        "opens": "2026/10/29",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 18800,
        "majors": [
          {
            "name": "Chinese Language Education",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 18800
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/277"
      }
    ]
  },
  {
    "id": 385,
    "nameEn": "Zhejiang Tourism Vocational College",
    "nameZh": "浙江旅游职业学院",
    "provinceEn": "Zhejiang",
    "cityEn": "Hangzhou",
    "provinceZh": "浙江省",
    "cityZh": "杭州市",
    "provinceMn": "Жөжян",
    "slug": "zhejiang-tourism-vocational-college",
    "partnerUrl": "https://www.dongxueji.cn/university/385",
    "programs": []
  },
  {
    "id": 243,
    "nameEn": "Zhejiang University",
    "nameZh": "浙江大学",
    "provinceEn": "Zhejiang",
    "cityEn": "Hangzhou",
    "provinceZh": "浙江省",
    "cityZh": "杭州市",
    "provinceMn": "Жөжян",
    "slug": "zhejiang-university",
    "partnerUrl": "https://www.dongxueji.cn/university/243",
    "programs": [
      {
        "id": 350,
        "name": "Zhejiang University Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Zhejiang University President’s Scholarship",
        "opens": "2026/10/31",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 42800,
        "majors": [
          {
            "name": "MBBS",
            "language": "English",
            "years": 6,
            "tuitionCny": 42800
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/350"
      }
    ]
  },
  {
    "id": 295,
    "nameEn": "Zhejiang University of Science and Technology",
    "nameZh": "浙江科技大学",
    "provinceEn": "Zhejiang",
    "cityEn": "Hangzhou",
    "provinceZh": "浙江省",
    "cityZh": "杭州市",
    "provinceMn": "Жөжян",
    "slug": "zhejiang-university-of-science-and-technology",
    "partnerUrl": "https://www.dongxueji.cn/university/295",
    "programs": [
      {
        "id": 334,
        "name": "Zhejiang University of Science and Technology Undergraduate Program (Institutional Scholarship), Autumn 2027 Intake",
        "degree": "Undergraduate",
        "language": "Chinese and English",
        "award": "Zhejiang University of Science and Technology President’s Scholarship",
        "opens": "2026/10/30",
        "closes": "2027/06/30",
        "seats": 10,
        "applicationFeeCny": 2000,
        "tuitionCny": 15000,
        "majors": [
          {
            "name": "Chinese Language and Literature",
            "language": "Chinese",
            "years": 4,
            "tuitionCny": 15000
          }
        ],
        "figuresWithheld": false,
        "url": "https://www.dongxueji.cn/study-abroad/334"
      }
    ]
  },
  {
    "id": 212,
    "nameEn": "Zibo Polytechnic University",
    "nameZh": "淄博职业技术大学",
    "provinceEn": "Shandong",
    "cityEn": "Zibo",
    "provinceZh": "山东省",
    "cityZh": "淄博市",
    "provinceMn": "Шаньдун",
    "slug": "zibo-polytechnic-university",
    "partnerUrl": "https://www.dongxueji.cn/university/212",
    "programs": []
  },
  {
    "id": 352,
    "nameEn": "Zunyi Vocational and Technical College",
    "nameZh": "遵义职业技术学院",
    "provinceEn": "Guizhou",
    "cityEn": "Zunyi",
    "provinceZh": "贵州省",
    "cityZh": "遵义市",
    "provinceMn": "Гүйжоу",
    "slug": "zunyi-vocational-and-technical-college",
    "partnerUrl": "https://www.dongxueji.cn/university/352",
    "programs": []
  },
  {
    "id": 258,
    "nameEn": "山东医药大学",
    "nameZh": "山东医药大学",
    "provinceEn": "Shandong",
    "cityEn": "Yantai",
    "provinceZh": "山东省",
    "cityZh": "烟台市",
    "provinceMn": "Шаньдун",
    "slug": "",
    "partnerUrl": "https://www.dongxueji.cn/university/258",
    "programs": []
  }
];

export function getDongxuejiUniversity(slug: string) {
  return dongxuejiUniversities.find((item) => item.slug === slug) ?? null;
}
