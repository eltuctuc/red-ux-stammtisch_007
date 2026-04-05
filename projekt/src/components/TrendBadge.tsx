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
  const sign = isPositive ? '+' : ''

  return (
    <div className={`flex items-center gap-1.5 text-sm font-medium ${colorClass}`}>
      {isPositive ? (
        <TrendingUp size={16} aria-hidden="true" />
      ) : (
        <TrendingDown size={16} aria-hidden="true" />
      )}
      <span>
        {sign}{percent.toFixed(2)}%
      </span>
      <span className="opacity-75">
        ({sign}{usdFormatter.format(usd)})
      </span>
    </div>
  )
}
