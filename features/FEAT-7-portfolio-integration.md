---
status: approved
---

# FEAT-7: Portfolio-Integration

## Fortschritt
Status: Spec
Aktueller Schritt: Spec
Fix-Schwelle: Critical

## Abhängigkeiten
- Benötigt: FEAT-6 (Portfolio-Seite) – mockPortfolioHoldings.ts + State müssen existieren
- Benötigt: FEAT-2 (Portfolio-Übersicht) – PortfolioCard wird erweitert
- Benötigt: FEAT-4 (Watchlist-Sidebar) – WatchlistCard erhält Highlight-Logik

---

## 1. Feature Spec
*Ausgefüllt von: /red:proto-requirements — 2026-04-05*

### Beschreibung
Erweiterung zweier bestehender Komponenten mit Portfolio-Daten aus FEAT-6: (1) PortfolioCard zeigt den berechneten Gesamtportfoliowert aus den Mock-Holdings. (2) WatchlistSidebar markiert Coins, die im Portfolio vorhanden sind, mit Icon und Border.

### Definitionen
- **Gesamtportfoliowert:** Summe(Menge × aktueller Mock-Preis) über alle Portfolio-Positionen
- **Portfolio-Coin in Watchlist:** Ein Watchlist-Eintrag, dessen Symbol in mockPortfolioHoldings vorkommt
- **Watchlist-Highlight:** Briefcase-Icon (cyan, 12 px) + linker Cyan-Border (2 px) auf der Coin-Zeile

### User Stories
- Als Nutzer sehe ich auf dem Dashboard den Gesamtwert meines Portfolios, ohne zur Portfolio-Seite wechseln zu müssen
- Als Nutzer erkenne ich in der Watchlist auf einen Blick, welche Coins ich halte
- Als Nutzer ist der Dashboard-Gesamtwert aktuell, auch wenn ich auf der Portfolio-Seite Coins hinzugefügt habe

### Acceptance Criteria
- [ ] Dashboard zeigt Gesamtportfoliowert (Summe Holdings × Mock-Preise) als eigene Kennzahl in PortfolioCard
- [ ] Gesamtwert reagiert auf neue Positionen, die via Modal (FEAT-6) hinzugefügt wurden (reaktiv via shared State oder Prop)
- [ ] Watchlist-Coins im Portfolio: Briefcase-Icon (cyan, 12 px) neben dem Coin-Symbol
- [ ] Watchlist-Coins im Portfolio: linker Cyan-Border (2 px) auf der gesamten Karte/Zeile
- [ ] Nicht-Portfolio-Watchlist-Coins: optisch unverändert

### Edge Cases
- **Coin im Portfolio, nicht in Watchlist:** Kann nicht eintreten – Dropdown erlaubt nur Watchlist-Coins
- **Leeres Portfolio:** Gesamtwert zeigt $0.00; Watchlist hat keine Highlights
- **Mehrere Positionen desselben Coins:** Highlight wird einmal angezeigt – kein doppeltes Icon

### Nicht im Scope
- Separate Portfolio-Karte auf dem Dashboard
- Watchlist-Sortierung nach Portfolio-Status
- Detailwerte (G/V) in der Watchlist-Zeile
- Interaktiver Klick auf Watchlist-Highlight
