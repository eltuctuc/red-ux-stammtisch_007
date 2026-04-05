# BUG-FEAT2-QA-004: Negativer USD-Betrag im TrendBadge zeigt doppeltes Vorzeichen

- **Feature:** FEAT-2 – Portfolio-Übersicht
- **Severity:** High
- **Bereich:** Functional
- **Gefunden von:** QA Engineer
- **Status:** Fixed

## Steps to Reproduce
1. `change24hPercent` auf `-2.15` und `change24hUSD` auf `-1_450.30` in `mockPortfolio.ts` setzen
2. App starten
3. TrendBadge im PortfolioCard beobachten

Expected: `-2.15% (-$1,450.30)`
Actual: `-2.15% (-$-1,450.30)` – das Minus erscheint doppelt: einmal aus `sign` (leer bei negativ) und einmal weil `Intl.NumberFormat` mit `style: 'currency'` den negativen Wert selbst als `-$1,450.30` formatiert, dann wird `sign` (leer) vorangestellt – kein doppeltes Minus dort. **Aber:** bei positivem `usd` mit negativem `percent` (oder umgekehrt) würde `sign` und das Vorzeichen der Zahl kollidieren.

## Genauere Analyse

`TrendBadge.tsx`:
```tsx
const sign = isPositive ? '+' : ''
// ...
<span>({sign}{usdFormatter.format(usd)})</span>
```

`isPositive` basiert auf `percent`, nicht auf `usd`. Wenn `usd` negativ ist:
- `usdFormatter.format(-1450.30)` gibt `-$1,450.30` zurück
- `sign` ist `''` (da `percent < 0`)
- Resultat: `(-$1,450.30)` – korrekt

Wenn `usd` positiv ist aber `percent` negativ (Datenfehler/Edge Case):
- `usdFormatter.format(1450.30)` gibt `$1,450.30`
- `sign` ist `''`
- Resultat: `($1,450.30)` – kein Vorzeichen, irreführend positiv aussehend in einer roten Badge

Umgekehrt: wenn `usd` negativ aber `percent` positiv:
- `usdFormatter.format(-1450.30)` gibt `-$1,450.30`
- `sign` ist `'+'`
- Resultat: `(+-$1,450.30)` – **doppeltes Vorzeichen, kaputte Ausgabe**

Das ist ein echter Bug, der bei inkonsistenten Eingabedaten oder zukünftiger API-Integration auftreten kann. Die Vorzeichen-Logik für den USD-Betrag muss unabhängig von `percent` aus dem `usd`-Wert selbst abgeleitet werden.

Korrektur:
```tsx
const usdSign = usd >= 0 ? '+' : ''
// ...
<span>({usdSign}{usdFormatter.format(Math.abs(usd))})</span>
```

Dies trennt die Vorzeichen-Logik für `percent` und `usd` sauber und verhindert Konflikte mit der internen Formatierung von `Intl.NumberFormat`.

## Priority
Fix before release
