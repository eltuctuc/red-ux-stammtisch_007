# BUG-FEAT4-QA-001: formatPrice() zeigt 3 statt 4 Dezimalstellen für ADA ($0.452)

- **Feature:** FEAT-4 – Watchlist-Sidebar
- **Severity:** Medium
- **Bereich:** Functional
- **Gefunden von:** QA Engineer
- **Status:** Fixed

## Steps to Reproduce

1. App öffnen, Dashboard laden
2. Watchlist-Sidebar betrachten – Karte "ADA / Cardano"
3. Angezeigten Preis ablesen

Expected: ADA-Preis wird als `$0.4520` angezeigt (4 Dezimalstellen, wie im Dev Handoff spezifiziert: "4 Dezimalstellen ($0.4520 bzw. $0.7340)")

Actual: ADA-Preis wird als `$0.452` angezeigt (3 Dezimalstellen), weil `minimumFractionDigits: 3` in `formatPrice()` gesetzt ist – nicht 4.

## Technische Ursache

In `projekt/src/components/WatchlistCard.tsx`, Funktion `formatPrice()`, Zeile 20–23:

```ts
return new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 3,   // Bug: sollte 4 sein
  maximumFractionDigits: 4,
}).format(price)
```

`0.452` hat exakt 3 Dezimalstellen. Da `minimumFractionDigits: 3`, werden keine Trailing Zeros hinzugefügt. Ergebnis: `$0.452`. Korrekt wäre `minimumFractionDigits: 4`, damit `$0.4520` ausgegeben wird.

Gleiches Problem gilt für MATIC (`0.734` → `$0.734` statt `$0.7340`).

## Priority

Fix before release
