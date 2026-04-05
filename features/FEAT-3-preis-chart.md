---
status: approved
---

# FEAT-3: Interaktiver Preis-Chart

## Fortschritt
Status: Approved
Aktueller Schritt: Spec
Fix-Schwelle: Critical

## Abhängigkeiten
- Benötigt: FEAT-1 (App-Header) – Dark/Light Mode Theme muss global verfügbar sein

---

## 1. Feature Spec
*Ausgefüllt von: /red:proto-requirements — 2026-04-05*

### Beschreibung
Vollständiger Recharts-Linien- oder Flächenchart für einen ausgewählten Asset mit Hover-Tooltips und Mock-Zeitreihendaten. Visuelles Herzstück des Dashboards.

### Definitionen
- **Hover-Tooltip:** Schwebendes Informationselement das Datum und Preis beim Hovern über einen Datenpunkt anzeigt
- **ResponsiveContainer:** Recharts-Wrapper der den Chart automatisch an die Containerbreite anpasst
- **Mock-Zeitreihendaten:** Generierte, realistische Preisdaten mit simulierter Volatilität

### User Stories
- Als Nutzer sehe ich den Preisverlauf eines Assets als interaktiven Chart
- Als Nutzer fahre ich mit der Maus über den Chart und sehe Preis und Datum im Tooltip
- Als Nutzer erkenne ich den Chart sofort als hochwertiges Fintech-Produkt-Element
- Als Mobile-Nutzer ist der Chart touch-responsive und rendert korrekt

### Acceptance Criteria
- [ ] Chart zeigt Preisverlauf mit mindestens 30 Mock-Datenpunkten
- [ ] Hover-Tooltip zeigt Datum und Preis in formatierter Form
- [ ] Chart-Achsen sind lesbar beschriftet (Datum X-Achse, USD Y-Achse)
- [ ] Chart hat Glassmorphism-Karten-Styling als Wrapper
- [ ] Chart rendert ohne Console-Errors
- [ ] Responsive: Chart passt sich der Container-Breite an (ResponsiveContainer)

### Edge Cases
- **Kleiner Screen:** Chart rendert auf 320px Breite ohne horizontalen Overflow
- **Tooltip-Verlassen:** Tooltip verschwindet korrekt wenn Maus den Chart-Bereich verlässt
- **Datenpunkt-Realismus:** Mock-Daten zeigen Volatilität, kein rein linearer Verlauf

### Nicht im Scope
- Zeitraum-Selector (1d / 7d / 1m / 1y)
- Asset-Wechsel via Dropdown
- Volumen-Chart als zweite Ebene
- Vergleichs-Chart (zwei Assets gleichzeitig)
