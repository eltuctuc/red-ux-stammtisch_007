# Dev Handoff – FEAT-5: Transaktionshistorie
*2026-04-05*

## Was gebaut wurde
- `projekt/src/data/mockTransactions.ts` – 5 Transaktionen: BTC buy ($1.011), ETH sell ($1.771), SOL buy ($1.714), ADA buy ($1.130), DOT sell ($1.065) – gemischte Typen, realistische Preise, absteigende Daten
- `projekt/src/components/TransactionBadge.tsx` – Buy/Sell Pill mit exaktem Badge-Styling aus Spec (emerald-500/20, red-500/20), aria-label="Kauf"/"Verkauf"
- `projekt/src/components/TransactionRow.tsx` – `<tr>` mit Hover-Highlight (hover:bg-black/[0.02] dark:hover:bg-white/[0.03]), formatDate() (de-DE), formatAmount() (5 Dezimalstellen <1, Tausender-Format ≥100), tabular-nums auf Zahlen-Spalten
- `projekt/src/components/TransactionTable.tsx` – `<section aria-labelledby>`, Glassmorphism-Wrapper mit overflow-hidden (rounded-2xl + table-overflow), separater Header mit h3, `<caption className="sr-only">`, `<th scope="col">`, overflow-x-auto + min-w-[640px]
- `projekt/src/App.tsx` – Grid in flex-col umgebaut; grid als inneres Element; TransactionTable darunter als volle Breite

## Entscheidungen getroffen
- **`overflow-hidden` auf der Card + `overflow-x-auto` auf dem inneren Container:** Verhindert, dass rounded-2xl-Ecken vom table-overflow abgeschnitten werden. Zweiteilung erlaubt beides gleichzeitig.
- **`section aria-labelledby="transactions-heading"`** statt `article`: Tabellen-Sektion ist kein eigenständiges Dokument-Objekt, sondern Teil des Dashboards
- **`caption sr-only`** zusätzlich zu `aria-labelledby`: Doppelte Absicherung für Screen Reader, die `<caption>` nativ ankündigen
- **`tabular-nums`** auf Zahlen-Spalten: Zahlen richten sich vertikal aus, kein Flattern bei Scroll
- **App.tsx: flex-col + inneres grid:** TransactionTable als volle Breite unterhalb des grids – cleaner als col-span-3 innerhalb eines grids

## DS-Abweichungen
- Alle Komponenten als Tokens-Build – genehmigt in FEAT-5 Spec
- Row-Hover-BG bewusst sehr dezent: `bg-black/[0.02]` (2% opacity) – stärker würde auf dem hellen Light-Mode-Hintergrund zu stark wirken

## Offene Punkte
- `key={i}` auf TransactionRow – für 5 statische Mock-Einträge akzeptabel
- Kein "leerer Zustand" (per Spec nicht im Scope)

## Für QA relevant
- **ADA Menge:** 2.500 ADA → muss als `2,500.00 ADA` formatiert werden (Tausender-Trenner, 2 Dezimalstellen)
- **BTC Menge:** 0.015 BTC → kleiner als 1, größer als 0.001 → `0.01500 BTC` (5 Dezimalstellen)
- **Mobile 320px:** overflow-x-auto nur innerhalb der Card, KEIN seitenweiter Overflow
- **Dark/Light-Wechsel:** Row-Hover, Badge-Farben, Kopfzeile-Text – alles mit dark: Klassen
- **Spaltenköpfe:** th scope="col" alle 6 vorhanden (Datum, Asset, Typ, Menge, Preis/Einheit, Gesamtbetrag)
- **Buy-Zeilen:** grüner Badge mit "Buy" Text + aria-label="Kauf"
- **Sell-Zeilen:** roter Badge mit "Sell" Text + aria-label="Verkauf"
- **Regression:** PortfolioCard, PriceChart, WatchlistSidebar weiterhin korrekt im grid
