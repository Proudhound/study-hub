# Dashboard Preview – UI-Prototyp

Dies ist **ausschließlich eine statische, interaktive UX-Vorschau**. Sie verwendet synthetische Daten und benötigt weder npm-Pakete noch Cloud-Dienste. Der geplante produktive Tech-Stack bleibt **React + TypeScript + Vite, Fastify und PostgreSQL**. Der Prototyp wird vor der React-Umsetzung mit dem Product Owner abgestimmt.

## Lokal starten

Im Root des ausgecheckten Repositories:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Anschließend `http://127.0.0.1:4173/prototypes/dashboard/` öffnen. Unter Windows kann die Alternative `py -m http.server 4173 --bind 127.0.0.1` verwendet werden. Die Bindung an `127.0.0.1` verhindert, dass die Vorschau versehentlich im lokalen Netzwerk erreichbar ist. Alternativ einen beliebigen lokalen HTTP-Server verwenden, der das **Repository-Root** ausliefert. Direkter `file://`-Zugriff kann ES-Module blockieren.

## Bereits interaktiv

- Sidebar mit Dashboard und nachvollziehbaren, als noch nicht implementiert bezeichneten Bereichen
- Responsive Mobile-Menü mit Escape-/Overlay-Schließen
- Auswahl Hell / Dunkel / System einschließlich Systemwechsel und `localStorage`-Präferenz
- Dashboard-Kacheln ein-/ausblenden, hoch-/runterstellen und Standardlayout wiederherstellen
- Konfigurationsspeicherung **nur lokal im Browser**, defensiver Umgang mit defekten/unbekannten Layoutwerten
- Credits-Karte: frei definierbarer 0→Ziel-Bereich aus synthetischer Demo, Prozent sekundär
- Modul-Cockpit: Tabs Alle / Wahloptionen / Roadmap mit ausschließlich künstlichen Modulen
- Aufgaben: Checkboxen verändern nur die aktuelle Vorschau (keine dauerhafte Aufgabenverwaltung)

## Bewusste Grenzen

Es gibt **keine** Anmeldung, API, persönliche Daten, Datenbank, Notion-Anbindung oder Speicherung von Studiendaten. Module jenseits der vier Kernkacheln sind als nicht verfügbar gekennzeichnet. Die Seiten außerhalb der Startseite sind Navigations-Platzhalter. `localStorage` ist nur eine Vorschauhilfe, **nicht** die spätere sichere Nutzerdatenhaltung.

Die Theme-Werte sind über `packages/ui/src/tokens.css` eingebunden. Die Produkt-Kontrakte für Module bleiben unter `packages/dashboard/src/modules.ts`; für die Vorschau sind die UI-spezifischen ID-/Label-Definitionen in `state.js` gespiegelt und werden durch CI auf ID-Parität geprüft.

## Prüfung

```bash
npm run check
```

Manuell bitte Desktop, schmale mobile Breiten, Theme-Varianten, Tastatursteuerung, deaktivierte Widgets und Dialogzustände ausprobieren. UI-Abnahme erfolgt **vor** einem produktiven React-Work-Item.

## Lokalen Modulkatalog anzeigen (privat)

Die öffentliche Vorschau bleibt absichtlich eine **synthetische Demo**. Für einen realen, privat bereitgestellten Katalog kann eine JSON-Datei neben `index.html` gespeichert werden:

1. `prototypes/dashboard/local-study-data.json` anlegen/kopieren (die Datei ist in `.gitignore` ausdrücklich ausgeschlossen).
2. Server ausschließlich auf Loopback starten: `py -m http.server 4173 --bind 127.0.0.1` aus dem Repository-Root.
3. `http://127.0.0.1:4173/prototypes/dashboard/?catalog=local` öffnen.

Die JSON-Datei hat `schemaVersion:1`, `program`, `degree`, `totalCredits`, `earnedCredits` (bei unbekanntem persönlichen Leistungsstand **null**), `modules`, `roadmap` und `tasks`. Module enthalten `code`, `title`, `credits`, `semester`, `kind` und `status`. Die **Summe aller aufgeführten Modul-Credits muss dem Studienziel entsprechen**, Wahlbereiche werden nur durch noch offene Plätze repräsentiert, bis der Nutzer sie ausgewählt hat. Ungültige Dateien werden abgelehnt und die Vorschau zeigt wieder die synthetische Demo.

**Datenschutz:** Dieser Mechanismus ist eine lokale Designhilfe, **keine produktive Import-/Authentifizierungslösung**. Der eingebaute Python-HTTP-Server liefert alle Dateien unter seinem Root an lokale Browser-Anfragen aus: Server nur an `127.0.0.1` binden, keine Weiterleitung/Internetfreigabe verwenden. Auf einem gemeinsam genutzten Rechner den Browser und die lokale JSON-Datei schützen. Persönliche Unterlagen und Katalog-PDFs gehören niemals in Commits oder GitHub-Issues. Die Eingabedatei wird nicht hochgeladen; `fetch` greift ausschließlich auf die eigene Loopback-Adresse zu. Work Item: [Privater Katalogimport](https://github.com/Proudhound/study-hub/issues/11).

Die Darstellung von ECTS ist im Katalogmodus **keine Anerkennungs- oder Prüfungsfeststellung**. Bei `earnedCredits:null` zeigt das Dashboard bewusst einen unbekannten Leistungsstand statt fiktiver 0 erworbener Credits.
