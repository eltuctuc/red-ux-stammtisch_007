# Produktfähigkeiten

## App-Header *(FEAT-1, 2026-04-05)*

Cryptofolio besitzt eine persistente Navigationsleiste mit Glassmorphism-Effekt, die über alle Inhalte hinweg sichtbar bleibt. Der Header enthält das App-Branding ("Cryptofolio" mit Gradient-Text), eine dekorative Suchleiste auf Desktop sowie einen Dark/Light-Mode-Toggle. Das Theme wird in `localStorage` persistiert und ohne Seitenreload gewechselt; ein Anti-Flash-Script verhindert sichtbares Aufflackern beim Laden. Auf Mobile-Viewports ist der Header kompakt ohne Suchleiste dargestellt.

### Known Issues
- Mobile Header-Höhe 64px statt 56px (spec-konform: Low)
- Vite-Boilerplate-Assets nicht bereinigt (Low)
