import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { mockPriceHistory } from '../data/mockPriceHistory'
import PriceChartTooltip from './PriceChartTooltip'

const GRADIENT_ID = 'btcPriceGradient'

function formatYAxis(value: number): string {
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`
  return `$${value}`
}

function formatXAxis(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  const d = new Date(Number(year), Number(month) - 1, Number(day))
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })
}

export default function PriceChart() {
  return (
    <article
      className="
        rounded-2xl p-5 md:p-6
        bg-white/70 dark:bg-white/5
        backdrop-blur-md
        border border-black/10 dark:border-white/10
        shadow-sm
      "
    >
      {/* Header */}
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Bitcoin
            <span className="ml-1.5 text-xs font-normal text-gray-500 dark:text-gray-400">BTC</span>
          </h3>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">Letzte 90 Tage</span>
      </div>

      {/* Chart */}
      <div
        role="img"
        aria-label="Bitcoin Preisverlauf der letzten 90 Tage als Flächendiagramm"
        className="h-48 md:h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockPriceHistory} margin={{ top: 4, right: 20, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="text-black/5 dark:text-white/5"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              interval={14}
              tick={{ fontSize: 11, fill: 'currentColor' }}
              className="text-gray-400 dark:text-gray-500"
              axisLine={false}
              tickLine={false}
              dy={6}
            />

            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fontSize: 11, fill: 'currentColor' }}
              className="text-gray-400 dark:text-gray-500"
              axisLine={false}
              tickLine={false}
              width={42}
              domain={['auto', 'auto']}
            />

            <Tooltip
              content={<PriceChartTooltip />}
              cursor={{ stroke: '#22d3ee', strokeWidth: 1, strokeDasharray: '4 2' }}
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke="#22d3ee"
              strokeWidth={2}
              fill={`url(#${GRADIENT_ID})`}
              dot={false}
              activeDot={{ r: 4, fill: '#22d3ee', strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}
