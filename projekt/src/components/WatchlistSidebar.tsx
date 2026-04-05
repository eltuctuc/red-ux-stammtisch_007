import { mockWatchlist } from '../data/mockWatchlist'
import WatchlistCard from './WatchlistCard'

export default function WatchlistSidebar() {
  return (
    <aside>
      <div className="
        rounded-2xl p-4 md:p-5
        bg-white/70 dark:bg-white/5
        backdrop-blur-md
        border border-black/10 dark:border-white/10
        shadow-sm
      ">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Watchlist
        </h3>

        {/* Desktop: vertical list | Mobile: horizontal scroll */}
        <ul
          role="list"
          aria-label="Watchlist"
          className="
            flex flex-row gap-3 overflow-x-auto pb-1
            snap-x snap-mandatory
            md:flex-col md:overflow-x-visible md:pb-0
            md:snap-none
          "
        >
          {mockWatchlist.map(entry => (
            <WatchlistCard key={entry.symbol} entry={entry} />
          ))}
        </ul>
      </div>
    </aside>
  )
}
