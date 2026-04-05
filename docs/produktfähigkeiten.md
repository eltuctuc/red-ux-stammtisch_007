# Produktfähigkeiten

## Transaktionshistorie *(FEAT-5, 2026-04-05)*

Cryptofolio zeigt die letzten 5 Mock-Transaktionen in einer responsiven Datentabelle unterhalb des Dashboard-Grids. Jede Zeile enthält Datum (de-DE-Format), Asset (Symbol + Name), Transaktionstyp als farbkodiertes Pill-Badge ("Kauf" grün, "Verkauf" rot), Menge (Tausender-formatiert ≥100, 5 Dezimalstellen <1), Preis/Einheit sowie Gesamtbetrag. Die Tabelle ist in einen Glassmorphism-Wrapper eingebettet mit `overflow-hidden` für saubere Ecken; auf Mobile ist sie via `overflow-x-auto + min-w-[640px]` horizontal scrollbar ohne seitenweiten Overflow. Ein Fade-Gradient signalisiert auf Mobile den horizontalen Scroll.

### Known Issues
- ETH 0.5 → "0.50000" (5 Dezimalstellen für normale Handelsmenge) (Low)
- Spaltenkopf "Typ" zu generisch (Low)
- Mock-Transaktionsbeträge alle im $1.000–$1.800-Korridor (Low)

## Watchlist-Sidebar *(FEAT-4, 2026-04-05)*

Cryptofolio zeigt 6 Kryptowährungen (BTC, ETH, SOL, ADA, MATIC, DOT) in einer kompakten Sidebar. Jede Karte enthält Symbol, Name, formatierten USD-Preis (2 oder 4 Dezimalstellen je nach Größenordnung), eine farbkodierte 24h-Änderung (grün/rot/grau mit Icon) und eine Mini-Sparkline (80×40px). Auf Desktop erscheint die Sidebar als vertikale Liste in der rechten Spalte; auf Mobile als horizontal scrollbare Karten-Reihe mit Snap-Verhalten (min-w-[185px] für natürlichen Scroll-Hint). MATIC zeigt 0%-Änderung neutral-grau mit Minus-Icon.

### Known Issues
- Hover-Animation leicht abweichend zu PortfolioCard (scale-[1.02] vs scale-[1.01]) (Low)

## Interaktiver Preis-Chart *(FEAT-3, 2026-04-05)*

Cryptofolio zeigt den Preisverlauf von Bitcoin als interaktiven Flächenchart mit 90 deterministisch generierten Mock-Datenpunkten (±4% Tagesvolatilität, Startpreis $45.000). Beim Hovern erscheint ein Custom-Tooltip im Glassmorphism-Stil mit formatiertem Datum (de-DE) und USD-Preis. Der Chart nutzt Recharts AreaChart mit Cyan-Gradient-Fill und passt sich via ResponsiveContainer automatisch der Container-Breite an (h-48 Mobile / h-80 Desktop). Die Achsen sind kompakt beschriftet (XAxis: alle 15 Tage, YAxis: $Xk-Format).

### Known Issues
- XAxis: letzter Datenpunkt (aktuelles Datum) erscheint nicht als Label (Low)
- Tooltip Dark-Mode-Hintergrund hardcoded (#1a1d27, kein Token) (Low)
- Gradient-Fill im Dark Mode optisch schwächer als im Light Mode (Low)

## Portfolio-Übersicht *(FEAT-2, 2026-04-05)*

Cryptofolio zeigt beim Dashboard-Aufruf sofort den Gesamtportfoliowert als Hero-Karte. Die Karte enthält den formatierten USD-Wert ($84.231,57), die 24h-Änderung in Prozent und Absolutbetrag (farblich kodiert: grün/rot), sowie eine kompakte Sparkline der letzten 7 Tage. Die Karte verwendet Glassmorphism-Styling mit Hover-Animation und ist im Desktop-Grid links auf 2/3 Breite positioniert; auf Mobile nimmt sie die volle Breite ein. Alle Daten basieren auf realistischen Mock-Werten.

### Known Issues
- Gesamtwert > $1M wird auf Mobile durch `truncate` abgeschnitten (Low)
- Sparkline XAxis nicht explizit hidden (Low)

## App-Header *(FEAT-1, 2026-04-05)*

Cryptofolio besitzt eine persistente Navigationsleiste mit Glassmorphism-Effekt, die über alle Inhalte hinweg sichtbar bleibt. Der Header enthält das App-Branding ("Cryptofolio" mit Gradient-Text), eine dekorative Suchleiste auf Desktop sowie einen Dark/Light-Mode-Toggle. Das Theme wird in `localStorage` persistiert und ohne Seitenreload gewechselt; ein Anti-Flash-Script verhindert sichtbares Aufflackern beim Laden. Auf Mobile-Viewports ist der Header kompakt ohne Suchleiste dargestellt.

### Known Issues
- Mobile Header-Höhe 64px statt 56px (spec-konform: Low)
- Vite-Boilerplate-Assets nicht bereinigt (Low)
