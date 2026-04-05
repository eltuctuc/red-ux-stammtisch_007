---
status: approved
---

# Portfolio Management – UX Research
*Erstellt von: /red:proto-research — 2026-04-05*
*Ergänzt zu bestehendem Research für FEAT-6 Portfolio Management*

## Kontext

Dieses Dokument ergänzt das bestehende Research um die zwei offenen UX-Fragen aus dem
aktualisierten PRD (Portfolio Management). Bestehende Artefakte (Personas, Platform-Context,
Problem Statement) bleiben gültig und werden hier nicht wiederholt.

---

## UX-Frage 1: "Coins hinzufügen" – UI-Pattern

**Entscheidung: Modal / Dialog**

**Begründung:**
- Glassmorphism-Modal spielt die Kerndesign-Stärke des Projekts aus (Backdrop Blur, transparente Karte)
- Fokussierter Flow mit nur 3 Feldern (Coin, Menge, Kaufpreis) – kein Overhead durch Drawer nötig
- Inline-Formular würde die Portfolio-Tabelle visuell überladen
- Side Drawer ist für 3 Eingabefelder Overengineering

**UI-Beschreibung:**
- Button "Coin hinzufügen" auf der Portfolio-Seite öffnet zentriertes Modal
- Felder: Coin-Auswahl (Dropdown, nur Coins aus Watchlist), Menge, Kaufpreis
- Buttons: "Abbrechen" (schließt) + "Hinzufügen" (fügt Mock-Eintrag hinzu)
- Glassmorphism-Styling konsistent mit bestehenden Karten

---

## UX-Frage 2: Watchlist-Highlight für Portfolio-Coins

**Entscheidung: Portfolio-Icon + Cyan-Akzent auf der Coin-Zeile**

**Begründung:**
- `Briefcase`-Icon aus lucide-react (bereits im Projekt verfügbar) – kein neuer Import nötig
- Cyan-Akzent konsistent mit bestehendem Farbsystem (keine neuen Design-Tokens)
- Kein Reordering der Watchlist – Reihenfolge bleibt stabil und vorhersehbar
- Visuell eindeutig ohne das bestehende Layout zu brechen

**UI-Beschreibung:**
- Portfolio-Coins zeigen ein kleines `Briefcase`-Icon (cyan, 12px) neben dem Coin-Namen
- Die Zeile erhält einen subtilen linken Cyan-Border (2px) als zusätzlichen Marker
- Nicht-Portfolio-Coins: unverändert

---

## Implikationen für Requirements

Diese UX-Entscheidungen sind direkt umsetzbar. Für `/red:proto-requirements` relevant:
- Modal-Komponente neu erstellen (kein bestehendes Modal im Projekt)
- WatchlistSidebar.tsx anpassen: Icon + Border-Logik hinzufügen
- Portfolio-Daten als Mock-Array definieren (Coin, Menge, Kaufpreis)
- Gewinn/Verlust-Berechnung: `((aktuellPreis - kaufpreis) / kaufpreis) * 100`
- Rot-Schwelle: `<= -10%` → rote Farbe/Markierung
