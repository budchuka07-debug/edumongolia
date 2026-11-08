import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { paths } from "@/lib/marketplace/paths";
import { innerMongoliaPublishedStatus, innerMongoliaUniversities } from "@/lib/scholarships/inner-mongolia";
import { cn } from "cn";

const benefits = [
  ["Сургалтын төлбөр", "Сургалтын төлбөрийг тэтгэлэг хамарна гэж өмнөх удирдамжид заасан. 2027/2028 оны дүнг шинэ зар батлана."],
  ["Сургуулийн байр", "Их сургуулийн дотуур байрыг хамруулна гэж өмнөх удирдамжид заасан. Байрны нөхцөл сургууль бүрээр өөр."],
  ["Амьжиргааны зардал", "Сарын тэтгэлгийн хэмжээ: албан ёсны удирдамжаар баталгаажуулна."],
  ["Эрүүл мэндийн даатгал", "Иж бүрэн эмчилгээний даатгалыг хамруулна гэж өмнөх удирдамжид заасан. Даатгалын дүн, нөхцөлийг шинэ зар батлана."],
];

const steps = [
  "Шаардлага хангаж байгаа эсэхээ шалгана.",
  "Оролцогч 9 сургуулиас нэгийг, хавсралтад баталгаажсан мэргэжлийг сонгоно.",
  "Албан өргөдлийн портал дээр бүртгүүлнэ.",
  "Баримт бичгээ оруулна.",
  "Сургууль урьдчилсан шүүлт хийнэ.",
  "Хамаарах Монголын байгууллага баталгаажуулна. Энэ алхам хамаарах үед.",
  "Сургуулийн шалгалт эсвэл ярилцлага. Хамаарах үед.",
  "Элсэлтийн дүн, албан бичиг.",
  "Виз, аяллын бэлтгэл.",
];

const documents = [
  "Тэтгэлгийн өргөдлийн маягт",
  "Хүчинтэй гадаад паспортын хуулбар",
  "Төгссөн үнэмлэх эсвэл диплом",
  "Дүнгийн хуулбар",
  "Суралцах төлөвлөгөө",
  "Эрүүл мэндийн үзлэгийн маягт",
  "Ял шийтгэлгүй тухай тодорхойлолт",
  "Шаардлагатай үед HSK-ийн сертификат",
  "Магистр, докторын өргөдөлд хоёр зөвлөмжийн захидал",
  "Шаардлагатай үед хятад эсвэл англи орчуулга, нотариат",
  "Сонгосон сургуулийн нэмэлт материал",
];

const faqs = [
  ["Энэ Хятадын засгийн газрын тэтгэлэг үү?", "Үгүй. Энэ нь Өвөр Монголын өөртөө засах орны засгийн газрын тусдаа хөтөлбөр. CSC, их сургуулийн тэтгэлэг, бусад мужийн тэтгэлэгтэй нэгтгээгүй."],
  ["260 суудал 2027/2028 онд хэвээр үү?", "Үгүй. 260, 200, 40, 20 нь зөвхөн 2026/2027 оны батлагдсан квот. Шинэ жилийн квот зар гарахад шинэчлэгдэнэ."],
  ["Сарын мөнгө хэд вэ?", "Сарын тэтгэлгийн хэмжээ: албан ёсны удирдамжаар баталгаажуулна. Дүн зохиогоогүй."],
  ["Хятад хэлний бэлтгэл бүгдэд олгогдох уу?", "Үгүй. Хэлний түвшин хүрэхгүй оюутанд нэг жилийн бэлтгэл шаардаж болно. Тусдаа хэлний тэтгэлэг хүн бүрт автоматаар олгоно гэж амлаагүй."],
  ["2027/2028 хэзээ нээх вэ?", "Нээх огноо, хаах огноо албан ёсоор баталгаажаагүй. Хуурамч тоололт гаргаагүй."],
];

export function InnerMongoliaScholarshipPage() {
  const status = innerMongoliaPublishedStatus;
  return (
    <article>
      <header className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">Тусдаа тэтгэлэг · CSC биш</p>
            <h1 className="mt-3 font-heading text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
              Өвөр Монголын Засгийн газрын тэтгэлэг
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Inner Mongolia Government Scholarship for Mongolian Students</p>
            <p className="text-sm leading-6 text-muted-foreground">内蒙古自治区政府奖学金</p>
            <p className="mt-4 max-w-xl text-base leading-7">
              Өвөр Монголын өөртөө засах орны засгийн газраас шаардлага хангасан Монгол оюутанд олгодог тусгай тэтгэлэг. Хятадын засгийн газрын тэтгэлэг, их сургуулийн тэтгэлэг, бусад мужийн хөтөлбөрөөс тусдаа.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href={paths.apply} className={cn(buttonVariants({ size: "lg" }))}>Зөвлөгөө авах</Link>
              <a href="#status" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>Элсэлтийн төлөв</a>
            </div>
          </div>
          <figure>
            <img
              src="/images/inner-mongolia-scholarship-hero.jpg"
              alt="Өвөр Монголын тал хээр, алсад сургуулийн байр. Загварын зураг."
              className="h-72 w-full rounded-3xl object-cover sm:h-80"
            />
            <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">
              Загварын зураг. Аль нэг оролцогч сургуулийн байрны гэрэл зураг биш.
            </figcaption>
          </figure>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10">
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Хэн олгох вэ", "Өвөр Монголын засгийн газар"],
            ["Хэнд", "Шаардлага хангасан Монгол иргэн"],
            ["Өмнөх жилийн зэрэг", "Бакалавр, магистр, доктор"],
            ["Шинэ жил", "2027/2028 зар хүлээгдэж байна"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
              <p className="text-xs font-medium text-muted-foreground">{label}</p>
              <p className="mt-2 font-heading text-lg font-semibold">{value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-border bg-card p-5 sm:p-8">
          <p className="text-sm font-semibold text-primary">Өмнөх жилийн батлагдсан квот – 2026/2027</p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Эдгээр тоо зөвхөн 2026/2027 оны түүхэн мэдээлэл. 2027/2028 оны батлагдсан квот биш.
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Нийт", "260"],
              ["Бакалавр", "200"],
              ["Магистр", "40"],
              ["Доктор", "20"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="font-heading text-3xl font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm leading-6">
            Шинэ элсэлтийн квот болон бүртгэлийн хугацаа албан ёсны зар гарахад шинэчлэгдэнэ.
          </p>
        </section>

        <section id="status" className="scroll-mt-20">
          <h2 className="font-heading text-2xl font-semibold">Элсэлтийн төлөв</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Status label="Өмнөх элсэлт" value={`${status.previousCycle} · ${status.previousStateMn}`} />
            <Status label="Дараагийн элсэлт" value={`${status.nextCycle} · ${status.nextStateMn}`} />
            <Status label="Нээх огноо" value="Албан ёсоор баталгаажаагүй" />
            <Status label="Хаах огноо" value="Албан ёсоор баталгаажаагүй" />
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">Тэтгэлэг юуг хамардаг</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {benefits.map(([title, body]) => (
              <article key={title} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
                <h3 className="font-heading text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
            Нислэгийн тийз, паспортын зардал, орчуулга, нотариат болон бусад хувийн зардал хамрагдахгүй байж болно.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">Хэн хамрагдах вэ</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Доорх нас, хэлний мөр нь өмнөх элсэлтийн шалгуур. 2027/2028 оны албан зар гартал энэ жилийн нөхцөл биш.
          </p>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <article className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
              <h3 className="font-heading text-xl font-semibold">Бакалавр</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
                <li>Монгол Улсын иргэн</li>
                <li>Бүрэн дунд боловсрол эзэмшсэн</li>
                <li>Нас: өмнөх удирдамжаар ерөнхийдөө 25 хүртэл</li>
                <li>Эрүүл мэнд, сахилга батын шаардлага. Нарийвчилсан босго шинэ зар дээр гарна.</li>
              </ul>
            </article>
            <article className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
              <h3 className="font-heading text-xl font-semibold">Магистр</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
                <li>Бакалаврын зэрэг</li>
                <li>Нас: өмнөх удирдамжаар ерөнхийдөө 35 хүртэл</li>
                <li>HSK 3 эсвэл түүнтэй дүйх хэлний түвшин. Одоогийн удирдамжаар баталгаажна.</li>
              </ul>
            </article>
            <article className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
              <h3 className="font-heading text-xl font-semibold">Доктор</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
                <li>Магистрын зэрэг</li>
                <li>Нас: өмнөх удирдамжаар ерөнхийдөө 40 хүртэл</li>
                <li>HSK 3 эсвэл түүнтэй дүйх хэлний түвшин. Одоогийн удирдамжаар баталгаажна.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="rounded-3xl bg-primary px-5 py-8 text-primary-foreground sm:px-8">
          <h2 className="font-heading text-2xl font-semibold">Хятад хэлний бэлтгэл</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-primary-foreground/90">
            Хятад хэлний түвшин хүрэхгүй, тэтгэлэгт тэнцсэн оюутанд мэргэжлийн хөтөлбөр эхлэхээс өмнө нэг жилийн хятад хэлний бэлтгэл шаардаж болно. Бэлтгэлийн дараа мэргэжилдээ шилжих нөхцөл, тэтгэлэг бэлтгэлийн жилд хэрхэн үргэлжлэхийг албан удирдамж тогтооно.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-primary-foreground/90">
            Өргөдөл гаргагч бүр тусдаа хэлний бэлтгэлийн тэтгэлэг автоматаар авна гэж үзэхгүй. Хэлний түвшин аль хэдийн хүрэлцээтэй бол бэлтгэлийн жил шаардагдахгүй байж болно.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">Оролцогч их сургуулиуд</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            2026/2027 оны удирдамжид орсон 9 сургууль. Хятад нэр, хот нь Боловсролын яамны 2026-06-17-ны бүртгэл. Монгол нэр нь энэ хуудасны нэршил. Аль зэрэг, аль мэргэжлийг тухайн сургууль олгохыг хавсралтаар баталгаажуулна. Бүх сургууль бүх зэрэг, бүх мэргэжил олгоно гэж үзэхгүй.
          </p>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {innerMongoliaUniversities.map((school) => (
              <article key={school.code} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
                <h3 className="font-heading text-xl font-semibold">{school.nameMn}</h3>
                <p className="mt-1 text-sm">{school.nameEn}</p>
                <p className="text-sm text-muted-foreground">{school.nameZh}</p>
                <p className="mt-3 text-sm">{school.cityMn} · {school.cityZh}</p>
                <p className="mt-2 text-sm leading-6">
                  Энэ тэтгэлгийн зэрэг: албан хавсралтаар баталгаажуулна.
                </p>
                <p className="text-sm leading-6">Мэргэжил: хавсралт энэ хуудсанд байхгүй тул оруулаагүй.</p>
                <p className="mt-3 text-sm">
                  {school.website ? (
                    <a className="font-semibold text-primary" href={school.website}>{school.website}</a>
                  ) : (
                    "Албан ёсны вэбсайт энэ хуудсанд баталгаажаагүй."
                  )}
                </p>
                {school.code === "4115010138" ? (
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Яамны бүртгэлд одоогийн нэр нь 赤峰大学. Хуучин 赤峰学院 нэрийг одоогийн албан нэр гэж харуулаагүй.
                  </p>
                ) : null}
                <Link className="mt-3 inline-block text-sm font-semibold text-primary" href={paths.registryInstitution(school.code)}>
                  Яамны бүртгэл · {school.code}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">Баримт бичиг</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Жагсаалт шинэ элсэлтийн зараас хамаарна. Өмнөх удирдамжийн суралцах төлөвлөгөө: бакалаврт дор хаяж 500 үг, магистр ба докторт дор хаяж 1,000 үг.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {documents.map((item) => (
              <li key={item} className="rounded-xl bg-card px-4 py-3 text-sm ring-1 ring-foreground/10">{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">Өргөдөл гаргах дараалал</h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
                <p className="font-heading text-2xl text-gold">0{index + 1}</p>
                <p className="mt-1 text-sm leading-6">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">Асуулт, хариулт</h2>
          <div className="mt-4 flex flex-col gap-2">
            {faqs.map(([question, answer]) => (
              <details key={question} className="rounded-2xl bg-card px-4 py-3 ring-1 ring-foreground/10">
                <summary className="cursor-pointer text-sm font-semibold">{question}</summary>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold">Албан холбоос</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6">
            <li>
              <a className="font-semibold text-primary" href="https://isms.imu.edu.cn/stu/#/login">Өргөдлийн портал · isms.imu.edu.cn</a>
              <p className="text-muted-foreground">Өмнөх элсэлтэд ашигласан портал. 2027/2028 онд өөрчлөгдөж болно. 2026-11-08-нд нээгдсэн.</p>
            </li>
            <li>
              <a className="font-semibold text-primary" href="https://mn.china-embassy.gov.cn/">БНХАУ-аас Монгол Улсад суугаа элчин сайдын яам</a>
              <p className="text-muted-foreground">Тэтгэлгийн мэдээллийн эх гэж заасан сайт. Тодорхой нэг зарлалын холбоос энэ хуудсанд баталгаажаагүй.</p>
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-border bg-card px-5 py-8 sm:px-8">
          <h2 className="font-heading text-2xl font-semibold">Зөвлөгөө авах</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Сургууль, мэргэжил сонгох, баримт бүрдүүлэх талаар EduMongolia-аас асууж болно. Энэ хүсэлт их сургуулийн өргөдөл биш. Квот, хугацааг эндээс баталгаажуулахгүй.
          </p>
          <Link href={paths.apply} className={cn(buttonVariants({ size: "lg" }), "mt-5")}>Зөвлөгөө авах</Link>
          <p className="mt-4 text-sm">
            <Link className="font-semibold text-primary" href={paths.scholarships}>Бусад тэтгэлэг</Link>
          </p>
        </section>
      </div>
    </article>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-semibold">{value}</p>
    </div>
  );
}
