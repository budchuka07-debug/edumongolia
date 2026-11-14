import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { loadPriceRules, savePriceRules } from "@/lib/catalog/store";
import { sanitizeRules } from "@/lib/catalog/prices";

function authorized(request: NextRequest) {
  const expected = process.env.EDU_ADMIN_TOKEN?.trim();
  if (!expected) return "unset" as const;
  const header = request.headers.get("authorization") ?? "";
  const given = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const left = Buffer.from(given);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return "denied" as const;
  return "ok" as const;
}

export function GET() {
  return NextResponse.json({ rules: loadPriceRules() });
}

export async function PUT(request: NextRequest) {
  const access = authorized(request);
  if (access === "unset") return NextResponse.json({ ok: false, error: "admin-token-unset" }, { status: 503 });
  if (access === "denied") return NextResponse.json({ ok: false, error: "forbidden" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const rules = sanitizeRules(body.rules);
  if (!rules) return NextResponse.json({ ok: false, error: "invalid-rules" }, { status: 400 });
  savePriceRules(rules);
  return NextResponse.json({ ok: true, rules });
}
