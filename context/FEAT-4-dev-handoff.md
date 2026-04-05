# Dev Handoff – FEAT-4: Watchlist-Sidebar
*2026-04-05*

## Was gebaut wurde
- `projekt/src/data/mockWatchlist.ts` – 6 WatchlistEntry-Objekte: BTC ($67.423), ETH ($3.541), SOL ($142), ADA ($0.452), MATIC ($0.734), DOT ($6.82); jeweils change24h (positiv/negativ/null) und sparkline[10]
- `projekt/src/components/MiniSparkline.tsx` – Recharts LineChart 80×40px, trend-Props (positive/negative/neutral), grün/rot/grau Stroke, role="img" aria-label mit Trend-Text
- `projekt/src/components/WatchlistCard.tsx` – `<li role="listitem">`, formatPrice() (2 Dezimalstellen ≥$1, 4 Dezimalstellen <$1), inline ChangeTag (TrendingUp/Down/Minus aus lucide-react, aria-label), Hover-Animation (scale-[1.02], shadow-md)
- `projekt/src/components/WatchlistSidebar.tsx` – `<aside>`, Glassmorphism-Wrapper, `<ul role="list" aria-label="Watchlist">`, Desktop: md:flex-col, Mobile: flex-row overflow-x-auto snap-x snap-mandatory
- `projekt/src/App.tsx` – rechte Spalte md:col-span-1 mit WatchlistSidebar

## Entscheidungen getroffen
- **TrendBadge aus FEAT-2 NICHT wiederverwendet:** TrendBadge zeigt icon+%+(USD) → zu breit für 200px Kompaktkarte. Stattdessen kompakter Inline-ChangeTag mit nur % + Icon. Entspricht besser dem Watchlist-Kontext.
- **`<li>` statt `<div>` für Karte:** Semantisch korrekt, impliziert role="listitem" – Screen-Reader navigiert als Liste
- **formatPrice() in WatchlistCard:** ADA/MATIC unter $1 brauchen 4 Dezimalstellen; BTC/ETH 2 Dezimalstellen. Einfache if-Verzweigung ohne externen Formatter.
- **snap-start + shrink-0 auf Mobile-Wrapper:** Jede Karte snappt sauber in Position ohne partielles Scrollen
- **min-w-[200px] auf WatchlistCard:** Verhindert Zusammendrücken der Karten auf Mobile im overflow-Kontext; Desktop: md:min-w-0 setzt das zurück

## DS-Abweichungen
- Alle Komponenten als Tokens-Build (kein Design System vorhanden) – genehmigt in FEAT-4 Spec
- Card-Background leicht abweichend zu PortfolioCard: `bg-white/50 dark:bg-white/[0.03]` (kompaktere Karten wirken sonst zu opak)

## Offene Punkte
- TrendBadge nicht wiederverwendet – Tech-Debt, könnte mit optionalem `compact`-Prop gelöst werden
- Edge Case Null-Änderung (MATIC 0.00%): korrekt grau, aber aria-label sagt "0.00%" nicht "keine Änderung"

## Für QA relevant
- **MATIC 0.00%:** Muss grau sein mit Minus-Icon, NICHT grün oder rot
- **ADA/MATIC Preis:** < $1 → 4 Dezimalstellen ($0.4520 bzw. $0.7340)
- **Mobile Scroll:** overflow-x-auto + snap → Karten müssen horizontal scrollen, kein vertikales Overflow
- **Desktop:** flex-col → Karten müssen vertikal gestapelt sein in rechter Spalte
- **Langer Name Edge Case:** "Polkadot" → truncate greift durch min-w-0 auf der Textseite
- **MiniSparkline DOT:** Negativ-Trend (6.82 < 7.10) → Linie muss fallend und rot sein
- **ResizeObserver-Mock** in Tests nötig: `vi.stubGlobal('ResizeObserver', ResizeObserverMock)`
- **Regression FEAT-2/3:** PortfolioCard und PriceChart weiterhin korrekt in left col-span-2
