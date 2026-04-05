# BUG-FEAT1-QA-002: ThemeProvider classList-Manipulation im useState-Initializer läuft in StrictMode doppelt

- **Feature:** FEAT-1 – App-Header
- **Severity:** Medium
- **Bereich:** Functional
- **Gefunden von:** QA Engineer
- **Status:** Fixed

## Steps to Reproduce
1. App im Development-Mode mit React StrictMode starten (Standard-Setup via main.tsx)
2. Browser-DevTools öffnen, im Elements-Tab `<html>`-Element beobachten
3. Seite laden oder Hot-Reload auslösen

Expected: `dark`-Klasse wird einmalig gesetzt, kein Effekt auf Funktionalität
Actual: Der `useState`-Initializer in ThemeContext.tsx wird von React StrictMode zweimal ausgeführt. Zeile 22–29 ruft `document.documentElement.classList.add('dark')` direkt im Initializer auf. Da React StrictMode Initializer in Development doppelt aufruft, wird die DOM-Manipulation zweimal ausgeführt.

## Technische Ursache

`ThemeContext.tsx` Z. 21–29:
```tsx
const [isDark, setIsDark] = useState(() => {
  const initial = getInitialDark()
  if (initial) {
    document.documentElement.classList.add('dark')  // Side-Effect im Initializer!
  } else {
    document.documentElement.classList.remove('dark')
  }
  return initial
})
```

Side-Effects in `useState`-Initializern sind ein Anti-Pattern. React erwartet dort pure Funktionen. In Production läuft der Initializer einmalig – Ergebnis ist korrekt. In Development (StrictMode) läuft er zweimal – aktuell idempotent, aber das ist ein fragiles Fundament. Zudem überschreibt der Initializer die Arbeit des Anti-Flash-Scripts unnötigerweise.

Korrekte Implementierung: DOM-Manipulation aus dem Initializer entfernen. Das Anti-Flash-Script in index.html übernimmt die initiale Klassensetzung. Der Initializer liest nur localStorage und gibt den Boolean zurück – keine Side-Effects.

```tsx
const [isDark, setIsDark] = useState(() => getInitialDark())
```

## Priority
Fix before release
