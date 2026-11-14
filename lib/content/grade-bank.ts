import type { SchoolBand, SchoolQuestion, SchoolText, SchoolTopic } from "./school-play";

export const bankGrades = [8, 9, 10, 11, 12] as const;
export type BankGrade = (typeof bankGrades)[number];

export type GradeLesson = {
  grade: BankGrade;
  topic: SchoolTopic;
};

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

function lesson(
  grade: BankGrade,
  subject: string,
  slug: string,
  title: [string, string],
  summary: [string, string],
  paragraphs: Array<[string, string]>,
  questions: SchoolQuestion[],
): GradeLesson {
  const band: SchoolBand = grade <= 9 ? "middle" : "high";
  const topic: SchoolTopic = {
    slug,
    band,
    subject,
    grades: pair(`${grade}-р анги`, `Grade ${grade}`),
    title: pair(title[0], title[1]),
    summary: pair(summary[0], summary[1]),
    lesson: paragraphs.map(([mn, en]) => pair(mn, en)),
    perAttempt: 2,
    questions,
  };
  return { grade, topic };
}

export const gradeLessons: GradeLesson[] = [
  lesson(8, "math", "g8-math-equation", ["Шугаман тэгшитгэл", "Linear equations"], ["Хоёр талд ижил үйлдэл хийж үл мэдэгдэгчийг гаргана.", "Do the same operation to both sides and isolate the unknown."], [
    ["Тэгшитгэлийн хоёр талд ижил тоог нэмж, хасаж, үржүүлж, хувааж болно. Үл мэдэгдэгч нэг талдаа, тоо нөгөө талдаа гарна.", "Add, subtract, multiply, or divide both sides by the same number. The unknown stays on one side and the numbers move to the other."],
    ["Хаалттай бол эхлээд хаалтыг задална. Дараа нь үл мэдэгдэгчийн өмнөх тоонд хуваана.", "If there are brackets, expand them first. Then divide by the number in front of the unknown."],
  ], [
    question("g8m1", ["2x + 3 = 11. x хэд вэ?", "2x + 3 = 11. What is x?"], ["Хоёр талаас 3 хасна. 2x = 8, x = 4.", "Subtract 3. 2x = 8, so x = 4."], ["4", "4"], [
      ["7", "7", "3-ыг хасалгүй 11-ээс шууд хассан мэт авсан.", "3 was not moved first."],
      ["5.5", "5.5", "3-ыг хасахаас өмнө 2-т хуваасан.", "The equation was divided by 2 before subtracting 3."],
      ["8", "8", "2x = 8 гэдгийг x гэж авсан.", "2x = 8 was treated as the value of x."],
    ]),
    question("g8m2", ["5x − 7 = 18. x хэд вэ?", "5x − 7 = 18. What is x?"], ["5x = 25, x = 5.", "5x = 25, so x = 5."], ["5", "5"], [
      ["11", "11", "7-г нэмээгүй, 18-ыг 7-д хуваасан.", "7 was not added before dividing."],
      ["25", "25", "5x-ийг x гэж авсан.", "5x was left as the answer."],
      ["2", "2", "7-г хассан. Хасах тэмдэгтэй гишүүнийг нэмж гаргана.", "7 was subtracted instead of added."],
    ]),
    question("g8m3", ["3(x − 2) = 12. x хэд вэ?", "3(x − 2) = 12. What is x?"], ["x − 2 = 4, x = 6.", "x − 2 = 4, so x = 6."], ["6", "6"], [
      ["4", "4", "2-ыг буцааж нэмээгүй.", "2 was not added back."],
      ["2", "2", "Хаалтан доторх 2-ыг хариу гэж авсан.", "The 2 inside the brackets was used as the answer."],
      ["14", "14", "12 дээр 2 нэмээд 3-т хуваагаагүй.", "2 was added to 12 and the result was not divided by 3."],
    ]),
    question("g8m4", ["x/4 + 1 = 3. x хэд вэ?", "x/4 + 1 = 3. What is x?"], ["x/4 = 2, x = 8.", "x/4 = 2, so x = 8."], ["8", "8"], [
      ["2", "2", "4-өөр үржүүлээгүй.", "The result was not multiplied by 4."],
      ["12", "12", "1-ийг хасахаас өмнө 4-өөр үржүүлсэн.", "Both sides were multiplied by 4 before subtracting 1."],
      ["0.5", "0.5", "Хуваах, үржүүлэхийг сольсон.", "Division and multiplication were swapped."],
    ]),
  ]),
  lesson(8, "physics", "g8-physics-speed", ["Жигд хөдөлгөөний хурд", "Constant speed"], ["Хурдыг замыг хугацаанд хувааж олно.", "Speed is distance divided by time."], [
    ["Жигд хөдөлгөөнд v = s / t. Зам метр, хугацаа секунд бол хурд м/с.", "For constant speed, v = s / t. Metres and seconds give m/s."],
    ["Замыг олохдоо s = v · t. Хугацааг олохдоо t = s / v.", "Distance is s = v · t. Time is t = s / v."],
  ], [
    question("g8p1", ["100 м замыг 20 секундэд туулсан. Хурд хэд вэ?", "A body travels 100 m in 20 s. What is the speed?"], ["100 / 20 = 5 м/с.", "100 / 20 = 5 m/s."], ["5 м/с", "5 m/s"], [
      ["2000 м/с", "2000 m/s", "Үржүүлсэн. Хурд нь хуваалт.", "The values were multiplied. Speed is a quotient."],
      ["80 м/с", "80 m/s", "Хассан.", "The values were subtracted."],
      ["20 м/с", "20 m/s", "Хугацааг хурд гэж авсан.", "The time was used as the speed."],
    ]),
    question("g8p2", ["180 км замыг 3 цагт явсан. Дундаж хурд хэд вэ?", "180 km takes 3 hours. What is the average speed?"], ["180 / 3 = 60 км/ц.", "180 / 3 = 60 km/h."], ["60 км/ц", "60 km/h"], [
      ["540 км/ц", "540 km/h", "Үржүүлсэн.", "The values were multiplied."],
      ["183 км/ц", "183 km/h", "Нэмсэн.", "The values were added."],
      ["6 км/ц", "6 km/h", "Тоог сольж хуваасан.", "The numbers were divided the wrong way."],
    ]),
    question("g8p3", ["4 м/с хурдтай 15 секунд явбал зам хэд вэ?", "At 4 m/s for 15 s, what distance is covered?"], ["s = v · t = 60 м.", "s = v · t = 60 m."], ["60 м", "60 m"], [
      ["19 м", "19 m", "Нэмсэн. Зам нь үржвэр.", "The values were added. Distance is a product."],
      ["3.75 м", "3.75 m", "Хуваасан. Энэ нь хугацаа биш зам.", "The values were divided. That finds time, not distance."],
      ["15 м", "15 m", "Хугацааг зам гэж авсан.", "The time was used as the distance."],
    ]),
    question("g8p4", ["240 км замыг 80 км/ц хурдтай явбал хэдэн цаг вэ?", "240 km at 80 km/h takes how long?"], ["t = s / v = 3 цаг.", "t = s / v = 3 hours."], ["3 цаг", "3 hours"], [
      ["19200 цаг", "19200 hours", "Үржүүлсэн.", "The values were multiplied."],
      ["320 цаг", "320 hours", "Нэмсэн.", "The values were added."],
      ["0.33 цаг", "0.33 hours", "Хурдыг замд хуваасан.", "Speed was divided by distance."],
    ]),
  ]),
  lesson(8, "chemistry", "g8-chemistry-atom", ["Атом, молекул, нэгдэл", "Atoms, molecules, compounds"], ["Элемент нэг төрлийн атомаас, нэгдэл өөр элементүүдээс тогтоно.", "An element is one kind of atom. A compound joins different elements."], [
    ["Атом бол элементийн химийн шинжийг хадгалсан жижиг бөөм. Молекул нь холбогдсон атомуудаас тогтоно.", "An atom is the smallest particle of an element that keeps its chemical properties. A molecule is bonded atoms."],
    ["H₂O бол нэгдэл: 2 устөрөгч, 1 хүчилтөрөгч. O₂ бол нэг элемент, учир нь атомууд нь адилхан.", "H₂O is a compound: two hydrogen atoms and one oxygen atom. O₂ is an element because its atoms are the same."],
  ], [
    question("g8c1", ["Усны молекулд хэдэн устөрөгчийн атом байдаг вэ?", "How many hydrogen atoms are in a water molecule?"], ["H₂O-ийн 2 нь устөрөгчийг заана.", "The 2 in H₂O counts the hydrogen atoms."], ["2", "2"], [
      ["1", "1", "Хүчилтөрөгчийн тоог авсан.", "The oxygen count was used."],
      ["3", "3", "Бүх атомыг устөрөгч гэж тоолсон.", "Every atom was counted as hydrogen."],
      ["8", "8", "Хүчилтөрөгчийн дугаарыг атомын тоо гэж авсан.", "The atomic number of oxygen was used as a count."],
    ]),
    question("g8c2", ["Аль нь нэгдэл вэ?", "Which one is a compound?"], ["NaCl-д натри, хлор гэсэн хоёр өөр элемент бий.", "NaCl contains two different elements, sodium and chlorine."], ["NaCl", "NaCl"], [
      ["O₂", "O₂", "Хоёр атом нь нэг элемент.", "Both atoms are the same element."],
      ["Fe", "Fe", "Энэ нэг элементийн тэмдэг.", "This is the symbol of one element."],
      ["He", "He", "Гели нэг атомоос тогтсон элемент.", "Helium is an element made of one kind of atom."],
    ]),
    question("g8c3", ["Элемент гэж юу вэ?", "What is an element?"], ["Нэг төрлийн атомаас тогтсон бодис.", "A substance made of one kind of atom."], ["Нэг төрлийн атом", "One kind of atom"], [
      ["Үргэлж хоёр өөр атом", "Always two different atoms", "Энэ нь нэгдлийн шинж.", "That describes a compound."],
      ["Зөвхөн хий", "Only a gas", "Элемент хатуу, шингэн, хий аль нь ч байж болно.", "An element can be solid, liquid, or gas."],
      ["Зөвхөн металл", "Only a metal", "Нүүрстөрөгч мэт металл биш элемент бий.", "Carbon is an element and it is not a metal."],
    ]),
    question("g8c4", ["Молекул гэж юу вэ?", "What is a molecule?"], ["Химийн холбоогоор холбогдсон атомуудын бүлэг.", "A group of atoms joined by chemical bonds."], ["Холбогдсон атомууд", "Bonded atoms"], [
      ["Зөвхөн нэг протон", "Only one proton", "Протон атомын доторх бөөм.", "A proton is a particle inside an atom."],
      ["Холимог", "A mixture", "Холимогт бодисууд химийн холбоогүй холилдоно.", "A mixture is substances together without a new chemical bond."],
      ["Зөвхөн ион", "Only an ion", "Ион цэнэгтэй атом эсвэл бүлэг. Молекул бүхэн ион биш.", "An ion is charged. A molecule is not defined as an ion."],
    ]),
  ]),
  lesson(8, "biology", "g8-biology-cell", ["Эсийн бүтэц", "Cell structure"], ["Эс бол амьд биеийн үндсэн нэгж.", "The cell is the basic unit of a living body."], [
    ["Бүрхүүл бодис орох, гарахыг хянана. Цөмд удамшлын мэдээлэл байна. Митохондри энерги гаргана.", "The membrane controls what enters and leaves. The nucleus holds genetic information. Mitochondria release energy."],
    ["Ургамлын эсэд эсийн хана, хлоропласт байна. Амьтны эсэд эсийн хана байхгүй.", "A plant cell has a cell wall and chloroplasts. An animal cell has no cell wall."],
  ], [
    question("g8b1", ["Удамшлын мэдээлэл эсийн аль хэсэгт байдаг вэ?", "Where is the genetic information in the cell?"], ["Цөмд.", "In the nucleus."], ["Цөм", "Nucleus"], [
      ["Митохондри", "Mitochondrion", "Митохондри энергийн урвал явуулна.", "Mitochondria run energy reactions."],
      ["Эсийн хана", "Cell wall", "Хана хамгаалах бүрхүүл. Удамшлын сан биш.", "The wall is a protective layer, not the store of genes."],
      ["Вакуоль", "Vacuole", "Вакуоль шүүс, нөөц хадгална.", "A vacuole stores fluid and reserves."],
    ]),
    question("g8b2", ["Хлоропласт юу хийдэг вэ?", "What does a chloroplast do?"], ["Гэрлийн энергээр фотосинтез явуулна.", "It carries out photosynthesis using light energy."], ["Фотосинтез", "Photosynthesis"], [
      ["Амьсгалын энерги", "Respiration energy", "Энэ үүрэг митохондрид илүү ойр.", "Energy release from respiration is the mitochondrion's role."],
      ["Удамшил хадгалах", "Store genes", "Удамшлыг цөм хадгална.", "Genes are stored in the nucleus."],
      ["Бодис шүүх", "Filter substances", "Шүүх үүрэг бүрхүүлийн хяналттай холбоотой.", "Filtering is the membrane's control of entry."],
    ]),
    question("g8b3", ["Аль бүтэц амьтны эсэд байхгүй вэ?", "Which structure is absent from an animal cell?"], ["Эсийн хана ургамалд байдаг.", "The cell wall belongs to plant cells."], ["Эсийн хана", "Cell wall"], [
      ["Эсийн мембран", "Cell membrane", "Амьтны эсэд мембран байна.", "Animal cells have a membrane."],
      ["Цөм", "Nucleus", "Амьтны эс цөмтэй.", "Animal cells have a nucleus."],
      ["Митохондри", "Mitochondrion", "Амьтны эс митохондритой.", "Animal cells have mitochondria."],
    ]),
    question("g8b4", ["Митохондрийн үндсэн үүрэг аль вэ?", "What is the main job of a mitochondrion?"], ["Амьсгалаас энерги гаргана.", "It releases energy from respiration."], ["Энерги гаргах", "Release energy"], [
      ["Фотосинтез", "Photosynthesis", "Фотосинтезийг хлоропласт хийнэ.", "Photosynthesis happens in chloroplasts."],
      ["Удамшил", "Inheritance", "Удамшлын мэдээлэл цөмд.", "Genetic information is in the nucleus."],
      ["Хатуу хана", "A hard wall", "Хатуу хана нь эсийн хана.", "The hard outer layer is the cell wall."],
    ]),
  ]),
  lesson(8, "mongolian", "g8-mongolian-sentence", ["Өгүүлбэрийн гишүүн", "Parts of a sentence"], ["Өгүүлэгдэхүүн хэн, юу болохыг, тусагдахуун юуг гэдгийг заана.", "The subject names who or what. The object names what is acted on."], [
    ["«Сурагч ном уншина» өгүүлбэрт өгүүлэгдэхүүн нь сурагч, тусагдахуун нь ном, өгүүлэхүүн нь уншина.", "In “Сурагч ном уншина”, the subject is сурагч, the object is ном, and the predicate is уншина."],
    ["Тодорхойлолт нэр үгээ тодотгоно: сонирхолтой ном. Хэмжээний дагавар тоо хэмжээг заана.", "A modifier describes the noun: an interesting book. A quantity word names how many."],
  ], [
    question("g8n1", ["«Багш даалгавар заана» өгүүлбэрийн өгүүлэгдэхүүн аль вэ?", "What is the subject of “Багш даалгавар заана”?"], ["Хэн зааж байгааг багш заана.", "Багш names who is teaching."], ["Багш", "Багш"], [
      ["Даалгавар", "Даалгавар", "Энэ тусагдахуун.", "This is the object."],
      ["Заана", "Заана", "Энэ өгүүлэхүүн.", "This is the predicate."],
      ["Багш даалгавар", "Багш даалгавар", "Хоёр гишүүнийг нийлүүлсэн.", "Two different parts were joined."],
    ]),
    question("g8n2", ["Тэр өгүүлбэрийн тусагдахуун аль вэ?", "What is the object of that sentence?"], ["Юуг зааж байгааг даалгавар заана.", "Даалгавар names what is being explained."], ["Даалгавар", "Даалгавар"], [
      ["Багш", "Багш", "Энэ өгүүлэгдэхүүн.", "This is the subject."],
      ["Заана", "Заана", "Энэ үйл үг.", "This is the verb."],
      ["Тэр", "Тэр", "Өгүүлбэрт энэ үг байхгүй.", "That word is not in the sentence."],
    ]),
    question("g8n3", ["«Сонирхолтой ном» дахь сонирхолтой аль гишүүн бэ?", "What part is сонирхолтой in “сонирхолтой ном”?"], ["Нэрээ тодотгож байгаа тул тодорхойлолт.", "It describes the noun, so it is a modifier."], ["Тодорхойлолт", "Modifier"], [
      ["Өгүүлэгдэхүүн", "Subject", "Өгүүлбэрийн үйлдэгч биш.", "It is not the doer of a sentence."],
      ["Тусагдахуун", "Object", "Үйлд хүрч буй нэр биш, тодотгол.", "It is not the object. It modifies a noun."],
      ["Өгүүлэхүүн", "Predicate", "Үйл үг биш.", "It is not the verb."],
    ]),
    question("g8n4", ["Өгүүлэхүүн юу заадаг вэ?", "What does the predicate tell?"], ["Юу хийж, ямар байгааг заана.", "It tells the action or the state."], ["Үйл, байдал", "Action or state"], [
      ["Зөвхөн тоо", "Only a number", "Тоо хэмжээний үг өөр гишүүн.", "A number is a different part."],
      ["Зөвхөн газар", "Only a place", "Газрын нэр байц байж болно, өгүүлэхүүн биш.", "A place can be an adverbial, not the predicate itself."],
      ["Зөвхөн эзэн", "Only the owner", "Эзнийг өгүүлэгдэхүүн заана.", "The doer is the subject."],
    ]),
  ]),
  lesson(8, "english", "g8-english-present", ["Present simple", "Present simple"], ["He, she, it-ийн өмнө үйл үгэнд -s орно.", "With he, she, and it, the verb takes -s."], [
    ["Present simple нь дадал, баримтыг хэлнэ. I go, you go, he goes.", "The present simple states habits and facts. I go, you go, he goes."],
    ["Үгүйсгэхэд I, you, we, they-д do not, he, she, it-д does not хэрэглэнэ. Does-ийн араас үйл үг суурь хэлбэрээрээ байна.", "Negatives use do not with I, you, we, and they, and does not with he, she, and it. After does, the verb stays in its base form."],
  ], [
    question("g8e1", ["Which sentence is correct?", "Which sentence is correct?"], ["She-ийн араас goes орно.", "She takes goes."], ["She goes to school.", "She goes to school."], [
      ["She go to school.", "She go to school.", "She-д -s дутуу.", "The -s is missing after she."],
      ["She going to school.", "She going to school.", "be үйл үггүй -ing хэлбэр энэ цагт багтахгүй.", "An -ing form without be is not the present simple."],
      ["She gone to school.", "She gone to school.", "Gone нь past participle.", "Gone is a past participle."],
    ]),
    question("g8e2", ["Which negative is correct?", "Which negative is correct?"], ["He-ийн үгүйсгэл does not + суурь үйл үг.", "He uses does not plus the base verb."], ["He does not play.", "He does not play."], [
      ["He does not plays.", "He does not plays.", "Does байгаа тул plays дээр -s давхардсан.", "Does already marks the third person, so plays is wrong."],
      ["He do not play.", "He do not play.", "He-д do биш does орно.", "He takes does, not do."],
      ["He not play.", "He not play.", "Туслах үйл үг дутуу.", "The auxiliary is missing."],
    ]),
    question("g8e3", ["Where does always go in “She always reads”?", "Where does always go in “She always reads”?"], ["Үйл үгийн өмнө.", "Before the main verb."], ["Before reads", "Before reads"], [
      ["After reads", "After reads", "Энэ өгүүлбэрт always үйл үгийн ард биш.", "In this sentence always does not follow the verb."],
      ["Before she", "Before she", "Эзний өмнө биш.", "It does not come before the subject."],
      ["Instead of reads", "Instead of reads", "Always үйл үгийг орлохгүй.", "Always does not replace the verb."],
    ]),
    question("g8e4", ["Which verb matches “The sun”?", "Which verb matches “The sun”?"], ["The sun нэгдүгээр биеийн биш, -s авна.", "The sun is third person singular, so the verb takes -s."], ["rises", "rises"], [
      ["rise", "rise", "-s дутуу.", "The -s is missing."],
      ["rising", "rising", "Энэ -ing хэлбэр.", "This is an -ing form."],
      ["rose", "rose", "Энэ өнгөрсөн цаг.", "This is the past tense."],
    ]),
  ]),
  lesson(8, "history", "g8-history-empire", ["Монголын эзэнт гүрэн", "The Mongol Empire"], ["1206 онд Их Монгол Улс байгуулагдсан.", "The Mongol state was founded in 1206."], [
    ["1206 онд Чингис хаан аймгуудыг нэгтгэж Их Монгол Улсыг байгуулсан.", "In 1206 Chinggis Khaan united the tribes and founded the Mongol state."],
    ["Эзэнт гүрний дараагийн төв Хубилай хааны үеийн Юань улс болж, Хятадыг хамарсан.", "Under Khubilai the empire's eastern seat became the Yuan state and covered China."],
  ], [
    question("g8h1", ["Их Монгол Улс хэдэн онд байгуулагдсан бэ?", "In which year was the Mongol state founded?"], ["1206 он.", "1206."], ["1206", "1206"], [
      ["1911", "1911", "Энэ Богд хаант улс байгуулагдсан он.", "That is the year of the Bogd Khaan state."],
      ["1921", "1921", "Энэ ардын хувьсгалын он.", "That is the year of the 1921 revolution."],
      ["1990", "1990", "Энэ ардчилсан хувьсгалын он.", "That is the year of the democratic revolution."],
    ]),
    question("g8h2", ["1206 онд аймгуудыг нэгтгэсэн хэн бэ?", "Who united the tribes in 1206?"], ["Чингис хаан.", "Chinggis Khaan."], ["Чингис хаан", "Chinggis Khaan"], [
      ["Хубилай хаан", "Khubilai Khaan", "Хубилай нь хожмын Юань улсын хаан.", "Khubilai ruled the later Yuan state."],
      ["Богд хаан", "Bogd Khaan", "Богд хаан XX зууны үеийн төр.", "The Bogd Khaan belongs to the twentieth century."],
      ["Лигдэн хаан", "Ligden Khaan", "Лигдэн хожмын хаан.", "Ligden was a later khan."],
    ]),
    question("g8h3", ["Хубилайн байгуулсан улсыг юу гэж нэрлэдэг вэ?", "What was the state founded by Khubilai called?"], ["Юань.", "Yuan."], ["Юань", "Yuan"], [
      ["Хүннү", "Xiongnu", "Хүннү нь эртний улс.", "The Xiongnu state is much earlier."],
      ["Их Юань биш, Богд", "Bogd state", "Богд хаант улс 1911 онд.", "The Bogd state dates from 1911."],
      ["Алтан улс", "Jin dynasty", "Алтан улс бол Чингисийн үед эзлэгдсэн улс.", "The Jin was a state conquered in that era, not Khubilai's new state."],
    ]),
    question("g8h4", ["Эзэнт гүрнийг нэгтгэсэн үйл явдал юу вэ?", "What event united the empire's founding tribes?"], ["Аймгуудыг нэг төрд оруулсан.", "The tribes were brought into one state."], ["Аймгуудыг нэгтгэсэн", "The tribes were united"], [
      ["1992 оны Үндсэн хууль", "The 1992 constitution", "Энэ орчин үеийн хууль.", "That is a modern constitution."],
      ["1921 оны хувьсгал", "The 1921 revolution", "Энэ XX зууны үйл явдал.", "That is a twentieth-century event."],
      ["1911 оны тусгаар тогтнол", "Independence in 1911", "Энэ хожуу үеийн тусгаар тогтнол.", "That independence comes centuries later."],
    ]),
  ]),
  lesson(8, "geography", "g8-geography-mongolia", ["Монгол орны байршил", "Where Mongolia is"], ["Монгол далайд гарцгүй, хойд талдаа Орос, өмнө талдаа Хятадтай хиллэнэ.", "Mongolia is landlocked, with Russia to the north and China to the south."], [
    ["Монгол Төв Азид оршдог. Нийслэл нь Улаанбаатар.", "Mongolia is in Central Asia. The capital is Ulaanbaatar."],
    ["Баруун талд Алтай, төвд тал хээр, өмнөдөд Говь зонхилно.", "The Altai mountains lie to the west, steppe in the centre, and the Gobi to the south."],
  ], [
    question("g8g1", ["Монгол Улс аль далайд гарцтай вэ?", "Which sea gives Mongolia a coast?"], ["Далайд гарцгүй.", "It has no coast."], ["Гарцгүй", "No coast"], [
      ["Номхон далай", "The Pacific", "Монгол далайд гарцгүй.", "Mongolia does not reach the Pacific."],
      ["Хар тэнгис", "The Black Sea", "Хар тэнгис Европт.", "The Black Sea is in Europe."],
      ["Энэтхэгийн далай", "The Indian Ocean", "Энэтхэгийн далай хол.", "The Indian Ocean is far to the south."],
    ]),
    question("g8g2", ["Монголын хойд хөрш аль вэ?", "Which country is Mongolia's northern neighbour?"], ["Орос.", "Russia."], ["Орос", "Russia"], [
      ["Хятад", "China", "Хятад өмнөд хөрш.", "China is the southern neighbour."],
      ["Казахстан", "Kazakhstan", "Казахстан баруун өмнөдөд ойр боловч хойд хил биш.", "Kazakhstan is not the northern border."],
      ["Солонгос", "Korea", "Солонгос далайн цаана.", "Korea lies across the sea from China."],
    ]),
    question("g8g3", ["Нийслэл аль вэ?", "What is the capital?"], ["Улаанбаатар.", "Ulaanbaatar."], ["Улаанбаатар", "Ulaanbaatar"], [
      ["Эрдэнэт", "Erdenet", "Эрдэнэт аймаг биш, хот. Нийслэл биш.", "Erdenet is a city, not the capital."],
      ["Дархан", "Darkhan", "Дархан хот. Нийслэл биш.", "Darkhan is not the capital."],
      ["Хархорин", "Kharkhorin", "Хархорин түүхэн төв. Өнөөгийн нийслэл биш.", "Kharkhorin is a historic centre, not the present capital."],
    ]),
    question("g8g4", ["Говь аль хэсэгт зонхилох вэ?", "Where is the Gobi mainly found?"], ["Өмнөд хэсэгт.", "In the south."], ["Өмнөд", "South"], [
      ["Зөвхөн хойд хил", "Only the northern border", "Хойд хил ой, уултай.", "The north has forest and mountains."],
      ["Зөвхөн Улаанбаатар", "Only Ulaanbaatar", "Нийслэл говь биш.", "The capital is not the Gobi."],
      ["Зөвхөн Алтай", "Only the Altai", "Алтай баруун талын нуруу.", "The Altai is the western mountain range."],
    ]),
  ]),
  lesson(9, "math", "g9-math-proportion", ["Хувь, пропорц", "Percent and proportion"], ["Хувийг 100-д хувааж тоогоор үржүүлнэ.", "A percent is divided by 100 and then multiplied by the number."], [
    ["a нь b-ийн p хувь бол a = b · p / 100.", "If a is p percent of b, then a = b · p / 100."],
    ["Пропорц a/b = c/d бол a · d = b · c.", "In the proportion a/b = c/d, a · d = b · c."],
  ], [
    question("g9m1", ["200-ийн 15% хэд вэ?", "What is 15% of 200?"], ["200 · 15 / 100 = 30.", "200 · 15 / 100 = 30."], ["30", "30"], [
      ["15", "15", "200-ийг үржүүлээгүй.", "200 was not used."],
      ["300", "300", "100-д хуваагаагүй.", "The result was not divided by 100."],
      ["215", "215", "Хувийг нэмсэн.", "The percent was added."],
    ]),
    question("g9m2", ["40 нь 80-ийн хэдэн хувь вэ?", "40 is what percent of 80?"], ["40 / 80 · 100 = 50%.", "40 / 80 · 100 = 50%."], ["50%", "50%"], [
      ["40%", "40%", "Тоологчийг шууд хувь гэж авсан.", "The numerator was treated as the percent."],
      ["200%", "200%", "80-ыг 40-д хуваасан.", "80 was divided by 40."],
      ["2%", "2%", "100-аар үржүүлээгүй.", "The quotient was not multiplied by 100."],
    ]),
    question("g9m3", ["2/5 = x/20. x хэд вэ?", "2/5 = x/20. What is x?"], ["2 · 20 = 5x, x = 8.", "2 · 20 = 5x, so x = 8."], ["8", "8"], [
      ["4", "4", "Зөрүүлж үржүүлээгүй.", "The cross products were not used."],
      ["50", "50", "5-ыг 20-оор үржүүлээд 2-т хуваагаагүй.", "5 was multiplied by 20 and not divided by 2."],
      ["10", "10", "Хагасыг нь авсан.", "Only half of the correct product was kept."],
    ]),
    question("g9m4", ["Бараа 20% хямдарч 8000₮ болсон. Анхны үнэ хэд вэ?", "A price falls by 20% to 8000 MNT. What was the original price?"], ["80% нь 8000. 8000 / 0.8 = 10000.", "80% is 8000, so 8000 / 0.8 = 10000."], ["10000₮", "10000 MNT"], [
      ["9600₮", "9600 MNT", "20%-ийг 8000 дээр нэмсэн. 8000 бол аль хэдийн хямдарсан үнэ.", "20% was added to the sale price. 8000 is already the reduced price."],
      ["6400₮", "6400 MNT", "Дахин 20% хассан.", "Another 20% was taken off."],
      ["8000₮", "8000 MNT", "Хямдралыг тооцоогүй.", "The discount was ignored."],
    ]),
  ]),
  lesson(9, "physics", "g9-physics-force", ["Хүч ба хурдатгал", "Force and acceleration"], ["F = m · a. Нэгж нь ньютон.", "F = m · a. The unit is the newton."], [
    ["Хүч нь масстай хурдатгалын үржвэр. 1 Н = 1 кг·м/с².", "Force is mass times acceleration. 1 N = 1 kg·m/s²."],
    ["Массыг олохдоо m = F / a. Хурдатгалыг олохдоо a = F / m.", "Mass is m = F / a. Acceleration is a = F / m."],
  ], [
    question("g9p1", ["2 кг масс, 3 м/с² хурдатгал. Хүч хэд вэ?", "Mass 2 kg, acceleration 3 m/s². What is the force?"], ["F = 2 · 3 = 6 Н.", "F = 2 · 3 = 6 N."], ["6 Н", "6 N"], [
      ["5 Н", "5 N", "Нэмсэн.", "The values were added."],
      ["1.5 Н", "1.5 N", "Хуваасан.", "The values were divided."],
      ["1 Н", "1 N", "Хассан.", "The values were subtracted."],
    ]),
    question("g9p2", ["10 Н хүч 2 кг масст үйлчилнэ. Хурдатгал хэд вэ?", "A 10 N force acts on 2 kg. What is the acceleration?"], ["a = F / m = 5 м/с².", "a = F / m = 5 m/s²."], ["5 м/с²", "5 m/s²"], [
      ["20 м/с²", "20 m/s²", "Үржүүлсэн.", "The values were multiplied."],
      ["8 м/с²", "8 m/s²", "Хассан.", "The values were subtracted."],
      ["0.2 м/с²", "0.2 m/s²", "Хүчийг массад биш, массыг хүчинд хуваасан.", "Mass was divided by force."],
    ]),
    question("g9p3", ["1 ньютон аль илэрхийлэлтэй тэнцүү вэ?", "Which expression equals 1 newton?"], ["1 кг·м/с².", "1 kg·m/s²."], ["1 кг·м/с²", "1 kg·m/s²"], [
      ["1 м/с", "1 m/s", "Энэ хурдны нэгж.", "That is a unit of speed."],
      ["1 кг", "1 kg", "Энэ массын нэгж.", "That is a unit of mass."],
      ["1 Ж", "1 J", "Энэ энергийн нэгж.", "That is a unit of energy."],
    ]),
    question("g9p4", ["Хурдатгал 0 бол хүч хэд вэ?", "If acceleration is 0, what is the net force?"], ["F = m · 0 = 0.", "F = m · 0 = 0."], ["0", "0"], [
      ["Масстай тэнцүү", "Equal to the mass", "Массыг хүч гэж авсан.", "Mass was treated as force."],
      ["9.8 Н", "9.8 N", "Чөлөөт уналтын тоог шууд тавьсан.", "The free-fall number was inserted without a mass or a net acceleration."],
      ["1 Н", "1 N", "Нэгжээс нэг хүч гаргасан.", "The unit was turned into a force of 1 N."],
    ]),
  ]),
  lesson(9, "chemistry", "g9-chemistry-reaction", ["Химийн тэгшитгэл", "Chemical equations"], ["Хоёр талын атомын тоо тэнцүү байна.", "The number of each atom is the same on both sides."], [
    ["Коэффициент молекулын тоог өөрчилнө. Индекс бодисыг өөрчилнө, түүнийг тэнцүүлэхдээ бүү өөрчил.", "A coefficient changes how many molecules there are. A subscript changes the substance, so it stays fixed while balancing."],
    ["2H₂ + O₂ → 2H₂O тэгшитгэлд хоёр талд 4 устөрөгч, 2 хүчилтөрөгч байна.", "In 2H₂ + O₂ → 2H₂O there are 4 hydrogen atoms and 2 oxygen atoms on each side."],
  ], [
    question("g9c1", ["2H₂ + O₂ → 2H₂O тэгшитгэлийн зүүн талд хэдэн устөрөгч байгаа вэ?", "How many hydrogen atoms are on the left of 2H₂ + O₂ → 2H₂O?"], ["2 молекул · 2 атом = 4.", "2 molecules times 2 atoms = 4."], ["4", "4"], [
      ["2", "2", "Коэффициентийг тоолоогүй.", "The coefficient was ignored."],
      ["1", "1", "H-ийн тэмдгийг нэг атом гэж авсан.", "The H symbol was counted as one atom."],
      ["6", "6", "Хүчилтөрөгчийг устөрөгчид нэмсэн.", "Oxygen was added to the hydrogen count."],
    ]),
    question("g9c2", ["Тэнцүүлэхдээ юуг өөрчилдөг вэ?", "What is changed when an equation is balanced?"], ["Коэффициент.", "The coefficient."], ["Коэффициент", "Coefficient"], [
      ["Индекс", "Subscript", "Индекс бодисыг өөрчилнө.", "A subscript changes the substance."],
      ["Элементийн тэмдэг", "The element symbol", "Тэмдэг өөр элемент болгоно.", "Changing the symbol changes the element."],
      ["Сумны чиг", "The arrow direction", "Сум урвалын чигийг заана. Атомын тоог тэгшитгэхгүй.", "The arrow shows direction. It does not balance atoms."],
    ]),
    question("g9c3", ["H₂ + Cl₂ → 2HCl тэгшитгэл тэнцсэн үү?", "Is H₂ + Cl₂ → 2HCl balanced?"], ["Хоёр талд H 2, Cl 2.", "Each side has 2 H and 2 Cl."], ["Тэнцсэн", "Balanced"], [
      ["H дутуу", "Hydrogen is short", "Хоёр талд хоёр устөрөгч байна.", "Both sides have two hydrogen atoms."],
      ["Cl илүү", "Chlorine is extra", "Хоёр талд хоёр хлор байна.", "Both sides have two chlorine atoms."],
      ["Коэффициент хэрэггүй", "No coefficient is allowed", "2HCl-ийн 2 хэрэгтэй.", "The 2 in 2HCl is needed."],
    ]),
    question("g9c4", ["Индексийг өөрчилбөл юу болох вэ?", "What happens if a subscript is changed?"], ["Өөр бодис болно.", "It becomes a different substance."], ["Өөр бодис", "A different substance"], [
      ["Зөвхөн тоо нэмэгдэнэ", "Only the count changes", "Тоог коэффициент өөрчилнө.", "The count of molecules is the coefficient's job."],
      ["Юу ч өөрчлөгдөхгүй", "Nothing changes", "H₂O ба H₂O₂ өөр бодис.", "H₂O and H₂O₂ are different substances."],
      ["Зөвхөн нэгж өөрчлөгдөнө", "Only the unit changes", "Индекс нэгж биш.", "A subscript is not a unit."],
    ]),
  ]),
  lesson(9, "biology", "g9-biology-photosynthesis", ["Фотосинтез", "Photosynthesis"], ["Ургамал гэрэл, ус, нүүрстөрөгчийн давхар ислээр глюкоз, хүчилтөрөгч гаргана.", "Plants use light, water, and carbon dioxide to make glucose and oxygen."], [
    ["Фотосинтез хлоропластад явагдана. Гэрлийн энерги химийн энерги болно.", "Photosynthesis happens in chloroplasts. Light energy becomes chemical energy."],
    ["Амьсгал эсрэг чиглэлтэй: глюкоз, хүчилтөрөгчөөс энерги, нүүрстөрөгчийн давхар исэл, ус гарна.", "Respiration runs the other way: glucose and oxygen yield energy, carbon dioxide, and water."],
  ], [
    question("g9b1", ["Фотосинтез эсийн аль хэсэгт явагддаг вэ?", "Where in the cell does photosynthesis happen?"], ["Хлоропластад.", "In the chloroplast."], ["Хлоропласт", "Chloroplast"], [
      ["Митохондри", "Mitochondrion", "Митохондрид амьсгал явагдана.", "Respiration happens in mitochondria."],
      ["Цөм", "Nucleus", "Цөм удамшил хадгална.", "The nucleus stores genetic material."],
      ["Эсийн хана", "Cell wall", "Хана хамгаалах үүрэгтэй.", "The wall protects the cell."],
    ]),
    question("g9b2", ["Фотосинтезийн бүтээгдэхүүн аль вэ?", "Which is a product of photosynthesis?"], ["Хүчилтөрөгч ба глюкоз.", "Oxygen and glucose."], ["Хүчилтөрөгч", "Oxygen"], [
      ["Зөвхөн нүүрстөрөгчийн давхар исэл", "Only carbon dioxide", "Нүүрстөрөгчийн давхар исэл нь орц.", "Carbon dioxide is an input."],
      ["Зөвхөн ус", "Only water", "Ус орц.", "Water is an input."],
      ["Азот", "Nitrogen", "Азот энэ урвалын бүтээгдэхүүн биш.", "Nitrogen is not the product of this reaction."],
    ]),
    question("g9b3", ["Фотосинтезд гэрэл ямар үүрэгтэй вэ?", "What does light do in photosynthesis?"], ["Энергийн эх үүсвэр.", "It is the energy source."], ["Энерги өгнө", "It supplies energy"], [
      ["Хүчилтөрөгчийг устгана", "It destroys oxygen", "Хүчилтөрөгч бүтээгдэхүүн.", "Oxygen is produced."],
      ["Үндсийг усална", "It waters the roots", "Ус хөрснөөс ирнэ.", "Water comes from the soil."],
      ["Үрийг хагалаана", "It cracks the seed", "Энэ соёололт биш.", "That is not germination."],
    ]),
    question("g9b4", ["Амьсгал фотосинтезээс юугаараа өөр вэ?", "How is respiration different from photosynthesis?"], ["Глюкозоос энерги гаргана.", "It releases energy from glucose."], ["Энерги гаргана", "It releases energy"], [
      ["Зөвхөн гэрлээр явна", "It needs light only", "Амьсгал гэрэлгүй явагдана.", "Respiration does not require light."],
      ["Хлоропластад явна", "It happens in chloroplasts", "Амьсгал митохондрид.", "Respiration happens in mitochondria."],
      ["Хүчилтөрөгч гаргана", "It produces oxygen", "Хүчилтөрөгч гаргадаг нь фотосинтез.", "Oxygen is a product of photosynthesis."],
    ]),
  ]),
  lesson(9, "mongolian", "g9-mongolian-paragraph", ["Догол мөрийн санаа", "A paragraph's idea"], ["Нэг догол мөр нэг гол санаатай.", "One paragraph carries one main idea."], [
    ["Гол санааг ихэвчлэн эхний өгүүлбэр хэлнэ. Дараагийн өгүүлбэрүүд баримт, жишээгээр бататгана.", "The first sentence often states the main idea. The next sentences support it with facts and examples."],
    ["Өөр сэдэв орж ирвэл шинэ догол мөр эхэлнэ.", "A new topic starts a new paragraph."],
  ], [
    question("g9n1", ["Нэг догол мөрөнд хэдэн гол санаа байх вэ?", "How many main ideas belong in one paragraph?"], ["Нэг.", "One."], ["Нэг", "One"], [
      ["Аль болох олон", "As many as possible", "Олон санаа уншихыг сарниулна.", "Several ideas make the paragraph hard to follow."],
      ["Тэг", "Zero", "Санаагүй догол мөр үүрэггүй.", "A paragraph with no idea has no job."],
      ["Зөвхөн гарчигт", "Only in the title", "Гарчиг биш, догол мөр өөрөө санаагаа агуулна.", "The paragraph itself holds the idea."],
    ]),
    question("g9n2", ["Жишээ өгүүлбэр юу хийх вэ?", "What does an example sentence do?"], ["Гол санааг бататгана.", "It supports the main idea."], ["Бататгана", "Supports it"], [
      ["Шинэ сэдэв нээх", "Open a new topic", "Шинэ сэдэв шинэ догол мөр.", "A new topic needs a new paragraph."],
      ["Гарчгийг устгах", "Delete the title", "Жишээ гарчгийг устгахгүй.", "An example does not remove the title."],
      ["Зөвхөн тоо бичих", "Only write numbers", "Жишээ баримт, үйл явдал байж болно.", "An example can be a fact or an event."],
    ]),
    question("g9n3", ["Хоёр өөр сэдэв нэг догол мөрт байвал яах вэ?", "What should happen when two topics share a paragraph?"], ["Салгаж шинэ догол мөр гаргана.", "Split them into a new paragraph."], ["Салгана", "Split them"], [
      ["Нэг өгүүлбэрт багтаана", "Force them into one sentence", "Хоёр санааг нэг өгүүлбэрт шахах нь ойлгомжийг бууруулна.", "Pressing two ideas into one sentence makes the writing unclear."],
      ["Хоёуланг нь хасна", "Delete both", "Сэдвээ хаях биш, салгах хэрэгтэй.", "The topics should be separated, not deleted."],
      ["Зөвхөн цэг хасна", "Remove the full stops", "Цэг өгүүлбэрийг зааглана.", "Full stops separate sentences."],
    ]),
    question("g9n4", ["Гол санаа ихэвчлэн хаана байдаг вэ?", "Where is the main idea often placed?"], ["Догол мөрийн эхэнд.", "At the start of the paragraph."], ["Эхэнд", "At the start"], [
      ["Зөвхөн зүүлтэнд", "Only in a footnote", "Зүүлт эх биш.", "A footnote is not the paragraph."],
      ["Зөвхөн зурагт", "Only in a picture", "Зураг туслах материал.", "A picture can help, but it is not the sentence."],
      ["Хоосон мөрөнд", "In a blank line", "Хоосон мөр санаа агуулдаггүй.", "A blank line carries no idea."],
    ]),
  ]),
  lesson(9, "english", "g9-english-past", ["Past simple", "Past simple"], ["Дууссан үйлдлийг past simple-аар хэлнэ.", "A finished action uses the past simple."], [
    ["Жигд үйл үг -ed авна: play → played. Жигд бус үйл үг өөрчлөгдөнө: go → went.", "Regular verbs take -ed: play becomes played. Irregular verbs change form: go becomes went."],
    ["Үгүйсгэхэд did not + суурь үйл үг. Did байгаа тул өнгөрсөн хэлбэр давтагдахгүй.", "The negative is did not plus the base verb. After did, the past form is not repeated."],
  ], [
    question("g9e1", ["Which past form of go is correct?", "Which past form of go is correct?"], ["Go жигд бус. Өнгөрсөн хэлбэр went.", "Go is irregular. The past form is went."], ["went", "went"], [
      ["goed", "goed", "-ed жигд бус үйл үгэнд таарахгүй.", "-ed does not fit this irregular verb."],
      ["gone", "gone", "Gone нь participle. Yesterday-д went орно.", "Gone is the participle. Yesterday takes went."],
      ["going", "going", "Энэ -ing хэлбэр.", "This is the -ing form."],
    ]),
    question("g9e2", ["Which negative is correct?", "Which negative is correct?"], ["Did not-ийн араас суурь үйл үг.", "After did not, use the base verb."], ["She did not go.", "She did not go."], [
      ["She did not went.", "She did not went.", "Went давхардсан.", "Went repeats the past marking."],
      ["She did not goes.", "She did not goes.", "Goes одоо цагийн хэлбэр.", "Goes is a present form."],
      ["She not went.", "She not went.", "Did дутуу.", "Did is missing."],
    ]),
    question("g9e3", ["Which sentence is past simple?", "Which sentence is past simple?"], ["Yesterday дууссан цагийг заана.", "Yesterday marks a finished time."], ["They watched a film yesterday.", "They watched a film yesterday."], [
      ["They watch a film every day.", "They watch a film every day.", "Every day нь дадал, одоо цаг.", "Every day marks a habit in the present."],
      ["They are watching a film.", "They are watching a film.", "Энэ одоо үргэлжилж буй цаг.", "This is the present continuous."],
      ["They will watch a film.", "They will watch a film.", "Will ирээдүй.", "Will is the future."],
    ]),
    question("g9e4", ["What is the past of play?", "What is the past of play?"], ["Жигд үйл үг -ed авна.", "A regular verb takes -ed."], ["played", "played"], [
      ["plays", "plays", "Энэ одоо цаг.", "This is the present."],
      ["playing", "playing", "Энэ -ing.", "This is the -ing form."],
      ["play", "play", "Суурь хэлбэр өнгөрснийг заахгүй.", "The base form does not mark the past."],
    ]),
  ]),
  lesson(9, "history", "g9-history-1911", ["1911 оны тусгаар тогтнол", "Independence in 1911"], ["1911 онд Богд хаант Монгол улс байгуулагдсан.", "The Bogd Khaan state was established in 1911."], [
    ["1911 онд Монгол Манжаас тусгаарлагдаж, Богд хаант улсыг тунхагласан.", "In 1911 Mongolia separated from Qing rule and proclaimed the Bogd Khaan state."],
    ["Энэ үйл явдал 1206, 1921, 1990 оноос өөр. Он бүхэн өөр түүхэн үе.", "This event is distinct from 1206, 1921, and 1990. Each year belongs to a different period."],
  ], [
    question("g9h1", ["Богд хаант Монгол улс хэдэн онд тунхаглагдсан бэ?", "When was the Bogd Khaan state proclaimed?"], ["1911.", "1911."], ["1911", "1911"], [
      ["1206", "1206", "Энэ Их Монгол Улсын он.", "That is the founding of the Mongol state."],
      ["1921", "1921", "Энэ хувьсгалын он.", "That is the revolution."],
      ["1992", "1992", "Энэ шинэ Үндсэн хуулийн он.", "That is the new constitution."],
    ]),
    question("g9h2", ["1911 онд Монгол юунаас тусгаарлагдсан бэ?", "From what did Mongolia separate in 1911?"], ["Манжын ноёрхлоос.", "From Qing rule."], ["Манжын ноёрхол", "Qing rule"], [
      ["НҮБ", "The United Nations", "НҮБ 1911 онд байгаагүй.", "The United Nations did not exist in 1911."],
      ["Европын холбоо", "The European Union", "Энэ хожуу үеийн байгууллага.", "That organisation comes much later."],
      ["Өөрийн аймгаас", "From its own provinces", "Тусгаарлалт гадаад ноёрхлоос.", "The separation was from outside rule."],
    ]),
    question("g9h3", ["1911 оны төрийн тэргүүнийг юу гэж нэрлэсэн бэ?", "What title did the head of the 1911 state hold?"], ["Богд хаан.", "Bogd Khaan."], ["Богд хаан", "Bogd Khaan"], [
      ["Ерөнхийлөгч", "President", "Ерөнхийлөгчийн төр хожим.", "A presidency comes later."],
      ["Чингис хаан", "Chinggis Khaan", "Чингис XIII зууны үе.", "Chinggis belongs to the thirteenth century."],
      ["Сайд нарын зөвлөл", "A cabinet", "Сайд нар төрийн тэргүүний цол биш.", "A cabinet is not the sovereign's title."],
    ]),
    question("g9h4", ["1921 он 1911 оноос юугаараа өөр вэ?", "How is 1921 different from 1911?"], ["1921 бол хувьсгалын он.", "1921 is the year of the revolution."], ["Хувьсгал", "A revolution"], [
      ["Яг ижил үйл явдал", "The same event", "Он ба үйл явдал өөр.", "The years and the events differ."],
      ["Эзэнт гүрэн байгуулагдсан", "The empire was founded", "Эзэнт гүрэн 1206 онд.", "The empire was founded in 1206."],
      ["Үндсэн хууль баталсан", "A constitution was adopted", "Шинэ Үндсэн хууль 1992 онд.", "The new constitution is 1992."],
    ]),
  ]),
  lesson(9, "geography", "g9-geography-climate", ["Монголын уур амьсгал", "Mongolia's climate"], ["Эх газрын эрс тэс уур амьсгалтай.", "The climate is an extreme continental climate."], [
    ["Өвөл хүйтэн, зун богино, хур тунадас бага. Нийлбэр хур тунадасны ихэнх нь зуны сард орно.", "Winters are cold, summers are short, and precipitation is low. Most of the yearly rain falls in summer."],
    ["Өндөрлөг, далайгаас алслагдсан байдал температурын зөрүүг ихэсгэнэ.", "High elevation and distance from the sea increase the temperature range."],
  ], [
    question("g9g1", ["Монголын уур амьсгалыг юу гэж нэрлэдэг вэ?", "How is Mongolia's climate described?"], ["Эх газрын эрс тэс.", "Extreme continental."], ["Эх газрын эрс тэс", "Extreme continental"], [
      ["Далайн дулаан", "Warm maritime", "Монгол далайгаас алслагдсан.", "Mongolia is far from the sea."],
      ["Экваторын", "Equatorial", "Экватор халуун, чийглэг бүс.", "The equator is hot and humid."],
      ["Зөвхөн халуун орны", "Only tropical", "Өвөл хүйтэн тул халуун орны бүс биш.", "Cold winters mean it is not tropical."],
    ]),
    question("g9g2", ["Хур тунадасны ихэнх нь хэзээ ордог вэ?", "When does most precipitation fall?"], ["Зуны сард.", "In the summer months."], ["Зун", "Summer"], [
      ["Зөвхөн өвлийн дунд", "Only in midwinter", "Өвөлд цас бага, жилийн ихэнх тунадас зун орно.", "Winter snow is limited. Most precipitation is summer rain."],
      ["Өдөр бүр тэнцүү", "Equally every day", "Улирлын зөрүү их.", "The seasons are uneven."],
      ["Зөвхөн шөнө", "Only at night", "Цаг биш улирал ялгана.", "The difference is seasonal, not hourly."],
    ]),
    question("g9g3", ["Далайгаас алслагдсан нь юунд нөлөөлдөг вэ?", "What does distance from the sea affect?"], ["Температурын зөрүүг ихэсгэнэ.", "It increases the temperature range."], ["Температурын зөрүү", "The temperature range"], [
      ["Далайн түрлэгийг", "The ocean tide", "Түрлэг далайн эрэгт.", "Tides belong to a coast."],
      ["Шүрэн арлыг", "Coral islands", "Шүр Монголд байхгүй.", "Mongolia has no coral islands."],
      ["Давсны усыг", "Salt water", "Далайн ус энд ирдэггүй.", "Sea water does not reach here."],
    ]),
    question("g9g4", ["Өвөл, зуны ялгаа ямар вэ?", "What is the winter and summer contrast?"], ["Өвөл хүйтэн, зун богино.", "Winter is cold and summer is short."], ["Өвөл хүйтэн, зун богино", "Cold winter, short summer"], [
      ["Жилийн турш адил дулаан", "Warm all year", "Эрс тэс тул адил биш.", "An extreme climate is not even."],
      ["Зун л хүйтэн", "Only summer is cold", "Хүйтэн нь өвөл.", "The cold season is winter."],
      ["Өвөл бороо их", "Winter has the most rain", "Бороо зунд илүү.", "Rain is greater in summer."],
    ]),
  ]),
  lesson(10, "math", "g10-math-function", ["Шугаман функц", "Linear functions"], ["f(x) = kx + b хэлбэрийн функцийн график шулуун.", "The graph of f(x) = kx + b is a straight line."], [
    ["k нь налуу. k эерэг бол өснө, сөрөг бол буурна. b нь y тэнхлэгийг огтлох цэг.", "k is the slope. A positive k rises and a negative k falls. b is the y-intercept."],
    ["f(a)-г олохдоо x-ийн оронд a-г тавина.", "To find f(a), substitute a for x."],
  ], [
    question("g10m1", ["f(x) = 2x + 1. f(3) хэд вэ?", "f(x) = 2x + 1. What is f(3)?"], ["2 · 3 + 1 = 7.", "2 · 3 + 1 = 7."], ["7", "7"], [
      ["6", "6", "1-ийг нэмээгүй.", "1 was not added."],
      ["5", "5", "2 ба 3-ыг нэмсэн.", "2 and 3 were added."],
      ["8", "8", "1-ийг үржүүлсэн.", "1 was multiplied in."],
    ]),
    question("g10m2", ["f(x) = −x + 4 функцийн график ямар вэ?", "What does the graph of f(x) = −x + 4 do?"], ["Налуу сөрөг тул буурна.", "The slope is negative, so the line falls."], ["Буурна", "It falls"], [
      ["Өснө", "It rises", "Өсөхөд k эерэг байна.", "A rising line has a positive k."],
      ["Хэвтээ", "It is horizontal", "Хэвтээ шулуунд k = 0.", "A horizontal line has k = 0."],
      ["Босоо", "It is vertical", "Босоо шулуун функц биш.", "A vertical line is not a function of this form."],
    ]),
    question("g10m3", ["f(x) = 3x − 2 y тэнхлэгийг хаана огтлох вэ?", "Where does f(x) = 3x − 2 cross the y-axis?"], ["x = 0 үед y = −2.", "When x = 0, y = −2."], ["−2", "−2"], [
      ["3", "3", "Налууг огтлол гэж авсан.", "The slope was used as the intercept."],
      ["2", "2", "Тэмдгийг хассан.", "The sign was dropped."],
      ["0", "0", "b-г тооцоогүй.", "b was ignored."],
    ]),
    question("g10m4", ["Налуу 0 бол график ямар вэ?", "What is the graph when the slope is 0?"], ["Хэвтээ шулуун.", "A horizontal line."], ["Хэвтээ", "Horizontal"], [
      ["Босоо", "Vertical", "Босоо шулуун k-аар бичигдэхгүй.", "A vertical line is not written with this k."],
      ["Парабол", "A parabola", "Парабол квадрат функц.", "A parabola is a quadratic."],
      ["Цэг", "A single point", "Тогтмол функц шулуун хэвээр.", "A constant function is still a line."],
    ]),
  ]),
  lesson(10, "physics", "g10-physics-density", ["Нягт", "Density"], ["Нягт ρ = m / V.", "Density is ρ = m / V."], [
    ["Масс их, эзлэхүүн бага бол нягт их. Нэгж нь кг/м³.", "A large mass in a small volume means a high density. The unit is kg/m³."],
    ["Масс m = ρ · V. Эзлэхүүн V = m / ρ.", "Mass is m = ρ · V. Volume is V = m / ρ."],
  ], [
    question("g10p1", ["Масс 4 кг, эзлэхүүн 2 м³. Нягт хэд вэ?", "Mass 4 kg, volume 2 m³. What is the density?"], ["4 / 2 = 2 кг/м³.", "4 / 2 = 2 kg/m³."], ["2 кг/м³", "2 kg/m³"], [
      ["8 кг/м³", "8 kg/m³", "Үржүүлсэн.", "The values were multiplied."],
      ["6 кг/м³", "6 kg/m³", "Нэмсэн.", "The values were added."],
      ["0.5 кг/м³", "0.5 kg/m³", "Эзлэхүүнийг массад хуваасан.", "Volume was divided by mass."],
    ]),
    question("g10p2", ["Нягт 3 кг/м³, эзлэхүүн 5 м³. Масс хэд вэ?", "Density 3 kg/m³, volume 5 m³. What is the mass?"], ["m = 3 · 5 = 15 кг.", "m = 3 · 5 = 15 kg."], ["15 кг", "15 kg"], [
      ["1.67 кг", "1.67 kg", "Хуваасан.", "The values were divided."],
      ["8 кг", "8 kg", "Нэмсэн.", "The values were added."],
      ["2 кг", "2 kg", "Хассан.", "The values were subtracted."],
    ]),
    question("g10p3", ["Нягтын нэгж аль вэ?", "Which is a unit of density?"], ["кг/м³.", "kg/m³."], ["кг/м³", "kg/m³"], [
      ["м/с", "m/s", "Энэ хурд.", "That is speed."],
      ["Н", "N", "Энэ хүч.", "That is force."],
      ["Ж", "J", "Энэ энерги.", "That is energy."],
    ]),
    question("g10p4", ["Ижил масстай биеийн эзлэхүүн багассан. Нягт яах вэ?", "The volume of a body falls while its mass stays the same. What happens to density?"], ["Нягт өснө.", "Density rises."], ["Өснө", "It rises"], [
      ["Буурна", "It falls", "Хуваагч багасахад бүхэл өснө.", "A smaller denominator makes the quotient larger."],
      ["Тэг болно", "It becomes zero", "Масс байсаар байвал нягт тэг биш.", "Density is not zero while mass remains."],
      ["Өөрчлөгдөхгүй", "It stays the same", "Эзлэхүүн өөрчлөгдсөн тул нягт өөрчлөгдөнө.", "Volume changed, so density changes."],
    ]),
  ]),
  lesson(10, "chemistry", "g10-chemistry-mole", ["Моль", "The mole"], ["n = m / M. m масс, M молийн масс.", "n = m / M. m is mass and M is molar mass."], [
    ["1 моль бодис 6.02 × 10²³ ширхэг бөөм агуулна. Үүнийг Авогадрогийн тоо гэнэ.", "One mole contains 6.02 × 10²³ particles. That number is Avogadro's number."],
    ["Масс m = n · M. Молийн масс г/моль-оор байна.", "Mass is m = n · M. Molar mass is in g/mol."],
  ], [
    question("g10c1", ["Усны молийн масс 18 г/моль. 36 г ус хэдэн моль вэ?", "Water's molar mass is 18 g/mol. How many moles are in 36 g?"], ["36 / 18 = 2 моль.", "36 / 18 = 2 mol."], ["2 моль", "2 mol"], [
      ["54 моль", "54 mol", "Нэмсэн.", "The values were added."],
      ["648 моль", "648 mol", "Үржүүлсэн.", "The values were multiplied."],
      ["0.5 моль", "0.5 mol", "18-ыг 36-д хуваасан.", "18 was divided by 36."],
    ]),
    question("g10c2", ["n = 3 моль, M = 12 г/моль. Масс хэд вэ?", "n = 3 mol, M = 12 g/mol. What is the mass?"], ["3 · 12 = 36 г.", "3 · 12 = 36 g."], ["36 г", "36 g"], [
      ["4 г", "4 g", "Хуваасан.", "The values were divided."],
      ["15 г", "15 g", "Нэмсэн.", "The values were added."],
      ["9 г", "9 g", "Хассан.", "The values were subtracted."],
    ]),
    question("g10c3", ["Авогадрогийн тоо юуг заах вэ?", "What does Avogadro's number count?"], ["1 моль дахь бөөмийн тоо.", "The particles in 1 mole."], ["1 молийн бөөм", "Particles in 1 mole"], [
      ["1 грамм дахь градус", "Degrees in 1 gram", "Грамм температурын нэгж биш.", "A gram is not a temperature."],
      ["1 литр усны өнгө", "The colour of 1 litre", "Өнгө тоо биш.", "Colour is not this count."],
      ["1 секунд дахь метр", "Metres in 1 second", "Энэ хурдны ойлголт.", "That is a speed."],
    ]),
    question("g10c4", ["Молийн массын нэгж аль вэ?", "Which is the unit of molar mass?"], ["г/моль.", "g/mol."], ["г/моль", "g/mol"], [
      ["моль/г", "mol/g", "Энэ урвуу харьцаа.", "That is the inverse."],
      ["м/с", "m/s", "Энэ хурд.", "That is speed."],
      ["Н", "N", "Энэ хүч.", "That is force."],
    ]),
  ]),
  lesson(10, "biology", "g10-biology-dna", ["ДНХ-ийн суурь", "DNA bases"], ["A нь T-тэй, G нь C-тэй хослоно.", "A pairs with T, and G pairs with C."], [
    ["ДНХ-ийн суурь аденин, тимин, гуанин, цитозин. Аденин тиминтэй, гуанин цитозинтой холбогдоно.", "The DNA bases are adenine, thymine, guanine, and cytosine. Adenine pairs with thymine, and guanine with cytosine."],
    ["Нэг хэлхээний дараалал нөгөөг нь заана. A-ийн эсрэг T, G-ийн эсрэг C байна.", "One strand determines the other. A is opposite T, and G is opposite C."],
  ], [
    question("g10b1", ["Аденины эсрэг аль суурь вэ?", "Which base pairs with adenine?"], ["Тимин.", "Thymine."], ["Тимин", "Thymine"], [
      ["Гуанин", "Guanine", "Гуанин цитозинтой хослоно.", "Guanine pairs with cytosine."],
      ["Цитозин", "Cytosine", "Цитозин гуанинтай хослоно.", "Cytosine pairs with guanine."],
      ["Аденин", "Adenine", "Аденин өөртэйгөө хослохгүй.", "Adenine does not pair with itself."],
    ]),
    question("g10b2", ["Гуанины эсрэг аль суурь вэ?", "Which base pairs with guanine?"], ["Цитозин.", "Cytosine."], ["Цитозин", "Cytosine"], [
      ["Тимин", "Thymine", "Тимин аденинтай хослоно.", "Thymine pairs with adenine."],
      ["Аденин", "Adenine", "Аденин тиминтэй хослоно.", "Adenine pairs with thymine."],
      ["Урацил", "Uracil", "Урацил РНХ-д байдаг.", "Uracil belongs to RNA."],
    ]),
    question("g10b3", ["Нэг хэлхээ ATGC бол нөгөө хэлхээ аль вэ?", "If one strand is ATGC, what is the other?"], ["A-T, T-A, G-C, C-G.", "A-T, T-A, G-C, C-G."], ["TACG", "TACG"], [
      ["ATGC", "ATGC", "Ижил хэлхээ хос биш.", "The same strand is not the complement."],
      ["CGTA", "CGTA", "Хосууд солигдсон.", "The pairs were swapped."],
      ["GCTA", "GCTA", "Дараалал урвуу боловч хос биш.", "This reverses the order without pairing."],
    ]),
    question("g10b4", ["Урацил хаана байдаг вэ?", "Where is uracil found?"], ["РНХ-д.", "In RNA."], ["РНХ", "RNA"], [
      ["ДНХ-ийн A-ийн хос", "As DNA's pair for A", "ДНХ-д A-ийн хос тимин.", "In DNA, adenine pairs with thymine."],
      ["Эсийн хананд", "In the cell wall", "Хана суурь биш.", "The wall is not a base."],
      ["Усны молекулд", "In a water molecule", "Ус H₂O.", "Water is H₂O."],
    ]),
  ]),
  lesson(10, "mongolian", "g10-mongolian-main-idea", ["Эх бичвэрийн гол санаа", "The main idea of a text"], ["Гол санааг гарчиг, эхний өгүүлбэр, давтагдсан ухагдхуунаар олно.", "Find the main idea in the title, the opening, and repeated points."], [
    ["Нэг баримт бүхэл текстийн гол санаа биш байж болно. Бүх догол мөрийг холбосон санааг авна.", "One fact can be a detail. The main idea is the point that ties the paragraphs together."],
    ["Зохиогчийн зорилго мэдээлэх, итгүүлэх, ятгах аль нь болохыг ялгана.", "Tell whether the writer wants to inform, argue, or persuade."],
  ], [
    question("g10n1", ["Гол санааг юунаас ялгах вэ?", "What is a main idea distinguished from?"], ["Нэг жижиг баримтаас.", "From one small fact."], ["Нэг баримт", "One fact"], [
      ["Гарчгаас", "From the title", "Гарчиг гол санаанд ойр байж болно.", "The title can point to the main idea."],
      ["Текстийн зорилгоос", "From the purpose", "Зорилго санааг тодруулна.", "Purpose helps reveal the idea."],
      ["Давтагдсан санаанаас", "From a repeated point", "Давталт гол санааг заана.", "Repetition often marks the main idea."],
    ]),
    question("g10n2", ["Зөвхөн нэг тоо дурдсан текстэд гол санаа нь юу байх вэ?", "In a text that mentions one number, what is the main idea?"], ["Тоог холбосон ерөнхий санаа.", "The general point that uses the number."], ["Ерөнхий санаа", "The general point"], [
      ["Зөвхөн тэр тоо", "Only that number", "Тоо баримт. Санаа биш байж болно.", "A number can be a detail rather than the idea."],
      ["Эхний үг", "The first word", "Нэг үг санаа болохгүй.", "One word is not the idea."],
      ["Зургийн өнгө", "The colour of a picture", "Өнгө текстийн санаа биш.", "Colour is not the text's idea."],
    ]),
    question("g10n3", ["Ятгах зорилготой текст юу хийх гээд байгаа вэ?", "What does a persuasive text try to do?"], ["Уншигчийн байр суурийг өөрчлөх.", "Change the reader's position."], ["Байр суурийг өөрчлөх", "Change a position"], [
      ["Зөвхөн жагсаалт өгөх", "Only give a list", "Жагсаалт мэдээлэл байж болно.", "A list can simply inform."],
      ["Үгийг орчуулах", "Translate words", "Орчуулга өөр зорилго.", "Translation is a different purpose."],
      ["Цаасыг тоолох", "Count the pages", "Хуудасны тоо зорилго биш.", "A page count is not the purpose."],
    ]),
    question("g10n4", ["Давтагдсан ухагдхуун юуг заах вэ?", "What does a repeated idea show?"], ["Зохиогчийн онцолсон санаа.", "The point the writer stresses."], ["Онцолсон санаа", "The stressed point"], [
      ["Алдаа", "A mistake", "Давталт бүр алдаа биш.", "Repetition is not always an error."],
      ["Хаяг", "An address", "Хаяг давтагдсан санаа биш.", "An address is not the repeated idea."],
      ["Огноо", "A date", "Огноо баримт.", "A date is a fact."],
    ]),
  ]),
  lesson(10, "english", "g10-english-passive", ["Passive voice", "Passive voice"], ["be + past participle. Үйлдэгч by-гоор орж болно.", "Use be plus the past participle. The doer can follow by."], [
    ["Идэвхтэй: The class wrote the report. Идэвхгүй: The report was written by the class.", "Active: The class wrote the report. Passive: The report was written by the class."],
    ["Өнгөрсөн цагт was, were. Одоо цагт is, are. Үйл үг participle хэвээр.", "Past uses was or were. Present uses is or are. The verb stays a participle."],
  ], [
    question("g10e1", ["Which sentence is passive?", "Which sentence is passive?"], ["was written нь be + participle.", "was written is be plus a participle."], ["The report was written.", "The report was written."], [
      ["The class wrote the report.", "The class wrote the report.", "Энэ идэвхтэй.", "This is active."],
      ["The class is writing.", "The class is writing.", "Энэ одоо үргэлжилж буй идэвхтэй.", "This is active and continuous."],
      ["Write the report.", "Write the report.", "Энэ тушаал.", "This is a command."],
    ]),
    question("g10e2", ["“They clean the lab” пассив аль вэ?", "Which is the passive of “They clean the lab”?"], ["The lab is cleaned.", "The lab is cleaned."], ["The lab is cleaned.", "The lab is cleaned."], [
      ["The lab cleaned.", "The lab cleaned.", "be дутуу.", "be is missing."],
      ["The lab is clean.", "The lab is clean.", "Clean энд тэмдэг нэр.", "Clean is an adjective here."],
      ["The lab cleans.", "The lab cleans.", "Лаборатори үйлдэгч болсон.", "The lab became the doer."],
    ]),
    question("g10e3", ["Үйлдэгчийг пассивд яаж оруулах вэ?", "How is the doer added in the passive?"], ["by-гоор.", "With by."], ["by", "by"], [
      ["to", "to", "to чиглэл, хүлээн авагчид ойр.", "to marks a direction or a recipient."],
      ["of", "of", "of харьяалал.", "of marks possession."],
      ["than", "than", "than харьцуулалт.", "than marks a comparison."],
    ]),
    question("g10e4", ["Өнгөрсөн пассивд аль туслах вэ?", "Which auxiliary fits a past passive?"], ["was эсвэл were.", "was or were."], ["was", "was"], [
      ["do", "do", "do одоо цагийн үгүйсгэлд.", "do is used in present negatives."],
      ["will", "will", "will ирээдүй.", "will is future."],
      ["been дангаараа", "been alone", "been-ийн өмнө have хэрэгтэй.", "been needs have before it."],
    ]),
  ]),
  lesson(10, "history", "g10-history-1921", ["1921 оны хувьсгал", "The 1921 revolution"], ["1921 он 1911 оны тусгаар тогтнолоос хойших өөр үе.", "1921 is a later period than the independence of 1911."], [
    ["1921 оны хувьсгал Монголд шинэ төрийн үеийг нээсэн.", "The 1921 revolution opened a new period of government in Mongolia."],
    ["1911 он тусгаарлалт, 1921 он хувьсгал, 1990 он ардчилсан өөрчлөлт.", "1911 is independence, 1921 is the revolution, and 1990 is the democratic change."],
  ], [
    question("g10h1", ["1921 онд юу болсон бэ?", "What happened in 1921?"], ["Хувьсгал.", "A revolution."], ["Хувьсгал", "A revolution"], [
      ["Их Монгол Улс байгуулагдсан", "The Mongol state was founded", "Энэ 1206 он.", "That was 1206."],
      ["Богд хаант улс тунхаглагдсан", "The Bogd state was proclaimed", "Энэ 1911 он.", "That was 1911."],
      ["Ардчилсан хувьсгал", "The democratic revolution", "Энэ 1990 он.", "That was 1990."],
    ]),
    question("g10h2", ["1911 ба 1921 оны ялгаа аль вэ?", "Which difference between 1911 and 1921 is right?"], ["1911 тусгаарлалт, 1921 хувьсгал.", "1911 is independence and 1921 is the revolution."], ["Тусгаарлалт, дараа нь хувьсгал", "Independence, then revolution"], [
      ["Хоёр он ижил", "The years are the same", "10 жилийн зөрүүтэй.", "They are ten years apart."],
      ["1921 илүү эрт", "1921 is earlier", "1921 хойшхи он.", "1921 is the later year."],
      ["1911 бол Үндсэн хууль", "1911 is the constitution", "Үндсэн хуулийн шинэ үе 1992.", "The new constitution is 1992."],
    ]),
    question("g10h3", ["1990 он аль үйл явдал вэ?", "Which event is 1990?"], ["Ардчилсан хувьсгал.", "The democratic revolution."], ["Ардчилсан хувьсгал", "The democratic revolution"], [
      ["1206", "1206", "Энэ эзэнт гүрний эх.", "That is the start of the empire."],
      ["1911", "1911", "Энэ Богд хаант улс.", "That is the Bogd Khaan state."],
      ["1921", "1921", "Энэ өмнөх хувьсгал.", "That is the earlier revolution."],
    ]),
    question("g10h4", ["Он цээжлэхэд юуг ялгах вэ?", "What should be kept apart when learning the years?"], ["Үйл явдлын нэр, он.", "The name of the event and its year."], ["Нэр ба он", "Name and year"], [
      ["Зөвхөн сар", "Only the month", "Эдгээр түлхүүр он жилээр ялгагдана.", "These key events are distinguished by year."],
      ["Зөвхөн өнгө", "Only a colour", "Өнгө түүхэн он биш.", "Colour is not the historical year."],
      ["Зөвхөн газрын зураг", "Only a map", "Газрын зураг онг орлохгүй.", "A map does not replace the year."],
    ]),
  ]),
  lesson(10, "geography", "g10-geography-coordinates", ["Өргөрөг, уртраг", "Latitude and longitude"], ["Өргөрөг экватороос хойш, урагш. Уртраг голчидоос зүүн, баруун.", "Latitude runs north and south of the equator. Longitude runs east and west of the prime meridian."], [
    ["Өргөрөг 0° нь экватор. Уртраг 0° нь Гринвичийн голчид.", "Latitude 0° is the equator. Longitude 0° is the Greenwich meridian."],
    ["Монгол хойд хагас бөмбөрцөгт, зүүн уртрагт оршино.", "Mongolia lies in the northern hemisphere and in east longitude."],
  ], [
    question("g10g1", ["Өргөрөг 0° юу вэ?", "What is latitude 0°?"], ["Экватор.", "The equator."], ["Экватор", "The equator"], [
      ["Гринвич", "Greenwich", "Гринвич уртраг 0°.", "Greenwich is longitude 0°."],
      ["Хойд туйл", "The North Pole", "Хойд туйл өргөргийн 90°.", "The North Pole is latitude 90°."],
      ["Олон улсын өдөр солигдох шугам", "The date line", "Өдөр солигдох шугам уртрагтай холбоотой.", "The date line is a longitude."],
    ]),
    question("g10g2", ["Уртраг 0° хаана вэ?", "Where is longitude 0°?"], ["Гринвичийн голчид.", "The Greenwich meridian."], ["Гринвич", "Greenwich"], [
      ["Экватор", "The equator", "Экватор өргөрөг.", "The equator is latitude."],
      ["Өмнөд туйл", "The South Pole", "Туйл өргөрөг.", "The pole is a latitude."],
      ["Говь", "The Gobi", "Говь газар нутаг. Голчид биш.", "The Gobi is a region, not the prime meridian."],
    ]),
    question("g10g3", ["Монгол аль хагас бөмбөрцөгт вэ?", "Which hemisphere is Mongolia in?"], ["Хойд.", "The northern hemisphere."], ["Хойд", "Northern"], [
      ["Өмнөд", "Southern", "Монгол экваторын хойд талд.", "Mongolia is north of the equator."],
      ["Зөвхөн баруун", "Only western", "Монгол зүүн уртрагт.", "Mongolia is in east longitude."],
      ["Экватор дээр", "On the equator", "Экватор халуун бүс.", "The equator is the tropical belt."],
    ]),
    question("g10g4", ["Хойш, урагш хэмждэг шугам аль вэ?", "Which lines measure north and south?"], ["Өргөрөг.", "Latitude."], ["Өргөрөг", "Latitude"], [
      ["Уртраг", "Longitude", "Уртраг зүүн, баруун.", "Longitude measures east and west."],
      ["Түвшин", "Contour", "Түвшин өндөр заана.", "Contours show height."],
      ["Хил", "A border", "Хил улс төрийн шугам.", "A border is a political line."],
    ]),
  ]),
  lesson(11, "math", "g11-math-quadratic", ["Квадрат тэгшитгэл", "Quadratic equations"], ["x² − 5x + 6 = 0 тэгшитгэлийн язгуур 2 ба 3.", "The roots of x² − 5x + 6 = 0 are 2 and 3."], [
    ["(x − 2)(x − 3) = x² − 5x + 6. Тэгтэй тэнцүү үед язгуур 2, 3.", "(x − 2)(x − 3) = x² − 5x + 6. Set equal to zero and the roots are 2 and 3."],
    ["Язгууруудын нийлбэр коэффициентээс эсрэг тэмдэгтэй, үржвэр чөлөөт гишүүнтэй тэнцэнэ.", "The sum of the roots is the opposite of the middle coefficient, and the product equals the constant term."],
  ], [
    question("g11m1", ["x² − 5x + 6 = 0-ийн язгуурууд аль вэ?", "What are the roots of x² − 5x + 6 = 0?"], ["2 ба 3.", "2 and 3."], ["2 ба 3", "2 and 3"], [
      ["1 ба 6", "1 and 6", "Үржвэр 6 боловч нийлбэр 5 биш.", "The product is 6, but the sum is not 5."],
      ["−2 ба −3", "−2 and −3", "Тэмдэг урвуу. Нийлбэр +5 байх ёстой.", "The signs are reversed. The sum must be +5."],
      ["5 ба 6", "5 and 6", "Коэффициентийг язгуур гэж авсан.", "The coefficients were used as roots."],
    ]),
    question("g11m2", ["(x − 2)(x − 3) задрахад аль гишүүн гардаг вэ?", "Which expression expands from (x − 2)(x − 3)?"], ["x² − 5x + 6.", "x² − 5x + 6."], ["x² − 5x + 6", "x² − 5x + 6"], [
      ["x² − 5x − 6", "x² − 5x − 6", "Чөлөөт гишүүний тэмдэг буруу.", "The constant term has the wrong sign."],
      ["x² + 5x + 6", "x² + 5x + 6", "Дундах тэмдэг буруу.", "The middle sign is wrong."],
      ["x² − 6", "x² − 6", "Дундах гишүүн алга.", "The middle term is missing."],
    ]),
    question("g11m3", ["Язгуурууд 2, 3 бол үржвэр хэд вэ?", "If the roots are 2 and 3, what is their product?"], ["6.", "6."], ["6", "6"], [
      ["5", "5", "Энэ нийлбэр.", "That is the sum."],
      ["1", "1", "Хассан.", "The roots were subtracted."],
      ["−6", "−6", "Тэмдэг нэмсэн.", "A sign was added."],
    ]),
    question("g11m4", ["x = 2 язгуур мөн эсэхийг яаж шалгах вэ?", "How is x = 2 checked as a root?"], ["Тэгшитгэлд орлуулж 0 гаргана.", "Substitute it and get 0."], ["Орлуулж 0 гарна", "Substitute and get 0"], [
      ["Зөвхөн графикаар таах", "Only guess from a sketch", "Орлуулалт шалгалт.", "Substitution is the check."],
      ["Коэффициентийг нэмэх", "Add the coefficients", "Нэмэх нь орлуулалт биш.", "Adding is not substitution."],
      ["x-ийг хасах", "Delete x", "Үл мэдэгдэгчийг хасахгүй.", "The unknown is not deleted."],
    ]),
  ]),
  lesson(11, "physics", "g11-physics-ohm", ["Омын хууль", "Ohm's law"], ["V = I · R.", "V = I · R."], [
    ["Хүчдэл гүйдэл ба эсэргүүцлийн үржвэр. Гүйдэл I = V / R. Эсэргүүцэл R = V / I.", "Voltage is current times resistance. Current is I = V / R. Resistance is R = V / I."],
    ["Нэгж: хүчдэл вольт, гүйдэл ампер, эсэргүүцэл ом.", "The units are volts, amperes, and ohms."],
  ], [
    question("g11p1", ["Гүйдэл 2 А, эсэргүүцэл 5 Ом. Хүчдэл хэд вэ?", "Current 2 A, resistance 5 Ω. What is the voltage?"], ["V = 2 · 5 = 10 В.", "V = 2 · 5 = 10 V."], ["10 В", "10 V"], [
      ["2.5 В", "2.5 V", "Хуваасан.", "The values were divided."],
      ["7 В", "7 V", "Нэмсэн.", "The values were added."],
      ["3 В", "3 V", "Хассан.", "The values were subtracted."],
    ]),
    question("g11p2", ["12 В, 4 Ом. Гүйдэл хэд вэ?", "12 V across 4 Ω. What is the current?"], ["I = 12 / 4 = 3 А.", "I = 12 / 4 = 3 A."], ["3 А", "3 A"], [
      ["48 А", "48 A", "Үржүүлсэн.", "The values were multiplied."],
      ["16 А", "16 A", "Нэмсэн.", "The values were added."],
      ["8 А", "8 A", "Хассан.", "The values were subtracted."],
    ]),
    question("g11p3", ["Эсэргүүцлийн нэгж аль вэ?", "Which unit is resistance?"], ["Ом.", "The ohm."], ["Ом", "Ohm"], [
      ["Вольт", "Volt", "Вольт хүчдэл.", "The volt is voltage."],
      ["Ампер", "Ampere", "Ампер гүйдэл.", "The ampere is current."],
      ["Ватт", "Watt", "Ватт чадал.", "The watt is power."],
    ]),
    question("g11p4", ["Хүчдэл тогтмол, эсэргүүцэл ихсэвэл гүйдэл яах вэ?", "Voltage stays the same and resistance rises. What happens to current?"], ["Гүйдэл буурна.", "Current falls."], ["Буурна", "It falls"], [
      ["Өснө", "It rises", "Хуваагч ихсэхэд гүйдэл буурна.", "A larger denominator makes the current smaller."],
      ["Тэг болж хүчдэл өснө", "It becomes zero and voltage rises", "Хүчдэл тогтмол гэсэн.", "The voltage was kept constant."],
      ["Өөрчлөгдөхгүй", "It stays the same", "R өөрчлөгдсөн.", "R changed."],
    ]),
  ]),
  lesson(11, "chemistry", "g11-chemistry-ph", ["pH", "pH"], ["pH 7 саармаг, 7-оос бага хүчил, 7-оос их суурь.", "pH 7 is neutral, below 7 is acidic, and above 7 is basic."], [
    ["pH устөрөгчийн ионы хэмжээг заана. Утга багасах тусам хүчиллэг нэмэгдэнэ.", "pH reports hydrogen ions. A lower value means a stronger acid."],
    ["Цэвэр ус ойролцоогоор 7. Ходоодны хүчил бага pH-тай, саван суурь талдаа.", "Pure water is about 7. Stomach acid has a low pH, and soap is on the basic side."],
  ], [
    question("g11c1", ["pH 3 ямар уусмал вэ?", "What kind of solution has pH 3?"], ["Хүчил.", "An acid."], ["Хүчил", "Acid"], [
      ["Саармаг", "Neutral", "Саармаг 7.", "Neutral is 7."],
      ["Суурь", "Base", "Суурь 7-оос их.", "A base is above 7."],
      ["Зөвхөн металл", "Only a metal", "pH уусмалын шинж.", "pH describes a solution."],
    ]),
    question("g11c2", ["pH 7 юу вэ?", "What is pH 7?"], ["Саармаг.", "Neutral."], ["Саармаг", "Neutral"], [
      ["Хамгийн хүчтэй хүчил", "The strongest acid", "Хүчтэй хүчил бага pH.", "A strong acid has a low pH."],
      ["Хамгийн хүчтэй суурь", "The strongest base", "Хүчтэй суурь өндөр pH.", "A strong base has a high pH."],
      ["Хатуу бодис", "A solid", "pH уусмалд хамаарна.", "pH applies to a solution."],
    ]),
    question("g11c3", ["pH 2 ба pH 5-ын аль нь илүү хүчиллэг вэ?", "Which is more acidic, pH 2 or pH 5?"], ["pH 2.", "pH 2."], ["pH 2", "pH 2"], [
      ["pH 5", "pH 5", "Тоо их байх тусам хүчил сулрана.", "A higher number is less acidic."],
      ["Хоёр тэнцүү", "They are equal", "3 нэгжийн зөрүү бий.", "They differ by 3 units."],
      ["Хоёул суурь", "Both are bases", "Хоёул 7-оос бага.", "Both are below 7."],
    ]),
    question("g11c4", ["Савангийн уусмал аль талд байх вэ?", "Which side is a soap solution on?"], ["Суурийн талд.", "The basic side."], ["Суурь", "Basic"], [
      ["Хүчтэй хүчил", "A strong acid", "Саван хүчил биш.", "Soap is not an acid."],
      ["pH 1", "pH 1", "pH 1 маш хүчиллэг.", "pH 1 is strongly acidic."],
      ["Хатуу давс зөвхөн", "Only a dry salt", "Уусмалын pH-ийг асуусан.", "The question is about the solution."],
    ]),
  ]),
  lesson(11, "biology", "g11-biology-division", ["Митоз ба мейоз", "Mitosis and meiosis"], ["Митоз биеийн эсийг хуваана. Мейоз бэлгийн эс гаргана.", "Mitosis divides body cells. Meiosis makes sex cells."], [
    ["Митозын охин эс эх эстэйгээ ижил хромосомтой. Мейозын эс хромосомын тоогоо хагасалдаг.", "A mitotic daughter cell keeps the parent's chromosome number. A meiotic cell halves it."],
    ["Өсөлт, эдгэрэлт митозтой. Үр тогтоход мейозоор гарсан эсүүд нийлнэ.", "Growth and repair use mitosis. Fertilisation joins cells made by meiosis."],
  ], [
    question("g11b1", ["Биеийн эсийн өсөлтөд аль хуваагдал вэ?", "Which division is used for body-cell growth?"], ["Митоз.", "Mitosis."], ["Митоз", "Mitosis"], [
      ["Мейоз", "Meiosis", "Мейоз бэлгийн эс гаргана.", "Meiosis makes sex cells."],
      ["Фотосинтез", "Photosynthesis", "Фотосинтез хуваагдал биш.", "Photosynthesis is not cell division."],
      ["Амьсгал", "Respiration", "Амьсгал энергийн урвал.", "Respiration is an energy reaction."],
    ]),
    question("g11b2", ["Мейоз хромосомын тоог яах вэ?", "What does meiosis do to the chromosome number?"], ["Хагасалдаг.", "It halves it."], ["Хагасална", "Halves it"], [
      ["Хоёр дахин өсгөнө", "Doubles it", "Хагас болгоно.", "It reduces the number by half."],
      ["Өөрчлөхгүй", "Leaves it unchanged", "Өөрчлөхгүй нь митоз.", "Keeping the number is mitosis."],
      ["Тэг болгоно", "Makes it zero", "Хромосомгүй эс бэлгийн эс биш.", "A cell with no chromosomes is not a sex cell."],
    ]),
    question("g11b3", ["Үр тогтоход ямар эс нийлдэг вэ?", "Which cells join at fertilisation?"], ["Мейозоор гарсан бэлгийн эс.", "Sex cells made by meiosis."], ["Бэлгийн эс", "Sex cells"], [
      ["Эсийн хана", "Cell walls", "Хана нийлж үр тогтоохгүй.", "Walls do not fertilise."],
      ["Хлоропласт", "Chloroplasts", "Хлоропласт фотосинтез хийнэ.", "Chloroplasts photosynthesise."],
      ["Ялтас", "Platelets", "Ялтас цус өтгөрүүлнэ.", "Platelets clot blood."],
    ]),
    question("g11b4", ["Шарх эдгэрэхэд аль хуваагдал голлох вэ?", "Which division is central to healing a wound?"], ["Митоз.", "Mitosis."], ["Митоз", "Mitosis"], [
      ["Мейоз", "Meiosis", "Мейоз үржилд.", "Meiosis is for reproduction."],
      ["pH", "pH", "pH химийн хэмжүүр.", "pH is a chemical measure."],
      ["Омын хууль", "Ohm's law", "Энэ цахилгааны хууль.", "That is an electrical law."],
    ]),
  ]),
  lesson(11, "mongolian", "g11-mongolian-style", ["Найруулгын хэв", "Styles of writing"], ["Мэдээллийн, ярианы, уран сайхны хэвийг холихгүй.", "Do not mix informational, spoken, and literary styles."], [
    ["Мэдээллийн хэв баримт, тоо, тодорхой нэр хэрэглэнэ. Ярианы хэв аман үг, товчлол ихтэй.", "Informational style uses facts, numbers, and exact names. Spoken style uses conversational words and shortenings."],
    ["Уран сайхны хэв дүрслэл, зүйрлэлээр уншигчийн мэдрэмжийг хөдөлгөнө.", "Literary style uses image and comparison to move the reader."],
  ], [
    question("g11n1", ["Тоо, огноо, эх сурвалж зонхилсон текст аль хэв вэ?", "A text full of numbers, dates, and sources is which style?"], ["Мэдээллийн.", "Informational."], ["Мэдээллийн", "Informational"], [
      ["Зөвхөн ярианы", "Only spoken", "Ярианы хэв аман үгтэй.", "Spoken style uses conversational wording."],
      ["Зөвхөн уран сайхны", "Only literary", "Уран сайхан зүйрлэлээр явна.", "Literary style leans on imagery."],
      ["Хоосон", "Empty", "Баримт байгаа тул хоосон биш.", "Facts mean it is not empty."],
    ]),
    question("g11n2", ["«Ёстой гоё юм» аль хэвт ойр вэ?", "Which style is closest to “Ёстой гоё юм”?"], ["Ярианы.", "Spoken."], ["Ярианы", "Spoken"], [
      ["Албан мэдээ", "A formal report", "Албан мэдээнд энэ хэллэг таарахгүй.", "That phrase does not fit a formal report."],
      ["Хүснэгт", "A table", "Хүснэгт тоон хэв.", "A table is a numerical form."],
      ["Томьёо", "A formula", "Томьёо математик.", "A formula is mathematical."],
    ]),
    question("g11n3", ["Зүйрлэл аль хэвийн хэрэгсэл вэ?", "Imagery is a tool of which style?"], ["Уран сайхны.", "Literary."], ["Уран сайхны", "Literary"], [
      ["Зөвхөн хүснэгтийн", "Only a table's", "Хүснэгт дүрслэл биш.", "A table is not imagery."],
      ["Зөвхөн нэгжийн", "Only a unit's", "Нэгж хэмжүүр.", "A unit is a measure."],
      ["Зөвхөн газрын зургийн", "Only a map's", "Газрын зураг өөр төрөл.", "A map is a different form."],
    ]),
    question("g11n4", ["Хэвийг холиход юу болох вэ?", "What happens when styles are mixed carelessly?"], ["Зорилго бүдгэрнэ.", "The purpose becomes unclear."], ["Зорилго бүдгэрнэ", "The purpose blurs"], [
      ["Үргэлж илүү албан болно", "It always becomes more formal", "Ярианы үг албан хэвийг сулруулна.", "Spoken words weaken a formal style."],
      ["Тоо алга болно", "Numbers disappear", "Холих нь тоог устгахгүй.", "Mixing does not erase numbers."],
      ["Өгүүлбэр бүгд адил болно", "Every sentence becomes identical", "Холих ялгааг бас нэмж болно.", "Mixing can add unevenness."],
    ]),
  ]),
  lesson(11, "english", "g11-english-conditional", ["First conditional", "First conditional"], ["If + present, will + суурь үйл үг.", "If plus the present, then will plus the base verb."], [
    ["Бодит ирээдүйн нөхцөлд first conditional хэрэглэнэ. If it rains, we will stay inside.", "A real future condition uses the first conditional. If it rains, we will stay inside."],
    ["If-ийн араас will давхар бичихгүй. Нөхцөл одоо цаг, үр дагавар will.", "Do not put will in the if-clause. The condition stays present, and the result takes will."],
  ], [
    question("g11e1", ["Which sentence is a correct first conditional?", "Which sentence is a correct first conditional?"], ["If-д одоо цаг, үр дүнд will.", "The if-clause is present and the result uses will."], ["If it rains, we will stay.", "If it rains, we will stay."], [
      ["If it will rain, we stay.", "If it will rain, we stay.", "If-ийн араас will илүү.", "will does not belong in the if-clause."],
      ["If it rained, we will stay.", "If it rained, we will stay.", "rained өнгөрсөн хэлбэр энэ загварт таарахгүй.", "rained is the wrong form for this pattern."],
      ["If it rains, we stayed.", "If it rains, we stayed.", "Үр дүн өнгөрсөн цаг болсон.", "The result was put in the past."],
    ]),
    question("g11e2", ["Where does will go?", "Where does will go?"], ["Үр дагаврын өгүүлбэрт.", "In the result clause."], ["In the result", "In the result"], [
      ["In the if-clause", "In the if-clause", "If-д will бичихгүй.", "will is not written in the if-clause."],
      ["Instead of if", "Instead of if", "if-г will орлохгүй.", "will does not replace if."],
      ["After a past participle only", "After a past participle only", "Энэ пассивын дүрэм биш.", "That is not the conditional rule."],
    ]),
    question("g11e3", ["“If you heat ice, it melts.” аль нөхцөлд ойр вэ?", "“If you heat ice, it melts.” is closest to which use?"], ["Ерөнхий баримт.", "A general fact."], ["A general fact", "A general fact"], [
      ["Өнгөрсөн харамсал", "A past regret", "Харамсалд would have орно.", "A regret uses would have."],
      ["Боломжгүй одоо", "An impossible present", "Боломжгүй одоонд past + would.", "An unreal present uses the past and would."],
      ["Тушаал", "A command", "if нөхцөл, тушаал биш.", "if marks a condition, not a command."],
    ]),
    question("g11e4", ["Which result fits “If she studies”?", "Which result fits “If she studies”?"], ["she will pass.", "she will pass."], ["she will pass", "she will pass"], [
      ["she passed", "she passed", "Өнгөрсөн цаг таарахгүй.", "The past tense does not fit."],
      ["she passes yesterday", "she passes yesterday", "Yesterday одоо цагтай зөрчилдөнө.", "Yesterday clashes with the present."],
      ["she will studies", "she will studies", "will-ийн араас -s байхгүй.", "There is no -s after will."],
    ]),
  ]),
  lesson(11, "history", "g11-history-1990", ["1990 оны ардчилсан өөрчлөлт", "The democratic change of 1990"], ["1990 он олон намын тогтолцоо руу шилжсэн үе.", "1990 is the turn toward a multiparty system."], [
    ["1990 оны ардчилсан хувьсгал нэг намын засаглалаас олон намын тогтолцоонд шилжих эхлэлийг тавьсан.", "The 1990 democratic revolution began the move from one-party rule to a multiparty system."],
    ["1992 онд шинэ Үндсэн хууль батлагдсан. 1990 ба 1992 нэг үйл явдал биш.", "A new constitution was adopted in 1992. 1990 and 1992 are not the same event."],
  ], [
    question("g11h1", ["1990 онд ямар өөрчлөлт эхэлсэн бэ?", "What change began in 1990?"], ["Ардчилсан, олон намын тогтолцоо.", "A democratic, multiparty system."], ["Олон намын тогтолцоо", "A multiparty system"], [
      ["Их Монгол Улс", "The Mongol state", "Энэ 1206.", "That is 1206."],
      ["Богд хаант улс", "The Bogd state", "Энэ 1911.", "That is 1911."],
      ["1921 оны хувьсгал", "The 1921 revolution", "Энэ өөр он.", "That is a different year."],
    ]),
    question("g11h2", ["Шинэ Үндсэн хууль хэдэн онд батлагдсан бэ?", "When was the new constitution adopted?"], ["1992.", "1992."], ["1992", "1992"], [
      ["1990", "1990", "1990 эхлэл. Хууль 1992.", "1990 is the opening. The constitution is 1992."],
      ["1911", "1911", "1911 тусгаарлалт.", "1911 is independence."],
      ["1921", "1921", "1921 хувьсгал.", "1921 is the revolution."],
    ]),
    question("g11h3", ["1990 ба 1992 яагаад өөр вэ?", "Why are 1990 and 1992 different?"], ["Нэг нь өөрчлөлтийн эх, нөгөө нь Үндсэн хууль.", "One is the start of the change, the other is the constitution."], ["Эх ба хууль", "The start and the law"], [
      ["Ижил сар", "The same month", "Он өөр.", "The years differ."],
      ["Хоёул 1206", "Both are 1206", "1206 эрт үе.", "1206 is the early empire."],
      ["Хоёул Богд хаан", "Both are the Bogd Khaan", "Богд хаан 1911.", "The Bogd Khaan belongs to 1911."],
    ]),
    question("g11h4", ["Нэг намын засаглалаас гарах алхам аль онд вэ?", "Which year marks the step away from one-party rule?"], ["1990.", "1990."], ["1990", "1990"], [
      ["1206", "1206", "Эзэнт гүрний эх.", "The start of the empire."],
      ["1911", "1911", "Манжаас тусгаарласан он.", "The year of separation from Qing rule."],
      ["1921", "1921", "Хувьсгалын он.", "The year of the revolution."],
    ]),
  ]),
  lesson(11, "geography", "g11-geography-population", ["Хүн ам, хотжилт", "Population and cities"], ["Хүн амын төвлөрөл нийслэлд өндөр.", "Population is highly concentrated in the capital."], [
    ["Монголын хүн амын нягт бага, газар нутаг өргөн. Хотжилт Улаанбаатарт хүчтэй.", "Mongolia's population density is low and its territory is large. Urbanisation is strongest in Ulaanbaatar."],
    ["Нягтыг хүн амыг талбайд хувааж олно. Нягт бага гэж хүн ам байхгүй гэсэн үг биш.", "Density is population divided by area. A low density does not mean there are no people."],
  ], [
    question("g11g1", ["Хүн амын нягтыг яаж олох вэ?", "How is population density found?"], ["Хүн амыг талбайд хуваана.", "Divide population by area."], ["Хүн ам / талбай", "Population / area"], [
      ["Талбайг хүнд хуваана", "Area divided by people", "Энэ нэг хүнд ногдох талбай.", "That is area per person."],
      ["Хотыг нэмнэ", "Add the cities", "Нэмэх нь нягт биш.", "Adding is not density."],
      ["Зөвхөн нийслэлийг хасна", "Subtract only the capital", "Хасах нь нягтын томьёо биш.", "Subtraction is not the formula."],
    ]),
    question("g11g2", ["Монголын нягт ямар вэ?", "What is Mongolia's density like?"], ["Газар нутагтайгаа харьцуулахад бага.", "Low compared with its territory."], ["Бага", "Low"], [
      ["Дэлхийн хамгийн өндөр", "The world's highest", "Нутаг өргөн, хүн ам сийрэг.", "The land is large and the people are spread out."],
      ["Зөвхөн тэг", "Exactly zero", "Хүн ам байна.", "There is a population."],
      ["Зөвхөн далайн эрэгт", "Only on a coast", "Далайн эрэг байхгүй.", "There is no coast."],
    ]),
    question("g11g3", ["Хотжилт хаана хамгийн хүчтэй вэ?", "Where is urbanisation strongest?"], ["Улаанбаатарт.", "In Ulaanbaatar."], ["Улаанбаатар", "Ulaanbaatar"], [
      ["Говьд жигд", "Evenly across the Gobi", "Говь сийрэг суурьшна.", "The Gobi is sparsely settled."],
      ["Зөвхөн хил дээр", "Only on the border", "Хил хотжилтын төв биш.", "The border is not the urban centre."],
      ["Экваторт", "On the equator", "Монгол экваторт биш.", "Mongolia is not on the equator."],
    ]),
    question("g11g4", ["Нягт бага гэдэг нь юу гэсэн үг вэ?", "What does a low density mean?"], ["Нэгж талбайд хүн цөөн.", "Few people per unit of area."], ["Нэгж талбайд цөөн", "Few per unit of area"], [
      ["Хүн ам байхгүй", "There are no people", "Бага нягт тэг биш.", "Low density is not zero."],
      ["Нийслэл байхгүй", "There is no capital", "Нийслэл байна.", "The capital exists."],
      ["Газар нутаг байхгүй", "There is no territory", "Талбай их.", "The area is large."],
    ]),
  ]),
  lesson(12, "math", "g12-math-derivative", ["Уламжлал", "The derivative"], ["x²-ийн уламжлал 2x.", "The derivative of x² is 2x."], [
    ["Уламжлал функцийн өөрчлөлтийн хурдыг заана. xⁿ-ийн уламжлал n · xⁿ⁻¹.", "A derivative tells how fast a function changes. The derivative of xⁿ is n · xⁿ⁻¹."],
    ["Тогтмол тооны уламжлал 0. Нийлбэрийн уламжлал уламжлалын нийлбэр.", "The derivative of a constant is 0. The derivative of a sum is the sum of the derivatives."],
  ], [
    question("g12m1", ["x²-ийн уламжлал аль вэ?", "What is the derivative of x²?"], ["2x.", "2x."], ["2x", "2x"], [
      ["x", "x", "Зэргийг үржүүлээгүй.", "The power was not brought down."],
      ["2", "2", "x үлдсэнгүй.", "x disappeared."],
      ["x³", "x³", "Зэргийг өсгөсөн. Уламжлал зэргийг бууруулна.", "The power was raised. A derivative lowers it."],
    ]),
    question("g12m2", ["5-ийн уламжлал хэд вэ?", "What is the derivative of 5?"], ["0.", "0."], ["0", "0"], [
      ["5", "5", "Тогтмол өөрчлөгдөхгүй.", "A constant does not change."],
      ["1", "1", "x-ийн уламжлалтай хольсон.", "This was confused with the derivative of x."],
      ["5x", "5x", "Үржүүлсэн.", "The constant was multiplied by x."],
    ]),
    question("g12m3", ["x³-ийн уламжлал аль вэ?", "What is the derivative of x³?"], ["3x².", "3x²."], ["3x²", "3x²"], [
      ["x²", "x²", "3-ыг үржүүлээгүй.", "3 was not multiplied."],
      ["3x³", "3x³", "Зэрэг буураагүй.", "The power did not fall."],
      ["3", "3", "x алга.", "x is missing."],
    ]),
    question("g12m4", ["f(x) = x² + 4 бол f′(x) аль вэ?", "If f(x) = x² + 4, what is f′(x)?"], ["2x.", "2x."], ["2x", "2x"], [
      ["2x + 4", "2x + 4", "Тогтмолын уламжлал 0.", "The derivative of the constant is 0."],
      ["2x + 1", "2x + 1", "4-ийг 1 болгосон.", "4 was turned into 1."],
      ["x²", "x²", "Уламжлал аваагүй.", "The function was not differentiated."],
    ]),
  ]),
  lesson(12, "physics", "g12-physics-wave", ["Долгион", "Waves"], ["v = f · λ.", "v = f · λ."], [
    ["Долгионы хурд давтамж ба долгионы уртын үржвэр. λ = v / f, f = v / λ.", "Wave speed is frequency times wavelength. λ = v / f and f = v / λ."],
    ["Давтамжийн нэгж герц. Долгионы урт метр.", "Frequency is in hertz. Wavelength is in metres."],
  ], [
    question("g12p1", ["Давтамж 2 Гц, долгионы урт 3 м. Хурд хэд вэ?", "Frequency 2 Hz, wavelength 3 m. What is the speed?"], ["v = 2 · 3 = 6 м/с.", "v = 2 · 3 = 6 m/s."], ["6 м/с", "6 m/s"], [
      ["1.5 м/с", "1.5 m/s", "Хуваасан.", "The values were divided."],
      ["5 м/с", "5 m/s", "Нэмсэн.", "The values were added."],
      ["1 м/с", "1 m/s", "Хассан.", "The values were subtracted."],
    ]),
    question("g12p2", ["Хурд 12 м/с, давтамж 4 Гц. λ хэд вэ?", "Speed 12 m/s, frequency 4 Hz. What is λ?"], ["12 / 4 = 3 м.", "12 / 4 = 3 m."], ["3 м", "3 m"], [
      ["48 м", "48 m", "Үржүүлсэн.", "The values were multiplied."],
      ["16 м", "16 m", "Нэмсэн.", "The values were added."],
      ["8 м", "8 m", "Хассан.", "The values were subtracted."],
    ]),
    question("g12p3", ["Давтамжийн нэгж аль вэ?", "Which unit is frequency?"], ["Герц.", "Hertz."], ["Герц", "Hertz"], [
      ["Метр", "Metre", "Метр урт.", "The metre is length."],
      ["Ньютон", "Newton", "Ньютон хүч.", "The newton is force."],
      ["Ом", "Ohm", "Ом эсэргүүцэл.", "The ohm is resistance."],
    ]),
    question("g12p4", ["Хурд тогтмол, давтамж өсвөл долгионы урт яах вэ?", "Speed stays the same and frequency rises. What happens to wavelength?"], ["Богиносно.", "It gets shorter."], ["Богиносно", "It shortens"], [
      ["Уртсана", "It gets longer", "f өсөхөд λ буурна.", "As f rises, λ falls."],
      ["Тэг болно", "It becomes zero", "Давтамж төгсгөлтэй бол урт тэг биш.", "A finite frequency does not make the wavelength zero."],
      ["Өөрчлөгдөхгүй", "It stays the same", "f өөрчлөгдсөн.", "f changed."],
    ]),
  ]),
  lesson(12, "chemistry", "g12-chemistry-equilibrium", ["Химийн тэнцвэр", "Chemical equilibrium"], ["Тэнцвэрт урагш, буцах урвалын хурд тэнцэнэ.", "At equilibrium the forward and reverse rates are equal."], [
    ["Тэнцвэр зогссон төлөв биш. Хоёр чигийн урвал үргэлжилж, хурд нь тэнцэнэ.", "Equilibrium is not a stopped state. Both directions continue, and their rates match."],
    ["Температур, концентрац өөрчлөгдвөл тэнцвэр шилжинэ. Шинэ тэнцвэр тогтоно.", "A change in temperature or concentration shifts the equilibrium. A new balance is reached."],
  ], [
    question("g12c1", ["Тэнцвэрт юу тэнцүү вэ?", "What is equal at equilibrium?"], ["Урагш, буцах хурд.", "The forward and reverse rates."], ["Хоёр чигийн хурд", "The two rates"], [
      ["Бүх бодисын масс тэг", "Every mass is zero", "Бодис байна.", "The substances are still there."],
      ["Урвал бүрэн зогсоно", "The reaction fully stops", "Хурд тэнцэх нь зогсох биш.", "Equal rates are not a stop."],
      ["Зөвхөн өнгө", "Only the colour", "Өнгө хурд биш.", "Colour is not the rate."],
    ]),
    question("g12c2", ["Тэнцвэр зогссон төлөв мөн үү?", "Is equilibrium a stopped state?"], ["Биш. Хоёр чиг үргэлжилнэ.", "No. Both directions continue."], ["Үргэлжилнэ", "Both directions continue"], [
      ["Тийм, атом хөдлөхгүй", "Yes, atoms stop moving", "Атом хөдөлсөөр.", "Atoms keep moving."],
      ["Тийм, зөвхөн хатуу үлдэнэ", "Yes, only a solid remains", "Төлөв бүрд тэнцвэр байж болно.", "Equilibrium can exist in more than solids."],
      ["Тийм, pH алга болно", "Yes, pH disappears", "pH өөр хэмжүүр.", "pH is a different measure."],
    ]),
    question("g12c3", ["Концентрац өөрчлөгдвөл юу болох вэ?", "What happens when a concentration changes?"], ["Тэнцвэр шилжинэ.", "The equilibrium shifts."], ["Шилжинэ", "It shifts"], [
      ["Атом устана", "Atoms are destroyed", "Атом устахгүй, харьцаа өөрчлөгдөнө.", "Atoms are not destroyed. The balance changes."],
      ["Юу ч болохгүй", "Nothing happens", "Нөхцөл өөрчлөгдсөн.", "A condition changed."],
      ["Зөвхөн нэгж солигдоно", "Only the unit changes", "Нэгж биш, байрлал өөрчлөгдөнө.", "The position changes, not the unit."],
    ]),
    question("g12c4", ["Урагш хурд буцах хурднаасаа их бол яах вэ?", "What if the forward rate is greater than the reverse rate?"], ["Бүтээгдэхүүн нэмэгдэнэ.", "Products increase."], ["Бүтээгдэхүүн нэмэгдэнэ", "Products increase"], [
      ["Шууд тэг болно", "It becomes zero at once", "Хурдны зөрүү аажмаар тэнцвэр лүү явна.", "The difference moves the system toward a new balance."],
      ["Элемент солигдоно", "The elements change", "Элемент өөр болохгүй.", "The elements do not change identity."],
      ["Моль алга болно", "The mole disappears", "Моль хэмжүүр хэвээр.", "The mole remains a unit."],
    ]),
  ]),
  lesson(12, "biology", "g12-biology-selection", ["Байгалийн шалгарал", "Natural selection"], ["Орчинд тохирсон шинж үр удамд илүү үлдэнэ.", "Traits that fit the environment are more likely to be passed on."], [
    ["Байгалийн шалгарал хувь хүний хүслээр биш, амьдрах, үржих ялгаан дээр ажиллана.", "Natural selection works through differences in survival and reproduction, not through a wish."],
    ["Хувирал байхгүй бол шалгарах материал байхгүй. Шалгарал хувиралыг үүсгэдэггүй, ялгана.", "Without variation there is nothing to select. Selection sorts variation. It does not create it by itself."],
  ], [
    question("g12b1", ["Байгалийн шалгарал юуг илүү үлдээдэг вэ?", "What does natural selection leave more often?"], ["Орчинд тохирсон шинж.", "Traits that fit the environment."], ["Тохирсон шинж", "Traits that fit"], [
      ["Санамсаргүй бүх шинж адил", "Every trait equally", "Ялгаа байгаа тул адил биш.", "Differences mean the traits are not equal."],
      ["Зөвхөн хамгийн том бие", "Only the largest body", "Том байх нь үргэлж давуу биш.", "Size is not always an advantage."],
      ["Зөвхөн өнгө", "Only colour", "Өнгө нэг шинж. Шалгарал бүх тохирох шинжид ажиллана.", "Colour is one trait. Selection acts on whatever fits."],
    ]),
    question("g12b2", ["Хувирал байхгүй бол шалгарал яах вэ?", "What happens to selection if there is no variation?"], ["Ялгах материалгүй.", "There is nothing to sort."], ["Ялгах зүйлгүй", "Nothing to sort"], [
      ["Шинэ амьтан шууд төрнө", "A new animal appears at once", "Шалгарал хоосноос шинэ бие үүсгэхгүй.", "Selection does not invent a body from nothing."],
      ["Бүгд хурдан өөрчлөгдөнө", "Everyone changes quickly", "Ялгаагүй бол ялгахгүй.", "Without differences there is nothing to favour."],
      ["pH өөрчлөгдөнө", "pH changes", "pH шалгарлын нөхцөл биш.", "pH is not this mechanism."],
    ]),
    question("g12b3", ["Шалгарал хувиралыг юу хийдэг вэ?", "What does selection do with variation?"], ["Ялгана.", "It sorts it."], ["Ялгана", "It sorts it"], [
      ["Бүгдийг устгана", "It destroys all of it", "Тохирсон шинж үлдэнэ.", "Fitting traits remain."],
      ["Хүсэлээр солино", "It changes them by a wish", "Хүсэл механизм биш.", "A wish is not the mechanism."],
      ["Зөвхөн нэр өгнө", "It only names them", "Нэрших нь шалгарал биш.", "Naming is not selection."],
    ]),
    question("g12b4", ["Үр удамд юу илүү дамжих вэ?", "What is more likely to be passed on?"], ["Амьдарч, үржсэн бодгалийн шинж.", "Traits of individuals that survive and reproduce."], ["Үржсэн бодгалийн шинж", "Traits of those that reproduce"], [
      ["Зөвхөн нэг удаа харагдсан өнгө", "A colour seen once", "Нэг удаагийн харагдац удам биш.", "One sighting is not inheritance."],
      ["Орчноос үл хамаарах бүх шинж", "Every trait regardless of the environment", "Орчин ялгааг гаргана.", "The environment makes the difference."],
      ["Зөвхөн олдмол гэмтэл", "Only an acquired injury", "Гэмтэл бүр удамшихгүй.", "An injury is not automatically inherited."],
    ]),
  ]),
  lesson(12, "mongolian", "g12-mongolian-essay", ["Эссэгийн бүтэц", "Essay structure"], ["Удиртгал, батлах хэсэг, дүгнэлт.", "Introduction, body, and conclusion."], [
    ["Удиртгал сэдэв, гол санаагаа хэлнэ. Батлах хэсэг баримт, тайлбараар санааг нотолно. Дүгнэлт шинэ баримт нэмэлгүйгээр харина.", "The introduction states the topic and the claim. The body proves it with evidence and explanation. The conclusion returns without adding a new fact."],
    ["Нэг догол мөр нэг баримт. Баримтын дараа яагаад гол санааг дэмжиж байгааг бичнэ.", "One paragraph holds one piece of evidence. After the evidence, explain why it supports the claim."],
  ], [
    question("g12n1", ["Эссэгийн эхэнд юу байх вэ?", "What belongs at the start of an essay?"], ["Сэдэв, гол санаа.", "The topic and the claim."], ["Сэдэв, гол санаа", "Topic and claim"], [
      ["Зөвхөн эх сурвалжийн жагсаалт", "Only the source list", "Жагсаалт төгсгөлд ойр.", "The list belongs near the end."],
      ["Шинэ дүгнэлт", "A new conclusion", "Дүгнэлт төгсгөлд.", "The conclusion is at the end."],
      ["Хоосон хуудас", "A blank page", "Хуудас санаа биш.", "A blank page is not the claim."],
    ]),
    question("g12n2", ["Дүгнэлтэд юу хийхгүй вэ?", "What should the conclusion avoid?"], ["Шинэ баримт нэмэх.", "Adding a new fact."], ["Шинэ баримт", "A new fact"], [
      ["Гол санаа руу буцах", "Returning to the claim", "Буцах нь дүгнэлтийн үүрэг.", "Returning is the conclusion's job."],
      ["Товчлох", "Summarising", "Товчлол таарна.", "A summary fits."],
      ["Холбох", "Connecting", "Холбох нь бүтцийн хэсэг.", "Connecting is part of the structure."],
    ]),
    question("g12n3", ["Баримтын дараа юу бичих вэ?", "What follows a piece of evidence?"], ["Яагаад санааг дэмжиж байгаа тайлбар.", "An explanation of why it supports the claim."], ["Тайлбар", "An explanation"], [
      ["Шинэ гарчиг л", "Only a new title", "Гарчиг тайлбар биш.", "A title is not the explanation."],
      ["Өөр сэдэв", "A different topic", "Өөр сэдэв эссэг сарниулна.", "A new topic scatters the essay."],
      ["Зөвхөн цэг", "Only a full stop", "Цэг өгүүлбэр дуусгана, тайлбар биш.", "A full stop ends a sentence. It is not the explanation."],
    ]),
    question("g12n4", ["Нэг догол мөрөнд хэдэн баримт төвлөрөх вэ?", "How many pieces of evidence should one paragraph centre on?"], ["Нэг.", "One."], ["Нэг", "One"], [
      ["Аль болох арван", "As many as ten", "Олон баримт санааг бүдгэрүүлнэ.", "Too many facts blur the point."],
      ["Тэг", "Zero", "Батлах хэсэг баримтгүй байж болохгүй.", "The body needs evidence."],
      ["Зөвхөн гарчиг", "Only the title", "Гарчиг баримт биш.", "The title is not evidence."],
    ]),
  ]),
  lesson(12, "english", "g12-english-register", ["Formal register", "Formal register"], ["Албан бичигт товчилсон ярианы хэллэг хэрэглэхгүй.", "Formal writing avoids conversational shortenings."], [
    ["Formal: do not, cannot, children. Informal: don't, can't, kids.", "Formal uses do not, cannot, and children. Informal uses don't, can't, and kids."],
    ["Албан захидалд Dear ба Yours sincerely таарна. Gonna, wanna албан бичигт ордоггүй.", "A formal letter uses Dear and Yours sincerely. Gonna and wanna do not belong in formal writing."],
  ], [
    question("g12e1", ["Which phrase is formal?", "Which phrase is formal?"], ["do not нь албан хэлбэр.", "do not is the formal form."], ["do not", "do not"], [
      ["don't", "don't", "Товчилсон ярианы хэлбэр.", "This is a conversational shortening."],
      ["gonna", "gonna", "Gonna албан биш.", "Gonna is informal."],
      ["kids", "kids", "Албанд children.", "Formal writing uses children."],
    ]),
    question("g12e2", ["Which closing fits “Dear Ms. Ortega,”?", "Which closing fits “Dear Ms. Ortega,”?"], ["Нэр мэдэгдэж байвал Yours sincerely.", "When the name is known, use Yours sincerely."], ["Yours sincerely", "Yours sincerely"], [
      ["Bye", "Bye", "Ярианы хаалт.", "This is a spoken closing."],
      ["Love", "Love", "Хувийн захидал.", "This is personal."],
      ["Gonna write", "Gonna write", "Албан хаалт биш.", "This is not a formal closing."],
    ]),
    question("g12e3", ["Which word is more formal than kids?", "Which word is more formal than kids?"], ["children.", "children."], ["children", "children"], [
      ["kiddos", "kiddos", "Бүр илүү ярианы үг.", "This is even more conversational."],
      ["gonna", "gonna", "Өөр утгатай товчлол.", "This shortening means something else."],
      ["yeah", "yeah", "Yes-ийн ярианы хэлбэр.", "This is a spoken form of yes."],
    ]),
    question("g12e4", ["Where does gonna belong?", "Where does gonna belong?"], ["Ярианы хэлэнд.", "In spoken, informal language."], ["Informal speech", "Informal speech"], [
      ["A constitution", "A constitution", "Үндсэн хууль албан хэлтэй.", "A constitution uses formal language."],
      ["A lab report", "A lab report", "Тайлан албан хэв.", "A report uses a formal register."],
      ["A formal letter", "A formal letter", "Албан захидалд ордоггүй.", "It does not belong in a formal letter."],
    ]),
  ]),
  lesson(12, "history", "g12-history-constitution", ["1992 оны Үндсэн хууль", "The 1992 Constitution"], ["Үндсэн хууль төрийн үндсэн зохион байгуулалтыг тогтооно.", "The constitution sets the basic organisation of the state."], [
    ["1992 оны Үндсэн хууль парламентын бүгд найрамдах тогтолцоог бататгасан.", "The 1992 Constitution confirmed a parliamentary republic."],
    ["1990 он өөрчлөлтийн эх. 1992 он тэр өөрчлөлтийн хууль. Хоёрыг нэг он болгож болохгүй.", "1990 is the start of the change. 1992 is its constitution. They are not one year."],
  ], [
    question("g12h1", ["1992 оны Үндсэн хууль ямар тогтолцоог бататгасан бэ?", "Which system did the 1992 Constitution confirm?"], ["Парламентын бүгд найрамдах.", "A parliamentary republic."], ["Парламентын бүгд найрамдах", "A parliamentary republic"], [
      ["Эзэнт гүрэн", "The empire", "Эзэнт гүрэн XIII зуун.", "The empire belongs to the thirteenth century."],
      ["Богд хаант улс", "The Bogd Khaan state", "Энэ 1911.", "That is 1911."],
      ["Зөвхөн нэг нам", "Only one party", "Олон намын өөрчлөлтийн дараах хууль.", "The constitution follows the multiparty change."],
    ]),
    question("g12h2", ["1990 ба 1992-ын аль нь хууль батлагдсан он бэ?", "Which of 1990 and 1992 is the year the constitution was adopted?"], ["1992.", "1992."], ["1992", "1992"], [
      ["1990", "1990", "1990 эхлэл.", "1990 is the beginning."],
      ["Хоёул", "Both", "Үйл явдал өөр.", "The events differ."],
      ["Аль нь ч биш", "Neither", "1992 мөн.", "1992 is the year."],
    ]),
    question("g12h3", ["Үндсэн хууль юу тогтоодог вэ?", "What does a constitution establish?"], ["Төрийн үндсэн зохион байгуулалт.", "The basic organisation of the state."], ["Төрийн зохион байгуулалт", "The organisation of the state"], [
      ["Нэг хичээлийн дүн", "One class grade", "Дүн хууль биш.", "A grade is not the constitution."],
      ["Нэг өдрийн цаг агаар", "One day's weather", "Цаг агаар хууль биш.", "Weather is not a law."],
      ["Нэг барааны үнэ", "One product's price", "Үнэ хуулийн зохион байгуулалт биш.", "A price is not the state's organisation."],
    ]),
    question("g12h4", ["Энэ хуулийг 1911 онтой яаж андуурах вэ?", "How is this law confused with 1911?"], ["1911 тусгаарлалт, 1992 хууль.", "1911 is independence and 1992 is the constitution."], ["Он, үйл явдлыг солих", "Swapping the year and the event"], [
      ["Хоёул нэг өдөр", "They are the same day", "Ойролцоогоор 80 жилийн зөрүүтэй.", "They are about eighty years apart."],
      ["Хоёул Чингис", "Both are Chinggis", "Чингис XIII зуун.", "Chinggis belongs to the thirteenth century."],
      ["Хоёул физикийн хууль", "Both are physics laws", "Энэ түүхийн он.", "These are historical years."],
    ]),
  ]),
  lesson(12, "geography", "g12-geography-economy", ["Аж ахуй, бүс нутаг", "Economy and regions"], ["Мал аж ахуй, уул уурхай өөр бүсэд өөр жинтэй.", "Herding and mining have different weight in different regions."], [
    ["Мал аж ахуй хээрийн бүсэд түгээмэл. Уул уурхай тодорхой ордод төвлөрнө.", "Herding is widespread on the steppe. Mining is concentrated at particular deposits."],
    ["Нийслэл үйлчилгээ, засаг захиргаа, хүн амын төвлөрлөөрөө бусад бүсээс ялгарна.", "The capital differs from other regions by services, administration, and population."],
  ], [
    question("g12g1", ["Хээрийн бүсэд аль аж ахуй түгээмэл вэ?", "Which livelihood is widespread on the steppe?"], ["Мал аж ахуй.", "Herding."], ["Мал аж ахуй", "Herding"], [
      ["Далайн загас", "Sea fishing", "Далай байхгүй.", "There is no sea."],
      ["Шүрэн аялал", "Coral tourism", "Шүр байхгүй.", "There is no coral."],
      ["Экваторын ой", "Equatorial forest", "Экваторын ой Монголд байхгүй.", "Mongolia has no equatorial forest."],
    ]),
    question("g12g2", ["Уул уурхай хаана төвлөрөх вэ?", "Where is mining concentrated?"], ["Тодорхой ордод.", "At particular deposits."], ["Ордод", "At deposits"], [
      ["Далайн эрэг дагуу", "Along a coast", "Эрэг байхгүй.", "There is no coast."],
      ["Айл бүрийн хашаанд жигд", "Evenly in every yard", "Орд газарзүйн хувьд жигд биш.", "Deposits are not evenly spread."],
      ["Зөвхөн экваторт", "Only on the equator", "Монгол экваторт биш.", "Mongolia is not on the equator."],
    ]),
    question("g12g3", ["Нийслэл бусад бүсээс юугаараа ялгарах вэ?", "How does the capital differ from other regions?"], ["Үйлчилгээ, хүн амын төвлөрөл.", "Services and population concentration."], ["Үйлчилгээ, хүн ам", "Services and population"], [
      ["Далайн боомт", "A sea port", "Боомт байхгүй.", "There is no port."],
      ["Экваторын уур амьсгал", "An equatorial climate", "Уур амьсгал эрс тэс.", "The climate is extreme continental."],
      ["Ганцхан өрх", "A single household", "Хүн ам төвлөрсөн.", "The population is concentrated."],
    ]),
    question("g12g4", ["Бүс нутгийн ялгааг юугаар тайлбарлах вэ?", "What explains regional differences?"], ["Газар нутаг, аж ахуй, суурьшил.", "Land, livelihood, and settlement."], ["Газар, аж ахуй, суурьшил", "Land, livelihood, settlement"], [
      ["Зөвхөн нэг өнгө", "Only one colour", "Өнгө бүс нутгийг тайлбарлахгүй.", "Colour does not explain a region."],
      ["Зөвхөн нэг үсэг", "Only one letter", "Үсэг газарзүй биш.", "A letter is not geography."],
      ["Зөвхөн нэг цаг", "Only one hour", "Цаг бүсийн ялгааг бүхэлд нь хэлэхгүй.", "One hour does not explain the regional pattern."],
    ]),
  ]),
];

export function getGradeLesson(slug: string) {
  return gradeLessons.find((item) => item.topic.slug === slug);
}

export function gradeCatalog() {
  return bankGrades.map((grade) => ({
    grade,
    lessons: gradeLessons.filter((item) => item.grade === grade).map((item) => item.topic),
  }));
}
