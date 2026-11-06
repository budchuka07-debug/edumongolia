import type { Category, Education, Weekday } from "@/lib/content/directory";
import type { Locale } from "@/lib/i18n/types";

export type HubCopy = {
  title: string;
  lead: string;
  sample: string;
  railLabel: string;
  registerTeacher: string;
  registerStudent: string;
  seeAll: string;
  find: string;
  education: string;
  category: string;
  grouping: string;
  district: string;
  all: string;
  empty: string;
  years: string;
  rate: string;
  school: string;
  bio: string;
  back: string;
  saved: string;
  outside: string;
  licensed: string;
  unlicensed: string;
  foreign: string;
  levels: Record<Education, string>;
  categories: Record<Category, string>;
  groups: { individual: string; semi: string; all: string };
  days: Record<Weekday, string>;
  sections: {
    classroom: string;
    home: string;
    online: string;
    individual: string;
    semi: string;
    centers: string;
    tutors: string;
    onlineTeachers: string;
    scholarships: string;
    discounts: string;
    teacherInfo: string;
    licensed: string;
    foreignTeachers: string;
    international: string;
    travel: string;
    foreignUni: string;
    admin: string;
    schedule: string;
  };
  pages: Record<
    | "tutors"
    | "online"
    | "centers"
    | "scholarships"
    | "discounts"
    | "foreign"
    | "international"
    | "travel"
    | "foreignUni"
    | "teacher"
    | "student"
    | "admin",
    { title: string; lead: string }
  >;
  form: {
    name: string;
    grade: string;
    aim: string;
    school: string;
    years: string;
    district: string;
    bio: string;
    delivery: string;
    submitTeacher: string;
    submitStudent: string;
    teacherDone: string;
    studentDone: string;
    required: string;
    pickCategory: string;
    day: string;
    time: string;
    pickTeacher: string;
    noTeacher: string;
    openSlot: string;
    booked: string;
    students: string;
    teachers: string;
    openAdmin: string;
    noSignups: string;
    classroom: string;
    home: string;
    online: string;
  };
  rail: { href: string; label: string }[];
};

const railHrefs = [
  ["/#classroom", "classroom"],
  ["/#home", "home"],
  ["/#online", "online"],
  ["/#individual", "individual"],
  ["/#semi", "semi"],
  ["/centers", "centers"],
  ["/tutors", "tutors"],
  ["/online", "onlineTeachers"],
  ["/scholarships", "scholarships"],
  ["/discounts", "discounts"],
  ["/register/teacher", "registerTeacher"],
  ["/register/student", "registerStudent"],
  ["/admin", "admin"],
  ["/centers?licensed=1", "licensed"],
  ["/programs/foreign", "foreignTeachers"],
  ["/programs/international", "international"],
  ["/programs/travel", "travel"],
  ["/scholarships?scope=foreign", "foreignUni"],
] as const;

function rail(sections: HubCopy["sections"], registerTeacher: string, registerStudent: string) {
  const labels: Record<string, string> = {
    ...sections,
    registerTeacher,
    registerStudent,
  };
  return railHrefs.map(([href, key]) => ({ href, label: labels[key] }));
}

const mnSections: HubCopy["sections"] = {
  classroom: "Танхимын сургалт",
  home: "Гэрийн сургалт",
  online: "Онлайн сургалт",
  individual: "Ганцаарчилсан",
  semi: "Хагас ганцаарчилсан",
  centers: "Танхимын сургалтын төвүүд",
  tutors: "Гэрийн багш",
  onlineTeachers: "Онлайн сургалтын багш",
  scholarships: "Тэтгэлэг",
  discounts: "Хөнгөлөлт",
  teacherInfo: "Багшийн мэдээлэл",
  licensed: "Тусгай зөвшөөрөлтэй сургалтын төвүүд",
  foreignTeachers: "Гадаад багштай сургалт",
  international: "Олон улсын сургалтууд",
  travel: "Аялалтай сургалт",
  foreignUni: "Гадаадын их дээд сургуулийн тэтгэлэгт хөтөлбөр",
  admin: "Админ самбар",
  schedule: "Цагийн хуваарь",
};

const enSections: HubCopy["sections"] = {
  classroom: "Classroom study",
  home: "Home study",
  online: "Online study",
  individual: "Individual",
  semi: "Semi-individual",
  centers: "Classroom centers",
  tutors: "Home tutors",
  onlineTeachers: "Online teachers",
  scholarships: "Scholarships",
  discounts: "Discounts",
  teacherInfo: "Teacher profile",
  licensed: "Licensed training centers",
  foreignTeachers: "Courses with foreign teachers",
  international: "International courses",
  travel: "Study with travel",
  foreignUni: "Scholarship tracks for foreign universities",
  admin: "Admin desk",
  schedule: "Schedule",
};

export const hubCopy: Record<Locale, HubCopy> = {
  mn: {
    title: "Сургуулиас гадуурх сургалт",
    lead: "Сургуулиас гадуур гэрийн багш, танхимын төв, онлайн багшийг боловсролын зэрэг, хичээлийн ангиллаар нь шүүж олоорой.",
    sample: "Доорх багш, төв, тэтгэлэг нь жишээ. Жинхэнэ анги, зөвшөөрөл, төлбөр биш.",
    railLabel: "Ангилал",
    registerTeacher: "Багш бүртгүүлэх",
    registerStudent: "Сурагч бүртгүүлэх",
    seeAll: "Бүгдийг харах",
    find: "Багш хайх",
    education: "Боловсролын зэрэг",
    category: "Ангилал",
    grouping: "Хэлбэр",
    district: "Байршил",
    all: "Бүгд",
    empty: "Энэ шүүлтүүрт тохирох мэдээлэл алга.",
    years: "жилийн туршлага",
    rate: "Үнэ",
    school: "Боловсрол",
    bio: "Танилцуулга",
    back: "Жагсаалт руу",
    saved: "Таны бүртгэл энэ хөтөч дээр хадгалагдлаа.",
    outside: "Сургуулиас гадуур",
    licensed: "Тусгай зөвшөөрөлтэй",
    unlicensed: "Зөвшөөрөлгүй жишээ",
    foreign: "Гадаад багш",
    levels: {
      specialist: "Мэргэшсэн",
      bachelor: "Бакалавр",
      master: "Магистр",
      doctor: "Доктор",
    },
    categories: {
      math: "Математик",
      mongolian: "Монгол хэл",
      english: "Англи хэл",
      science: "Байгалийн ухаан",
      history: "Түүх",
      music: "Хөгжим",
      exam: "Шалгалтын бэлтгэл",
      code: "Программчлал",
    },
    groups: {
      all: "Бүх хэлбэр",
      individual: "Ганцаарчилсан",
      semi: "Хагас ганцаарчилсан",
    },
    days: {
      mon: "Даваа",
      tue: "Мягмар",
      wed: "Лхагва",
      thu: "Пүрэв",
      fri: "Баасан",
      sat: "Бямба",
    },
    sections: mnSections,
    pages: {
      tutors: {
        title: "Гэрийн багш",
        lead: "Сургуулиас гадуур гэртээ ирж заах багшийг боловсролын зэрэг, хичээлийн ангиллаар шүүнэ.",
      },
      online: {
        title: "Онлайн сургалтын багш",
        lead: "Гэрээсээ онлайн ганцаарчилсан болон хагас бүлгээр заах багш.",
      },
      centers: {
        title: "Танхимын сургалтын төвүүд",
        lead: "Тусгай зөвшөөрөлтэй төв, танхимын анги, гадаад багштай танхим.",
      },
      scholarships: {
        title: "Тэтгэлэг",
        lead: "Гэрийн багш, бэлтгэлийн төлбөрт зориулсан жишээ тэтгэлэг.",
      },
      discounts: {
        title: "Хөнгөлөлт",
        lead: "Төв, багшийн цагийн хөнгөлөлт. Хугацаа, хувь нь жишээ.",
      },
      foreign: {
        title: "Гадаад багштай сургалт",
        lead: "Гадаад багш танхимд эсвэл онлайн заах жишээ анги.",
      },
      international: {
        title: "Олон улсын сургалтууд",
        lead: "Олон улсын шалгалт, хэлний замын жишээ. Элсэлт амлахгүй.",
      },
      travel: {
        title: "Аялалтай сургалт",
        lead: "Газар дээр нь үздэг богино хөтөлбөр.",
      },
      foreignUni: {
        title: "Гадаадын их дээд сургуулийн тэтгэлэгт хөтөлбөр",
        lead: "Гадаад их сургуульд өгөх бэлтгэлийн тэтгэлэг. Өргөдлийг сурагч өөрөө илгээнэ.",
      },
      teacher: {
        title: "Багш бүртгүүлэх",
        lead: "Боловсролын зэрэг, хичээлийн ангилал, цагийн хуваариа үлдээнэ. Админ самбар болон багшийн мэдээлэл дээр гарна.",
      },
      student: {
        title: "Сурагч бүртгүүлэх",
        lead: "Нэр, анги, хүссэн цагаа үлдээнэ. Админ самбар дээр, сонгосон багшийн хуваарь дээр гарна.",
      },
      admin: {
        title: "Админ самбар",
        lead: "Энэ хөтөч дээр бүртгүүлсэн сурагч, багш энд жагсана. Багшийн цагийн хуваарь нь багшийн мэдээлэл дээр байна.",
      },
    },
    form: {
      name: "Нэр",
      grade: "Анги",
      aim: "Хүссэн хичээл",
      school: "Сургууль, мэргэжил",
      years: "Туршлага (жил)",
      district: "Дүүрэг, хот",
      bio: "Товч танилцуулга",
      delivery: "Заах хэлбэр",
      submitTeacher: "Багшаар бүртгэх",
      submitStudent: "Сурагчаар бүртгэх",
      teacherDone: "Багшийн мэдээлэл нэмэгдлээ.",
      studentDone: "Сурагчийн бүртгэл хадгалагдлаа.",
      required: "Нэрээ бичнэ үү.",
      pickCategory: "Дор хаяж нэг ангилал сонгоно уу.",
      day: "Өдөр",
      time: "Цаг",
      pickTeacher: "Багш",
      noTeacher: "Багш сонгоогүй",
      openSlot: "Сул",
      booked: "Захиалга",
      students: "Сурагчийн бүртгэл",
      teachers: "Багшийн бүртгэл",
      openAdmin: "Админ самбар нээх",
      noSignups: "Одоогоор бүртгэл алга.",
      classroom: "Танхим",
      home: "Гэр",
      online: "Онлайн",
    },
    rail: rail(mnSections, "Багш бүртгүүлэх", "Сурагч бүртгүүлэх"),
  },
  en: {
    title: "Study beyond the school day",
    lead: "Find a tutor outside school. Filter home tutors, classroom centers, and online teachers by degree and subject.",
    sample: "Teachers, centers, and grants below are samples, not a live class list, license, or fee.",
    railLabel: "Categories",
    registerTeacher: "Register as a teacher",
    registerStudent: "Register as a student",
    seeAll: "See all",
    find: "Find a tutor",
    education: "Education",
    category: "Subject",
    grouping: "Format",
    district: "Place",
    all: "All",
    empty: "Nothing matches this filter.",
    years: "years of practice",
    rate: "Fee",
    school: "Education",
    bio: "About",
    back: "Back to the list",
    saved: "Your registration stays in this browser.",
    outside: "Outside school",
    licensed: "Licensed",
    unlicensed: "Sample, no license",
    foreign: "Foreign teacher",
    levels: {
      specialist: "Specialist",
      bachelor: "Bachelor's",
      master: "Master's",
      doctor: "Doctorate",
    },
    categories: {
      math: "Mathematics",
      mongolian: "Mongolian",
      english: "English",
      science: "Science",
      history: "History",
      music: "Music",
      exam: "Exam prep",
      code: "Programming",
    },
    groups: {
      all: "Every format",
      individual: "Individual",
      semi: "Semi-individual",
    },
    days: {
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday",
    },
    sections: enSections,
    pages: {
      tutors: {
        title: "Home tutors",
        lead: "Tutors who come to the home, outside school. Filter by degree and subject.",
      },
      online: {
        title: "Online teachers",
        lead: "Teachers who meet online, one to one or in a small group.",
      },
      centers: {
        title: "Classroom centers",
        lead: "Licensed centers, classroom groups, and rooms with foreign teachers.",
      },
      scholarships: {
        title: "Scholarships",
        lead: "Sample grants toward a home tutor or a prep course.",
      },
      discounts: {
        title: "Discounts",
        lead: "Sample percent off a center or a tutor hour.",
      },
      foreign: {
        title: "Courses with foreign teachers",
        lead: "Sample classes taught by a teacher from abroad, in a room or online.",
      },
      international: {
        title: "International courses",
        lead: "Sample paths for international exams. They do not promise a place.",
      },
      travel: {
        title: "Study with travel",
        lead: "Short programs taught on site.",
      },
      foreignUni: {
        title: "Scholarship tracks for foreign universities",
        lead: "Prep grants for study abroad. The student sends the application.",
      },
      teacher: {
        title: "Register as a teacher",
        lead: "Leave your degree, subjects, and weekly hours. They show on the admin desk and on your profile.",
      },
      student: {
        title: "Register as a student",
        lead: "Leave your name, grade, and a time. It shows on the admin desk and on the tutor's schedule.",
      },
      admin: {
        title: "Admin desk",
        lead: "Students and teachers who register in this browser are listed here. A teacher's hours stay on the teacher profile.",
      },
    },
    form: {
      name: "Name",
      grade: "Grade",
      aim: "Subject you want",
      school: "School and field",
      years: "Years of practice",
      district: "District or city",
      bio: "Short introduction",
      delivery: "How you teach",
      submitTeacher: "Save teacher profile",
      submitStudent: "Save student profile",
      teacherDone: "The teacher profile was added.",
      studentDone: "The student profile was saved.",
      required: "Enter a name.",
      pickCategory: "Choose at least one subject.",
      day: "Day",
      time: "Time",
      pickTeacher: "Teacher",
      noTeacher: "No teacher yet",
      openSlot: "Open",
      booked: "Booked",
      students: "Student registrations",
      teachers: "Teacher registrations",
      openAdmin: "Open the admin desk",
      noSignups: "No registrations yet.",
      classroom: "Classroom",
      home: "Home",
      online: "Online",
    },
    rail: rail(enSections, "Register as a teacher", "Register as a student"),
  },
};
