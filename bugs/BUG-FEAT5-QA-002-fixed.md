# BUG-FEAT5-QA-002: Spaltenköpfe im Dark Mode schlechter lesbar als im Light Mode

- **Severity:** Medium
- **Bereich:** A11y
- **Status:** Fixed

## Steps to Reproduce
1. App in den Dark Mode schalten
2. Transaktionshistorie-Tabelle aufrufen
3. Spaltenköpfe (Datum, Asset, Typ, Menge, Preis/Einheit, Gesamtbetrag) beobachten

Expected: Spaltenköpfe im Dark Mode mindestens gleich gut erkennbar wie im Light Mode

Actual: `text-gray-400 dark:text-gray-500` – im Dark Mode wird gray-500 (#6b7280) verwendet, das auf dem dunklen Hintergrund (#0f1117) ein Kontrastverhältnis von ca. 4.0:1 erzeugt. Im Light Mode wird gray-400 (#9ca3af) auf bg-white/70 verwendet (~2.7:1). Die dark:-Variante ist zwar formal dunkler in der Farbpalette, aber die Richtung der Klassen ist semantisch invertiert: für dunkle Hintergründe sollte ein helleres Grau (z.B. gray-400) verwendet werden, nicht ein dunkleres (gray-500).

Aktuell ist das Kontrastverhältnis im Light Mode (~2.7:1) unter dem WCAG AA-Mindeststandard von 4.5:1 für normalen Text. Dark Mode (~4.0:1) knapp darunter.

## Root Cause
In `TransactionTable.tsx`, `<th>` Klasse:
```
text-gray-400 dark:text-gray-500
```
Die Reihenfolge ist logisch invertiert. Für dunkle Hintergründe braucht es ein helleres Grau (dark:text-gray-400 oder heller), nicht ein dunkleres.

Fix: `text-gray-500 dark:text-gray-400` – oder besser beide Werte auf WCAG-konformen Kontrast prüfen und anpassen.

## Priority
Fix before release
