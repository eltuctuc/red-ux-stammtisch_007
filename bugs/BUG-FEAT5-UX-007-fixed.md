# BUG-FEAT5-UX-007: Spaltenköpfe im Dark Mode konträrlogisch dunkler als im Light Mode

- **Feature:** FEAT-5 – Transaktionshistorie
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Die Spaltenköpfe der Tabelle (`<th>`) nutzen `text-gray-400 dark:text-gray-500`. Das bedeutet:
- Light Mode: `gray-400` (Tailwind: `#9ca3af`)
- Dark Mode: `gray-500` (Tailwind: `#6b7280`)

Im Dark Mode wird die Farbe damit **dunkler**, nicht heller. Auf einem dunklen Hintergrund (`bg-white/5` ≈ fast schwarz) mit `gray-500`-Text ergibt sich ein niedrigeres Kontrastverhältnis als im Light Mode.

WCAG 2.1 AA verlangt für Text unter 18px (hier: `text-xs` = 12px) ein Kontrastverhältnis von 4.5:1. `gray-500` (#6b7280) auf `#0f1117` (Dark Mode Hintergrund) hat ein Kontrastverhältnis von ca. 3.8:1 – unterhalb des AA-Grenzwerts für diesen Schriftgrad.

Laut UX-Standard `color-dark-mode`: "Dark mode uses desaturated/lighter tonal variants, not inverted colors; test contrast separately."

## Steps to Reproduce

1. Dashboard in den Dark Mode wechseln
2. Spaltenköpfe der Transaktionshistorie betrachten: "DATUM | ASSET | TYP | MENGE | PREIS/EINHEIT | GESAMTBETRAG"
3. Expected: Spaltenköpfe sind im Dark Mode mindestens so gut lesbar wie im Light Mode (Kontrast >= 4.5:1)
4. Actual: Spaltenköpfe sind dunkler als im Light Mode – Kontrast ca. 3.8:1 auf dunklem Hintergrund (WCAG AA-Verletzung für 12px-Text)

## Empfehlung

Dark-Mode-Klasse von `dark:text-gray-500` auf `dark:text-gray-400` oder `dark:text-gray-300` ändern. `gray-400` (#9ca3af) auf `#0f1117` ergibt ca. 5.7:1 – WCAG AA konform.

```tsx
className="... text-gray-400 dark:text-gray-400"
// oder für bessere Unterscheidbarkeit von Datenzellen:
className="... text-gray-500 dark:text-gray-400"
```

## Priority

Fix before release
