# BUG-FEAT4-UX-003: DOT-Sparkline steigt am Ende trotz negativem Badge (-3.21%)

- **Feature:** FEAT-4 – Watchlist-Sidebar
- **Severity:** High
- **Bereich:** UX
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Polkadot (DOT) hat `change24h: -3.21%` – Badge und TrendIcon sind korrekt rot mit Pfeil nach unten. Die Sparkline zeigt jedoch am Ende einen leichten Aufwärtstrend: die letzten drei Datenpunkte sind `6.75 → 6.82`, also ein Anstieg um 0.07. Das bedeutet: Badge sagt "fallend", Sparkline sagt visuell "steigt gerade".

Für einen Nutzer der die Sparkline als Kurz-Trendaussage liest (so ist sie gedacht) ist das irreführend. Die beiden Signale widersprechen sich.

Persona Marcus prüft in 5 Sekunden ob Assets "grün oder rot" sind. Ein visuell steigender Chart neben einem roten Badge erzeugt Verwirrung: "Erholt sich DOT gerade oder fällt es?"

Das ist kein technischer Fehler in der Rendering-Logik – die Sparkline zeigt die Mock-Daten korrekt an. Der Fehler liegt in den Mock-Daten selbst.

## Steps to Reproduce

1. Dashboard öffnen, zur DOT-Karte in der Watchlist scrollen
2. Rotes Badge "-3.21%" mit TrendingDown-Icon betrachten
3. Sparkline rechts daneben betrachten
4. Expected: Sparkline zeigt fallende Kurve, konsistent mit dem negativen Badge
5. Actual: Sparkline steigt am Ende leicht an (6.75 → 6.82), widerspricht dem roten Badge visuell

## Empfehlung

Die DOT-Sparkline-Daten so anpassen, dass der Endpunkt tatsächlich tiefer liegt als der Ausgangspunkt und kein Aufwärtshaken am Ende entsteht. Beispiel für eine konsistent fallende Kurve:

```ts
sparkline: [7.1, 7.05, 6.98, 6.90, 6.85, 6.80, 6.76, 6.73, 6.71, 6.68]
```

Der letzte Wert muss nicht exakt dem `price`-Wert entsprechen (es sind Trending-Daten, nicht der Live-Preis), sollte aber eine klar fallende Richtung vermitteln.

## Priority

Fix before release
