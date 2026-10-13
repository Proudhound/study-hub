# Produktumfang und MVP

Status: **geplantes Zielbild**, noch keine produktiv nutzbaren Funktionen.

## Problem und Nutzen

Studienfortschritt, Module, Prüfungstermine und Lernaktivitäten sind häufig über verschiedene Werkzeuge verteilt. Study Hub bündelt diese Prozesse in einer selbst gehosteten Web-App. Die Oberfläche soll ohne Tabellen-Doppelpflege und ohne Bindung an einen bestimmten Cloud-Dienst funktionieren.

## Grundprinzipien

1. **Local-first im Betrieb:** Produktive Daten liegen in der eigenen Instanz, nicht im öffentlichen Repository.
2. **System of Record:** Eine PostgreSQL-Datenbank ist führend; Import und Export sind explizite Abläufe.
3. **Konfigurierbar:** Leistungspunkte können z. B. ECTS oder andere Einheiten abbilden; keine fest verdrahtete Gesamtzahl.
4. **Saubere Unterscheidung:** Fachlich empfohlene Reihenfolge ist nicht gleich einer verbindlichen Prüfungszulassung.
5. **Accessible & responsive:** Desktop, Tablet und Smartphone; Tastaturbedienung, verständliche Zustände und Kontrast.
6. **Keine reale Beispieldaten:** Tests und Demos verwenden ausschließlich synthetische Inhalte.

## MVP (Version 0.1)

| Bereich | Nutzerfunktion | Akzeptanzkriterium |
| --- | --- | --- |
| Anmeldung | Lokales Nutzerkonto und sichere Sitzung | Nicht angemeldete Nutzer können keine privaten Daten lesen |
| Studiengänge | Abschluss, Gesamtcredits, Status erstellen/bearbeiten | Mehrere Studiengänge getrennt anlegbar |
| Module | Credits, Status, Prüfungsform und Modulzuordnung pflegen | Moduländerungen werden persistent gespeichert |
| Anrechnungen | Anerkannte Leistungen gesondert erfassen | Keine Doppelzählung, auch bei mehreren Quellen |
| Wahlbereiche | Gruppen von Wahloptionen, Auswahlgrenzen | Nicht gewählte Alternativen erhöhen Fortschritt nicht |
| Roadmap | Fachliche und formale Vorbedingungen abbilden | Grafische/Listenansicht zeigt Ursachen offener Voraussetzungen |
| Dashboard | Erreichte und offene Credits, Prozent und segmentierter Balken | Skala startet sichtbar bei 0 und endet am konfigurierten Sollwert |
| Lernaufgaben | Aufgaben einem Modul zuordnen, Status und Aufwand | Liste nach Priorität/Status filterbar |
| Datenausgabe | Vollständiger nutzerinitiierter Export in dokumentiertem Format | Daten können ohne proprietäre Cloud-Verbindung gesichert werden |
| Betrieb | Docker-basierte Installation und Healthcheck | Dokumentierter Start, Sicherung und Restore-Test |

## Nach MVP (Version 0.2+)

- Prüfungstermine und Prüfungsvorbereitung mit Schwachstellenanalyse
- Lernkarten mit Spaced Repetition und Active Recall
- Lern-Sessions, Fokusmodus und Zeitstatistiken
- Literatur-/Quellenverwaltung ohne öffentliche Weitergabe urheberrechtlich geschützter Texte
- Mobilfreundliche PWA, ggf. Offline-Lesen
- Modulimport mit Vorschau, Mapping, Dublettenprüfung und Validierung
- Optionale KI-Lernassistenten über austauschbare Provider und nutzerkontrollierte Freigabe
- Rollen/Mehrbenutzerfähigkeit und gemeinsames Arbeiten nur bei nachgewiesenem Bedarf

## Nicht-Ziele (zunächst)

- Eigener Hochschul- oder Prüfungsanbieter
- Verbindliche Auskunft über Studien- oder Prüfungsordnungen ohne geprüfte Regelbasis
- Zwang zur Anbindung von Notion, Moodle, GitHub oder einem LLM-Anbieter
- Öffentliche Kursmaterial-/PDF-Sammlung
- Cloud-SaaS mit zentral gespeicherten Nutzerdaten
- Kopie kommerzieller Templates oder geschützter Designs

## UX-Leitbild

Startseite mit klarer Hierarchie: Credits **erreicht / gesamt** als Primärmetrik, Prozent sekundär; hochwertige segmentierte Fortschrittsanzeige mit Nullpunkt, Modul-Cockpit mit Tabs für *alle Module / Wahloptionen / Roadmap*, daneben nächste Lernaufgaben und Prüfungen. Die konkrete Oberfläche wird als eigenständiges Designsystem umgesetzt.

## Definition of Done für einzelne Features

Feature erst fertig, wenn UI und API funktionieren, ein migrationsfähiges Schema vorliegt, Rechte und Validierung getestet sind, öffentliche Beispiel-Daten synthetisch sind und ein manueller UX-/Accessibility-Test erfolgt ist.
