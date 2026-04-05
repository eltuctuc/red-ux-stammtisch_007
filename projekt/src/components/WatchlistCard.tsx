import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { WatchlistEntry } from '../data/mockWatchlist'
import MiniSparkline from './MiniSparkline'

interface WatchlistCardProps {
  entry: WatchlistEntry
}

function formatPrice(price: number): string {
  if (price >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3,
    maximumFractionDigits: 4,
  }).format(price)
}

type Trend = 'positive' | 'negative' | 'neutral'

function getTrend(change: number): Trend {
  if (change > 0) return 'positive'
  if (change < 0) return 'negative'
  return 'neutral'
}

export default function WatchlistCard({ entry }: WatchlistCardProps) {
  const { symbol, name, price, change24h, sparkline } = entry
  const trend = getTrend(change24h)

  const colorClass =
    trend === 'positive'
      ? 'text-emerald-400'
      : trend === 'negative'
        ? 'text-red-400'
        : 'text-gray-400'

  const sign = trend === 'positive' ? '+' : trend === 'negative' ? '' : ''

  return (
    <li
      role="listitem"
      className="
        flex items-center justify-between gap-3 px-4 py-3
        rounded-xl
        bg-white/50 dark:bg-white/[0.03]
        border border-black/[0.06] dark:border-white/[0.06]
        transition-all duration-200 ease-out
        hover:scale-[1.02] hover:shadow-md dark:hover:shadow-black/20
        cursor-default
        min-w-[200px] md:min-w-0
      "
    >
      {/* Left: symbol + name + price + change */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-gray-900 dark:text-white">{symbol}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500 truncate">{name}</span>
        </div>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {formatPrice(price)}
        </span>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${colorClass}`}
          aria-label={`24h-Änderung: ${sign}${Math.abs(change24h).toFixed(2)}%`}
        >
          {trend === 'positive' && <TrendingUp size={12} aria-hidden="true" />}
          {trend === 'negative' && <TrendingDown size={12} aria-hidden="true" />}
          {trend === 'neutral' && <Minus size={12} aria-hidden="true" />}
          <span aria-hidden="true">
            {sign}{Math.abs(change24h).toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Right: mini sparkline */}
      <MiniSparkline data={sparkline} trend={trend} name={name} />
    </li>
  )
}
