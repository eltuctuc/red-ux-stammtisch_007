# BUG-FEAT1-UX-002: Dekorative Suche ohne disabled-Kennzeichnung – falsch-versprechendes UI

- **Feature:** FEAT-1 – App-Header
- **Severity:** Medium
- **Bereich:** UX
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Die Suchleiste ist als vollwertiges, interaktives Input-Element gerendert:
- Volle Opacity
- Cursor wechselt auf text (Browser-Standard für Inputs)
- Focus-Ring erscheint beim Klick (`focus:ring-2 focus:ring-cyan-500/50`)
- Kein Hinweis, dass die Suche nicht funktioniert

**Aus Nutzerperspektive:** Ich sehe ein Suchfeld, ich klicke drauf, es reagiert (Focus-State), ich
tippe – und nichts passiert. Keine Ergebnisse, keine Rückmeldung, einfach Stille. Das ist ein
klassisches Broken Affordance: Das Element verspricht eine Interaktion, die es nicht liefert.

Besonders kritisch für neue Nutzer oder bei einem Usability-Test: Der erste Reflex bei "Ich suche
etwas" ist das Suchfeld. Wenn das täuscht, entsteht Misstrauen gegenüber der gesamten App.

**Betroffener Code (SearchBar.tsx):**
```tsx
<input
  type="search"
  aria-label="Suche"
  placeholder="Suchen..."
  className="... focus:ring-2 focus:ring-cyan-500/50 ..."
/>
```

Kein `readOnly`, kein `disabled`, kein `tabIndex={-1}`, kein Tooltip – das Element verhält sich
wie ein normales funktionales Suchfeld.

## Steps to Reproduce

1. App auf Desktop öffnen (Mobile: Suchfeld ist hidden, dort kein Problem).
2. In das Suchfeld klicken.
3. Expected: Entweder (a) ein Tooltip "Suche folgt in einer späteren Version" oder (b) der Focus-State erscheint gar nicht (readOnly/disabled), um Erwartungen zu dämpfen.
4. Actual: Focus-Ring erscheint, Tab-Navigation landet im Feld, Nutzer kann Text eingeben – aber kein Feedback, keine Funktion.

## Empfehlung

**Kurzfristig (vor Release):** Das Input als `readOnly` markieren und den Focus-Ring entfernen,
damit keine Interaktionserwartung entsteht. Gleichzeitig `tabIndex={-1}` setzen, damit das Feld
nicht in der Tab-Reihenfolge erscheint (es ist dekorativ – kein A11y-Mehrwert, nur Verwirrung).

```tsx
<input
  type="search"
  aria-hidden="true"          // Screenreader überspringt es
  tabIndex={-1}               // Kein Tab-Stop
  readOnly                    // Verhindert Text-Eingabe
  placeholder="Suchen..."
  className="... cursor-default ..." // Kein Text-Cursor
/>
```

**Mittelfristig:** Entweder echte Suchfunktion implementieren oder das Element durch ein
visuell ähnliches, nicht-interaktives div ersetzen, das explizit kein Input-Verhalten simuliert.

## Priority

Fix before release
