interface TransactionBadgeProps {
  type: 'buy' | 'sell'
}

export default function TransactionBadge({ type }: TransactionBadgeProps) {
  if (type === 'buy') {
    return (
      <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
        Kauf
      </span>
    )
  }

  return (
    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
      Verkauf
    </span>
  )
}
