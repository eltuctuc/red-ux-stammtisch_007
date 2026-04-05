---
status: approved
---

# FEAT-4: Watchlist-Sidebar

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
Seitenleiste mit 6 Kryptowährungen, jeweils mit Symbol, Name, aktuellem Preis, 24h-Änderung und einer Mini-Sparkline. Gibt dem Nutzer einen schnellen Überblick über die wichtigsten Assets.

### Definitionen
- **Watchlist:** Feste Liste von 6 vordefinierten Kryptowährungen (Mock-Daten, nicht editierbar)
- **Mini-Sparkline:** Kompakter Trend-Chart pro Asset ohne Achsenbeschriftung, ca. 60-80px Breite
- **24h-Änderung:** Prozentualer Preiswechsel der letzten 24 Stunden

### User Stories
- Als Nutzer sehe ich 6 Kryptos in der Sidebar, um meinen Watchlist-Überblick zu behalten
- Als Nutzer erkenne ich für jede Krypto sofort ob sie positiv oder negativ läuft (Farbe)
- Als Nutzer sehe ich eine Mini-Sparkline pro Krypto, um den Trend schnell zu erfassen
- Als Mobile-Nutzer ist die Sidebar als horizontale Liste oder unter dem Chart angeordnet

### Acceptance Criteria
- [ ] Genau 6 Kryptowährungen (BTC, ETH, SOL, ADA, MATIC, DOT) mit realistischen Mock-Preisen
- [ ] Jede Krypto zeigt: Symbol, Name, Preis (USD), 24h-Änderung (% + Farbe), Sparkline
- [ ] Positive 24h-Änderung: grüne Farbe, negative: rote Farbe
- [ ] Jede Krypto-Karte hat Hover-Animation
- [ ] Glassmorphism-Styling auf Sidebar-Container und einzelnen Karten
- [ ] Responsive: Sidebar unterhalb des Haupt-Charts auf Mobile

### Edge Cases
- **Null-Änderung:** Krypto mit exakt 0% 24h-Änderung hat neutrale Farbe (grau/weiß)
- **Langer Name:** Langer Krypto-Name oder -Symbol bricht das Layout nicht
- **Negativer Trend:** Sparklines mit negativem Trend zeigen fallende, nicht steigende Linie

### Nicht im Scope
- Kryptos hinzufügen oder entfernen
- Klick auf Krypto öffnet Detail-View
- Live-Preise via API
- Sortierung nach Performance

---

## 2. UX Entscheidungen
*2026-04-05*

### Einbettung im Produkt
Desktop: Rechte Spalte (~35% Breite) in `grid grid-cols-[2fr_1fr]` Layout | Route: `/`
Mobile: Horizontal scrollbare Karten-Reihe (`flex overflow-x-auto snap-x`) unter dem Preis-Chart

### Einstiegspunkte
App-Start → S-01 Dashboard → Watchlist immer sichtbar (Desktop: rechts neben Chart; Mobile: nach Chart)

### User Flow
Dashboard öffnen → Watchlist-Karten scannen → 24h-Änderung per Farbe + Badge erkennen → Sparkline-Trend ablesen

### Interaktionsmuster
- Primärmuster: Vertikale Karten-Liste (Desktop) / Horizontales Scroll-Deck (Mobile)
- Hover-Animation: `transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg`
- Fehler-Handling: Nicht anwendbar (Mock-Daten)
- Leerer Zustand: Nicht anwendbar (exakt 6 Kryptos, immer gefüllt)

### Eingesetzte Komponenten
| Komponente | DS-Status | Quelle |
|------------|-----------|--------|
| Watchlist Container (Sidebar / HScroll) | ⚠ Tokens-Build | Kein DS vorhanden |
| Crypto-Karte (Glassmorphism, Hover-Animation) | ⚠ Tokens-Build | Kein DS vorhanden |
| Mini-Sparkline (Recharts LineChart, 80×40px) | ⚠ Tokens-Build | Recharts |
| 24h-Badge (grün/rot/grau, Pfeil-Icon) | ⚠ Tokens-Build | Kein DS vorhanden |

### Navigation nach Aktionen (verbindlich)
| Ausgangs-Screen | Aktion | Ziel | Bedingung |
|-----------------|--------|------|-----------|
| S-01 Dashboard | Hover über Krypto-Karte | Hover-Animation in-place | – |
| S-01 Dashboard | Klick auf Krypto-Karte | Keine Navigation | Out of Scope laut FEAT-4 |

### DS-Status
- Tokens-Build (genehmigt): Alle Komponenten

### Barrierefreiheit (A11y)
- Keyboard: Container: `role="list" aria-label="Watchlist"`, jede Karte: `role="listitem"`
- Screen Reader: Badge-Text immer vorhanden (nicht nur Farbe): "+2.4%" ist lesbar; "0%" → graue Farbe + Text "0.0%"
- Touch-Target: Karten auf Mobile min. 44px Höhe

### Mobile-Verhalten
- `flex overflow-x-auto snap-x snap-mandatory` – jede Karte snappt
- Karten-Breite auf Mobile: ~160px (min-width), vertikal nicht scrollend
- Kein seitenweiter horizontaler Overflow

---

## 3. Technisches Design
*2026-04-05*

### State-Komplexität
State-Komplexität geprüft – kein State Machine erforderlich. Rein statische Liste, keine Interaktion.

### Daten-Validation
Nicht anwendbar – Daten sind hartcodierte Konstanten in `src/data/mockWatchlist.ts`.

### Component-Struktur
```
WatchlistSidebar
└── WatchlistCard (×6, gemappt aus mockWatchlist)
    ├── CryptoHeader   (Symbol + Name)
    ├── PriceDisplay   (USD-Preis)
    ├── TrendBadge     (wiederverwendet aus FEAT-2)
    └── MiniSparkline  (Recharts LineChart, 80×40px)
```

Desktop: vertikale Liste (`flex flex-col gap-3`)
Mobile: horizontales Scroll-Deck (`flex overflow-x-auto snap-x snap-mandatory`)

### Daten-Model
Mock-Konstante in `src/data/mockWatchlist.ts`:
```
Array<{
  symbol: string,       // "BTC"
  name: string,         // "Bitcoin"
  price: number,        // 67_423.18
  change24h: number,    // +2.34 (%)
  sparkline: number[]   // [67200, 67800, 67100, ...] (10 Werte)
}>
```
6 Einträge: BTC, ETH, SOL, ADA, MATIC, DOT

### API / Daten-Fluss
Nicht anwendbar – synchrone Mock-Daten.

### Tech-Entscheidungen
- **TrendBadge wiederverwendet aus FEAT-2:** Gleiche Logik (grün/rot/grau), kein Duplikat
- **MiniSparkline als eigene Komponente:** Andere Props als PortfolioSparkline (nur number[], nicht {day,value}[])
- **snap-x auf Mobile:** Jede Karte snappt sauber – kein partielles Scrollen sichtbar

### Security-Anforderungen
Nicht anwendbar.

### Dependencies
- `recharts` – MiniSparkline

### A11y-Architektur

| Element | ARIA-Pattern | Entscheidung |
|---------|-------------|--------------|
| Container | `role="list"` | `aria-label="Watchlist"` |
| Karte | `role="listitem"` | Implizit via `<li>` wenn `<ul>` genutzt |
| MiniSparkline | `role="img"` | `aria-label="[Name] Trend: [steigend/fallend]"` |
| TrendBadge | Text + Farbe | Farbe ist nicht alleiniges Signal |

### Test-Setup
- Unit: WatchlistCard – rendert Symbol, Name, Preis, Badge korrekt für BTC-Mock-Daten
- Unit: TrendBadge (geteilt mit FEAT-2 – bereits getestet)
- Unit: MiniSparkline – rendert ohne Fehler mit 10 Datenpunkten

### Test-Infrastruktur
- Environment: happy-dom
- Mocks: ResizeObserver-Mock

### Datei-Pfade
- `projekt/src/components/WatchlistSidebar.tsx`
- `projekt/src/components/WatchlistCard.tsx`
- `projekt/src/components/MiniSparkline.tsx`
- `projekt/src/data/mockWatchlist.ts`

---

## 4. Implementierung
*2026-04-05*

### Implementierte Dateien
- `projekt/src/data/mockWatchlist.ts` – 6 WatchlistEntry-Objekte (BTC/ETH/SOL/ADA/MATIC/DOT) mit price, change24h, sparkline[10]
- `projekt/src/components/MiniSparkline.tsx` – Recharts LineChart 80×40px, trend-basierte Farbe (grün/rot/grau), role="img" aria-label
- `projekt/src/components/WatchlistCard.tsx` – `<li>` mit Symbol, Name, formatPrice(), inline ChangeTag (grün/rot/grau + TrendingUp/Down/Minus), MiniSparkline; Hover-Animation
- `projekt/src/components/WatchlistSidebar.tsx` – Glassmorphism-Wrapper, `<ul role="list">`, Desktop: flex-col, Mobile: flex-row overflow-x-auto snap-x
- `projekt/src/App.tsx` – rechte Spalte md:col-span-1 ergänzt mit WatchlistSidebar

### Installierte Dependencies
- `recharts@3.8.1` (bereits vorhanden)
- `lucide-react@1.7.0` (bereits vorhanden)

### Offene Punkte / Tech-Debt
- TrendBadge aus FEAT-2 nicht wiederverwendet (zeigt USD, zu breit für Kompaktkarte) – eigene Inline-Lösung
- formatPrice() direkt in WatchlistCard (kein separater Formatter-Util)

---

## 5. QA Ergebnisse
*2026-04-05*

### Acceptance Criteria Status
- [x] AC-1: Genau 6 Kryptos (BTC/ETH/SOL/ADA/MATIC/DOT) mit realistischen Preisen ✅
- [x] AC-2: Symbol, Name, Preis, 24h-Änderung (% + Farbe), Sparkline ✅
- [x] AC-3: Positiv grün, negativ rot ✅
- [x] AC-4: Hover-Animation (scale-[1.02], shadow-md) ✅
- [x] AC-5: Glassmorphism auf Container und Karten ✅
- [x] AC-6: Responsive – Mobile horizontal scroll ✅

### Security: Nicht anwendbar | A11y: 3 Bugs gefunden, alle gefixt

### Gefixte Bugs (Medium+)
- BUG-FEAT4-QA-003-fixed / UX-001-fixed – ChangeTag: sign '-' für negativ + sr-only statt aria-label auf div (High)
- BUG-FEAT4-UX-003-fixed – DOT-Sparkline: klar fallende Kurve, kein Aufwärtshaken am Ende (High)
- BUG-FEAT4-QA-002-fixed / UX-002-fixed – div-Wrapper zwischen ul+li entfernt; snap-Klassen auf li (Medium)
- BUG-FEAT4-QA-001-fixed – formatPrice(): minimumFractionDigits 3 → 4 für ADA/MATIC (Medium)
- BUG-FEAT4-UX-004-fixed – min-w-[185px] statt [200px]: bei 375px Viewport 3. Karte angeschnitten sichtbar (Medium)

### Known Issues (unter Fix-Schwelle)
- BUG-FEAT4-UX-005 – Hover: scale-[1.02]/shadow-md leicht abweichend von PortfolioCard scale-[1.01]/shadow-lg (Low)

### Summary
- ✅ 6/6 ACs passed | 7 Bugs gefixt (2 High, 5 Medium) | 1 Known Issue (Low)

### Production-Ready
✅ Ready
