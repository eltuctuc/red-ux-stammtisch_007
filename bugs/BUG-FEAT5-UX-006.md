# BUG-FEAT5-UX-006: Mock-Transaktionen alle im identischen Betragssegment (~$1.000–$1.800)

- **Feature:** FEAT-5 – Transaktionshistorie
- **Severity:** Low
- **Bereich:** UX
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Alle 5 Mock-Transaktionen haben einen Gesamtbetrag zwischen $1.011 und $1.771 – eine auffällig enge Bandbreite für 5 verschiedene Assets über einen Zeitraum von fast einem Monat. Das wirkt nicht wie ein echter Nutzer-Portfolio, sondern wie ein gleichmäßig aufgefüllter Datensatz.

Nutzer-Impact: Die Transaktionshistorie soll dem Dashboard "Tiefe und Glaubwürdigkeit als Portfolio-Tool" verleihen (Feature Spec). Wenn alle Beträge annähernd gleich sind, fühlt sich die Tabelle synthetisch an – der glaubwürdigkeitssteigernde Effekt verfehlt sein Ziel. Zudem können Nutzer nicht sehen, wie die Tabelle bei stark variierenden Beträgen aussieht (z.B. ein $50 Trade vs. ein $8.000 Trade).

Außerdem: DOT mit `total: 1_065.0` und ADA mit `total: 1_130.0` sind auf `.0` gerundet – was für Krypto-Transaktionen unnatürlich ist.

## Steps to Reproduce

1. Transaktionshistorie betrachten
2. Gesamtbetrag-Spalte lesen: $1.011, $1.771, $1.714, $1.130, $1.065
3. Expected: Glaubwürdige Varianz in Beträgen (z.B. $89, $340, $5.200, $1.840, $720)
4. Actual: Fünf Beträge im Korridor $1.000–$1.800 ohne erkennbare Varianz

## Empfehlung

Mock-Daten diversifizieren: Mindestens eine Mikro-Transaktion (< $100), eine mittlere ($300–$900) und eine größere (> $3.000) einbauen. Die runden DOT/ADA-Totals um realistische Nachkommastellen ergänzen (z.B. $1.065.00 → $1.072.43).

## Priority

Nice-to-have
