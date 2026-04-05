---
status: approved
---

# FEAT-3: Interaktiver Preis-Chart

## Fortschritt
Status: Approved
Aktueller Schritt: Tech
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

---

## 3. Technisches Design
*2026-04-05*

### State-Komplexität
State-Komplexität geprüft – kein State Machine erforderlich. Statische Mock-Daten, Recharts verwaltet Tooltip-State intern.

### Daten-Validation
Nicht anwendbar – Daten sind hartcodierte Konstanten in `src/data/mockPriceHistory.ts`.

### Component-Struktur
```
PriceChart
├── ChartHeader        (Asset-Name "Bitcoin (BTC)" + Zeitraum-Label)
├── PriceAreaChart     (Recharts AreaChart + ResponsiveContainer)
│   ├── defs > linearGradient (SVG Gradient-Fill)
│   ├── XAxis          (Datum, jedes 5. Label)
│   ├── YAxis          (USD kompakt: "$45k")
│   ├── Tooltip        (Custom, Glassmorphism-Styling)
│   └── Area           (Linie + Gradient-Fill)
└── (kein Footer)
```

### Daten-Model
Mock-Konstante in `src/data/mockPriceHistory.ts`:
- `Array<{ date: string, price: number }>` – 90 Einträge (täglich)
- Preise mit simulierter Volatilität (kein linearer Anstieg)
- Generiert via einfacher Random-Walk-Formel (deterministisch mit festem Seed)

### API / Daten-Fluss
Nicht anwendbar – synchrone Mock-Daten.

### Tech-Entscheidungen
- **AreaChart statt LineChart:** Visuell stärker, Gradient-Fill unter der Linie = Premium-Look
- **Custom Tooltip-Komponente:** Glassmorphism-Styling möglich (Recharts Standard-Tooltip hat keine backdrop-filter-Unterstützung)
- **ResponsiveContainer width="100%":** Passt sich automatisch an Container an – kein JS-Resize-Handler nötig
- **Deterministischer Mock-Seed:** Gleiche Daten bei jedem Render – kein hydration-mismatch, stabile Tests

### Security-Anforderungen
Nicht anwendbar.

### Dependencies
- `recharts` – AreaChart, ResponsiveContainer, Tooltip

### A11y-Architektur

| Element | ARIA-Pattern | Entscheidung |
|---------|-------------|--------------|
| Chart-Container | `role="img"` | `aria-label="Bitcoin Preisverlauf der letzten 90 Tage"` |
| Tooltip | Nur visuell | Screen Reader liest aria-label des Containers |
| Achsen-Labels | Teil des SVG | Nicht per Tab erreichbar – akzeptabel für Showcase |

### Test-Setup
- Unit: PriceAreaChart – rendert ohne Console-Errors mit Mock-Daten
- Unit: Mock-Daten-Generator – produziert exakt 90 Einträge, alle prices > 0
- Integration: ResponsiveContainer passt sich in Container-Breite ein

### Test-Infrastruktur
- Environment: happy-dom
- Mocks: ResizeObserver-Mock (`vi.stubGlobal`), da ResponsiveContainer ResizeObserver nutzt

### Datei-Pfade
- `projekt/src/components/PriceChart.tsx`
- `projekt/src/components/PriceChartTooltip.tsx`
- `projekt/src/data/mockPriceHistory.ts`
