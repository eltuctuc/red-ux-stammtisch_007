---
status: approved
---

# FEAT-6: Portfolio-Seite

## Fortschritt
Status: Spec
Aktueller Schritt: Spec
Fix-Schwelle: Critical

## Abhängigkeiten
- Benötigt: FEAT-4 (Watchlist-Sidebar) – mockWatchlist.ts ist Preisquelle für Berechnungen
- Benötigt: FEAT-1 (App-Header) – Tab-Navigation auf App-Level-Layout

---

## 1. Feature Spec
*Ausgefüllt von: /red:proto-requirements — 2026-04-05*

### Beschreibung
Neue "Mein Portfolio"-Ansicht, erreichbar via Tab-Navigation (Dashboard | Mein Portfolio). Zeigt alle gehaltenen Positionen in einer Tabelle mit Menge, Kaufpreis, aktuellem Wert und Gewinn/Verlust. Positionen mit ≥ 10% Verlust werden rot hervorgehoben. Ein Glassmorphism-Modal erlaubt das Hinzufügen neuer Positionen.

### Definitionen
- **Portfolio-Position:** Ein Eintrag aus {Coin-Symbol, Menge, Kaufpreis pro Stück}
- **Aktueller Wert:** Menge × aktueller Mock-Preis (aus mockWatchlist.ts)
- **Gewinn/Verlust (%):** ((aktueller Preis – Kaufpreis) / Kaufpreis) × 100
- **Gewinn/Verlust (absolut):** (aktueller Preis – Kaufpreis) × Menge
- **Verlust-Schwelle:** Gewinn/Verlust ≤ −10% → rote Zeilenmarkierung
- **Tab-Navigation:** Zustandsumschaltung via React-State – keine URL-Änderung, kein React Router

### User Stories
- Als Nutzer möchte ich per Tab zwischen Dashboard und Portfolio wechseln, ohne die App neu zu laden
- Als Nutzer möchte ich alle Positionen in einer Tabelle sehen, um meinen Überblick zu behalten
- Als Nutzer möchte ich je Coin den aktuellen Wert + Gewinn/Verlust sehen, um Performance einzuschätzen
- Als Nutzer möchte ich Positionen mit starkem Verlust (≥ 10%) sofort erkennen, um schnell reagieren zu können
- Als Nutzer möchte ich einen Coin mit Menge und Kaufpreis hinzufügen, um mein Mock-Portfolio zu ergänzen
- Als Mobile-Nutzer möchte ich die Tabelle ohne seitenweites horizontales Scrollen lesen können

### Acceptance Criteria
- [ ] Tab-Navigation "Dashboard" / "Mein Portfolio" sichtbar; Wechsel ohne Reload
- [ ] Tabelle zeigt je Position: Symbol, Name, Menge, Kaufpreis (USD), aktueller Wert (USD), G/V % + absolut
- [ ] Positive G/V-Werte grün, negative rot
- [ ] Positionen mit G/V ≤ −10%: zusätzliche rote Zeilenmarkierung (linker roter Border)
- [ ] Button "Coin hinzufügen" öffnet Glassmorphism-Modal
- [ ] Modal: Coin-Dropdown (nur Watchlist-Coins), Menge-Feld, Kaufpreis-Feld, "Abbrechen" + "Hinzufügen"
- [ ] Nach "Hinzufügen": neuer Eintrag erscheint in Tabelle (In-Memory, kein Persist)
- [ ] "Abbrechen" schließt Modal ohne Änderungen
- [ ] Initialer Mock-Datensatz: mindestens 3 Positionen, darunter mind. 1 mit ≥ 10% Verlust (Demo-Pflicht)
- [ ] Mobile: Tabelle horizontal scrollbar innerhalb ihres Containers, Seite selbst nicht

### Edge Cases
- **Coin bereits im Portfolio:** Doppeleintrag erlaubt – kein Merge, kein Fehler
- **Menge ≤ 0:** "Hinzufügen"-Button deaktiviert
- **Kaufpreis ≤ 0:** "Hinzufügen"-Button deaktiviert
- **Langer Coin-Name:** truncate, kein Layout-Bruch
- **Alle Positionen im Verlust:** Alle Zeilen rot – kein Layout-Bruch
- **Leeres Portfolio:** Leer-Zustand mit Text "Noch keine Positionen" + sichtbarer "Coin hinzufügen"-Button

### Nicht im Scope
- Persistenz über Session-Reload (kein localStorage)
- Editieren oder Löschen bestehender Positionen
- Freie Coin-Eingabe außerhalb der Watchlist
- Sortierung / Filterung der Tabelle
- Portfolio-Gesamtwert auf dieser Seite (→ FEAT-7)
- Allocation-Charts oder Pie-Chart
