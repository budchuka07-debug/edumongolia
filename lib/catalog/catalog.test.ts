import assert from "node:assert/strict";
import { defaultPriceRules, quote, sanitizeRules } from "./prices.ts";

assert.equal(quote(defaultPriceRules, "exam"), 5000);
assert.equal(quote(defaultPriceRules, "project"), 10000);
assert.equal(quote(defaultPriceRules, "project", { pages: 1 }), 10000);
assert.equal(quote(defaultPriceRules, "project", { pages: 3 }), 14000);
assert.equal(quote(defaultPriceRules, "quiz"), 2000);
assert.equal(quote(defaultPriceRules, "iq"), 10000);
assert.equal(quote(defaultPriceRules, "story"), 2000);

const changed = defaultPriceRules.map((rule) =>
  rule.code === "project_page" ? { ...rule, amountMnt: 3000, includedUnits: 2 } : rule,
);
assert.equal(quote(changed, "project", { pages: 4 }), 16000);
assert.equal(sanitizeRules(changed)?.length, 6);
assert.equal(sanitizeRules([{ code: "exam", amountMnt: -1, includedUnits: 1 }]), null);
