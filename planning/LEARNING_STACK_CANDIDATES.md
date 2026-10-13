# Optionale Lern- und KI-Integrationen

Status: **Kandidatenliste für spätere Produktentwicklung**; kein Bestandteil des MVP und keine aktive Integration.

Der Kern von Study Hub funktioniert ohne KI, ohne Hochschul-API und ohne externe Cloud. Zusätzliche Lerntechnologien sollen hinter einer austauschbaren Integrationsschnittstelle angebunden werden, nicht als Zwang zur Nutzung bestimmter Anbieter.

## Bewertungskriterien für jeden Kandidaten

- Unterstützte Funktionen (Erklärungen, Quiz, Active Recall, Kursaufbereitung)
- Technische Integrationsform (API, SDK, MCP, eingebetteter Dienst)
- Betrieb lokal oder extern, Datenfluss und Nutzerzustimmung
- Hardwarebedarf und laufende Kosten
- Lizenz, Weiterverwendung und Sicherheit
- Wartungszustand, Versionskompatibilität und Update-Aufwand
- Tests mit **synthetischen** Daten; keine echten Lernunterlagen in öffentlichen Testfällen

## 1. OpenMAIC

Als zu evaluierender Ansatz für modulbezogene interaktive Erklärungen, Whiteboards und Quiz. **Keine zugesagte API-Kompatibilität oder Self-Hosting-Eignung** ohne technischen Proof of Concept. Zu prüfen: Abhängigkeiten, Lizenzen, Infrastrukturbedarf, Datenschutz und Nutzererlebnis.

## 2. AI Teaching Agent Team

Konzeptioneller Kandidat für adaptive Lernfragen und mehrere Erklärperspektiven; Inspirationsquelle: `Shubhamsaboo/awesome-llm-apps`. Vor einem Einsatz müssen Implementierung, Lizenz, Wartung und sichere Datengrenzen konkret verifiziert werden.

## 3. Kuratierte Discovery-Quellen

Listen wie `sindresorhus/awesome` oder fachbezogene Awesome-Listen können bei einer Recherche helfen. Sie sind keine produktive Komponente und werden nicht automatisiert in die App eingebunden.

## 4. Open Design / Visualisierung

Tools wie `nexu-io/open-design` sind höchstens Inspirations- oder Evaluierungskandidaten für visuelle Lernartefakte. Kein Kernbestandteil und keine zugesagte Integration.

## Architekturprinzip

```text
Study-Hub-Domäne
  └─ Optionales AI/Learning-Plugin-Interface
       ├─ lokaler Provider (optional)
       ├─ externer Provider (nur nach Freigabe)
       └─ keine KI (vollständig funktionsfähiger Standard)
```

Die privaten Daten verbleiben in der Nutzerinstanz. Für die Verarbeitung durch externe Anbieter ist eine getrennte, verständliche Einwilligung bzw. Freigabe je Datenfluss erforderlich. Jeder KI-Ausgabeweg muss nachvollziehbar sein.

**Bewusste Abgrenzung:** Keine persönlichen Modulordner, Skripte, Prüfungsdaten, API-Tokens oder automatischen Dokumenten-Uploads in diesem öffentlichen Repository.
