export type SchoolLocale = "mn" | "en";

export type SchoolBand = "middle" | "high" | "cambridge" | "international";

export type SchoolText = { mn: string; en: string };

export type SchoolChoice = SchoolText & { why?: SchoolText };

export type SchoolQuestion = {
  id: string;
  prompt: SchoolText;
  choices: SchoolChoice[];
  answer: number;
  rule: SchoolText;
};

export type SchoolTopic = {
  slug: string;
  band: SchoolBand;
  subject: string;
  grades: SchoolText;
  title: SchoolText;
  summary: SchoolText;
  lesson: SchoolText[];
  perAttempt: number;
  questions: SchoolQuestion[];
  custom?: boolean;
};

export const SCHOOL_CUSTOM_KEY = "edumongolia-school-topics";

export const schoolBands: SchoolBand[] = ["middle", "high", "cambridge", "international"];

export const bandLabel: Record<SchoolBand, SchoolText> = {
  middle: { mn: "Дунд анги", en: "Middle school" },
  high: { mn: "Ахлах анги", en: "High school" },
  cambridge: { mn: "Cambridge шалгалт", en: "Cambridge exams" },
  international: { mn: "Олон улсын төгсөлтийн шалгалт", en: "International graduation exams" },
};

const subjectLabel: Record<string, SchoolText> = {
  math: { mn: "Математик", en: "Mathematics" },
  mongolian: { mn: "Монгол хэл", en: "Mongolian" },
  physics: { mn: "Физик", en: "Physics" },
  chemistry: { mn: "Хими", en: "Chemistry" },
  civics: { mn: "Нийгэм", en: "Civics" },
  biology: { mn: "Биологи", en: "Biology" },
  english: { mn: "Англи хэл", en: "English" },
  history: { mn: "Түүх", en: "History" },
  geography: { mn: "Газарзүй", en: "Geography" },
  logic: { mn: "Логик", en: "Logic" },
};

export function schoolText(value: SchoolText, locale: SchoolLocale) {
  const text = value[locale].trim();
  return text || value.mn;
}

export function subjectName(subject: string, locale: SchoolLocale) {
  const known = subjectLabel[subject];
  return known ? schoolText(known, locale) : subject;
}

export function choiceLabel(index: number) {
  return String.fromCharCode(65 + index);
}

function shuffle<T>(items: T[], random: () => number) {
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    const current = copy[index];
    copy[index] = copy[swap];
    copy[swap] = current;
  }
  return copy;
}

export function drawSchoolAttempt(
  topic: SchoolTopic,
  avoid: string[] = [],
  random: () => number = Math.random,
): SchoolQuestion[] {
  const count = Math.min(topic.perAttempt, topic.questions.length);
  const fresh = topic.questions.filter((item) => !avoid.includes(item.id));
  const used = topic.questions.filter((item) => avoid.includes(item.id));
  const ordered = fresh.length >= count ? shuffle(fresh, random) : [...shuffle(fresh, random), ...shuffle(used, random)];
  return ordered.slice(0, count).map((item) => shuffleChoices(item, random));
}

function shuffleChoices(item: SchoolQuestion, random: () => number): SchoolQuestion {
  const paired = item.choices.map((choice, index) => ({ choice, correct: index === item.answer }));
  const mixed = shuffle(paired, random);
  return {
    ...item,
    choices: mixed.map((entry) => entry.choice),
    answer: mixed.findIndex((entry) => entry.correct),
  };
}

export type CustomDraft = {
  band: SchoolBand;
  subject: string;
  grades: string;
  title: string;
  lesson: string;
  questions: Array<{
    prompt: string;
    rule: string;
    choices: Array<{ text: string; why: string }>;
    answer: number;
  }>;
};

export type CustomError = "subject" | "grades" | "title" | "lesson" | "questions" | "prompt" | "rule" | "choice" | "why" | "answer";

function pair(mn: string, en: string): SchoolText {
  return { mn, en };
}

export function buildCustomTopic(draft: CustomDraft, now = Date.now()): { ok: true; topic: SchoolTopic } | { ok: false; error: CustomError } {
  const subject = draft.subject.trim();
  const grades = draft.grades.trim();
  const title = draft.title.trim();
  const lesson = draft.lesson
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!subject) return { ok: false, error: "subject" };
  if (!grades) return { ok: false, error: "grades" };
  if (!title) return { ok: false, error: "title" };
  if (lesson.length === 0) return { ok: false, error: "lesson" };
  if (draft.questions.length < 2) return { ok: false, error: "questions" };

  const slug = `custom-${now}`;
  const questions: SchoolQuestion[] = [];
  for (let index = 0; index < draft.questions.length; index += 1) {
    const item = draft.questions[index];
    const prompt = item.prompt.trim();
    const rule = item.rule.trim();
    if (!prompt) return { ok: false, error: "prompt" };
    if (!rule) return { ok: false, error: "rule" };
    if (!Number.isInteger(item.answer) || item.answer < 0 || item.answer >= item.choices.length) return { ok: false, error: "answer" };
    const filled = item.choices
      .map((choice, choiceIndex) => ({ text: choice.text.trim(), why: choice.why.trim(), choiceIndex }))
      .filter((choice) => choice.text);
    const answer = filled.findIndex((choice) => choice.choiceIndex === item.answer);
    if (filled.length < 2) return { ok: false, error: "choice" };
    if (answer < 0) return { ok: false, error: "answer" };
    if (filled.some((choice, choiceIndex) => choiceIndex !== answer && !choice.why)) return { ok: false, error: "why" };
    questions.push({
      id: `${slug}-q${index + 1}`,
      prompt: pair(prompt, prompt),
      rule: pair(rule, rule),
      answer,
      choices: filled.map((choice, choiceIndex) =>
        choiceIndex === answer ? pair(choice.text, choice.text) : { ...pair(choice.text, choice.text), why: pair(choice.why, choice.why) },
      ),
    });
  }

  return {
    ok: true,
    topic: {
      slug,
      band: draft.band,
      subject,
      grades: pair(grades, grades),
      title: pair(title, title),
      summary: pair(lesson[0], lesson[0]),
      lesson: lesson.map((line) => pair(line, line)),
      perAttempt: questions.length > 4 ? 4 : questions.length,
      questions,
      custom: true,
    },
  };
}

export function readCustomTopics(value: unknown): SchoolTopic[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isSchoolTopic);
}

function isSchoolTopic(value: unknown): value is SchoolTopic {
  if (!value || typeof value !== "object") return false;
  const topic = value as SchoolTopic;
  return schoolBands.includes(topic.band)
    && typeof topic.slug === "string"
    && typeof topic.subject === "string"
    && topic.custom === true
    && Array.isArray(topic.questions)
    && topic.questions.length >= 2
    && topic.questions.every((item) => item.answer >= 0 && item.answer < item.choices.length);
}
