# BUG-FEAT2-UX-005: Gesamtwert-h2 hat kein aria-label – Screenreader liest rohen Formatstring

- **Feature:** FEAT-2 – Portfolio-Übersicht
- **Severity:** Low
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Der Gesamtwert wird als `<h2>` gerendert mit dem Inhalt `$84,231.57`. Screenreader lesen diesen Wert als Zeichenkette – was in den meisten modernen Screenreader-Implementierungen funktioniert, aber vom Verhalten abhängt: Manche lesen "$84,231.57" als "Dollar 84 comma 231 point 57", andere als "84231 Dollar 57 Cent".

Schwerwiegender ist das `truncate`-Utility auf dem `<h2>`. Bei sehr großen Portfoliowerten (Edge Case: >1.000.000 USD, im Feature-File explizit als Edge Case genannt) würde der Wert visuell abgeschnitten. Der Screenreader liest den vollen Wert (da `truncate` nur visuell kürzt), der sehende Nutzer sieht aber einen abgebrochenen Wert – ohne Hinweis dass er unvollständig ist.

## Steps to Reproduce

1. In `mockPortfolio.ts` `totalValue` auf `1_284_231.57` setzen
2. App öffnen, Kartendarstellung prüfen

Expected: Wert bricht auf zwei Zeilen um oder der Container passt sich an, alternativ eine verkürzte Darstellung (z.B. "$1.28M") mit Tooltip für den vollen Wert

Actual: Wert wird mit `truncate` abgeschnitten ("$1,284,231...") ohne dass der Nutzer erkennt, dass der Wert unvollständig ist

## Empfehlung

Für den Großwert-Edge-Case entweder:
- `truncate` durch `break-all` oder `overflow-wrap: break-word` ersetzen
- Oder eine kompakte Darstellung für Werte über 1M implementieren (z.B. Intl-Formatter mit `notation: 'compact'`) mit `title`-Attribut für den vollen Wert

Für die Screenreader-Ausgabe: Ein explizites `aria-label` mit ausgeschriebener Zahl setzen verbessert die Zuverlässigkeit, ist aber kein kritischer Fehler.

## Priority

Nice-to-have
