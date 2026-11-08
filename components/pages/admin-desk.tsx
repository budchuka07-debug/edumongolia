"use client";

import Link from "next/link";
import {
  EXTRA_TEACHERS_KEY,
  STUDENTS_KEY,
  centers,
  getTeacher,
  offers,
  teachers,
  type StudentRecord,
  type Teacher,
} from "@/lib/content/directory";
import { papers, PAPER_ORDERS_KEY, type PaperOrder } from "@/lib/content/papers";
import { centerStatus, offerStatus, paperStatus, teacherStatus } from "@/lib/content/publication";
import { usePersistedState } from "@/lib/use-persisted-state";
import { useHub } from "@/components/directory/use-hub";
import { InternationalCatalog } from "@/components/marketplace/admin-catalog";

function teacherName(id: string, extra: Teacher[]) {
  if (!id) return "";
  return getTeacher(id)?.name ?? extra.find((teacher) => teacher.id === id)?.name ?? id;
}

export function AdminDesk() {
  const hub = useHub();
  const [students] = usePersistedState<StudentRecord[]>(STUDENTS_KEY, []);
  const [teachers] = usePersistedState<Teacher[]>(EXTRA_TEACHERS_KEY, []);
  const [orders] = usePersistedState<PaperOrder[]>(PAPER_ORDERS_KEY, []);
  const page = hub.pages.admin;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{page.title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{page.lead}</p>
      <p className="mt-2 text-sm text-muted-foreground">{hub.saved}</p>
      <InternationalCatalog />
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold">Ноорог</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Эдгээр мөр нийтийн хуудсанд гарахгүй. Зөвхөн published төлөвтэй, эх сурвалж нь баталгаажсан мөр нийтлэгдэнэ.
        </p>
        <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
          {teachers.map((teacher) => (
            <li key={teacher.id}>{teacher.name} · {teacherStatus()}</li>
          ))}
          {centers.map((center) => (
            <li key={center.id}>{center.name.mn} · {centerStatus()}</li>
          ))}
          {offers.map((offer) => (
            <li key={offer.id}>{offer.title.mn} · {offerStatus(offer.id)}</li>
          ))}
          {papers.map((paper) => (
            <li key={paper.id}>{paper.title.mn} · {paperStatus()}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-2xl font-semibold">{hub.form.students}</h2>
        {students.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">{hub.form.noSignups}</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[44rem] border-collapse text-sm">
              <thead>
                <tr className="bg-muted/60 text-left">
                  <th className="px-3 py-2 font-medium">{hub.form.name}</th>
                  <th className="px-3 py-2 font-medium">{hub.form.grade}</th>
                  <th className="px-3 py-2 font-medium">{hub.category}</th>
                  <th className="px-3 py-2 font-medium">{hub.form.delivery}</th>
                  <th className="px-3 py-2 font-medium">{hub.sections.schedule}</th>
                  <th className="px-3 py-2 font-medium">{hub.form.pickTeacher}</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-t border-border">
                    <td className="px-3 py-2 font-medium">{student.name}</td>
                    <td className="px-3 py-2">{student.grade}</td>
                    <td className="px-3 py-2">{hub.categories[student.category]}</td>
                    <td className="px-3 py-2">{hub.form[student.delivery]}</td>
                    <td className="px-3 py-2">
                      {hub.days[student.day]} {student.time}
                    </td>
                    <td className="px-3 py-2">
                      {student.teacherId ? (
                        <Link href={`/tutors/${student.teacherId}`} className="font-semibold text-primary">
                          {teacherName(student.teacherId, teachers)}
                        </Link>
                      ) : (
                        hub.form.noTeacher
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-2xl font-semibold">{hub.form.teachers}</h2>
        {teachers.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">{hub.form.noSignups}</p>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {teachers.map((teacher) => (
              <article key={teacher.id} className="rounded-2xl border border-border bg-card p-4">
                <h3 className="font-heading text-xl font-semibold">{teacher.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {hub.levels[teacher.education]}
                  {teacher.school.mn ? ` · ${teacher.school.mn}` : ""}
                </p>
                <p className="mt-2 text-sm">
                  {teacher.categories.map((category) => hub.categories[category]).join(", ")}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {(teacher.schedule ?? [])
                    .map((slot) => `${hub.days[slot.day]} ${slot.time}`)
                    .join(" · ")}
                </p>
                <Link href={`/tutors/${teacher.id}`} className="mt-3 inline-block text-sm font-semibold text-primary">
                  {hub.sections.teacherInfo}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-2xl font-semibold">{hub.paper.orders}</h2>
        {orders.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">{hub.form.noSignups}</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[44rem] border-collapse text-sm">
              <thead>
                <tr className="bg-muted/60 text-left">
                  <th className="px-3 py-2 font-medium">{hub.category}</th>
                  <th className="px-3 py-2 font-medium">{hub.paper.topic}</th>
                  <th className="px-3 py-2 font-medium">{hub.form.name}</th>
                  <th className="px-3 py-2 font-medium">{hub.paper.phone}</th>
                  <th className="px-3 py-2 font-medium">{hub.paper.deadline}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-border">
                    <td className="px-3 py-2">{hub.paper.kinds[order.kind]}</td>
                    <td className="px-3 py-2 font-medium">{order.topic}</td>
                    <td className="px-3 py-2">{order.name}</td>
                    <td className="px-3 py-2">{order.phone}</td>
                    <td className="px-3 py-2">{order.deadline || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
