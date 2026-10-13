# Entwicklungs-Roadmap

Status: **Entwurf**. Die Phasen sind nach Abhängigkeiten geordnet; keine künstlichen Termine, keine zugesicherte Feature-Verfügbarkeit.

## Phase 0 — Architektur und Repository-Hygiene

- [x] Öffentliche, generische Produktbeschreibung und technische Leitplanken dokumentieren
- [ ] Lizenzentscheidung treffen und Lizenzdatei ergänzen
- [ ] ADR für Tech-Stack, Authentifizierung und Installationsmodus erstellen
- [ ] Repository-Konventionen, PR-Vorlage, CI-Baseline und CONTRIBUTING definieren
- [ ] Synthetische Demo-Szenarien und Testregeln festlegen

**Gate:** Keine realen Daten im Repository; Team kann das geplante System unabhängig von privaten Umgebungen verstehen.

## Phase 1 — Technisches Fundament

- [ ] Monorepo für `apps/web`, `apps/api`, `packages/domain` und DB-Migrationen aufbauen
- [ ] Lokale Docker-Compose-Entwicklung mit PostgreSQL und Healthchecks
- [ ] Authentifizierung, Sitzungen, Autorisierung und Datenisolation
- [ ] API-Grundgerüst, strukturiertes Fehlerhandling, Zod-Schemas
- [ ] Unit-/Integrations-/E2E-Testpipeline und synthetische Testdaten
- [ ] Backup- und Restore-Test

**Gate:** Leere, privat installierte Instanz läuft; kein unautorisierter Zugriff auf Daten.

## Phase 2 — Studienmanagement-MVP

- [ ] Studiengänge und Module mit Credits anlegen, bearbeiten und anzeigen
- [ ] Anerkennungen und erworbene Credits getrennt verbuchen
- [ ] Wahlpflichtgruppen, Auswahlgrenzen und tatsächliche Auswahl modellieren
- [ ] Abhängigkeiten und formale Zulassungsregeln erfassen
- [ ] Dashboard: `erreicht / Soll`, Prozent, 0-basierte segmentierte Anzeige
- [ ] Ein Modul-Cockpit mit Ansichten: **Alle Module / Vertiefungen / Roadmap**
- [ ] Lernaufgaben, Sortierung, Filter und einfacher Export

**Gate:** Die Credit-Aggregation ist bei Anerkennungen, Alternativen und Regeländerungen korrekt; automatisierte Tests decken Doppelzählung ab.

## Phase 3 — Lernwerkzeuge

- [ ] Prüfungstermine, Wiederholungsziele und Lernplanung
- [ ] Lernkarten, Active Recall und Spaced-Repetition-Algorithmus
- [ ] Lern-Sessions, Timer und Auswertungen
- [ ] Quellen-/Materialverwaltung mit Berechtigungen
- [ ] Import-Wizard mit Vorschau und Konfliktauflösung

**Gate:** Lernmethoden bringen messbaren Nutzen, ohne verpflichtende Doppelpflege.

## Phase 4 — Optionale Erweiterungen

- [ ] Provider-neutrale KI-Adapter und nachvollziehbare Datenfreigabe
- [ ] Lokale Modell-Integration evaluieren
- [ ] PWA-/Offline-Funktionen und Multi-User nach Bedarf
- [ ] Öffentliche Release-Dokumentation, Upgrade-Guides, Sicherheitsprüfung

## Priorisierte technische Risiken

| Risiko | Gegenmaßnahme |
| --- | --- |
| Doppelte oder falsche Credits | Eigene Domänenlogik, Constraints, synthetische Edge-Case-Tests |
| Formale Voraussetzungen falsch interpretiert | Quellen-/Versionsbezug, manuelle Freigabekennzeichnung |
| Datenverlust bei Self-Hosting | Backup-, Restore- und Migrationstests |
| Ungewollte Veröffentlichung privater Inhalte | .gitignore, Reviews, Secret-Scanning, dokumentierte Datenklassen |
| Hoher Betriebsaufwand | Kleiner Docker-Stack, Healthchecks, Release- und Updatekonzept |
| Vendor-Lock-in bei KI | Optionale Adapter; Kernfunktionen vollständig ohne KI |

## Erste umsetzbare Issues (Vorschlag)

1. Repository-Skeleton und Docker-Compose-Entwicklungsumgebung
2. API/Auth-Grundlagen und autorisierte Endpoints
3. Domänenregeln für Credits, Anerkennung und Wahlbereiche inklusive Tests
4. Datenmigrationen für `program`, `module` und `module_progress`
5. Dashboard mit segmentierter ECTS-Komponente
6. Modul-Cockpit mit drei Ansichten und Abhängigkeitsübersicht
