export const PREVIEW_RATIO = 0.4;

export type Bilingual = { mn: string; en: string };

export function joinParts(parts: string[]) {
  return parts.map((part) => part.trim()).filter(Boolean).join("\n\n");
}

/** The readable prefix is at most `ratio` of the characters. The cut prefers a word boundary inside that budget. */
export function previewText(parts: string[], ratio = PREVIEW_RATIO) {
  const whole = joinParts(parts);
  const budget = Math.floor(whole.length * ratio);
  if (budget <= 0) return "";
  const slice = whole.slice(0, budget);
  const space = slice.lastIndexOf(" ");
  const clipped = space > budget * 0.6 ? slice.slice(0, space) : slice;
  return clipped.trimEnd();
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
