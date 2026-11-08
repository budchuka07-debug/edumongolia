"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type Category,
  type Education,
  type Grouping,
} from "@/lib/content/directory";
import { publicTeachers } from "@/lib/content/public";
import { EmptyState } from "@/components/empty-state";
import { useI18n } from "@/components/language-provider";
import { useHub } from "@/components/directory/use-hub";
import { TeacherCard } from "@/components/directory/cards";

const levels: Education[] = ["specialist", "bachelor", "master", "doctor"];
const categories: Category[] = ["math", "mongolian", "english", "science", "history", "music", "exam", "code"];

export function TutorList({ mode }: { mode: "home" | "online" }) {
  const { locale } = useI18n();
  const hub = useHub();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const page = mode === "home" ? hub.pages.tutors : hub.pages.online;
  const level = params.get("level") ?? "all";
  const category = params.get("category") ?? "all";
  const group = params.get("group") ?? "all";

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete(key);
    else next.set(key, value);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const list = useMemo(() => {
    return publicTeachers().filter((teacher) => {
      if (!teacher.delivery.includes(mode)) return false;
      if (level !== "all" && teacher.education !== level) return false;
      if (category !== "all" && !teacher.categories.includes(category as Category)) return false;
      if (group !== "all" && !teacher.grouping.includes(group as Grouping)) return false;
      return true;
    });
  }, [category, group, level, mode]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <p className="text-sm font-medium text-primary">{hub.outside}</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{page.title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{page.lead}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <label className="text-sm font-medium">
          {hub.education}
          <select
            className="mt-1 h-10 w-full rounded-lg border border-input bg-card px-2 text-sm"
            value={level}
            onChange={(event) => setFilter("level", event.target.value)}
          >
            <option value="all">{hub.all}</option>
            {levels.map((item) => (
              <option key={item} value={item}>
                {hub.levels[item]}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          {hub.category}
          <select
            className="mt-1 h-10 w-full rounded-lg border border-input bg-card px-2 text-sm"
            value={category}
            onChange={(event) => setFilter("category", event.target.value)}
          >
            <option value="all">{hub.all}</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {hub.categories[item]}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          {hub.grouping}
          <select
            className="mt-1 h-10 w-full rounded-lg border border-input bg-card px-2 text-sm"
            value={group}
            onChange={(event) => setFilter("group", event.target.value)}
          >
            <option value="all">{hub.groups.all}</option>
            <option value="individual">{hub.groups.individual}</option>
            <option value="semi">{hub.groups.semi}</option>
          </select>
        </label>
      </div>

      {list.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title={locale === "en" ? "There is no verified information to show yet." : "Одоогоор баталгаажсан мэдээлэл байхгүй байна."}
            lead={locale === "en" ? "A new opportunity will be published here after it is checked." : "Шинэ боломж нэмэгдэхэд энэ хэсэгт нийтлэгдэнэ."}
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      )}
    </div>
  );
}
