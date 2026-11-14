import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { projectBriefs } from "../content/project-briefs.ts";
import { schoolTopics } from "../content/school-exams.ts";
import { joinParts, previewText, remainderText } from "./preview.ts";
import { EXAM_PRICE_MNT, priceForPage, PROJECT_PRICE_MNT } from "./pricing.ts";
import { createInvoice, findEntitlement, grantOnce } from "./store.ts";

const file = path.join(os.tmpdir(), `edu-payments-${process.pid}.json`);
process.env.EDU_PAYMENTS_FILE = file;
fs.rmSync(file, { force: true });

assert.equal(priceForPage("exam"), 5000);
assert.equal(priceForPage("project"), 10000);
assert.equal(EXAM_PRICE_MNT, 5000);
assert.equal(PROJECT_PRICE_MNT, 10000);

for (const topic of schoolTopics) {
  const parts = topic.lesson.map((part) => part.mn);
  const whole = joinParts(parts);
  const preview = previewText(parts);
  const rest = remainderText(parts);
  assert.ok(preview.length > 0 && preview.length <= Math.floor(whole.length * 0.4), topic.slug);
  assert.ok(whole.startsWith(preview), topic.slug);
  assert.equal(rest, whole.slice(preview.length).trimStart());
  assert.ok(!preview.includes(topic.questions[0].prompt.mn));
}

for (const id of Object.keys(projectBriefs)) {
  const parts = projectBriefs[id].map((part) => part.mn);
  const whole = joinParts(parts);
  const preview = previewText(parts);
  assert.ok(preview.length > 0 && preview.length <= Math.floor(whole.length * 0.4), id);
  assert.ok(priceForPage("project") === 10000);
}

const reader = "11111111-1111-4111-8111-111111111111";
await createInvoice({
  orderId: "EDU-1",
  readerId: reader,
  productKey: "exam:middle-math-fractions",
  kind: "exam",
  itemId: "middle-math-fractions",
  amountMnt: 5000,
  qpayInvoiceId: "qpay-1",
  paymentId: null,
  status: "pending",
  createdAt: new Date().toISOString(),
});
const first = await grantOnce({ orderId: "EDU-1", paymentId: "pay-1" });
const second = await grantOnce({ orderId: "EDU-1", paymentId: "pay-1" });
assert.equal(first.ok && first.created, true);
assert.equal(second.ok && second.created, false);
await createInvoice({
  orderId: "EDU-2",
  readerId: reader,
  productKey: "exam:middle-math-fractions",
  kind: "exam",
  itemId: "middle-math-fractions",
  amountMnt: 5000,
  qpayInvoiceId: "qpay-2",
  paymentId: null,
  status: "pending",
  createdAt: new Date().toISOString(),
});
const third = await grantOnce({ orderId: "EDU-2", paymentId: "pay-2" });
assert.equal(third.ok && third.created, false);
assert.equal(findEntitlement(reader, "exam:middle-math-fractions")?.paymentId, "pay-1");
assert.equal(findEntitlement(reader, "exam:middle-math-fractions") !== null, true);
const again = findEntitlement(reader, "project:kindergarten");
assert.equal(again, null);

fs.rmSync(file, { force: true });
console.log("payment checks passed");
