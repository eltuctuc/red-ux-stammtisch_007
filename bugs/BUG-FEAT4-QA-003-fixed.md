# BUG-FEAT4-QA-003: ChangeTag aria-label auf div ohne role – Screen Reader liest 24h-Änderung nicht vor

- **Feature:** FEAT-4 – Watchlist-Sidebar
- **Severity:** High
- **Bereich:** A11y
- **Gefunden von:** QA Engineer
- **Status:** Fixed

## Steps to Reproduce

1. App mit Screen Reader öffnen (VoiceOver/NVDA)
2. Watchlist-Karte traversieren
3. Prüfen ob die 24h-Änderung vorgelesen wird

Expected: Screen Reader liest die 24h-Änderung vor, z. B. "24h-Änderung: +2.34%"

Actual: Die 24h-Änderung wird vollständig verschwiegen. Weder aria-label noch der Text werden vorgelesen.

## Technische Ursache

In `projekt/src/components/WatchlistCard.tsx`, Zeilen 70–80:

```tsx
<div
  className="..."
  aria-label={`24h-Änderung: ${sign}${Math.abs(change24h).toFixed(2)}%`}
>
  {/* Icons mit aria-hidden="true" */}
  <span aria-hidden="true">
    {sign}{Math.abs(change24h).toFixed(2)}%
  </span>
</div>
```

Zwei Probleme kombinieren sich zu einem vollständigen A11y-Ausfall:

1. `aria-label` auf einem generischen `<div>` (ohne `role`) hat keine Wirkung – laut ARIA-Spec ist `aria-label` nur auf Elementen mit impliziter oder expliziter ARIA-Rolle wirksam. Ein nacktes `<div>` hat keine Rolle.
2. Der Text-Inhalt `{sign}{Math.abs(change24h).toFixed(2)}%` ist zusätzlich mit `aria-hidden="true"` auf dem `<span>` versteckt.

Beide Mechanismen, die den Wert zugänglich machen sollten, sind wirkungslos. Das Spec-Requirement "Farbe ist nicht alleiniges Signal" ist damit technisch verletzt.

## Fix

Option A (minimal): `aria-hidden` vom `<span>` entfernen und `aria-label` vom `<div>` entfernen. Der sichtbare Text ist dann der Screen-Reader-Text.

Option B (sauber): `role="status"` oder `role="text"` auf das `<div>` setzen, damit `aria-label` wirksam wird. Alternativ einen visuell versteckten `<span>` mit `sr-only` und dem vollständigen Label hinzufügen:

```tsx
<div className="flex items-center gap-1 text-xs font-medium ...">
  <span className="sr-only">{`24h-Änderung: ${sign}${Math.abs(change24h).toFixed(2)}%`}</span>
  <TrendingUp size={12} aria-hidden="true" />
  <span aria-hidden="true">{sign}{Math.abs(change24h).toFixed(2)}%</span>
</div>
```

## Priority

Fix before release
