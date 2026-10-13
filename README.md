# Study Hub

**Eine selbst hostbare Web-App für Studienorganisation und aktives Lernen.**

> **Projektstatus: Architektur und erste testbare Kernbausteine.** Eine lauffähige React-Web-App, API, PostgreSQL-Installation und ein Backup-Job existieren noch nicht. Die GitHub-Actions-Testpipeline prüft bereits generische TypeScript-Referenzlogik.

Study Hub soll Studiengänge, Module, Leistungspunkte, Wahlbereiche, Lernaufgaben, Prüfungen und Lernfortschritt in einer eigenen Weboberfläche zusammenführen. Die Anwendung ist unabhängig von bestimmten Hochschulen, Studiengängen, Cloud-Anbietern und persönlichen Daten.

## Zielbild

- **Modulares Studien-Dashboard:** Ein-/ausblendbare Widgets mit frei wählbarer Reihenfolge; Fortschritt als erreichte / erforderliche Credits, Prozentwerte und 0-basiertem Balken.
- **Light/Dark/System:** Helle, dunkle und automatische Darstellung, mit gespeicherter Nutzerpräferenz.
- **Studienstruktur:** Studiengänge, Module, Wahlpflichtgruppen und fachliche bzw. verbindliche Voraussetzungen.
- **Studien-Roadmap:** Abhängigkeiten, geplante Reihenfolge, noch offene oder abgeschlossene Module.
- **Aktives Lernen:** Lernaufgaben und Sitzungen; Lernkarten, Wiederholungsintervalle und Quiz in späteren Ausbaustufen.
- **Self-Hosting:** Betrieb auf eigener Hardware oder einem geeigneten VPS; geplante verschlüsselte Backups an **zwei getrennte Sicherungsziele**.
- **Privatsphäre:** Personalisierte Studieninformationen ausschließlich in der privaten Installation, **nicht im öffentlichen Git-Repository**.

Die Zielgruppe ist nicht auf eine bestimmte Hochschule oder einen konkreten Studiengang beschränkt. Leistungspunkte, Abschlüsse, Prüfungsformen und Regeln werden konfigurierbar modelliert.

## Geplanter Technologie-Stack

| Schicht | Geplante Technologie | Aufgabe |
| --- | --- | --- |
| Frontend | React, TypeScript, Vite | Responsive Web-App / optional PWA |
| Backend | Node.js, TypeScript, Fastify, Zod | Versionierte REST-API und Validierung |
| Datenhaltung | PostgreSQL, Drizzle ORM | Persistenz, Relationen und Migrationen |
| Deployment | Docker Compose, Reverse Proxy mit HTTPS | Self-Hosting auf eigenem Server oder VM |
| Qualität | Vitest, Integrationstests, Playwright | Domänenlogik und Bedienabläufe |
| KI (optional) | Austauschbare Provider-Adapter | Lernhilfen mit ausdrücklicher Datenfreigabe |

**Architekturvorschlag, keine bereits implementierten Komponenten.** Bibliotheken und Versionen werden vor der Umsetzung auf Kompatibilität und Wartbarkeit geprüft.

## Geplante Repository-Struktur

Die folgende Struktur ist ein **Zielentwurf**, kein Verzeichnislisting des derzeitigen Repositories. Kleine testbare Bausteine in `packages/` und die CI-Konfiguration existieren bereits:

```text
study-hub/
├── apps/
│   ├── web/                  # React-Frontend
│   └── api/                  # HTTP-API
├── packages/
│   ├── domain/               # ECTS-/Modul-/Regel-Logik
│   ├── shared/               # Typen und Validierung
│   └── ui/                   # Wiederverwendbare UI-Komponenten (optional)
├── db/
│   └── migrations/           # Versionierte DB-Schemata
├── infra/
│   ├── docker/               # Compose-Vorlagen
│   └── proxy/                # Reverse-Proxy-Beispiele
├── tests/
│   ├── integration/
│   └── e2e/
├── planning/                 # Öffentliche Produkt-/Architekturplanung
└── README.md
```

Persönliche Daten, Uploads, Datenbankdateien, Backups und echte Konfigurationswerte gehören **nicht** in dieses Repository.

## Architektur- und Produktdokumentation

- [Funktionsumfang und MVP](planning/PRODUCT_SCOPE.md)
- [Technische Architektur](planning/ARCHITECTURE.md)
- [Generisches Datenmodell und ECTS-Regeln](planning/DATA_MODEL.md)
- [Entwicklungs-Roadmap](planning/ROADMAP.md)
- [Optionale KI-/Lernkomponenten](planning/LEARNING_STACK_CANDIDATES.md)
- [Sicherheits- und Veröffentlichungsregeln](planning/SECURITY.md)
- [Backup- und Restore-Konzept (lokal + extern)](planning/BACKUP_AND_RESTORE.md)
- [Modularer Dashboard-Aufbau und Themes](planning/DASHBOARD_MODULES.md)
- [Funktionskatalog für die Studien-Web-App](planning/FEATURE_PARITY.md)
- [Tests und GitHub Actions](docs/TESTING.md)
- [Mitmachen](CONTRIBUTING.md) · [Verhaltensregeln](CODE_OF_CONDUCT.md) · [Lizenz (MIT)](LICENSE)

## Datenschutz und öffentliche Entwicklung

Dieses Repository ist **öffentlich**. Es darf ausschließlich generische Produktdefinitionen, Quellcode, Konfigurationsvorlagen und ausdrücklich synthetische Testdaten enthalten. Bitte **keine** echten Namen, Konten, Noten, Prüfungsbelege, Modulunterlagen Dritter, privaten Infrastrukturdetails, Notion-Exporte, Zugangsschlüssel oder produktiven Datenbankdumps committen.

Echte Daten werden nach Fertigstellung der Anwendung ausschließlich in deren privater Installation erfasst bzw. über einen nutzerinitiierten Import verarbeitet. Eine externe KI-Anbindung ist optional und standardmäßig deaktiviert.

**Open Source:** Der Code und die Dokumentation stehen unter der [MIT-Lizenz](LICENSE). Beiträge sind über Issues und Pull Requests willkommen. Keine realen Nutzer- oder Studieninformationen hochladen.

## Issues und Entwicklungsgates

Study Hub verwendet ein strukturiertes, öffentliches GitHub-Issue-System für **Epic, User Story, Technical Task, Bug und Decision (DEC)**. Die ID-/Domain-/Priority-Regeln, Definition of Ready und der Ablauf `Developer → Dev Verification → Independent QA → Independent Reviewer → Human Acceptance → Done` sind unter [Work Items](docs/governance/WORK_ITEMS.md) und [Development Process](docs/governance/DEVELOPMENT_PROCESS.md) dokumentiert. **Human Acceptance ist ein Hard Stop**; grüne CI-Jobs dürfen kein automatisches Merge auslösen. Agentenhinweise: [AGENTS.md](AGENTS.md).

Das Repository verwendet **eine eigene, generische Prozessbeschreibung**. Es benötigt keinen Zugriff auf andere private Projekte oder deren Agentenruntimes.

## Dashboard-UX-Vorschau

Die erste interaktive, **vollständig synthetische** [Dashboard-Vorschau](prototypes/dashboard/README.md) kann lokal ohne zusätzliche Pakete ausprobiert werden:

```bash
python3 -m http.server 4173
```

Dann [http://localhost:4173/prototypes/dashboard/](http://localhost:4173/prototypes/dashboard/) öffnen. Enthalten sind die responsive Bereichsnavigation, Light/Dark/System, ein anpassbares Kachelraster, 0-basierte Credits-Anzeige, Demo-Modultabs und Aufgaben. **Die Vorschau ist bewusst kein produktives React-Frontend und speichert keine Studienakten.** Umsetzung in React + API/DB folgt separat nach Designabnahme.

## Tests bereits verfügbar

Mit Node.js 22.16+ und Git:

```bash
npm ci
npm run check
```

Das führt Syntax- und Sicherheitshinweisprüfungen sowie automatisierte Tests der Credit-Berechnung, Theme-Auswahl und Dashboard-Modulkonfiguration aus. **Es startet noch keine Web-App.** Einzelheiten unter [Tests](docs/TESTING.md).

## Aktueller nächster Schritt

MVP und Datenmodell abstimmen, ein lauffähiges Grundgerüst erstellen, Authentifizierung und Migrationen implementieren, anschließend eine erste durch Tests abgesicherte Studiengang-/Modulansicht entwickeln. Siehe [Roadmap](planning/ROADMAP.md).
