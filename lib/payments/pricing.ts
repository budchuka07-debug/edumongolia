export type PaidPage = "exam" | "project";

/** Examination pages. The amount is set here, never from the browser. */
export const EXAM_PRICE_MNT = 5000;

/** Project pages. A different page uses a different amount. */
export const PROJECT_PRICE_MNT = 10000;

export function priceForPage(kind: PaidPage) {
  if (kind === "exam") return EXAM_PRICE_MNT;
  return PROJECT_PRICE_MNT;
}

export function productKey(kind: PaidPage, id: string) {
  return `${kind}:${id}`;
}
