import { priceForPage, type PaidPage } from "./pricing";

const TOKEN_URL = "https://merchant.qpay.mn/v2/auth/token";
const INVOICE_URL = "https://merchant.qpay.mn/v2/invoice";
const CHECK_URL = "https://merchant.qpay.mn/v2/payment/check";

export type QpayConfig = {
  username: string;
  password: string;
  invoiceCode: string;
  siteUrl: string;
};

export const QPAY_ENV_NAMES = ["EDU_QPAY_USERNAME", "EDU_QPAY_PASSWORD", "EDU_QPAY_INVOICE_CODE", "EDU_SITE_URL"] as const;

/** Names only. Values stay on the server and are never returned. */
export function qpayReadiness() {
  return QPAY_ENV_NAMES.map((name) => ({ name, set: Boolean(process.env[name]?.trim()) }));
}

/** EduMongolia uses its own QPay variables. They are not the eSIM merchant variables. */
export function qpayConfig(): QpayConfig | null {
  const username = process.env.EDU_QPAY_USERNAME;
  const password = process.env.EDU_QPAY_PASSWORD;
  const invoiceCode = process.env.EDU_QPAY_INVOICE_CODE;
  const siteUrl = process.env.EDU_SITE_URL?.replace(/\/$/, "");
  if (!username || !password || !invoiceCode || !siteUrl) return null;
  return { username, password, invoiceCode, siteUrl };
}

export class QpayError extends Error {
  constructor(step: "token" | "invoice" | "check") {
    super(step);
  }
}

async function accessToken(config: QpayConfig) {
  const basic = Buffer.from(`${config.username}:${config.password}`).toString("base64");
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}` },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.access_token) throw new QpayError("token");
  return String(body.access_token);
}

export async function createQpayInvoice(input: {
  config: QpayConfig;
  orderId: string;
  kind: PaidPage;
  description: string;
}) {
  const token = await accessToken(input.config);
  const amount = priceForPage(input.kind);
  const response = await fetch(INVOICE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      invoice_code: input.config.invoiceCode,
      sender_invoice_no: input.orderId,
      invoice_receiver_code: "terminal",
      invoice_description: input.description,
      amount,
      callback_url: `${input.config.siteUrl}/api/payments/qpay/callback?order=${encodeURIComponent(input.orderId)}`,
    }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.invoice_id) throw new QpayError("invoice");
  return {
    invoiceId: String(body.invoice_id),
    qrText: typeof body.qr_text === "string" ? body.qr_text : "",
    qrImage: typeof body.qr_image === "string" ? body.qr_image : "",
    urls: Array.isArray(body.urls) ? body.urls : [],
    amount,
  };
}

export async function checkQpayInvoice(config: QpayConfig, invoiceId: string) {
  const token = await accessToken(config);
  const response = await fetch(CHECK_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      object_type: "INVOICE",
      object_id: invoiceId,
      offset: { page_number: 1, page_limit: 100 },
    }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new QpayError("check");
  const rows = Array.isArray(body.rows) ? body.rows : [];
  const paid = rows.find((row: { payment_status?: string }) => row?.payment_status === "PAID");
  const paymentId = paid?.payment_id ? String(paid.payment_id) : paid ? `invoice:${invoiceId}` : null;
  return { paid: Boolean(paid), paymentId };
}
