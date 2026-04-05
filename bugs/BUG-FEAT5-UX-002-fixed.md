# BUG-FEAT5-UX-002: Badge-Text auf Englisch, aria-label auf Deutsch – gespaltene Sprachführung

- **Feature:** FEAT-5 – Transaktionshistorie
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Die TransactionBadge-Komponente zeigt sehenden Nutzern den englischen Text "Buy" / "Sell", während Screenreader-Nutzer durch `aria-label="Kauf"` / `aria-label="Verkauf"` den deutschen Begriff hören. Das gesamte restliche Dashboard ist auf Deutsch gehalten ("Letzte Transaktionen", "Datum", "Asset", "Typ", "Menge", "Preis/Einheit", "Gesamtbetrag").

Nutzer-Impact: Ein Screenreader-Nutzer bekommt eine konsistent deutsche Erfahrung. Ein sehender Nutzer sieht in einer deutschen Oberfläche englische Badge-Labels. Das erzeugt unnötige kognitive Reibung und wirkt inkonsistent.

Laut WCAG 2.1 Erfolgskriterium 3.1.1 (Sprache der Seite) sollte der sichtbare Textinhalt der Dokumentsprache entsprechen. Da das Produkt auf Deutsch ausgeliefert wird, sollte der Badge-Text ebenfalls Deutsch sein – oder konsequent Englisch mit deutschen aria-labels geändert werden.

## Steps to Reproduce

1. Dashboard öffnen (Light oder Dark Mode)
2. Spalte "Typ" in der Transaktionshistorie betrachten
3. Expected: Badge-Text stimmt mit der Sprache der restlichen UI überein (deutsch)
4. Actual: Badge zeigt "Buy" / "Sell" in einer ansonsten deutschen Oberfläche

## Empfehlung

Badge-Text auf Deutsch ändern: "Kauf" / "Verkauf". Dann kann `aria-label` entfallen oder redundant bestehen bleiben – der sichtbare Text ist dann bereits korrekt. Alternativ: aria-label anpassen, um redundante Dopplung zu vermeiden:

```tsx
// Bevorzugt: deutscher sichtbarer Text, kein aria-label nötig
<span className="...">Kauf</span>

// Falls englisch gewollt (z.B. Branchenkonvention):
// aria-label ebenfalls englisch: aria-label="Buy"
```

## Priority

Fix before release
