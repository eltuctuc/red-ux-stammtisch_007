---
status: approved
scope-typ: klickbarer-prototyp
erstellt: 2026-04-05
---

# Product Requirements Document
*Erstellt: 2026-04-05*

## Vision
Cryptofolio ist ein visueller Showcase eines Premium-Krypto-Portfolio-Dashboards – gebaut als klickbarer Prototyp für Entwickler und Designer, die einen modernen Fintech-UI-Stack demonstrieren wollen.

## Zielgruppe
Primär: Enrico selbst – als Showcase-Stück für Präsentationen, Portfolio oder UX-Stammtisch-Demo.
Sekundär: Betrachter des Showcases (Kollegen, Kunden, Community).

## Kernproblem
Krypto-Dashboards sehen entweder nach 2017 aus oder sind mit Abhängigkeiten überladen. Dieser Showcase beweist: Mit React + Vite + TailwindCSS + Recharts lässt sich ein visuell überzeugender, moderner Fintech-Look ohne UI-Library-Overhead erzielen.

## Scope-Typ
Klickbarer Prototyp – keine echte Logik, keine API-Calls, rein visueller Showcase.

## Scope (In)
- Header: App-Name "Cryptofolio", Suchleiste (optisch, kein echtes Filtering), Dark/Light Mode Toggle
- Portfolio-Übersicht: Gesamtwert, 24h-Änderung, Sparkline-Mini-Chart
- Interaktiver Preis-Chart via Recharts mit Hover-Tooltips
- Watchlist-Sidebar: 6 Kryptos mit Preis, 24h-Änderung, Sparkline
- Letzte Transaktionen: Tabelle mit 5 Mock-Einträgen
- Dark Theme als Standard, Glassmorphism-Karten
- Hover-Animationen auf allen Karten
- Responsive Layout für Mobile und Desktop
- Realistische Mock-Daten (keine API-Calls)
- Stack: React + Vite + TailwindCSS + Recharts

## Out-of-Scope
- Echte API-Anbindung (Binance, CoinGecko etc.)
- Authentifizierung / User Accounts
- Portfolioverwaltung (CRUD für Transaktionen)
- Echtes Filtering in der Suchleiste
- Allocation-Charts, P&L per Asset – bewusst ausgelassen

## Erfolgskriterien
- Visuell sofort als "Premium Fintech" erkennbar
- Alle 10 Anforderungen vollständig umgesetzt
- Läuft ohne Fehler im Browser, keine Console-Errors
- Mobilansicht funktional und ansprechend

## Offene Fragen
- Keine – Scope ist durch den Prototyp-Charakter vollständig abgedeckt
