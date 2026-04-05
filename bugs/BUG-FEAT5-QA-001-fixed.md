# BUG-FEAT5-QA-001: ADA-Menge ohne Dezimalstellen – "2,500" statt "2,500.00"

- **Severity:** High
- **Bereich:** Functional
- **Status:** Fixed

## Steps to Reproduce
1. App starten, zur Transaktionshistorie scrollen
2. Zeile "ADA / Cardano" aufrufen (4. Zeile, type=buy, amount=2500)
3. Spalte "Menge" beobachten

Expected: `2,500.00 ADA` (laut Dev-Handoff explizit gefordert: Tausender-Trenner + 2 Dezimalstellen)

Actual: `2,500 ADA` (kein ".00" – `Intl.NumberFormat('en-US').format(2500)` ohne `minimumFractionDigits` liefert keine Nachkommastellen bei Ganzzahlen)

## Root Cause
In `TransactionRow.tsx`, `formatAmount()`, Zweig `amount >= 100`:
```ts
return `${new Intl.NumberFormat('en-US').format(amount)} ${symbol}`
```
`Intl.NumberFormat` ohne `minimumFractionDigits: 2` lässt Dezimalstellen bei Ganzzahlen weg.
Fix: `new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })`.

Gleiches Problem betrifft DOT (amount=150) → "150" statt "150.00", jedoch ist für DOT kein expliziter Soll-Wert spezifiziert.

## Priority
Fix before release
