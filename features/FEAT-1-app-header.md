---
status: dev
---

# FEAT-1: App-Header

## Fortschritt
Status: Approved
Aktueller Schritt: Dev
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

---

## 2. UX Entscheidungen
*2026-04-05*

### Einbettung im Produkt
Fixierter `<header>` über dem gesamten Viewport | Route: `/`
`position: sticky, top: 0, z-index: 50` – immer sichtbar, auch beim Scrollen.
Glassmorphism: `backdrop-filter: blur(12px)` + halbtransparenter Hintergrund + subtile Border unten.

### Einstiegspunkte
App-Start → S-01 Dashboard → Header ist persistent sichtbar

### User Flow
App öffnen → Header sichtbar → Toggle klicken → Theme wechselt sofort in-place

### Interaktionsmuster
- Primärmuster: Sticky Navigation mit In-Place Theme-Toggle
- Fehler-Handling: Kein Fehlerfall (dekorative Suche, Toggle ohne externe Abhängigkeiten)
- Leerer Zustand: Nicht anwendbar
- Ladeverhalten: Nicht anwendbar

### Eingesetzte Komponenten
| Komponente | DS-Status | Quelle |
|------------|-----------|--------|
| Header-Container (sticky, glassmorphism) | ⚠ Tokens-Build | Kein DS vorhanden |
| Logo-Text "Cryptofolio" (gradient/accent) | ⚠ Tokens-Build | Kein DS vorhanden |
| Search Input (dekorativ) | ⚠ Tokens-Build | Kein DS vorhanden |
| Theme-Toggle Button (Icon, 44px) | ⚠ Tokens-Build | Kein DS vorhanden |

### Navigation nach Aktionen (verbindlich)
| Ausgangs-Screen | Aktion | Ziel | Bedingung |
|-----------------|--------|------|-----------|
| S-01 Dashboard | Dark/Light Toggle klick | Theme wechselt in-place | – |
| S-01 Dashboard | Klick in Suchleiste | Fokus-State, kein Navigation | Kein Filtering |

### DS-Status
- Konforme Komponenten: –
- Tokens-Build (genehmigt): Header-Container, Logo, Search Input, Toggle Button

### Barrierefreiheit (A11y)
- Keyboard: Tab → Logo, Tab → Search, Tab → Toggle; Enter/Space auf Toggle aktiviert Theme-Wechsel
- Screen Reader: `aria-label="Dark mode aktivieren"` / `"Light mode aktivieren"` auf Toggle; Search: `aria-label="Suche"`, `placeholder="Suchen..."`
- Farbkontrast: Logo und Toggle-Icon auf Glassmorphism-Hintergrund – mindestens 4.5:1 sicherstellen

| Element | Mindest-Ratio | Maßnahme |
|---------|--------------|---------|
| Logo-Text | 4.5:1 | Helles Weiß (#F9FAFB) auf Dark-BG |
| Toggle-Icon | 3:1 | Icon-Größe ≥ 24px, Kontrast via color |
| Search Placeholder | 3:1 | gray-400 auf Dark-BG ausreichend |

### Mobile-Verhalten
- Logo links, Toggle rechts – kein Overflow
- Suchleiste auf Mobile: ausgeblendet (`hidden md:flex`) oder in zweiter Zeile unter Logo
- Header-Height: 64px Desktop, 56px Mobile

---

## 3. Technisches Design
*2026-04-05*

### State-Komplexität
State-Komplexität geprüft – kein State Machine erforderlich. Einfacher boolean-State für isDark.

### Daten-Validation
Quelle: localStorage (Key: `cryptofolio-theme`)
Validation: `typeof value === 'string' && (value === 'dark' || value === 'light')`
Fallback: `true` (Dark Mode Standard) wenn Key fehlt oder Wert ungültig.

### Component-Struktur
```
App (Root)
└── ThemeProvider (Context + localStorage-Hook)
    └── Header
        ├── Logo          ("Cryptofolio" mit Gradient-Text)
        ├── SearchBar     (dekoratives Input, kein Handler)
        └── ThemeToggle   (Button, Sun/Moon Icon, 44px Touch-Target)
```

ThemeProvider in App.tsx stellt `isDark` + `toggleTheme` per Context bereit.
Dark Mode Mechanismus: `document.documentElement.classList.toggle('dark')` – synchron, kein Flackern.

### Daten-Model
- `isDark: boolean` – localStorage Key `cryptofolio-theme`
- Initialisierung: localStorage lesen → validieren → fallback `true`
- Kein Backend, kein API-Aufruf

### API / Daten-Fluss
Nicht anwendbar – reiner Client-State.

### Tech-Entscheidungen
- **ThemeProvider als Context:** 5 Features brauchen alle Dark-Mode-Klassen – kein prop-drilling
- **`dark` class auf `<html>`:** Tailwind v4 dark:-Variant Default
- **localStorage statt sessionStorage:** Theme-Präferenz über Sessions hinweg erhalten
- **synchrone Klassenmanipulation in toggleTheme:** Kein useEffect, kein Flackern
- **Search als reines `<input>` ohne onChange:** Kein State, kein Re-Render

### Security-Anforderungen
- Authentifizierung: Nicht anwendbar
- Input-Validierung: localStorage-Wert validieren (String-Check, kein eval/JSON.parse)
- OWASP: Kein XSS-Risiko (kein User-Input wird gerendert)

### Dependencies
- `lucide-react` – Sun/Moon Icons (tree-shakeable)

### A11y-Architektur

| Element | ARIA-Pattern | Entscheidung |
|---------|-------------|--------------|
| `<header>` | Landmark via HTML-Semantik | `role="banner"` automatisch |
| ThemeToggle | `<button>` | `aria-label` dynamisch: "Dark mode aktivieren" / "Light mode aktivieren" |
| SearchBar | `<input type="search">` | `aria-label="Suche"`, `placeholder="Suchen..."` |
| Fokus-Management | Natürliche DOM-Reihenfolge | Logo → Search → Toggle |
| Live-Region | Nicht nötig | Theme-Wechsel sofort visuell sichtbar |

### Test-Setup
- Unit: ThemeProvider – initialisiert isDark=true ohne localStorage; togglet korrekt; schreibt in localStorage
- Unit: ThemeToggle – rendert Sun-Icon bei dark, Moon-Icon bei light; aria-label wechselt
- Integration: Header rendert korrekt mit allen Child-Komponenten

### Test-Infrastruktur
- Environment: happy-dom (Vite default)
- Mocks: `vi.stubGlobal('localStorage', localStorageMock)` – localStorage braucht Stub
- Fallstrick: `document.documentElement.classList` nach jedem Test zurücksetzen (`afterEach`)

### Datei-Pfade
- `projekt/src/context/ThemeContext.tsx`
- `projekt/src/components/Header.tsx`
- `projekt/src/components/SearchBar.tsx`
- `projekt/src/components/ThemeToggle.tsx`

---

## 4. Implementierung
*2026-04-05*

### Implementierte Dateien
- `projekt/src/context/ThemeContext.tsx` – ThemeProvider + useTheme Hook, localStorage-Persistenz
- `projekt/src/components/Header.tsx` – Sticky Glassmorphism-Header
- `projekt/src/components/SearchBar.tsx` – Dekoratives Search-Input, hidden auf Mobile
- `projekt/src/components/ThemeToggle.tsx` – Sun/Moon Toggle mit dynamischem aria-label
- `projekt/src/App.tsx` – Root-Wrapper mit ThemeProvider + Header
- `projekt/index.html` – Anti-Flash-Script, lang="de", Titel "Cryptofolio"
- `projekt/src/index.css` – Tailwind v4 class-based dark mode via @custom-variant

### Installierte Dependencies
- `lucide-react@0.x` – Sun/Moon Icons

### Offene Punkte / Tech-Debt
- Keine
