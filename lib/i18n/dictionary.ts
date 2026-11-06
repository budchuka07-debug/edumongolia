import type { Level, Locale, Subject } from "@/lib/i18n/types";

export type Dictionary = {
  brand: string;
  tagline: string;
  nav: {
    home: string;
    courses: string;
    resources: string;
    students: string;
    teachers: string;
    about: string;
  };
  header: { menu: string; language: string; close: string };
  footer: { explore: string; people: string; note: string; domain: string };
  home: {
    eyebrow: string;
    title: string;
    lead: string;
    primary: string;
    secondary: string;
    sample: string;
    facts: { value: string; label: string }[];
    pathsTitle: string;
    studentTitle: string;
    studentBody: string;
    studentCta: string;
    teacherTitle: string;
    teacherBody: string;
    teacherCta: string;
    coursesTitle: string;
    coursesLead: string;
    allCourses: string;
    stepsTitle: string;
    steps: { title: string; body: string }[];
    resourcesTitle: string;
    allResources: string;
    quote: string;
    quoteBy: string;
    closeTitle: string;
    closeBody: string;
    deskLabel: string;
    deskCourse: string;
    deskMeta: string;
  };
  courses: {
    title: string;
    lead: string;
    search: string;
    allSubjects: string;
    allLevels: string;
    empty: string;
    lessons: string;
    minutes: string;
    outcomes: string;
    practice: string;
    correct: string;
    incorrect: string;
    markDone: string;
    markUndone: string;
    progress: string;
    notFound: string;
    notFoundBody: string;
    back: string;
    openDesk: string;
    audience: string;
  };
  subjects: Record<Subject, string>;
  levels: Record<Level, string>;
  resources: {
    title: string;
    lead: string;
    search: string;
    empty: string;
    read: string;
    save: string;
    saved: string;
    back: string;
    related: string;
    notFound: string;
    kinds: { plan: string; guide: string; template: string };
  };
  students: {
    title: string;
    lead: string;
    local: string;
    lessonsDone: string;
    inProgress: string;
    saved: string;
    week: string;
    continue: string;
    noneSaved: string;
    openCourse: string;
  };
  teachers: {
    title: string;
    lead: string;
    sample: string;
    tabs: { class: string; library: string; notes: string };
    search: string;
    steady: string;
    check: string;
    focus: string;
    emptyNotes: string;
    placeholder: string;
    post: string;
    remove: string;
    openCourse: string;
  };
  about: {
    title: string;
    lead: string;
    sections: { title: string; body: string }[];
  };
  notFound: { title: string; body: string; home: string };
};

const mn: Dictionary = {
  brand: "EduMongolia",
  tagline: "Сургуулиас гадуурх багш, төв, тэтгэлэг",
  nav: {
    home: "Нүүр",
    courses: "Хичээл",
    resources: "Нөөц",
    students: "Сурагч",
    teachers: "Багш",
    about: "Бидний тухай",
  },
  header: { menu: "Цэс", language: "Хэл", close: "Хаах" },
  footer: {
    explore: "Хэсгүүд",
    people: "Хэнд зориулсан",
    note: "Эхний хувилбар. Бүртгэлгүй. Ахиц, хадгалсан нөөц, багшийн тэмдэглэл энэ төхөөрөмж дээр үлдэнэ.",
    domain: "edumongolia.com",
  },
  home: {
    eyebrow: "Монгол · English",
    title: "Аймаг бүрийн ангид хүрэх хичээл.",
    lead: "EduMongolia бол сурагчийн ширээ, багшийн самбар, хэвлэж болох нөөцийг нэг дор багтаасан сургалтын талбар. Хэлээ сольж, хичээлээ үргэлжлүүл.",
    primary: "Хичээл үзэх",
    secondary: "Сурагчийн ширээ",
    sample: "Жишээ ангиуд: Улаанбаатар, Дархан, Ховд, Дорнод. Энэ хувилбарт хамтрагч сургууль гэж зарлахгүй.",
    facts: [
      { value: "6", label: "бэлэн хичээл" },
      { value: "6", label: "багшийн нөөц" },
      { value: "2", label: "хэл" },
    ],
    pathsTitle: "Хоёр хаалга, нэг сан",
    studentTitle: "Сурагчийн ширээ",
    studentBody: "Үргэлжлүүлэх хичээл, долоо хоногийн гурван ажил, хадгалсан нөөц.",
    studentCta: "Ширээ нээх",
    teacherTitle: "Багшийн самбар",
    teacherBody: "8Б ангийн жишээ ахиц, хичээлийн сан, ангид үлдээх тэмдэглэл.",
    teacherCta: "Самбар нээх",
    coursesTitle: "Энэ долоо хоногт нээх хичээл",
    coursesLead: "Дүрэм, тоо, ойр орчны ажиглалт. Хичээл бүр богино уншлага, дараа нь гурван шалгалттай.",
    allCourses: "Бүх хичээл",
    stepsTitle: "Хэрхэн хэрэглэх вэ",
    steps: [
      { title: "Хэлээ сонго", body: "Монгол эсвэл English. Сонголт дараагийн нэвтрэлтэд үлдэнэ." },
      { title: "Хичээлээ унш", body: "Модуль нээгээд хичээлээ тэмдэглэ. Ахиц ширээн дээр харагдана." },
      { title: "Ангидаа аваач", body: "Нөөцөө хэвлэ. Цахилгаан тасалдсан өдөр нэг хуудас хангалттай." },
    ],
    resourcesTitle: "Хэвлээд хэрэглэх нөөц",
    allResources: "Бүх нөөц",
    quote: "Шалгуураа даалгавраас өмнө хэл. «Сайн байна» гэсэн үг дараагийн алхмыг орлохгүй.",
    quoteBy: "О. Оюунчимэг, арга зүйч багш · жишээ хичээлээс",
    closeTitle: "edumongolia.com дээрх эхний хувилбар",
    closeBody: "Хичээл, нөөц, сурагч, багшийн хэсэг бэлэн. Данс, төлбөр, сургуулийн сервер энэ хувилбарт байхгүй.",
    deskLabel: "Өнөөдрийн ширээ",
    deskCourse: "Бутархай ба хувь",
    deskMeta: "32 сурагчийн 3/4 нь 24. Дараа нь 75%.",
  },
  courses: {
    title: "Хичээл",
    lead: "Хэл, математик, түүх, экологи, багшийн үнэлгээ. Шүүлтүүр нэр, сэдэв, түвшингээр ажиллана.",
    search: "Хичээл хайх",
    allSubjects: "Бүх сэдэв",
    allLevels: "Бүх түвшин",
    empty: "Энэ шүүлтүүрт таарах хичээл алга. Үгээ богиносгоод дахин хай.",
    lessons: "хичээл",
    minutes: "минут",
    outcomes: "Энэ хичээлээр",
    practice: "Гурван шалгалт",
    correct: "Зөв.",
    incorrect: "Дахиад нэг хар. Зөв хариултыг доор нь үлдээлээ.",
    markDone: "Уншсанаар тэмдэглэ",
    markUndone: "Тэмдгийг болиулах",
    progress: "Ахиц",
    notFound: "Ийм хичээл алга",
    notFoundBody: "Холбоос хуучирсан байж магадгүй. Жагсаалт руу буц.",
    back: "Хичээл рүү буцах",
    openDesk: "Сурагчийн ширээ",
    audience: "Хэнд",
  },
  subjects: {
    language: "Хэл",
    stem: "Байгалийн ухаан",
    humanities: "Нийгэм",
    teaching: "Багш",
  },
  levels: {
    middle: "Дунд анги",
    secondary: "Ахлах анги",
    teacher: "Багш",
  },
  resources: {
    title: "Нөөц",
    lead: "Төлөвлөгөө, гэр бүлд өгөх тайлбар, цахим аюулгүй байдал, хэвлэмэл хуудас.",
    search: "Нөөц хайх",
    empty: "Таарах нөөц алга.",
    read: "Унших",
    save: "Хадгалах",
    saved: "Хадгалсан",
    back: "Нөөц рүү буцах",
    related: "Холбоотой хичээл",
    notFound: "Ийм нөөц алга",
    kinds: { plan: "Төлөвлөгөө", guide: "Гарын авлага", template: "Загвар" },
  },
  students: {
    title: "Сурагчийн ширээ",
    lead: "Жишээ сурагч Тэмүүлэнгийн 8-р ангийн ширээ. Чиний уншсан хичээл энд нэмэгдэнэ.",
    local: "Энэ төхөөрөмж дээр хадгалагдана. Өөр утас руу дамжихгүй.",
    lessonsDone: "уншсан хичээл",
    inProgress: "нээлттэй хичээл",
    saved: "хадгалсан нөөц",
    week: "Энэ долоо хоног",
    continue: "Үргэлжлүүлэх",
    noneSaved: "Одоогоор хадгалсан нөөц алга. Нөөц хуудаснаас хадгал.",
    openCourse: "Хичээл нээх",
  },
  teachers: {
    title: "Багшийн самбар",
    lead: "Нийслэлийн 23 дугаар сургуулийн 8Б ангийн жишээ. Нэр, ахиц нь бодит сурагчийн бүртгэл биш.",
    sample: "Жишээ анги",
    tabs: { class: "Анги", library: "Сан", notes: "Тэмдэглэл" },
    search: "Нэрээр хайх",
    steady: "Тогтвортой",
    check: "Эргэж үз",
    focus: "Одоогийн сэдэв",
    emptyNotes: "Ангид үлдээх тэмдэглэл алга. Доор бичээд нэм.",
    placeholder: "Жишээ: маргааш 24/32-ыг хувь болгохыг самбарт эхэлье.",
    post: "Тэмдэглэл нэмэх",
    remove: "Устгах",
    openCourse: "Үнэлгээний хичээл",
  },
  about: {
    title: "Бидний тухай",
    lead: "EduMongolia нь Монголын сурагч, багш нарт зориулсан хоёр хэлтэй сургалтын талбар. edumongolia.com энэ төслийн нэр ба домайн.",
    sections: [
      {
        title: "Юу бэлэн бэ",
        body: "Нүүр, хичээл, нөөц, сурагчийн ширээ, багшийн самбар. Гар утас, таблет, компьютерын өргөнд таарна. Хэл солих товч толгой хэсэгт байна.",
      },
      {
        title: "Юу хадгалагдах вэ",
        body: "Ахиц, хадгалсан нөөц, долоо хоногийн ажил, багшийн тэмдэглэл зөвхөн энэ хөтөч дээр үлдэнэ. Сургуулийн сервер, нэвтрэх нэр, төлбөр байхгүй.",
      },
      {
        title: "Код яаж хуваагдсан бэ",
        body: "app доторх хуудас, components доторх харагдац, lib/content доторх хичээл ба нөөц, lib/i18n доторх монгол, англи хэл. Шинэ хичээл нэмэхэд эхлээд lib/content/courses.ts-д бичнэ.",
      },
    ],
  },
  notFound: {
    title: "Хуудас олдсонгүй",
    body: "Энэ хаяг EduMongolia дээр алга.",
    home: "Нүүр лүү",
  },
};

const en: Dictionary = {
  brand: "EduMongolia",
  tagline: "Tutors, centers, and scholarships beyond school",
  nav: {
    home: "Home",
    courses: "Courses",
    resources: "Resources",
    students: "Students",
    teachers: "Teachers",
    about: "About",
  },
  header: { menu: "Menu", language: "Language", close: "Close" },
  footer: {
    explore: "Explore",
    people: "For whom",
    note: "First release. No accounts. Progress, saved resources, and teacher notes stay on this device.",
    domain: "edumongolia.com",
  },
  home: {
    eyebrow: "Монгол · English",
    title: "Lessons that can reach every aimag.",
    lead: "EduMongolia puts a student desk, a teacher board, and printable resources in one place. Switch language and continue the lesson.",
    primary: "Browse courses",
    secondary: "Open the student desk",
    sample: "Sample classrooms: Ulaanbaatar, Darkhan, Khovd, Dornod. This release does not claim partner schools.",
    facts: [
      { value: "6", label: "ready courses" },
      { value: "6", label: "teacher resources" },
      { value: "2", label: "languages" },
    ],
    pathsTitle: "Two doors, one library",
    studentTitle: "Student desk",
    studentBody: "The course to continue, three jobs for the week, and saved resources.",
    studentCta: "Open the desk",
    teacherTitle: "Teacher board",
    teacherBody: "Sample progress for class 8B, the lesson library, and a note for the room.",
    teacherCta: "Open the board",
    coursesTitle: "Open one of these this week",
    coursesLead: "Spelling, number, and a look at the land nearby. Each course is a short reading plus three checks.",
    allCourses: "All courses",
    stepsTitle: "How to use it",
    steps: [
      { title: "Choose a language", body: "Монгол or English. The choice stays for the next visit." },
      { title: "Read a lesson", body: "Open a module and mark the lesson. Progress shows up on the desk." },
      { title: "Take it to class", body: "Print a resource. One page is enough on a day when the power is out." },
    ],
    resourcesTitle: "Resources you can print",
    allResources: "All resources",
    quote: "Say the criteria before the task. “Good job” does not replace the next step.",
    quoteBy: "O. Oyuunchimeg, teacher mentor · from a sample lesson",
    closeTitle: "The first release for edumongolia.com",
    closeBody: "Courses, resources, and the student and teacher sections are ready. Accounts, payments, and a school server are not in this release.",
    deskLabel: "Today’s desk",
    deskCourse: "Fractions and percent",
    deskMeta: "3/4 of 32 students is 24. Next, turn that into 75%.",
  },
  courses: {
    title: "Courses",
    lead: "Language, mathematics, history, ecology, and teacher assessment. Filter by name, subject, or level.",
    search: "Search courses",
    allSubjects: "All subjects",
    allLevels: "All levels",
    empty: "No course matches this filter. Shorten the search and try again.",
    lessons: "lessons",
    minutes: "min",
    outcomes: "You will be able to",
    practice: "Three checks",
    correct: "Correct.",
    incorrect: "Look once more. The right answer is marked below.",
    markDone: "Mark as read",
    markUndone: "Clear the mark",
    progress: "Progress",
    notFound: "No course at this address",
    notFoundBody: "The link may be old. Go back to the list.",
    back: "Back to courses",
    openDesk: "Student desk",
    audience: "For",
  },
  subjects: {
    language: "Language",
    stem: "Science",
    humanities: "Humanities",
    teaching: "Teaching",
  },
  levels: {
    middle: "Middle school",
    secondary: "Secondary",
    teacher: "Teachers",
  },
  resources: {
    title: "Resources",
    lead: "A week plan, a note for families, digital safety, and a page you can print.",
    search: "Search resources",
    empty: "No resource matches.",
    read: "Read",
    save: "Save",
    saved: "Saved",
    back: "Back to resources",
    related: "Related course",
    notFound: "No resource at this address",
    kinds: { plan: "Plan", guide: "Guide", template: "Template" },
  },
  students: {
    title: "Student desk",
    lead: "A sample desk for Temuulen in grade 8. Lessons you mark as read are added here.",
    local: "Stored on this device. It does not travel to another phone.",
    lessonsDone: "lessons read",
    inProgress: "open courses",
    saved: "saved resources",
    week: "This week",
    continue: "Continue",
    noneSaved: "Nothing is saved yet. Save a resource from the resources page.",
    openCourse: "Open course",
  },
  teachers: {
    title: "Teacher board",
    lead: "A sample of class 8B at School No. 23 in Ulaanbaatar. The names and progress are not a real register.",
    sample: "Sample class",
    tabs: { class: "Class", library: "Library", notes: "Notes" },
    search: "Search by name",
    steady: "Steady",
    check: "Check in",
    focus: "Current topic",
    emptyNotes: "No note for the class yet. Write one below.",
    placeholder: "Example: tomorrow we start by turning 24/32 into a percent.",
    post: "Add note",
    remove: "Remove",
    openCourse: "Assessment course",
  },
  about: {
    title: "About",
    lead: "EduMongolia is a bilingual learning place for students and teachers in Mongolia. edumongolia.com is the project name and the domain.",
    sections: [
      {
        title: "What is ready",
        body: "Home, courses, resources, a student desk, and a teacher board. The layout fits a phone, a tablet, and a desktop. The language control sits in the header.",
      },
      {
        title: "What is stored",
        body: "Progress, saved resources, the week list, and teacher notes stay in this browser. There is no school server, login, or payment.",
      },
      {
        title: "How the code is split",
        body: "Pages live in app, screens in components, courses and resources in lib/content, and Mongolian and English in lib/i18n. A new course starts in lib/content/courses.ts.",
      },
    ],
  },
  notFound: {
    title: "Page not found",
    body: "That address is not on EduMongolia.",
    home: "Go home",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { mn, en };
