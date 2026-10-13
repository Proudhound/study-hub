import test from "node:test";
import assert from "node:assert/strict";
import { calculateProgress } from "../packages/domain/src/progress.ts";

const sample = (extra = {}) => ({
  id: "SYN-101", credits: 5, status: "not_started", kind: "required", ...extra,
});

test("a fresh program starts at zero, not at a previous percentage", () => {
  assert.deepEqual(calculateProgress([], 180, 36), {
    earnedCredits: 0, remainingCredits: 180, requiredCredits: 180,
    percent: 0, filledSegments: 0, segmentCount: 36,
  });
});

test("recognition contributes credits once", () => {
  const p = calculateProgress([sample({ recognizedCredits: 5 })], 180);
  assert.equal(p.earnedCredits, 5);
  assert.equal(p.percent, 2.8);
  assert.equal(p.filledSegments, 1);
});

test("completion plus recognition never counts the same module twice", () => {
  const p = calculateProgress([sample({ status: "completed", recognizedCredits: 5 })], 180);
  assert.equal(p.earnedCredits, 5);
});

test("an unselected elective does not add credit even when completed", () => {
  const p = calculateProgress([
    sample({ id: "SYN-201", kind: "elective", status: "completed" }),
    sample({ id: "SYN-202", kind: "elective", selected: true, status: "completed" }),
  ], 30);
  assert.equal(p.earnedCredits, 5);
  assert.equal(p.remainingCredits, 25);
});

test("progress bar is capped at 100%, and the visual tracks 0 to target", () => {
  const modules = Array.from({ length: 4 }, (_, i) => sample({ id: "SYN-" + i, status: "completed" }));
  const p = calculateProgress(modules, 10, 20);
  assert.equal(p.earnedCredits, 10);
  assert.equal(p.percent, 100);
  assert.equal(p.filledSegments, 20);
});

test("bad credits, duplicates and invalid program targets are rejected", () => {
  assert.throws(() => calculateProgress([], 0), RangeError);
  assert.throws(() => calculateProgress([sample(), sample()], 180), /unique/);
  assert.throws(() => calculateProgress([sample({ recognizedCredits: 6 })], 180), RangeError);
  assert.throws(() => calculateProgress([], 180, 0), RangeError);
});
