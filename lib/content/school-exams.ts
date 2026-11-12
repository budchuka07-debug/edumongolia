export type SchoolLocale = "mn" | "en";

export type SchoolBand = "middle" | "high" | "cambridge" | "international";

export type SchoolText = { mn: string; en: string };

export type SchoolChoice = SchoolText & { why?: SchoolText };

export type SchoolQuestion = {
  id: string;
  prompt: SchoolText;
  choices: SchoolChoice[];
  answer: number;
  rule: SchoolText;
};

export type SchoolTopic = {
  slug: string;
  band: SchoolBand;
  subject: string;
  grades: SchoolText;
  title: SchoolText;
  summary: SchoolText;
  lesson: SchoolText[];
  perAttempt: number;
  questions: SchoolQuestion[];
  custom?: boolean;
};

export const SCHOOL_CUSTOM_KEY = "edumongolia-school-topics";

export const schoolBands: SchoolBand[] = ["middle", "high", "cambridge", "international"];

export const bandLabel: Record<SchoolBand, SchoolText> = {
  middle: { mn: "Дунд анги", en: "Middle school" },
  high: { mn: "Ахлах анги", en: "High school" },
  cambridge: { mn: "Cambridge шалгалт", en: "Cambridge exams" },
  international: { mn: "Олон улсын төгсөлтийн шалгалт", en: "International graduation exams" },
};

const subjectLabel: Record<string, SchoolText> = {
  math: { mn: "Математик", en: "Mathematics" },
  mongolian: { mn: "Монгол хэл", en: "Mongolian" },
  physics: { mn: "Физик", en: "Physics" },
  chemistry: { mn: "Хими", en: "Chemistry" },
  civics: { mn: "Нийгэм", en: "Civics" },
  biology: { mn: "Биологи", en: "Biology" },
  english: { mn: "Англи хэл", en: "English" },
};

export function schoolText(value: SchoolText, locale: SchoolLocale) {
  const text = value[locale].trim();
  return text || value.mn;
}

export function subjectName(subject: string, locale: SchoolLocale) {
  const known = subjectLabel[subject];
  return known ? schoolText(known, locale) : subject;
}

function pair(mn: string, en: string): SchoolText {
  return { mn, en };
}

function question(
  id: string,
  prompt: [string, string],
  rule: [string, string],
  correct: [string, string],
  wrongs: Array<[string, string, string, string]>,
): SchoolQuestion {
  return {
    id,
    prompt: pair(prompt[0], prompt[1]),
    rule: pair(rule[0], rule[1]),
    answer: 0,
    choices: [
      pair(correct[0], correct[1]),
      ...wrongs.map(([mn, en, whyMn, whyEn]) => ({ ...pair(mn, en), why: pair(whyMn, whyEn) })),
    ],
  };
}

function topic(
  slug: string,
  band: SchoolBand,
  subject: string,
  grades: [string, string],
  title: [string, string],
  summary: [string, string],
  lesson: Array<[string, string]>,
  questions: SchoolQuestion[],
): SchoolTopic {
  return {
    slug,
    band,
    subject,
    grades: pair(grades[0], grades[1]),
    title: pair(title[0], title[1]),
    summary: pair(summary[0], summary[1]),
    lesson: lesson.map(([mn, en]) => pair(mn, en)),
    perAttempt: 3,
    questions,
  };
}

export const schoolTopics: SchoolTopic[] = [
  topic(
    "middle-math-fractions",
    "middle",
    "math",
    ["6–8-р анги", "Grades 6–8"],
    ["Бутархай", "Fractions"],
    ["Нэмэх, хасах, үржүүлэх, хуваах. Нэг удаад сангаас 3 асуулт гарна.", "Add, subtract, multiply, and divide. One try draws 3 questions."],
    [
      ["Бутархайг нэмэх, хасахаас өмнө хуваарийг адилтгана. Тоологч, хуваарийг тусад нь нэмэх нь энэ сэдвийн хамгийн элбэг алдаа.", "Before adding or subtracting, make the denominators the same. Adding the tops and bottoms separately is the usual mistake."],
      ["Үржүүлэхэд тоологчийг тоологчоор, хуваарийг хуваариар үржүүлнэ. Хуваахад хоёр дахь бутархайг урвуулж, дараа нь үржүүлнэ.", "To multiply, multiply the numerators and the denominators. To divide, invert the second fraction, then multiply."],
    ],
    [
      question("mf1", ["1/2 + 1/4 хэд вэ?", "What is 1/2 + 1/4?"], ["1/2 = 2/4. 2/4 + 1/4 = 3/4.", "1/2 = 2/4, so the sum is 3/4."], ["3/4", "3/4"], [
        ["2/6", "2/6", "Тоологч, хуваарийг тусад нь нэмсэн. Эхлээд хуваарийг адилтгана.", "The tops and bottoms were added separately. Match the denominators first."],
        ["1/6", "1/6", "Нэмэхийг үржүүлэхтэй хольсон.", "Addition was treated as multiplication."],
        ["2/4", "2/4", "Тоологчийг нэмсэн ч 1/2-ийг 2/4 болгоогүй.", "The numerators were added, but 1/2 was not rewritten as 2/4."],
      ]),
      question("mf2", ["2/3 − 1/6 хэд вэ?", "What is 2/3 − 1/6?"], ["2/3 = 4/6. 4/6 − 1/6 = 3/6 = 1/2.", "2/3 = 4/6, so the difference is 1/2."], ["1/2", "1/2"], [
        ["1/3", "1/3", "Тоологч, хуваарийг тусад нь хассан.", "The tops and bottoms were subtracted separately."],
        ["1/6", "1/6", "2/3-ийг 4/6 болгоогүй тул тоологч буруу гарсан.", "2/3 was not rewritten as 4/6, so the numerator is wrong."],
        ["5/6", "5/6", "Хасахыг нэмэхтэй хольсон.", "Subtraction was treated as addition."],
      ]),
      question("mf3", ["3/5 × 1/2 хэд вэ?", "What is 3/5 × 1/2?"], ["3×1 = 3, 5×2 = 10. Үржвэр 3/10.", "3×1 and 5×2 give 3/10."], ["3/10", "3/10"], [
        ["4/7", "4/7", "Үржүүлэхийг нэмэхтэй хольсон.", "Multiplication was treated as addition."],
        ["3/5", "3/5", "Хуваарийг үржүүлээгүй.", "The denominators were not multiplied."],
        ["6/5", "6/5", "Хуваахын урвуу үйлдлийг үржүүлэх дээр хийсэн.", "The invert step from division was used on a product."],
      ]),
      question("mf4", ["3/4 ÷ 1/2 хэд вэ?", "What is 3/4 ÷ 1/2?"], ["1/2-ийг урвуулбал 2/1. 3/4 × 2/1 = 3/2.", "Invert 1/2, then 3/4 × 2/1 = 3/2."], ["3/2", "3/2"], [
        ["3/8", "3/8", "Хоёр дахь бутархайг урвуулалгүй үржүүлсэн.", "The second fraction was multiplied without inverting it."],
        ["2/3", "2/3", "Эхний бутархайг урвуулсан. Урвуулах бутархай нь хуваагч.", "The first fraction was inverted. Invert the divisor."],
        ["4/6", "4/6", "Хуваахыг нэмэхтэй хольсон.", "Division was treated as addition."],
      ]),
      question("mf5", ["24 сурагчийн 3/8 хэд вэ?", "What is 3/8 of 24 students?"], ["24 ÷ 8 × 3 = 9.", "24 ÷ 8 × 3 = 9."], ["9", "9"], [
        ["8", "8", "Хуваарийг хариу гэж авсан. Хуваарь нь хэсгийн тоо.", "The denominator was used as the answer. It only names the number of parts."],
        ["3", "3", "Тоологчийг хариу гэж авсан. Тоологч нь авч байгаа хэсгийн тоо.", "The numerator was used as the answer. It names how many parts to take."],
        ["16", "16", "24-өөс 8-ыг хассан. Бутархайг хасах үйлдэл биш.", "8 was subtracted from 24. A fraction of a group is not that subtraction."],
      ]),
      question("mf6", ["6/8-ийг хуваагчийн хамгийн бага хэлбэрт оруулбал аль вэ?", "Which is 6/8 in lowest terms?"], ["6 ба 8-ын хамгийн их хуваагч 2. 6/8 = 3/4.", "The greatest common factor of 6 and 8 is 2, so 6/8 = 3/4."], ["3/4", "3/4"], [
        ["3/8", "3/8", "Зөвхөн тоологчийг 2-т хуваасан.", "Only the numerator was divided by 2."],
        ["6/4", "6/4", "Бутархайг урвуулсан. Хялбарчлах нь хуваах, урвуулах биш.", "The fraction was inverted. Simplifying divides, it does not flip."],
        ["2/6", "2/6", "Хуваагчийг буруу сонгож, тоо хуваариа сольсон.", "The factor was chosen badly and the fraction was turned over."],
      ]),
    ],
  ),
  topic(
    "middle-mongolian-spelling",
    "middle",
    "mongolian",
    ["6–9-р анги", "Grades 6–9"],
    ["Зөв бичих дүрэм", "Spelling rules"],
    ["ъ, ь, харьяалах, олон тоо. Журамласан толийн сургуулийн хэсэг.", "ъ, ь, genitive endings, and plurals from the school spelling rules."],
    [
      ["Эр үгэнд я, ё саланги орвол өмнө нь ъ бичнэ: явъя. Эм үгэнд е саланги орвол өмнө нь ь бичнэ: өгье.", "In a masculine word, write ъ before a separate я or ё: явъя. In a feminine word, write ь before a separate е: өгье."],
      ["Тогтворгүй н гарч ирнэ: модны. Хос эгшигт -н залгана: дэлхийн. нь-ийн өмнөх г-г гээхгүй: гарын нь.", "Unstable н appears: модны. A diphthong takes -н: дэлхийн. Keep the hidden г before нь: гарын нь."],
    ],
    [
      question("ms1", ["«яв» дээр -я залгахад аль нь зөв бэ?", "Which spelling is correct when -я is added to яв?"], ["Эр үгэнд я-гийн өмнө ъ орно.", "A masculine word takes ъ before я."], ["явъя", "явъя"], [
        ["явья", "явья", "ь-ийг эм үгийн е-д хэрэглэнэ. яв нь эр үг.", "ь belongs before е in a feminine word. яв is masculine."],
        ["явя", "явя", "Тусгаарлагч тэмдгийг орхисон тул я өмнөх гийгүүлэгчтэйгээ нийлнэ.", "The separator is missing, so я joins the consonant before it."],
        ["явия", "явия", "Илүү үе нэмсэн. -я шууд залгана.", "An extra syllable was added. -я attaches directly."],
      ]),
      question("ms2", ["«өг» дээр -е залгахад аль нь зөв бэ?", "Which spelling is correct when -е is added to өг?"], ["Эм үгэнд е-гийн өмнө ь орно.", "A feminine word takes ь before е."], ["өгье", "өгье"], [
        ["өгъе", "өгъе", "ъ-г эр үгийн я, ё-д хэрэглэнэ. өг нь эм үг.", "ъ belongs before я or ё in a masculine word. өг is feminine."],
        ["өге", "өге", "Тусгаарлагчийг орхисон.", "The separator is missing."],
        ["өгие", "өгие", "Илүү и үе нэмсэн.", "An extra и syllable was added."],
      ]),
      question("ms3", ["«мод»-ыг харьяалахад аль нь зөв бэ?", "Which genitive of мод is correct?"], ["Тогтворгүй н гарна: модны.", "The unstable н appears: модны."], ["модны", "модны"], [
        ["модын", "модын", "Тогтворгүй н-ийг гаргаагүй.", "The unstable н was left out."],
        ["модийн", "модийн", "Хос эгшгийн -ийн нөхцөлийг мод дээр тавьсан.", "The diphthong ending -ийн was used on мод."],
        ["модныы", "модныы", "Харьяалах нөхцөл давхардсан.", "The genitive ending was written twice."],
      ]),
      question("ms4", ["«дэлхий»-н харьяалах хэлбэр аль вэ?", "Which genitive of дэлхий is correct?"], ["Хос эгшиг болон урт ий-д -н залгана: дэлхийн.", "A diphthong or long ий takes -н: дэлхийн."], ["дэлхийн", "дэлхийн"], [
        ["дэлхийны", "дэлхийны", "-ны нөхцөлийг хос эгшигт залгасан.", "-ны was attached to a diphthong."],
        ["дэлхийы", "дэлхийы", "Харьяалах н дутуу.", "The genitive н is missing."],
        ["дэлхийин", "дэлхийин", "ий давхардаж, нөхцөл буруу суусан.", "ий was doubled and the ending is attached badly."],
      ]),
      question("ms5", ["«ном»-ын олон тоо аль вэ?", "Which plural of ном is the usual form?"], ["ном → номууд.", "ном becomes номууд."], ["номууд", "номууд"], [
        ["номнууд", "номнууд", "Үндэс болон нөхцөлийн дунд илүү н орсон.", "An extra н was placed between the stem and the ending."],
        ["номьнууд", "номьнууд", "номд зөөлний тэмдэг байхгүй.", "ном has no soft sign."],
        ["номмууд", "номмууд", "м үсэг давхардсан.", "The letter м was doubled."],
      ]),
      question("ms6", ["«гар» + «нь» алиар зөв холбогдох вэ?", "Which form of гар before нь is correct?"], ["нь-ийн өмнөх г үлдэнэ: гарын нь.", "The hidden г stays before нь: гарын нь."], ["гарын нь", "гарын нь"], [
        ["гары нь", "гары нь", "г үсгийг гээсэн.", "The г was dropped."],
        ["гарны нь", "гарны нь", "Илүү н нэмсэн.", "An extra н was added."],
        ["гараан нь", "гараан нь", "Үгийг буруу сунгасан.", "The stem was lengthened in the wrong way."],
      ]),
    ],
  ),
  topic(
    "middle-physics-motion",
    "middle",
    "physics",
    ["7–9-р анги", "Grades 7–9"],
    ["Хурд, зам, хугацаа", "Speed, distance, and time"],
    ["v = s / t. Нэгж солихыг хамт дасгана.", "v = s / t, including a unit change."],
    [
      ["Хурд = зам ÷ хугацаа. Зам = хурд × хугацаа. Хугацаа = зам ÷ хурд.", "Speed = distance ÷ time. Distance = speed × time. Time = distance ÷ speed."],
      ["36 км/ц = 10 м/с. Км/ц-ийг м/с болгохдоо 3.6-д хуваана. Үржүүлэх, нэмэх нь энэ сэдвийн элбэг алдаа.", "36 km/h = 10 m/s. Divide km/h by 3.6 to get m/s. Multiplying or adding the two numbers is a common miss."],
    ],
    [
      question("pm1", ["120 км замыг 2 цагт явбал хурд хэд вэ?", "A trip of 120 km takes 2 hours. What is the speed?"], ["120 ÷ 2 = 60 км/ц.", "120 ÷ 2 = 60 km/h."], ["60 км/ц", "60 km/h"], [
        ["240 км/ц", "240 km/h", "Замыг хугацаанд хуваахын оронд үржүүлсэн.", "The distance was multiplied by the time instead of divided."],
        ["122 км/ц", "122 km/h", "Зам, хугацааг нэмсэн.", "Distance and time were added."],
        ["2 км/ц", "2 km/h", "Хугацааг хурд гэж авсан.", "The time was reported as the speed."],
      ]),
      question("pm2", ["15 м/с хурдтай бие 4 секундэд хэдэн метр явах вэ?", "How far does an object at 15 m/s travel in 4 seconds?"], ["s = v × t = 15 × 4 = 60 м.", "s = v × t = 60 m."], ["60 м", "60 m"], [
        ["3.75 м", "3.75 m", "Үржүүлэхийн оронд хуваасан.", "The numbers were divided instead of multiplied."],
        ["19 м", "19 m", "Хурд, хугацааг нэмсэн.", "Speed and time were added."],
        ["15 м", "15 m", "Хурдыг зам гэж авсан.", "The speed was reported as the distance."],
      ]),
      question("pm3", ["36 км/ц хурдыг м/с-ээр илэрхийлбэл хэд вэ?", "What is 36 km/h in m/s?"], ["36 ÷ 3.6 = 10 м/с.", "36 ÷ 3.6 = 10 m/s."], ["10 м/с", "10 m/s"], [
        ["36 м/с", "36 m/s", "Тоог хуулаад нэгжийг сольсон. Км/ц, м/с хоёр өөр хэмжүүр.", "The number was copied and only the unit name changed. km/h and m/s are different."],
        ["360 м/с", "360 m/s", "10 дахин үржүүлсэн. Хөрвүүлэхдээ 3.6-д хуваана.", "The value was multiplied by 10. Divide by 3.6."],
        ["3.6 м/с", "3.6 m/s", "10-д хуваасан. Хуваагч нь 3.6.", "The value was divided by 10. The divisor is 3.6."],
      ]),
      question("pm4", ["150 м замыг 5 м/с хурдтай явбал хэдэн секунд вэ?", "How many seconds does 150 m take at 5 m/s?"], ["t = s / v = 150 / 5 = 30 с.", "t = 150 / 5 = 30 s."], ["30 с", "30 s"], [
        ["750 с", "750 s", "Хуваахын оронд үржүүлсэн.", "The numbers were multiplied instead of divided."],
        ["155 с", "155 s", "Зам, хурдыг нэмсэн.", "Distance and speed were added."],
        ["5 с", "5 s", "Хурдыг хугацаа гэж авсан.", "The speed was reported as the time."],
      ]),
      question("pm5", ["100 км замыг 2 цаг 30 минутад явбал дундаж хурд хэд вэ?", "100 km takes 2 hours 30 minutes. What is the average speed?"], ["2 цаг 30 минут = 2.5 цаг. 100 / 2.5 = 40 км/ц.", "2 hours 30 minutes is 2.5 hours. 100 / 2.5 = 40 km/h."], ["40 км/ц", "40 km/h"], [
        ["50 км/ц", "50 km/h", "30 минутыг орхиж, 2 цагт хуваасан.", "The 30 minutes were dropped and the distance was divided by 2 hours."],
        ["100 км/ц", "100 km/h", "Замыг хурд гэж авсан.", "The distance was reported as the speed."],
        ["230 км/ц", "230 km/h", "2 цаг 30 минутыг 230 гэсэн тоо гэж хурдэнд оруулсан.", "2 hours 30 minutes was treated as the number 230."],
      ]),
      question("pm6", ["Аль нэгж хурдыг заах вэ?", "Which unit names a speed?"], ["Хурд нь зам, хугацааны харьцаа. Км/ц бол хурд.", "Speed is distance divided by time, so km/h is a speed."], ["км/ц", "km/h"], [
        ["км", "km", "Км нь зам. Хурд биш.", "Kilometres measure distance, not speed."],
        ["цаг", "an hour", "Цаг нь хугацаа. Хурд биш.", "An hour measures time, not speed."],
        ["кг", "kg", "Кг нь масс. Хөдөлгөөний хурд биш.", "Kilograms measure mass, not speed."],
      ]),
    ],
  ),
  topic(
    "high-math-quadratic",
    "high",
    "math",
    ["10–11-р анги", "Grades 10–11"],
    ["Квадрат тэгшитгэл", "Quadratic equations"],
    ["Язгуур, дискриминант, язгуурын нийлбэр.", "Roots, the discriminant, and the sum of the roots."],
    [
      ["x² − 5x + 6 = 0 хэлбэрийг (x − 2)(x − 3) = 0 гэж задалж болно. Язгуурын нийлбэр нь x-ийн өмнөх коэффициентийн эсрэг тэмдэг.", "x² − 5x + 6 = 0 factors as (x − 2)(x − 3) = 0. The sum of the roots is the opposite of the coefficient of x."],
      ["D = b² − 4ac. D > 0 бол хоёр өөр бодит язгуур, D = 0 бол нэг давхацсан, D < 0 бол бодит язгуур байхгүй. x² = 16 бол x = 4 ба x = −4.", "D = b² − 4ac. Two distinct real roots, one repeated root, or no real root. x² = 16 gives both 4 and −4."],
    ],
    [
      question("hq1", ["x² − 5x + 6 = 0 тэгшитгэлийн язгуур аль вэ?", "What are the roots of x² − 5x + 6 = 0?"], ["(x − 2)(x − 3) = 0 тул язгуур 2 ба 3.", "(x − 2)(x − 3) = 0, so the roots are 2 and 3."], ["2 ба 3", "2 and 3"], [
        ["5 ба 6", "5 and 6", "Коэффициентийг язгуур гэж авсан.", "The coefficients were used as the roots."],
        ["−2 ба −3", "−2 and −3", "Язгуурын тэмдгийг эсрэгээр авсан.", "The signs of the roots were reversed."],
        ["1 ба 6", "1 and 6", "Үржвэр нь 6 боловч нийлбэр нь 5 биш.", "The product is 6, but the sum is not 5."],
      ]),
      question("hq2", ["x² = 16 тэгшитгэлийн бодит шийд аль вэ?", "Which are the real solutions of x² = 16?"], ["4² = 16, (−4)² = 16. Хоёул шийд.", "Both 4 and −4 square to 16."], ["4 ба −4", "4 and −4"], [
        ["зөвхөн 4", "only 4", "Сөрөг язгуурыг гээсэн. Сөрөг тооны квадрат мөн эерэг.", "The negative root was dropped. A negative number also squares to a positive."],
        ["8", "8", "16-г 2-т хуваасан. Квадрат язгуур хайна.", "16 was divided by 2. The equation asks for square roots."],
        ["256", "256", "16-г дахин квадратласан.", "16 was squared again."],
      ]),
      question("hq3", ["x² − 4x + 4 = 0 тэгшитгэлийн дискриминант хэд вэ?", "What is the discriminant of x² − 4x + 4 = 0?"], ["D = (−4)² − 4×1×4 = 0.", "D = (−4)² − 4×1×4 = 0."], ["0", "0"], [
        ["4", "4", "b-г квадратлаагүй.", "b was not squared."],
        ["8", "8", "4ac-г b²-оос буруу хассан.", "4ac was not subtracted from b² correctly."],
        ["−4", "−4", "b²-ийн тэмдгийг хассан гэж үзсэн.", "b² was treated as negative."],
      ]),
      question("hq4", ["x² + 1 = 0 тэгшитгэл бодит тоон олонлогт хэдэн язгууртай вэ?", "How many real roots does x² + 1 = 0 have?"], ["x² = −1 бодит тоон дээр боломжгүй. D = −4.", "x² = −1 has no real solution. D = −4."], ["нэг ч байхгүй", "none"], [
        ["1", "1", "x = 1 гэж орлуулахад 2 гарна, 0 биш.", "Substituting 1 gives 2, not 0."],
        ["−1", "−1", "(−1)² + 1 = 2. Тэг биш.", "(−1)² + 1 = 2, not 0."],
        ["1 ба −1", "1 and −1", "Квадрат нь −1-тэй тэнцэнэ гэж үзсэн. Бодит тооны квадрат сөрөг биш.", "Those values were treated as square roots of −1. A real square is not negative."],
      ]),
      question("hq5", ["(x − 1)(x + 4) = 0 тэгшитгэлийн язгуур аль вэ?", "What are the roots of (x − 1)(x + 4) = 0?"], ["x − 1 = 0 буюу x + 4 = 0. Язгуур 1 ба −4.", "x − 1 = 0 or x + 4 = 0, so the roots are 1 and −4."], ["1 ба −4", "1 and −4"], [
        ["−1 ба 4", "−1 and 4", "Хаалт доторх тэмдгийг эсрэгээр нь язгуурт тавиагүй.", "The signs inside the brackets were not reversed for the roots."],
        ["1 ба 4", "1 and 4", "Нэмэхтэй хаалтны язгуурыг эерэг гэж үлдээсэн.", "The root of the plus bracket was left positive."],
        ["0 ба 4", "0 and 4", "Үржвэр тэг байх нөхцөлийг задлаагүй.", "The zero-product rule was not applied."],
      ]),
      question("hq6", ["x² − 7x + 10 = 0 тэгшитгэлийн язгуурын нийлбэр хэд вэ?", "What is the sum of the roots of x² − 7x + 10 = 0?"], ["x² − sx + p хэлбэрт нийлбэр нь s. Энд 7.", "For x² − sx + p, the sum of the roots is s. Here it is 7."], ["7", "7"], [
        ["10", "10", "Үржвэрийг нийлбэр гэж авсан. 10 нь язгуурын үржвэр.", "The product was used as the sum. 10 is the product of the roots."],
        ["−7", "−7", "x-ийн коэффициентийн тэмдгийг эргүүлээгүй.", "The sign of the x coefficient was not reversed."],
        ["3", "3", "Язгуурын зөрүүг нийлбэр гэж авсан.", "The difference of the roots was used as the sum."],
      ]),
    ],
  ),
  topic(
    "high-chemistry-atom",
    "high",
    "chemistry",
    ["10–11-р анги", "Grades 10–11"],
    ["Атом ба бодис", "Atoms and substances"],
    ["Протон, нейтрон, ус, pH, моль.", "Protons, neutrons, water, pH, and the mole."],
    [
      ["Атомын дугаар нь протоны тоо. Нейтрон = массын тоо − протоны тоо.", "The atomic number is the proton count. Neutrons = mass number − protons."],
      ["pH 7 саармаг, 7-оос бага хүчил, 7-оос их шүлт. Нүүрстөрөгч-12-ын 1 моль нь 12 г.", "pH 7 is neutral, below 7 is acidic, above 7 is alkaline. One mole of carbon-12 has a mass of 12 g."],
    ],
    [
      question("hc1", ["Нүүрстөрөгчийн атомын дугаар 6. Цөмд хэдэн протон байх вэ?", "Carbon has atomic number 6. How many protons are in the nucleus?"], ["Атомын дугаар протонтой тэнцүү.", "The atomic number equals the proton count."], ["6", "6"], [
        ["12", "12", "Массын тоог протоны тоо гэж авсан.", "The mass number was used as the proton count."],
        ["0", "0", "Протоныг электронтой сольж, цөмийг хоосон гэж үзсэн.", "Protons were confused with electrons and the nucleus was treated as empty."],
        ["8", "8", "Октетын 8-ыг атомын дугаартай хольсон.", "The octet number 8 was used as the atomic number."],
      ]),
      question("hc2", ["Массын тоо 23, атомын дугаар 11 бол нейтрон хэд вэ?", "Mass number 23 and atomic number 11. How many neutrons?"], ["23 − 11 = 12.", "23 − 11 = 12."], ["12", "12"], [
        ["23", "23", "Массын тоог нейтрон гэж авсан.", "The mass number was used as the neutron count."],
        ["11", "11", "Протоны тоог нейтрон гэж авсан.", "The proton count was used as the neutron count."],
        ["34", "34", "Массын тоо, атомын дугаарыг нэмсэн.", "The mass number and atomic number were added."],
      ]),
      question("hc3", ["H₂O молекулд устөрөгч, хүчилтөрөгч хэдэн атом байх вэ?", "How many hydrogen and oxygen atoms are in one H₂O molecule?"], ["Индекс нь тухайн атомын тоо. H 2, O 1.", "The subscript is the atom count: two H and one O."], ["H 2, O 1", "2 H, 1 O"], [
        ["H 1, O 2", "1 H, 2 O", "Индексийг эсрэг атом дээр уншсан.", "The subscript was given to the other element."],
        ["H 2, O 2", "2 H, 2 O", "Хүчилтөрөгчид илүү индекс нэмсэн.", "An extra subscript was given to oxygen."],
        ["H 1, O 1", "1 H, 1 O", "H-ийн 2 индексийг тоолоогүй.", "The subscript 2 on H was ignored."],
      ]),
      question("hc4", ["pH нь 3 байгаа уусмал аль төрөлд орох вэ?", "A solution has pH 3. What kind of solution is it?"], ["pH 7-оос бага бол хүчил.", "A pH below 7 is acidic."], ["хүчил", "an acid"], [
        ["саармаг", "neutral", "Саармаг нь pH 7. 3 нь 7-оос бага.", "Neutral is pH 7. 3 is below 7."],
        ["шүлт", "an alkali", "Шүлт нь pH 7-оос их. Бага тоог шүлт гэж андуурсан.", "An alkali has pH above 7. A low number was read as alkaline."],
        ["давс", "a salt", "pH дангаараа бодисыг давс гэж нэрлэхгүй. 3 нь хүчиллэг орчин.", "pH alone does not name a salt. 3 means an acidic solution."],
      ]),
      question("hc5", ["Нүүрстөрөгч-12-ын 1 молийн масс хэд вэ?", "What is the mass of 1 mole of carbon-12?"], ["Нүүрстөрөгч-12-ын молийн масс 12 г/моль.", "The molar mass of carbon-12 is 12 g/mol."], ["12 г", "12 g"], [
        ["1 г", "1 g", "Молийг 1 грамм гэж үзсэн.", "A mole was treated as 1 gram."],
        ["6 г", "6 g", "Атомын дугаарыг граммаар авсан.", "The atomic number was used as the mass in grams."],
        ["24 г", "24 g", "Молийн массыг хоёр дахин үржүүлсэн.", "The molar mass was doubled."],
      ]),
      question("hc6", ["NaCl аль бүлэгт орох вэ?", "Which group does NaCl belong to?"], ["Натри, хлороос тогтсон химийн нэгдэл.", "Sodium and chlorine form a chemical compound."], ["нэгдэл", "a compound"], [
        ["элемент", "an element", "Элемент нэг л төрлийн атомтай. NaCl хоёр элементтэй.", "An element has one kind of atom. NaCl has two elements."],
        ["нэг атом", "a single atom", "NaCl нь атом биш, натри ба хлорын нэгдэл.", "NaCl is not one atom. It is a compound of sodium and chlorine."],
        ["протон", "a proton", "Протон нь атомын бөөмийн хэсэг. Бодисын нэр биш.", "A proton is part of a nucleus, not the name of this substance."],
      ]),
    ],
  ),
  topic(
    "high-civics-constitution",
    "high",
    "civics",
    ["10–12-р анги", "Grades 10–12"],
    ["Үндсэн хууль", "The constitution"],
    ["Дээд хууль, сонгууль, УИХ, төрийн тэргүүн.", "The supreme law, voting, parliament, and the head of state."],
    [
      ["Монгол Улсын Үндсэн хууль бол дээд хүчинтэй хууль. Бусад хууль түүнд харшлахгүй.", "The Constitution of Mongolia is the supreme law. Other laws do not override it."],
      ["Сонгох нас 18. Улсын Их Хурал 2023 оны нэмэлтээр 126 гишүүнтэй. Ерөнхийлөгч төрийн тэргүүн, Ерөнхий сайд засгийн газрын тэргүүн.", "The voting age is 18. Since the 2023 amendment the State Great Khural has 126 members. The President is head of state, and the Prime Minister heads the government."],
    ],
    [
      question("hv1", ["Монгол Улсын дээд хүчинтэй хууль аль вэ?", "Which law has the highest force in Mongolia?"], ["Үндсэн хууль бусад хуулиас дээгүүр.", "The constitution stands above other laws."], ["Үндсэн хууль", "the Constitution"], [
        ["Засгийн газрын тогтоол", "a Cabinet resolution", "Тогтоол хууль биш, Үндсэн хуулиас доош.", "A Cabinet resolution is not above the constitution."],
        ["Ерөнхийлөгчийн зарлиг", "a presidential decree", "Зарлиг Үндсэн хуулийг давахгүй.", "A decree does not override the constitution."],
        ["Аймгийн иргэдийн Төлөөлөгчдийн Хурлын шийдвэр", "an aimag assembly decision", "Орон нутгийн шийдвэр дээд хууль биш.", "A local decision is not the supreme law."],
      ]),
      question("hv2", ["Иргэн хэдэн наснаас эхлэн сонгох эрхтэй вэ?", "From what age can a citizen vote?"], ["Сонгох нас 18.", "The voting age is 18."], ["18", "18"], [
        ["16", "16", "16 насыг сонгуулийн нас гэж андуурсан.", "16 was used as the voting age."],
        ["21", "21", "Өөр улсын насны жишээг Монголд тавьсан.", "Another country's age was applied to Mongolia."],
        ["25", "25", "Сонгогдох зарим албан тушаалын насыг сонгох настай хольсон.", "An age for holding some offices was mixed up with the voting age."],
      ]),
      question("hv3", ["Улсын Их Хурал одоо хэдэн гишүүнтэй вэ?", "How many members does the State Great Khural have now?"], ["2023 оны нэмэлтээр 126 гишүүнтэй.", "The 2023 amendment set the number at 126."], ["126", "126"], [
        ["76", "76", "2023 оноос өмнөх бүрэлдэхүүн. Одоо 126.", "76 was the size before 2023. It is 126 now."],
        ["100", "100", "Тойм тоо. Хуулийн тоо 126.", "100 is a round guess. The legal number is 126."],
        ["21", "21", "Аймгийн тоог гишүүний тоотой хольсон.", "The number of aimags was used as the number of members."],
      ]),
      question("hv4", ["Ерөнхийлөгч ямар үүргийн байр суурьтай вэ?", "What position does the President hold?"], ["Ерөнхийлөгч төрийн тэргүүн.", "The President is the head of state."], ["төрийн тэргүүн", "head of state"], [
        ["засгийн газрын тэргүүн", "head of government", "Засгийн газрыг Ерөнхий сайд тэргүүлнэ.", "The Prime Minister heads the government."],
        ["Улсын Их Хурлын дарга", "chair of the State Great Khural", "УИХ-ын дарга хуралдааныг тэргүүлнэ. Ерөнхийлөгч биш.", "The chair leads parliament. That role is not the President."],
        ["шүүгч", "a judge", "Шүүх засаглал тусдаа. Ерөнхийлөгч шүүгч биш.", "The courts are a separate branch. The President is not a judge."],
      ]),
      question("hv5", ["Иргэний үндсэн үүрэг аль вэ?", "Which is a basic duty of a citizen?"], ["Иргэн хуулийг сахина.", "A citizen follows the law."], ["хуулийг сахих", "to follow the law"], [
        ["татвар төлөхгүй байх", "to refuse every tax", "Хуулиар ногдсон татвараас татгалзах нь үүрэг биш.", "Refusing a lawful tax is not the duty."],
        ["сонгуульд заавал нэр дэвших", "to be required to stand as a candidate", "Нэр дэвших нь эрх. Бүх иргэнд ногдсон үүрэг биш.", "Standing for election is a right, not a duty of every citizen."],
        ["хуулийг дангаараа батлах", "to adopt laws alone", "Хууль батлах эрх мэдэл Улсын Их Хуралд байна.", "Laws are adopted by the State Great Khural, not by one citizen alone."],
      ]),
      question("hv6", ["Сурч боловсрох эрхийг юу баталсан бэ?", "What guarantees the right to education?"], ["Үндсэн хуульд сурч боловсрох эрх бий.", "The constitution includes the right to education."], ["Үндсэн хууль", "the Constitution"], [
        ["зөвхөн нэг сургуулийн дотоод журам", "only one school's house rules", "Дотоод журам Үндсэн хуулийн эрхийг орлохгүй.", "House rules do not replace the constitutional right."],
        ["зөвхөн хувийн сургуулийн гэрээ", "only a private-school contract", "Гэрээ нь тухайн сургуулийн нөхцөл. Эрхийн эх сурвалж биш.", "A contract sets one school's terms. It is not the source of the right."],
        ["сонгуулийн нас хүрснээс хойш үүснэ", "it begins only at voting age", "Сурч боловсрох эрх сонгох наснаас хамаарахгүй.", "The right to education does not start at voting age."],
      ]),
    ],
  ),
  topic(
    "cambridge-igcse-math",
    "cambridge",
    "math",
    ["Cambridge IGCSE Mathematics", "Cambridge IGCSE Mathematics"],
    ["Тоо, алгебр, Пифагор", "Number, algebra, and Pythagoras"],
    ["0580 хөтөлбөрийн сэдэв дээрх анхны дасгал. Албан хуудас биш.", "Original practice on 0580 topics. Not an official paper."],
    [
      ["Хувийг мөнгөн дүн дээр үржүүлнэ. 15% хямдрал гэдэг нь үнийг 0.85-аар үржүүлнэ гэсэн үг. 15-ыг шууд хасах нь элбэг алдаа.", "Multiply a price by the percent as a decimal. A 15% discount multiplies by 0.85. Subtracting 15 from the price is a common miss."],
      ["Харьцааг нийт хэсэгт хуваана. a² + b² = c². Дундаж нь нийлбэрийг тооны тоонд хуваана.", "Split a ratio into equal parts. a² + b² = c². The mean is the sum divided by how many numbers there are."],
    ],
    [
      question("cm1", ["A shirt costs $40. After a 15% discount, what is paid?", "A shirt costs $40. After a 15% discount, what is paid?"], ["40 × 0.85 = 34.", "40 × 0.85 = 34."], ["$34", "$34"], [
        ["$25", "$25", "15-ыг үнээс шууд хассан. 15% нь 15 доллар биш.", "15 was subtracted from the price. 15% of 40 is not 15 dollars."],
        ["$15", "$15", "Хувийн тоог төлөх үнэ гэж авсан.", "The percent number was used as the amount paid."],
        ["$55", "$55", "Хямдралыг нэмэгдэл гэж бодсон.", "The discount was applied as an increase."],
      ]),
      question("cm2", ["$20 is shared in the ratio 2:3. How much is the larger share?", "$20 is shared in the ratio 2:3. How much is the larger share?"], ["Нийт 5 хэсэг. Нэг хэсэг $4. Их хувь 3 × 4 = 12.", "There are 5 parts. One part is $4, so the larger share is $12."], ["$12", "$12"], [
        ["$8", "$8", "Бага хувийг их гэж авсан. 2 хэсэг нь $8.", "The smaller share was chosen. Two parts are $8."],
        ["$10", "$10", "Харьцааг орхиж, хагасыг авсан.", "The ratio was ignored and the total was halved."],
        ["$6", "$6", "2 ба 3-ыг үржүүлээд хариу гэж авсан.", "2 and 3 were multiplied and used as the share."],
      ]),
      question("cm3", ["Solve 3x − 4 = 11.", "Solve 3x − 4 = 11."], ["3x = 15, x = 5.", "3x = 15, so x = 5."], ["x = 5", "x = 5"], [
        ["x = 7", "x = 7", "11 − 4 гэж бодоод 3-т хуваагаагүй.", "11 − 4 was used, and the result was not divided by 3."],
        ["x = 15", "x = 15", "3-т хуваахаа мартсан.", "The division by 3 was skipped."],
        ["x = 45", "x = 45", "11 ба 4-ийг 3-аар үржүүлсэн.", "11 and 4 were multiplied by 3."],
      ]),
      question("cm4", ["A right triangle has legs 6 and 8. What is the hypotenuse?", "A right triangle has legs 6 and 8. What is the hypotenuse?"], ["6² + 8² = 36 + 64 = 100. Язгуур 10.", "6² + 8² = 100, so the hypotenuse is 10."], ["10", "10"], [
        ["14", "14", "Катетуудыг нэмсэн. Пифагорын квадрат дутуу.", "The legs were added. The squares in Pythagoras were skipped."],
        ["48", "48", "6 ба 8-ыг үржүүлсэн.", "The legs were multiplied."],
        ["100", "100", "Квадратуудын нийлбэр дээр зогссон. Язгуур аваагүй.", "The sum of the squares was left as the length. The square root was not taken."],
      ]),
      question("cm5", ["What is the mean of 4, 6, and 11?", "What is the mean of 4, 6, and 11?"], ["(4 + 6 + 11) / 3 = 7.", "(4 + 6 + 11) / 3 = 7."], ["7", "7"], [
        ["6", "6", "Медианыг дундаж гэж авсан.", "The median was used as the mean."],
        ["21", "21", "Нийлбэрийг тооны тоонд хуваагаагүй.", "The sum was not divided by how many numbers there are."],
        ["4", "4", "Хамгийн багыг дундаж гэж авсан.", "The smallest value was used as the mean."],
      ]),
      question("cm6", ["Write 2/5 as a percentage.", "Write 2/5 as a percentage."], ["2/5 = 0.4 = 40%.", "2/5 = 0.4 = 40%."], ["40%", "40%"], [
        ["25%", "25%", "5-ыг 2-т хувааж, бутархайг урвуулсан.", "5 was divided by 2, so the fraction was inverted."],
        ["2.5%", "2.5%", "Тоологч, хуваарийг цэгээр залгасан.", "The numerator and denominator were joined with a decimal point."],
        ["20%", "20%", "2-ыг 10 дахин үржүүлээд хувилсан. Бүхэлд нь 0.4 биш.", "2 was multiplied by 10. That is not 2/5 of 100."],
      ]),
    ],
  ),
  topic(
    "cambridge-igcse-biology",
    "cambridge",
    "biology",
    ["Cambridge IGCSE Biology", "Cambridge IGCSE Biology"],
    ["Эс, фотосинтез, фермент", "Cells, photosynthesis, and enzymes"],
    ["0610 хөтөлбөрийн суурь ойлголт. Албан хуудас биш.", "Original practice on 0610 ideas. Not an official paper."],
    [
      ["Ургамлын эсэд хлоропласт бий. Амьтны эсийн энгийн бүтцэд байхгүй. Фотосинтез нүүрстөрөгчийн давхар исэл, ус, гэрлийг ашиглана.", "A plant cell has chloroplasts. A typical animal cell does not. Photosynthesis uses carbon dioxide, water, and light."],
      ["Фермент урвалыг хурдасгаж, өөрөө зарцуулагдахгүй. Диффуз нь өндөр концентрацаас бага руу, эрчим хүч зарцуулахгүй явагдана.", "An enzyme speeds a reaction and is not used up. Diffusion moves particles from high concentration to low concentration without energy from respiration."],
    ],
    [
      question("cb1", ["Which structure is found in a typical plant cell but not in a typical animal cell?", "Which structure is found in a typical plant cell but not in a typical animal cell?"], ["Хлоропласт ургамлын эсийн бүтэц.", "Chloroplasts belong to plant cells."], ["chloroplast", "chloroplast"], [
        ["nucleus", "nucleus", "Цөм хоёуланд нь бий.", "Both cell types have a nucleus."],
        ["cell membrane", "cell membrane", "Эсийн мембран хоёуланд нь бий.", "Both cell types have a cell membrane."],
        ["cytoplasm", "cytoplasm", "Цитоплазм хоёуланд нь бий.", "Both cell types have cytoplasm."],
      ]),
      question("cb2", ["Which pair are the reactants of photosynthesis?", "Which pair are the reactants of photosynthesis?"], ["Гэрлийн дор нүүрстөрөгчийн давхар исэл, ус урвалд орно.", "In the light, carbon dioxide and water are the reactants."], ["carbon dioxide and water", "carbon dioxide and water"], [
        ["oxygen and glucose", "oxygen and glucose", "Эдгээр нь бүтээгдэхүүн. Урвалд орох бодис биш.", "These are products, not the reactants."],
        ["nitrogen and water", "nitrogen and water", "Фотосинтезийн үндсэн урвалд азот ордоггүй.", "Nitrogen is not a reactant in the basic photosynthesis equation."],
        ["oxygen and water", "oxygen and water", "Хүчилтөрөгч бүтээгдэхүүн талдаа гардаг.", "Oxygen is released as a product."],
      ]),
      question("cb3", ["What does an enzyme do in a reaction?", "What does an enzyme do in a reaction?"], ["Фермент урвалыг хурдасгаж, өөрөө үлдэж, тодорхой субстратад таарна.", "An enzyme speeds the reaction, remains, and fits a specific substrate."], ["It speeds the reaction and is not used up", "It speeds the reaction and is not used up"], [
        ["It is used up as a reactant", "It is used up as a reactant", "Ферментийг урвалд орж дуусдаг бодис гэж үзсэн.", "The enzyme was treated as a reactant that gets used up."],
        ["It works equally at every temperature", "It works equally at every temperature", "Өндөр температурт идэвхтэй хэсгийн хэлбэр өөрчлөгдөнө.", "At a high temperature the active site changes shape."],
        ["It turns into the product", "It turns into the product", "Фермент бүтээгдэхүүн болон хувирдаггүй.", "The enzyme does not become the product."],
      ]),
      question("cb4", ["Which sentence describes diffusion?", "Which sentence describes diffusion?"], ["Бөөмс өндөр концентрацаас бага руу энерги зарцуулахгүйгээр тарна.", "Particles spread from high concentration to low concentration without energy from respiration."], ["Particles move from high to low concentration", "Particles move from high to low concentration"], [
        ["It happens only in plants", "It happens only in plants", "Диффуз зөвхөн ургамалд биш.", "Diffusion is not limited to plants."],
        ["It always uses energy from mitochondria", "It always uses energy from mitochondria", "Энерги зарцуулдаг нь идэвхтэй зөөвөрлөлт.", "Using energy from respiration is active transport."],
        ["Particles move from low to high concentration", "Particles move from low to high concentration", "Чиглэлийг эсрэгээр авсан.", "The direction was reversed."],
      ]),
      question("cb5", ["What is released when glucose is broken down in respiration?", "What is released when glucose is broken down in respiration?"], ["Амьсгалаар глюкозоос энерги чөлөөлөгдөнө.", "Respiration releases energy from glucose."], ["energy", "energy"], [
        ["chlorophyll", "chlorophyll", "Хлорофилл фотосинтезийн пигмент. Амьсгалын бүтээгдэхүүн биш.", "Chlorophyll is a photosynthesis pigment, not a product of respiration."],
        ["starch made directly by light", "starch made directly by light", "Гэрэл цардуулыг амьсгалаар үүсгэдэггүй.", "Light does not make starch through respiration."],
        ["only oxygen, with no energy", "only oxygen, with no energy", "Хүчилтөрөгч амьсгалын урвалд ордог. Энерги чөлөөлөгдөнө.", "Oxygen is used in aerobic respiration. Energy is released."],
      ]),
      question("cb6", ["Which organism is unicellular?", "Which organism is unicellular?"], ["Нэг эст бие. Бактер энэ бүлэгт орно.", "A unicellular organism is one cell. A bacterium is an example."], ["a bacterium", "a bacterium"], [
        ["a tree", "a tree", "Мод олон эст.", "A tree is multicellular."],
        ["a human", "a human", "Хүн олон эст.", "A human is multicellular."],
        ["a mushroom fruiting body", "a mushroom fruiting body", "Мөөгний малгай олон эст бүтэц.", "A mushroom fruiting body is a multicellular structure."],
      ]),
    ],
  ),
  topic(
    "cambridge-alevel-pure",
    "cambridge",
    "math",
    ["Cambridge International A Level Mathematics", "Cambridge International A Level Mathematics"],
    ["Pure Mathematics: уламжлал, шулуун", "Pure Mathematics: calculus and lines"],
    ["9709 Pure-ийн эхний сэдэв. Албан хуудас биш.", "Original practice on early 9709 Pure topics. Not an official paper."],
    [
      ["xⁿ-ийн уламжлал nxⁿ⁻¹. Интегралд тогтмол c нэмнэ. Градиент 2, (1, 3) цэгийг дайрсан шулууныг y − 3 = 2(x − 1) гэж олдог.", "The derivative of xⁿ is nxⁿ⁻¹. An integral includes a constant c. A line of gradient 2 through (1, 3) starts from y − 3 = 2(x − 1)."],
      ["D < 0 бол бодит язгуур байхгүй. C(5, 2) = 5×4 / 2 = 10.", "D < 0 means no real roots. C(5, 2) = 5×4 / 2 = 10."],
    ],
    [
      question("ca1", ["What is the derivative of x³?", "What is the derivative of x³?"], ["Зэрэг коэффициент болон бууж ирнэ: 3x².", "The power comes down as a coefficient: 3x²."], ["3x²", "3x²"], [
        ["x²", "x²", "Зэргийг бууруулсан ч коэффициентийг тавиагүй.", "The power was reduced, but the coefficient was left out."],
        ["3x³", "3x³", "Коэффициентийг тавьсан ч зэргийг бууруулаагүй.", "The coefficient was added, but the power was not reduced."],
        ["x⁴ / 4", "x⁴ / 4", "Уламжлалын оронд интеграл авсан.", "The integral was found instead of the derivative."],
      ]),
      question("ca2", ["A quadratic has a negative discriminant. What does that mean?", "A quadratic has a negative discriminant. What does that mean?"], ["D < 0 бол бодит язгуур байхгүй.", "D < 0 means there is no real root."], ["no real roots", "no real roots"], [
        ["two equal real roots", "two equal real roots", "Тэнцүү язгуур D = 0 үед гардаг.", "Equal real roots happen when D = 0."],
        ["two distinct real roots", "two distinct real roots", "Хоёр өөр бодит язгуур D > 0 үед гардаг.", "Two distinct real roots happen when D is positive."],
        ["the graph is a straight line", "the graph is a straight line", "Дискриминант параболын язгуурыг заана. Шулуун болгохгүй.", "The discriminant describes the roots of a parabola. It does not make the graph a line."],
      ]),
      question("ca3", ["A line has gradient 2 and passes through (1, 3). What is its equation?", "A line has gradient 2 and passes through (1, 3). What is its equation?"], ["y − 3 = 2(x − 1) тул y = 2x + 1.", "y − 3 = 2(x − 1), so y = 2x + 1."], ["y = 2x + 1", "y = 2x + 1"], [
        ["y = 2x + 3", "y = 2x + 3", "Цэгийн y-г огтлол гэж шууд тавьсан.", "The y-coordinate was used as the intercept without the gradient step."],
        ["y = x + 2", "y = x + 2", "Градиент 2-ыг тэгшитгэлд үлдэээгүй.", "The gradient 2 was not kept in the equation."],
        ["y = 2x − 1", "y = 2x − 1", "Огтлолын тэмдэг буруу. −2 + 3 = +1.", "The intercept sign is wrong. −2 + 3 = +1."],
      ]),
      question("ca4", ["What is the indefinite integral of 2x?", "What is the indefinite integral of 2x?"], ["∫2x dx = x² + c.", "∫2x dx = x² + c."], ["x² + c", "x² + c"], [
        ["x²", "x²", "Тогтмол c-г орхисон. Тодорхойгүй интегралд c хадгална.", "The constant c was omitted. An indefinite integral keeps c."],
        ["2x²", "2x²", "Коэффициентийг буруу үлдээсэн.", "The coefficient was not reduced correctly."],
        ["2", "2", "Уламжлал авсан. Интеграл биш.", "The derivative was found instead of the integral."],
      ]),
      question("ca5", ["What is C(5, 2)?", "What is C(5, 2)?"], ["5×4 / 2! = 10.", "5×4 / 2! = 10."], ["10", "10"], [
        ["20", "20", "2-т хуваахаа мартсан.", "The division by 2 was skipped."],
        ["25", "25", "5-ыг квадратласан.", "5 was squared."],
        ["5", "5", "n-ийг хариу гэж авсан.", "n was used as the combination."],
      ]),
      question("ca6", ["f(x) = x². What is f′(2)?", "f(x) = x². What is f′(2)?"], ["f′(x) = 2x. f′(2) = 4.", "f′(x) = 2x, so f′(2) = 4."], ["4", "4"], [
        ["2", "2", "x-ийн утгыг уламжлал гэж авсан.", "The x-value was used as the derivative."],
        ["8", "8", "2²-ыг 2-оор үржүүлсэн. Эхлээд уламжлал, дараа нь орлуулна.", "2² was multiplied by 2. Differentiate first, then substitute."],
        ["0", "0", "Квадрат функцийн уламжлалыг тэг гэж үзсэн.", "The derivative of a square was treated as zero."],
      ]),
    ],
  ),
  topic(
    "ib-math-aa",
    "international",
    "math",
    ["IB Diploma Mathematics AA SL", "IB Diploma Mathematics AA SL"],
    ["Дараалал, функц, логарифм", "Sequences, functions, and logarithms"],
    ["IB-ийн албан бодлого биш. AA SL-ийн сэдвийн дасгал.", "Original AA SL practice. Not an official IB question."],
    [
      ["Арифметик дарааллын ялгавар тогтмол. n-р гишүүн a + (n − 1)d.", "An arithmetic sequence has a constant difference. The nth term is a + (n − 1)d."],
      ["log₁₀1000 = 3, учир нь 10³ = 1000. Жилийн 5%-ийн нийлмэл хүүг хоёр жил (1.05)²-аар үржүүлнэ. sin 30° = 1/2.", "log₁₀1000 = 3 because 10³ = 1000. Two years of 5% compound growth multiply by (1.05)². sin 30° = 1/2."],
    ],
    [
      question("im1", ["The sequence is 3, 7, 11. What is the common difference?", "The sequence is 3, 7, 11. What is the common difference?"], ["7 − 3 = 4. 11 − 7 = 4.", "7 − 3 = 4 and 11 − 7 = 4."], ["4", "4"], [
        ["3", "3", "Эхний гишүүнийг ялгавар гэж авсан.", "The first term was used as the difference."],
        ["7", "7", "Хоёр дахь гишүүнийг ялгавар гэж авсан.", "The second term was used as the difference."],
        ["21", "21", "Гишүүдийг нэмсэн. Ялгавар нь зөрүү.", "The terms were added. The difference is a subtraction."],
      ]),
      question("im2", ["The sequence is 3, 7, 11. What is the 5th term?", "The sequence is 3, 7, 11. What is the 5th term?"], ["3 + 4×4 = 19.", "3 + 4×4 = 19."], ["19", "19"], [
        ["15", "15", "Дөрвөн алхам биш, гурван алхам нэмсэн.", "Three steps were added instead of four."],
        ["23", "23", "Таван удаа 4 нэмсэн. Эхний гишүүн дээр дөрвөн алхам нэмнэ.", "4 was added five times. From the first term there are four steps."],
        ["11", "11", "Гурав дахь гишүүн дээр зогссон.", "The third term was left as the answer."],
      ]),
      question("im3", ["f(x) = 2x + 1. What is f(3)?", "f(x) = 2x + 1. What is f(3)?"], ["2×3 + 1 = 7.", "2×3 + 1 = 7."], ["7", "7"], [
        ["6", "6", "2×3 дээр +1-ийг мартсан.", "2×3 was found and the +1 was skipped."],
        ["5", "5", "3 + 2 гэж нэмсэн.", "3 and 2 were added."],
        ["8", "8", "3×2 + 2 гэж илүү коэффициент оруулсан.", "An extra factor was included."],
      ]),
      question("im4", ["What is log₁₀ 1000?", "What is log₁₀ 1000?"], ["10³ = 1000 тул логарифм 3.", "10³ = 1000, so the logarithm is 3."], ["3", "3"], [
        ["1000", "1000", "Аргументыг хариу гэж авсан.", "The argument was used as the value."],
        ["10", "10", "Суурийг хариу гэж авсан.", "The base was used as the value."],
        ["2", "2", "100-ийн логарифмтай хольсон. log₁₀100 = 2.", "This was mixed up with log₁₀100, which is 2."],
      ]),
      question("im5", ["$1000 grows at 5% compound interest per year. What is the amount after 2 years?", "$1000 grows at 5% compound interest per year. What is the amount after 2 years?"], ["1000 × 1.05² = 1102.5.", "1000 × 1.05² = 1102.5."], ["$1102.50", "$1102.50"], [
        ["$1100", "$1100", "Энгийн хүүгээр 50-ийг хоёр дахин нэмсэн. Нийлмэл хүү хоёр дахь жилдээ 1050 дээрээ тооцогдоно.", "Simple interest added $50 twice. Compound interest applies the second year to 1050."],
        ["$1050", "$1050", "Нэг л жил бодсон.", "Only one year was applied."],
        ["$1000", "$1000", "Хүүг нэмээгүй.", "The interest was not added."],
      ]),
      question("im6", ["What is sin 30°?", "What is sin 30°?"], ["sin 30° = 1/2.", "sin 30° = 1/2."], ["1/2", "1/2"], [
        ["√3 / 2", "√3 / 2", "sin 60° буюу cos 30°-ийн утгыг авсан.", "The value of sin 60°, which is also cos 30°, was used."],
        ["1", "1", "sin 90°-ийн утгыг авсан.", "The value of sin 90° was used."],
        ["0", "0", "sin 0°-ийн утгыг авсан.", "The value of sin 0° was used."],
      ]),
    ],
  ),
  topic(
    "ib-biology",
    "international",
    "biology",
    ["IB Diploma Biology", "IB Diploma Biology"],
    ["Ус, осмос, ДНХ", "Water, osmosis, and DNA"],
    ["IB Biology-ийн албан бодлого биш. Сэдвийн дасгал.", "Original topic practice. Not an official IB question."],
    [
      ["Ус туйлт молекул. Устөрөгчийн холбоо барьцалдал, өндөр хувийн дулаан багтаамжийг тайлбарлана. Мөс шингэн уснаас сийрэг тул хөвдөг.", "Water is polar. Hydrogen bonds explain cohesion and a high specific heat capacity. Ice is less dense than liquid water, so it floats."],
      ["Осмос нь ус хагас нэвчүүлэгч мембранаар өндөр усны потенциалаас бага руу шилжинэ. ДНХ-д A-T, C-G хослоно. Митоз генетикийн хувьд ижил хоёр цөм үүсгэнэ.", "Osmosis is water moving through a partially permeable membrane from higher to lower water potential. DNA pairs A-T and C-G. Mitosis produces two genetically identical nuclei."],
    ],
    [
      question("ib1", ["Which property of water comes from hydrogen bonding?", "Which property of water comes from hydrogen bonding?"], ["Устөрөгчийн холбоо барьцалдал, өндөр хувийн дулаан багтаамжийг өгнө.", "Hydrogen bonds give cohesion and a high specific heat capacity."], ["cohesion and a high specific heat capacity", "cohesion and a high specific heat capacity"], [
        ["water is nonpolar", "water is nonpolar", "Ус туйлт. Туйлын бус гэж үзсэн нь холбоог үгүйсгэнэ.", "Water is polar. Calling it nonpolar denies the bonds."],
        ["water cannot dissolve glucose", "water cannot dissolve glucose", "Туйлт ус глюкозыг уусгаж чадна.", "Polar water can dissolve glucose."],
        ["ice is denser than liquid water", "ice is denser than liquid water", "Мөс шингэн уснаас сийрэг. Тиймээс хөвдөг.", "Ice is less dense than liquid water, which is why it floats."],
      ]),
      question("ib2", ["Which sentence describes osmosis?", "Which sentence describes osmosis?"], ["Ус хагас нэвчүүлэгч мембранаар өндөр усны потенциалаас бага руу орно.", "Water crosses a partially permeable membrane from higher water potential to lower water potential."], ["Water crosses a partially permeable membrane toward lower water potential", "Water crosses a partially permeable membrane toward lower water potential"], [
        ["Any solute is pumped by active transport", "Any solute is pumped by active transport", "Идэвхтэй зөөвөрлөлтийг осмос гэж нэрлэсэн.", "Active transport was given the name osmosis."],
        ["Water moves toward higher water potential", "Water moves toward higher water potential", "Усны потенциалын чиглэлийг эсрэгээр авсан.", "The water-potential direction was reversed."],
        ["It always needs ATP", "It always needs ATP", "Осмос ATP зарцуулдаггүй.", "Osmosis does not require ATP."],
      ]),
      question("ib3", ["Which base pairs are correct in DNA?", "Which base pairs are correct in DNA?"], ["Аденин тиминтэй, цитозин гуанинтай хослоно.", "Adenine pairs with thymine, and cytosine pairs with guanine."], ["A–T and C–G", "A–T and C–G"], [
        ["A–G and C–T", "A–G and C–T", "Пуринүүдийг хооронд нь хослуулсан.", "The two purines were paired with each other."],
        ["A–C and T–G", "A–C and T–G", "Хосын дүрмийг эсрэгээр сольсон.", "The pairing rule was swapped."],
        ["A–A and G–G", "A–A and G–G", "Ижил суурийг хослуулсан.", "Each base was paired with itself."],
      ]),
      question("ib4", ["Which structure is absent from a typical prokaryotic cell?", "Which structure is absent from a typical prokaryotic cell?"], ["Прокариот эс цөмгүй.", "A typical prokaryotic cell has no nucleus."], ["a nucleus", "a nucleus"], [
        ["a cell membrane", "a cell membrane", "Мембран прокариот эсэд бий.", "A prokaryotic cell has a cell membrane."],
        ["a ribosome", "a ribosome", "Рибосом прокариот эсэд бий.", "A prokaryotic cell has ribosomes."],
        ["cytoplasm", "cytoplasm", "Цитоплазм прокариот эсэд бий.", "A prokaryotic cell has cytoplasm."],
      ]),
      question("ib5", ["What happens when an enzyme is denatured by high temperature?", "What happens when an enzyme is denatured by high temperature?"], ["Идэвхтэй хэсгийн хэлбэр өөрчлөгдөж, субстрат тохирохоо болино.", "The active site changes shape, so the substrate no longer fits."], ["The active site changes shape", "The active site changes shape"], [
        ["The enzyme becomes a carbohydrate", "The enzyme becomes a carbohydrate", "Денатураци ферментийг нүүрс ус болгодоггүй.", "Denaturation does not turn an enzyme into a carbohydrate."],
        ["The reaction keeps getting faster", "The reaction keeps getting faster", "Хэлбэр алдагдсаны дараа урвал хурдсахгүй.", "After the shape is lost, the reaction does not keep speeding up."],
        ["Only the substrate melts and the enzyme is unchanged", "Only the substrate melts and the enzyme is unchanged", "Өндөр температур ферментийн хэлбэрт нөлөөлнө.", "High temperature changes the enzyme, not only the substrate."],
      ]),
      question("ib6", ["What does mitosis produce?", "What does mitosis produce?"], ["Митоз генетикийн хувьд ижил хоёр цөм үүсгэнэ.", "Mitosis produces two genetically identical nuclei."], ["two genetically identical nuclei", "two genetically identical nuclei"], [
        ["four haploid gametes", "four haploid gametes", "Дөрвөн гаплоид эс мейозын үр дүн.", "Four haploid cells are the result of meiosis."],
        ["one nucleus with twice the chromosome number kept", "one nucleus with twice the chromosome number kept", "Хромосомын тоо хуваагдсаны дараа эх эстэйгээ адил түвшинд үлдэнэ.", "After division the chromosome number matches the parent cell. It is not kept doubled."],
        ["pollen only", "pollen only", "Митоз зөвхөн тоос үүсгэдэггүй.", "Mitosis is not limited to making pollen."],
      ]),
    ],
  ),
  topic(
    "ib-english-b",
    "international",
    "english",
    ["IB Diploma English B", "IB Diploma English B"],
    ["Text type ба холбоос", "Text types and connectors"],
    ["English B-ийн текст, уншигч, албан захидал. Албан бодлого биш.", "Text type, audience, and a formal letter. Not an official IB task."],
    [
      ["However эсрэгцүүлэлт заана. Because шалтгаан, for example жишээ, and нэмэлт.", "However signals contrast. Because signals a reason, for example signals an example, and and adds information."],
      ["Нэр мэдэгдэж байвал Yours sincerely гэж хаана. Yours faithfully нь нэрийг мэдэхгүй Dear Sir or Madam дээр хэрэглэнэ.", "Close with Yours sincerely when the name is known. Yours faithfully follows Dear Sir or Madam, when the name is not known."],
    ],
    [
      question("ie1", ["What relation does “however” signal?", "What relation does “however” signal?"], ["However эсрэг санааг залгана.", "However joins a contrasting idea."], ["contrast", "contrast"], [
        ["addition", "addition", "Нэмэхийг and, also заана.", "Addition is signalled by and or also."],
        ["reason", "reason", "Шалтгааныг because, since заана.", "A reason is signalled by because or since."],
        ["example", "example", "Жишээг for example заана.", "An example is signalled by for example."],
      ]),
      question("ie2", ["What is a blog most likely written to do?", "What is a blog most likely written to do?"], ["Блог уншигчдад хуваалцсан, ихэвчлэн ярианы өнгөтэй бичвэр.", "A blog shares a post with readers, often in a personal tone."], ["share a post with public readers", "share a post with public readers"], [
        ["act as a legal contract", "act as a legal contract", "Гэрээний нөхцөлийг блог гэж андуурсан.", "A contract's job was given to a blog."],
        ["replace an exam certificate", "replace an exam certificate", "Сертификат албан баримт. Блог биш.", "A certificate is an official record, not a blog."],
        ["list only laboratory steps", "list only laboratory steps", "Лабораторийн алхам тайлан, протоколын хэлбэр.", "Laboratory steps belong to a method or report."],
      ]),
      question("ie3", ["Which opening best fits a speech to an audience?", "Which opening best fits a speech to an audience?"], ["Үзэгчдээ шууд хандана.", "A speech addresses the listeners directly."], ["Good morning, everyone.", "Good morning, everyone."], [
        ["Once upon a time", "Once upon a time", "Энэ үлгэрийн эхлэл.", "This opening starts a story."],
        ["References", "References", "Энэ ном зүйн гарчиг.", "This is a bibliography heading."],
        ["Figure 1 shows", "Figure 1 shows", "Энэ тайлангийн зургийн тайлбар.", "This points to a figure in a report."],
      ]),
      question("ie4", ["A letter begins “Dear Ms. Ortega,”. Which closing is conventional?", "A letter begins “Dear Ms. Ortega,”. Which closing is conventional?"], ["Нэр мэдэгдэж байвал Yours sincerely.", "When the name is known, the conventional close is Yours sincerely."], ["Yours sincerely", "Yours sincerely"], [
        ["Yours faithfully", "Yours faithfully", "Faithfully-г нэр мэдэхгүй үед хэрэглэнэ.", "Faithfully is used when the recipient's name is not known."],
        ["Bye", "Bye", "Албан захидлын хаалт биш.", "This is not a formal letter closing."],
        ["Love", "Love", "Хувийн захидлын хаалт. Энэ хаяглалтад таарахгүй.", "This is a personal closing and does not match this greeting."],
      ]),
      question("ie5", ["Which sentence is an opinion?", "Which sentence is an opinion?"], ["Best гэдэг үнэлгээ. Баримт биш.", "Best is a judgement, not a checkable fact."], ["The park is the best place in the city.", "The park is the best place in the city."], [
        ["The park opened in 2014.", "The park opened in 2014.", "Он сар баримт байж болно. Үнэлгээ биш.", "A year can be checked. It is not a judgement."],
        ["The park has 40 trees.", "The park has 40 trees.", "Тоо баримт.", "A count is a fact."],
        ["The park is on Main Street.", "The park is on Main Street.", "Байршил баримт.", "A location is a fact."],
      ]),
      question("ie6", ["Who is the audience of a tourist brochure?", "Who is the audience of a tourist brochure?"], ["Аялагч, зочлохоор сонирхож буй уншигч.", "The readers are visitors who may travel there."], ["people who may visit the place", "people who may visit the place"], [
        ["only the writer's private diary", "only the writer's private diary", "Өдрийн тэмдэглэл өөр текст. Зар сурталчилгааны уншигч биш.", "A diary is a different text type and a different audience."],
        ["a teacher marking a chemistry lab", "a teacher marking a chemistry lab", "Лабораторийн үнэлгээ энэ текстийн зорилго биш.", "Marking a lab is not the purpose of a tourist brochure."],
        ["a computer compiler", "a computer compiler", "Хөрвүүлэгч уншигч биш.", "A compiler is not the audience."],
      ]),
    ],
  ),
];

export function getSchoolTopic(slug: string) {
  return schoolTopics.find((item) => item.slug === slug);
}

export function choiceLabel(index: number) {
  return String.fromCharCode(65 + index);
}

function shuffle<T>(items: T[], random: () => number) {
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    const current = copy[index];
    copy[index] = copy[swap];
    copy[swap] = current;
  }
  return copy;
}

export function drawSchoolAttempt(
  topic: SchoolTopic,
  avoid: string[] = [],
  random: () => number = Math.random,
): SchoolQuestion[] {
  const count = Math.min(topic.perAttempt, topic.questions.length);
  const fresh = topic.questions.filter((item) => !avoid.includes(item.id));
  const used = topic.questions.filter((item) => avoid.includes(item.id));
  const ordered = fresh.length >= count ? shuffle(fresh, random) : [...shuffle(fresh, random), ...shuffle(used, random)];
  return ordered.slice(0, count).map((item) => shuffleChoices(item, random));
}

function shuffleChoices(item: SchoolQuestion, random: () => number): SchoolQuestion {
  const paired = item.choices.map((choice, index) => ({ choice, correct: index === item.answer }));
  const mixed = shuffle(paired, random);
  return {
    ...item,
    choices: mixed.map((entry) => entry.choice),
    answer: mixed.findIndex((entry) => entry.correct),
  };
}

export type CustomDraft = {
  band: SchoolBand;
  subject: string;
  grades: string;
  title: string;
  lesson: string;
  questions: Array<{
    prompt: string;
    rule: string;
    choices: Array<{ text: string; why: string }>;
    answer: number;
  }>;
};

export type CustomError = "subject" | "grades" | "title" | "lesson" | "questions" | "prompt" | "rule" | "choice" | "why" | "answer";

export function buildCustomTopic(draft: CustomDraft, now = Date.now()): { ok: true; topic: SchoolTopic } | { ok: false; error: CustomError } {
  const subject = draft.subject.trim();
  const grades = draft.grades.trim();
  const title = draft.title.trim();
  const lesson = draft.lesson
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!subject) return { ok: false, error: "subject" };
  if (!grades) return { ok: false, error: "grades" };
  if (!title) return { ok: false, error: "title" };
  if (lesson.length === 0) return { ok: false, error: "lesson" };
  if (draft.questions.length < 2) return { ok: false, error: "questions" };

  const slug = `custom-${now}`;
  const questions: SchoolQuestion[] = [];
  for (let index = 0; index < draft.questions.length; index += 1) {
    const item = draft.questions[index];
    const prompt = item.prompt.trim();
    const rule = item.rule.trim();
    if (!prompt) return { ok: false, error: "prompt" };
    if (!rule) return { ok: false, error: "rule" };
    if (!Number.isInteger(item.answer) || item.answer < 0 || item.answer >= item.choices.length) return { ok: false, error: "answer" };
    const filled = item.choices
      .map((choice, choiceIndex) => ({ text: choice.text.trim(), why: choice.why.trim(), choiceIndex }))
      .filter((choice) => choice.text);
    const answer = filled.findIndex((choice) => choice.choiceIndex === item.answer);
    if (filled.length < 2) return { ok: false, error: "choice" };
    if (answer < 0) return { ok: false, error: "answer" };
    if (filled.some((choice, choiceIndex) => choiceIndex !== answer && !choice.why)) return { ok: false, error: "why" };
    questions.push({
      id: `${slug}-q${index + 1}`,
      prompt: pair(prompt, prompt),
      rule: pair(rule, rule),
      answer,
      choices: filled.map((choice, choiceIndex) =>
        choiceIndex === answer ? pair(choice.text, choice.text) : { ...pair(choice.text, choice.text), why: pair(choice.why, choice.why) },
      ),
    });
  }

  return {
    ok: true,
    topic: {
      slug,
      band: draft.band,
      subject,
      grades: pair(grades, grades),
      title: pair(title, title),
      summary: pair(lesson[0], lesson[0]),
      lesson: lesson.map((line) => pair(line, line)),
      perAttempt: questions.length > 4 ? 4 : questions.length,
      questions,
      custom: true,
    },
  };
}

export function readCustomTopics(value: unknown): SchoolTopic[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isSchoolTopic);
}

function isSchoolTopic(value: unknown): value is SchoolTopic {
  if (!value || typeof value !== "object") return false;
  const topic = value as SchoolTopic;
  return schoolBands.includes(topic.band)
    && typeof topic.slug === "string"
    && typeof topic.subject === "string"
    && topic.custom === true
    && Array.isArray(topic.questions)
    && topic.questions.length >= 2
    && topic.questions.every((item) => item.answer >= 0 && item.answer < item.choices.length);
}
