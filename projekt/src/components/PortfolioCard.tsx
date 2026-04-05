import { mockPortfolio } from '../data/mockPortfolio'
import TrendBadge from './TrendBadge'
import PortfolioSparkline from './PortfolioSparkline'

const totalFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

export default function PortfolioCard() {
  const { totalValue, change24hPercent, change24hUSD, sparklineData } = mockPortfolio
  const isPositive = change24hPercent >= 0

  return (
    <article
      className="
        relative rounded-2xl p-5 md:p-6
        bg-white/70 dark:bg-white/5
        backdrop-blur-md
        border border-black/10 dark:border-white/10
        shadow-sm
        transition-all duration-200 ease-out
        hover:scale-[1.01] hover:shadow-lg dark:hover:shadow-black/30
        cursor-default
      "
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: value + trend */}
        <div className="flex flex-col gap-2 min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Portfolio-Gesamtwert
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
            {totalFormatter.format(totalValue)}
          </h2>
          <TrendBadge percent={change24hPercent} usd={change24hUSD} />
          <p className="text-xs text-gray-400 dark:text-gray-500">24h-Änderung</p>
        </div>

        {/* Right: sparkline */}
        <PortfolioSparkline data={sparklineData} isPositive={isPositive} />
      </div>
    </article>
  )
}
