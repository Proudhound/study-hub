# Entwicklungs-Roadmap

Status: **Entwurf**. Die Phasen sind nach Abhängigkeiten geordnet; keine künstlichen Termine, keine zugesicherte Feature-Verfügbarkeit.

## Phase 0 — Architektur und Repository-Hygiene

- [x] Öffentliche, generische Produktbeschreibung und technische Leitplanken dokumentieren
- [x] MIT-Lizenz festlegen und Lizenzdatei ergänzen
- [ ] ADR für Tech-Stack, Authentifizierung und Installationsmodus erstellen
- [x] Work-Item-/Issue-Taxonomie, ID-/Domain-Schema und DoR/DoD-Gates dokumentieren
- [x] Forms für User Story, Technical Task, Bug, DEC und Epic anlegen
- [x] Repository-Konventionen, PR-Vorlage, CI-Baseline und CONTRIBUTING definieren
- [x] Erste synthetische Domain-/Theme-/Widget-Testfälle implementieren
- [ ] Vollständige synthetische Demo-Datensätze und API-Testdaten definieren

**Gate:** Keine realen Daten im Repository; Team kann das geplante System unabhängig von privaten Umgebungen verstehen.

**Issue-Umsetzung:** siehe [Work Items](../docs/governance/WORK_ITEMS.md) und [Development Process](../docs/governance/DEVELOPMENT_PROCESS.md). Die manuellen Gates sind verbindlich; ein vollständiger automatischer DevLoop mit Human-Acceptance-Finalizer ist noch nicht installiert.

## Phase 1 — Technisches Fundament

- [ ] Monorepo für `apps/web`, `apps/api`, `packages/domain` und DB-Migrationen aufbauen
- [ ] Lokale Docker-Compose-Entwicklung mit PostgreSQL und Healthchecks
- [ ] Authentifizierung, Sitzungen, Autorisierung und Datenisolation
- [ ] API-Grundgerüst, strukturiertes Fehlerhandling, Zod-Schemas
- [x] GitHub-Actions-CI mit ersten Unit-/Domänen- und Repository-Tests einrichten
- [ ] Typecheck/Lint/Build und API-/PostgreSQL-Integrations- sowie Browser-E2E-Tests ergänzen
- [x] Backup-Konzept für zwei getrennte verschlüsselte Ziele definieren
- [ ] Automatischen lokalen + Offsite-Backup-Job und Restore-Test implementieren

**Gate:** Leere, privat installierte Instanz läuft; kein unautorisierter Zugriff auf Daten.

## Phase 2 — Studienmanagement-MVP

- [ ] Studiengänge und Module mit Credits anlegen, bearbeiten und anzeigen
- [ ] Anerkennungen und erworbene Credits getrennt verbuchen
- [ ] Wahlpflichtgruppen, Auswahlgrenzen und tatsächliche Auswahl modellieren
- [ ] Abhängigkeiten und formale Zulassungsregeln erfassen
- [ ] Dashboard: `erreicht / Soll`, Prozent, 0-basierte segmentierte Anzeige
- [ ] Ein Modul-Cockpit mit Ansichten: **Alle Module / Vertiefungen / Roadmap**
- [x] Statischen, interaktiven UX-Prototyp für Dashboard-Navigation, Sichtbarkeit und Reihenfolge erstellen (nur lokaler Browser)
- [ ] Produktive React-Startseite: Widgets ein-/ausblenden, sortieren und Layout je Nutzer über API persistieren
- [x] Theme-Umschalter Hell/Dunkel/System als Prototyp mit lokalem Browser-Speicher implementieren
- [ ] Produktive React-Implementierung mit nutzerbezogener Theme-Persistenz und vollständigem Accessibility-Test
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

## Referenzen

- [Backup/Restore](BACKUP_AND_RESTORE.md)
- [Dashboard-Module und Themes](DASHBOARD_MODULES.md)
- [Funktionskatalog](FEATURE_PARITY.md)
- [Testpipeline](../docs/TESTING.md)

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
