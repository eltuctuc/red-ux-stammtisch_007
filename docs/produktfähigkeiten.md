# Produktfähigkeiten

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
