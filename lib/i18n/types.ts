export type Locale = "mn" | "en";

export type Copy = Record<Locale, string>;

export type Subject = "language" | "stem" | "humanities" | "teaching";

export type Level = "middle" | "secondary" | "teacher";

export type Check = {
  id: string;
  prompt: Copy;
  options: Record<Locale, [string, string, string]>;
  answer: 0 | 1 | 2;
};

export type Lesson = {
  id: string;
  title: Copy;
  minutes: number;
  body: Record<Locale, string[]>;
};

export type Module = {
  id: string;
  title: Copy;
  lessons: Lesson[];
};

export type Course = {
  slug: string;
  subject: Subject;
  level: Level;
  featured?: boolean;
  title: Copy;
  summary: Copy;
  audience: Copy;
  outcomes: Record<Locale, string[]>;
  modules: Module[];
  checks: Check[];
  instructor: { name: string; role: Copy };
};

export type Resource = {
  slug: string;
  kind: "plan" | "guide" | "template";
  title: Copy;
  summary: Copy;
  minutes: number;
  body: Record<Locale, string[]>;
  relatedCourse?: string;
};
