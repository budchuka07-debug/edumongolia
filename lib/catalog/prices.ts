export const PRICE_CODES = ["exam", "project", "project_page", "quiz", "iq", "story"] as const;

export type PriceCode = (typeof PRICE_CODES)[number];

/** A row an administrator can change. The page count lives here, not in a fixed formula. */
export type PriceRule = {
  code: PriceCode;
  amountMnt: number;
  includedUnits: number;
};

export const defaultPriceRules: PriceRule[] = [
  { code: "exam", amountMnt: 5000, includedUnits: 1 },
  { code: "project", amountMnt: 10000, includedUnits: 1 },
  { code: "project_page", amountMnt: 2000, includedUnits: 1 },
  { code: "quiz", amountMnt: 2000, includedUnits: 1 },
  { code: "iq", amountMnt: 10000, includedUnits: 1 },
  { code: "story", amountMnt: 2000, includedUnits: 1 },
];

export function isPriceCode(value: string): value is PriceCode {
  return (PRICE_CODES as readonly string[]).includes(value);
}

export function sanitizeRules(input: unknown): PriceRule[] | null {
  if (!Array.isArray(input) || input.length !== PRICE_CODES.length) return null;
  const rules: PriceRule[] = [];
  for (const code of PRICE_CODES) {
    const row = input.find((item) => item && typeof item === "object" && (item as PriceRule).code === code) as Partial<PriceRule> | undefined;
    if (!row) return null;
    const amountMnt = Number(row.amountMnt);
    const includedUnits = Number(row.includedUnits);
    if (!Number.isInteger(amountMnt) || amountMnt < 0 || amountMnt > 1_000_000) return null;
    if (!Number.isInteger(includedUnits) || includedUnits < 0 || includedUnits > 1000) return null;
    rules.push({ code, amountMnt, includedUnits });
  }
  return rules;
}

/**
 * Project total = project price + extra pages × page price.
 * Pages included in the base price are `project_page.includedUnits`.
 */
export function quote(rules: PriceRule[], code: PriceCode, options?: { pages?: number }) {
  const row = rules.find((item) => item.code === code);
  if (!row) return 0;
  if (code !== "project") return row.amountMnt;
  const addon = rules.find((item) => item.code === "project_page");
  if (!addon) return row.amountMnt;
  const pages = options?.pages ?? addon.includedUnits;
  const extra = Math.max(0, pages - addon.includedUnits);
  return row.amountMnt + extra * addon.amountMnt;
}
