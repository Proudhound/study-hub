import test from "node:test";
import assert from "node:assert/strict";
import { DASHBOARD_MODULES, selectDashboardModules } from "../packages/dashboard/src/modules.ts";

test("IDs are unique and default modules are MVP modules", () => {
  assert.equal(new Set(DASHBOARD_MODULES.map((m) => m.id)).size, DASHBOARD_MODULES.length);
  assert.ok(DASHBOARD_MODULES.every((m) => !m.defaultEnabled || m.availability === "mvp"));
});

test("users control layout order, duplicates are removed, unknown/later modules are not enabled", () => {
  assert.deepEqual(
    selectDashboardModules(["tasks", "roadmap", "tasks", "flashcards", "not-a-widget", "credits"])
      .map((m) => m.id),
    ["tasks", "roadmap", "credits"],
  );
});
