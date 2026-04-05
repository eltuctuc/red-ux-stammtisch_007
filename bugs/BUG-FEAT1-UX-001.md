# BUG-FEAT1-UX-001: Icon-Logik invertiert – Sun bei Dark, Moon bei Light

- **Feature:** FEAT-1 – App-Header
- **Severity:** High
- **Bereich:** UX
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Das Toggle-Icon kommuniziert den aktuellen Zustand statt die nächste Aktion – und das ist
in sich inkonsistent mit der üblichen Konvention UND mit dem, was ein Nutzer intuitiv erwartet.

**Aktuelle Implementierung (ThemeToggle.tsx, Zeile 17–21):**
```tsx
{isDark ? (
  <Sun size={22} aria-hidden="true" />   // Dark Mode aktiv → Sun wird gezeigt
) : (
  <Moon size={22} aria-hidden="true" />  // Light Mode aktiv → Moon wird gezeigt
)}
```

Das Icon zeigt an, **wohin der Toggle wechselt** (Sun = "zu Light wechseln"), nicht den
aktuellen Zustand. Das ist eine valide Designentscheidung – ABER:

Das `aria-label` widerspricht dieser Konvention:
```tsx
aria-label={isDark ? 'Light mode aktivieren' : 'Dark mode aktivieren'}
```

Im Dark Mode: Icon = Sun (deutet auf Light-Wechsel hin) + aria-label = "Light mode aktivieren".
Das ist zufällig konsistent. ABER: Das Icon-Konzept "zeigt die Aktion" ist nicht selbsterklärend,
weil gängige Produkte (macOS, iOS) das Icon zur Anzeige des **aktuellen Modus** nutzen.

**Das eigentliche Problem:** Kein visueller Indikator zeigt, in welchem Modus die App
*gerade ist*. Der Nutzer muss aus dem Seitenkontext (Hintergrundfarbe) ableiten, ob Dark oder
Light aktiv ist – nicht aus dem Toggle selbst.

## Steps to Reproduce

1. App im Dark Mode öffnen (Default).
2. Auf den ThemeToggle schauen.
3. Expected: Es ist eindeutig erkennbar, dass Dark Mode aktiv ist (z. B. Moon-Icon als aktiver Zustand, oder visuell hervorgehobener Toggle-Zustand).
4. Actual: Sun-Icon ist sichtbar. Unklar ob "aktuell Light" oder "klicken um Light zu aktivieren". Kein visueller aktiver Zustand am Toggle selbst.

## Empfehlung

Zwei akzeptable Lösungen – eine davon konsequent umsetzen:

**Option A (Standard – zeigt aktuellen Zustand):**
- Dark Mode aktiv → Moon-Icon (du bist im Dunkeln)
- Light Mode aktiv → Sun-Icon (du bist im Hellen)
- aria-label bleibt "Light mode aktivieren" / "Dark mode aktivieren" (beschreibt Aktion)

```tsx
{isDark ? (
  <Moon size={22} aria-hidden="true" />
) : (
  <Sun size={22} aria-hidden="true" />
)}
```

**Option B (zeigt Zielaktion – aktuell implementiert, aber ohne zusätzlichen Zustandshinweis):**
- Zusätzlich: active/selected-State am Button visuell kommunizieren (z. B. gefüllter Hintergrund im aktiven Modus)

Option A ist die weitaus verständlichere Konvention für Nutzer.

## Priority

Fix before release
