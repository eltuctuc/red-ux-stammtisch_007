# BUG-FEAT4-UX-001: Screenreader liest negative Änderung ohne Minus-Zeichen

- **Feature:** FEAT-4 – Watchlist-Sidebar
- **Severity:** High
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Das `aria-label` auf dem ChangeTag-Div lautet für negative Werte "24h-Änderung: 1.12%" statt "24h-Änderung: -1.12%". Der `sign`-String für den Fall `negative` ist ein leerer String (`''`), und `Math.abs()` entfernt das Vorzeichen. Der Screenreader kommuniziert damit weder Richtung noch Vorzeichen – ein positiver und ein negativer Wert von gleicher Magnitude sind nicht unterscheidbar.

Betroffen: ETH (-1.12%), ADA (-0.89%), DOT (-3.21%).

## Steps to Reproduce

1. Screenreader aktivieren (VoiceOver macOS oder NVDA)
2. Dashboard öffnen, zur Watchlist navigieren
3. Auf die ETH-Karte fokussieren
4. Expected: Screenreader liest "24h-Änderung: -1.12%"
5. Actual: Screenreader liest "24h-Änderung: 1.12%" – kein Minus

## Technische Ursache

In `WatchlistCard.tsx` Zeile 45:
```ts
const sign = trend === 'positive' ? '+' : trend === 'negative' ? '' : ''
```
Für `negative` ist `sign` leer. Das `aria-label` kombiniert `${sign}${Math.abs(change24h).toFixed(2)}%` – ergibt "1.12%" statt "-1.12%".

Das sichtbare `<span>` hat `aria-hidden="true"` und zeigt kein Minus, weil `Math.abs()` es entfernt und der `sign` für negative leer ist. Auch visuell fehlt das Minus-Zeichen vor dem Prozent-Wert.

## Empfehlung

`sign` für `negative` auf `'-'` setzen:
```ts
const sign = trend === 'positive' ? '+' : trend === 'negative' ? '-' : ''
```
Das `aria-label` wird dann korrekt zu "24h-Änderung: -1.12%" und auch der sichtbare Text zeigt das Minus.

## Priority

Fix now
