export type PaidPage = "exam" | "project" | "form" | "lesson" | "quiz" | "iq" | "story";

/** Default examination price. A saved catalog override replaces this on the server. */
export const EXAM_PRICE_MNT = 5000;

/** Default project price. A saved catalog override replaces this on the server. */
export const PROJECT_PRICE_MNT = 10000;

/** Default catalog price. Server charges use `chargedPrice`, which reads admin edits. */
export function priceForPage(kind: PaidPage) {
  if (kind === "project") return PROJECT_PRICE_MNT;
  if (kind === "quiz" || kind === "story") return 2000;
  if (kind === "iq") return 10000;
  return EXAM_PRICE_MNT;
}

export function isPaidPage(value: unknown): value is PaidPage {
  return value === "exam" || value === "project" || value === "form" || value === "lesson" || value === "quiz" || value === "iq" || value === "story";
}

export function productKey(kind: PaidPage, id: string) {
  return `${kind}:${id}`;
}
