# Generisches Datenmodell und Fortschrittslogik

Status: **fachliches Schema**, keine bestehende Datenbank und keine realen Studieninformationen.

## Kerntabellen (geplant)

| Entität | Wesentliche Felder (Beispiele) | Zweck |
| --- | --- | --- |
| `user` | id, login, password_hash | Identität und Datenzugriff |
| `program` | id, owner_id, title, credit_unit, required_credits, status | Studiengang bzw. Lernprogramm |
| `module` | id, code, title, credits, assessment_type | Modulstammdaten je Instanz |
| `program_module` | program_id, module_id, requirement_kind | Programmzuordnung: Pflicht oder Wahloption |
| `elective_group` | id, program_id, min_choices, max_choices, required_credits | Konfigurierbarer Wahlpflichtbereich |
| `elective_option` | elective_group_id, module_id | Verfügbare Wahloptionen |
| `elective_selection` | user_id, program_id, elective_group_id, module_id | Tatsächlich gewählte Optionen |
| `module_progress` | user_id, program_id, module_id, status, completed_at | Persönlicher Bearbeitungs-/Abschlussstand |
| `credit_award` | id, user_id, program_id, module_id, credits, origin, approved_at | Erworbene oder anerkannte Credits |
| `module_dependency` | module_id, predecessor_module_id, kind, note | Empfohlene/festgelegte Reihenfolge |
| `eligibility_rule` | target_module_id, rule_type, config, authority | Formale Zugangsvoraussetzung |
| `study_task` | user_id, module_id, title, due_at, effort_minutes, status | Lernaufgaben |
| `exam` | user_id, module_id, scheduled_at, status | Prüfungsplanung (Ausbaustufe) |
| `source` | user_id, module_id, title, citation, private_file_id | Literatur-/Quellenreferenz (Ausbaustufe) |
| `flashcard`, `review` | module_id, prompt, answer, due_at, result | Active Recall (Ausbaustufe) |

IDs sind technische interne Schlüssel. Änderungen von Studiengang oder Status dürfen bereits vergebene Credits nicht stillschweigend duplizieren.

## Credit-Regeln

1. Ein Programm besitzt eine **konfigurierbare Zielmenge** und Einheit; keine fest codierten 180 ECTS.
2. Anerkannte Leistungen werden als eigener `credit_award`-Vorgang erfasst, nicht als erfundene Prüfungsnote.
3. Bestandenes Modul und anerkannte Leistung dürfen für dieselbe Modulzuordnung **nicht doppelt** zählen. Dafür braucht es eindeutige Constraints bzw. deduplizierte Berechnung.
4. **Nicht gewählte** Wahloptionen zählen weder zu erworbenen Credits noch als verpflichtend offen.
5. Eine Wahloption zählt erst, wenn sie für den Studiengang tatsächlich gewählt und anschließend mit anrechenbarem Abschluss-/Anerkennungsvorgang bestätigt wurde.
6. Wenn mehrere Nachweise dasselbe Lernergebnis abdecken, muss die Zuordnung vor Aggregation geklärt werden.
7. Der angezeigte Fortschritt basiert auf qualifizierten, bestätigten Credits. Prozent = `min(100, credits_earned / required_credits * 100)`; bei Zielwert 0 wird kein Prozentwert gebildet.
8. Die Visualisierung zeigt **0 bis Soll-Credits** als Skala. Hauptwert: `erreicht / Soll`; Prozent sekundär.
9. Ein formaler Zulassungscheck darf nicht allein aus einem globalen Status `Erledigt` abgeleitet werden.

## Roadmap und Abhängigkeiten

Zwei strikt verschiedene Regelklassen:

- **recommended:** Fachlich sinnvoller Vorgänger, aber keine formale Sperre.
- **required:** Verbindliche Vorgabe mit prüfbarer Regel und benannter Quelle/Version; bis zur Validierung nicht automatisch als Rechts-/Prüfungsfreigabe ausgeben.

Beispielsynthetik: Das Modul `ADV-200` empfiehlt `BAS-100`. Ein separates Abschlussprojekt kann eine konfigurierbare Mindestcredit-Regel und den Nachweis bestimmter Module haben. Diese Beispiele sind fiktiv.

Abhängigkeiten bilden einen gerichteten Graphen; Zyklen müssen erkannt und abgewiesen oder sichtbar markiert werden. Änderungen von Voraussetzungen erzeugen nachvollziehbare Aktualisierungen.

## Import / Export

- Möglicher Import: CSV/JSON mit Feldzuordnung, Vorschau, Gültigkeitsprüfung und Konfliktbericht.
- Export: dokumentiertes, vollständiges Nutzerdatenformat mit Schema-Version; optional Markdown für Notizen.
- Kein automatischer Import fremder Daten aus GitHub oder Notion ohne ausdrückliche Nutzeraktion.
- Keine echten Universitätsunterlagen, Noten oder Datendumps als Testfixtures im öffentlichen Repository.
- Datenmigration aus anderen Systemen ist ein **späteres** optionales Werkzeug und kein Kernbestandteil der Architektur.
