# BUG-FEAT2-UX-001: Sparkline aria-label hardcoded "leicht steigend" – auch bei negativem Trend falsch

- **Feature:** FEAT-2 – Portfolio-Übersicht
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Das `aria-label` der Sparkline ist statisch hardcoded: `"7-Tage Portfolio-Trend: leicht steigend"`. Screenreader-Nutzer bekommen immer diese Aussage – unabhängig davon, ob der tatsächliche Trend steigend, fallend oder seitwärts ist.

Wenn `isPositive === false` (negativer 24h-Wert), zeichnet die Sparkline eine rote, fallende Linie – aber der Screenreader liest "leicht steigend". Das ist irreführend und widerspricht der dokumentierten A11y-Anforderung: `aria-label="7-Tage Portfolio-Trend: leicht steigend"` sollte aus den Daten berechnet werden.

Das Feature-File selbst nennt diesen Punkt explizit als Tech-Debt: _"Sparkline-aria-label ist hardcoded – könnte aus Daten berechnet werden."_ Für Screenreader-Nutzer ist das aber kein Nice-to-have, sondern ein semantischer Fehler.

## Steps to Reproduce

1. Ändere in `mockPortfolio.ts` den `change24hPercent` auf einen negativen Wert (z.B. `-2.1`)
2. Öffne die App mit aktiviertem Screenreader (VoiceOver/NVDA)
3. Fokussiere die Sparkline-Region

Expected: Screenreader liest einen Trend passend zur tatsächlichen Datenentwicklung (z.B. "7-Tage Portfolio-Trend: fallend")

Actual: Screenreader liest "7-Tage Portfolio-Trend: leicht steigend" – obwohl Linie rot und fallend ist

## Empfehlung

Den aria-label-Text aus den Sparkline-Daten ableiten: ersten und letzten Datenpunkt vergleichen, daraus "steigend", "fallend" oder "seitwärts" berechnen und als Prop an `PortfolioSparkline` übergeben. Reicht als einfache Hilfsfunktion mit drei Ausgaben.

```tsx
function getTrendLabel(data: SparklinePoint[]): string {
  const delta = data[data.length - 1].value - data[0].value
  if (delta > 500) return 'steigend'
  if (delta < -500) return 'fallend'
  return 'seitwärts'
}
// aria-label={`7-Tage Portfolio-Trend: ${getTrendLabel(data)}`}
```

## Priority

Fix before release
