---
status: approved
---

# FEAT-2: Portfolio-Übersicht

## Fortschritt
Status: Done
Aktueller Schritt: QA
Fix-Schwelle: Medium
Fix-Schwelle bestätigt: 2026-04-05

## Abhängigkeiten
- Benötigt: FEAT-1 (App-Header) – Dark/Light Mode Theme muss global verfügbar sein

---

## 1. Feature Spec
*Ausgefüllt von: /red:proto-requirements — 2026-04-05*

### Beschreibung
Hero-Karte mit Gesamtportfoliowert, 24h-Änderung in Prozent und Absolutbetrag sowie einem Sparkline-Mini-Chart der letzten 7 Tage. Erste Information die der Nutzer beim Öffnen des Dashboards sieht.

### Definitionen
- **Sparkline:** Kompakter Linien-Chart ohne Achsenbeschriftung, der nur den Trend visualisiert
- **24h-Änderung:** Differenz des Portfoliowerts zwischen vor 24 Stunden und jetzt, in % und USD
- **Glassmorphism-Karte:** Container mit backdrop-filter blur, halbtransparentem Hintergrund und subtiler Border

### User Stories
- Als Nutzer sehe ich meinen Gesamtportfoliowert auf einen Blick, ohne scrollen zu müssen
- Als Nutzer sehe ich die 24h-Änderung farblich kodiert (grün/rot), um sofort die Performance einzuschätzen
- Als Nutzer sehe ich eine Sparkline, um den groben Trend der letzten Tage visuell zu erfassen
- Als Mobile-Nutzer sehe ich die Karte vollständig ohne horizontales Scrollen

### Acceptance Criteria
- [ ] Gesamtwert in USD mit korrekter Formatierung (Tausender-Trenner, 2 Dezimalstellen)
- [ ] 24h-Änderung zeigt Prozentsatz UND Absolutbetrag
- [ ] Positive Änderung: grüne Farbe, negative Änderung: rote Farbe
- [ ] Sparkline-Chart mit Mock-Daten der letzten 7 Tage ist sichtbar
- [ ] Karte hat Glassmorphism-Styling mit Hover-Animation
- [ ] Realistische Mock-Daten (kein "12345.00 USD")

### Edge Cases
- **Negativer Portfolio-Tag:** Negative 24h-Änderung wird korrekt mit Minus-Zeichen und roter Farbe angezeigt
- **Großer Wert:** Werte über 1.000.000 USD brechen das Layout nicht
- **Minimale Datenpunkte:** Sparkline rendert korrekt auch bei wenigen Datenpunkten

### Nicht im Scope
- Klickbare Vergrößerung der Sparkline
- Zeitraum-Auswahl (7d / 30d / 1y)
- Echte API-Daten
- Asset-Aufschlüsselung (Allocation-Donut)

---

## 2. UX Entscheidungen
*2026-04-05*

### Einbettung im Produkt
Erste Section nach Header, im Desktop-Grid links (2/3 Breite), auf Mobile volle Breite | Route: `/`

### Einstiegspunkte
App-Start → S-01 Dashboard → Portfolio-Karte ist der erste sichtbare Content nach dem Header

### User Flow
Dashboard öffnen → Gesamtwert sofort sichtbar → 24h-Änderung farblich lesen → Sparkline-Trend erfassen

### Interaktionsmuster
- Primärmuster: Statische Datenkarte mit Hover-Animation (kein Klick-Ziel)
- Fehler-Handling: Nicht anwendbar (Mock-Daten)
- Leerer Zustand: Nicht anwendbar
- Ladeverhalten: Nicht anwendbar (synchrone Mock-Daten)

### Eingesetzte Komponenten
| Komponente | DS-Status | Quelle |
|------------|-----------|--------|
| Glassmorphism-Karte (backdrop-blur, border) | ⚠ Tokens-Build | Kein DS vorhanden |
| Gesamtwert-Display (große Schrift, Intl.NumberFormat) | ⚠ Tokens-Build | Kein DS vorhanden |
| Trend-Badge (Pfeil-Icon + %, + USD) | ⚠ Tokens-Build | Kein DS vorhanden |
| Sparkline (Recharts LineChart, 120×60px, keine Achsen) | ⚠ Tokens-Build | Recharts |

### Navigation nach Aktionen (verbindlich)
| Ausgangs-Screen | Aktion | Ziel | Bedingung |
|-----------------|--------|------|-----------|
| S-01 Dashboard | Hover über Karte | Hover-Animation in-place | – |

### DS-Status
- Tokens-Build (genehmigt): Alle Komponenten

### Barrierefreiheit (A11y)
- Keyboard: Karte ist kein Tab-Ziel (rein informativ)
- Screen Reader: Gesamtwert als `<h2>` lesbar; Sparkline: `role="img" aria-label="7-Tage Trend: leicht steigend"`
- 24h-Änderung: Farbe + Text kombiniert (nicht nur Farbe)

### Mobile-Verhalten
- Volle Breite, Sparkline rechts neben Textwerten
- Karte kompakter: Gesamtwert in etwas kleinerer Schrift auf Mobile
- Kein horizontales Scrollen

---

## 3. Technisches Design
*2026-04-05*

### State-Komplexität
State-Komplexität geprüft – kein State Machine erforderlich. Statische Mock-Daten, kein User-Input.

### Daten-Validation
Nicht anwendbar – Daten sind hartcodierte Konstanten in `src/data/mockPortfolio.ts`.

### Component-Struktur
```
PortfolioCard
├── PortfolioValue     (Gesamtwert formatiert, Intl.NumberFormat)
├── TrendBadge         (Pfeil-Icon + % + USD, grün/rot)
└── PortfolioSparkline (Recharts LineChart, 120×60px, keine Achsen)
```

ThemeContext wird via Tailwind `dark:` Klassen konsumiert – kein direkter Context-Import nötig.

### Daten-Model
Mock-Konstante in `src/data/mockPortfolio.ts`:
- `totalValue: number` (z.B. 84_231.57)
- `change24hPercent: number` (z.B. +3.42)
- `change24hUSD: number` (z.B. +2_783.19)
- `sparklineData: Array<{ day: string, value: number }>` (7 Einträge)

### API / Daten-Fluss
Nicht anwendbar – synchrone Mock-Daten.

### Tech-Entscheidungen
- **Intl.NumberFormat:** Locale-aware USD-Formatierung statt manueller String-Manipulation
- **Recharts Sparkline ohne Achsen:** `<LineChart>` mit `XAxis hide` + `YAxis hide` – minimaler Chart-Overhead
- **Positive/Negative Farbe via ternary:** `change24hPercent >= 0 ? 'text-emerald-400' : 'text-red-400'`

### Security-Anforderungen
Nicht anwendbar – keine Nutzerdaten, kein Backend.

### Dependencies
- `recharts` – Sparkline

### A11y-Architektur

| Element | ARIA-Pattern | Entscheidung |
|---------|-------------|--------------|
| Karte | Kein interaktives Element | `<article>` oder `<section>` mit beschreibendem Heading |
| Gesamtwert | Lesbar als Text | `<h2>` oder `<p>` mit `aria-label` |
| Sparkline | `role="img"` | `aria-label="7-Tage Portfolio-Trend: leicht steigend"` |
| TrendBadge | Farbe + Text | Text bleibt auch ohne Farbe verständlich |

### Test-Setup
- Unit: `TrendBadge` – rendert grün bei positiver Änderung, rot bei negativer
- Unit: `PortfolioValue` – formatiert 84231.57 korrekt als "$84,231.57"
- Unit: `PortfolioSparkline` – rendert ohne Fehler mit validen Mock-Daten

### Test-Infrastruktur
- Environment: happy-dom
- Mocks: Recharts-SVG-Render via `@testing-library/react` (SVG-Output in happy-dom eingeschränkt)
- Fallstrick: Recharts ResizeObserver braucht Mock in Test-Umgebung: `vi.stubGlobal('ResizeObserver', ResizeObserverMock)`

### Datei-Pfade
- `projekt/src/components/PortfolioCard.tsx`
- `projekt/src/components/TrendBadge.tsx`
- `projekt/src/components/PortfolioSparkline.tsx`
- `projekt/src/data/mockPortfolio.ts`

---

## 4. Implementierung
*2026-04-05*

### Implementierte Dateien
- `projekt/src/data/mockPortfolio.ts` – Mock-Konstante: totalValue, change24hPercent, change24hUSD, sparklineData (7 Punkte)
- `projekt/src/components/TrendBadge.tsx` – Pfeil-Icon + % + USD, grün/rot via ternary
- `projekt/src/components/PortfolioSparkline.tsx` – Recharts LineChart 120×60px, YAxis hide, kein XAxis, role="img" aria-label
- `projekt/src/components/PortfolioCard.tsx` – Glassmorphism-Container, flex-Layout, integriert alle Sub-Komponenten
- `projekt/src/App.tsx` – 3-Spalten-Grid, PortfolioCard in md:col-span-2

### Installierte Dependencies
- `recharts@3.8.1` (war bereits vorhanden)

### Offene Punkte / Tech-Debt
- Chunk-Size-Warnung durch recharts (erwartet für Prototype)

---

## 5. QA Ergebnisse
*2026-04-05*

### Acceptance Criteria Status
- [x] AC-1: Gesamtwert USD-Formatierung korrekt ✅
- [x] AC-2: 24h-Änderung zeigt % UND Absolutbetrag ✅
- [x] AC-3: Positive grün / negative rot ✅
- [x] AC-4: Sparkline mit 7 Mock-Datenpunkten sichtbar ✅
- [x] AC-5: Glassmorphism-Styling mit Hover-Animation ✅
- [x] AC-6: Realistische Mock-Daten ✅

### Security: Nicht anwendbar | A11y: 4 Bugs gefunden, alle gefixt

### Gefixte Bugs (Medium+)
- BUG-FEAT2-QA-004-fixed – TrendBadge: Vorzeichen-Logik via Math.abs + konsistenter sign (High)
- BUG-FEAT2-QA-001-fixed – Sparkline aria-label dynamisch (steigend/fallend) (Medium)
- BUG-FEAT2-QA-002-fixed – article aria-label="Portfolio-Gesamtwert" (Medium)
- BUG-FEAT2-UX-002-fixed – Header "Cryptofolio" auf h1 gehoben (Medium)
- BUG-FEAT2-UX-003-fixed – TrendBadge aria-label mit vollem Trendtext (Medium)

### Known Issues (unter Fix-Schwelle)
- BUG-FEAT2-QA-003 – Gesamtwert > $1M truncate auf Mobile (Low)
- BUG-FEAT2-UX-004 – XAxis in Sparkline nicht explizit hidden (Low)
- BUG-FEAT2-UX-005 – truncate ohne Screenreader-Hinweis (Low)

### Summary
- ✅ 6/6 ACs passed | 5 Bugs gefixt (1 High, 4 Medium) | 3 Known Issues (Low)

### Production-Ready
✅ Ready
