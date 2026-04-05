# BUG-FEAT4-QA-002: Invalides HTML – <div> als direktes Kind von <ul>

- **Feature:** FEAT-4 – Watchlist-Sidebar
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** QA Engineer
- **Status:** Fixed

## Steps to Reproduce

1. App öffnen, Browser DevTools öffnen (F12)
2. HTML-Struktur der Watchlist-Sidebar inspizieren
3. Kinder des `<ul role="list">` Elements prüfen

Expected: Direkte Kinder von `<ul>` sind ausschließlich `<li>`-Elemente (HTML5-Spec). Screen Reader traversiert die Liste korrekt als 6 Listenelemente.

Actual: Direkte Kinder von `<ul>` sind `<div>`-Elemente mit `snap-start shrink-0`-Klassen, die wiederum `<li>`-Elemente wrappen. Das ist invalides HTML. Browser-Korrekturverhalten ist nicht spezifiziert und kann die A11y-Listennavigation unterbrechen.

## Technische Ursache

In `projekt/src/components/WatchlistSidebar.tsx`, Zeile 30:

```tsx
<ul role="list" aria-label="Watchlist" className="...">
  {mockWatchlist.map(entry => (
    <div key={entry.symbol} className="snap-start shrink-0 md:shrink md:w-auto">
      <WatchlistCard entry={entry} />   {/* rendert <li> */}
    </div>
  ))}
</ul>
```

Das `<div>` wird als snap-container für Mobile eingesetzt, aber als direktes `<ul>`-Kind ist es nicht valide.

## Fix-Optionen

**Option A (empfohlen):** `snap-start shrink-0 md:shrink md:w-auto` direkt auf das `<li>` in `WatchlistCard.tsx` verschieben, den `<div>`-Wrapper entfernen.

```tsx
<ul role="list" aria-label="Watchlist" className="...">
  {mockWatchlist.map(entry => (
    <WatchlistCard key={entry.symbol} entry={entry} />
  ))}
</ul>
```

Und in `WatchlistCard.tsx` die `<li>`-className um `snap-start shrink-0 md:shrink md:w-auto` erweitern.

**Option B:** Statt `<ul>/<li>` ein `<div role="list">` mit `<div role="listitem">` verwenden – valides HTML, da ARIA-Rollen explizit gesetzt.

## Priority

Fix before release
