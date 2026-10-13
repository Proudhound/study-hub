# Mitmachen bei Study Hub

Study Hub ist ein öffentliches Open-Source-Projekt (MIT). Beiträge zu Code, Dokumentation, Tests, Übersetzungen und Barrierefreiheit sind willkommen.

## Einstieg

1. [Produktumfang](planning/PRODUCT_SCOPE.md), [Roadmap](planning/ROADMAP.md) und [Architektur](planning/ARCHITECTURE.md) lesen.
2. Bestehende Issues prüfen und den passenden [Issue-Typ](docs/governance/WORK_ITEMS.md) wählen: Epic, User Story, Technical Task, Bug oder DEC. Zunächst gilt Backlog/Discovery; die Issue-Erstellung bedeutet nicht automatisch Ready. Das [Entwicklungsverfahren](docs/governance/DEVELOPMENT_PROCESS.md) beachten.
3. Eigenen Branch erstellen und Änderungen mit **synthetischen Beispieldaten** umsetzen.
4. Lokal Node.js 22.16+ installieren; dann npm ci und npm run check ausführen.
5. Pull Request mit Work-Item-ID, verlinktem Issue, AC-Verifikationsmatrix, exaktem getesteten Head, möglichen Risiken und ggf. Screenshot (ohne private Daten) öffnen.
6. Dev Verification dokumentieren; unabhängige QA und Reviewer durchlaufen; bei **Human Review** explizite Freigabe des autorisierten Maintainers abwarten. Ohne Human Acceptance kein finales Merge/Done.

Derzeit enthält das Projekt bewusst nur eine kleine TS-Domänenreferenz, Theme-Tokens und Tests; eine lauffähige Web-App folgt in späteren Schritten. Bitte keine bestehenden Funktionen vorwegnehmen.

## Rollen und Entscheidungsgrenzen

Der Developer (auch ein Coding-Agent) kann nach Ready im autorisierten Scope arbeiten, aber weder Priorität noch Acceptance Criteria eigenmächtig ändern. QA- und Reviewer-PASS sind unabhängige Prüfschritte, keine menschliche Endabnahme. Grundlegende offene Architektur-/Produktfragen werden als **DEC** dokumentiert und durch den Maintainer entschieden; daraus kann bei Bedarf ein ADR entstehen.

## Entwicklungsstandards

- Keine persönlichen Studiendaten, Prüfungsbelege, privaten Hochschulunterlagen oder privaten Serverdaten veröffentlichen.
- Neue Domänenlogik mit Tests versehen; Fehlerfälle und doppelte Credits berücksichtigen.
- Theme-abhängige UI-Komponenten benötigen hellen/dunklen Modus und Tastaturbedienung.
- Dashboard-Widgets müssen über die Registry aktivierbar/deaktivierbar sein; spätere Widgets dürfen nicht als bereits verfügbar erscheinen.
- API-Rechte und Datenisolation immer serverseitig durchsetzen.
- Neue Abhängigkeiten begründen; Lizenz- und Sicherheitsprüfung durchführen.

## Sicherheit

Schwachstellen **nicht als öffentliches Issue mit reproduzierbaren Exploit-Details** melden. Wenn möglich, GitHubs private Vulnerability-Reporting-Funktion des Repositories verwenden, andernfalls zuerst nach einem privaten Meldeweg fragen. Niemals Zugangsdaten mitschicken.

## Lizenzbeiträge

Mit Einreichen eines Pull Requests bestätigst du, dass du zur Veröffentlichung deiner Beiträge unter der MIT-Lizenz berechtigt bist. Keine Beiträge mit unklaren Drittanbieter-Rechten einreichen.
