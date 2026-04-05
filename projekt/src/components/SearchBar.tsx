export default function SearchBar() {
  return (
    <div className="hidden md:flex flex-1 max-w-sm mx-4">
      <input
        type="search"
        aria-label="Suche"
        placeholder="Suchen..."
        className="w-full px-4 py-2 rounded-lg text-sm
          bg-gray-100 dark:bg-white/10
          border border-gray-300 dark:border-white/20
          text-gray-900 dark:text-gray-100
          placeholder:text-gray-500 dark:placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-cyan-500/50
          transition-colors"
      />
    </div>
  )
}
