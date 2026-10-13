# Backup- und Restore-Konzept (Self-Hosting)

**Status: Architekturvorgabe, noch keine eingerichteten Backup-Jobs.** Das Repository enthält derzeit keine betriebsfertige Datenbank oder Deployment-Installation. Die folgenden Anforderungen werden mit dem produktiven Docker-Stack implementiert und durch Restore-Tests verifiziert.

## Entscheidung: Primärdaten + zwei getrennte Sicherungsziele

Study Hub speichert produktive Daten dort, wo die private Instanz betrieben wird (Heimserver **oder** gemieteter Web-/VPS-Host). Unabhängig vom Primärstandort werden Sicherungen an zwei weiteren logischen Zielen gehalten:

1. **Lokales Sicherungsziel:** physisch bzw. logisch getrennte Sicherungsplatte oder NAS, nicht bloß ein zweites Verzeichnis im selben Container/Host.
2. **Externes Sicherungsziel:** zweiter Standort, z. B. verschlüsseltes SFTP-/Object-Storage-Ziel oder ein privat verwalteter Zweitserver.
3. **Verschlüsselte Übertragung und Speicherung:** Restic (vorgeschlagen) mit eigenen Sicherungs-Repositories und separat geschützten Schlüsseln.
4. **Wiederherstellbarkeit:** regelmäßig automatisiert prüfen und mindestens monatlich auf einer isolierten Testinstanz zurückspielen.

Das gilt in beiden Betriebsarten:

| Primärer Betrieb | Lokale Sicherung | Externe Sicherung |
| --- | --- | --- |
| Eigener Server | Separates lokales NAS / externe Sicherungsdisk | Verschlüsselter Offsite-Storage / Zweitstandort |
| VPS / Webhost mit Container-Zugang | Separates Backup-Volume / Anbieter-Backup nur ergänzend | Verschlüsselte Kopie in eigenes lokales NAS / Zweitstandort |

**Wichtig:** Ein Snapshot des produktiven Hosts allein ist keine vollständige unabhängige Sicherung. Zwei Backup-Verzeichnisse auf derselben Platte sind kein zweites Ausfallgebiet. Synchronisation/Replikation ersetzt keine versionierten Backups (auch versehentliche Löschungen würden sonst repliziert).

## Zu sichernde Bestandteile

- **PostgreSQL:** konsistenter, versionierter Dump (z. B. pg_dump Custom Format) plus Schemaversionsinformationen.
- **Anhänge/Dateien:** private Upload-Volumes (sofern Dateiupload implementiert ist).
- **Konfiguration:** Laufzeit-Parameter und Deployment-Konfiguration; Secrets getrennt und verschlüsselt verwahren, niemals im Git-Repository.
- **Wichtige Metadaten:** App-Version, Migrationen, Zeitpunkte, Prüfsummen, Restore-Anleitung und Abhängigkeiten.

DB-Dump und Dateianhänge müssen logisch zusammenpassen. Bei gleichzeitig laufenden Uploads ist ein koordiniertes Snapshot-/Manifest-Verfahren oder ein kurzer konsistenter Schreibstopp erforderlich.

## Vorgeschlagener automatischer Ablauf

1. Ein geplantes Backup startet außerhalb der App-Requests mit einem nur dafür berechtigten Service-Account.
2. Datenbank-Dump in einem temporären, zugriffsbeschränkten Verzeichnis erstellen und verifizieren.
3. Anhänge und Manifest ergänzen, keine Zugangsschlüssel in Dumps oder Protokolle schreiben.
4. **Zwei getrennte verschlüsselte Restic-Repositories** sichern: lokales Ziel und externes Ziel, mit unabhängig geprüften Erfolgsstatus.
5. Retention pro Ziel anwenden und Repository-Integrität kontrollieren.
6. Fehlgeschlagene Backups sofort kenntlich machen; wiederholte Fehler sollen eine Betreiberbenachrichtigung auslösen.
7. Temporäre unverschlüsselte Dumps sicher entfernen. Nicht in CI-Artefakte oder GitHub hochladen.

**Vorgeschlagene Aufbewahrung (anpassbar):** 7 tägliche, 4 wöchentliche und 12 monatliche Sicherungsstände. Vollautomatische Abläufe werden erst nach Implementierung der Runtime eingerichtet; dies ist keine Zusage, dass aktuell Daten gesichert würden.

## Wiederherstellungstest (Definition of Done)

- Backup von **jedem** Ziel separat auf einer isolierten Maschine/VM entschlüsseln.
- Leere PostgreSQL-Instanz aus dem Dump wiederherstellen; Upload-Dateien an passende Version anbinden.
- Migrationen/Anwendungsversion kontrollieren, Authentifizierung und ausgewählte synthetische Datensätze prüfen.
- Fehlende Objekte, beschädigte Anhänge, DB-Konsistenz und Berechtigungen prüfen.
- Ergebnis, RPO (möglicher Datenverlust) und RTO (Wiederanlaufdauer) protokollieren, ohne personenbezogene Daten öffentlich zu veröffentlichen.

**Zielwerte für die erste produktive Installation (nicht zugesichert):** RPO <= 24 h durch tägliche Sicherungen; RTO nach Restore-Test festlegen. Kürzere Intervalle und WAL-Archivierung erst nach Bedarf.

## Schutz der Sicherungen

- Restic-Passwörter in einem eigenen Secret-Store/Root-lesbaren Passwortfile verwalten.
- Mindestens eine Sicherung mit eingeschränkten Löschrechten bzw. unveränderbarer Aufbewahrung vorsehen.
- Sicherungsschlüssel sowie Wiederherstellungsanleitung außerhalb der produktiven Instanz verwahren.
- Speicherplatz, Zeitpläne und Restore-Verfahren pro Betreiber konfigurieren; keine privaten Pfade oder Hosts in das öffentliche Repository schreiben.

## Umsetzungskriterien

Das Backup-Feature ist erst erledigt, wenn Docker-Stack, Backup-Job, zweites Ziel, Schlüssel-/Rechtekonzept, Fehlermeldung, Restore-Skript und automatisierte Tests vorhanden und dokumentiert sind.
