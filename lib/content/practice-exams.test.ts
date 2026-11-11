import assert from "node:assert/strict";
import { drawAttempt, getPracticeExam, practiceExams } from "./practice-exams.ts";
import { embedUrl, studentCanOpen } from "./teacher-forms.ts";

for (const exam of practiceExams) {
  assert.ok(exam.questions.length > exam.perAttempt, exam.slug);
  const seen = new Set(exam.questions.map((item) => item.id));
  assert.equal(seen.size, exam.questions.length, exam.slug);
  for (const question of exam.questions) {
    assert.ok(question.answer >= 0 && question.answer < question.choices.length, question.id);
  }
}

const math = getPracticeExam("eesh-math");
assert.ok(math);
const first = drawAttempt(math, [], () => 0);
assert.equal(first.length, math.perAttempt);
assert.equal(new Set(first.map((item) => item.id)).size, first.length);
const again = drawAttempt(math, first.map((item) => item.id), () => 0);
assert.ok(again.every((item) => !first.some((picked) => picked.id === item.id)));

const fixed = drawAttempt(math, [], () => 0.99);
for (const item of fixed) {
  const source = math.questions.find((question) => question.id === item.id);
  assert.ok(source);
  assert.equal(item.choices[item.answer].mn, source.choices[source.answer].mn);
}

assert.equal(embedUrl("http://docs.google.com/forms/d/e/abc/viewform"), null);
assert.equal(embedUrl("https://example.com/forms/d/e/abc/viewform"), null);
const embedded = embedUrl("https://docs.google.com/forms/d/e/abc/viewform");
assert.ok(embedded?.includes("embedded=true"));
assert.equal(studentCanOpen({ price: 0, hideUntilPaid: true }), true);
assert.equal(studentCanOpen({ price: 5000, hideUntilPaid: true }), false);
assert.equal(studentCanOpen({ price: 5000, hideUntilPaid: false }), true);

console.log("practice exam checks passed");
