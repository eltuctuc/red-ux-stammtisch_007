# BUG-FEAT5-QA-003: ETH-Menge als "0.50000 ETH" – 5 Dezimalstellen für nicht-kleinen Betrag

- **Severity:** Low
- **Bereich:** Functional
- **Status:** Open

## Steps to Reproduce
1. App starten, zur Transaktionshistorie scrollen
2. Zeile "ETH / Ethereum" aufrufen (2. Zeile, type=sell, amount=0.5)
3. Spalte "Menge" beobachten

Expected: `0.50 ETH` oder `0.500 ETH` – 0.5 ETH ist ein normaler Handelsbetrag, der nicht als "kleine Menge" mit 5 Dezimalstellen dargestellt werden sollte

Actual: `0.50000 ETH` – die `formatAmount()`-Logik behandelt jeden Betrag < 1 mit `toFixed(5)`, unabhängig davon ob es sich um eine typische Handelsmenge handelt

## Root Cause
In `TransactionRow.tsx`, `formatAmount()`:
```ts
if (amount < 1) {
  return `${amount.toFixed(5)} ${symbol}`
}
```
Die Schwelle `< 1` erfasst sowohl winzige Beträge (0.00045 BTC) als auch normale halbe Einheiten (0.5 ETH). Der Kommentar im Code spricht von "Small amounts (< 1)", jedoch ist 0.5 ETH im Kontext keine kleine Menge.

Hinweis: Der Dev-Handoff spezifiziert explizit nur den BTC-Fall (0.015 → 5 Dezimalstellen). Für ETH 0.5 gibt es keine explizite Formatieranweisung. Der Bug ist daher funktional inkonsistent, aber kein direkter Spec-Verstoß.

## Priority
Nice-to-have
