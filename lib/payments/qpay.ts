import { chargedPrice } from "@/lib/catalog/charge";
import type { PaidPage } from "./pricing";
import { builtQpay } from "./qpay-built.generated";

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

const DEFAULT_SITE_URL = "https://edumongolia.com";

/** Names only. Values stay on the server and are never returned. */
export function qpayReadiness() {
  return QPAY_ENV_NAMES.map((name) => ({ name, set: Boolean(hostValue(name)) }));
}

export function siteUrlFrom(headers: Headers) {
  const forwardedHost = headers.get("x-forwarded-host") || headers.get("host") || "edumongolia.com";
  const host = forwardedHost.split(",")[0]?.trim() || "edumongolia.com";
  const forwardedProto = headers.get("x-forwarded-proto") || "";
  const proto = forwardedProto.split(",")[0]?.trim() || (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`.replace(/\/$/, "");
}

function hostValue(name: "EDU_QPAY_USERNAME" | "EDU_QPAY_PASSWORD" | "EDU_QPAY_INVOICE_CODE" | "EDU_SITE_URL") {
  const runtime = process.env[name];
  if (typeof runtime === "string" && runtime.trim()) return runtime.trim();
  const built = builtQpay?.[name === "EDU_QPAY_USERNAME" ? "username" : name === "EDU_QPAY_PASSWORD" ? "password" : name === "EDU_QPAY_INVOICE_CODE" ? "invoiceCode" : "siteUrl"];
  return built?.trim() || "";
}

/** EduMongolia uses its own QPay variables. They are not the eSIM merchant variables. */
export function qpayConfig(fallbackSiteUrl?: string | null): QpayConfig | null {
  const username = hostValue("EDU_QPAY_USERNAME");
  const password = hostValue("EDU_QPAY_PASSWORD");
  const invoiceCode = hostValue("EDU_QPAY_INVOICE_CODE");
  const siteUrl = (hostValue("EDU_SITE_URL") || fallbackSiteUrl?.trim() || DEFAULT_SITE_URL).replace(/\/$/, "");
  if (!username || !password || !invoiceCode) return null;
  return { username, password, invoiceCode, siteUrl };
}

export class QpayError extends Error {
  detail: string;

  constructor(step: "token" | "invoice" | "check", detail = "") {
    super(step);
    this.detail = detail.slice(0, 180);
  }
}

function qpayDetail(body: unknown) {
  if (!body || typeof body !== "object") return "";
  const record = body as { message?: unknown; error?: unknown };
  const message = typeof record.message === "string" ? record.message : "";
  const error = typeof record.error === "string" ? record.error : "";
  return (message || error).slice(0, 180);
}

async function accessToken(config: QpayConfig) {
  const basic = Buffer.from(`${config.username}:${config.password}`).toString("base64");
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}` },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.access_token) throw new QpayError("token", qpayDetail(body));
  return String(body.access_token);
}

export async function createQpayInvoice(input: {
  config: QpayConfig;
  orderId: string;
  kind: PaidPage;
  description: string;
}) {
  const token = await accessToken(input.config);
  const amount = chargedPrice(input.kind);
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
  if (!response.ok || !body.invoice_id) throw new QpayError("invoice", qpayDetail(body));
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
  if (!response.ok) throw new QpayError("check", qpayDetail(body));
  const rows = Array.isArray(body.rows) ? body.rows : [];
  const paid = rows.find((row: { payment_status?: string }) => row?.payment_status === "PAID");
  const paymentId = paid?.payment_id ? String(paid.payment_id) : paid ? `invoice:${invoiceId}` : null;
  return { paid: Boolean(paid), paymentId };
}
