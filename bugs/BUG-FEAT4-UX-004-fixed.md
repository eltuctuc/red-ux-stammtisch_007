# BUG-FEAT4-UX-004: Kein Scroll-Hint auf Mobile – weitere Karten nicht erkennbar

- **Feature:** FEAT-4 – Watchlist-Sidebar
- **Severity:** Medium
- **Bereich:** UX
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Auf Mobile ist die Watchlist eine horizontal scrollbare Kartenreihe (`flex overflow-x-auto snap-x`). Es gibt kein visuelles Signal, dass außerhalb des sichtbaren Bereichs weitere Karten existieren:
- Keine Fade-/Gradient-Edge am rechten Rand
- Keine Scrollbar (durch `overflow-x-auto` auf mobilen Browsern oft versteckt)
- Keine Dot-Pagination, kein Pfeil-Hint, kein Label wie "6 Assets"

Je nach Viewport-Breite und Karten-Breite (min-w-[200px]) können 1–2 Karten sichtbar sein. Wenn die letzte sichtbare Karte zufällig bündig mit dem Viewport abschließt, gibt es keinen visuellen Hinweis auf weiteren Inhalt.

Persona Marcus scrollt mobil "kurz für einen Check" – wenn er BTC und ETH sieht und nicht erkennt dass SOL, ADA, MATIC und DOT noch da sind, ist der Überblick unvollständig.

## Steps to Reproduce

1. Dashboard auf mobilem Gerät oder im Browser bei ~375px Breite öffnen
2. Watchlist-Bereich unterhalb des Charts betrachten
3. Expected: Visueller Hinweis dass mehr Karten durch Scrollen erreichbar sind (Fade-Edge, teilweise sichtbare nächste Karte, oder Scrollbar)
4. Actual: Kein Hinweis – je nach Viewport-Ausrichtung sieht der Nutzer 1-2 vollständige Karten ohne erkennbares Signal für weitere Inhalte

## Empfehlung

Einfachste Lösung: Eine CSS-Gradient-Fade-Edge am rechten Rand des Containers, die ausgeblendet wird sobald der Nutzer ans Ende gescrollt hat. Alternativ: Die Karten-Breite so wählen dass die letzte sichtbare Karte immer angeschnitten ist (ca. 85-90% sichtbar), was als natürlicher Scroll-Affordance gilt.

Beispiel Gradient-Overlay (pseudo-element auf dem Wrapper):
```css
/* Nach dem ul, relative Container mit overflow hidden + gradient rechts */
```

Oder einfacher: `min-w-[185px]` statt `[200px]` so dass bei 375px Viewport immer 2 Karten + ein Anschnitt der dritten sichtbar ist.

## Priority

Fix before release
