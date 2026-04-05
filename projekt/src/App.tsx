import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import PortfolioCard from './components/PortfolioCard'
import PriceChart from './components/PriceChart'
import WatchlistSidebar from './components/WatchlistSidebar'
import './index.css'

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f1117] text-gray-900 dark:text-gray-100 transition-colors">
        <Header />
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column: Portfolio + Chart */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* FEAT-2: Portfolio-Übersicht */}
            <PortfolioCard />
            {/* FEAT-3: Interaktiver Preis-Chart */}
            <PriceChart />
          </div>
          {/* Right column: FEAT-4 Watchlist */}
          <div className="md:col-span-1">
            <WatchlistSidebar />
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}
