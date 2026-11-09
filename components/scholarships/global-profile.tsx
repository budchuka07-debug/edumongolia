import Link from "next/link";
import { countryByCode, degreeLabels, type GlobalScholarship } from "@/lib/scholarships/global";
import { nextRoundUnannounced, notPublished, publicScholarshipStatus } from "@/lib/scholarships/status";
import { paths } from "@/lib/marketplace/paths";

const statusMn = {
  upcoming: "Нээгдээгүй",
  open: "Нээлттэй",
  closed: "Хаагдсан",
  unannounced: "Хугацаа зарлагдаагүй",
  archived: "Архив",
} as const;

export function GlobalProfile({ item }: { item: GlobalScholarship }) {
  const country = countryByCode(item.countryCode);
  const status = publicScholarshipStatus(item);
  return (
    <article>
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="text-primary">Нүүр</Link>
            {" / "}
            <Link href={paths.internationalScholarships} className="text-primary">Олон улсын тэтгэлэг</Link>
            {" / "}
            <span>{item.nameMn}</span>
          </nav>
          <p className="text-sm font-semibold text-primary">{country?.[1]} · {item.academicYear} · {statusMn[status]}</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight">{item.nameMn}</h1>
          <p className="text-sm text-muted-foreground">{item.nameOriginal}</p>
          <p className="max-w-3xl text-sm leading-6">
            {item.sponsorMn}. Албан нэр: {item.sponsorOriginal}. Энэ хуудас зөвхөн шалгасан эх сурвалжийн мөрийг харуулна.
          </p>
          {status === "closed" ? <p className="text-sm font-semibold">Энэ жилийн элсэлт хаагдсан. Дараа жил бэлдэхэд энэ нөхцөлийг уншина. Шинэ зар гарахад огноо солигдоно.</p> : null}
          {item.scoreCardMn ? <p className="max-w-3xl rounded-2xl bg-primary px-4 py-3 text-sm leading-6 text-primary-foreground">{item.scoreCardMn}</p> : null}
          {!item.nextAnnounced ? <p className="rounded-2xl bg-card px-4 py-3 text-sm ring-1 ring-foreground/10">{nextRoundUnannounced}</p> : null}
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8">
        <Fact title="Хэн хамрагдах вэ?" body={item.citizenships.concat(item.eligibilityMn).join(" ")} />
        <Fact title="Ямар түвшинд сурах вэ?" body={item.degrees.map((degree) => degreeLabels[degree]).join(", ")} />
        <Fact title="Ямар мэргэжилд нээлттэй вэ?" body={item.majorsMn} />
        <Fact title="Хасагдсан мэргэжил" body={item.excludedMajorsMn} />
        <Fact title="Нас" body={item.ageMn} />
        <Fact title="Голч дүн" body={item.gpaMn} />
        <Fact title="Хэлний шаардлага" body={item.languageMn} />
        <Fact title="Юуг хамардаг вэ?" body={[item.tuitionMn, item.stipendMn, item.accommodationMn, item.insuranceMn, item.travelMn, item.otherBenefitsMn].filter(Boolean).join(" ")} />
        <Fact title="Юуг хамруулаагүй вэ?" body={item.excludedMn} />
        <Fact title="Ямар бичиг баримт вэ?" body={item.documentsMn.length ? item.documentsMn.join(" ") : null} />
        <Fact title="Сэдлийн захидал, зөвлөмж" body={item.statementMn} />
        <Fact title="Хэзээ өргөдөл гаргах вэ?" body={item.closesAt ? `Хаах хугацаа ${item.closesAt}${item.timezone ? `, ${item.timezone}` : ""}.` : null} />
        <Fact title="Хаана илгээх вэ?" body={item.applicationUrl} href={item.applicationUrl} />
        <Fact title="Шалгаруулалт" body={item.selectionMn} />
        <Fact title="Ярилцлага" body={item.interviewMn} />
        <Fact title="Холбоо барих" body={item.contactMn} />
        <section className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-xl font-semibold">Албан эх</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="font-semibold text-primary" href={item.officialSourceUrl}>Эх хуудас</a> · {item.sourceType} · шалгасан {item.lastVerifiedAt}</li>
            {item.guidelineUrl ? <li><a className="font-semibold text-primary" href={item.guidelineUrl}>Уриалгын баримт</a></li> : null}
            {item.applicationUrl ? <li><a className="font-semibold text-primary" href={item.applicationUrl}>Өргөдлийн систем</a></li> : null}
          </ul>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.verifierNotesMn}</p>
        </section>
        {item.detailHref ? <Link href={item.detailHref} className="text-sm font-semibold text-primary">Дэлгэрэнгүй хуудас</Link> : null}
        <Link href={paths.internationalScholarships} className="text-sm font-semibold text-primary">Бүх тэтгэлэг</Link>
      </div>
    </article>
  );
}

function Fact({ title, body, href }: { title: string; body: string | null | undefined; href?: string | null }) {
  return (
    <section className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
      {href && body ? <a className="mt-3 block break-all text-sm font-semibold text-primary" href={href}>{body}</a> : <p className="mt-3 text-sm leading-6">{body || notPublished}</p>}
    </section>
  );
}
