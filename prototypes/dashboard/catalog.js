/** Browser-only, untrusted catalog preview parser. Never commits personal records. */
const MAX_MODULES = 400;

function text(value, max = 180) {
  if (typeof value !== "string") throw new TypeError("Expected text");
  const safe = value.trim();
  if (!safe || safe.length > max) throw new RangeError("Invalid text length");
  return safe;
}
function credits(value) {
  if (!Number.isFinite(value) || value < 0 || value > 180) throw new RangeError("Invalid credit amount");
  return value;
}
export function parseLocalCatalog(source) {
  if (!source || typeof source !== "object" || Array.isArray(source) || source.schemaVersion !== 1) {
    throw new TypeError("Unsupported catalog schema");
  }
  const program = text(source.program);
  const degree = text(source.degree);
  const totalCredits = credits(source.totalCredits);
  if (totalCredits <= 0 || !Array.isArray(source.modules) || source.modules.length < 1 || source.modules.length > MAX_MODULES) {
    throw new RangeError("Missing or excessive modules");
  }
  const ids = new Set();
  const modules = source.modules.map(row => {
    if (!row || typeof row !== "object" || Array.isArray(row)) throw new TypeError("Invalid module");
    const code = text(row.code, 30);
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,29}$/.test(code)) throw new TypeError("Invalid module code");
    if (ids.has(code)) throw new RangeError("Duplicate module code");
    ids.add(code);
    const semester = row.semester === undefined ? null : row.semester;
    if (semester !== null && (!Number.isInteger(semester) || semester < 1 || semester > 20)) {
      throw new RangeError("Invalid semester");
    }
    return {
      code,
      title: text(row.title),
      credits: credits(row.credits),
      semester,
      status: text(row.status, 55),
      kind: text(row.kind, 55)
    };
  });
  const sum = Math.round(modules.reduce((acc, module) => acc + module.credits, 0) * 100) / 100;
  if (Math.abs(sum - totalCredits) > 0.01) throw new RangeError("Module credits do not match plan target");
  const earnedCredits = source.earnedCredits === null || source.earnedCredits === undefined ? null : credits(source.earnedCredits);
  if (earnedCredits !== null && earnedCredits > totalCredits) throw new RangeError("Progress exceeds target");
  function entries(raw, fields, count) {
    if (!Array.isArray(raw) || raw.length > count) throw new TypeError("Invalid preview entries");
    return raw.map(item => {
      if (!item || typeof item !== "object") throw new TypeError("Invalid entry");
      return Object.fromEntries(fields.map(([key,max]) => [key,text(item[key],max)]));
    });
  }
  return {
    program, degree, totalCredits, earnedCredits, modules,
    roadmap: entries(source.roadmap, [["title",180],["subtitle",180]], 20),
    tasks: entries(source.tasks, [["title",180],["time",50],["kind",80]], 40)
  };
}
