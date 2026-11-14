import assert from "node:assert/strict";
import { bankGrades, gradeLessons } from "./grade-bank.ts";
import { drawSchoolAttempt } from "./school-play.ts";

const subjects = ["math", "physics", "chemistry", "biology", "mongolian", "english", "history", "geography"];
const slugs = new Set<string>();
const ids = new Set<string>();

for (const grade of bankGrades) {
  const lessons = gradeLessons.filter((item) => item.grade === grade);
  assert.equal(lessons.length, subjects.length, String(grade));
  for (const subject of subjects) {
    assert.equal(lessons.filter((item) => item.topic.subject === subject).length, 1, `${grade}-${subject}`);
  }
}

for (const lesson of gradeLessons) {
  const topic = lesson.topic;
  assert.ok(!slugs.has(topic.slug), topic.slug);
  slugs.add(topic.slug);
  assert.ok(topic.questions.length > topic.perAttempt, topic.slug);
  assert.equal(topic.grades.mn, `${lesson.grade}-р анги`);
  for (const question of topic.questions) {
    assert.ok(!ids.has(question.id), question.id);
    ids.add(question.id);
    assert.equal(question.answer, 0, question.id);
    assert.equal(question.choices[0].why, undefined, question.id);
    assert.ok(question.choices.slice(1).every((choice) => choice.why?.mn && choice.why.en), question.id);
    const labels = new Set(question.choices.map((choice) => choice.mn));
    assert.equal(labels.size, question.choices.length, question.id);
  }
  const first = drawSchoolAttempt(topic, [], () => 0);
  assert.equal(first.length, topic.perAttempt);
  const second = drawSchoolAttempt(topic, first.map((item) => item.id), () => 0);
  assert.ok(second.every((item) => !first.some((picked) => picked.id === item.id)), topic.slug);
}

assert.equal(gradeLessons.length, bankGrades.length * subjects.length);
