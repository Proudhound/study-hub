/** Public preview only. Every record below is invented for this prototype. */
export const demo = Object.freeze({
  program: "Beispielstudiengang",
  degree: "Demo · Bachelor",
  totalCredits: 120,
  earnedCredits: 30,
  modules: [
    { code: "DEMO-101", title: "Grundlagen digitaler Systeme", credits: 10, status: "Abgeschlossen", kind: "Pflicht" },
    { code: "DEMO-102", title: "Einführung in Datenmodelle", credits: 10, status: "Abgeschlossen", kind: "Pflicht" },
    { code: "DEMO-103", title: "Methoden und Gestaltung", credits: 10, status: "Abgeschlossen", kind: "Pflicht" },
    { code: "DEMO-201", title: "Projektmethoden", credits: 10, status: "In Arbeit", kind: "Pflicht" },
    { code: "DEMO-301", title: "Vertiefung A", credits: 10, status: "Nicht begonnen", kind: "Wahloption" },
    { code: "DEMO-302", title: "Vertiefung B", credits: 10, status: "Nicht gewählt", kind: "Wahloption" }
  ],
  tasks: [
    { title: "Lernziele für das nächste Modul sichten", time: "20 Min", kind: "Niedrige Energie" },
    { title: "Beispielaufgaben bearbeiten", time: "45 Min", kind: "Mittlere Energie" },
    { title: "Offene Fragen sortieren", time: "15 Min", kind: "Niedrige Energie" }
  ]
});
