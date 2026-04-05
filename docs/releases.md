# Release Notes

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
