/**
 * Dependency-free UI prototype state. The production React app will reuse the
 * business contracts rather than treating browser localStorage as a database.
 */
export const MODULES = Object.freeze([
  { id: "credits", label: "Leistungspunkte", available: true },
  { id: "module-cockpit", label: "Modul-Cockpit", available: true },
  { id: "roadmap", label: "Studien-Roadmap", available: true },
  { id: "tasks", label: "Lernaufgaben", available: true },
  { id: "exams", label: "Prüfungen", available: false },
  { id: "flashcards", label: "Lernkarten", available: false },
  { id: "library", label: "Bibliothek", available: false },
  { id: "focus", label: "Fokusmodus", available: false },
]);
export const LAYOUT_STORAGE_KEY = "study-hub-preview-layout-v1";
export const THEME_STORAGE_KEY = "study-hub-theme";
const activeIds = MODULES.filter(item => item.available).map(item => item.id);
const activeSet = new Set(activeIds);

export function normalizeLayout(value) {
  const record = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const order = [];
  const seen = new Set();
  for (const id of Array.isArray(record.order) ? record.order : []) {
    if (typeof id === "string" && activeSet.has(id) && !seen.has(id)) {
      order.push(id);
      seen.add(id);
    }
  }
  for (const id of activeIds) if (!seen.has(id)) order.push(id);
  const hidden = [...new Set(Array.isArray(record.hidden) ? record.hidden : [])]
    .filter(id => typeof id === "string" && activeSet.has(id));
  return { order, hidden };
}

export function setModuleVisible(layout, id, visible) {
  const current = normalizeLayout(layout);
  if (!activeSet.has(id)) return current;
  return { ...current, hidden: visible
    ? current.hidden.filter(x => x !== id)
    : [...new Set([...current.hidden, id])] };
}

export function moveModule(layout, id, direction) {
  const current = normalizeLayout(layout);
  const i = current.order.indexOf(id);
  const to = i + direction;
  if (!Number.isInteger(direction) || Math.abs(direction) !== 1 || i < 0 || to < 0 || to >= current.order.length) return current;
  const order = [...current.order];
  [order[i], order[to]] = [order[to], order[i]];
  return { ...current, order };
}

export function parseTheme(value) {
  return value === "light" || value === "dark" || value === "system" ? value : "system";
}
export function resolveTheme(value, prefersDark) {
  const preference = parseTheme(value);
  return preference === "system" ? (prefersDark ? "dark" : "light") : preference;
}

export function progressSegments(earned, target, count = 40) {
  if (![earned,target,count].every(Number.isFinite) || target <= 0 || count <= 0 || !Number.isInteger(count)) {
    throw new RangeError("Invalid progress input");
  }
  const safeEarned = Math.max(0, Math.min(earned, target));
  const fraction = safeEarned / target;
  return {
    earned: safeEarned,
    target,
    percent: Math.round(fraction * 1000) / 10,
    filled: Math.floor(fraction * count),
    count
  };
}
