/* Run before styles to prevent a light/dark flash. No external requests. */
try {
  const raw = localStorage.getItem("study-hub-theme");
  const preference = ["light", "dark", "system"].includes(raw) ? raw : "system";
  document.documentElement.dataset.theme =
    preference === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : preference;
} catch (_) {
  document.documentElement.dataset.theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
