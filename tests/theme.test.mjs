import test from "node:test";
import assert from "node:assert/strict";
import { parseThemePreference, resolveTheme, THEME_STORAGE_KEY } from "../packages/ui/src/theme.ts";

test("light, dark and system preferences are supported", () => {
  assert.equal(resolveTheme("light", true), "light");
  assert.equal(resolveTheme("dark", false), "dark");
  assert.equal(resolveTheme("system", true), "dark");
  assert.equal(resolveTheme("system", false), "light");
  assert.equal(parseThemePreference("garbage"), "system");
  assert.ok(THEME_STORAGE_KEY.startsWith("study-hub-"));
});
