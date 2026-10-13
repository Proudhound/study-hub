/** Pure theme preference logic; the future React UI will persist the choice. */
export type ThemePreference = "system" | "light" | "dark";
export type EffectiveTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "study-hub-theme";

export function parseThemePreference(value: unknown): ThemePreference {
  return value === "light" || value === "dark" || value === "system" ? value : "system";
}
export function resolveTheme(preference: ThemePreference, systemPrefersDark: boolean): EffectiveTheme {
  return preference === "system" ? (systemPrefersDark ? "dark" : "light") : preference;
}
