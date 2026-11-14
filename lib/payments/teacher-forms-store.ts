import fs from "node:fs";
import path from "node:path";
import { embedUrl, type TeacherFormKind } from "@/lib/content/teacher-forms";
import { chargedPrice } from "@/lib/catalog/charge";

export type StoredTeacherForm = {
  id: string;
  teacher: string;
  title: string;
  kind: TeacherFormKind;
  formUrl: string;
  /** When true, the Google Form stays hidden until a 5,000 MNT QPay payment is confirmed. */
  requiresPayment: boolean;
  createdAt: string;
};

type FileShape = { forms: StoredTeacherForm[] };

function filePath() {
  return process.env.EDU_FORMS_FILE || path.join(process.cwd(), "data", "edu-teacher-forms.json");
}

function readFile(): StoredTeacherForm[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ filePath(), "utf8")) as FileShape;
    return Array.isArray(parsed.forms) ? parsed.forms : [];
  } catch {
    return [];
  }
}

function writeFile(forms: StoredTeacherForm[]) {
  const file = filePath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify({ forms }, null, 2));
  fs.renameSync(temporary, file);
}

let chain: Promise<unknown> = Promise.resolve();

export function listTeacherForms() {
  return readFile();
}

export function findTeacherForm(id: string) {
  return readFile().find((item) => item.id === id) ?? null;
}

export function addTeacherForm(input: Omit<StoredTeacherForm, "id" | "createdAt">) {
  const form: StoredTeacherForm = {
    ...input,
    id: `form-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const run = chain.then(() => {
    const forms = readFile();
    forms.unshift(form);
    writeFile(forms);
    return form;
  });
  chain = run.then(() => undefined, () => undefined);
  return run;
}

export function openTeacherForm(form: StoredTeacherForm, entitled: boolean) {
  const priceMnt = form.requiresPayment ? chargedPrice("form") : 0;
  const embed = !form.requiresPayment || entitled ? embedUrl(form.formUrl) : null;
  return { priceMnt, embedUrl: embed };
}
