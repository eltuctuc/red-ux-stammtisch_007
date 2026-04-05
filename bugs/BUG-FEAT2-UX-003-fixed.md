# BUG-FEAT2-UX-003: TrendBadge hat kein aria-label – Screenreader liest Icon-Name statt Bedeutung

- **Feature:** FEAT-2 – Portfolio-Übersicht
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Fixed

## Problem

Der TrendBadge besteht aus drei Elementen: Lucide-Icon (`TrendingUp`/`TrendingDown`), Prozentwert und USD-Betrag. Das Icon hat korrekt `aria-hidden="true"`. Die beiden `<span>`-Elemente werden vom Screenreader als separate Fragmente gelesen: erst `"+3.42%"`, dann `"($2,783.19)"`.

Was fehlt: Der semantische Zusammenhang dieser Aussage. Ein Screenreader liest die Inhalte als Text-Fragmente ohne Kontext. Es gibt kein übergeordnetes `aria-label` auf dem Container, das die Bedeutung zusammenfasst: "24h-Änderung: plus 3,42 Prozent, plus 2.783,19 Dollar".

Der Label "24h-Änderung" steht zwar als `<p>` darunter, aber in umgekehrter Reihenfolge: Der TrendBadge kommt zuerst, das Label danach. Für Screenreader ergibt sich dadurch eine unlogische Lesereihenfolge: Wert vor Beschriftung.

Zusätzlich: Das Feature-File spezifiziert "24h-Änderung: Farbe + Text kombiniert (nicht nur Farbe)" – der Text ist vorhanden, aber die Zuordnung per aria ist nicht explizit hergestellt.

## Steps to Reproduce

1. App mit Screenreader öffnen (VoiceOver macOS: Cmd+F5)
2. Zum TrendBadge navigieren

Expected: Screenreader liest eine zusammenhängende, verständliche Aussage, z.B. "24h-Änderung: +3,42%, +$2,783.19"

Actual: Screenreader liest fragmentiert: "+3.42%" … "($2,783.19)" … "24h-Änderung" – in dieser Reihenfolge, ohne semantischen Zusammenhang

## Empfehlung

Option A (minimal): `aria-label` auf den Container-`<div>` des TrendBadge setzen, der den vollständigen Text enthält:

```tsx
<div
  aria-label={`24h-Änderung: ${sign}${percent.toFixed(2)}%, ${sign}${usdFormatter.format(usd)}`}
  className={`flex items-center gap-1.5 text-sm font-medium ${colorClass}`}
>
  {/* Inhalte mit aria-hidden="true" auf alle Kinder */}
```

Option B (strukturell): Label-Reihenfolge im DOM anpassen – die `<p>24h-Änderung</p>` vor den TrendBadge verschieben, damit Screenreader-Lesereihenfolge und visuelle Reihenfolge übereinstimmen.

## Priority

Fix before release
