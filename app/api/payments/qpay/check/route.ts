import { NextResponse, type NextRequest } from "next/server";
import { paidPayload, readingFor } from "@/lib/payments/reading";
import { isReaderId, READER_COOKIE } from "@/lib/payments/reader";
import { checkEsimQpayInvoice, checkQpayInvoice, qpayConfig, QpayError } from "@/lib/payments/qpay";
import { findInvoice, grantOnce } from "@/lib/payments/store";

export async function POST(request: NextRequest) {
  const readerId = request.cookies.get(READER_COOKIE)?.value;
  if (!isReaderId(readerId)) return NextResponse.json({ ok: false, error: "reader" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const orderId = typeof body.orderId === "string" ? body.orderId : "";
  const invoice = findInvoice(orderId);
  if (!invoice || invoice.readerId !== readerId || !invoice.qpayInvoiceId) {
    return NextResponse.json({ ok: false, error: "unknown-invoice" }, { status: 404 });
  }

  const config = qpayConfig();

  try {
    const result = config
      ? await checkQpayInvoice(config, invoice.qpayInvoiceId)
      : await checkEsimQpayInvoice(invoice.qpayInvoiceId);
    if (!result.paid || !result.paymentId) return NextResponse.json({ ok: true, paid: false });
    const grant = await grantOnce({ orderId, paymentId: result.paymentId });
    if (!grant.ok) return NextResponse.json({ ok: false, error: "missing" }, { status: 404 });
    const reading = readingFor(invoice.kind, invoice.itemId, readerId);
    return NextResponse.json({
      ok: true,
      paid: true,
      created: grant.created,
      reading: reading ? paidPayload(reading) : null,
    });
  } catch (error) {
    const step = error instanceof QpayError ? error.message : "check";
    return NextResponse.json({ ok: false, error: step }, { status: 502 });
  }
}
