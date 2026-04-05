import { mockTransactions } from '../data/mockTransactions'
import TransactionRow from './TransactionRow'

export default function TransactionTable() {
  return (
    <section
      className="
        rounded-2xl
        bg-white/70 dark:bg-white/5
        backdrop-blur-md
        border border-black/10 dark:border-white/10
        shadow-sm
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="px-5 py-4 md:px-6 border-b border-black/[0.06] dark:border-white/[0.06]">
        <h3 id="transactions-heading" className="text-sm font-semibold text-gray-900 dark:text-white">
          Letzte Transaktionen
        </h3>
      </div>

      {/* Scrollable table container */}
      <div className="overflow-x-auto relative after:absolute after:right-0 after:top-0 after:h-full after:w-8 after:bg-gradient-to-l after:from-white/60 dark:after:from-[#0f1117]/80 after:pointer-events-none after:md:hidden">
        <table className="w-full min-w-[640px]" aria-labelledby="transactions-heading">
          <thead>
            <tr className="border-b border-black/[0.06] dark:border-white/[0.06]">
              {(['Datum', 'Asset', 'Typ', 'Menge', 'Preis/Einheit', 'Gesamtbetrag'] as const).map(col => (
                <th
                  key={col}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx, i) => (
              <TransactionRow key={i} tx={tx} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
