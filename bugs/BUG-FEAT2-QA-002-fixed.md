# BUG-FEAT2-QA-002: article-Element hat keinen zugänglichen Namen

- **Feature:** FEAT-2 – Portfolio-Übersicht
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** QA Engineer
- **Status:** Fixed

## Steps to Reproduce
1. App starten
2. Screen Reader auf das `<article>`-Element navigieren (z.B. VoiceOver: Artikel-Navigation mit `A`)

Expected: Screen Reader kündigt den Artikel mit einem beschreibenden Namen an, z.B. "Portfolio-Gesamtwert, Artikel"
Actual: Screen Reader kündigt nur "Artikel" an – kein zugänglicher Name vorhanden

## Technische Ursache

`PortfolioCard.tsx` – das `<article>` hat weder ein `aria-label` noch ein `aria-labelledby`, das auf das `<h2>` zeigt:

```tsx
<article className="...">
  ...
  <h2 ...>{totalFormatter.format(totalValue)}</h2>
```

Das `<h2>` enthält den formatierten Währungsbetrag (`$84,231.57`), nicht den semantischen Titel der Karte. Das `<p>` "Portfolio-Gesamtwert" ist ein `<p>`, nicht ein `<h2>` oder ein ARIA-Label-Anker.

Die Spec (A11y-Architektur) verlangt: "`<article>` oder `<section>` mit beschreibendem Heading".

Korrekturoption A – aria-label direkt:
```tsx
<article aria-label="Portfolio-Gesamtwert" className="...">
```

Korrekturoption B – aria-labelledby auf ein Heading mit Titel (statt dem Formatierungswert):
```tsx
<p id="portfolio-card-title" ...>Portfolio-Gesamtwert</p>
<article aria-labelledby="portfolio-card-title" ...>
```

Option A ist die einfachste Lösung ohne Struktur-Umbau.

## Priority
Fix before release
