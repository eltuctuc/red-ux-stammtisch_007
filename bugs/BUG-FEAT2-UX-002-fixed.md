# BUG-FEAT2-UX-002: Kein h1 auf der Seite – h2 in PortfolioCard ist semantisch falsch verankert

- **Feature:** FEAT-2 – Portfolio-Übersicht
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Die PortfolioCard rendert den Gesamtwert als `<h2>`. Das ist die erste und einzige Heading auf der gesamten Seite – ein `<h1>` existiert nicht. Das Logo "Cryptofolio" im Header ist als `<span>` ausgezeichnet, nicht als Heading.

Für Screenreader-Nutzer, die per Heading-Navigation durch die Seite springen (übliche Strategie bei NVDA/VoiceOver), beginnt die Hierarchie auf Ebene 2 ohne übergeordneten Kontext. Das verletzt WCAG 2.1 Erfolgskriterium 1.3.1 (Info and Relationships) sowie die unter A11y-Architektur im Feature-File dokumentierte Anforderung: "Gesamtwert als `<h2>` lesbar" – was impliziert, dass ein `<h1>` vorher existieren muss.

Die Seite hat aktuell keine semantische Seitenidentität für assistive Technologien.

## Steps to Reproduce

1. App im Browser öffnen (Route `/`)
2. Browser-DevTools → Accessibility Tree prüfen, oder Heading-Navigation via Screenreader starten
3. Erste gefundene Heading auf der Seite: `<h2>$84,231.57`

Expected: Es gibt ein `<h1>` das die Seite identifiziert (z.B. "Dashboard" oder "Cryptofolio"), bevor der `<h2>` des Portfoliowerts erscheint

Actual: Heading-Hierarchie beginnt auf Ebene 2, Ebene 1 fehlt komplett

## Empfehlung

Entweder das Logo "Cryptofolio" im Header als `<h1>` auszeichnen (mit visuell gleichem Styling via CSS, da es kein Fließtext-Heading ist), oder einen visuell versteckten `<h1>` mit `sr-only` in `App.tsx` als erste Heading der Seite einfügen:

```tsx
// In App.tsx, vor oder innerhalb von <main>
<h1 className="sr-only">Cryptofolio Dashboard</h1>
```

Das Header-Logo als `<h1>` zu markieren ist semantisch sauberer, da es den Seitentitel repräsentiert.

## Priority

Fix before release
