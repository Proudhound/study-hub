import {
  MODULES, LAYOUT_STORAGE_KEY, THEME_STORAGE_KEY,
  normalizeLayout, setModuleVisible, moveModule, parseTheme, resolveTheme, progressSegments
} from "./state.js";
import { demo } from "./demo-data.js";

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const view = {
  dashboard: ["Dashboard", "Deine persönliche Studienübersicht."],
  programs: ["Studiengänge", "Verwalte später mehrere Studienprogramme, Abschlüsse und Ziel-Credits."],
  modules: ["Module & Credits", "Eine Datenquelle mit Filtern für alle Module, Wahloptionen und fachliche Abhängigkeiten."],
  roadmap: ["Studien-Roadmap", "Visualisiere später fachliche Empfehlungen und formale Voraussetzungen getrennt."],
  tasks: ["Lernaufgaben", "Plane später Aufgaben nach Priorität, verfügbarer Zeit und Energie."],
  exams: ["Prüfungen", "Prüfungstermine und Vorbereitung sind für eine spätere Phase vorgesehen."],
  flashcards: ["Lernkarten", "Active Recall und Wiederholungspläne folgen in einer späteren Phase."],
  library: ["Bibliothek", "Private Literatur, Quellen und Notizen folgen in einer späteren Phase."],
  focus: ["Fokusmodus", "Timer und Lern-Sessions sind als Erweiterung geplant."],
  settings: ["Einstellungen", "Themes stehen bereits oben rechts zur Verfügung. Konto- und Studiengangseinstellungen folgen später."]
};
let layout = normalizeLayout(readJson(LAYOUT_STORAGE_KEY));
let theme = parseTheme(readString(THEME_STORAGE_KEY));
const media = window.matchMedia("(prefers-color-scheme: dark)");
const dialog = $("#customize-dialog");
const menuButton = $("#menu-toggle");
const sidebar = $("#sidebar");
const backdrop = $("#sidebar-backdrop");
let activeRoute = "dashboard";

function readString(key) {
  try { return localStorage.getItem(key); } catch (_) { return null; }
}
function readJson(key) {
  try { return JSON.parse(localStorage.getItem(key) || "null"); } catch (_) { return null; }
}
function write(key, value) {
  try { localStorage.setItem(key, value); } catch (_) { /* Preview still works in-memory. */ }
}
function applyTheme() {
  document.documentElement.dataset.theme = resolveTheme(theme, media.matches);
  $("#theme-select").value = theme;
}
$("#theme-select").addEventListener("change", event => {
  theme = parseTheme(event.target.value);
  write(THEME_STORAGE_KEY, theme);
  applyTheme();
});
media.addEventListener("change", () => { if (theme === "system") applyTheme(); });
applyTheme();

function closeSidebar() {
  sidebar.classList.remove("sidebar-open");
  backdrop.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
}
menuButton.addEventListener("click", () => {
  const opened = sidebar.classList.toggle("sidebar-open");
  backdrop.hidden = !opened;
  menuButton.setAttribute("aria-expanded", String(opened));
});
backdrop.addEventListener("click", closeSidebar);
window.addEventListener("keydown", event => { if (event.key === "Escape") closeSidebar(); });

function navigate(route) {
  if (!Object.hasOwn(view, route)) return;
  activeRoute = route;
  $("#breadcrumb").textContent = view[route][0];
  $$("#sidebar [data-route]").forEach(button => {
    const selected = button.dataset.route === route;
    button.classList.toggle("active", selected);
    if (selected) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  $("#dashboard-page").hidden = route !== "dashboard";
  $("#other-page").hidden = route === "dashboard";
  if (route !== "dashboard") {
    $("#other-heading").textContent = view[route][0];
    $("#other-description").textContent = view[route][1];
    $("#other-next").textContent = "Navigation und Layout sind bereits vorbereitet. Fachfunktionen, API und Datenspeicherung werden erst nach gesonderter Umsetzung aktiviert.";
  }
  closeSidebar();
  $("#main-content").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "auto" });
}
$$("#sidebar [data-route]").forEach(button => button.addEventListener("click", () => navigate(button.dataset.route)));
$("#back-to-dashboard").addEventListener("click", () => navigate("dashboard"));
document.addEventListener("click", event => {
  const link = event.target.closest("[data-go]");
  if (link) navigate(link.dataset.go);
});

function widgetFromTemplate(id) {
  const source = $("#widget-" + id);
  if (!source) return null;
  const article = document.createElement("article");
  article.className = "widget-card widget-" + id;
  article.dataset.widget = id;
  article.appendChild(source.content.cloneNode(true));
  return article;
}
function addProgress(article) {
  const progress = progressSegments(demo.earnedCredits, demo.totalCredits, 40);
  const digits = article.querySelector("#credit-primary");
  digits.textContent = "";
  digits.append(document.createTextNode(String(progress.earned) + " "));
  const sub = document.createElement("span");
  sub.textContent = "/ " + progress.target;
  digits.append(sub);
  const bar = article.querySelector("#credit-segments");
  bar.replaceChildren();
  bar.setAttribute("aria-valuemin", "0");
  bar.setAttribute("aria-valuemax", String(progress.target));
  bar.setAttribute("aria-valuenow", String(progress.earned));
  for (let i = 0; i < progress.count; i++) {
    const segment = document.createElement("span");
    segment.className = "segment" + (i < progress.filled ? " filled" : "");
    segment.setAttribute("aria-hidden", "true");
    bar.append(segment);
  }
  article.querySelector("#credit-percent").textContent = progress.percent.toLocaleString("de-DE") + " % abgeschlossen";
  const labels = article.querySelectorAll(".progress-scale > span");
  labels[0].textContent = "0 Credits";
  labels[1].textContent = progress.target + " Credits";
  const info = article.querySelectorAll(".credit-note");
  info[0].lastChild.textContent = " " + progress.earned + " erworben";
  info[1].lastChild.textContent = " " + (progress.target - progress.earned) + " offen";
}
function renderModuleRows(article, tab) {
  const table = article.querySelector("#module-table-body");
  table.replaceChildren();
  const models = tab === "elective" ? demo.modules.filter(x => x.kind === "Wahloption")
    : tab === "roadmap" ? demo.modules.filter(x => x.status !== "Abgeschlossen") : demo.modules;
  for (const row of models) {
    const tr = document.createElement("tr");
    const moduleCell = document.createElement("td");
    const name = document.createElement("strong");
    name.textContent = row.title;
    const code = document.createElement("small");
    code.textContent = row.code;
    moduleCell.append(name, code);
    const type = document.createElement("td");
    const typeTag = document.createElement("span");
    typeTag.className = "module-tag";
    typeTag.textContent = row.kind;
    type.append(typeTag);
    const status = document.createElement("td");
    const statusTag = document.createElement("span");
    statusTag.className = "status-tag " + (row.status === "Abgeschlossen" ? "done" : row.status === "In Arbeit" ? "ongoing" : "neutral");
    statusTag.textContent = row.status;
    status.append(statusTag);
    const points = document.createElement("td");
    points.textContent = String(row.credits);
    tr.append(moduleCell, type, status, points);
    table.append(tr);
  }
}
function setupTabs(article) {
  renderModuleRows(article, "all");
  article.querySelectorAll(".tab").forEach(button => {
    button.addEventListener("click", () => {
      article.querySelectorAll(".tab").forEach(b => {
        const current = b === button;
        b.classList.toggle("active", current);
        b.setAttribute("aria-selected", String(current));
      });
      renderModuleRows(article, button.dataset.tab);
    });
  });
}
function renderTasks(article) {
  const parent = article.querySelector("#tasks-list");
  parent.replaceChildren();
  for (const task of demo.tasks) {
    const label = document.createElement("label");
    label.className = "task-row";
    const check = document.createElement("input");
    check.type = "checkbox";
    check.setAttribute("aria-label", task.title + " (nur Demo)");
    check.addEventListener("change", () => label.classList.toggle("checked", check.checked));
    const info = document.createElement("span");
    info.className = "task-info";
    const title = document.createElement("strong");
    title.textContent = task.title;
    const meta = document.createElement("small");
    meta.textContent = task.time + " · " + task.kind;
    info.append(title, meta);
    label.append(check, info);
    parent.append(label);
  }
}
function renderWidgets() {
  const grid = $("#widget-grid");
  grid.replaceChildren();
  let visible = 0;
  for (const id of layout.order) {
    if (layout.hidden.includes(id)) continue;
    const article = widgetFromTemplate(id);
    if (!article) continue;
    if (id === "credits") addProgress(article);
    if (id === "module-cockpit") setupTabs(article);
    if (id === "tasks") renderTasks(article);
    grid.append(article);
    visible += 1;
  }
  $("#empty-widgets").hidden = visible > 0;
}
function changeLayout(mutator) {
  layout = mutator(layout);
  write(LAYOUT_STORAGE_KEY, JSON.stringify(layout));
  renderWidgets();
  renderCustomizer();
}
function renderCustomizer() {
  const list = $("#customize-list");
  list.replaceChildren();
  const unavailable = MODULES.filter(x => !x.available);
  const entries = [
    ...layout.order.map(id => MODULES.find(x => x.id === id)).filter(Boolean),
    ...unavailable
  ];
  entries.forEach((entry, index) => {
    const row = document.createElement("div");
    row.className = "customize-row" + (entry.available ? "" : " future-row");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = entry.available && !layout.hidden.includes(entry.id);
    input.disabled = !entry.available;
    input.addEventListener("change", () => changeLayout(old => setModuleVisible(old, entry.id, input.checked)));
    const text = document.createElement("span");
    text.textContent = entry.label;
    label.append(input, text);
    row.append(label);
    if (entry.available) {
      const controls = document.createElement("div");
      controls.className = "reorder-controls";
      for (const [direction, glyph, desc] of [[-1, "↑", "nach oben"], [1, "↓", "nach unten"]]) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "icon-button";
        button.textContent = glyph;
        button.disabled = index + direction < 0 || index + direction >= layout.order.length;
        button.setAttribute("aria-label", entry.label + " " + desc);
        button.addEventListener("click", () => changeLayout(old => moveModule(old, entry.id, direction)));
        controls.append(button);
      }
      row.append(controls);
    } else {
      const badge = document.createElement("span");
      badge.className = "coming-soon";
      badge.textContent = "Später";
      row.append(badge);
    }
    list.append(row);
  });
}
function openCustomizer() {
  renderCustomizer();
  if (!dialog.open) dialog.showModal();
}
for (const btn of ["#customize-top", "#customize-secondary", "#empty-customize"]) {
  $(btn).addEventListener("click", openCustomizer);
}
$("#close-customize").addEventListener("click", () => dialog.close());
$("#done-customize").addEventListener("click", () => dialog.close());
$("#reset-customize").addEventListener("click", () => changeLayout(() => normalizeLayout(null)));
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
renderWidgets();
