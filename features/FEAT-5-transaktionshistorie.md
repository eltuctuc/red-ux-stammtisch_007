---
status: approved
---

# FEAT-5: Transaktionshistorie

## Fortschritt
Status: Approved
Aktueller Schritt: UX
Fix-Schwelle: Critical

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
