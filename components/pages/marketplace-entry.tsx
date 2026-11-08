"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useI18n } from "@/components/language-provider";
import { paths } from "@/lib/marketplace/paths";

function Frame({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{lead}</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Card({ href, title, lead }: { href: string; title: string; lead: string }) {
  return (
    <Link href={href} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{lead}</p>
    </Link>
  );
}

export function StudyAbroadEntry() {
  const { locale } = useI18n();
  const en = locale === "en";
  return (
    <Frame
      title={en ? "Study abroad" : "Гадаадад суралцах"}
      lead={
        en
          ? "China is the first country in this directory. Travel study, English immersion, and foreign-teacher programs stay in their own sections."
          : "Эхний улс нь Хятад. Аялалтай сургалт, англи хэлний хөтөлбөр, гадаад багштай хичээл өөр хэсэгтээ үлдэнэ."
      }
    >
      <Card href={paths.china} title={en ? "Study in China" : "Хятадад суралцах"} lead={en ? "Universities, programs, scholarships, and CSCA." : "Их сургууль, хөтөлбөр, тэтгэлэг, CSCA."} />
      <Card href={paths.universities} title={en ? "Chinese universities" : "Хятадын их сургуулиуд"} lead={en ? "A university appears after its official page is checked. EduMongolia does not claim to represent a university." : "Их сургууль албан хуудсыг нь шалгасны дараа гарна. EduMongolia их сургуулийг төлөөлж байна гэж зарлахгүй."} />
      <Card href={paths.programs} title={en ? "University programs" : "Их сургуулийн хөтөлбөр"} lead={en ? "Bachelor, master, and doctoral programs, kept apart from tutoring offers." : "Бакалавр, магистр, доктор. Багшийн зарлалаас тусдаа."} />
      <Card href={paths.scholarships} title={en ? "Scholarship finder" : "Тэтгэлэг хайх"} lead={en ? "Amounts stay unpublished until an official notice is recorded." : "Мөнгөн дүн албан зарлалгүй бол нийтлэгдээгүй."} />
      <Card href={paths.admission} title={en ? "Admission requirements" : "Элсэлтийн нөхцөл"} lead={en ? "How to read a requirement. Not a promise of admission." : "Нөхцөлийг хэрхэн унших вэ. Элсэлт амлахгүй."} />
      <Card href={paths.exams} title={en ? "Examination requirements" : "Шалгалтын нөхцөл"} lead={en ? "HSK, IELTS, TOEFL, CSCA. No invented cut scores." : "HSK, IELTS, TOEFL, CSCA. Доод оноог зохиохгүй."} />
      <Card href={paths.eligibility} title={en ? "Eligibility checker" : "Шалгуур шалгах"} lead={en ? "Compares what you enter with published fields only." : "Таны оруулсныг зөвхөн нийтлэгдсэн талбартай жишинэ."} />
      <Card href={paths.apply} title={en ? "Application services" : "Зөвлөгөө авах"} lead={en ? "A consultation request. It does not submit a university application." : "Зөвлөгөөний хүсэлт. Их сургуульд өргөдөл илгээхгүй."} />
      <Card href="/programs/international" title={en ? "International programs" : "Олон улсын сургалт"} lead={en ? "Existing EduMongolia listings, separate from the China catalog." : "Одоогийн зарлал. Хятадын каталогоос тусдаа."} />
      <Card href="/programs/travel" title={en ? "Educational travel" : "Аялалтай сургалт"} lead={en ? "Study trips already listed on EduMongolia." : "EduMongolia дээрх аялалтай сургалт."} />
      <Card href="/programs/english" title={en ? "English immersion" : "Англи хэлний аялал"} lead={en ? "Booking is handled on Booking Mongolia." : "Захиалга Booking Mongolia дээр."} />
    </Frame>
  );
}

export function AccountEntry() {
  const { locale } = useI18n();
  const en = locale === "en";
  return (
    <Frame
      title={en ? "My account" : "Миний бүртгэл"}
      lead={
        en
          ? "One EduMongolia account for tutoring and university applications is planned. Sign-in is not connected, and applications are not stored in the browser."
          : "Багшийн үйлчилгээ ба их сургуулийн өргөдөлд нэг бүртгэл төлөвлөсөн. Нэвтрэлт холбогдоогүй. Өргөдлийг хөтөчид хадгалахгүй."
      }
    >
      <Card href="/register/student" title={en ? "Student profile" : "Сурагчийн бүртгэл"} lead={en ? "The current student form. It stays on this browser for the tutoring desk." : "Одоогийн сурагчийн маягт. Багшийн самбарт энэ хөтөч дээр үлдэнэ."} />
      <Card href={paths.apply} title={en ? "My applications" : "Миний өргөдөл"} lead={en ? "Consultation only until accounts exist. Nothing is filed with a university." : "Бүртгэл гартал зөвлөгөө. Их сургуульд материал явахгүй."} />
      <Card href={paths.universities} title={en ? "Saved universities" : "Хадгалсан их сургууль"} lead={en ? "Saving is not switched on. Browse the directory." : "Хадгалах хараахан нээгээгүй. Лавлахаас үзнэ үү."} />
      <Card href={paths.scholarships} title={en ? "Saved scholarships" : "Хадгалсан тэтгэлэг"} lead={en ? "Saving is not switched on. Browse published scholarship records." : "Хадгалах хараахан нээгээгүй. Нийтлэгдсэн тэтгэлгээс үзнэ үү."} />
      <Card href={paths.eligibility} title={en ? "My documents" : "Миний бичиг баримт"} lead={en ? "Document upload needs a private store. Use the checker to see which documents a record asks for." : "Файл хуулах хувийн сан хэрэгтэй. Аль бичиг шаардсаныг шалгуураас харна."} />
      <Card href="/admin" title={en ? "This browser’s desk" : "Энэ хөтчийн самбар"} lead={en ? "Student, teacher, and paper orders saved on this browser." : "Энэ хөтөч дээрх сурагч, багш, бичгийн захиалга."} />
    </Frame>
  );
}

export function PartnersEntry() {
  const { locale } = useI18n();
  const en = locale === "en";
  return (
    <Frame
      title={en ? "Partners" : "Хамтрагчид"}
      lead={
        en
          ? "Teachers and students can register today. Agent and university-partner desks are not open, and they will only see their own records when accounts exist."
          : "Багш, сурагч өнөөдөр бүртгүүлнэ. Агент болон их сургуулийн самбар хараахан нээгээгүй. Нээгдэхэд зөвхөн өөрийн бүртгэлээ харна."
      }
    >
      <Card href="/register/teacher" title={en ? "Register as a teacher" : "Багшаар бүртгүүлэх"} lead={en ? "Shows on this browser’s admin desk and teacher schedule." : "Энэ хөтчийн админ самбар болон багшийн хуваарьт гарна."} />
      <Card href="/register/student" title={en ? "Register as a student" : "Сурагчаар бүртгүүлэх"} lead={en ? "For tutoring. It is not a university application." : "Багшийн үйлчилгээнд. Их сургуулийн өргөдөл биш."} />
      <Card href={paths.apply} title={en ? "Become an education agent" : "Боловсролын агент болох"} lead={en ? "Leave a consultation request. Agent access is not granted from this form." : "Зөвлөгөөний хүсэлт үлдээнэ. Энэ маягт агентын эрх нээхгүй."} />
      <Card href={paths.universities} title={en ? "University partnerships" : "Их сургуулийн хамтын ажиллагаа"} lead={en ? "No university partnership is published. A partnership page opens only after an agreement." : "Гэрээт их сургууль нийтлэгдээгүй. Гэрээ байгуулсны дараа хуудас нээгдэнэ."} />
    </Frame>
  );
}
