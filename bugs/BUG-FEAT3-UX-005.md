# BUG-FEAT3-UX-005: Gradient-Fill im Dark Mode zu schwach – Premium-Look nicht erreicht

- **Feature:** FEAT-3 – Interaktiver Preis-Chart
- **Severity:** Low
- **Bereich:** UX
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Der SVG-Gradient unter der Preislinie ist definiert als:
- Top: `stopColor="#22d3ee" stopOpacity={0.3}`
- Bottom: `stopColor="#22d3ee" stopOpacity={0}`

Im Light Mode auf `bg-white/70` ist der Cyan-Wash mit 30% Opazität noch erkennbar und erzeugt einen angenehmen, subtilen Farbeffekt.

Im Dark Mode auf `dark:bg-white/5` (effektiv nahezu schwarz) ist das Problem: 30% Cyan auf fast-schwarzem Hintergrund erzeugt kaum sichtbaren Kontrast. Der Gradient-Fill – eine zentrale Designentscheidung für den "Premium-Look" (Spec: "AreaChart statt LineChart: Visuell stärker, Gradient-Fill unter der Linie = Premium-Look") – verschwindet optisch fast vollständig.

Das ist der Unterschied zwischen einem hochwertigen Fintech-Chart und einem einfachen Linien-Chart. User Story "Als Nutzer erkenne ich den Chart sofort als hochwertiges Fintech-Produkt-Element" ist im Dark Mode nicht erfüllt.

## Steps to Reproduce

1. Dark Mode aktivieren
2. Chart betrachten
3. Expected: Deutlich sichtbarer Cyan-Gradient-Fill unter der Linie, der den Flächencharakter des Charts hervorhebt
4. Actual: Gradient-Fill kaum sichtbar, Chart wirkt wie ein einfacher Linien-Chart ohne Fläche

## Empfehlung

Den Gradient für Dark Mode mit höherer Opazität definieren. Da SVG linearGradient keine Tailwind-Dark-Mode-Klassen unterstützt, muss das über eine CSS-Variable oder einen separaten Gradient-ID für Dark Mode gelöst werden:

**Option A – Höhere Top-Opazität:** `stopOpacity={0.3}` auf `stopOpacity={0.45}` erhöhen. Das verbessert Light und Dark Mode gleichzeitig, ohne zu überzeichnen.

**Option B – Theme-aware via CSS-Variable:**
```tsx
// In PriceChart.tsx: separater Gradient für dark
<stop offset="5%" stopColor="#22d3ee" stopOpacity={0.45} />
```
Kombination mit einer CSS-Klasse die im Dark Mode `fill-opacity` übersteuert wäre die sauberste Lösung, erfordert aber etwas mehr Aufwand.

Der einfachste Fix mit sofortigem Effekt: `stopOpacity={0.3}` → `stopOpacity={0.4}`.

## Priority

Nice-to-have
