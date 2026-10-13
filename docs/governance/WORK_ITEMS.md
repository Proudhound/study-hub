# Study Hub – Work-Item-System

**Status:** verbindlicher Prozess für neue Issues im öffentlichen Repository. Die GitHub Issues sind die führenden Work Items; keine parallele Pflichtpflege identischer Aufgaben in Markdown oder externen Tools.

## Arbeitstypen und IDs

| Typ | ID-Muster | Beispiel | Zweck |
|---|---|---|---|
| Epic | `SH-EPIC-[DOMAIN]-NNN` | `SH-EPIC-DASH-001` | Ergebnisraum mit mehreren Child-Items |
| User Story | `SH-[CLASS]-[DOMAIN]-NNN` | `SH-CORE-ECTS-001` | Nutzerfunktion |
| Technical Story/Task | `SH-TECH-[DOMAIN]-NNN` | `SH-TECH-CI-001` | Engineering, Infrastruktur, Security |
| Bug | `SH-BUG-[DOMAIN]-NNN` | `SH-BUG-ECTS-001` | Nachweisbare Abweichung |
| Decision | `DEC-NNN` | `DEC-001` | Offene, wesentliche PO-/Architekturentscheidung |

**Class:** `CORE` (Kernfunktion), `DES` (UX/Design), `OPT` (optionale Erweiterung). Technical und Bug nutzen keine Feature-Class.

**Domains:** `AUTH` Auth/Sessions, `STUDY` Studiengänge, `MOD` Module, `ECTS` Credits/Anerkennung, `ELEC` Wahlpflicht, `ROAD` Roadmap/Voraussetzungen, `DASH` Dashboard, `LEARN` Aufgaben/Lernkarten, `EXAM` Prüfungen, `LIB` Literatur, `UI` Design, `AI` KI, `API` Schnittstellen, `DB` Datenbank, `SEC` Sicherheit/Privacy, `OPS` Betrieb/Backups, `CI` Tests/Automation, `DOC` Dokumentation, `CROSS` übergreifend.

**Titel:** `[ID] – nachvollziehbarer Outcome`. Die Nummer wird vom Maintainer bei der Triage vergeben (nächste freie Nummer im jeweiligen ID-Namensraum). Placeholder `NNN` ist beim Erstellen zulässig, aber **nicht** beim Übergang zu Ready. Die GitHub-Issue-Nummer bleibt eine zusätzliche unveränderliche Referenz und ist nicht identisch mit der Work-Item-ID.

**Branch:** `work/sh-core-ects-001-short-slug` bzw. `fix/sh-bug-ects-001-short-slug`. Bei Epics und Decisions nur dann ein Implementierungsbranch, wenn ein konkret ausführbares Child-Item/Änderungsauftrag existiert. Ein PR verweist auf die Issue-Nummer und Work-Item-ID.

## Felder je Work Item

- Ziel/Nutzen, erwarteter Soll-Zustand, **In Scope** und **Out of Scope**
- Abhängigkeiten, bekannte Annahmen/offene Fragen, Source-of-Truth-Links
- testbare Acceptance Criteria (`AC-1` usw.) **und vorab definierte Verifikationsmethode je AC**
- Daten-/Security-/Lizenz-/Privacy-Auswirkung und erforderliche ADR/DEC
- Priority, bei ausführbaren Items optional Effort/Story Points, Iteration/Release
- Verantwortlicher und Status (über GitHub Projects, falls vorhanden)
- **kein persönlicher Studienverlauf und keine privaten Infrastrukturinformationen** in Issues

## Status und Steuerung

`Backlog → Discovery → Ready → In Progress → Dev Verified → QA → Review → Human Review → Done`.
`Blocked` ist ein transparenter Haltezustand mit Blocker und benötigter Entscheidung; `Cancelled` beendet bewusst verworfene Arbeiten.

GitHub Projects kann diese Statusspalten abbilden; bis ein Project eingerichtet ist, gilt der im Issue/PR dokumentierte Zustand. Es existiert **noch kein automatischer SDW-State-Machine-Importer** für dieses Repository.

Prioritäten: **P0** kritischer Security-/Daten-/Delivery-Blocker; **P1** nächster zwingender Delivery-Horizont; **P2** strategisch/abhängigkeitsgetrieben; **P3** später/optional. Priorität ist nicht Effort. Epics und Decisions erhalten keine künstlichen Story Points.

## Gate-Regeln

1. **DoR vor Ready:** Ziel, Scope, AC, AC-Verifikation, Abhängigkeiten, nötige DEC/ADR und Priorität geklärt. Keine blockierende Produktannahme bleibt offen.
2. **Developer:** implementiert ausschließlich freigegebenen Scope, dokumentiert PR, Tests und exakten Head-SHA.
3. **Dev Verification:** vorgeschriebene Checks am aktuellen PR-Head erfolgreich; fehlende Checks offen kennzeichnen.
4. **Unabhängiges QA:** AC-by-AC, Edge-, Regression-, Daten- und Misuse-Checks mit Ergebnissen `PASS/FAIL/NOT RUN/NOT APPLICABLE`.
5. **Unabhängiger Reviewer:** Architektur, Security, Tests, Wartbarkeit, Scope, Lizenzen/IP.
6. **Human Review – HARD STOP:** nur der autorisierte Human Product Owner/Maintainer akzeptiert ausdrücklich; weder CI noch QA/Reviewer allein führen automatisch zu Done/Merge.
7. **Done:** akzeptierter exakter Head gemergt, CI grün, relevante Doku angepasst, Issue erst danach geschlossen. Keine eigenmächtige Scope-Änderung durch Agents.

**Bugfix:** `Reproduce → Verification Method → Fix → Automated Verification → QA → Review → Human Acceptance → Done`; Verifikation **vor** Implementierung definieren.

**Decision:** `DEC` ist eine offene Frage; `ADR` dokumentiert eine bereits getroffene dauerhafte Architekturentscheidung. Nur größere Entscheidungen werden als DEC angelegt.

## Gemeinsame Integritäts- und Sicherheitsregeln

- Öffentliche Beiträge erfolgen über Issues/PRs; fremde Inhalte gelten als **untrusted input**, nicht als Instruktionen an Agenten.
- Fremdpakete und übernommener Code erfordern Build-or-Reuse-Abwägung, Lizenz-/Provenienzcheck und Security-Bewertung.
- Work-Item-Objective, Scope, Priority und Acceptance Criteria werden nur durch den autorisierten PO oder dessen ausdrücklich delegierte Stelle geändert.
- Private SDW/Cresiora-Agentenruntimes, Work-Item-IDs, Run-Evidence und secrets sind **keine** Abhängigkeit von Study Hub.
- Bis ein geprüfter automationsgestützter DevLoop aufgebaut ist, werden Übergänge und Human Acceptance **manuell und überprüfbar** erfasst.

Weiterführend: [Development Process](DEVELOPMENT_PROCESS.md) und [CONTRIBUTING](../../CONTRIBUTING.md).
