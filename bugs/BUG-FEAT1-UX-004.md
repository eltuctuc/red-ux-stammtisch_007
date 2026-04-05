# BUG-FEAT1-UX-004: Mobile Header-Höhe entspricht nicht der Spec (64px statt 56px)

- **Feature:** FEAT-1 – App-Header
- **Severity:** Low
- **Bereich:** UX
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Die UX-Spec (FEAT-1, Abschnitt 2, Mobile-Verhalten) definiert:
- Desktop: 64px Header-Höhe
- Mobile: 56px Header-Höhe

**Implementierung (Header.tsx, Zeile 7):**
```tsx
className="sticky top-0 z-50 h-16 flex items-center px-4 md:px-6 ..."
```

`h-16` entspricht 64px – ohne Breakpoint. Die mobile Höhe ist nicht als `h-14` (56px) für
Viewports unter 768px definiert. Der Header ist auf Mobile genauso hoch wie auf Desktop.

Das ist kein kritischer Fehler, aber:
- 56px auf Mobile ist ein etablierter Standard (Material Design App Bar, iOS Navigation Bar)
- 64px auf Mobile verschwendet vertikalen Viewport-Platz, der auf kleinen Screens wertvoll ist
- Die Spec-Abweichung kann Folgeprobleme bei FEAT-2 bis FEAT-5 erzeugen, wenn diese
  mit fester Header-Höhe rechnen (z. B. sticky-Top-Offsets, scroll-margin-top)

## Steps to Reproduce

1. App auf mobilem Viewport (< 768px) öffnen oder Browser auf < 768px verkleinern.
2. Header-Höhe messen.
3. Expected: Header-Höhe = 56px (h-14 in Tailwind).
4. Actual: Header-Höhe = 64px (h-16 durchgehend).

## Empfehlung

Responsive Höhe in Header.tsx setzen:

```tsx
className="sticky top-0 z-50 h-14 md:h-16 flex items-center px-4 md:px-6 ..."
```

`h-14` = 56px (Mobile), `h-16` = 64px (Desktop) – exakt laut Spec.

## Priority

Fix before release
