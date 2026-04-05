---
status: approved
---

# Product Flows
*Erstellt von: /red:proto-flows — 2026-04-05*
*Letzte Aktualisierung: 2026-04-05*

> Dieses Dokument ist die verbindliche Navigations-Referenz für Cryptofolio.
> Kein Screen darf ohne Eintrag hier mit einem anderen verbunden werden.
> Änderungen erfordern eine explizite Entscheidung des UX Designers.

---

## Architektur-Hinweis

Cryptofolio ist eine **Single-Page Application (SPA)** mit einem einzigen Dashboard-Screen.
Es gibt keine Seitennavigation. Alle Features (FEAT-1 bis FEAT-5) sind Sections dieses Screens.
"Transitions" sind ausschließlich In-Page-Zustandsänderungen.

---

## Screens

| Screen-ID | Screen-Name       | Route | Feature  | Typ  |
|-----------|-------------------|-------|----------|------|
| S-01      | Dashboard         | /     | FEAT-1 bis FEAT-5 | Page (einziger Screen) |

---

## Einstiegspunkte

| Kontext       | Einstiegs-Screen | Bedingung |
|---------------|------------------|-----------|
| App-Start     | S-01 Dashboard   | –         |
| Direkter Link | S-01 Dashboard   | –         |

---

## Screen Transitions

Da es nur einen Screen gibt, sind alle Transitions In-Page-Interaktionen (Zustandsänderungen ohne Seitennavigation):

| Von              | Trigger                         | Wohin / Effekt              | Bedingung          | Feature  |
|------------------|---------------------------------|-----------------------------|--------------------|----------|
| S-01 Dashboard   | Dark/Light Toggle klick         | Theme wechselt in-place     | –                  | FEAT-1   |
| S-01 Dashboard   | Hover über Preis-Chart          | Tooltip erscheint           | Maus im Chart-Bereich | FEAT-3 |
| S-01 Dashboard   | Maus verlässt Chart-Bereich     | Tooltip verschwindet        | –                  | FEAT-3   |
| S-01 Dashboard   | Hover über Portfolio-Karte      | Hover-Animation aktiviert   | –                  | FEAT-2   |
| S-01 Dashboard   | Hover über Watchlist-Karte      | Hover-Animation aktiviert   | –                  | FEAT-4   |
| S-01 Dashboard   | Hover über Transaktionszeile    | Zeilen-Highlight aktiviert  | –                  | FEAT-5   |
| S-01 Dashboard   | Klick in Suchleiste             | Suchleiste erhält Fokus     | Kein echtes Filtering | FEAT-1 |

---

## Layout-Zonen S-01 Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (FEAT-1)                                            │
│  [Cryptofolio Logo]  [Suchleiste]         [Dark/Light ☀️]   │
├─────────────────────────────────────────────────────────────┤
│  PORTFOLIO-ÜBERSICHT (FEAT-2)              │                 │
│  Gesamtwert | 24h-Änderung | Sparkline     │  WATCHLIST     │
├────────────────────────────────────────────│  SIDEBAR       │
│  PREIS-CHART (FEAT-3)                      │  (FEAT-4)      │
│  Recharts AreaChart / LineChart            │                │
│  mit Hover-Tooltips                        │  BTC, ETH,     │
│                                            │  SOL, ADA,     │
│                                            │  MATIC, DOT    │
├─────────────────────────────────────────────────────────────┤
│  TRANSAKTIONSHISTORIE (FEAT-5)                              │
│  Tabelle: Datum | Asset | Buy/Sell | Menge | Preis | Total  │
└─────────────────────────────────────────────────────────────┘

Mobile (< md breakpoint):
┌──────────────────────┐
│  HEADER (FEAT-1)     │
├──────────────────────┤
│  PORTFOLIO (FEAT-2)  │
├──────────────────────┤
│  PREIS-CHART (FEAT-3)│
├──────────────────────┤
│  WATCHLIST (FEAT-4)  │
│  horizontal scroll   │
├──────────────────────┤
│  TRANSAKTIONEN       │
│  (FEAT-5) scroll-x   │
└──────────────────────┘
```

---

## Offene Transitions

| Gemeldet von | Von Screen | Situation | Status |
|---|---|---|---|
| – | – | – | – |

*(Wird vom `frontend-developer` befüllt wenn eine Transition fehlt. UX Designer muss entscheiden.)*
