# BUG-FEAT2-UX-004: Sparkline enthält kein XAxis – Recharts rendert unsichtbare Leerabstände

- **Feature:** FEAT-2 – Portfolio-Übersicht
- **Severity:** Low
- **Bereich:** UX
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

`PortfolioSparkline` importiert `YAxis` und setzt es auf `hide`. Es wird jedoch kein `XAxis` importiert oder deklariert. Recharts rendert standardmäßig eine XAxis, wenn keine explizit deklariert wird – ohne `hide`-Attribut kann das in einigen Recharts-Versionen zu einem unsichtbaren, aber platzbelegenden X-Achsen-Element führen, das die effektive Zeichenfläche der 60px hohen Sparkline verkleinert.

Die Sparkline-Linie wird dadurch möglicherweise in einem kleineren vertikalen Bereich gerendert als die 60px Containerhöhe vermuten lässt. Der Trend wirkt flacher als er sein sollte.

Das Spec-Dokument (Abschnitt 3) beschreibt explizit: "`<LineChart>` mit `XAxis hide` + `YAxis hide`" – XAxis hide ist in der Implementierung nicht umgesetzt.

## Steps to Reproduce

1. Browser DevTools öffnen
2. SVG-Element der Sparkline inspizieren
3. Prüfen ob ein `<g class="xAxis">` Element gerendert wird und ob es Höhe beansprucht

Expected: Kein XAxis-Element in der SVG-Ausgabe, volle 60px für die Linien-Zeichenfläche genutzt

Actual: Recharts rendert intern eine (unsichtbare) XAxis, die vertikalen Raum beansprucht und den sichtbaren Kurvenbereich reduziert

## Empfehlung

`XAxis` importieren und explizit mit `hide` deklarieren, wie im technischen Design spezifiziert:

```tsx
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

// In <LineChart>:
<XAxis dataKey="day" hide />
<YAxis domain={['dataMin', 'dataMax']} hide />
```

## Priority

Fix before release
