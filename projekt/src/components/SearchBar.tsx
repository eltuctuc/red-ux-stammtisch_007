export default function SearchBar() {
  return (
    <div aria-hidden="true" className="hidden md:flex flex-1 max-w-sm mx-4">
      <input
        type="search"
        tabIndex={-1}
        readOnly
        placeholder="Suchen..."
        className="w-full px-4 py-2 rounded-lg text-sm
          bg-gray-100 dark:bg-white/10
          border border-gray-300 dark:border-white/20
          text-gray-900 dark:text-gray-100
          placeholder:text-gray-500 dark:placeholder:text-gray-400
          cursor-default outline-none
          transition-colors"
      />
    </div>
  )
}
