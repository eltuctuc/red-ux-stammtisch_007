# BUG-FEAT5-UX-003: Kein Scroll-Hint für horizontales Scrollen auf Mobile

- **Feature:** FEAT-5 – Transaktionshistorie
- **Severity:** Medium
- **Bereich:** UX
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Auf Mobile ist die Tabelle horizontal scrollbar (per `overflow-x-auto` + `min-w-[640px]`). Es gibt jedoch keine visuelle Affordanz, die dem Nutzer signalisiert, dass weiterer Inhalt durch Swipen erreichbar ist. Kein Fade-Gradient am rechten Rand, kein Scroll-Indikator, kein Hinweistext.

Ein Nutzer auf einem 375px-Gerät sieht eine abgeschnittene Tabelle und hat keinen Grund anzunehmen, dass die fehlenden Spalten durch horizontales Wischen erreichbar sind. Die Spalten "Preis/Einheit" und "Gesamtbetrag" – die für das Verständnis einer Transaktion zentral sind – liegen außerhalb des initialen Viewports.

Laut UX-Standard `swipe-clarity`: "Swipe actions must show clear affordance or hint (chevron, label, tutorial)."

## Steps to Reproduce

1. Dashboard auf Mobile (320–375px) öffnen oder Browser auf ~375px verkleinern
2. Zur Transaktionshistorie scrollen
3. Expected: Ein visueller Hinweis (z.B. Fade-Gradient rechts, Scrollbar sichtbar, partielle nächste Spalte) zeigt an, dass mehr Inhalte erreichbar sind
4. Actual: Tabelle endet abrupt – kein Hinweis auf horizontalen Scroll-Inhalt

## Empfehlung

Einen rechtsseitigen Fade-Gradient als Pseudo-Element auf dem `overflow-x-auto`-Container ergänzen, um den Cutoff visuell zu kommunizieren. Alternativ eine kleine Scrollbar per `scrollbar-thin` oder ein sichtbarer Teil der nächsten Spalte als natürliche Affordanz.

Beispiel Tailwind/CSS:
```
<div className="overflow-x-auto relative after:absolute after:right-0 after:top-0 after:h-full after:w-8 after:bg-gradient-to-l after:from-white/60 dark:after:from-[#0f1117]/60 after:pointer-events-none">
```

## Priority

Fix before release
