# BUG-FEAT1-QA-005: Header-Höhe auf Mobile nicht 56px – Header ist fix auf h-16 (64px)

- **Feature:** FEAT-1 – App-Header
- **Severity:** Low
- **Bereich:** Functional
- **Gefunden von:** QA Engineer
- **Status:** Open

## Steps to Reproduce
1. App im Browser auf 375px Breite öffnen (DevTools Mobile Simulation)
2. Header-Höhe messen

Expected: Header-Höhe auf Mobile 56px (laut FEAT-1 UX-Entscheidungen: "Header-Height: 64px Desktop, 56px Mobile")
Actual: Header ist `h-16` (= 64px) fix ohne responsiven Breakpoint. Auf Mobile ist die Höhe ebenfalls 64px.

## Technische Ursache

`Header.tsx` Z. 7:
```tsx
className="sticky top-0 z-50 h-16 flex items-center px-4 md:px-6
```

`h-16` hat keinen Mobile-Breakpoint-Override. Korrekt wäre:
```tsx
className="sticky top-0 z-50 h-14 md:h-16 flex items-center px-4 md:px-6
```
(`h-14` = 56px in Tailwind)

Kein funktionaler Bruch, aber Abweichung von der spezifizierten UX-Entscheidung.

## Priority
Nice-to-have
