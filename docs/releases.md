# Release Notes

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
