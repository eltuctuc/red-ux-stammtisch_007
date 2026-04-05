---
status: approved
---

# FEAT-4: Watchlist-Sidebar

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
