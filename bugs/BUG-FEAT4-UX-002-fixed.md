# BUG-FEAT4-UX-002: Snap-Wrapper-Div unterbricht ul > li Semantik für Screenreader

- **Feature:** FEAT-4 – Watchlist-Sidebar
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

In `WatchlistSidebar.tsx` wird jede `WatchlistCard` in ein zusätzliches `<div>` (den Snap-Wrapper) eingeschlossen, das direkt als Kind der `<ul>` sitzt. Die `<li>`-Elemente sind damit keine direkten Kinder der `<ul>` mehr. Das bricht die semantische `list > listitem`-Beziehung, die ARIA und assistive Technologien erwarten.

Screenreader (VoiceOver, NVDA) kündigen Listen-Items nur korrekt an wenn `<li>` direkte Kinder von `<ul>` sind. Bei einem eingeschobenen `<div>` kann die Listenanzahl falsch kommuniziert werden ("Liste mit 1 Element" statt "Liste mit 6 Elementen") oder die Items werden gar nicht als Listenelemente erkannt.

Zusätzlich: `<ul>` hat bereits eine implizite `list`-Rolle. Das explizite `role="list"` ist nicht falsch, aber redundant. Problematischer ist das `<div>`-Kind.

## Steps to Reproduce

1. Browser-Accessibility-Tree öffnen (Chrome DevTools > Accessibility, oder AXE-Erweiterung)
2. Zur Watchlist-Liste navigieren
3. Expected: `<ul>` hat 6 direkte `<li>`-Kinder, Screenreader kündigt "Liste mit 6 Einträgen" an
4. Actual: `<ul>` hat 6 `<div>`-Kinder, jedes mit einem `<li>`. Die Listensemantik ist unterbrochen.

## Empfehlung

Den Snap-Wrapper von `<div>` auf `<li>` ändern und den `role="listitem"` aus `WatchlistCard` entfernen (er wäre dann implizit durch das `<li>`-Element des Wrappers gegeben). Alternativ: Den Snap-Wrapper entfernen und die Snap-Klassen direkt auf das `<li>` in `WatchlistCard` verschieben.

Option A – Wrapper zu `<li>` machen:
```tsx
// WatchlistSidebar.tsx
<li key={entry.symbol} className="snap-start shrink-0 md:shrink md:w-auto">
  <WatchlistCard entry={entry} />
</li>
```
Dann in `WatchlistCard.tsx` das äußere Element von `<li role="listitem">` auf `<div>` ändern, da das `<li>` jetzt im Wrapper liegt.

Option B – Wrapper entfernen, Snap-Klassen auf WatchlistCard-`<li>` legen:
```tsx
// WatchlistSidebar.tsx – kein Wrapper-Div mehr
{mockWatchlist.map(entry => (
  <WatchlistCard key={entry.symbol} entry={entry} />
))}
```
```tsx
// WatchlistCard.tsx – Snap-Klassen direkt auf <li>
<li className="snap-start shrink-0 md:shrink md:w-auto ...restliche Klassen">
```

## Priority

Fix before release
