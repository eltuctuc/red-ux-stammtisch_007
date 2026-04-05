---
status: approved
---

# FEAT-2: Portfolio-Übersicht

## Fortschritt
Status: Approved
Aktueller Schritt: UX
Fix-Schwelle: Critical

## Abhängigkeiten
- Benötigt: FEAT-1 (App-Header) – Dark/Light Mode Theme muss global verfügbar sein

---

## 1. Feature Spec
*Ausgefüllt von: /red:proto-requirements — 2026-04-05*

### Beschreibung
Hero-Karte mit Gesamtportfoliowert, 24h-Änderung in Prozent und Absolutbetrag sowie einem Sparkline-Mini-Chart der letzten 7 Tage. Erste Information die der Nutzer beim Öffnen des Dashboards sieht.

### Definitionen
- **Sparkline:** Kompakter Linien-Chart ohne Achsenbeschriftung, der nur den Trend visualisiert
- **24h-Änderung:** Differenz des Portfoliowerts zwischen vor 24 Stunden und jetzt, in % und USD
- **Glassmorphism-Karte:** Container mit backdrop-filter blur, halbtransparentem Hintergrund und subtiler Border

### User Stories
- Als Nutzer sehe ich meinen Gesamtportfoliowert auf einen Blick, ohne scrollen zu müssen
- Als Nutzer sehe ich die 24h-Änderung farblich kodiert (grün/rot), um sofort die Performance einzuschätzen
- Als Nutzer sehe ich eine Sparkline, um den groben Trend der letzten Tage visuell zu erfassen
- Als Mobile-Nutzer sehe ich die Karte vollständig ohne horizontales Scrollen

### Acceptance Criteria
- [ ] Gesamtwert in USD mit korrekter Formatierung (Tausender-Trenner, 2 Dezimalstellen)
- [ ] 24h-Änderung zeigt Prozentsatz UND Absolutbetrag
- [ ] Positive Änderung: grüne Farbe, negative Änderung: rote Farbe
- [ ] Sparkline-Chart mit Mock-Daten der letzten 7 Tage ist sichtbar
- [ ] Karte hat Glassmorphism-Styling mit Hover-Animation
- [ ] Realistische Mock-Daten (kein "12345.00 USD")

### Edge Cases
- **Negativer Portfolio-Tag:** Negative 24h-Änderung wird korrekt mit Minus-Zeichen und roter Farbe angezeigt
- **Großer Wert:** Werte über 1.000.000 USD brechen das Layout nicht
- **Minimale Datenpunkte:** Sparkline rendert korrekt auch bei wenigen Datenpunkten

### Nicht im Scope
- Klickbare Vergrößerung der Sparkline
- Zeitraum-Auswahl (7d / 30d / 1y)
- Echte API-Daten
- Asset-Aufschlüsselung (Allocation-Donut)

---

## 2. UX Entscheidungen
*2026-04-05*

### Einbettung im Produkt
Erste Section nach Header, im Desktop-Grid links (2/3 Breite), auf Mobile volle Breite | Route: `/`

### Einstiegspunkte
App-Start → S-01 Dashboard → Portfolio-Karte ist der erste sichtbare Content nach dem Header

### User Flow
Dashboard öffnen → Gesamtwert sofort sichtbar → 24h-Änderung farblich lesen → Sparkline-Trend erfassen

### Interaktionsmuster
- Primärmuster: Statische Datenkarte mit Hover-Animation (kein Klick-Ziel)
- Fehler-Handling: Nicht anwendbar (Mock-Daten)
- Leerer Zustand: Nicht anwendbar
- Ladeverhalten: Nicht anwendbar (synchrone Mock-Daten)

### Eingesetzte Komponenten
| Komponente | DS-Status | Quelle |
|------------|-----------|--------|
| Glassmorphism-Karte (backdrop-blur, border) | ⚠ Tokens-Build | Kein DS vorhanden |
| Gesamtwert-Display (große Schrift, Intl.NumberFormat) | ⚠ Tokens-Build | Kein DS vorhanden |
| Trend-Badge (Pfeil-Icon + %, + USD) | ⚠ Tokens-Build | Kein DS vorhanden |
| Sparkline (Recharts LineChart, 120×60px, keine Achsen) | ⚠ Tokens-Build | Recharts |

### Navigation nach Aktionen (verbindlich)
| Ausgangs-Screen | Aktion | Ziel | Bedingung |
|-----------------|--------|------|-----------|
| S-01 Dashboard | Hover über Karte | Hover-Animation in-place | – |

### DS-Status
- Tokens-Build (genehmigt): Alle Komponenten

### Barrierefreiheit (A11y)
- Keyboard: Karte ist kein Tab-Ziel (rein informativ)
- Screen Reader: Gesamtwert als `<h2>` lesbar; Sparkline: `role="img" aria-label="7-Tage Trend: leicht steigend"`
- 24h-Änderung: Farbe + Text kombiniert (nicht nur Farbe)

### Mobile-Verhalten
- Volle Breite, Sparkline rechts neben Textwerten
- Karte kompakter: Gesamtwert in etwas kleinerer Schrift auf Mobile
- Kein horizontales Scrollen
