import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const base = new URL("../prototypes/dashboard/", import.meta.url);
const read = path => readFileSync(new URL(path, base), "utf8");
test("Study Hub branding loads checked-in SVG icon in sidebar and favicon", () => {
  const html = read("index.html");
  const css = read("styles.css");
  assert.match(html, /<img class="brand-logo" src="\.\/assets\/studyhub_icon\.svg" alt=""[^>]*>/);
  assert.match(html, /<link rel="icon" type="image\/svg\+xml" href="\.\/assets\/studyhub_icon\.svg">/);
  assert.match(html, /<strong>STUDY HUB<\/strong>/);
  assert.doesNotMatch(html, /class="brand-mark"/);
  assert.match(css, /\.brand-logo \{/);
  assert.doesNotMatch(css, /\.brand-mark/);
});
test("all three SVGs are local, image-only assets without executable or remote links", () => {
  for (const name of ["studyhub_icon.svg", "studyhub_logo.svg", "studyhub_logo_transparent.svg"]) {
    const svg = read("assets/" + name);
    assert.match(svg, /^<svg\b/);
    assert.match(svg, /<\/svg>\s*$/);
    assert.doesNotMatch(svg, /<\s*(?:script|foreignObject|image|use|animate|set)\b/i);
    assert.doesNotMatch(svg, /\s(?:href|xlink:href|src|onload|onerror|onclick)\s*=/i);
    assert.doesNotMatch(svg, /<!DOCTYPE|<!ENTITY|javascript:/i);
    assert.ok(Buffer.byteLength(svg) < 64 * 1024);
  }
});
