import fs from "node:fs";
import path from "node:path";
import type { PaidPage } from "./pricing";

export type InvoiceStatus = "pending" | "paid" | "failed";

export type InvoiceRecord = {
  orderId: string;
  readerId: string;
  productKey: string;
  kind: PaidPage;
  itemId: string;
  amountMnt: number;
  qpayInvoiceId: string | null;
  paymentId: string | null;
  status: InvoiceStatus;
  createdAt: string;
};

export type EntitlementRecord = {
  readerId: string;
  productKey: string;
  orderId: string;
  paymentId: string;
  grantedAt: string;
};

type Ledger = {
  invoices: InvoiceRecord[];
  entitlements: EntitlementRecord[];
};

function ledgerPath() {
  return process.env.EDU_PAYMENTS_FILE || path.join(process.cwd(), "data", "edu-payments.json");
}

function emptyLedger(): Ledger {
  return { invoices: [], entitlements: [] };
}

function readLedger(): Ledger {
  try {
    const raw = fs.readFileSync(ledgerPath(), "utf8");
    const parsed = JSON.parse(raw) as Ledger;
    return {
      invoices: Array.isArray(parsed.invoices) ? parsed.invoices : [],
      entitlements: Array.isArray(parsed.entitlements) ? parsed.entitlements : [],
    };
  } catch {
    return emptyLedger();
  }
}

function writeLedger(ledger: Ledger) {
  const file = ledgerPath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(ledger, null, 2));
  fs.renameSync(temporary, file);
}

let chain: Promise<unknown> = Promise.resolve();

function update<T>(change: (ledger: Ledger) => T): Promise<T> {
  const run = chain.then(() => {
    const ledger = readLedger();
    const result = change(ledger);
    writeLedger(ledger);
    return result;
  });
  chain = run.then(() => undefined, () => undefined);
  return run;
}

export function findEntitlement(readerId: string, productKey: string) {
  return readLedger().entitlements.find((item) => item.readerId === readerId && item.productKey === productKey) ?? null;
}

export function findInvoice(orderId: string) {
  return readLedger().invoices.find((item) => item.orderId === orderId) ?? null;
}

export function createInvoice(record: InvoiceRecord) {
  return update((ledger) => {
    ledger.invoices.unshift(record);
    return record;
  });
}

export function markInvoiceFailed(orderId: string) {
  return update((ledger) => {
    const invoice = ledger.invoices.find((item) => item.orderId === orderId);
    if (invoice && invoice.status === "pending") invoice.status = "failed";
    return invoice ?? null;
  });
}

export function attachQpayInvoice(orderId: string, qpayInvoiceId: string) {
  return update((ledger) => {
    const invoice = ledger.invoices.find((item) => item.orderId === orderId);
    if (!invoice) return null;
    invoice.qpayInvoiceId = qpayInvoiceId;
    return invoice;
  });
}

/**
 * One paid QPay payment grants one entitlement for that reader and page.
 * A repeated callback or a second payment for the same page does not add another.
 */
export function grantOnce(input: { orderId: string; paymentId: string }) {
  return update((ledger) => {
    const invoice = ledger.invoices.find((item) => item.orderId === input.orderId);
    if (!invoice) return { ok: false as const, reason: "missing" as const };
    const existingPayment = ledger.entitlements.find((item) => item.paymentId === input.paymentId);
    if (existingPayment) {
      invoice.status = "paid";
      invoice.paymentId = input.paymentId;
      return { ok: true as const, created: false, entitlement: existingPayment };
    }
    const existingPage = ledger.entitlements.find((item) => item.readerId === invoice.readerId && item.productKey === invoice.productKey);
    invoice.status = "paid";
    invoice.paymentId = input.paymentId;
    if (existingPage) return { ok: true as const, created: false, entitlement: existingPage };
    const entitlement: EntitlementRecord = {
      readerId: invoice.readerId,
      productKey: invoice.productKey,
      orderId: invoice.orderId,
      paymentId: input.paymentId,
      grantedAt: new Date().toISOString(),
    };
    ledger.entitlements.push(entitlement);
    return { ok: true as const, created: true, entitlement };
  });
}
