# Sicherheit und Veröffentlichung im öffentlichen Repository

**Dieses Repository ist öffentlich.** Jeder Commit, Branch, Pull Request, Kommentar und CI-Log kann für Dritte sichtbar und dauerhaft im Git-Verlauf verfügbar sein. Hier wird nur die allgemeine Anwendung entwickelt, niemals eine persönliche Studienakte.

## Erlaubte Inhalte

- Quellcode, Architektur- und Produktdokumentation
- Generische Tabellenmodelle und API-Spezifikationen
- Docker-/Reverse-Proxy-Vorlagen mit Platzhaltern
- Ausschließlich **synthetische** Test- und Demo-Daten
- Öffentlich lizenzierbare eigene Assets

## Nicht veröffentlichen

- Personenbezogene Studieninformationen, Noten, Credit-Nachweise, Anerkennungen, Prüfungstermine
- Reale Studierenden-/Hochschulaccounts oder private E-Mail-Adressen
- Echte Skripte, Modulhandbücher, PDFs, Folien, Literatur-Volltexte oder andere fremde geschützte Materialien
- Exporte aus Notion oder anderen privaten Diensten
- Datenbank-Dumps, Uploads, Logdateien mit privaten Inhalten, lokale Backups
- `.env`-Dateien, Tokens, SSH-Schlüssel, Passwörter, Cookies oder Provider-Secrets
- Private IPs, konkrete Domains, Hostnamen, interne Netzwerkpläne oder Inventar der produktiven Heim-Infrastruktur

## Sichere Entwicklung

1. Vor einem Commit `git status` und `git diff --staged` prüfen.
2. Secret-Scanning und Abhängigkeitsprüfung als CI-Gate vorsehen.
3. Fixtures als `synthetic` kennzeichnen; keine realen Daten anonymisieren und dann als Testdaten verwenden.
4. Sensible Daten in privaten Runtime-Volumes außerhalb des Repositories speichern.
5. `.env.example` nur mit neutralen Platzhaltern; niemals echte Werte als Default setzen.
6. Pull Requests auf personenbezogene Informationen und Lizenzkonflikte kontrollieren.
7. Sollte ein Secret versehentlich veröffentlicht werden: sofort widerrufen/rotieren; bloßes Löschen des Commits reicht nicht.

## Datenschutz der fertigen Anwendung

- Für den späteren Betrieb werden private Daten tenant-/nutzerbezogen geschützt.
- Zugriffsbeschränkungen gelten auf API- und Datenbankebene, nicht nur im Frontend.
- Export und Löschung eigener Daten müssen möglich sein.
- Backup- und Wiederherstellungskonzept einschließlich Aufbewahrung und Verschlüsselung dokumentieren.
- Optionaler KI-Transfer erfordert nachvollziehbare Freigabe; standardmäßig keine externe Übertragung.

## Repository-Lizenz

Ein öffentliches Repository ist nicht automatisch Open Source. Vor der ersten öffentlichen Software-Veröffentlichung ist eine passende Lizenz zu beschließen und als `LICENSE` bereitzustellen. Fremde Komponenten/Assets müssen lizenzrechtlich geprüft werden.

## Umgang mit späteren Importern

Datenimporte aus Notion, CSV oder PDF werden **ausschließlich innerhalb einer privaten Nutzerinstanz** ausgeführt. Das öffentliche Repository enthält nur generische Import-Schnittstellen und künstliche Beispieldaten, niemals die importierten Dateien.
