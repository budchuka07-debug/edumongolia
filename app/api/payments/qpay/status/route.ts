import { connection, NextResponse } from "next/server";
import { qpayConfig } from "@/lib/payments/qpay";

/** Whether an invoice can be created. Never returns credential names or values. */
export async function GET() {
  await connection();
  return NextResponse.json({ ready: qpayConfig() !== null });
}
