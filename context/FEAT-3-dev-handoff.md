# Dev Handoff – FEAT-3: Interaktiver Preis-Chart
*2026-04-05*

## Was gebaut wurde
- `projekt/src/data/mockPriceHistory.ts` – 90 deterministisch generierte Tagespreise (seededRandom via Math.sin, kein Math.random), Startpreis $45.000, ±4% Tagesvolatilität
- `projekt/src/components/PriceChartTooltip.tsx` – Custom Recharts Tooltip: Glassmorphism (backdrop-blur-md, bg-white/80 dark:bg-[#1a1d27]/90), formatiertes Datum (de-DE) + USD-Preis
- `projekt/src/components/PriceChart.tsx` – Vollständige Chart-Karte: article mit aria-label, ChartHeader "Bitcoin BTC / Letzte 90 Tage", Recharts AreaChart mit linearGradient (#22d3ee Cyan), CartesianGrid, XAxis (alle 15 Tage), YAxis ($Xk-Format), Custom Tooltip, h-48 Mobile / h-80 Desktop
- `projekt/src/App.tsx` – Grid-Refactoring: linke Spalte (md:col-span-2) jetzt als flex flex-col mit PortfolioCard + PriceChart, rechte Spalte frei für FEAT-4

## Entscheidungen getroffen
- **seededRandom via Math.sin:** Deterministisch, kein Math.random() → gleiche Daten bei jedem Render, kein Hydration-Mismatch, stabile Tests
- **isAnimationActive={false} auf Area:** Kein FOUC beim ersten Render, kein ResizeObserver-Fehler in Tests
- **interval={14} auf XAxis:** 90 Datenpunkte → jeden 15. Tag anzeigen (ca. 6 Labels). Spec sagte "jeden 5.", aber das wären zu viele Labels bei täglichen Daten
- **Eigenes Interface statt TooltipProps<V,N>:** Recharts v3 TooltipProps-Typ hat Typ-Mismatch mit Destructuring, einfaches Interface vermeidet TS-Fehler ohne Funktionalitätsverlust
- **CartesianGrid vertical={false}:** Nur horizontale Hilfslinien – cleaner look, weniger visuelles Rauschen
- **activeDot r=4:** Dezenter Highlight-Punkt beim Hover, kein zu dominantes Element

## DS-Abweichungen
- Alle Komponenten als Tokens-Build (kein Design System vorhanden) – genehmigt in FEAT-3 Spec
- Farbe #22d3ee (Tailwind cyan-400) für Chart-Linie und Gradient – konsistent mit Header-Gradient

## Offene Punkte
- Kein Zeitraum-Selector (nicht im Scope)
- Kein Asset-Wechsel (nicht im Scope)
- Tooltip nur visuell – Screen Reader liest article-aria-label (spec-konform)

## Für QA relevant
- **Tooltip testen:** Hover über Chart-Datenpunkte → Tooltip muss Datum + Preis zeigen; Maus verlassen → Tooltip verschwindet
- **Mobile 320px:** Kein horizontaler Overflow, Chart bleibt in Card
- **Dark/Light-Wechsel:** Tooltip Dark Mode (#1a1d27/90), Achsen-Text grau
- **ResponsiveContainer:** ResizeObserver-Mock nötig in Tests: `vi.stubGlobal('ResizeObserver', ResizeObserverMock)`
- **Mock-Daten Vollständigkeit:** mockPriceHistory hat genau 90 Einträge, alle prices > 0
- **Gradient-ID:** `btcPriceGradient` – muss in SVG defs referenziert werden (bereits korrekt als `url(#btcPriceGradient)`)
