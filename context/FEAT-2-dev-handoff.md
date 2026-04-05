# Dev Handoff – FEAT-2: Portfolio-Übersicht
*2026-04-05*

## Was gebaut wurde
- `projekt/src/data/mockPortfolio.ts` – Statische Mock-Konstante mit totalValue ($84.231,57), change24h (+3,42% / +$2.783,19) und 7 Sparkline-Datenpunkten
- `projekt/src/components/TrendBadge.tsx` – Trend-Anzeige mit Pfeil-Icon (lucide-react TrendingUp/Down), Prozentwert und USD-Absolutbetrag, grün/rot via ternary
- `projekt/src/components/PortfolioSparkline.tsx` – Recharts LineChart 120×60px, kein XAxis, YAxis hide, role="img" aria-label
- `projekt/src/components/PortfolioCard.tsx` – Glassmorphism-Karte (backdrop-blur-md, bg-white/70 dark:bg-white/5, border), Hover-Animation (scale+shadow), flex-Layout mit Sparkline rechts
- `projekt/src/App.tsx` – 3-Spalten-Grid (max-w-7xl), PortfolioCard in md:col-span-2 (linke 2/3)

## Entscheidungen getroffen
- **Intl.NumberFormat statt manueller Formatierung:** Locale-aware, einmal instanziiert als Modul-Konstante
- **YAxis mit domain=['dataMin','dataMax']:** Skaliert Sparkline auf tatsächliche Schwankung statt von 0 – Trend wirkt stärker
- **isAnimationActive={false} auf Line:** Verhindert Recharts-Animationsfehler in Test-Umgebung und FOUC beim ersten Render
- **cursor-default auf der Karte:** Karte ist kein Klick-Ziel, kein interaktives Tab-Element

## DS-Abweichungen
- Alle Komponenten als Tokens-Build (kein Design System vorhanden) – genehmigt in FEAT-2 Spec

## Offene Punkte
- Sparkline aria-label ist hardcoded ("leicht steigend") – könnte programmatisch aus Trend-Berechnung kommen
- Chunk-Size-Warnung durch recharts erwartet, kein Handlungsbedarf für Prototype

## Für QA relevant
- **Negativer Tag testen:** `change24hPercent` auf negativen Wert setzen → TrendBadge muss rot + TrendingDown zeigen
- **Großer Wert:** Wert > 1.000.000 eingeben → Layout darf nicht brechen (truncate-Klasse greift)
- **Mobile-Breakpoint:** Karte muss auf <768px volle Breite haben, kein horizontales Scrollen
- **Dark/Light-Wechsel:** Glassmorphism-Styling muss in beiden Themes korrekt sein
- **Sparkline:** In happy-dom-Tests braucht ResizeObserver einen Mock: `vi.stubGlobal('ResizeObserver', ResizeObserverMock)`
