# Dev Handoff – FEAT-1: App-Header
*2026-04-05*

## Was gebaut wurde
- `projekt/src/context/ThemeContext.tsx` – ThemeProvider (Context + localStorage), `useTheme` Hook
- `projekt/src/components/Header.tsx` – Sticky Glassmorphism-Header (`sticky top-0 z-50`, `backdrop-blur-[12px]`)
- `projekt/src/components/SearchBar.tsx` – Dekoratives `<input type="search">`, auf Mobile `hidden md:flex`
- `projekt/src/components/ThemeToggle.tsx` – Button mit Sun/Moon Icon (Lucide), dynamischem `aria-label`
- `projekt/src/App.tsx` – Root mit ThemeProvider + Header + leerer `<main>`
- `projekt/index.html` – Anti-Flash-Script (sync `dark`-Klasse vor erstem Paint), `lang="de"`, Titel "Cryptofolio"
- `projekt/src/index.css` – Tailwind v4 `@custom-variant dark (&:is(.dark, .dark *))` für class-based dark mode

## Entscheidungen getroffen
- **Synchrone DOM-Manipulation statt useEffect:** `toggleTheme` schreibt `classList.add/remove('dark')` direkt im setState-Callback – kein Render-Flackern
- **Anti-Flash-Script in index.html:** `localStorage.getItem('cryptofolio-theme')` wird vor dem ersten Paint ausgelesen und `dark`-Klasse gesetzt – kein FOUC
- **Tailwind v4 `@custom-variant`:** Class-based dark mode erfordert explizite Konfiguration in `index.css`, da v4 default Media-Query nutzt
- **SearchBar kein State:** Reines `<input>` ohne `onChange` – kein Re-Render, keine Warnung

## DS-Abweichungen
- Alle Komponenten sind Tokens-Build (kein bestehendes Design System) – genehmigt laut FEAT-1 UX-Entscheidungen
- Glassmorphism: hardcoded `bg-[#0f1117]/80 backdrop-blur-[12px]` im Header

## Offene Punkte
- Keine

## Für QA relevant
- Dark Mode Standard: Seite muss beim ersten Laden (ohne localStorage) im Dark Mode erscheinen
- Anti-Flash: kein weißes Aufflackern beim Reload
- Toggle: Schnelles Hin- und Herwechseln darf keine JS-Fehler in der Console erzeugen
- Mobile (< 768px): Suchleiste verschwindet, Logo links + Toggle rechts ohne Overflow
- `aria-label` auf ThemeToggle muss mit dem aktuellen Theme wechseln ("Light mode aktivieren" wenn dark aktiv, "Dark mode aktivieren" wenn light aktiv)
- Kontrast Logo-Gradient auf beiden Themes ausreichend (gradient ist Theme-unabhängig)
