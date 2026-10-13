# Testpipeline

**Status: Implementiert für den aktuellen Planungs-/Kernlogikstand, nicht für eine noch nicht vorhandene React-/API-Anwendung.**

## Lokaler Einstieg

Voraussetzung: Node.js >= 22.16, npm und Git.

1. npm ci
2. npm run check:public
3. npm run check:source
4. npm test

Alle aktuellen Tests verwenden ausschließlich Node-Bordmittel; keine Runtime- oder Testpakete müssen zusätzlich installiert werden. Node 22 nutzt für die kleinen TypeScript-Prototypen das experimentelle Strip-Types-Feature. Mit dem späteren Frontend-Scaffold wird ein regulärer TypeScript-Compiler, Linter und testbarer Build samt Lockfile ergänzt.

## CI auf GitHub Actions

Die Datei .github/workflows/ci.yml startet bei jedem Pull Request, Push auf main und manuell:

- Auschecken mit minimalen Rechten (kein persistierter Credential-Token).
- Node.js 22 und npm ci mit Lockfile.
- Schutzkontrolle des öffentlichen Repositories gegen verbotene Dateitypen, typische Key-Signaturen und geheime Laufzeitdateien.
- Syntaxkontrolle der vorhandenen .ts-Quelldateien.
- Node-Test-Suite für Credit-Aggregation, Anerkennung ohne Doppelzählung, ungewählte Wahloptionen, Nullpunkt und Obergrenze, Theme-Auswahl und Widget-Registry.

Die CI hat nur contents: read und benötigt **keine Secrets**. Sie lädt keine persönlichen Studieninformationen hoch.

## Was diese Pipeline noch NICHT leistet

- Weder Frontend-Build noch React-Komponententests (Frontend noch nicht erstellt).
- Weder API-/PostgreSQL-Integrationstests noch Docker-Compose-Deploymentchecks (Dienste noch nicht implementiert).
- Keine vollständige TypeScript-Typprüfung: strip-types prüft ausführbaren Code, ersetzt aber keinen tsc-Lauf.
- Kein echter Backup/Restore-Test, bevor der Docker-Stack und private Sicherungsziele existieren.
- Kein vollständiger Secret-Scan: der Repo-Guard ist eine präventive Zusatzprüfung, kein Ersatz für GitHub Secret Scanning und manuelle Reviews.

Diese Lücken sind in der Entwicklungs-Roadmap erfasst und werden geschlossen, sobald der jeweilige Anwendungsteil existiert.

## Bei späteren PRs erweitern

- Frontend: typecheck, ESLint, Vitest/React Testing Library, Vite-Build, Playwright E2E.
- Backend: Fastify-Tests, Datenbankmigrationen, PostgreSQL im CI-Service und isolierte Berechtigungstests.
- Infrastruktur: Compose-Validierung, Image-Scan, Dependency Audit, Backup-/Restore-Smoke-Test.
- Accessibility: Tastaturnavigation, Farbkontrast, Light/Dark und mobil.
- Kein Deployment nach CI ohne getrennt eingerichtete, geschützte Umgebung und explizite Freigabe.
