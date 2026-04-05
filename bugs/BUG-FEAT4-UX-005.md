# BUG-FEAT4-UX-005: Hover-Animation inkonsistent mit PortfolioCard (scale vs. shadow)

- **Feature:** FEAT-4 – Watchlist-Sidebar
- **Severity:** Low
- **Bereich:** Konsistenz
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

WatchlistCard und PortfolioCard verwenden beide Hover-Animationen, aber mit umgekehrten Gewichtungen:

| Komponente | Scale | Shadow |
|---|---|---|
| WatchlistCard | `hover:scale-[1.02]` | `hover:shadow-md` |
| PortfolioCard | `hover:scale-[1.01]` | `hover:shadow-lg` |

WatchlistCard skaliert stärker (1.02 vs. 1.01), hat aber einen kleineren Shadow (md vs. lg). Das fühlt sich im Zusammenspiel auf dem gleichen Dashboard inkonsistent an: Eine Karte "springt" stärker, die andere "hebt sich" mehr. Die Signale gehen in unterschiedliche Richtungen.

Laut UX-Skill-Regel `elevation-consistent`: "Use a consistent elevation/shadow scale for cards, sheets, modals; avoid random shadow values."

## Steps to Reproduce

1. Dashboard öffnen (Desktop)
2. Über PortfolioCard hovern – setzt sich subtil ab mit starkem Shadow
3. Über eine WatchlistCard hovern – springt stärker nach vorne mit schwächerem Shadow
4. Expected: Gleiches Hover-Verhalten oder zumindest eine konsistente Logik (kleinere Karte = kleinerer Effekt insgesamt)
5. Actual: WatchlistCard skaliert mehr, hat aber weniger Shadow – kein kohärentes Elevation-System

## Empfehlung

Entweder beide auf das gleiche Muster bringen oder eine intentionale Abstufung definieren:
- Karten-Hierarchie: PortfolioCard ist die primäre Card → darf mehr Shadow bekommen
- WatchlistCard ist sekundär → sollte dann auch weniger Scale haben: `hover:scale-[1.01] hover:shadow-md`

Oder: WatchlistCard mit `hover:scale-[1.02] hover:shadow-lg` angleichen an PortfolioCard-Niveau.
Wichtig: Nicht mischen – entweder beide mit mehr Scale oder beide mit mehr Shadow als Hover-Signal.

## Priority

Nice-to-have
