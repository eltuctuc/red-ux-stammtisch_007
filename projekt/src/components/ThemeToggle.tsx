import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Light mode aktivieren' : 'Dark mode aktivieren'}
      className="flex items-center justify-center w-11 h-11 rounded-lg
        text-gray-600 dark:text-gray-300
        hover:bg-gray-100 dark:hover:bg-white/10
        focus:outline-none focus:ring-2 focus:ring-cyan-500/50
        transition-colors cursor-pointer"
    >
      {isDark ? (
        <Moon size={22} aria-hidden="true" />
      ) : (
        <Sun size={22} aria-hidden="true" />
      )}
    </button>
  )
}
