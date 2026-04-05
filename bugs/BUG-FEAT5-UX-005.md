# BUG-FEAT5-UX-005: Spaltenkopf "Typ" zu generisch – Nutzer versteht den Inhalt nicht auf den ersten Blick

- **Feature:** FEAT-5 – Transaktionshistorie
- **Severity:** Low
- **Bereich:** UX
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Der Spaltenkopf "Typ" für die Buy/Sell-Badge-Spalte ist zu abstrakt. Im Kontext einer Transaktionshistorie könnte "Typ" sich auf Asset-Typ (Coin vs. Token vs. Stablecoin), Transaktionskanal (On-chain vs. Exchange) oder Auftragstyp (Market vs. Limit) beziehen. "Kauf/Verkauf" oder "Transaktion" wären präziser.

Der tatsächliche Inhalt der Spalte ist ausschließlich "ob es ein Kauf oder Verkauf war" – das ist die für Nutzer wichtigste Information in der Zeile. Der Label sollte diese Information direkt benennen.

Micro-Copy-Standard: Spaltenköpfe in Datentabellen sollen den Inhalt eindeutig beschreiben, nicht eine abstrakte Kategorie.

## Steps to Reproduce

1. Transaktionshistorie öffnen
2. Spaltenköpfe lesen: "Datum | Asset | Typ | Menge | Preis/Einheit | Gesamtbetrag"
3. Expected: "Typ" ist eindeutig auf "Kauf oder Verkauf" zurückzuführen
4. Actual: "Typ" ist mehrdeutig – der Nutzer muss erst in die Datenzeilen schauen, um den Spaltensinn zu erschließen

## Empfehlung

Spaltenkopf von "Typ" auf "Kauf/Verkauf" umbenennen. Alternativ "Vorgang" oder "Art". Kein technischer Aufwand – einzige Änderung in der `['Datum', 'Asset', 'Typ', ...]`-Konstante in `TransactionTable.tsx`.

## Priority

Nice-to-have
