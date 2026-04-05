import type { Transaction } from '../data/mockTransactions'
import TransactionBadge from './TransactionBadge'

interface TransactionRowProps {
  tx: Transaction
}

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

function formatAmount(amount: number, symbol: string): string {
  // Small amounts (< 1): up to 5 significant digits
  if (amount < 1) {
    return `${amount.toFixed(5)} ${symbol}`
  }
  // Large whole-number amounts (≥ 100): Tausender-Trenner + 2 Dezimalstellen
  if (amount >= 100) {
    return `${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)} ${symbol}`
  }
  return `${amount.toFixed(2)} ${symbol}`
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  const d = new Date(Number(year), Number(month) - 1, Number(day))
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function TransactionRow({ tx }: TransactionRowProps) {
  return (
    <tr className="border-t border-black/[0.04] dark:border-white/[0.04] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-colors">
      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {formatDate(tx.date)}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{tx.symbol}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[80px]">{tx.name}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <TransactionBadge type={tx.type} />
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap tabular-nums">
        {formatAmount(tx.amount, tx.symbol)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap tabular-nums">
        {usdFormatter.format(tx.pricePerUnit)}
      </td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap tabular-nums">
        {usdFormatter.format(tx.total)}
      </td>
    </tr>
  )
}
