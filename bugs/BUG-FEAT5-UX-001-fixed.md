# BUG-FEAT5-UX-001: Hover-Highlight Zeile faktisch unsichtbar (2% Opacity)

- **Feature:** FEAT-5 – Transaktionshistorie
- **Severity:** Medium
- **Bereich:** UX
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Der Hover-Effekt auf Tabellenzeilen (`hover:bg-black/[0.02]` im Light Mode, `dark:hover:bg-white/[0.03]` im Dark Mode) ist mit 2% bzw. 3% Opacity faktisch nicht wahrnehmbar. Ein Nutzer erhält kein visuelles Feedback darüber, welche Zeile er gerade anschaut oder mit der Maus überfahrt.

Laut UX-Standard (Priority 2: `state-clarity`) müssen Hover/Pressed/Disabled-Zustände "visually distinct while staying on-style" sein. 2% liegt weit unterhalb jeder Wahrnehmungsschwelle.

Zum Vergleich: PortfolioCard nutzt `hover:scale-[1.01] hover:shadow-lg` – ein deutlich spürbares Signal. Die TransactionTable-Zeilen suggerieren durch das Interaktionsmuster (Hover definiert in der Spec), dass Zeilen interaktiv sind, liefern aber kein erkennbares Feedback.

## Steps to Reproduce

1. Dashboard im Light Mode öffnen
2. Maus über eine Tabellenzeile der Transaktionshistorie bewegen
3. Expected: Zeile hebt sich sichtbar vom Hintergrund ab
4. Actual: Keine erkennbare Veränderung – Zeile sieht identisch aus wie im Ruhezustand

## Empfehlung

Erhöhe die Opacity auf mindestens 5–8% im Light Mode und 6–8% im Dark Mode:
- Light Mode: `hover:bg-black/[0.05]`
- Dark Mode: `dark:hover:bg-white/[0.06]`

Das bleibt im dezenten Glassmorphism-Stil, ist aber von Nutzern tatsächlich wahrnehmbar.

## Priority

Fix before release
