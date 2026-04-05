# BUG-FEAT1-QA-004: SearchBar fehlt role="search" – Landmark nicht erkennbar für Screen Reader

- **Feature:** FEAT-1 – App-Header
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** QA Engineer
- **Status:** Open

## Steps to Reproduce
1. App mit Screen Reader (VoiceOver/NVDA) öffnen
2. Landmark-Navigation nutzen (z.B. VoiceOver: VO + U → Landmarks-Liste)

Expected: Suchbereich als "Suche"-Landmark navigierbar
Actual: Das `<input type="search">` in SearchBar.tsx ist zwar korrekt als `type="search"` ausgezeichnet und hat `aria-label="Suche"`. Allerdings ist das umschließende `<div>` kein Landmark. Für Screen-Reader-Nutzer, die per Landmark-Navigation navigieren, ist der Suchbereich nicht als eigenständige Region auffindbar.

## Technische Ursache

`SearchBar.tsx` Z. 3:
```tsx
<div className="hidden md:flex flex-1 max-w-sm mx-4">
```

Das `<div>` hat keine semantische Rolle. Die Spec definiert in der A11y-Architektur `<input type="search">` als Element – das ist korrekt vorhanden. Die ARIA-Spec empfiehlt jedoch für Suchfelder ein umschließendes `<search>`-Element (HTML5.3/ARIA) oder `role="search"` auf dem Wrapper.

Korrekte Implementierung:
```tsx
<div role="search" className="hidden md:flex flex-1 max-w-sm mx-4">
```

Alternativ: HTML `<search>`-Element (breite Browser-Unterstützung ab 2024).

## Priority
Fix before release
