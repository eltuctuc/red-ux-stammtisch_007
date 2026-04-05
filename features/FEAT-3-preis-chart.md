---
status: approved
---

# FEAT-3: Interaktiver Preis-Chart

## Fortschritt
Status: Approved
Aktueller Schritt: UX
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

---

## 2. UX Entscheidungen
*2026-04-05*

### Einbettung im Produkt
Prominente Section unter Portfolio-Übersicht | Route: `/`
Desktop: ~65% der Breite (neben Watchlist-Sidebar). Mobile: 100% Breite.

### Einstiegspunkte
App-Start → S-01 Dashboard → Chart nach Scrollen (oder sichtbar bei großem Viewport)

### User Flow
Dashboard öffnen → Chart sehen → Hover über Datenpunkte → Tooltip lesen → Maus verlassen → Tooltip weg

### Interaktionsmuster
- Primärmuster: Recharts AreaChart mit Custom Tooltip (Glassmorphism-Styling)
- Fehler-Handling: Nicht anwendbar (Mock-Daten synchron)
- Leerer Zustand: Nicht anwendbar
- Ladeverhalten: Nicht anwendbar

### Eingesetzte Komponenten
| Komponente | DS-Status | Quelle |
|------------|-----------|--------|
| Glassmorphism Card Wrapper | ⚠ Tokens-Build | Kein DS vorhanden |
| Recharts AreaChart + ResponsiveContainer | ⚠ Tokens-Build | Recharts |
| Custom Tooltip (glassmorphism, Datum + Preis) | ⚠ Tokens-Build | Recharts + Custom |
| SVG linearGradient Area Fill | ⚠ Tokens-Build | Recharts |
| Chart Title (Asset-Name + Symbol) | ⚠ Tokens-Build | Kein DS vorhanden |

### Navigation nach Aktionen (verbindlich)
| Ausgangs-Screen | Aktion | Ziel | Bedingung |
|-----------------|--------|------|-----------|
| S-01 Dashboard | Hover über Chart | Tooltip erscheint in-place | Maus im Chart-Bereich |
| S-01 Dashboard | Maus verlässt Chart | Tooltip verschwindet | – |

### DS-Status
- Tokens-Build (genehmigt): Alle Komponenten

### Barrierefreiheit (A11y)
- Keyboard: Chart ist kein Keyboard-Ziel (interaktiv nur via Maus/Touch)
- Screen Reader: `role="img" aria-label="Bitcoin Preisverlauf der letzten 90 Tage"`
- Tooltip: Nur visuell – Screen Reader liest stattdessen aria-label

### Mobile-Verhalten
- Height: 200px auf Mobile (`h-48`), 320px auf Desktop (`h-80`)
- ResponsiveContainer übernimmt automatisch die Breitenanpassung
- Chart rendert auf 320px ohne Overflow
