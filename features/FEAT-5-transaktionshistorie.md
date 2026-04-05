---
status: approved
---

# FEAT-5: Transaktionshistorie

## Fortschritt
Status: Approved
Aktueller Schritt: Spec
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
