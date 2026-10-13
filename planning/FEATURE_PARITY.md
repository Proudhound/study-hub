# Funktionskatalog für Study Hub

**Status:** Soll-Funktionen der künftigen Web-App. Die Liste entstand aus der Auswertung einer generischen Studienverwaltung und ist **kein Export personenbezogener Informationen**.

Die vorhandene Studienverwaltung dient als funktionale Referenz. Study Hub übernimmt keine fremden Datenbanken oder Layouts unverändert und bindet keine Hochschule als Voraussetzung ein.

| Bereich | Ziel-Funktion in Study Hub | Umsetzung |
| --- | --- | --- |
| Studiengänge | Abschlüsse, Soll-Credits, Start-/Zielstatus, Gesamtfortschritt | MVP |
| Module und Credits | Module, ECTS/andere Credits, Anerkennungen, Status, Prüfungsform, Lernaufwand | MVP |
| Wahlpflicht | Wahlbereiche, Optionen, noch nicht gewählt/gewählt, Auswahlgrenzen | MVP |
| Voraussetzungen | Formale Sperren getrennt von fachlichen Empfehlungen, Modulgraph | MVP |
| Modul-Cockpit | Eine Datenquelle mit Tabs für Alle / Vertiefungen / Roadmap | MVP |
| Fortschrittsdashboard | 0-basierter segmentierter Balken, erreichte / erforderliche Credits und Prozent | MVP |
| Lernaufgaben | Zeitbudget, Energielevel, Priorität, Status, Modulrelation | MVP |
| Prüfungscenter | Termine, Ergebnisse, Schwachstellen, Vorbereitungsstand | nach MVP |
| Lernkarten | Frage/Antwort, Active Recall, Wiederholungstermine, Lernstand | nach MVP |
| Literatur & Quellen | Quellenverweise, Studienbriefe als private Uploads, eigene Notizen | nach MVP |
| Fokusmodus | Lern-Sessions, Timer, Ablenkungsparkplatz | nach MVP |
| Persönliche Startseite | Modulare Widgets, Anzeigeoptionen, Theme-Wechsel | MVP (Basis) / erweitert nach MVP |
| Import/Export | Eigene Studienakten portabel exportieren; spätere CSV-/JSON-Importer | Export MVP, Import später |
| KI-Lernhilfe | Lokaler/externer Provider, Nutzerfreigabe, optional MCP | nach MVP |

## Datengrenzen

- Im Code nur generische Labels, Konfigurationsschemata und synthetische Beispiele.
- Keine Hochschulnamen, konkreten Modulbezeichnungen, Anerkennungsbescheide, Noten oder echten Lernunterlagen übernehmen.
- Eine spätere Datenmigration muss **explizit vom Nutzer gestartet werden**, vertraulich in seiner privaten Instanz laufen und einen Datenabgleich anbieten.
- Dashboard-Layout und Datenmodell sind unabhängig voneinander: verschiedene Oberflächen greifen auf dieselbe führende Datenquelle zu.
