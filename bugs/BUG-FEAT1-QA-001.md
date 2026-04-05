# BUG-FEAT1-QA-001: Anti-Flash-Script entfernt dark-Klasse nicht bei light-Wechsel

- **Feature:** FEAT-1 – App-Header
- **Severity:** High
- **Bereich:** Functional
- **Gefunden von:** QA Engineer
- **Status:** Open

## Steps to Reproduce
1. App im Browser laden – Dark Mode ist aktiv (Standard)
2. Theme-Toggle klicken – Light Mode wird aktiv, localStorage erhält `cryptofolio-theme = 'light'`
3. Seite mit F5 hart neu laden

Expected: Seite erscheint sofort im Light Mode, kein FOUC
Actual: Seite erscheint kurz im Dark Mode (dark-Klasse durch Anti-Flash-Script gesetzt), wechselt dann nach React-Hydration in Light Mode – sichtbares Aufflackern

## Technische Ursache

`index.html` Z. 11–13:
```js
if (!stored || stored === 'dark') {
  document.documentElement.classList.add('dark')
}
```

Das Script setzt die `dark`-Klasse korrekt, aber entfernt sie **nicht** wenn `stored === 'light'` ist.
Das `<html>`-Element hat beim initialen Parse keine `dark`-Klasse – das klingt sicher, aber Vite/Browser könnten in manchen Szenarien (z.B. BFCache, Tab-Restore) den DOM-Zustand erhalten. Schwerwiegender: Das Muster ist strukturell unvollständig – der `else`-Zweig fehlt explizit.

Korrekte Implementierung:
```js
if (!stored || stored === 'dark') {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
```

## Priority
Fix before release
