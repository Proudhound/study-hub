import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (relativePath) => readFileSync(new URL(relativePath, root), "utf8");
const types = [
  ["user-story.yml", "SH-CLASS-DOMAIN-NNN"],
  ["technical-task.yml", "SH-TECH-DOMAIN-NNN"],
  ["bug_report.yml", "SH-BUG-DOMAIN-NNN"],
  ["decision.yml", "DEC-NNN"],
];
test("public Issue forms retain stable ID patterns, AC and verification gates", () => {
  for (const [filename, id] of types) {
    const data = read(".github/ISSUE_TEMPLATE/" + filename);
    assert.ok(data.includes(id), filename + " missing " + id);
    assert.match(data, /name:\s+"/, filename);
    assert.match(data, /type:\s+textarea/, filename);
    assert.match(data, /validations:/, filename);
    assert.match(data, /required:\s+true/, filename);
    assert.match(data, /Öffentliches Repository/, filename);
    if (filename !== "decision.yml") {
      assert.match(data, /[Vv]erifikationsplan|Verification Method/, filename);
    }
  }
});
test("epic and governance docs preserve manual Human Acceptance", () => {
  assert.match(read(".github/ISSUE_TEMPLATE/epic.md"), /SH-EPIC-DOMAIN-NNN/);
  const governance = read("docs/governance/DEVELOPMENT_PROCESS.md");
  assert.match(governance, /Human Review/);
  assert.match(governance, /HARD STOP|Hard Stop|Hardstop|ausdrückliche Human Acceptance/);
  assert.match(governance, /independentes?|unabhängig/i);
  assert.match(read("AGENTS.md"), /kein automatisches Merge/i);
});
