# Dashboard Preview – UI-Prototyp

Dies ist **ausschließlich eine statische, interaktive UX-Vorschau**. Sie verwendet synthetische Daten und benötigt weder npm-Pakete noch Cloud-Dienste. Der geplante produktive Tech-Stack bleibt **React + TypeScript + Vite, Fastify und PostgreSQL**. Der Prototyp wird vor der React-Umsetzung mit dem Product Owner abgestimmt.

## Lokal starten

Im Root des ausgecheckten Repositories:

```bash
python3 -m http.server 4173
```

Anschließend `http://localhost:4173/prototypes/dashboard/` öffnen. Alternativ einen beliebigen lokalen HTTP-Server verwenden, der das **Repository-Root** ausliefert. Direkter `file://`-Zugriff kann ES-Module blockieren.

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
