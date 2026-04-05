import { TrendingUp, TrendingDown } from 'lucide-react'

interface TrendBadgeProps {
  percent: number
  usd: number
}

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

export default function TrendBadge({ percent, usd }: TrendBadgeProps) {
  const isPositive = percent >= 0
  const colorClass = isPositive ? 'text-emerald-400' : 'text-red-400'
  const sign = isPositive ? '+' : '-'
  const absPercent = Math.abs(percent).toFixed(2)
  const absUsd = usdFormatter.format(Math.abs(usd))
  const ariaLabel = `24h-Änderung: ${sign}${absPercent}% (${sign}${absUsd})`

  return (
    <div
      className={`flex items-center gap-1.5 text-sm font-medium ${colorClass}`}
      aria-label={ariaLabel}
    >
      {isPositive ? (
        <TrendingUp size={16} aria-hidden="true" />
      ) : (
        <TrendingDown size={16} aria-hidden="true" />
      )}
      <span aria-hidden="true">
        {sign}{absPercent}%
      </span>
      <span className="opacity-75" aria-hidden="true">
        ({sign}{absUsd})
      </span>
    </div>
  )
}
