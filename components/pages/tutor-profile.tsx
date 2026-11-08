"use client";

import Link from "next/link";
import {
  EXTRA_TEACHERS_KEY,
  STUDENTS_KEY,
  slotTimes,
  weekdays,
  getTeacher,
  type StudentRecord,
  type Teacher,
} from "@/lib/content/directory";
import { usePersistedState } from "@/lib/use-persisted-state";
import { useI18n } from "@/components/language-provider";
import { useHub } from "@/components/directory/use-hub";
import { EmptyState } from "@/components/empty-state";
import { isPublicStatus, teacherStatus } from "@/lib/content/publication";
import { Badge } from "@/components/ui/badge";

export function TutorProfile({ id }: { id: string }) {
  const { locale } = useI18n();
  const hub = useHub();
  const [extra] = usePersistedState<Teacher[]>(EXTRA_TEACHERS_KEY, []);
  const [students] = usePersistedState<StudentRecord[]>(STUDENTS_KEY, []);
  const seeded = getTeacher(id);
  if (seeded && !isPublicStatus(teacherStatus())) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          title={locale === "en" ? "There is no verified information to show yet." : "Одоогоор баталгаажсан мэдээлэл байхгүй байна."}
          lead={locale === "en" ? "This profile is not published." : "Энэ бүртгэл нийтэд гараагүй."}
        />
        <Link href="/tutors" className="mt-4 inline-block text-sm font-semibold text-primary">
          {hub.back}
        </Link>
      </div>
    );
  }
  const teacher = seeded ?? extra.find((item) => item.id === id);

  if (!teacher) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-heading text-3xl font-semibold">{hub.empty}</h1>
        <Link href="/tutors" className="mt-4 inline-block text-sm font-semibold text-primary">
          {hub.back}
        </Link>
      </div>
    );
  }

  const facts = [
    [hub.school, teacher.school[locale]],
    [hub.education, hub.levels[teacher.education]],
    [hub.district, teacher.district[locale]],
    [hub.rate, teacher.rate[locale]],
    [hub.years, `${teacher.years}`],
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link href="/tutors" className="text-sm font-semibold text-primary">
        {hub.back}
      </Link>
      <p className="mt-4 text-sm font-medium text-primary">{hub.sections.teacherInfo}</p>
      <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight">{teacher.name}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {teacher.categories.map((category) => (
          <Badge key={category} variant="secondary">
            {hub.categories[category]}
          </Badge>
        ))}
        {teacher.grouping.map((group) => (
          <Badge key={group} variant="outline">
            {group === "individual" ? hub.groups.individual : hub.groups.semi}
          </Badge>
        ))}
        {teacher.foreign ? <Badge>{hub.foreign}</Badge> : null}
      </div>
      <p className="mt-6 text-base leading-7">{teacher.bio[locale]}</p>
      <dl className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
        {facts.map(([label, value]) => (
          <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[12rem_1fr]">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
      <h2 className="mt-10 font-heading text-2xl font-semibold">{hub.sections.schedule}</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <thead>
            <tr className="bg-muted/60 text-left">
              <th className="px-3 py-2 font-medium">{hub.form.time}</th>
              {weekdays.map((day) => (
                <th key={day} className="px-3 py-2 font-medium">
                  {hub.days[day]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slotTimes.map((time) => (
              <tr key={time} className="border-t border-border">
                <th className="px-3 py-2 text-left font-medium">{time}</th>
                {weekdays.map((day) => {
                  const open = teacher.schedule?.some((slot) => slot.day === day && slot.time === time);
                  const booked = students.filter(
                    (student) => student.teacherId === teacher.id && student.day === day && student.time === time,
                  );
                  return (
                    <td key={day} className="px-3 py-2 align-top">
                      {booked.length > 0 ? (
                        <span>
                          <span className="block text-xs text-primary">{hub.form.booked}</span>
                          {booked.map((student) => student.name).join(", ")}
                        </span>
                      ) : open ? (
                        <span className="text-muted-foreground">{hub.form.openSlot}</span>
                      ) : (
                        <span className="text-border">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
