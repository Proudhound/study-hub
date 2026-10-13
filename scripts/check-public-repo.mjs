/**
 * Early warning guard for a public repository. Not a replacement for
 * professional secret scanning or careful review before a commit.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";

const tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
  .split("\0").filter(Boolean);
const deniedPath = /(^|\/)(?:data|private|backups|uploads|dumps|personal|notion-export[^/]*)\/|(?:^|\/)\.env(?:$|\.(?!example$))|(?:\.pdf|\.docx?|\.xlsx|\.csv|\.zip|\.sqlite3?|\.p12|\.pfx|\.pem|\.key)$/i;
const tokenLike = [
  /AKIA[0-9A-Z]{16}/,
  /gh[pousr]_[A-Za-z0-9_]{30,}/,
  /github_pat_[A-Za-z0-9_]{22,}/,
  /-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----/,
];
const failures = [];
for (const path of tracked) {
  if (deniedPath.test(path)) { failures.push("Blocked tracked path: " + path); continue; }
  if (statSync(path).size > 2_000_000) { failures.push("Oversized file: " + path); continue; }
  const content = readFileSync(path, "utf8");
  if (tokenLike.some((pattern) => pattern.test(content)) && path !== "scripts/check-public-repo.mjs") {
    failures.push("Potential secret in: " + path);
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Public-repository guard passed (" + tracked.length + " tracked files).");
}
