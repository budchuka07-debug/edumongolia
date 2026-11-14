export const PREVIEW_RATIO = 0.4;

export type Bilingual = { mn: string; en: string };

export function joinParts(parts: string[]) {
  return parts.map((part) => part.trim()).filter(Boolean).join("\n\n");
}

/** Whole paragraphs that fit in the ratio. The first paragraph stays intact so the open part is readable. */
export function previewText(parts: string[], ratio = PREVIEW_RATIO) {
  const cleaned = parts.map((part) => part.trim()).filter(Boolean);
  if (cleaned.length === 0) return "";
  const budget = Math.floor(joinParts(cleaned).length * ratio);
  let used = "";
  for (const part of cleaned) {
    const next = used ? `${used}\n\n${part}` : part;
    if (!used || next.length <= budget) used = next;
    else break;
  }
  return used;
}

export function openQuestionCount(total: number, ratio = PREVIEW_RATIO) {
  if (total <= 0) return 0;
  return Math.max(1, Math.round(total * ratio));
}

export function remainderText(parts: string[], ratio = PREVIEW_RATIO) {
  const whole = joinParts(parts);
  const preview = previewText(parts, ratio);
  if (!preview) return whole;
  if (!whole.startsWith(preview)) return whole;
  return whole.slice(preview.length).trimStart();
}

export function splitBilingual(parts: Bilingual[], ratio = PREVIEW_RATIO) {
  return {
    preview: {
      mn: previewText(parts.map((part) => part.mn), ratio),
      en: previewText(parts.map((part) => part.en), ratio),
    },
    rest: {
      mn: remainderText(parts.map((part) => part.mn), ratio),
      en: remainderText(parts.map((part) => part.en), ratio),
    },
  };
}
