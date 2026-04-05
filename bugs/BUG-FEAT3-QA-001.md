# BUG-FEAT3-QA-001: XAxis letzter Datenpunkt (2026-04-05) nicht sichtbar als Label

- **Feature:** FEAT-3 – Interaktiver Preis-Chart
- **Severity:** Low
- **Bereich:** Functional
- **Gefunden von:** QA Engineer
- **Status:** Open

## Steps to Reproduce

1. App öffnen, Dashboard laden
2. XAxis des Preis-Charts betrachten
3. Letztes sichtbares Datum auf der X-Achse notieren

Expected: Das aktuellste Datum (2026-04-05) ist als letztes X-Achsen-Label sichtbar – User versteht, dass der Chart "bis heute" geht.

Actual: Das letzte sichtbare XAxis-Label ist `31. März` (Index 84 von 89). Die letzten 5 Datenpunkte (01.–05. April) haben kein Achsen-Label. Der Chart endet visuell ohne erkennbares Enddatum.

## Technische Ursache

`interval={14}` auf XAxis erzeugt Labels an Indizes 0, 14, 28, 42, 56, 70, 84. Index 89 (letzter Datenpunkt) wird nicht getroffen. Recharts bietet keine eingebaute Option zum zusätzlichen Erzwingen des letzten Labels.

## Workaround-Optionen

- `interval="preserveStartEnd"` nutzen: Recharts zeigt dann garantiert ersten + letzten Tick, verteilt dazwischen automatisch
- Manuell `ticks={[data[0].date, data[14].date, ..., data[89].date]}` übergeben

## Priority

Nice-to-have (Tooltip zeigt das genaue Datum beim Hover – der Informationsverlust ist minimal. Kein Render-Fehler, keine fehlerhafte Berechnung.)
