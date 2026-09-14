# Learning Stack – Kandidaten

Status: **Vormerkung / Diskussion, noch keine feste Architektur**

## Zielbild

Jedes Fach bzw. Modul soll später als eigener Lernkontext funktionieren. Ausgangsmaterialien können dort gesammelt und anschließend mit KI-Werkzeugen in aktive Lernformen überführt werden.

Beispiel:

`Modulmaterial -> strukturierte Themen -> Erklärungen -> Diskussion / Fragen -> Quiz / Active Recall -> Wiederholung -> Prüfungsvorbereitung`

## 1. OpenMAIC

Vorgemerkt als besonders interessanter Kandidat für modulbezogene Lernumgebungen.

Potenzielle Nutzung:

- PDFs / Skripte / Folien als Ausgangsmaterial
- Thema oder Modul in einen strukturierten Kurs überführen
- KI-Dozent / Whiteboard
- Quiz und Übungen
- Diskussion mit mehreren Lernagenten
- länger laufende Lern-Sessions

Noch zu klären:

- sinnvoller Betriebsmodus
- benötigte Modelle / Kosten
- lokaler vs. Cloud-Betrieb
- Umgang mit Copyright-/Hochschulunterlagen
- wie eng es an einzelne Modulordner gekoppelt werden soll

## 2. AI Teaching Agent Team

Aus `Shubhamsaboo/awesome-llm-apps` als zweiter Kandidat vormerken.

Mögliche Rolle:

- individuelle Lernpfade
- mehrere fachliche Perspektiven
- Fragen und Verständnischecks
- Aufbereitung eines Moduls nach Lernzielen

Vor Integration mit OpenMAIC vergleichen. Ziel ist **kein doppelter Lern-Stack**, sondern ein möglichst schlanker Aufbau.

## 3. Awesome-Repositories als Discovery-Quellen

Für neue Lernthemen können kuratierte Listen gezielt durchsucht werden, insbesondere:

- `sindresorhus/awesome`
- fachbezogene Awesome-Listen
- `Shubhamsaboo/awesome-llm-apps`

Nicht als Dauerprozess, sondern dann, wenn für ein neues Fach oder Thema geeignete Ressourcen / Tools gesucht werden.

## 4. Open Design

`nexu-io/open-design` vormerken für spätere Lern- und Studienartefakte:

- Diagramme und visuelle Erklärungen
- Präsentationen
- UI-/UX-Übungen
- ggf. Projekt-/Pitch-Unterlagen im Studium

Kein Kernbestandteil des Lernsystems.

## 5. Modul-Autonomie als Leitprinzip

Später prüfen, ob jeder Modulordner mindestens enthalten soll:

- Lernziele
- Quellen / Originalmaterial
- eigene Notizen
- Fragen / offene Punkte
- generierte Zusammenfassungen
- Quiz / Active Recall
- Wiederholungsplan
- Prüfungsvorbereitung
- ggf. modulbezogene KI-Konfiguration

Diese Struktur ist **noch nicht beschlossen** und wird vor der breiten Anlage von Modulordnern gemeinsam festgelegt.

## Offene Entscheidungen

1. Top-Level-Struktur des Repositories
2. Standard für Modulordner
3. Dateinamen und Metadaten
4. Umgang mit großen Dateien / PDFs
5. OpenMAIC vs. AI Teaching Agent vs. Kombination
6. Lernkarten / Spaced Repetition
7. Web-App für Prüfungsvorbereitung
8. Trennung zwischen offiziellen Studienmodulen und freien Lernthemen
9. Grundstudium / Weiterbildung / Master als Kategorien oder Metadaten
10. Wiederverwendbare Prompts / Skills für Lernen und Prüfungsvorbereitung
