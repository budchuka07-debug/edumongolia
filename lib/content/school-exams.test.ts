import assert from "node:assert/strict";
import { buildCustomTopic, drawSchoolAttempt, schoolTopics } from "./school-exams.ts";

const seen = new Set<string>();
for (const topic of schoolTopics) {
  assert.ok(topic.questions.length > topic.perAttempt, topic.slug);
  assert.ok(topic.lesson.length > 0, topic.slug);
  for (const question of topic.questions) {
    assert.ok(!seen.has(question.id), question.id);
    seen.add(question.id);
    assert.equal(question.answer, 0, question.id);
    assert.equal(question.choices[0].why, undefined, question.id);
    assert.ok(question.choices.slice(1).every((choice) => choice.why?.mn && choice.why.en), question.id);
    const labels = new Set(question.choices.map((choice) => choice.mn));
    assert.equal(labels.size, question.choices.length, question.id);
  }
  const first = drawSchoolAttempt(topic, [], () => 0);
  assert.equal(first.length, topic.perAttempt);
  assert.equal(new Set(first.map((item) => item.id)).size, first.length);
  const second = drawSchoolAttempt(topic, first.map((item) => item.id), () => 0);
  assert.ok(second.every((item) => !first.some((picked) => picked.id === item.id)), topic.slug);
  for (const item of first) {
    const source = topic.questions.find((question) => question.id === item.id);
    assert.ok(source);
    assert.equal(item.choices[item.answer].mn, source.choices[source.answer].mn);
    assert.equal(item.choices[item.answer].why, undefined);
  }
}

const custom = buildCustomTopic({
  band: "cambridge",
  subject: "Физик",
  grades: "IGCSE",
  title: "Хүч",
  lesson: "F = ma.\nНэгж нь ньютон.",
  questions: [
    {
      prompt: "2 кг масс, 3 м/с² хурдатгал. Хүч хэд вэ?",
      rule: "F = ma = 6 Н.",
      answer: 1,
      choices: [
        { text: "5 Н", why: "Нэмсэн." },
        { text: "6 Н", why: "" },
        { text: "", why: "" },
        { text: "1.5 Н", why: "Хуваасан." },
      ],
    },
    {
      prompt: "Хүчний нэгж аль вэ?",
      rule: "Ньютон.",
      answer: 0,
      choices: [
        { text: "Н", why: "" },
        { text: "м", why: "Замын нэгж." },
        { text: "", why: "" },
        { text: "", why: "" },
      ],
    },
  ],
});
assert.equal(custom.ok, true);
if (custom.ok) {
  assert.equal(custom.topic.questions[0].answer, 1);
  assert.equal(custom.topic.questions[0].choices.length, 3);
  assert.equal(custom.topic.perAttempt, 2);
  assert.equal(custom.topic.lesson.length, 2);
}

const missingWhy = buildCustomTopic({
  band: "high",
  subject: "Хими",
  grades: "11",
  title: "pH",
  lesson: "7 саармаг.",
  questions: [
    { prompt: "pH 3 юу вэ?", rule: "Хүчил.", answer: 0, choices: [{ text: "хүчил", why: "" }, { text: "шүлт", why: "" }] },
    { prompt: "pH 7 юу вэ?", rule: "Саармаг.", answer: 0, choices: [{ text: "саармаг", why: "" }, { text: "хүчил", why: "7-оос доош." }] },
  ],
});
assert.equal(missingWhy.ok, false);

console.log("school exam checks passed");
