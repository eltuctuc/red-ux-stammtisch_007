---
status: approved
---

# FEAT-4: Watchlist-Sidebar

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
