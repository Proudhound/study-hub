# Study Hub

**Eine selbst hostbare Web-App für Studienorganisation und aktives Lernen.**

> **Projektstatus: Planung / Architektur.** Dieses Repository enthält derzeit die Konzeption; es gibt noch keine lauffähige Anwendung, produktive API oder getestete Installationsanleitung.

Study Hub soll Studiengänge, Module, Leistungspunkte, Wahlbereiche, Lernaufgaben, Prüfungen und Lernfortschritt in einer eigenen Weboberfläche zusammenführen. Die Anwendung ist unabhängig von bestimmten Hochschulen, Studiengängen, Cloud-Anbietern und persönlichen Daten.

## Zielbild

- **Studien-Dashboard:** Fortschritt als erreichte / erforderliche Leistungspunkte, Prozentwerte und frei gestaltbare Visualisierungen.
- **Studienstruktur:** Studiengänge, Module, Wahlpflichtgruppen und fachliche bzw. verbindliche Voraussetzungen.
- **Studien-Roadmap:** Abhängigkeiten, geplante Reihenfolge, noch offene oder abgeschlossene Module.
- **Aktives Lernen:** Lernaufgaben und Sitzungen; Lernkarten, Wiederholungsintervalle und Quiz in späteren Ausbaustufen.
- **Self-Hosting:** lokaler Betrieb mit Docker Compose, eigener Datenbank, Backup- und Wiederherstellungsprozess.
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

Die folgende Struktur ist ein **Zielentwurf**, kein Verzeichnislisting des derzeitigen Repositories:

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

## Datenschutz und öffentliche Entwicklung

Dieses Repository ist **öffentlich**. Es darf ausschließlich generische Produktdefinitionen, Quellcode, Konfigurationsvorlagen und ausdrücklich synthetische Testdaten enthalten. Bitte **keine** echten Namen, Konten, Noten, Prüfungsbelege, Modulunterlagen Dritter, privaten Infrastrukturdetails, Notion-Exporte, Zugangsschlüssel oder produktiven Datenbankdumps committen.

Echte Daten werden nach Fertigstellung der Anwendung ausschließlich in deren privater Installation erfasst bzw. über einen nutzerinitiierten Import verarbeitet. Eine externe KI-Anbindung ist optional und standardmäßig deaktiviert.

Eine Open-Source-Lizenz ist noch festzulegen; **öffentlich lesbar bedeutet nicht automatisch frei lizenziert**.

## Aktueller nächster Schritt

MVP und Datenmodell abstimmen, ein lauffähiges Grundgerüst erstellen, Authentifizierung und Migrationen implementieren, anschließend eine erste durch Tests abgesicherte Studiengang-/Modulansicht entwickeln. Siehe [Roadmap](planning/ROADMAP.md).
