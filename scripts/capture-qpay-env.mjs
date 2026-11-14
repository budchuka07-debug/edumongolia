import { writeFileSync } from "node:fs";

function clean(name) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

const username = clean("EDU_QPAY_USERNAME");
const password = clean("EDU_QPAY_PASSWORD");
const invoiceCode = clean("EDU_QPAY_INVOICE_CODE");
const siteUrl = clean("EDU_SITE_URL");
const built = username && password && invoiceCode ? { username, password, invoiceCode, siteUrl } : null;

writeFileSync(
  new URL("../lib/payments/qpay-built.generated.ts", import.meta.url),
  `// Generated during build from the host environment. Do not commit.\nexport const builtQpay = ${JSON.stringify(built)} as null | { username: string; password: string; invoiceCode: string; siteUrl: string };\n`,
);
