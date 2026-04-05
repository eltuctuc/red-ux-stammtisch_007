# BUG-FEAT3-UX-002: Tooltip-Abschneidung am rechten Chart-Rand

- **Feature:** FEAT-3 – Interaktiver Preis-Chart
- **Severity:** High
- **Bereich:** UX
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Der `AreaChart` hat `margin={{ top: 4, right: 4, left: 0, bottom: 0 }}`. Das rechte Margin beträgt nur 4px. Recharts positioniert den Custom Tooltip standardmäßig relativ zum Datenpunkt innerhalb der SVG-Bounding-Box, ohne einen automatischen Viewport-Collision-Check.

Wenn der Nutzer über die letzten 5–10 Datenpunkte am rechten Rand hovert (Datenpunkte vom 26. März – 05. April), wird der Tooltip nach rechts positioniert und ragt über die 4px-Margin hinaus. Das umgebende div hat kein `overflow: visible`, der Tooltip wird abgeschnitten.

Auf Desktop-Breiten (Chart ~65% der 7xl-Container-Breite) ist der Effekt weniger stark, weil mehr horizontaler Raum vorhanden ist. Auf Mobile (100% Breite, h-48) sind die letzten Datenpunkte jedoch nahe am rechten Card-Rand – hier ist Abschneidung wahrscheinlich.

## Steps to Reproduce

1. Seite auf Mobile-Viewport öffnen (375px Breite)
2. Maus oder Touch über die rechtesten Datenpunkte des Charts bewegen (letzte ~10 Tage)
3. Expected: Tooltip vollständig sichtbar, ggf. links vom Cursor positioniert
4. Actual: Tooltip wird am rechten Rand abgeschnitten

## Empfehlung

Zwei Lösungsoptionen:

**Option A (einfach):** `margin` auf `{ top: 4, right: 16, left: 0, bottom: 0 }` erhöhen. Gibt dem Tooltip mehr Spielraum bevor er an den Rand trifft.

**Option B (robust):** Recharts `<Tooltip>` erhält `position={{ x: 'auto', y: 'auto' }}` und `allowEscapeViewBox={{ x: false, y: true }}`. Das verhindert horizontales Überlaufen. Alternativ: Im Custom Tooltip über die `coordinate`-Props prüfen ob der Tooltip zu nah am rechten Rand ist und ihn dann nach links spiegeln (`viewBox.width - coordinate.x < 120` → Tooltip links des Datenpunkts rendern).

## Priority

Fix before release
