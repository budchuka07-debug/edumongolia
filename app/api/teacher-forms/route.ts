import { NextResponse, type NextRequest } from "next/server";
import { embedUrl, type TeacherFormKind } from "@/lib/content/teacher-forms";
import { isReaderId, READER_COOKIE } from "@/lib/payments/reader";
import { addTeacherForm, listTeacherForms, openTeacherForm } from "@/lib/payments/teacher-forms-store";
import { findEntitlement } from "@/lib/payments/store";
import { productKey } from "@/lib/payments/pricing";

const kinds: TeacherFormKind[] = ["eesh", "olympiad", "kids"];

function readerId(request: NextRequest) {
  const value = request.cookies.get(READER_COOKIE)?.value;
  return isReaderId(value) ? value : null;
}

function publish(form: ReturnType<typeof listTeacherForms>[number], reader: string | null) {
  const entitled = reader ? Boolean(findEntitlement(reader, productKey("form", form.id))) : false;
  const opened = openTeacherForm(form, entitled);
  return {
    id: form.id,
    teacher: form.teacher,
    title: form.title,
    kind: form.kind,
    priceMnt: opened.priceMnt,
    embedUrl: opened.embedUrl,
  };
}

export function GET(request: NextRequest) {
  const reader = readerId(request);
  return NextResponse.json({ ok: true, forms: listTeacherForms().map((form) => publish(form, reader)) });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const teacher = typeof body.teacher === "string" ? body.teacher.trim() : "";
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const kind: TeacherFormKind | null = kinds.includes(body.kind) ? body.kind : null;
  const formUrl = typeof body.formUrl === "string" ? embedUrl(body.formUrl) : null;
  if (!teacher || !title || !kind || !formUrl || teacher.length > 80 || title.length > 140) {
    return NextResponse.json({ ok: false, error: "invalid-form" }, { status: 400 });
  }
  const form = await addTeacherForm({
    teacher,
    title,
    kind,
    formUrl,
    requiresPayment: body.paid !== false,
  });
  return NextResponse.json({ ok: true, form: publish(form, readerId(request)) });
}
