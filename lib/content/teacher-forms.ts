export type TeacherFormKind = "eesh" | "olympiad" | "kids";

export type TeacherForm = {
  id: string;
  teacher: string;
  title: string;
  kind: TeacherFormKind;
  price: number;
  phone: string;
  formUrl: string;
  hideUntilPaid: boolean;
};

export const TEACHER_FORMS_KEY = "edumongolia-teacher-forms";

export function embedUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || url.hostname !== "docs.google.com") return null;
  if (!url.pathname.includes("/forms/")) return null;
  url.searchParams.set("embedded", "true");
  return url.toString();
}

export function studentCanOpen(form: Pick<TeacherForm, "price" | "hideUntilPaid">) {
  return form.price <= 0 || !form.hideUntilPaid;
}

export function readTeacherForms(raw: string | null): TeacherForm[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as TeacherForm[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && embedUrl(item.formUrl) && item.title && item.teacher);
  } catch {
    return [];
  }
}
