# BUG-FEAT1-UX-003: Tab-Reihenfolge fehlerhaft – Suche ist Tab-Stop, sollte es nicht sein

- **Feature:** FEAT-1 – App-Header
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Die Spec definiert die Tab-Reihenfolge als: Logo → Search → Toggle (FEAT-1, Abschnitt 2, A11y).

Das Logo ist jedoch ein `<span>` ohne interaktives Element – es ist kein Tab-Stop und sollte
keiner sein (reiner Text, `select-none`). Das ist korrekt.

Das Problem liegt beim Suchfeld: Die Suche ist dekorativ (kein Filtering, kein Handler), landet
aber als vollwertiger Tab-Stop in der Tastaturnavigation. Für einen Screenreader-Nutzer:

1. Tab → Fokus landet auf dem Suchfeld
2. aria-label="Suche" wird angekündigt
3. Nutzer tippt → nichts passiert
4. Kein Feedback, kein Hinweis auf fehlende Funktion

Das ist eine A11y-Falle: Das Element kündigt sich als funktionale Suche an, ist es aber nicht.
WCAG 2.1 Erfolgskriterium 4.1.2 (Name, Role, Value) verlangt, dass interaktive Elemente ihren
Zustand korrekt kommunizieren. Ein dekoratives Input, das als funktionale Suche beschriftet ist,
erfüllt das nicht.

**Zusätzliches Problem:** Die Spec-Entscheidung "Logo als erster Tab-Stop" ist unklar, weil das
Logo keinen Link darstellt und keine Aktion auslöst. Die effektive Reihenfolge ist aktuell:
Search → Toggle. Das entspricht nicht der dokumentierten Reihenfolge.

## Steps to Reproduce

1. App öffnen, mit Tab-Taste durch den Header navigieren.
2. Expected: Nur der ThemeToggle erhält Fokus (einziger funktionaler Tab-Stop im Header).
3. Actual: Das Suchfeld erhält Fokus, Screenreader kündigt "Suche, Suchfeld, bearbeitbar" an – der Nutzer erwartet eine funktionierende Suche.

## Empfehlung

Das dekorative Suchfeld aus der Tab-Reihenfolge entfernen:

```tsx
<input
  type="search"
  aria-hidden="true"   // Screenreader überspringt vollständig
  tabIndex={-1}        // Kein Tab-Stop
  readOnly
  placeholder="Suchen..."
/>
```

Wenn das Logo zukünftig als Home-Link funktionieren soll, `<a href="/">` als Wrapper
hinzufügen – erst dann ist es ein sinnvoller Tab-Stop.

## Priority

Fix before release
