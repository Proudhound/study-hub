import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  MODULES, normalizeLayout, setModuleVisible, moveModule,
  parseTheme, resolveTheme, progressSegments, LAYOUT_STORAGE_KEY
} from "../prototypes/dashboard/state.js";
import { demo } from "../prototypes/dashboard/demo-data.js";
import { parseLocalCatalog } from "../prototypes/dashboard/catalog.js";

test("prototype and TypeScript product contract share exact widget IDs", () => {
  const source = readFileSync(new URL("../packages/dashboard/src/modules.ts", import.meta.url), "utf8");
  const ids = [...source.matchAll(/\{ id: "([^"]+)", title:/g)].map(match => match[1]);
  assert.deepEqual(MODULES.map(module => module.id), ids);
  assert.deepEqual(MODULES.filter(m => m.available).map(m => m.id), ids.slice(0, 4));
});
test("layout defaults, ignores invalid IDs, preserves exactly one of each core module", () => {
  const ids = MODULES.filter(m => m.available).map(m => m.id);
  assert.deepEqual(normalizeLayout(null), { order: ids, hidden: [] });
  assert.deepEqual(normalizeLayout({order:["roadmap","bad-id","roadmap","credits"],hidden:["exams","tasks","tasks"]}), {
    order:["roadmap","credits","module-cockpit","tasks"],hidden:["tasks"]
  });
  assert.deepEqual(normalizeLayout({order:"non-array",hidden:null}), {order:ids,hidden:[]});
});
test("widgets toggle and reorder without mutating the previous layout", () => {
  const initial=normalizeLayout(null);
  const disabled=setModuleVisible(initial,"tasks",false);
  assert.deepEqual(disabled.hidden,["tasks"]);
  assert.deepEqual(initial.hidden,[]);
  assert.deepEqual(setModuleVisible(disabled,"tasks",true).hidden,[]);
  const newOrder=moveModule(initial,"roadmap",-1);
  assert.deepEqual(newOrder.order,["credits","roadmap","module-cockpit","tasks"]);
  assert.deepEqual(initial.order,["credits","module-cockpit","roadmap","tasks"]);
  assert.deepEqual(moveModule(initial,"credits",-1).order,initial.order);
  assert.deepEqual(setModuleVisible(initial,"exams",true),initial);
});
test("theme fallback and resolution cover all three preferences", () => {
  assert.equal(parseTheme("nonsense"),"system");
  assert.equal(resolveTheme("system",true),"dark");
  assert.equal(resolveTheme("system",false),"light");
  assert.equal(resolveTheme("dark",false),"dark");
  assert.equal(resolveTheme("light",true),"light");
  assert.ok(LAYOUT_STORAGE_KEY.startsWith("study-hub-preview-"));
});
test("credits display always begins at zero, caps at target and has no real study records", () => {
  const fresh=progressSegments(0,120,40);
  assert.equal(fresh.filled,0);
  assert.equal(fresh.percent,0);
  const example=progressSegments(demo.earnedCredits,demo.totalCredits,40);
  assert.deepEqual(example,{earned:30,target:120,percent:25,filled:10,count:40});
  assert.equal(progressSegments(150,120,40).filled,40);
  assert.throws(()=>progressSegments(30,0),RangeError);
  assert.ok(demo.modules.every(x=>x.code.startsWith("DEMO-")));
  assert.equal(demo.program,"Beispielstudiengang");
});
test("preview is a static, self-hostable module app with required navigation and controls",()=>{
  const html=readFileSync(new URL("../prototypes/dashboard/index.html",import.meta.url),"utf8");
  const js=readFileSync(new URL("../prototypes/dashboard/app.js",import.meta.url),"utf8");
  const css=readFileSync(new URL("../prototypes/dashboard/styles.css",import.meta.url),"utf8");
  for(const id of ["dashboard","modules","roadmap","tasks","settings"])assert.ok(html.includes('data-route="'+id+'"'));
  for(const id of ["credits","module-cockpit","roadmap","tasks"])assert.ok(html.includes('id="widget-'+id+'"'));
  assert.match(html, /role="progressbar"/);
  assert.match(html, /<dialog id="customize-dialog"/);
  assert.match(js, /showModal\(\)/);
  assert.match(css, /@import url\("\.\.\/\.\.\/packages\/ui\/src\/tokens\.css"\)/);
  assert.doesNotMatch(html,/https?:\/\//i);
});

test("private catalog parser accepts a synthetic whole-program plan and unknown progress", () => {
  const valid = {
    schemaVersion:1, program:"Example degree",degree:"Bachelor",totalCredits:15,
    earnedCredits:null,
    modules:[
      {code:"DEMO-101",title:"Module A",credits:5,semester:1,kind:"Required",status:"Planned"},
      {code:"DEMO-ELECT",title:"Elective slot",credits:10,semester:2,kind:"Elective",status:"Unselected"}
    ],
    roadmap:[{title:"Phase 1",subtitle:"5 credits"}],
    tasks:[{title:"Review plan",time:"Suggestion",kind:"Demo"}]
  };
  assert.equal(parseLocalCatalog(valid).earnedCredits,null);
  assert.equal(parseLocalCatalog(valid).modules.length,2);
  assert.equal(parseLocalCatalog({...valid,earnedCredits:5}).earnedCredits,5);
  assert.throws(()=>parseLocalCatalog({...valid,totalCredits:180}),/credits do not match/);
  assert.throws(()=>parseLocalCatalog({...valid,earnedCredits:99}),/exceeds target/);
  assert.throws(()=>parseLocalCatalog({...valid,modules:[valid.modules[0],valid.modules[0]]}),/Duplicate/);
  assert.throws(()=>parseLocalCatalog({...valid,modules:[{...valid.modules[0],code:"<script>"},valid.modules[1]]}),/Invalid module code/);
  assert.throws(()=>parseLocalCatalog({...valid,schemaVersion:2}),/Unsupported/);
});
test("local data path is gitignored and requires explicit local URL opt-in", () => {
  const ignored = readFileSync(new URL("../.gitignore", import.meta.url),"utf8");
  const script = readFileSync(new URL("../prototypes/dashboard/app.js", import.meta.url),"utf8");
  const html = readFileSync(new URL("../prototypes/dashboard/index.html",import.meta.url),"utf8");
  assert.match(ignored,/^prototypes\/dashboard\/local-study-data\.json$/m);
  assert.match(script,/get\("catalog"\) === "local"/);
  assert.match(script,/credentials:"omit"/);
  assert.match(html,/connect-src &#39;self&#39;/);
});
