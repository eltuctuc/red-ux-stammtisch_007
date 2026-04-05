---
status: approved
---

# FEAT-1: App-Header

## Fortschritt
Status: Approved
Aktueller Schritt: Spec
Fix-Schwelle: Critical

## Abhängigkeiten
- Benötigt: Keine

---

## 1. Feature Spec
*Ausgefüllt von: /red:proto-requirements — 2026-04-05*

### Beschreibung
Globale Navigationsleiste mit App-Branding, optischer Suchleiste und Dark/Light-Mode-Toggle. Bildet den persistenten oberen Rahmen des Dashboards.

### Definitionen
- **Dark Mode:** Dunkle Hintergrundfarben (z.B. #0f1117) mit hellen Texten – Standard beim ersten Laden
- **Light Mode:** Helle Hintergrundfarben mit dunklen Texten – via Toggle aktivierbar
- **Glassmorphism:** CSS-Effekt mit halbtransparentem Hintergrund (backdrop-filter: blur) und subtiler Border

### User Stories
- Als Nutzer sehe ich den App-Namen "Cryptofolio" sofort, um zu wissen welche App ich geöffnet habe
- Als Nutzer sehe ich eine Suchleiste im Header, um das Dashboard professionell wirken zu lassen
- Als Nutzer kann ich zwischen Dark und Light Mode wechseln, um meine Präferenz anzupassen
- Als Mobile-Nutzer sehe ich den Header kompakt und ohne Überlappungen

### Acceptance Criteria
- [ ] App-Name "Cryptofolio" ist im Header links sichtbar
- [ ] Suchleiste ist im Header mittig oder rechts sichtbar – kein echtes Filtering nötig
- [ ] Dark/Light Mode Toggle ist klickbar und wechselt das Theme sofort ohne Reload
- [ ] Dark Mode ist Standard beim ersten Laden
- [ ] Header ist auf Mobile und Desktop korrekt dargestellt (keine Überlappungen)
- [ ] Glassmorphism-Styling auf dem Header-Element

### Edge Cases
- **Langer Suchtext:** Sehr langer Text im Suchfeld bricht das Layout nicht
- **Schneller Toggle:** Theme-Toggle funktioniert auch ohne JS-Fehler in der Console
- **Flackern:** Header bleibt bei schnellem Dark/Light-Wechsel stabil (kein Flackern)

### Nicht im Scope
- Echte Suchergebnisse oder Filtering
- User-Account-Icon oder Avatar
- Notifications / Badge-Counter
