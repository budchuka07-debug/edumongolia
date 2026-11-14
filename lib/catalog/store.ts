import fs from "node:fs";
import path from "node:path";
import { defaultPriceRules, sanitizeRules, type PriceRule } from "./prices";

function catalogPath() {
  return process.env.EDU_CATALOG_FILE || path.join(process.cwd(), "data", "edu-catalog.json");
}

export function loadPriceRules(): PriceRule[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ catalogPath(), "utf8")) as { rules?: unknown };
    return sanitizeRules(parsed.rules) ?? defaultPriceRules;
  } catch {
    return defaultPriceRules;
  }
}

export function savePriceRules(rules: PriceRule[]) {
  const file = catalogPath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify({ rules }, null, 2));
  fs.renameSync(temporary, file);
}
