"use client";

import { useState } from "react";
import Link from "next/link";
import {
  EXTRA_TEACHERS_KEY,
  STUDENTS_KEY,
  slotTimes,
  teachers as catalog,
  weekdays,
  type Category,
  type Delivery,
  type Education,
  type Grouping,
  type StudentRecord,
  type Teacher,
  type Weekday,
} from "@/lib/content/directory";
import { usePersistedState } from "@/lib/use-persisted-state";
import { useHub } from "@/components/directory/use-hub";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const levels: Education[] = ["specialist", "bachelor", "master", "doctor"];
const categories: Category[] = ["math", "mongolian", "english", "science", "history", "music", "exam", "code"];

const field = "mt-1 h-10 w-full rounded-lg border border-input bg-card px-3 text-sm";

export function StudentRegister() {
  const hub = useHub();
  const [, setStudents] = usePersistedState<StudentRecord[]>(STUDENTS_KEY, []);
  const [extra] = usePersistedState<Teacher[]>(EXTRA_TEACHERS_KEY, []);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const page = hub.pages.student;
  const choices = [...catalog, ...extra.filter((teacher) => !catalog.some((item) => item.id === teacher.id))];

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    if (!name) {
      setError(hub.form.required);
      return;
    }
    const student: StudentRecord = {
      id: `student-${Date.now()}`,
      name,
      grade: String(data.get("grade") ?? "").trim(),
      category: String(data.get("category") ?? "math") as Category,
      delivery: String(data.get("delivery") ?? "home") as Delivery,
      grouping: String(data.get("grouping") ?? "individual") as Grouping,
      day: String(data.get("day") ?? "mon") as Weekday,
      time: String(data.get("time") ?? "16:00"),
      teacherId: String(data.get("teacherId") ?? ""),
    };
    setStudents((current) => [student, ...current]);
    setDone(true);
    setError("");
    event.currentTarget.reset();
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">{page.title}</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{page.lead}</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium">
          {hub.form.name}
          <input className={field} name="name" autoComplete="name" />
        </label>
        <label className="block text-sm font-medium">
          {hub.form.grade}
          <input className={field} name="grade" placeholder="8" />
        </label>
        <label className="block text-sm font-medium">
          {hub.form.aim}
          <select className={field} name="category" defaultValue="math">
            {categories.map((category) => (
              <option key={category} value={category}>
                {hub.categories[category]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          {hub.form.pickTeacher}
          <select className={field} name="teacherId" defaultValue="">
            <option value="">{hub.form.noTeacher}</option>
            {choices.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium">
            {hub.form.day}
            <select className={field} name="day" defaultValue="mon">
              {weekdays.map((day) => (
                <option key={day} value={day}>
                  {hub.days[day]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            {hub.form.time}
            <select className={field} name="time" defaultValue="16:00">
              {slotTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium">
          {hub.form.delivery}
          <select className={field} name="delivery" defaultValue="home">
            <option value="classroom">{hub.form.classroom}</option>
            <option value="home">{hub.form.home}</option>
            <option value="online">{hub.form.online}</option>
          </select>
        </label>
        <label className="block text-sm font-medium">
          {hub.grouping}
          <select className={field} name="grouping" defaultValue="individual">
            <option value="individual">{hub.groups.individual}</option>
            <option value="semi">{hub.groups.semi}</option>
          </select>
        </label>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {done ? <p className="text-sm text-pine">{hub.form.studentDone} {hub.saved}</p> : null}
        <button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
          {hub.form.submitStudent}
        </button>
      </form>
      {done ? (
        <p className="mt-6 text-sm">
          <Link href="/admin" className="font-semibold text-primary">
            {hub.form.openAdmin}
          </Link>
        </p>
      ) : null}
    </div>
  );
}

export function TeacherRegister() {
  const hub = useHub();
  const [, setTeachers] = usePersistedState<Teacher[]>(EXTRA_TEACHERS_KEY, []);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const page = hub.pages.teacher;

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const picked = categories.filter((category) => data.get(`cat-${category}`) === "on");
    if (!name) {
      setError(hub.form.required);
      return;
    }
    if (picked.length === 0) {
      setError(hub.form.pickCategory);
      return;
    }
    const delivery = (["classroom", "home", "online"] as Delivery[]).filter(
      (item) => data.get(`del-${item}`) === "on",
    );
    const grouping = (["individual", "semi"] as Grouping[]).filter((item) => data.get(`grp-${item}`) === "on");
    const school = String(data.get("school") ?? "").trim();
    const district = String(data.get("district") ?? "").trim();
    const bio = String(data.get("bio") ?? "").trim();
    const teacher: Teacher = {
      id: `local-${Date.now()}`,
      name,
      education: String(data.get("education") ?? "bachelor") as Education,
      school: { mn: school, en: school },
      categories: picked,
      delivery: delivery.length ? delivery : ["home"],
      grouping: grouping.length ? grouping : ["individual"],
      district: { mn: district, en: district },
      years: Number(data.get("years") ?? 0) || 0,
      rate: { mn: String(data.get("rate") ?? ""), en: String(data.get("rate") ?? "") },
      bio: { mn: bio, en: bio },
      foreign: data.get("foreign") === "on",
      schedule: weekdays.flatMap((day) =>
        slotTimes
          .filter((time) => data.get(`slot-${day}-${time}`) === "on")
          .map((time) => ({ day, time })),
      ),
    };
    if (teacher.schedule?.length === 0) teacher.schedule = [{ day: "mon", time: "16:00" }];
    setTeachers((current) => [teacher, ...current]);
    setDone(teacher.id);
    setError("");
    event.currentTarget.reset();
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">{page.title}</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{page.lead}</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium">
          {hub.form.name}
          <input className={field} name="name" autoComplete="name" />
        </label>
        <label className="block text-sm font-medium">
          {hub.education}
          <select className={field} name="education" defaultValue="bachelor">
            {levels.map((level) => (
              <option key={level} value={level}>
                {hub.levels[level]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          {hub.form.school}
          <input className={field} name="school" />
        </label>
        <fieldset>
          <legend className="text-sm font-medium">{hub.category}</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name={`cat-${category}`} />
                {hub.categories[category]}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-medium">{hub.form.delivery}</legend>
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="del-home" defaultChecked />
              {hub.form.home}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="del-online" />
              {hub.form.online}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="del-classroom" />
              {hub.form.classroom}
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-medium">{hub.grouping}</legend>
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="grp-individual" defaultChecked />
              {hub.groups.individual}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="grp-semi" />
              {hub.groups.semi}
            </label>
          </div>
        </fieldset>
        <label className="block text-sm font-medium">
          {hub.form.years}
          <input className={field} name="years" inputMode="numeric" />
        </label>
        <label className="block text-sm font-medium">
          {hub.form.district}
          <input className={field} name="district" />
        </label>
        <label className="block text-sm font-medium">
          {hub.rate}
          <input className={field} name="rate" />
        </label>
        <label className="block text-sm font-medium">
          {hub.form.bio}
          <textarea className="mt-1 min-h-24 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm" name="bio" />
        </label>
        <fieldset>
          <legend className="text-sm font-medium">{hub.sections.schedule}</legend>
          <div className="mt-2 grid gap-2">
            {weekdays.map((day) => (
              <div key={day} className="flex flex-wrap items-center gap-3 text-sm">
                <span className="w-16 font-medium">{hub.days[day]}</span>
                {slotTimes.map((time) => (
                  <label key={time} className="flex items-center gap-1">
                    <input type="checkbox" name={`slot-${day}-${time}`} />
                    {time}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </fieldset>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="foreign" />
          {hub.foreign}
        </label>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {done ? (
          <p className="text-sm text-pine">
            {hub.form.teacherDone} {hub.saved}{" "}
            <Link href={`/tutors/${done}`} className="font-semibold text-primary">
              {hub.sections.teacherInfo}
            </Link>
            {" · "}
            <Link href="/admin" className="font-semibold text-primary">
              {hub.form.openAdmin}
            </Link>
          </p>
        ) : null}
        <button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
          {hub.form.submitTeacher}
        </button>
      </form>
      </div>
  );
}
