import type { Course } from "@/lib/i18n/types";

export const courses: Course[] = [
  {
    slug: "mongol-zuv-bichig",
    subject: "language",
    level: "secondary",
    featured: true,
    title: { mn: "Монгол хэлний зөв бичих дүрэм", en: "Mongolian spelling in practice" },
    summary: {
      mn: "Тусгаарлагч ъ, ь болон харьяалахын нөхцөлийг сургуулийн өгүүлбэр дээрээ зөв хэрэглэх.",
      en: "Use the separators ъ and ь, and genitive endings, correctly in school sentences.",
    },
    audience: {
      mn: "Дунд, ахлах ангийн сурагчдад",
      en: "For middle and high school students",
    },
    outcomes: {
      mn: [
        "Эр үгэнд я, ё, эм үгэнд е залгахад ъ, ь-ийг ялгана",
        "модны, дэлхийн зэрэг харьяалах хэлбэрийг жишээгээр тайлбарлана",
        "Өөрийн өгүүлбэрээ албан ёсны дүрмийн жишээтэй тулгана",
      ],
      en: [
        "Choose ъ or ь when adding я, ё, or е",
        "Explain genitive forms such as модны and дэлхийн",
        "Check a sentence against the official examples",
      ],
    },
    instructor: {
      name: "Д. Энхтуяа",
      role: { mn: "Монгол хэлний багш", en: "Mongolian language teacher" },
    },
    modules: [
      {
        id: "signs",
        title: { mn: "Тэмдэг үсэг", en: "Sign letters" },
        lessons: [
          {
            id: "separators",
            minutes: 12,
            title: { mn: "Тусгаарлагч ъ ба ь", en: "The separators ъ and ь" },
            body: {
              mn: [
                "Хатуугийн тэмдэг ъ, зөөлний тэмдэг ь нь авиа биш. Тэд үсгийг салгаж, зарим үгийг зөөлрүүлж бичихэд орно. Журамласан тольд тусгаарлагчийн дүрмийг ингэж заасан байдаг.",
                "Эр үгэнд я, ё эгшиг өмнөх гийгүүлэгчээсээ саланги дуудагдахаар орвол өмнө нь ъ бичнэ. Жишээ: явъя, олъё, угтъя. Эм үгэнд е эгшиг мөн адил саланги орвол өмнө нь ь бичнэ. Жишээ: өгье, үзье, тэнцье.",
                "Эгшгээр төгссөн үйлд тэмдэг нэмэхгүй: саная, хичээе, орхиё. Зөөлний тэмдгийг давхардуулахгүй: тарья, цохьё. Энэ хичээл бүх дүрмийг орлохгүй. Бүрэн жагсаалтыг Монгол хэлний зөв бичих дүрмийн журамласан толиос шалгана.",
              ],
              en: [
                "The hard sign ъ and the soft sign ь are not sounds. They separate letters, and ь also marks a softened consonant. The regulated orthographic dictionary states the separator rule as follows.",
                "In a masculine word, write ъ before я or ё when that vowel is pronounced apart from the consonant before it: явъя, олъё, угтъя. In a feminine word, write ь before е in the same situation: өгье, үзье, тэнцье.",
                "Do not add a sign after a vowel: саная, хичээе, орхиё. Do not double a soft sign: тарья, цохьё. This lesson is a classroom start, not the whole rulebook. Check the full list in the regulated Mongolian orthographic dictionary.",
              ],
            },
          },
          {
            id: "soft-words",
            minutes: 10,
            title: { mn: "ь үгэнд үлддэг газар", en: "Where ь stays in a word" },
            body: {
              mn: [
                "ь зөвхөн тусгаарлагч биш. морь, хорь, амь, хууль, харь гэсэн үгэнд гийгүүлэгчийг зөөлрүүлж бичигдэнэ. тар ба тарь, хор ба хорь, ам ба амь гэж утга нь өөр.",
                "ь-ээр төгссөн үгэнд а, о, у-гаар эхэлсэн нөхцөл залгахад ь ихэвчлэн и болно. Жишээ: барь + аад = бариад, хорь + оор = хориоор. Харин -гүй, -сан зэрэг зарим нөхцөлд ь үлдэнэ: морьгүй, барьсан.",
                "Шинэ үг үзэх бүртээ тольтой тулга. Сонсоод тааварлах нь морь, хорь шиг богино үг дээр эндүүрэл гаргадаг.",
              ],
              en: [
                "ь is not only a separator. In морь, хорь, амь, хууль, and харь it softens the consonant. Pairs such as тар / тарь, хор / хорь, and ам / амь are different words.",
                "When an ending that starts with а, о, or у is added, ь often becomes и: барь + аад = бариад, хорь + оор = хориоор. With some endings it stays: морьгүй, барьсан.",
                "Check a new word in the dictionary. Guessing from sound is how short pairs like морь and хорь get mixed up.",
              ],
            },
          },
        ],
      },
      {
        id: "case",
        title: { mn: "Харьяалахын нөхцөл", en: "Genitive endings" },
        lessons: [
          {
            id: "genitive",
            minutes: 14,
            title: { mn: "модны, дэлхийн", en: "модны and дэлхийн" },
            body: {
              mn: [
                "Харьяалахын тийн ялгал харьяа, эзэмшлийг заана: сургуулийн ном, гэрийн хаалга. Нөхцөл нь үгийн төгсгөлөөс шалтгаална. Тогтворгүй н-тэй үг хувирахдаа н-ээ гаргана: модны, морины, усны.",
                "ном гэхэд номны сан гэж хэлдэггүй. Тиймээс номонд биш номд, асуултад, амжилтад гэж бичнэ. Хос эгшиг болон урт ий-гээр төгссөн үгэнд -н залгана: толгойн, дэлхийн.",
                "нь, минь, чинь-ийн өмнөх г, н үсгийг гээхгүй. гарын нь гэж бичнэ. гары нь гэж бичвэл алдаа. Өгүүлбэрээ дуудаад зогсохгүй, нөхцөлийг үгийн төрлөөр нь шалга.",
              ],
              en: [
                "The genitive shows belonging: сургуулийн ном, гэрийн хаалга. The ending depends on how the stem finishes. A stem with unstable н brings that н out: модны, морины, усны.",
                "People do not say номны сан, so the dative is номд, not номонд. The same pattern gives асуултад and амжилтад. Stems that end in a diphthong or long ий take -н: толгойн, дэлхийн.",
                "Keep the hidden г or н before нь, минь, and чинь. Write гарын нь. гары нь is a mistake. Read the sentence aloud, then check the ending against the stem.",
              ],
            },
          },
        ],
      },
    ],
    checks: [
      {
        id: "ya",
        prompt: {
          mn: "Эр үгийн «яв» дээр -я залгахад аль нь зөв бэ?",
          en: "Which spelling is correct when -я is added to the masculine verb яв?",
        },
        options: {
          mn: ["явъя", "явья", "явия"],
          en: ["явъя", "явья", "явия"],
        },
        answer: 0,
      },
      {
        id: "mod",
        prompt: {
          mn: "Тогтворгүй н-тэй «мод»-ыг харьяалахад аль нь зөв бэ?",
          en: "Which genitive of мод, a stem with unstable н, is correct?",
        },
        options: {
          mn: ["модын", "модны", "модийн"],
          en: ["модын", "модны", "модийн"],
        },
        answer: 1,
      },
      {
        id: "delhii",
        prompt: {
          mn: "Хос эгшигтэй «дэлхий»-н харьяалах хэлбэр аль нь вэ?",
          en: "Which genitive of дэлхий is correct?",
        },
        options: {
          mn: ["дэлхийн", "дэлхийны", "дэлхийы"],
          en: ["дэлхийн", "дэлхийны", "дэлхийы"],
        },
        answer: 0,
      },
    ],
  },
  {
    slug: "fractions-percent",
    subject: "stem",
    level: "middle",
    featured: true,
    title: { mn: "Бутархай ба хувь", en: "Fractions and percent" },
    summary: {
      mn: "Бүтэн хэсгийн хэдэн хувь болохыг ангийн бодит тоогоор бодож сурах.",
      en: "Find a fraction of a class, then turn that fraction into a percent.",
    },
    audience: { mn: "6–8-р ангийн сурагчдад", en: "For grades 6–8" },
    outcomes: {
      mn: [
        "Бутархайг бүтнээс хэсэг авах үйлдэл гэж тайлбарлана",
        "Тооны бутархайг үржвэрээр олно",
        "Ижил харьцааг хувь руу шилжүүлнэ",
      ],
      en: [
        "Explain a fraction as a share of one whole",
        "Find a fraction of a quantity by multiplying",
        "Turn the same ratio into a percent",
      ],
    },
    instructor: {
      name: "Б. Ганзориг",
      role: { mn: "Математикийн багш", en: "Mathematics teacher" },
    },
    modules: [
      {
        id: "share",
        title: { mn: "Хэсэг авах", en: "Taking a share" },
        lessons: [
          {
            id: "part-of-whole",
            minutes: 11,
            title: { mn: "Бутархай юу хэлдэг вэ", en: "What a fraction says" },
            body: {
              mn: [
                "3/4 гэдэг нь бүтнийг 4 тэнцүү хэсэг болгоод 3-ыг нь авсан гэсэн үг. Хуваарь нь хэдэн хэсэг, хуваагч нь хэдэн хэсгийг авсан болохыг заана. 4/4 нь бүтэн, 0/4 нь юу ч үгүй.",
                "Ангид 4 ширээний бүлэг байлаа гэж бодъё. Гурван бүлэг даалгавраа өгсөн бол 3/4. Нэг бүлэг үлдсэн бол 1/4. Бутархайг зураг, ширээ, дэвтэр зэрэг харж болох зүйлээр эхлээд ойлго.",
              ],
              en: [
                "3/4 means the whole was split into 4 equal parts and 3 of them were taken. The denominator says how many parts. The numerator says how many you take. 4/4 is the whole. 0/4 is none.",
                "Imagine four table groups in a class. If three groups handed in the work, that is 3/4. One group left is 1/4. Start with something you can see: desks, notebooks, or a drawing.",
              ],
            },
          },
          {
            id: "of-a-quantity",
            minutes: 12,
            title: { mn: "Тооны бутархай", en: "A fraction of a number" },
            body: {
              mn: [
                "32 сурагчтай ангийн 3/4 нь гэрийн даалгавраа өглөө. Эхлээд 32-ыг 4-т хуваана: 8. Нэг хэсэг нь 8 сурагч. Гурван хэсэг нь 8 × 3 = 24. Өөрөөр бичвэл 32 × 3/4 = 24.",
                "Үлдсэн нь 32 − 24 = 8, буюу 1/4. Хариугаа асуулттай тулга: «хэдэн сурагч өгсөн бэ» гэвэл 24, «хэдэн хувь нь үлдсэн бэ» гэвэл дараагийн хичээл рүү орно.",
              ],
              en: [
                "In a class of 32, 3/4 handed in homework. First divide 32 by 4. That is 8 students in one part. Three parts are 8 × 3 = 24. The same line is 32 × 3/4 = 24.",
                "The rest are 32 − 24 = 8, which is 1/4. Match the answer to the question. “How many handed it in?” is 24. “What percent are left?” belongs to the next lesson.",
              ],
            },
          },
        ],
      },
      {
        id: "percent",
        title: { mn: "Хувь", en: "Percent" },
        lessons: [
          {
            id: "to-percent",
            minutes: 12,
            title: { mn: "Харьцааг хувь болгох", en: "Turn a ratio into a percent" },
            body: {
              mn: [
                "Хувь гэдэг нь 100-ийн хэдэн нэгж болохыг хэлнэ. 24/32-ыг хувь болгохын тулд эхлээд хуваана: 24 ÷ 32 = 0.75. Дараа нь 100-аар үржүүлнэ: 0.75 × 100 = 75. Тэгэхээр 75%.",
                "75% нь 3/4-тэй тэнцүү. 50% нь 1/2, 25% нь 1/4, 10% нь 1/10. Шалгалтын оноог хувь руу шилжүүлэхдээ мөн энэ хоёр алхмыг хэрэглэ: хэсэг ÷ бүтэн, дараа нь × 100.",
              ],
              en: [
                "A percent says how many parts out of 100. To turn 24/32 into a percent, divide first: 24 ÷ 32 = 0.75. Then multiply by 100: 0.75 × 100 = 75. That is 75%.",
                "75% is the same share as 3/4. 50% is 1/2, 25% is 1/4, and 10% is 1/10. A test score uses the same two steps: part ÷ whole, then × 100.",
              ],
            },
          },
        ],
      },
    ],
    checks: [
      {
        id: "class",
        prompt: {
          mn: "32 сурагчийн 3/4 нь даалгавраа өгсөн. Хэдэн сурагч бэ?",
          en: "3/4 of 32 students handed in the work. How many students?",
        },
        options: {
          mn: ["20", "24", "28"],
          en: ["20", "24", "28"],
        },
        answer: 1,
      },
      {
        id: "pct",
        prompt: {
          mn: "24/32-ыг хувиар илэрхийлбэл хэд вэ?",
          en: "What percent is 24/32?",
        },
        options: {
          mn: ["65%", "75%", "80%"],
          en: ["65%", "75%", "80%"],
        },
        answer: 1,
      },
      {
        id: "books",
        prompt: {
          mn: "40 номын 1/5-ийг зээлүүлэв. Хэдэн ном үлдсэн бэ?",
          en: "1/5 of 40 books were borrowed. How many books are left?",
        },
        options: {
          mn: ["8", "32", "35"],
          en: ["8", "32", "35"],
        },
        answer: 1,
      },
    ],
  },
  {
    slug: "classroom-english",
    subject: "language",
    level: "secondary",
    title: { mn: "Сургуулийн англи хэл", en: "English for school life" },
    summary: {
      mn: "Ангидаа хэрэгтэй богино, эелдэг англи өгүүлбэрийг хэлж, сонсож сурах.",
      en: "Say and understand the short, polite English used in a classroom.",
    },
    audience: {
      mn: "Англи хэлээ ангидаа хэрэглэх сурагчдад",
      en: "For students who use English in class",
    },
    outcomes: {
      mn: [
        "Дахиж хэлэхийг хүсэх, үзэг зээлэхийг эелдэг асууна",
        "Даалгавраа дуусгаснаа нэг өгүүлбэрээр хэлнэ",
        "Тоо, хувь хоёрыг англиар уншина",
      ],
      en: [
        "Ask for a repetition or a pen politely",
        "Say that the homework is finished",
        "Read a number and a percent aloud",
      ],
    },
    instructor: {
      name: "Н. Номин-Эрдэнэ",
      role: { mn: "Англи хэлний багш", en: "English teacher" },
    },
    modules: [
      {
        id: "talk",
        title: { mn: "Ангийн хэллэг", en: "Classroom lines" },
        lessons: [
          {
            id: "requests",
            minutes: 10,
            title: { mn: "Эелдэг хүсэлт", en: "Polite requests" },
            body: {
              mn: [
                "Ангид хамгийн их хэрэгтэй өгүүлбэр бол хүсэлт. Could you say that again, please? гэвэл «Дахиж хэлж өгөөч». Could I borrow a pen, please? гэвэл «Үзэг зээлж болох уу».",
                "Give me a pen. гэвэл ойлгомжтой ч эелдэг биш. Could болон please нэмэхэд аялгуу зөөлөрнө. Багшийн асуултыг сонсоогүй бол I didn’t catch that. Could you repeat the question? гэж хэл.",
              ],
              en: [
                "The most useful classroom line is a request. Could you say that again, please? asks for a repetition. Could I borrow a pen, please? asks for a pen.",
                "Give me a pen. is clear, but it is not polite. Could and please soften it. If you miss the teacher’s question, say: I didn’t catch that. Could you repeat the question?",
              ],
            },
          },
          {
            id: "homework",
            minutes: 10,
            title: { mn: "Даалгавар, тоо", en: "Homework and numbers" },
            body: {
              mn: [
                "I finished my homework. гэдэг нь «Би гэрийн даалгавраа дуусгасан». I need more time. гэвэл «Надад хугацаа хэрэгтэй». The answer is twenty-four. гэвэл хариу нь 24.",
                "Seventy-five percent гэж 75%-ийг уншина. Three quarters нь 3/4. Ангийнхаа бодлогыг англиар нэг өгүүлбэр болго: Three quarters of the class is twenty-four students.",
              ],
              en: [
                "I finished my homework. tells the teacher the work is done. I need more time. asks for longer. The answer is twenty-four. gives 24.",
                "Read 75% as seventy-five percent. Three quarters is 3/4. Turn the class problem into one English sentence: Three quarters of the class is twenty-four students.",
              ],
            },
          },
        ],
      },
    ],
    checks: [
      {
        id: "again",
        prompt: {
          mn: "“Could you say that again, please?” гэж юу хүсэж байна вэ?",
          en: "What does “Could you say that again, please?” ask for?",
        },
        options: {
          mn: ["Дахиж хэлж өгөхийг", "Ангиас гарахыг", "Дэвтрээ өгөхийг"],
          en: ["A repetition", "Permission to leave", "The notebook"],
        },
        answer: 0,
      },
      {
        id: "done",
        prompt: {
          mn: "“I finished my homework.” гэж юу гэсэн үг вэ?",
          en: "What does “I finished my homework.” mean?",
        },
        options: {
          mn: [
            "Би гэрийн даалгавраа дуусгасан",
            "Би хоцорч ирсэн",
            "Би үзэг авна",
          ],
          en: [
            "The homework is done",
            "I arrived late",
            "I will take a pen",
          ],
        },
        answer: 0,
      },
      {
        id: "polite",
        prompt: {
          mn: "Аль хүсэлт нь хамгийн эелдэг бэ?",
          en: "Which request is the most polite?",
        },
        options: {
          mn: [
            "Give me a pen.",
            "Could I borrow a pen, please?",
            "Pen now.",
          ],
          en: [
            "Give me a pen.",
            "Could I borrow a pen, please?",
            "Pen now.",
          ],
        },
        answer: 1,
      },
    ],
  },
  {
    slug: "mongol-history",
    subject: "humanities",
    level: "secondary",
    title: { mn: "Монголын түүхийн тойм", en: "A short history of Mongolia" },
    summary: {
      mn: "Нүүдэлчдийн төрт улс, 1206 он, тусгаар тогтнол, өнөөгийн сургууль хүртэлх тойм.",
      en: "From steppe states and 1206 to independence and the school you sit in.",
    },
    audience: {
      mn: "Түүхийн хичээлээ цэгцэлж буй сурагчдад",
      en: "For students organizing their history course",
    },
    outcomes: {
      mn: [
        "1206 оныг Их Монгол Улс байгуулагдсан онтой холбоно",
        "1911, 1921, 1992 оныг хооронд нь солихгүй",
        "Нэг үйл явдлыг нэг өгүүлбэрээр хаадаггүйг тайлбарлана",
      ],
      en: [
        "Connect 1206 with the founding of the Mongol Empire",
        "Keep 1911, 1921, and 1992 distinct",
        "Explain why one sentence cannot close a historical event",
      ],
    },
    instructor: {
      name: "Ц. Мөнхбат",
      role: { mn: "Түүхийн багш", en: "History teacher" },
    },
    modules: [
      {
        id: "timeline",
        title: { mn: "Он цагийн шугам", en: "A timeline" },
        lessons: [
          {
            id: "states",
            minutes: 12,
            title: { mn: "Нүүдэлчдийн төрт улсууд", en: "States of the steppe" },
            body: {
              mn: [
                "Монголын түүх 1206 оноос эхэлдэггүй. Хүннү болон дараагийн нүүдэлчдийн төрт улсууд Төв Азид улс төр, худалдаа, мал аж ахуйг холбож байв. Тэднийг нэг нэрээр хурааж болохгүй.",
                "Сурах бичгийн он цаг цээжлэхээсээ өмнө газрын зураг хар. Тал хээр, говь, хангай өөр өөр амьдралтай. Түүхийн асуулт «хэзээ»-гээс гадна «хаана, хэн, ямар улсад» гэж асууна.",
              ],
              en: [
                "Mongolian history does not begin in 1206. The Xiongnu and later steppe states linked politics, trade, and herding across Inner Asia. They are not one people with one name.",
                "Look at a map before you memorize dates. Steppe, Gobi, and mountain forest supported different ways of living. A history question asks where and in which state, not only when.",
              ],
            },
          },
          {
            id: "empire",
            minutes: 12,
            title: { mn: "1206 он", en: "The year 1206" },
            body: {
              mn: [
                "1206 онд Их Монгол Улс байгуулагдсан гэж сургуулийн хөтөлбөр үздэг. Чингис хааны удирдлага дор тархай аймгууд нэг төрд орсон. Энэ бол эзэнт гүрний эхлэл, Монгол Улсын өнөөгийн үндсэн хууль биш.",
                "Эзэнт гүрэн өргөжин худалдаа, шуудан, хуулийг холбосон. Байлдан дагуулалт олон улсын ард түмэнд хүнд хохирол авчирсан. Түүхийг магтаал эсвэл зэмлэлээр биш, хэн юу хожсон, хэн юу алдсанаар уншина.",
              ],
              en: [
                "School courses mark 1206 as the founding of the Mongol Empire. Under Chinggis Khan, scattered polities entered one state. That is the start of an empire, not today’s constitution.",
                "The empire later tied together trade, relay posts, and law. Conquest also brought severe loss to many peoples. Read the period by who gained and who lost, not as praise or blame alone.",
              ],
            },
          },
          {
            id: "modern",
            minutes: 13,
            title: { mn: "1911, 1921, 1992", en: "1911, 1921, and 1992" },
            body: {
              mn: [
                "1911 онд Монгол тусгаар тогтнолоо сэргээн тунхагласан. 1921 оны хувьсгалаар шинэ засаг тогтсон. 1924 онд Бүгд Найрамдах Улсыг тунхагласан. 1992 оны үндсэн хууль өнөөгийн парламентын бүгд найрамдах засаглалыг баталгаажуулсан.",
                "Эдгээр оныг нэг «тусгаар тогтнолын өдөр» болгож хутгах хэрэггүй. Нийслэл нь Улаанбаатар. Аймаг, сум, сургууль бол энэ төрийн өнөөгийн бүтэц. Түүх чиний анги яагаад ийм нэртэй, ийм хэлээр хичээллэдгийг тайлбарлахад хэрэгтэй.",
              ],
              en: [
                "In 1911 Mongolia proclaimed the restoration of independence. The 1921 revolution set up a new government. In 1924 a people’s republic was proclaimed. The 1992 constitution confirmed today’s parliamentary republic.",
                "Do not fold these years into one independence day. The capital is Ulaanbaatar. Aimags, soums, and schools are the present structure of that state. History explains why your class has this name and this language of instruction.",
              ],
            },
          },
        ],
      },
    ],
    checks: [
      {
        id: "year",
        prompt: {
          mn: "1206 онд юу байгуулагдсан бэ?",
          en: "What was founded in 1206?",
        },
        options: {
          mn: ["Их Монгол Улс", "1992 оны үндсэн хууль", "Хүннү гүрэн"],
          en: ["The Mongol Empire", "The 1992 constitution", "The Xiongnu state"],
        },
        answer: 0,
      },
      {
        id: "indep",
        prompt: {
          mn: "Монгол тусгаар тогтнолоо сэргээн тунхагласан он аль нь вэ?",
          en: "In which year did Mongolia proclaim the restoration of independence?",
        },
        options: {
          mn: ["1911", "1961", "1992"],
          en: ["1911", "1961", "1992"],
        },
        answer: 0,
      },
      {
        id: "capital",
        prompt: {
          mn: "Өнөөгийн нийслэл аль нь вэ?",
          en: "Which city is the capital today?",
        },
        options: {
          mn: ["Хархорин", "Улаанбаатар", "Дархан"],
          en: ["Kharkhorin", "Ulaanbaatar", "Darkhan"],
        },
        answer: 1,
      },
    ],
  },
  {
    slug: "steppe-ecology",
    subject: "stem",
    level: "middle",
    featured: true,
    title: { mn: "Тал хээр, говь, ой", en: "Steppe, Gobi, and forest" },
    summary: {
      mn: "Ойр орчноо ажиглаж, бэлчээр, ус, салхиа тэмдэглэлд буулгах.",
      en: "Observe the land around you and record pasture, water, and wind.",
    },
    audience: {
      mn: "Байгалийн ухааны сурагчдад",
      en: "For science students",
    },
    outcomes: {
      mn: [
        "Тал хээр, говь, хангайн ойг ялгана",
        "Ажиглалтын тэмдэглэлд газар, огноо, харсан зүйлээ бичнэ",
        "Бэлчээрийн даацыг нэг тоогоор биш асуултаар тайлбарлана",
      ],
      en: [
        "Tell steppe, Gobi, and mountain forest apart",
        "Write place, date, and what you saw in a field note",
        "Talk about pasture capacity as a question, not a single blame",
      ],
    },
    instructor: {
      name: "Г. Сарангэрэл",
      role: { mn: "Биологийн багш", en: "Biology teacher" },
    },
    modules: [
      {
        id: "land",
        title: { mn: "Газар нутаг", en: "Landscapes" },
        lessons: [
          {
            id: "three",
            minutes: 11,
            title: { mn: "Гурван өөр газар", en: "Three different lands" },
            body: {
              mn: [
                "Тал хээр нь өвсөн ургамалтай, мод багатай өргөн газар. Говь нь илүү хуурай, ус ховор, ургамал сийрэг. Хангайн ой нь уул, мод, гол горхитой. Гурвыг нэг «хөдөө» гэж нэрлэхэд ажиглалт алдагдана.",
                "Чиний сургууль Улаанбаатарт байсан ч хашаан дахь салхи, хөрс, ургамал бол бодит судалгаа. Аймагт байсан ч говь, тал хоёрыг нүдээрээ ялга. Нэрээ зөв өгсний дараа л хэмжилт үнэ цэнтэй.",
              ],
              en: [
                "Steppe is a wide grassland with few trees. The Gobi is drier, with scarce water and sparse plants. Mountain forest has slopes, trees, and streams. Calling all three “the countryside” hides what you see.",
                "A schoolyard in Ulaanbaatar still has wind, soil, and plants you can study. In an aimag, tell steppe from Gobi with your own eyes. A measurement is useful after the place has the right name.",
              ],
            },
          },
          {
            id: "journal",
            minutes: 12,
            title: { mn: "Ажиглалтын тэмдэглэл", en: "A field note" },
            body: {
              mn: [
                "Нэг тэмдэглэлд дөрвөн зүйл байна: огноо, газар, юу харсан, юу өөрчлөгдсөн байж болох. «Өвс шар» гэж бичихэд хангалтгүй. «Хотын хойд хашаа, 11-р сарын 5, өвс 10 см, хөрс хуурай, салхи баруунаас» гэж бич.",
                "Нэг удаагийн харц дүгнэлт биш. Долоо хоногийн дараа мөн газар оч. Ус, мөр, хог, малын бэлчээр өөрчлөгдсөн үү гэдгийг харьцуул. Зураг авсан бол тэмдэглэлээ орлохгүй, хажууд нь хадгал.",
              ],
              en: [
                "A useful note has four parts: date, place, what you saw, and what might have changed. “The grass is yellow” is too thin. Write: north side of the schoolyard, November 5, grass about 10 cm, soil dry, wind from the west.",
                "One look is not a conclusion. Return a week later. Compare water, tracks, litter, and grazing. A photo does not replace the note. Keep it beside the sentences.",
              ],
            },
          },
          {
            id: "pasture",
            minutes: 12,
            title: { mn: "Бэлчээр ба ус", en: "Pasture and water" },
            body: {
              mn: [
                "Бэлчээрийн даац гэдэг нь тухайн газар хэдэн мал, хэр удаан тэжээж чадахыг хэлнэ. Хэт олон мал, бага ус, хүчтэй салхи нийлээд хөрс сийрэгжиж болно. Үүнийг нэг малчин эсвэл нэг хотын буруу гэж хурааж болохгүй.",
                "Сурагчийн ажил бол буруутгах биш асуух. Ус хаанаас ирдэг вэ. Өвөл, зун бэлчээр солигддог уу. Сургуулийн хашаанд хөрс нүцгэн болсон газар бий юу. Асуултаа тэмдэглэлд үлдээвэл багш дараагийн хичээлээ түүн дээрээ барина.",
              ],
              en: [
                "Pasture capacity is how many animals a place can feed, and for how long. Too many animals, little water, and strong wind can thin the soil together. That is not one herder’s fault or one city’s fault.",
                "A student’s job is to ask, not to accuse. Where does the water come from? Does the pasture change between winter and summer? Is any schoolyard soil bare? Leave the question in the note so the next lesson can use it.",
              ],
            },
          },
        ],
      },
    ],
    checks: [
      {
        id: "same",
        prompt: {
          mn: "Тал хээр, говь хоёр ижил газар уу?",
          en: "Are steppe and Gobi the same kind of land?",
        },
        options: {
          mn: ["Тийм, хоёул ой", "Үгүй, говь илүү хуурай", "Тийм, хоёул хангай"],
          en: ["Yes, both are forest", "No, the Gobi is drier", "Yes, both are mountain forest"],
        },
        answer: 1,
      },
      {
        id: "note",
        prompt: {
          mn: "Ажиглалтын тэмдэглэлд юуг заавал бичих вэ?",
          en: "What belongs in a field note?",
        },
        options: {
          mn: [
            "Зөвхөн өөрийн нэр",
            "Газар, огноо, юу харсан",
            "Юу ч бичихгүй, зураг хангалттай",
          ],
          en: [
            "Only your name",
            "Place, date, and what you saw",
            "Nothing, a photo is enough",
          ],
        },
        answer: 1,
      },
      {
        id: "cap",
        prompt: {
          mn: "Бэлчээрийн даац гэж юу вэ?",
          en: "What is pasture capacity?",
        },
        options: {
          mn: [
            "Нэг малчин хэдэн гэртэй байх",
            "Тухайн газар хэдэн мал тэжээж чадах",
            "Салхины хурдны нэр",
          ],
          en: [
            "How many gers one herder owns",
            "How many animals that land can feed",
            "Another name for wind speed",
          ],
        },
        answer: 1,
      },
    ],
  },
  {
    slug: "formative-assessment",
    subject: "teaching",
    level: "teacher",
    title: { mn: "Ангийн үнэлгээ", en: "Formative assessment" },
    summary: {
      mn: "Даалгаврын өмнө шалгуураа хэлж, хичээлийн төгсгөлд богино тасалбар авч, дараагийн алхмыг нь бич.",
      en: "Share criteria first, collect a short exit ticket, and write the next step.",
    },
    audience: {
      mn: "Ангийн багш, хичээлийн багш нарт",
      en: "For classroom teachers",
    },
    outcomes: {
      mn: [
        "Амжилтын шалгуурыг даалгавраас өмнө хэлнэ",
        "Гурван асуулттай гарах тасалбар зохионо",
        "Эргэх холбоонд зөв зүйл ба дараагийн алхмыг хамтад нь бичнэ",
      ],
      en: [
        "State success criteria before the task",
        "Write a three-question exit ticket",
        "Name what worked and the next step in the same comment",
      ],
    },
    instructor: {
      name: "О. Оюунчимэг",
      role: { mn: "Арга зүйч багш", en: "Teacher mentor" },
    },
    modules: [
      {
        id: "practice",
        title: { mn: "Өдөр тутмын арга", en: "Everyday routines" },
        lessons: [
          {
            id: "criteria",
            minutes: 12,
            title: { mn: "Шалгуурыг өмнө нь хэл", en: "Say the criteria first" },
            body: {
              mn: [
                "Сурагч юуг нь үзэхийг мэдэхгүй бол хичээл дууссаны дараах дүн гэнэтийн шийтгэл болно. Самбарт гурваас илүүгүй шалгуур бич. Жишээ нь: хариу нэгжтэй, алхам харагдана, өгүүлбэр бүтэн.",
                "Шалгуураа даалгавар өгөхийн өмнө унш. Сурагч өөрөө түүгээрээ ажлаа шалгасны дараа багш үзнэ. Ингэснээр үнэлгээ нь нууц биш, хичээлийн нэг хэсэг болно.",
              ],
              en: [
                "A mark feels like a surprise penalty when students never saw the target. Write no more than three criteria on the board. For example: the answer has a unit, the steps are visible, the sentence is complete.",
                "Read the criteria before the task starts. Students check their own work against them first. The grade is then part of the lesson, not a secret at the end.",
              ],
            },
          },
          {
            id: "ticket",
            minutes: 11,
            title: { mn: "Гарах тасалбар", en: "Exit ticket" },
            body: {
              mn: [
                "Гарах тасалбар нь хаалганы үнэмлэх биш. Хичээлийн сүүлийн таван минутад өгдөг гурван богино асуулт. Нэг нь өнөөдрийн гол ойлголт, нэг нь жишээ, нэг нь одоо хүртэл бүдэг зүйл.",
                "Бүх дэвтрийг тэр орой засах албагүй. Гурван овоолго хий: ойлгосон, хагас, маргааш эргэж тайлбарлах. Маргаашийн хичээлийн эхний арван минут тэр овоолгоос гарна.",
              ],
              en: [
                "An exit ticket is not a hall pass. It is three short questions in the last five minutes. One asks for today’s main idea, one asks for an example, and one asks what is still unclear.",
                "You do not have to mark every notebook that night. Sort them into three piles: secure, partial, and reteach tomorrow. The first ten minutes of the next lesson come from those piles.",
              ],
            },
          },
          {
            id: "feedback",
            minutes: 12,
            title: { mn: "Дараагийн алхам", en: "The next step" },
            body: {
              mn: [
                "«Сайн байна» гэсэн үг сурагчийг дараагийн ажилд хүргэхгүй. Хоёр өгүүлбэр бич. Эхнийх нь юуг зөв хийснийг нэрлэнэ. Хоёр дахь нь нэг л дараагийн алхмыг хэлнэ. Жишээ: «24-ийг зөв олсон. Одоо 24/32-ыг хувь болго.»",
                "Ангийн чансааг хананд өлгөх хэрэггүй. Хэн тусламж авч байгаа нь бүх ангид харагдахад сурагч нуугдана. Тэмдэглэлийг багшийн дэвтэр, сурагчийн өөрийн хуудас дээр үлдээ.",
              ],
              en: [
                "“Good job” does not move the next piece of work. Write two sentences. The first names what was correct. The second gives one next step. Example: “You found 24. Now turn 24/32 into a percent.”",
                "Do not post a class ranking. When everyone can see who needs help, students hide. Keep the note in the teacher’s book and on the student’s own page.",
              ],
            },
          },
        ],
      },
    ],
    checks: [
      {
        id: "when",
        prompt: {
          mn: "Амжилтын шалгуурыг хэзээ хэлэх вэ?",
          en: "When should success criteria be said?",
        },
        options: {
          mn: ["Даалгавар эхлэхээс өмнө", "Дүн гарсны дараа", "Зөвхөн эцэг эхэд"],
          en: ["Before the task begins", "After the mark is given", "Only to parents"],
        },
        answer: 0,
      },
      {
        id: "exit",
        prompt: {
          mn: "Гарах тасалбар гэж юу вэ?",
          en: "What is an exit ticket?",
        },
        options: {
          mn: [
            "Хаалганы үнэмлэх",
            "Хичээлийн төгсгөлийн богино шалгалт",
            "Улирлын дүнгийн хуудас",
          ],
          en: [
            "A pass for the door",
            "A short check at the end of the lesson",
            "The term report card",
          ],
        },
        answer: 1,
      },
      {
        id: "comment",
        prompt: {
          mn: "Хэрэгтэй эргэх холбоо юу агуулдаг вэ?",
          en: "What does useful feedback include?",
        },
        options: {
          mn: [
            "Зөвхөн «сайн байна»",
            "Зөв хийсэн зүйл ба нэг дараагийн алхам",
            "Ангийн чансаа",
          ],
          en: [
            "Only “good job”",
            "What was correct, and one next step",
            "A class ranking",
          ],
        },
        answer: 1,
      },
    ],
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function courseLessons(course: Course) {
  return course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({ ...lesson, moduleTitle: module.title })),
  );
}

export function courseMinutes(course: Course) {
  return courseLessons(course).reduce((sum, lesson) => sum + lesson.minutes, 0);
}
