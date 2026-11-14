import { quote, type PriceCode } from "./prices";
import { loadPriceRules } from "./store";
import type { PaidPage } from "@/lib/payments/pricing";

const priceCode: Record<PaidPage, PriceCode> = {
  exam: "exam",
  form: "exam",
  lesson: "exam",
  project: "project",
  quiz: "quiz",
  iq: "iq",
  story: "story",
};

/** Amount the server puts on a QPay invoice. The browser cannot choose it. */
export function chargedPrice(kind: PaidPage, options?: { pages?: number }) {
  return quote(loadPriceRules(), priceCode[kind], options);
}
