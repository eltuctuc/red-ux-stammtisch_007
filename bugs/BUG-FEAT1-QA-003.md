# BUG-FEAT1-QA-003: Vite-Boilerplate-Dateien nicht bereinigt (App.css, assets/)

- **Feature:** FEAT-1 – App-Header
- **Severity:** Low
- **Bereich:** Functional
- **Gefunden von:** QA Engineer
- **Status:** Open

## Steps to Reproduce
1. Dateisystem unter `projekt/src/` inspizieren

Expected: Nur feature-relevante Dateien vorhanden
Actual: Folgende Vite-Boilerplate-Dateien existieren noch und sind nicht Teil des Features:
- `projekt/src/App.css` – enthält `.counter`, `.hero` etc. (Vite Scaffold-Styles)
- `projekt/src/assets/react.svg`
- `projekt/src/assets/vite.svg`
- `projekt/src/assets/hero.png`

`App.css` wird aktuell von keiner Datei importiert, ist also inaktiv. Die Asset-Dateien werden nicht referenziert. Kein Laufzeitfehler, aber die Dateien verursachen:
- Verwirrung bei künftigen Entwicklern (Was gehört zum Projekt?)
- Mögliche false positives bei Lint-Tools oder Build-Analysen
- Unnötiger Build-Output wenn Assets je referenziert werden

## Priority
Nice-to-have
