# Release Notes

## v0.1.0 *(2026-04-05)*

### Neue Features
- **FEAT-1: App-Header** – Sticky Glassmorphism-Header mit Dark/Light-Mode-Toggle, Logo "Cryptofolio", dekorativer Suchleiste. Dark Mode ist Standard, Theme-Präferenz wird in localStorage persistiert. Anti-Flash-Script verhindert FOUC beim Reload.

### Bug Fixes
- QA-001: FOUC bei Light-Mode-Reload behoben (else-Zweig im Anti-Flash-Script)
- QA-002: useState-Initializer StrictMode-safe gemacht (kein DOM-Sideeffect)
- QA-004 + UX-002 + UX-003: SearchBar vollständig dekorativ (aria-hidden, tabIndex=-1, readOnly, cursor-default)
- UX-001: ThemeToggle Icon-Logik korrigiert (Moon=Dark-Mode aktiv, Sun=Light-Mode aktiv)

### Known Issues
- Mobile Header-Höhe 64px statt 56px per Spec (Low)
- Vite-Boilerplate-Assets nicht bereinigt (Low)
