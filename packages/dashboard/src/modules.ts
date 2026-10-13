/** Registry of built-in, trusted dashboard modules; no remote executable plugins. */
export type ModuleId =
  | "credits" | "module-cockpit" | "roadmap" | "tasks"
  | "exams" | "flashcards" | "library" | "focus";
export interface DashboardModule {
  id: ModuleId;
  title: string;
  defaultEnabled: boolean;
  availability: "mvp" | "later";
}
export const DASHBOARD_MODULES: readonly DashboardModule[] = [
  { id: "credits", title: "Credit progress", defaultEnabled: true, availability: "mvp" },
  { id: "module-cockpit", title: "Module cockpit", defaultEnabled: true, availability: "mvp" },
  { id: "roadmap", title: "Study roadmap", defaultEnabled: true, availability: "mvp" },
  { id: "tasks", title: "Learning tasks", defaultEnabled: true, availability: "mvp" },
  { id: "exams", title: "Exams", defaultEnabled: false, availability: "later" },
  { id: "flashcards", title: "Flashcards", defaultEnabled: false, availability: "later" },
  { id: "library", title: "Library", defaultEnabled: false, availability: "later" },
  { id: "focus", title: "Focus sessions", defaultEnabled: false, availability: "later" },
];

export function selectDashboardModules(
  enabled: readonly string[],
  registry: readonly DashboardModule[] = DASHBOARD_MODULES,
): DashboardModule[] {
  const known = new Map(registry.map((entry) => [entry.id, entry]));
  const unique = new Set<string>();
  const result: DashboardModule[] = [];
  for (const id of enabled) {
    if (unique.has(id)) continue;
    unique.add(id);
    const module = known.get(id as ModuleId);
    if (module && module.availability === "mvp") result.push(module);
  }
  return result;
}
