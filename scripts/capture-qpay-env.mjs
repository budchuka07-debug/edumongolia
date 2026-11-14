import { writeFileSync } from "node:fs";

function first(...names) {
  for (const name of names) {
    const value = process.env[name];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

const username = first("EDU_QPAY_USERNAME", "QPAY_USERNAME");
const password = first("EDU_QPAY_PASSWORD", "QPAY_PASSWORD");
const invoiceCode = first("EDU_QPAY_INVOICE_CODE", "QPAY_INVOICE_CODE");
const siteUrl = first("EDU_SITE_URL", "SITE_URL", "BASE_URL");
const built = username && password && invoiceCode ? { username, password, invoiceCode, siteUrl } : null;

writeFileSync(
  new URL("../lib/payments/qpay-built.generated.ts", import.meta.url),
  `// Generated during build from the host environment. Do not commit.\nexport const builtQpay = ${JSON.stringify(built)} as null | { username: string; password: string; invoiceCode: string; siteUrl: string };\n`,
);
