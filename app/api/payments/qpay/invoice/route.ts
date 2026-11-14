import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { paidPayload, readingFor } from "@/lib/payments/reading";
import { isReaderId, READER_COOKIE } from "@/lib/payments/reader";
import { createQpayInvoice, qpayConfig, QpayError, siteUrlFrom } from "@/lib/payments/qpay";
import { chargedPrice } from "@/lib/catalog/charge";
import { isPaidPage, type PaidPage } from "@/lib/payments/pricing";
import { attachQpayInvoice, createInvoice, markInvoiceFailed } from "@/lib/payments/store";

function readerFrom(request: NextRequest) {
  const current = request.cookies.get(READER_COOKIE)?.value;
  if (isReaderId(current)) return { id: current, fresh: false };
  return { id: randomUUID(), fresh: true };
}

function withReader(response: NextResponse, readerId: string, fresh: boolean) {
  if (fresh) {
    response.cookies.set(READER_COOKIE, readerId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 400,
      secure: process.env.NODE_ENV === "production",
    });
  }
  return response;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const kind: PaidPage | null = isPaidPage(body.kind) ? body.kind : null;
  const id = typeof body.id === "string" ? body.id.trim() : "";
  if (!kind || !id) return NextResponse.json({ ok: false, error: "unknown-page" }, { status: 400 });

  const reader = readerFrom(request);
  const reading = readingFor(kind, id, reader.id);
  if (!reading) return NextResponse.json({ ok: false, error: "unknown-page" }, { status: 404 });

  if (reading.paid) {
    return withReader(NextResponse.json({
      ok: true,
      alreadyPaid: true,
      amount: reading.priceMnt,
      reading: paidPayload(reading),
    }), reader.id, reader.fresh);
  }

  const config = qpayConfig(siteUrlFrom(request.headers));
  if (!config) {
    return withReader(NextResponse.json({ ok: false, error: "qpay-not-configured" }, { status: 503 }), reader.id, reader.fresh);
  }

  const orderId = `EDU-${Date.now()}`;
  await createInvoice({
    orderId,
    readerId: reader.id,
    productKey: `${kind}:${id}`,
    kind,
    itemId: id,
    amountMnt: chargedPrice(kind),
    qpayInvoiceId: null,
    paymentId: null,
    status: "pending",
    createdAt: new Date().toISOString(),
  });

  try {
    const invoice = await createQpayInvoice({
      config,
      orderId,
      kind,
      description: `EduMongolia ${kind} ${id}`,
    });
    await attachQpayInvoice(orderId, invoice.invoiceId);
    return withReader(NextResponse.json({
      ok: true,
      alreadyPaid: false,
      orderId,
      amount: invoice.amount,
      invoiceId: invoice.invoiceId,
      qrText: invoice.qrText,
      qrImage: invoice.qrImage,
      urls: invoice.urls,
    }), reader.id, reader.fresh);
  } catch (error) {
    await markInvoiceFailed(orderId);
    const step = error instanceof QpayError ? error.message : "invoice";
    const detail = error instanceof QpayError ? error.detail : "";
    console.error("qpay invoice failed", step, detail);
    return withReader(NextResponse.json({ ok: false, error: step, detail }, { status: 502 }), reader.id, reader.fresh);
  }
}
