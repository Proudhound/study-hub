# Modulares Dashboard und Themes

**Status:** Designkontrakt und kleine testbare Kernbausteine vorhanden; eine echte grafische Oberfläche ist **noch nicht implementiert**.

## Dashboard als Widget-Baukasten

Jede Dashboard-Funktion ist ein Modul mit stabiler ID, Bezeichnung, Datenrechten, Minimalgröße, Konfigurationsschema, Versionsstatus und optionaler Ladefunktion. Ein Nutzer kann Module ein-/ausblenden und ihre Reihenfolge bestimmen; die künftige UI soll die Einstellungen pro Nutzer und Studiengang speichern.

### Kernmodule (MVP)

- **credits:** erreichte / erforderliche Leistungspunkte, Prozent sekundär, 0-basierter segmentierter Balken mit frei definierbarem Sollwert.
- **module-cockpit:** eine Datenquelle, filterbare Tabs für alle Module, Wahloptionen und Roadmap.
- **roadmap:** fachliche Vorläufer, Zulassungsregeln und nächster möglicher Lernschritt.
- **tasks:** priorisierte Lernaufgaben, Zeitbedarf, Energielevel und Status.

### Erweiterungsmodule (nach MVP)

- **exams:** Prüfungen, Vorbereitung und Termine.
- **flashcards:** Karteikarten, aktive Wissensabfrage und Wiederholungsplanung.
- **library:** Literatur, Quellen und persönliche Notizen.
- **focus:** Lern-Sessions, Timer und Konzentrationshilfen.

Der aktuelle Modul-Registry-Vertrag in packages/dashboard/src/modules.ts ist **noch kein dynamischer React-Widget-Loader**. Er filtert ausschließlich eingebaute, vertrauenswürdige Einträge. Externe, ausführbare Module sollen ohne gesondertes Sicherheits-/Lizenzdesign nicht unterstützt werden.

## UX und Speicherung

- Modul-Anordnung, Sichtbarkeit und Größe in einem pro Nutzer/Studiengang zugeordneten Layout-Schema speichern.
- Unbekannte IDs ignorieren; nicht freigegebene/inaktive Module nicht laden.
- Standardlayout bei neuen Nutzern vorsehen; Benutzeränderungen dürfen keinen Funktionsverlust verursachen.
- Widgets sollen einheitliche Rahmen, Abstände, Loading-/Error-/Empty-Zustände und Tastaturbedienung unterstützen.
- Für große Displays Rasterlayout; für Mobilgeräte sinnvolle Einzelspalten-Reihenfolge.
- Datenschutz: Dashboard-Einstellungen werden in der privaten App-DB gespeichert, niemals im öffentlichen Repository.

## Light / Dark / System

Anforderungen:
1. Manueller Wechsel **Hell / Dunkel / System** im UI; Standard = System.
2. Systemmodus folgt der Betriebssystempräferenz und reagiert auf Änderungen.
3. Auswahl pro Nutzer speichern; vor der ersten Darstellung anwenden, um Flackern zu vermeiden.
4. Farbwerte durch semantische CSS-Tokens bereitstellen; keine starr codierten Farben in Widgets.
5. Kontraste, Fokusrahmen, Fehlermeldungen und Lesbarkeit in beiden Modi testen.
6. Bei deaktiviertem JavaScript bleibt eine sinnvoll lesbare Basisseite erreichbar, soweit technisch möglich.

Vorbereitete Dateien: packages/ui/src/theme.ts (Entscheidungslogik) und packages/ui/src/tokens.css (helle/dunkle Token-Sätze); deren Verhalten ist durch die CI getestet, **der sichtbare Umschalter folgt mit der React-Oberfläche**.

## Kein Missverständnis zum Funktionsstand

Die ersten Tests und Module schaffen eine Architekturgrundlage. Es existiert aktuell weder ein konfigurierbares Nutzer-Dashboard noch eine fertige Oberfläche, Installation oder lokale Datenbank. UI-Ausgestaltung und Widget-Auswahl werden vor Implementierung gesondert besprochen.
