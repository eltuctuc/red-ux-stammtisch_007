interface TooltipPayload {
  value?: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  const d = new Date(Number(year), Number(month) - 1, Number(day))
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function PriceChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  const price = payload[0]?.value

  return (
    <div
      className="
        px-3 py-2 rounded-xl text-sm
        bg-white/80 dark:bg-[#1a1d27]/90
        backdrop-blur-md
        border border-black/10 dark:border-white/10
        shadow-lg
      "
    >
      <p className="text-gray-500 dark:text-gray-400 text-xs mb-0.5">
        {label ? formatDate(label) : ''}
      </p>
      <p className="font-semibold text-gray-900 dark:text-white">
        {price !== undefined ? priceFormatter.format(price) : '–'}
      </p>
    </div>
  )
}
