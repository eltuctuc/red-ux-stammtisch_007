import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 h-16 flex items-center px-4 md:px-6
        bg-white/80 dark:bg-[#0f1117]/80
        backdrop-blur-[12px]
        border-b border-black/10 dark:border-white/10"
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent select-none">
          Cryptofolio
        </h1>
      </div>

      {/* Search – hidden on mobile */}
      <SearchBar />

      {/* Spacer on mobile */}
      <div className="flex-1 md:hidden" />

      {/* Theme Toggle */}
      <ThemeToggle />
    </header>
  )
}
