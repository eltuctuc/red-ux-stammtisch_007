# BUG-FEAT5-UX-004: Doppelte Screen-Reader-Ankündigung des Tabellentitels

- **Feature:** FEAT-5 – Transaktionshistorie
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Die TransactionTable nutzt zwei parallele Mechanismen zur Benennung der Tabelle:
1. `<section aria-labelledby="transactions-heading">` mit `<h3 id="transactions-heading">Letzte Transaktionen</h3>`
2. `<caption className="sr-only">Letzte Transaktionen</caption>` innerhalb der Tabelle

Das führt dazu, dass ein Screenreader "Letzte Transaktionen" zweimal ankündigt: einmal beim Betreten der Section und einmal beim Betreten der Tabelle. Der Dev Handoff begründet dies als "Doppelabsicherung für Screen Reader" – dieses Pattern führt jedoch zu redundanter, verwirrend wirkender Ausgabe.

WCAG Technique H39 und H73 empfehlen `<caption>` als primären Mechanismus für Tabellentitel. `aria-labelledby` auf der Section ist für die Section-Ebene korrekt, aber die Tabelle benötigt dann keine zusätzliche Caption mit identischem Text.

Nutzer-Impact: Screenreader-Nutzer hören "Letzte Transaktionen" doppelt beim Navigieren in die Tabelle, was Verwirrung erzeugt und die kognitive Last erhöht.

## Steps to Reproduce

1. VoiceOver (macOS/iOS) oder NVDA einschalten
2. Zur Transaktionshistorie navigieren (Tab oder Pfeiltaste)
3. Expected: "Letzte Transaktionen, Tabelle" wird einmal angekündigt
4. Actual: "Letzte Transaktionen" wird zweimal angekündigt (Section + Caption)

## Empfehlung

Entweder die `<caption sr-only>` entfernen und nur `aria-labelledby` auf der Section behalten, oder `aria-labelledby` auf der `<table>` selbst setzen und die Section-Beschriftung trennen. Das sauberste Muster für eine Tabelle in einer benannten Section:

```tsx
// Option 1: Nur aria-labelledby auf der table
<section>
  <h3 id="transactions-heading">Letzte Transaktionen</h3>
  <table aria-labelledby="transactions-heading">
    {/* kein caption nötig */}
  </table>
</section>
```

## Priority

Fix before release
