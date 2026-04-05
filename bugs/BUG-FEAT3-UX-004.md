# BUG-FEAT3-UX-004: Tooltip Dark-Mode-Hintergrund inkonsistent zur Card-Surface

- **Feature:** FEAT-3 – Interaktiver Preis-Chart
- **Severity:** Low
- **Bereich:** Konsistenz
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Der `PriceChartTooltip` nutzt im Dark Mode `dark:bg-[#1a1d27]/90` – einen hardcodierten Hex-Wert. Der Card-Wrapper (`PriceChart`) nutzt `dark:bg-white/5`. Der App-Header nutzt `dark:bg-[#0f1117]/80`.

Es existieren damit drei verschiedene Dark-Mode-Surface-Werte im selben Feature-Stack:
- Card: `white/5` (sehr transparent, fast schwarz)
- Tooltip: `#1a1d27` mit 90% Opazität (mittelgrau-blau, sehr opak)
- Header: `#0f1117` mit 80% Opazität (fast schwarz, mittel-opak)

Aus Nutzerperspektive: Der Tooltip wirkt im Dark Mode wie ein fremdes Element – er hat eine spürbar andere Tonalität als die Card darunter. Glassmorphism lebt von visueller Schichtung und Konsistenz der Surfaces. Hier hebt sich der Tooltip nicht als klar definierter Layer ab, er sieht einfach "anders" aus.

Der Spec sagt explizit "Glassmorphism-Styling konsistent mit PortfolioCard-Tooltip-Erwartungen" – das ist hier nicht erfüllt.

## Steps to Reproduce

1. Dark Mode aktivieren
2. Über Chart hovern bis Tooltip erscheint
3. Expected: Tooltip wirkt wie eine konsistente, leicht gehobene Glassmorphism-Schicht über der Chart-Card
4. Actual: Tooltip hat einen spürbar anderen, opakereren Dark-Surface-Ton als die Card selbst

## Empfehlung

Tooltip-Hintergrund auf einen Wert angleichen, der die Glassmorphism-Konsistenz wahrt:

```
dark:bg-white/10
```

Das entspricht dem Muster der Card (`dark:bg-white/5`) und fügt +5% Opazität als Elevation-Signal hinzu – der Tooltip wirkt höher gestellt als die Card, ohne fremd zu wirken. `backdrop-blur-md` bleibt erhalten. Der hardcodierte `#1a1d27`-Wert sollte entfernt werden.

## Priority

Nice-to-have
