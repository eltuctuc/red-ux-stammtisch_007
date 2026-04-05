# BUG-FEAT2-QA-003: Gesamtwert wird bei sehr großen Werten (> $1M) mit truncate abgeschnitten statt lesbar angezeigt

- **Feature:** FEAT-2 – Portfolio-Übersicht
- **Severity:** Low
- **Bereich:** Functional
- **Gefunden von:** QA Engineer
- **Status:** Open

## Steps to Reproduce
1. `totalValue` in `mockPortfolio.ts` auf `1_234_567.89` setzen
2. App auf mobiler Viewport-Breite öffnen (375px)
3. Gesamtwert-Display beobachten

Expected: Wert "$1,234,567.89" vollständig lesbar – entweder durch kleinere Schrift oder Umbruch
Actual: Text wird durch `truncate` (CSS `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`) abgeschnitten und als "$1,234,5…" dargestellt – der tatsächliche Wert ist nicht mehr ablesbar

## Technische Ursache

`PortfolioCard.tsx` Z. 34:
```tsx
<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
```

`truncate` verhindert Zeilenumbruch. Bei 375px Breite, abzüglich Padding und der 120px Sparkline plus 16px Gap, verbleiben ca. 195px für den Text. Bei `text-3xl` (30px) passt `$1,234,567.89` (13 Zeichen) nicht in diesen Bereich.

Der Edge Case "Wert > 1.000.000 USD brechen das Layout nicht" ist aus dem Layout-Bruch-Blickwinkel bestanden (kein Overflow), aber der Wert ist semantisch unlesbar – was für eine primäre Datenkarte inakzeptabel ist.

Korrektur: `truncate` entfernen und stattdessen `break-all` oder `text-2xl md:text-3xl lg:text-4xl` mit dynamischer Schriftgrößen-Skalierung verwenden. Alternativ: `shrink` auf dem Sparkline-Container bei sehr kleinen Viewports zulassen.

## Priority
Nice-to-have
