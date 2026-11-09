import Link from "next/link";
import { connection } from "next/server";
import { filterScholarships } from "@/lib/scholarships/global";
import { nextRoundUnannounced, publicScholarshipStatus } from "@/lib/scholarships/status";
import { paths } from "@/lib/marketplace/paths";

const statusMn = {
  upcoming: "Нээгдээгүй",
  open: "Нээлттэй",
  closed: "Хаагдсан",
  unannounced: "Хугацаа зарлагдаагүй",
  archived: "Архив",
} as const;

export async function CompetitiveList() {
  await connection();
  const rows = filterScholarships().filter((item) => item.scoreCardMn);
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">Нийтэлсэн тэтгэлэг</p>
      <h2 className="mt-2 font-heading text-3xl font-semibold">IELTS, TOEFL, SAT-тай өрсөлдөх</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
        Оноог албан эхэд нь байгаагаар нь бичсэн. Нэг босго заагаагүй тэтгэлгийг энд бас оруулсан. Хугацаа өнгөрсөн мөрийг нээлттэй гэж харуулахгүй.
      </p>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {rows.map((item) => {
          const status = publicScholarshipStatus(item);
          return (
            <article key={item.slug} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
              <p className="text-xs font-semibold text-primary">{item.academicYear} · {statusMn[status]}</p>
              <h3 className="mt-2 font-heading text-2xl font-semibold">
                <Link href={item.detailHref ?? paths.internationalScholarship(item.slug)} className="hover:underline">{item.nameMn}</Link>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.nameOriginal}</p>
              <p className="mt-3 text-sm leading-6">{item.scoreCardMn}</p>
              {status !== "open" ? <p className="mt-3 text-sm">{nextRoundUnannounced}</p> : null}
            </article>
          );
        })}
      </div>
      <Link href={paths.internationalScholarships} className="mt-4 inline-block text-sm font-semibold text-primary">
        Улсаар шүүх
      </Link>
    </section>
  );
}
