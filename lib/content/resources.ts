import type { Resource } from "@/lib/i18n/types";

export const resources: Resource[] = [
  {
    slug: "winter-week",
    kind: "plan",
    title: {
      mn: "Өвлийн долоо хоногийн төлөвлөгөө",
      en: "A winter week plan",
    },
    summary: {
      mn: "Богино өдөр, хүйтэн өглөөнд хичээлээ гурван богино хэсэгт хуваах.",
      en: "Split study into three short blocks when the morning is dark and cold.",
    },
    minutes: 6,
    relatedCourse: "fractions-percent",
    body: {
      mn: [
        "Өвөл Улаанбаатар болон аймгийн төвд сургууль руу явах зам уртасна. Хичээлийг орой нэг дор бөөгнүүлэхэд анхаарал унана. Долоо хоногоо ням гарагт 20 минутад зур.",
        "Өглөө: өмнөх хичээлийн нэг бодлого эсвэл нэг дүрэм. Өдөр: шинэ хичээлийн тэмдэглэл. Орой: гарах тасалбарын гурван асуулт. Нэг блок 25 минутаас урт байх албагүй.",
        "Цагаан сар, хяналтын долоо хоногт шинэ сэдэв нэмэхгүй. Давтлагаа нэрлээд төлөвлөгөөндөө бич. Жишээ: мягмар — 24/32-ыг хувь болгох, пүрэв — явъя, өгье, модны.",
        "Төлөвлөгөөгөө хөргөгч эсвэл дэвтрийн нүүрэнд тавь. Хийгээгүй өдрөө устгахгүй, маргааш руу нэг л зүйл зөөнө. Гурван зүйлийг зөөнө гэдэг бол төлөвлөгөө байхаа больсон.",
      ],
      en: [
        "In winter the trip to school in Ulaanbaatar and aimag centers takes longer. Piling every subject into one late night does not hold attention. Draw the week on Sunday. It takes about twenty minutes.",
        "Morning: one problem or one rule from the last lesson. Afternoon: notes on the new lesson. Evening: three exit-ticket questions. A block does not need to be longer than 25 minutes.",
        "During Tsagaan Sar or a test week, do not add a new topic. Name the review and write it down. Example: Tuesday — turn 24/32 into a percent. Thursday — явъя, өгье, модны.",
        "Keep the plan on the fridge or the notebook cover. If a day is missed, do not erase it. Move one item to tomorrow. Moving three items means it is no longer a plan.",
      ],
    },
  },
  {
    slug: "parent-homework",
    kind: "guide",
    title: {
      mn: "Гэрийн даалгаврын товч тайлбар",
      en: "A short note for families",
    },
    summary: {
      mn: "Эцэг эхэд юу хийхийг, юу хийхгүй байхыг нэг хуудсаар хэлэх.",
      en: "One page that tells a family what to do, and what to leave alone.",
    },
    minutes: 5,
    relatedCourse: "formative-assessment",
    body: {
      mn: [
        "Гэрийн даалгавар гэр бүлд шилжсэн шалгалт биш. Эцэг эх бодох аргыг харах хэрэгтэй, хариуг нь бичих хэрэггүй. Багш энэ ялгааг нэг догол мөрөнд бичвэл гэрт хэрүүл багасна.",
        "Загвар: «Өнөөдөр 32-ын 3/4-ийг олно. Хүүхэд алхмыг нь хэлнэ. Та хариуг хэлэхгүй. Түгживэл “32-ыг 4-т хуваа” гэж нэг санаа өг.» Ингэж бичсэн заавар 10 минутаас урт үргэлжлэх ёсгүй.",
        "Монголоор болон, хэрэгтэй бол, англиар давхар бич. Аймаг, хотод гэр бүлийн хэл өөр байж болно. Хүүхдийн алдааг багшид нуухыг бүү хүс. Алдаа нь маргаашийн хичээлийн эх.",
      ],
      en: [
        "Homework is not a test that moved into the kitchen. A parent should see the method, not write the answer. One paragraph from the teacher prevents an argument at home.",
        "A model: “Today we find 3/4 of 32. Your child explains the steps. You do not say the answer. If they stick, offer one hint: divide 32 by 4.” The task should not run past ten minutes.",
        "Write the note in Mongolian and, when a family needs it, in English. Languages at home differ between aimag and city. Do not ask the family to hide mistakes. A mistake is the start of tomorrow’s lesson.",
      ],
    },
  },
  {
    slug: "digital-safety",
    kind: "guide",
    title: {
      mn: "Сурагчийн цахим аюулгүй байдал",
      en: "Digital safety for students",
    },
    summary: {
      mn: "Нууц үг, ангийн бүлэг, зураг хуваалцах тухай ангид ярих богино дүрэм.",
      en: "Short class rules for passwords, group chats, and shared photos.",
    },
    minutes: 7,
    body: {
      mn: [
        "Ангийн бүлэг хичээлийн хэрэгсэл. Тэнд гэрийн хаяг, утасны дугаар, өөр сурагчийн зургийг зөвшөөрөлгүй тавихгүй. Зургийг нь авахын өмнө асуу. Үгүй гэвэл бүү ав.",
        "Нууц үгээ найздаа хэлэхгүй. Багшийн имэйл, сургуулийн бүртгэлд нэг сурагч нэвтрээд бүх ангийн өмнөөс бичих ёсгүй. Сэжигтэй холбоос ирвэл нээхийн өмнө багшдаа үзүүл.",
        "Хэн нэгэн чамайг ангийн бүлэгт доромжилбол дэлгэцийн зураг авч, итгэдэг насанд хүрэгчид үзүүл. Хариу бичиж маргалдах нь заавал чиний ажил биш. Сургуулийн дүрэм энд бас хүчинтэй.",
      ],
      en: [
        "A class chat is a school tool. Do not post a home address, a phone number, or another student’s photo without permission. Ask before you take the photo. If the answer is no, do not take it.",
        "Do not tell a friend your password. One student should not sign in as the teacher and write for the whole class. If a strange link arrives, show a teacher before you open it.",
        "If someone insults you in the class chat, take a screenshot and show an adult you trust. You do not have to win the argument in the chat. School rules still apply there.",
      ],
    },
  },
  {
    slug: "exit-ticket",
    kind: "template",
    title: {
      mn: "Гарах тасалбарын загвар",
      en: "Exit ticket template",
    },
    summary: {
      mn: "Гурван мөрөнд багтах хичээлийн төгсгөлийн хуудас.",
      en: "An end-of-lesson page that fits in three lines.",
    },
    minutes: 4,
    relatedCourse: "formative-assessment",
    body: {
      mn: [
        "Хуудсын толгойд хичээлийн нэр, огноо, сурагчийн нэр. Доор нь гурван мөр. 1. Өнөөдөр юу сурсан бэ, нэг өгүүлбэр. 2. Нэг жишээ эсвэл нэг тоо. 3. Одоо хүртэл бүдэг зүйл.",
        "Жишээ хариу: «32-ын 3/4 нь 24. 24/32 = 75%. Хувь руу шилжүүлэх үедээ 100-аар үржүүлэхээ мартдаг.» Багш гуравдугаар мөрөөрөө маргааш эхлэнэ.",
        "Цаас байхгүй ангид дэвтрийн булан хангалттай. Нэрийг нь заавал цуглуул. Нэргүй цаас хэнийг дараа нь заахыг хэлэхгүй.",
      ],
      en: [
        "The heading has the lesson, the date, and the student’s name. Under it, three lines. 1. One sentence: what did you learn? 2. One example or one number. 3. What is still unclear?",
        "A sample answer: “3/4 of 32 is 24. 24/32 is 75%. I forget to multiply by 100.” The teacher starts tomorrow from line 3.",
        "If there is no spare paper, a corner of the notebook is enough. Collect names. A nameless slip does not tell you whom to teach next.",
      ],
    },
  },
  {
    slug: "aimag-page",
    kind: "template",
    title: {
      mn: "Хэвлээд хэрэглэх хичээлийн хуудас",
      en: "A one-page lesson sheet",
    },
    summary: {
      mn: "Интернет тасалдсан ангид самбар, цаасаар явах нэг хуудас.",
      en: "One printed page for a classroom when the connection drops.",
    },
    minutes: 5,
    relatedCourse: "steppe-ecology",
    body: {
      mn: [
        "Хуудсыг дөрөв хуваа. Зүүн дээд: өнөөдрийн зорилго, нэг өгүүлбэр. Баруун дээд: гурван шалгуур. Зүүн доод: бодох эсвэл ажиглах даалгавар. Баруун доод: гарах тасалбар.",
        "Экологийн жишээ зорилго: «Хашаан дахь нэг газрыг нэрлээд тэмдэглэнэ.» Шалгуур: огноо бий, газар бий, харсан зүйлээ хэмжээтэй бичсэн. Даалгавар: 10 алхам газар сонго.",
        "Энэ хуудсыг утасны дэлгэцээр солих албагүй. Аймагт цахилгаан тасалдсан өдөр самбар дээрх дөрвөн хэсэг хангалттай. Хуудсаа хичээлийн төгсгөлд цуглуулбал дараагийн төлөвлөгөө бэлэн болно.",
      ],
      en: [
        "Divide the page into four. Top left: today’s aim, one sentence. Top right: three criteria. Bottom left: the problem or the observation. Bottom right: the exit ticket.",
        "An ecology aim: “Name one place in the yard and record it.” Criteria: the date is there, the place is there, what you saw includes a measure. Task: choose a spot ten steps away.",
        "The page does not have to become a phone screen. On a day when the power is out, the same four boxes on the board are enough. Collect the sheets and the next plan is already written.",
      ],
    },
  },
  {
    slug: "feedback-lines",
    kind: "guide",
    title: {
      mn: "Багшийн эргэх холбооны өгүүлбэр",
      en: "Feedback sentences for teachers",
    },
    summary: {
      mn: "Дэвтэр дээр бичихэд бэлэн хоёр өгүүлбэрийн загвар.",
      en: "Two-sentence comments you can write in a notebook.",
    },
    minutes: 4,
    relatedCourse: "formative-assessment",
    body: {
      mn: [
        "Эхний өгүүлбэр зөв хийсэн зүйлийг нэрлэнэ. «Явъя гэж зөв бичсэн.» «24-ийг зөв олсон.» «Огноо, газраа бичсэн.» Ерөнхий магтаал биш, харсан баримт.",
        "Хоёр дахь өгүүлбэр нэг алхам. «Одоо өгье-г эм үгээр шалга.» «24/32-ыг 100-аар үржүүл.» «Долоо хоногийн дараа мөн газарт оч.» Хоёр алхам бичвэл сурагч нэгийг нь хаяна.",
        "Ангийн ханан дээрх чансаа энэ өгүүлбэрийг орлохгүй. Сурагч бүр өөрийнхөө мөрийг уншина. Хэн нь тусламж авч байгааг бүх анги унших шаардлагагүй.",
      ],
      en: [
        "The first sentence names what was correct. “You wrote явъя.” “You found 24.” “You wrote the date and the place.” That is evidence, not a general compliment.",
        "The second sentence is one step. “Now check өгье as a feminine verb.” “Multiply 24/32 by 100.” “Return to the same place next week.” Two steps, and the student drops one.",
        "A ranking on the wall does not replace these sentences. Each student reads their own line. The class does not need to read who is getting help.",
      ],
    },
  },
];

export function getResource(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}
