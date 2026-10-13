# Study Hub – Development Process

Dieses öffentlich dokumentierte Verfahren adaptiert die bewährten Work-Item- und Review-Prinzipien aus anderen Projekten als **eigenständige, produktneutrale Study-Hub-Regeln**. Es enthält keine internen Laufzeitdaten, sensiblen Abläufe oder privaten Projekt-Quelltexte.

## Lebenszyklus

`Idee / Bug → Discovery → DEC (falls nötig) → Epic / Work Item → Priorisierung → DoR → Umsetzung → Dev Verification → Independent QA → Independent Reviewer → Human Review → ausdrückliche Human Acceptance → Merge / Done → Retro`.

Ein Issue ist kein Auftrag zur unkontrollierten Implementierung. Ein Epic bündelt Ergebnisse, Child-Items sind einzeln prüfbar.

## Rollen und Autorität

**Human Product Owner / Maintainer**
- priorisiert und bestätigt Scope und Acceptance Criteria;
- entscheidet bei Produkt-/Architekturkonflikten und genehmigt Änderungen an langlebigen Verträgen;
- gibt ein geprüftes Ergebnis **ausdrücklich** frei; kann Arbeit zurückgeben, parken oder verwerfen.

**Developer (Mensch oder Agent)**
- darf implementieren, testen, dokumentieren und einen PR erstellen;
- darf ohne Zustimmung weder Ziele noch AC ändern;
- meldet fehlende Entscheidungen als `Blocked`; kein stilles Scope Creep;
- kann nicht selbst unabhängige QA, Reviewer und Human Acceptance ersetzen.

**QA (unabhängig)**
- prüft die genehmigten AC mit eigener, reproduzierbarer Evidenz einschließlich negativen Pfaden;
- berichtet `QA PASS / FAIL / BLOCKED`; FAIL → Dev-Korrektur → erneute Dev Verification → QA.

**Reviewer (unabhängig)**
- prüft Security, Daten, Lizenz, Architektur, Korrektheit, Testqualität, Out-of-Scope und Wartbarkeit;
- berichtet `REVIEW PASS / FAIL / BLOCKED`; Review-PASS ist **nicht** Human Acceptance.

## Definition of Ready

Ready erst dann, wenn alle folgenden Punkte wahr sind:
- klares Ziel, Scope und Out-of-Scope;
- messbare Akzeptanzkriterien plus vorab beschriebene Verifikation;
- relevante Daten-/Berechtigungs-/Privacy-/Security-Grenzen;
- bekannte technische Abhängigkeiten, Referenzen und Entscheidungen;
- keine offenen umsetzungsblockierenden Fragen;
- nachvollziehbare Priorisierung und realistisch kleine Umsetzungseinheit.

Ein früher Community-Vorschlag darf unvollständig sein, **bleibt dann Backlog/Discovery**. Die Issue-Form stellt keine automatische Freigabe dar.

## Definition of Done

- Alle freigegebenen AC nachgewiesen (keine Tests zum nachträglichen Passendmachen abschwächen).
- Dev-Checks auf dem **exakt geprüften PR-Head** erfolgreich oder genehmigte Ausnahme vermerkt.
- Separater QA-Nachweis und Reviewer-Nachweis ohne offene Blocker.
- Relevante Dokumentation, Sicherheits- und Lizenzprüfung abgeschlossen.
- **Explizite Human Acceptance** durch autorisierten PO/Maintainer; ohne diese kein finaler Merge und kein Done.
- Nach Freigabe Merge und GitHub-Issue-Abschluss mit PR-Link und Evidenz.

## Decision → ADR

Ein `DEC-NNN` erfasst Ausgangslage, Optionen, Vor-/Nachteile, Empfehlung, offene Fragen und PO-Beschluss. Bei Architekturwirkung folgt ein versioniertes `ADR-NNN` unter `docs/adr/`, bevor die abhängige Änderung umgesetzt wird. Ein DEC-Issue ist weder automatisch ein ADR noch eine technische Implementierungsstory.

## Handoffs / Evidenz

Im PR sind Referenz-Work-Item, Implementierungsübersicht, Changed Areas, AC-Verifikationsmatrix, Dev-Check-Resultate, QA- und Review-Befund, Risiken und menschliche Abnahme nachvollziehbar zu dokumentieren.

Begriffe `PASS`, `FAIL`, `NOT RUN`, `NOT APPLICABLE` werden nicht vermischt. Fehlende unabhängige Nachweise nie durch grüne CI-Jobs ersetzen.

## Backlog und Sprint

Bei Iterationsbeginn Kandidaten nach P0/P1/P2/P3 und Kapazität auswählen. Nur Ready-Items in die Sprint-Umsetzung; Epics werden durch Child-Items realisiert. Am Ende Review, Retro und aktualisierte Priorität. Keine automatische Issue-Schließung nach CI oder Agent-Output.

## Sicherheit im öffentlichen Repo

Ausschließlich generische/synthetische Daten, keine echten Studienakten, Notion-Exporte, Hochschulunterlagen, API-Secrets oder Heimnetz-Konfigurationen. Siehe [SECURITY](../../planning/SECURITY.md).

## Umsetzungsschritt

Die Templates und Dokumentation setzen die **Issue-Logik** sofort um. Eine mehrstufige, vertrauliche oder kostenpflichtige Agenten-Orchestrierung existiert in Study Hub noch **nicht**; diese muss ggf. separat als `SH-TECH-CI-...` spezifiziert, geprüft und freigegeben werden.
