type Locale = "mn" | "en";

export type ExamKind = "kids" | "eesh" | "olympiad";

export type ExamChoice = { mn: string; en: string };

export type ExamQuestion = {
  id: string;
  prompt: { mn: string; en: string };
  choices: ExamChoice[];
  answer: number;
  explain: { mn: string; en: string };
};

export type PracticeExam = {
  slug: string;
  kind: ExamKind;
  perAttempt: number;
  title: { mn: string; en: string };
  summary: { mn: string; en: string };
  age: { mn: string; en: string };
  questions: ExamQuestion[];
};

export type DrawnQuestion = ExamQuestion;

function q(
  id: string,
  prompt: { mn: string; en: string },
  choices: ExamChoice[],
  answer: number,
  explain: { mn: string; en: string },
): ExamQuestion {
  return { id, prompt, choices, answer, explain };
}

const kids: ExamQuestion[] = [
  q("k1", { mn: "1000 төгрөгөөр 350 төгрөгийн дэвтэр авбал буцаалт хэд вэ?", en: "A notebook costs 350 tögrög. You pay with 1000. What is the change?" }, [
    { mn: "550", en: "550" }, { mn: "650", en: "650" }, { mn: "750", en: "750" }, { mn: "350", en: "350" },
  ], 1, { mn: "1000 − 350 = 650.", en: "1000 − 350 = 650." }),
  q("k2", { mn: "Одоо 7:45. Хичээл 8:00-д орно. Хэдэн минут үлдсэн бэ?", en: "It is 7:45. Class starts at 8:00. How many minutes are left?" }, [
    { mn: "10", en: "10" }, { mn: "15", en: "15" }, { mn: "25", en: "25" }, { mn: "45", en: "45" },
  ], 1, { mn: "8:00 хүртэл 15 минут.", en: "Fifteen minutes remain until 8:00." }),
  q("k3", { mn: "Гудамж хэрхэн гарах вэ?", en: "How should you cross a street?" }, [
    { mn: "Ногоон гэрлээр, хоёр тийшээ харж", en: "On a green light, after looking both ways" },
    { mn: "Машин ойрхон байсан ч гүйж", en: "Run even if a car is close" },
    { mn: "Утас ширтэнгээ", en: "While staring at a phone" },
    { mn: "Хаана ч хамаагүй", en: "Anywhere, without looking" },
  ], 0, { mn: "Гэрлээ харж, хоёр тийшээ шалгана.", en: "Use the signal and check both ways." }),
  q("k4", { mn: "8-ийн 1/2 хэд вэ?", en: "What is 1/2 of 8?" }, [
    { mn: "2", en: "2" }, { mn: "3", en: "3" }, { mn: "4", en: "4" }, { mn: "6", en: "6" },
  ], 2, { mn: "8-ийг 2-т хуваавал 4.", en: "Half of 8 is 4." }),
  q("k5", { mn: "Улаанбаатар Монгол Улсын юу вэ?", en: "What is Ulaanbaatar in Mongolia?" }, [
    { mn: "Аймаг", en: "An aimag only" }, { mn: "Нийслэл", en: "The capital" }, { mn: "Сум", en: "A soum" }, { mn: "Хил", en: "A border post" },
  ], 1, { mn: "Улаанбаатар бол нийслэл.", en: "Ulaanbaatar is the capital." }),
  q("k6", { mn: "3 × 8 хэд вэ?", en: "What is 3 × 8?" }, [
    { mn: "18", en: "18" }, { mn: "21", en: "21" }, { mn: "24", en: "24" }, { mn: "32", en: "32" },
  ], 2, { mn: "3 × 8 = 24.", en: "3 × 8 = 24." }),
  q("k7", { mn: "1 килограмм хэдэн грамм бэ?", en: "How many grams are in 1 kilogram?" }, [
    { mn: "100", en: "100" }, { mn: "500", en: "500" }, { mn: "1000", en: "1000" }, { mn: "10000", en: "10000" },
  ], 2, { mn: "1 кг = 1000 г.", en: "1 kg = 1000 g." }),
  q("k8", { mn: "20 сурагчийн 50% хэд вэ?", en: "What is 50% of 20 students?" }, [
    { mn: "5", en: "5" }, { mn: "10", en: "10" }, { mn: "15", en: "15" }, { mn: "20", en: "20" },
  ], 1, { mn: "Хагас нь 10.", en: "Half of 20 is 10." }),
  q("k9", { mn: "«Би ном уншина.» Өгүүлбэрийн үйл үг аль нь вэ?", en: "In “Би ном уншина,” which word is the verb?" }, [
    { mn: "Би", en: "Би" }, { mn: "ном", en: "ном" }, { mn: "уншина", en: "уншина" }, { mn: "Би ном", en: "Би ном" },
  ], 2, { mn: "Үйл үг нь уншина.", en: "The verb is уншина." }),
  q("k10", { mn: "2 цаг 30 минут хэдэн минут бэ?", en: "How many minutes are in 2 hours 30 minutes?" }, [
    { mn: "90", en: "90" }, { mn: "120", en: "120" }, { mn: "150", en: "150" }, { mn: "230", en: "230" },
  ], 2, { mn: "2 × 60 + 30 = 150.", en: "2 × 60 + 30 = 150." }),
  q("k11", { mn: "Найзынхаа нууц үгийг өөр хүнд хэлэх үү?", en: "Should you tell a friend’s password to someone else?" }, [
    { mn: "Үгүй", en: "No" }, { mn: "Ангид хэлж болно", en: "Yes, to the class" }, { mn: "Зурган дээр тавина", en: "Post it in a photo" }, { mn: "Тоглоомонд өгнө", en: "Give it to a game" },
  ], 0, { mn: "Нууц үгээ хэнтэй ч хуваалцахгүй.", en: "A password stays private." }),
  q("k12", { mn: "Галын дохио дуугарахад эхний алхам аль вэ?", en: "The alarm rings. What is the first step?" }, [
    { mn: "Цүнхээ удаан базаах", en: "Spend time packing a bag" },
    { mn: "Багшийн заавраар гарц руу явах", en: "Follow the teacher to the exit" },
    { mn: "Лифтэнд орох", en: "Take the elevator" },
    { mn: "Ангидаа үлдэх", en: "Stay in the classroom" },
  ], 1, { mn: "Заавраар гарц руу гарна. Лифт хэрэглэхгүй.", en: "Leave by the stairs with the teacher. Do not use the elevator." }),
];

const eeshMath: ExamQuestion[] = [
  q("m1", { mn: "2/3 + 1/6 = ?", en: "2/3 + 1/6 = ?" }, [
    { mn: "1/2", en: "1/2" }, { mn: "3/6", en: "3/6" }, { mn: "5/6", en: "5/6" }, { mn: "1", en: "1" }, { mn: "2/9", en: "2/9" },
  ], 2, { mn: "2/3 = 4/6. 4/6 + 1/6 = 5/6.", en: "2/3 = 4/6, so the sum is 5/6." }),
  q("m2", { mn: "x + 3 = 10 бол x хэд вэ?", en: "If x + 3 = 10, what is x?" }, [
    { mn: "3", en: "3" }, { mn: "6", en: "6" }, { mn: "7", en: "7" }, { mn: "13", en: "13" }, { mn: "30", en: "30" },
  ], 2, { mn: "x = 10 − 3 = 7.", en: "x = 10 − 3 = 7." }),
  q("m3", { mn: "Урт 6, өргөн 4 тэгш өнцөгтийн талбай хэд вэ?", en: "A rectangle is 6 by 4. What is its area?" }, [
    { mn: "10", en: "10" }, { mn: "20", en: "20" }, { mn: "24", en: "24" }, { mn: "48", en: "48" }, { mn: "64", en: "64" },
  ], 2, { mn: "Талбай = 6 × 4 = 24.", en: "Area = 6 × 4 = 24." }),
  q("m4", { mn: "200-ийн 15% хэд вэ?", en: "What is 15% of 200?" }, [
    { mn: "15", en: "15" }, { mn: "20", en: "20" }, { mn: "30", en: "30" }, { mn: "45", en: "45" }, { mn: "150", en: "150" },
  ], 2, { mn: "200 × 0.15 = 30.", en: "200 × 0.15 = 30." }),
  q("m5", { mn: "2⁵ хэд вэ?", en: "What is 2⁵?" }, [
    { mn: "10", en: "10" }, { mn: "16", en: "16" }, { mn: "25", en: "25" }, { mn: "32", en: "32" }, { mn: "64", en: "64" },
  ], 3, { mn: "2 × 2 × 2 × 2 × 2 = 32.", en: "2 × 2 × 2 × 2 × 2 = 32." }),
  q("m6", { mn: "4, 6, 8 тоонуудын дундаж хэд вэ?", en: "What is the mean of 4, 6, and 8?" }, [
    { mn: "4", en: "4" }, { mn: "6", en: "6" }, { mn: "8", en: "8" }, { mn: "18", en: "18" }, { mn: "9", en: "9" },
  ], 1, { mn: "(4 + 6 + 8) / 3 = 6.", en: "(4 + 6 + 8) / 3 = 6." }),
  q("m7", { mn: "3(x − 2) = 9 бол x хэд вэ?", en: "If 3(x − 2) = 9, what is x?" }, [
    { mn: "2", en: "2" }, { mn: "3", en: "3" }, { mn: "5", en: "5" }, { mn: "9", en: "9" }, { mn: "11", en: "11" },
  ], 2, { mn: "x − 2 = 3, тэгэхээр x = 5.", en: "x − 2 = 3, so x = 5." }),
  q("m8", { mn: "Тал нь 5 нэгж квадратын периметр хэд вэ?", en: "A square has sides of 5. What is its perimeter?" }, [
    { mn: "10", en: "10" }, { mn: "15", en: "15" }, { mn: "20", en: "20" }, { mn: "25", en: "25" }, { mn: "5", en: "5" },
  ], 2, { mn: "4 × 5 = 20.", en: "4 × 5 = 20." }),
  q("m9", { mn: "0.25 бутархайгаар аль вэ?", en: "Which fraction equals 0.25?" }, [
    { mn: "1/2", en: "1/2" }, { mn: "1/4", en: "1/4" }, { mn: "2/5", en: "2/5" }, { mn: "1/5", en: "1/5" }, { mn: "3/4", en: "3/4" },
  ], 1, { mn: "0.25 = 1/4.", en: "0.25 = 1/4." }),
  q("m10", { mn: "7 × 8 − 6 хэд вэ?", en: "What is 7 × 8 − 6?" }, [
    { mn: "50", en: "50" }, { mn: "48", en: "48" }, { mn: "56", en: "56" }, { mn: "42", en: "42" }, { mn: "62", en: "62" },
  ], 0, { mn: "56 − 6 = 50.", en: "56 − 6 = 50." }),
  q("m11", { mn: "Гурвалжны дотоод өнцгийн нийлбэр хэд вэ?", en: "What is the sum of the interior angles of a triangle?" }, [
    { mn: "90°", en: "90°" }, { mn: "120°", en: "120°" }, { mn: "180°", en: "180°" }, { mn: "270°", en: "270°" }, { mn: "360°", en: "360°" },
  ], 2, { mn: "Гурвалжны өнцгийн нийлбэр 180°.", en: "The angles of a triangle add up to 180°." }),
  q("m12", { mn: "1/2 × 3/4 хэд вэ?", en: "What is 1/2 × 3/4?" }, [
    { mn: "3/8", en: "3/8" }, { mn: "4/6", en: "4/6" }, { mn: "3/4", en: "3/4" }, { mn: "2/3", en: "2/3" }, { mn: "1/4", en: "1/4" },
  ], 0, { mn: "Тооцогч 1×3, хуваарь 2×4. 3/8.", en: "Multiply the tops and the bottoms: 3/8." }),
];

const eeshLanguage: ExamQuestion[] = [
  q("l1", { mn: "Аль үг зөв бичигдсэн бэ?", en: "Which spelling is correct?" }, [
    { mn: "модний", en: "модний" }, { mn: "модны", en: "модны" }, { mn: "моднии", en: "моднии" }, { mn: "модьны", en: "модьны" },
  ], 1, { mn: "Харьяалах нь модны.", en: "The genitive is модны." }),
  q("l2", { mn: "«Сурагч номоо нээв.» Өгүүлэгдэхүүн аль үг вэ?", en: "In “Сурагч номоо нээв,” which word is the subject?" }, [
    { mn: "Сурагч", en: "Сурагч" }, { mn: "номоо", en: "номоо" }, { mn: "нээв", en: "нээв" }, { mn: "номоо нээв", en: "номоо нээв" },
  ], 0, { mn: "Хэн нээсэн бэ гэвэл сурагч.", en: "The one who opened the book is сурагч." }),
  q("l3", { mn: "Аль өгүүлбэр зөв бэ?", en: "Which sentence is correct?" }, [
    { mn: "Би сургууль явна.", en: "Би сургууль явна." },
    { mn: "Би сургуульдаа явна.", en: "Би сургуульдаа явна." },
    { mn: "Би сургуульруу явна.", en: "Би сургуульруу явна." },
    { mn: "Би сургуультай явна.", en: "Би сургуультай явна." },
  ], 1, { mn: "Чиглэлд -даа нөхцөлтэй: сургуульдаа.", en: "The direction uses -даа: сургуульдаа." }),
  q("l4", { mn: "«Унших» үгийн хэвийн нэр хэлбэр аль вэ?", en: "Which is the dictionary form of the verb “to read”?" }, [
    { mn: "уншина", en: "уншина" }, { mn: "уншсан", en: "уншсан" }, { mn: "унших", en: "унших" }, { mn: "уншаарай", en: "уншаарай" },
  ], 2, { mn: "Толь бичгийн хэлбэр нь унших.", en: "The citation form is унших." }),
  q("l5", { mn: "Аль нь асуух өгүүлбэр вэ?", en: "Which sentence is a question?" }, [
    { mn: "Өнөөдөр хичээлтэй.", en: "Өнөөдөр хичээлтэй." },
    { mn: "Номоо нээ.", en: "Номоо нээ." },
    { mn: "Чи хичээлээ хийсэн үү?", en: "Чи хичээлээ хийсэн үү?" },
    { mn: "Сайхан өдөр.", en: "Сайхан өдөр." },
  ], 2, { mn: "«үү» асуух нөхцөлтэй.", en: "The particle үү marks the question." }),
  q("l6", { mn: "«Номын сан» гэсэн холбоо үгийн утга аль вэ?", en: "What does номын сан mean?" }, [
    { mn: "Ном зардаг дэлгүүр", en: "A shop that only sells books" },
    { mn: "Ном унших, хадгалах газар", en: "A place that keeps books for reading" },
    { mn: "Зөвхөн дэвтэр", en: "Only notebooks" },
    { mn: "Ангийн самбар", en: "The classroom board" },
  ], 1, { mn: "Номын сан бол ном хадгалж, уншдаг газар.", en: "A library keeps books for reading." }),
  q("l7", { mn: "Аль үг үйл үг вэ?", en: "Which word is a verb?" }, [
    { mn: "ногоон", en: "ногоон" }, { mn: "ширээ", en: "ширээ" }, { mn: "бичив", en: "бичив" }, { mn: "гурав", en: "гурав" },
  ], 2, { mn: "бичив нь үйл үг.", en: "бичив is a verb." }),
  q("l8", { mn: "«Их»-ийн эсрэг утга аль вэ?", en: "Which is the opposite of их?" }, [
    { mn: "том", en: "том" }, { mn: "бага", en: "бага" }, { mn: "өндөр", en: "өндөр" }, { mn: "олон", en: "олон" },
  ], 1, { mn: "Их ↔ бага.", en: "Их is opposite to бага." }),
  q("l9", { mn: "Цэг хаана хэрэгтэй вэ?", en: "Which sentence needs a full stop at the end?" }, [
    { mn: "Чи ирэх үү", en: "Чи ирэх үү" },
    { mn: "Өнөөдөр даваа гараг", en: "Өнөөдөр даваа гараг" },
    { mn: "Номоо нээ", en: "Номоо нээ" },
    { mn: "Ямар өдөр вэ", en: "Ямар өдөр вэ" },
  ], 1, { mn: "Хэлэх өгүүлбэр цэгээр хаагдана. Асуух нь асуултын тэмдэг, тушаах нь анхаарлын тэмдэг авч болно.", en: "A statement ends with a full stop." }),
  q("l10", { mn: "Аль мөрөнд үг давхардаагүй, зөв үгсэн бэ?", en: "Which line is a correct, unduplicated phrase?" }, [
    { mn: "миний миний дэвтэр", en: "миний миний дэвтэр" },
    { mn: "миний дэвтэр", en: "миний дэвтэр" },
    { mn: "дэвтэр миний миний", en: "дэвтэр миний миний" },
    { mn: "миний дэвтэр дэвтэр", en: "миний дэвтэр дэвтэр" },
  ], 1, { mn: "Нэг эзэмшигч, нэг нэр: миний дэвтэр.", en: "One owner, one noun: миний дэвтэр." }),
  q("l11", { mn: "«Багш самбар дээр бичив.» Юун дээр бичсэн бэ?", en: "In “Багш самбар дээр бичив,” where did the writing happen?" }, [
    { mn: "Дэвтэр дээр", en: "In a notebook" }, { mn: "Самбар дээр", en: "On the board" }, { mn: "Ханан дээр", en: "On the wall" }, { mn: "Газар дээр", en: "On the ground" },
  ], 1, { mn: "Газар нь самбар.", en: "The place is the board." }),
  q("l12", { mn: "Олон тооны зөв хэлбэр аль вэ?", en: "Which plural is the usual correct form?" }, [
    { mn: "номнууд", en: "номнууд" }, { mn: "номууд", en: "номууд" }, { mn: "номьнууд", en: "номьнууд" }, { mn: "номмууд", en: "номмууд" },
  ], 1, { mn: "ном → номууд.", en: "ном becomes номууд." }),
];

const olympiad: ExamQuestion[] = [
  q("o1", { mn: "1-ээс 10 хүртэлх бүхэл тооны нийлбэр хэд вэ?", en: "What is the sum of the whole numbers from 1 through 10?" }, [
    { mn: "45", en: "45" }, { mn: "50", en: "50" }, { mn: "55", en: "55" }, { mn: "100", en: "100" },
  ], 2, { mn: "10 × 11 / 2 = 55.", en: "10 × 11 / 2 = 55." }),
  q("o2", { mn: "2, 3, 5, 8, 13, ? Дараагийн тоо аль вэ?", en: "2, 3, 5, 8, 13, ? Which number comes next?" }, [
    { mn: "18", en: "18" }, { mn: "20", en: "20" }, { mn: "21", en: "21" }, { mn: "26", en: "26" },
  ], 2, { mn: "Өмнөх хоёрын нийлбэр: 8 + 13 = 21.", en: "Each term is the sum of the two before it: 8 + 13 = 21." }),
  q("o3", { mn: "2×2 хүснэгтэд жижиг дөрвөлжин 4 бий. Бүх хэмжээний дөрвөлжин нийт хэд вэ?", en: "A 2×2 grid has 4 small squares. How many squares are there of every size?" }, [
    { mn: "4", en: "4" }, { mn: "5", en: "5" }, { mn: "6", en: "6" }, { mn: "8", en: "8" },
  ], 1, { mn: "4 жижиг, 1 том. Нийт 5.", en: "4 small squares and 1 large square make 5." }),
  q("o4", { mn: "8 хүн бүгд хоорондоо нэг удаа гар барихад гар барилт хэд вэ?", en: "8 people each shake hands once with everyone else. How many handshakes?" }, [
    { mn: "16", en: "16" }, { mn: "28", en: "28" }, { mn: "56", en: "56" }, { mn: "64", en: "64" },
  ], 1, { mn: "8 × 7 / 2 = 28.", en: "8 × 7 / 2 = 28." }),
  q("o5", { mn: "Цаг яг 3:00 бол цагийн болон минутын зүүний хоорондын өнцөг хэд вэ?", en: "At exactly 3:00, what is the angle between the hour and minute hands?" }, [
    { mn: "30°", en: "30°" }, { mn: "60°", en: "60°" }, { mn: "90°", en: "90°" }, { mn: "180°", en: "180°" },
  ], 2, { mn: "3 цаг нь тойргийн 1/4. 90°.", en: "3:00 is a quarter of the clock, 90°." }),
  q("o6", { mn: "1, 4, 9, 16, 25, ? Дараагийн тоо аль вэ?", en: "1, 4, 9, 16, 25, ? Which number comes next?" }, [
    { mn: "30", en: "30" }, { mn: "36", en: "36" }, { mn: "49", en: "49" }, { mn: "35", en: "35" },
  ], 1, { mn: "1², 2², 3², 4², 5², дараа нь 6² = 36.", en: "These are square numbers. Next is 6² = 36." }),
  q("o7", { mn: "2, 3, 5, 9, 11 тоонуудаас илүүц нь аль вэ?", en: "Which number does not belong: 2, 3, 5, 9, 11?" }, [
    { mn: "2", en: "2" }, { mn: "3", en: "3" }, { mn: "5", en: "5" }, { mn: "9", en: "9" },
  ], 3, { mn: "2, 3, 5, 11 анхны тоо. 9 биш.", en: "2, 3, 5, and 11 are prime. 9 is not." }),
  q("o8", { mn: "5 машин 5 эдлэлийг 5 минутад хийнэ. 100 машин 100 эдлэлийг хэдэн минутад хийх вэ?", en: "5 machines make 5 items in 5 minutes. How long do 100 machines need for 100 items?" }, [
    { mn: "5 минут", en: "5 minutes" }, { mn: "20 минут", en: "20 minutes" }, { mn: "100 минут", en: "100 minutes" }, { mn: "500 минут", en: "500 minutes" },
  ], 0, { mn: "Нэг машин нэг эдлэлийг 5 минутад хийнэ. 100 машин зэрэг хийвэл бас 5 минут.", en: "Each machine makes one item in 5 minutes, so 100 machines still need 5 minutes." }),
  q("o9", { mn: "Бүх сарнай цэцэг. Энэ сарнай. Аль дүгнэлт заавал үнэн бэ?", en: "All roses are flowers. This is a rose. Which must be true?" }, [
    { mn: "Энэ мод", en: "It is a tree" }, { mn: "Энэ цэцэг", en: "It is a flower" }, { mn: "Бүх цэцэг сарнай", en: "Every flower is a rose" }, { mn: "Энэ шар", en: "It is yellow" },
  ], 1, { mn: "Сарнай бол цэцэг тул энэ сарнай цэцэг.", en: "A rose is a flower, so this rose is a flower." }),
  q("o10", { mn: "Нэг тоог 4-өөр үржүүлээд 3-ыг хасахад 17 гарна. Анхны тоо хэд вэ?", en: "A number times 4, minus 3, is 17. What was the number?" }, [
    { mn: "4", en: "4" }, { mn: "5", en: "5" }, { mn: "6", en: "6" }, { mn: "7", en: "7" },
  ], 1, { mn: "4x − 3 = 17, 4x = 20, x = 5.", en: "4x − 3 = 17, so x = 5." }),
  q("o11", { mn: "3×3 хүснэгтийн бүх хэмжээний дөрвөлжин хэд вэ?", en: "How many squares of every size are in a 3×3 grid?" }, [
    { mn: "9", en: "9" }, { mn: "10", en: "10" }, { mn: "14", en: "14" }, { mn: "15", en: "15" },
  ], 2, { mn: "1×1 нь 9, 2×2 нь 4, 3×3 нь 1. Нийт 14.", en: "9 small, 4 medium, and 1 large square make 14." }),
  q("o12", { mn: "Шувуу : үүр :: хүн : ?", en: "Bird is to nest as a person is to what?" }, [
    { mn: "далавч", en: "a wing" }, { mn: "гэр", en: "a home" }, { mn: "загас", en: "a fish" }, { mn: "өд", en: "a feather" },
  ], 1, { mn: "Шувуу үүрэндээ, хүн гэртээ байна.", en: "A bird lives in a nest, and a person lives in a home." }),
];

export const practiceExams: PracticeExam[] = [
  {
    slug: "kids-useful",
    kind: "kids",
    perAttempt: 6,
    title: { mn: "Хүүхдэд хэрэгтэй асуулт", en: "Questions children can use" },
    summary: {
      mn: "Мөнгө, цаг, аюулгүй байдал, энгийн тоо. Туршилт бүрт сангаас өөр 6 асуулт гарна.",
      en: "Money, time, safety, and simple numbers. Each try draws 6 different questions from the bank.",
    },
    age: { mn: "8–12 нас", en: "Ages 8–12" },
    questions: kids,
  },
  {
    slug: "eesh-math",
    kind: "eesh",
    perAttempt: 6,
    title: { mn: "ЭЕШ-ийн жишээ: математик", en: "EESH-style practice: mathematics" },
    summary: {
      mn: "Элсэлтийн ерөнхий шалгалтын хэлбэртэй богино дасгал. Албан ЭЕШ-ийн хуудас биш. Хариу илгээнгүүт гарна.",
      en: "A short practice in the style of the general entrance exam. It is not an official EESH paper. The result appears as soon as you submit.",
    },
    age: { mn: "Ахлах анги", en: "High school" },
    questions: eeshMath,
  },
  {
    slug: "eesh-mongolian",
    kind: "eesh",
    perAttempt: 6,
    title: { mn: "ЭЕШ-ийн жишээ: монгол хэл", en: "EESH-style practice: Mongolian" },
    summary: {
      mn: "Зөв бичих, өгүүлбэр, үгийн сан. Санд 12 асуулт бий. Нэг туршилтад 6 нь гарна.",
      en: "Spelling, sentences, and vocabulary. The bank has 12 questions. One try shows 6.",
    },
    age: { mn: "Ахлах анги", en: "High school" },
    questions: eeshLanguage,
  },
  {
    slug: "mini-olympiad",
    kind: "olympiad",
    perAttempt: 6,
    title: { mn: "Мини олимпиад", en: "Mini olympiad" },
    summary: {
      mn: "Тооны дараалал, тоолол, энгийн логик. Албан олимпиадын бодлого биш. Дахин эхлэхэд асуулт солигдоно.",
      en: "Sequences, counting, and short logic. These are not official olympiad papers. A new try changes the questions.",
    },
    age: { mn: "10–15 нас", en: "Ages 10–15" },
    questions: olympiad,
  },
];

export function getPracticeExam(slug: string) {
  return practiceExams.find((exam) => exam.slug === slug);
}

export function drawAttempt(
  exam: PracticeExam,
  avoid: string[] = [],
  random: () => number = Math.random,
): DrawnQuestion[] {
  const count = Math.min(exam.perAttempt, exam.questions.length);
  const fresh = exam.questions.filter((item) => !avoid.includes(item.id));
  const pool = fresh.length >= count ? fresh : exam.questions.slice();
  const copy = pool.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    const current = copy[index];
    copy[index] = copy[swap];
    copy[swap] = current;
  }
  return copy.slice(0, count).map((item) => shuffleChoices(item, random));
}

function shuffleChoices(item: ExamQuestion, random: () => number): DrawnQuestion {
  const paired = item.choices.map((choice, index) => ({ choice, correct: index === item.answer }));
  for (let index = paired.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    const current = paired[index];
    paired[index] = paired[swap];
    paired[swap] = current;
  }
  return {
    ...item,
    choices: paired.map((entry) => entry.choice),
    answer: paired.findIndex((entry) => entry.correct),
  };
}

export function choiceLabel(index: number) {
  return String.fromCharCode(65 + index);
}

export function textOf(value: { mn: string; en: string }, locale: Locale) {
  return value[locale];
}
