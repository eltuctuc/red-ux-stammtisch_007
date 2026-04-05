# BUG-FEAT2-QA-001: Sparkline aria-label hardcoded "leicht steigend" – auch bei negativem Trend falsch

- **Feature:** FEAT-2 – Portfolio-Übersicht
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** QA Engineer
- **Status:** Fixed

## Steps to Reproduce
1. `change24hPercent` in `mockPortfolio.ts` auf einen negativen Wert setzen (z.B. `-2.15`)
2. App starten
3. Screen Reader (z.B. VoiceOver) fokussiert die Sparkline-Region

Expected: aria-label beschreibt den tatsächlichen Trend – bei negativem Wert z.B. "7-Tage Portfolio-Trend: fallend"
Actual: aria-label lautet immer `"7-Tage Portfolio-Trend: leicht steigend"`, unabhängig davon ob `isPositive` true oder false ist

## Technische Ursache

`PortfolioSparkline.tsx` Z. 19:
```tsx
aria-label="7-Tage Portfolio-Trend: leicht steigend"
```

Der String ist hardcoded. Die Komponente empfängt bereits `isPositive` als Prop und nutzt es für die Linienfarbe – derselbe Wert könnte den aria-label steuern.

Korrektur:
```tsx
aria-label={`7-Tage Portfolio-Trend: ${isPositive ? 'leicht steigend' : 'leicht fallend'}`}
```

Die Spec (A11y-Architektur) verlangt: Sparkline `role="img"` mit aussagekräftigem `aria-label`. Ein falscher Trend-Text ist für Screen-Reader-Nutzer irreführend und verletzt WCAG 1.3.3 (Sensory Characteristics).

## Priority
Fix before release
