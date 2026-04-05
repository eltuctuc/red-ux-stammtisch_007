---
status: approved
---

# FEAT-5: Transaktionshistorie

## Fortschritt
Status: Done
Aktueller Schritt: QA
Fix-Schwelle: Medium
Fix-Schwelle bestätigt: 2026-04-05

## Abhängigkeiten
- Benötigt: FEAT-1 (App-Header) – Dark/Light Mode Theme muss global verfügbar sein

---

## 1. Feature Spec
*Ausgefüllt von: /red:proto-requirements — 2026-04-05*

### Beschreibung
Tabellarische Übersicht der letzten 5 Mock-Transaktionen mit Datum, Asset, Typ (Buy/Sell), Menge, Preis pro Einheit und Gesamtbetrag. Gibt dem Dashboard Tiefe und Glaubwürdigkeit als Portfolio-Tool.

### Definitionen
- **Transaktion:** Einzelner Kauf oder Verkauf einer Kryptowährung zu einem bestimmten Preis und Zeitpunkt
- **Buy:** Kauf-Transaktion – grün gekennzeichnet
- **Sell:** Verkauf-Transaktion – rot gekennzeichnet
- **Gesamtbetrag:** Menge × Preis pro Einheit in USD

### User Stories
- Als Nutzer sehe ich meine letzten Transaktionen übersichtlich in einer Tabelle
- Als Nutzer erkenne ich sofort ob eine Transaktion ein Kauf oder Verkauf war (Farbe/Label)
- Als Nutzer sehe ich realistische Beträge und Daten, die das Dashboard glaubwürdig machen
- Als Mobile-Nutzer ist die Tabelle scrollbar ohne horizontalen Überlauf der Seite

### Acceptance Criteria
- [ ] Genau 5 Mock-Transaktionen in der Tabelle
- [ ] Spalten: Datum, Asset (Symbol + Name), Typ (Buy/Sell), Menge, Preis/Einheit, Gesamtbetrag
- [ ] "Buy"-Zeilen: grüne Typ-Kennzeichnung, "Sell"-Zeilen: rote Typ-Kennzeichnung
- [ ] Daten sind realistisch (echte Krypto-Symbole, plausible Preise, unterschiedliche Daten)
- [ ] Tabelle hat Glassmorphism-Karten-Wrapper mit Hover-Effekt auf Zeilen
- [ ] Auf Mobile: Tabelle horizontal scrollbar innerhalb des Containers (kein seitenweiter Overflow)

### Edge Cases
- **Langer Asset-Name:** Lange Asset-Namen brechen das Layout nicht (Truncation oder Wrapping)
- **Kleine Beträge:** Sehr kleine Mengen (z.B. 0.00045 BTC) werden korrekt formatiert
- **Gemischte Typen:** Tabelle rendert korrekt mit Kombination aus Buy- und Sell-Transaktionen

### Nicht im Scope
- Pagination oder "Alle anzeigen"-Button
- Filter nach Asset oder Transaktionstyp
- Neue Transaktion hinzufügen
- CSV-Export
- Sortierung nach Spalten

---

## 2. UX Entscheidungen
*2026-04-05*

### Einbettung im Produkt
Letzte Section auf dem Dashboard, volle Breite | Route: `/`

### Einstiegspunkte
App-Start → S-01 Dashboard → Tabelle nach unten scrollen (unterhalb Chart und Watchlist)

### User Flow
Dashboard scrollen → Transaktionstabelle sehen → Zeilen per Farbe (Buy/Sell) lesen → Details in Spalten erfassen

### Interaktionsmuster
- Primärmuster: Datentabelle mit Hover-Highlight auf Zeilen
- Hover: `hover:bg-white/5 dark:hover:bg-white/5` auf `<tr>`
- Fehler-Handling: Nicht anwendbar (Mock-Daten)
- Leerer Zustand: Nicht anwendbar (immer 5 Zeilen)
- Ladeverhalten: Nicht anwendbar

### Eingesetzte Komponenten
| Komponente | DS-Status | Quelle |
|------------|-----------|--------|
| Glassmorphism Card Wrapper | ⚠ Tokens-Build | Kein DS vorhanden |
| Table (thead/tbody, responsive) | ⚠ Tokens-Build | Native HTML |
| Transaction-Badge Buy/Sell (Pill) | ⚠ Tokens-Build | Kein DS vorhanden |
| Numeric Formatter (Menge + USD) | ⚠ Tokens-Build | Intl.NumberFormat |

### Badge-Styling
- Buy: `bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5`
- Sell: `bg-red-500/20 text-red-400 border border-red-500/30 rounded-full px-2 py-0.5`

### Navigation nach Aktionen (verbindlich)
| Ausgangs-Screen | Aktion | Ziel | Bedingung |
|-----------------|--------|------|-----------|
| S-01 Dashboard | Hover über Tabellenzeile | Zeilen-Highlight in-place | – |

### DS-Status
- Tokens-Build (genehmigt): Alle Komponenten

### Barrierefreiheit (A11y)
- Keyboard: Tabelle ist kein Tab-Ziel (rein informativ)
- Screen Reader: `<table>` mit `<caption>Letzte Transaktionen</caption>`; `<th scope="col">` für alle Spaltenköpfe; Badge: `aria-label="Kauf"` / `aria-label="Verkauf"`
- Farbe: Buy/Sell-Badge hat zusätzlich Text-Label (nicht nur Farbe)

### Mobile-Verhalten
- `<div class="overflow-x-auto">` um die Tabelle
- `<table class="min-w-[640px]">` – verhindert Zellenquetschung
- Seitlicher Overflow nur innerhalb des Containers, nicht die gesamte Seite

---

## 3. Technisches Design
*2026-04-05*

### State-Komplexität
State-Komplexität geprüft – kein State Machine erforderlich. Statische Tabelle, kein User-Input.

### Daten-Validation
Nicht anwendbar – Daten sind hartcodierte Konstanten in `src/data/mockTransactions.ts`.

### Component-Struktur
```
TransactionTable
├── TableHeader        ("Letzte Transaktionen" Titel)
└── <div overflow-x-auto>
    └── <table min-w-[640px]>
        ├── <thead>    (Datum | Asset | Typ | Menge | Preis | Total)
        └── <tbody>
            └── TransactionRow (×5, gemappt aus mockTransactions)
                └── TransactionBadge (Buy/Sell Pill)
```

### Daten-Model
Mock-Konstante in `src/data/mockTransactions.ts`:
```
Array<{
  date: string,         // "2025-03-28"
  symbol: string,       // "ETH"
  name: string,         // "Ethereum"
  type: 'buy' | 'sell',
  amount: number,       // 0.5 (Menge)
  pricePerUnit: number, // 3_412.80 (USD)
  total: number         // 1_706.40 (USD)
}>
```
5 Einträge, gemischt Buy/Sell, realistische Preise.

### API / Daten-Fluss
Nicht anwendbar – synchrone Mock-Daten.

### Tech-Entscheidungen
- **Native `<table>`:** Semantisch korrekt, Screen-Reader-freundlich, kein Overhead
- **`overflow-x-auto` Container + `min-w-[640px]` auf Tabelle:** Verhindert Zellenquetschung auf Mobile ohne Layout-Bruch
- **`type: 'buy' | 'sell'` Union Type:** TypeScript-sicheres Badge-Styling ohne String-Vergleiche
- **Intl.NumberFormat für alle Zahlen:** Konsistente USD-Formatierung in Preis und Total

### Security-Anforderungen
Nicht anwendbar.

### Dependencies
Keine zusätzlichen Dependencies – native HTML-Tabelle.

### A11y-Architektur

| Element | ARIA-Pattern | Entscheidung |
|---------|-------------|--------------|
| `<table>` | Native Tabellen-Semantik | `<caption>Letzte Transaktionen</caption>` |
| `<th>` | `scope="col"` | Alle Spaltenköpfe |
| TransactionBadge | Text + Farbe | `aria-label="Kauf"` / `aria-label="Verkauf"` |
| Zeilen-Hover | Nur visuell | Kein Fokus-Ziel, nur Ästhetik |

### Test-Setup
- Unit: TransactionBadge – rendert "Buy" mit grünem Styling, "Sell" mit rotem Styling
- Unit: TransactionRow – rendert alle 6 Spalten korrekt für einen Mock-Eintrag
- Unit: Numeric Formatter – 1706.40 → "$1,706.40"

### Test-Infrastruktur
- Environment: happy-dom
- Mocks: Keine zusätzlichen Mocks nötig (kein Recharts, kein localStorage)

### Datei-Pfade
- `projekt/src/components/TransactionTable.tsx`
- `projekt/src/components/TransactionRow.tsx`
- `projekt/src/components/TransactionBadge.tsx`
- `projekt/src/data/mockTransactions.ts`

---

## 4. Implementierung
*2026-04-05*

### Implementierte Dateien
- `projekt/src/data/mockTransactions.ts` – 5 Transaktionen (BTC buy, ETH sell, SOL buy, ADA buy, DOT sell) mit realistischen Preisen und Daten
- `projekt/src/components/TransactionBadge.tsx` – Buy/Sell Pill (aria-label="Kauf"/"Verkauf", grün/rot)
- `projekt/src/components/TransactionRow.tsx` – `<tr>` mit Hover-Highlight, formatDate() (de-DE), formatAmount() (kleinste Mengen 5 Dezimalstellen), tabular-nums
- `projekt/src/components/TransactionTable.tsx` – Glassmorphism-Wrapper, `<caption sr-only>`, `<th scope="col">`, overflow-x-auto, min-w-[640px]
- `projekt/src/App.tsx` – Grid-Refactoring: grid in flex-col, TransactionTable als volle Breite darunter

### Installierte Dependencies
- Keine neuen Dependencies (native HTML-Tabelle)

### Offene Punkte / Tech-Debt
- TransactionRow key={i} statt key={tx.date+tx.symbol} – für 5 statische Einträge akzeptabel
- formatAmount() Schwellenwert 100 für Integer-Format – könnte bei mehr Daten verfeinert werden

---

## 5. QA Ergebnisse
*2026-04-05*

### Acceptance Criteria Status
- [x] Genau 5 Mock-Transaktionen ✅
- [x] Spalten: Datum, Asset, Typ, Menge, Preis/Einheit, Gesamtbetrag ✅
- [x] Buy = grün (Kauf), Sell = rot (Verkauf) ✅
- [x] Realistische Daten ✅
- [x] Glassmorphism-Wrapper + Row-Hover ✅
- [x] Mobile: overflow-x-auto nur im Container ✅

### Security: n/a (statische Mock-Daten, kein User-Input) | A11y: Fixes applied (SR-Doppelankündigung, Badge-Sprache, Spaltenköpfe-Kontrast)

### Gefixte Bugs (Medium+)
- BUG-FEAT5-QA-001 – ADA-Menge `2,500` statt `2,500.00` (High) ✅ fixed
- BUG-FEAT5-QA-002 / UX-007 – Spaltenköpfe Dark Mode WCAG-Verletzung (Medium) ✅ fixed
- BUG-FEAT5-UX-001 – Hover-Highlight 2% Opacity unsichtbar (Medium) ✅ fixed
- BUG-FEAT5-UX-002 / QA-004 – Badge-Sprache EN/DE inkonsistent (Medium) ✅ fixed
- BUG-FEAT5-UX-003 – Kein Scroll-Hint auf Mobile (Medium) ✅ fixed
- BUG-FEAT5-UX-004 – Doppelte SR-Ankündigung caption + aria-labelledby (Medium) ✅ fixed

### Known Issues (unter Fix-Schwelle Low)
- BUG-FEAT5-QA-003 – ETH 0.5 als "0.50000" (5 Dezimalstellen für normale Handelsmenge)
- BUG-FEAT5-UX-005 – Spaltenkopf "Typ" zu generisch
- BUG-FEAT5-UX-006 – Mock-Daten alle im $1.000–$1.800-Korridor

### Summary
- ✅ 6 ACs passed | 6 Bugs gefixed (1 High, 5 Medium) | 3 Known Issues (Low)

### Production-Ready
✅ Ready
