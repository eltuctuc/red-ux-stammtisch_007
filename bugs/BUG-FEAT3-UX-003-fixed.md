# BUG-FEAT3-UX-003: YAxis-Labels möglicherweise abgeschnitten auf kleinen Viewports

- **Feature:** FEAT-3 – Interaktiver Preis-Chart
- **Severity:** Medium
- **Bereich:** UX
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Der `AreaChart` hat `margin={{ left: 0 }}`. Die `YAxis` hat `width={42}`. Das bedeutet: die Y-Achsen-Labels ("$45k", "$47k" etc.) befinden sich innerhalb der 42px-Breite ohne zusätzlichen linken Außenabstand.

Die `PriceChart`-Card hat `p-5` (20px Padding). Das klingt ausreichend. Das Problem entsteht im Layout-Kontext: In `App.tsx` ist das Grid mit `px-4` (16px) auf Mobile konfiguriert. Bei einem 320px-Viewport (Edge Case aus der Spec: "Chart rendert auf 320px Breite ohne horizontalen Overflow") ergibt sich folgende Rechnung:

- 320px Viewport
- 16px left px-4
- 20px left p-5 der Card
- 0px left margin des Charts
- 42px YAxis-Bereich

Auf sehr kleinen Viewports kann die YAxis-Beschriftung optisch an die Card-Innenkante drängen oder – bei knapper Dimensionierung – links abgeschnitten werden, weil `ResponsiveContainer` die verfügbare Breite nutzt und das YAxis-Label innerhalb des SVG-Koordinatensystems negativ positioniert werden kann.

## Steps to Reproduce

1. Browser auf 320px Viewport-Breite einstellen
2. Chart-Bereich inspizieren
3. Expected: YAxis-Labels vollständig sichtbar und mit Abstand zur Card-Kante
4. Actual: YAxis-Labels direkt an der Card-Innenkante, visuell eng oder leicht geclippt

## Empfehlung

`margin={{ top: 4, right: 4, left: 4, bottom: 0 }}` – linkes Margin von 0 auf 4px erhöhen. Das gibt dem YAxis-Bereich einen minimalen Atemraum zur Card-Kante und verhindert das Clipping bei sehr kleinen Screens. Alternativ: `YAxis width={40}` und `margin left: 2` für einen ausgewogeneren Kompromiss.

## Priority

Fix before release
