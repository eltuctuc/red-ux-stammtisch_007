# BUG-FEAT3-UX-001: Doppeltes aria-label – article und inneres role="img" redundant

- **Feature:** FEAT-3 – Interaktiver Preis-Chart
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Der `<article>`-Wrapper in `PriceChart.tsx` trägt bereits `aria-label="Bitcoin Preisverlauf der letzten 90 Tage"`. Das darin verschachtelte `<div>` hat zusätzlich `role="img" aria-label="Bitcoin Preisverlauf der letzten 90 Tage als Flächendiagramm"`.

Ein Screenreader kündigt beim Eintreten in die Komponente zuerst das `article`-Label an, dann – wenn er das innere div erreicht – ein zweites, leicht abweichendes Label für dasselbe visuelle Objekt. Das erzeugt redundante Ausgabe ("Bitcoin Preisverlauf der letzten 90 Tage … Bitcoin Preisverlauf der letzten 90 Tage als Flächendiagramm") und wirkt wie ein Fehler, nicht wie eine Beschreibung.

## Steps to Reproduce

1. Seite mit Screenreader (VoiceOver macOS oder NVDA) öffnen
2. Zur PriceChart-Card navigieren
3. Expected: Eine klare, einmalige Ankündigung des Charts
4. Actual: Zwei Ankündigungen – erst das article-Label, dann das role="img"-Label mit leicht abweichendem Text

## Empfehlung

Entweder:
- `aria-label` vom `<article>`-Element entfernen und ausschließlich das `role="img"` mit aussagekräftigem Label im inneren div behalten
- Oder: `role="img"` und `aria-label` vom inneren div entfernen, da das `<article>` mit seinem Label bereits eine semantische Einheit bildet

Die bessere Option: `<article>` ohne aria-label (semantisches Landmark reicht), das innere div behält `role="img" aria-label="Bitcoin Preisverlauf der letzten 90 Tage als Flächendiagramm"`. Das `article` wirkt dann als struktureller Container, der Chart als eigenständiges Bildobjekt darin.

## Priority

Fix before release
