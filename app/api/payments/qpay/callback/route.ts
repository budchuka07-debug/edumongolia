import { NextResponse, type NextRequest } from "next/server";
import { checkQpayInvoice, qpayConfig } from "@/lib/payments/qpay";
import { findInvoice, grantOnce } from "@/lib/payments/store";

async function settle(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("order") ?? "";
  const invoice = findInvoice(orderId);
  const config = qpayConfig();
  if (!invoice?.qpayInvoiceId || !config) return new NextResponse("OK", { status: 200 });
  try {
    const result = await checkQpayInvoice(config, invoice.qpayInvoiceId);
    if (result.paid && result.paymentId) await grantOnce({ orderId, paymentId: result.paymentId });
    return new NextResponse("OK", { status: 200 });
  } catch {
    return new NextResponse("RETRY", { status: 502 });
  }
}

export function GET(request: NextRequest) {
  return settle(request);
}

export function POST(request: NextRequest) {
  return settle(request);
}
