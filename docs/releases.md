# Release Notes

## v0.5.0 *(2026-04-05)*

### Neue Features
- **FEAT-5: Transaktionshistorie** – 5 Mock-Transaktionen als Datentabelle (BTC/ETH/SOL/ADA/DOT). Spalten: Datum, Asset, Typ-Badge (Kauf/Verkauf grün/rot), Menge, Preis/Einheit, Gesamtbetrag. Mobile: horizontal scrollbar mit Fade-Gradient-Hint, kein seitenweiter Overflow.

### Bug Fixes (FEAT-5)
- QA-001: ADA-Menge `2,500` → `2,500.00` – `minimumFractionDigits: 2` auf ≥100-Zweig in `formatAmount()`
- QA-002/UX-007: Spaltenköpfe Dark Mode `dark:text-gray-500` → `dark:text-gray-400` (WCAG AA konform)
- UX-001: Hover-Highlight Opacity 2% → 5% Light / 6% Dark (wahrnehmbar, im Glassmorphism-Stil)
- UX-002/QA-004: Badge-Text "Buy"/"Sell" → "Kauf"/"Verkauf" – konsistente deutsche UI, aria-label entfernt
- UX-003: Fade-Gradient rechts auf Mobile als Scroll-Affordanz
- UX-004: SR-Doppelankündigung behoben – `aria-labelledby` auf `<table>`, kein `<caption>` mehr

### Known Issues
- ETH 0.5 → "0.50000" (5 Dezimalstellen für normale Handelsmenge) (Low)
- Spaltenkopf "Typ" zu generisch (Low)
- Mock-Transaktionsbeträge alle im $1.000–$1.800-Korridor (Low)

## v0.4.0 *(2026-04-05)*

### Neue Features
- **FEAT-4: Watchlist-Sidebar** – 6 Kryptos (BTC/ETH/SOL/ADA/MATIC/DOT) mit Preis, 24h-Änderung (grün/rot/grau + Icon), Mini-Sparkline 80×40px. Desktop: vertikale rechte Spalte. Mobile: horizontaler Snap-Scroll (min-w-[185px] für Scroll-Hint).

### Bug Fixes (FEAT-4)
- QA-003/UX-001: ChangeTag Minus-Zeichen für negative Werte + sr-only statt wirkungslosem aria-label auf div
- UX-003: DOT-Sparkline durch konsistent fallende Daten ersetzt (kein Aufwärtshaken am Ende)
- QA-002/UX-002: div-Wrapper zwischen ul+li entfernt; snap/shrink-Klassen auf li verlegt
- QA-001: formatPrice() minimumFractionDigits 3→4 für ADA/MATIC ($0.4520 statt $0.452)
- UX-004: min-w-[185px] statt [200px] – dritte Karte auf Mobile angeschnitten sichtbar

### Known Issues
- Hover-Animation leicht abweichend zu PortfolioCard (scale-[1.02] vs scale-[1.01]) (Low)

## v0.3.0 *(2026-04-05)*

### Neue Features
- **FEAT-3: Interaktiver Preis-Chart** – Recharts AreaChart mit 90 deterministischen Mock-Datenpunkten, Cyan-Gradient-Fill, Custom Glassmorphism-Tooltip (Datum + Preis), kompakten Achsen. h-48 Mobile / h-80 Desktop. Eingebettet als zweites Element der linken Dashboard-Spalte (App.tsx Grid-Refactoring).

### Bug Fixes (FEAT-3)
- UX-002: AreaChart margin right auf 20px erhöht – Tooltip am rechten Rand nicht mehr abgeschnitten
- UX-001: Doppeltes aria-label entfernt – article ohne aria-label, role="img" div behält Label
- UX-003: AreaChart margin left auf 4px gesetzt – YAxis-Labels auf 320px Viewport nicht abgeschnitten

### Known Issues
- XAxis letzter Datenpunkt kein Label (interval=14 trifft Index 89 nicht) (Low)
- Tooltip Dark-Mode-Hintergrund hardcoded #1a1d27 (Low)
- Gradient-Fill im Dark Mode zu schwach (Low)

## v0.2.0 *(2026-04-05)*

### Neue Features
- **FEAT-2: Portfolio-Übersicht** – Glassmorphism Hero-Karte mit Gesamtportfoliowert (Intl.NumberFormat), farbkodierter 24h-Änderung (% + USD) und Sparkline der letzten 7 Tage (Recharts). Eingebettet als erstes sichtbares Element nach dem Header im 3-Spalten-Grid.

### Bug Fixes (FEAT-2)
- QA-004: TrendBadge Vorzeichen-Logik auf Math.abs umgestellt – Sign wird konsistent aus isPositive abgeleitet
- QA-001/UX-001: Sparkline aria-label ist jetzt dynamisch (steigend/fallend)
- QA-002: `<article>` hat aria-label="Portfolio-Gesamtwert"
- UX-002: Header-Logo "Cryptofolio" von `<span>` auf `<h1>` gehoben – korrekte Heading-Hierarchie
- UX-003: TrendBadge hat aria-label mit vollständigem Trendtext

### Known Issues
- Gesamtwert > $1M auf Mobile durch `truncate` abgeschnitten (Low)
- Sparkline XAxis nicht explizit hidden (Low)

## v0.1.0 *(2026-04-05)*

### Neue Features
- **FEAT-1: App-Header** – Sticky Glassmorphism-Header mit Dark/Light-Mode-Toggle, Logo "Cryptofolio", dekorativer Suchleiste. Dark Mode ist Standard, Theme-Präferenz wird in localStorage persistiert. Anti-Flash-Script verhindert FOUC beim Reload.

### Bug Fixes
- QA-001: FOUC bei Light-Mode-Reload behoben (else-Zweig im Anti-Flash-Script)
- QA-002: useState-Initializer StrictMode-safe gemacht (kein DOM-Sideeffect)
- QA-004 + UX-002 + UX-003: SearchBar vollständig dekorativ (aria-hidden, tabIndex=-1, readOnly, cursor-default)
- UX-001: ThemeToggle Icon-Logik korrigiert (Moon=Dark-Mode aktiv, Sun=Light-Mode aktiv)

### Known Issues
- Mobile Header-Höhe 64px statt 56px per Spec (Low)
- Vite-Boilerplate-Assets nicht bereinigt (Low)
