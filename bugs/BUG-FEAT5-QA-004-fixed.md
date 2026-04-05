# BUG-FEAT5-QA-004: Badge-Text "Buy"/"Sell" nicht lokalisiert – inkonsistent mit aria-label

- **Severity:** Low
- **Bereich:** A11y
- **Status:** Fixed

## Steps to Reproduce
1. App starten, Transaktionshistorie aufrufen
2. Typ-Spalte betrachten
3. Visuellen Badge-Text mit aria-label vergleichen

Expected: Visueller Text und aria-label verwenden dieselbe Sprache. Da das gesamte Produkt auf Deutsch ausgerichtet ist (Header "Letzte Transaktionen", Spaltenköpfe auf Deutsch), sollte der Badge-Text entweder konsistent "Kauf"/"Verkauf" oder konsistent "Buy"/"Sell" mit englischen aria-labels sein.

Actual: Badge zeigt "Buy"/"Sell" (Englisch), aber `aria-label="Kauf"` / `aria-label="Verkauf"` (Deutsch). Ein Screen Reader liest "Kauf" vor, während der visuelle Text "Buy" zeigt. Das kann für Nutzer mit und ohne Screenreader verwirrend sein.

## Root Cause
In `TransactionBadge.tsx`: visueller Text ist "Buy"/"Sell", `aria-label` ist "Kauf"/"Verkauf". Die Spec (FEAT-5.md Zeile 98) definiert beide so – aber die Inkonsistenz zwischen visuellem Text und aria-label ist ein A11y-Anti-Pattern wenn Text und Label divergieren, da aria-label den sichtbaren Text für Screenreader überschreibt.

Für `<span>` mit sichtbarem Text ist `aria-label` nicht die richtige Lösung. Korrekt wäre: Entweder deutschen Text "Kauf"/"Verkauf" anzeigen (kein aria-label nötig), oder englischen Text beibehalten und `aria-label` entfernen (da redundant) bzw. angleichen.

## Priority
Fix before release
