export interface Transaction {
  date: string
  symbol: string
  name: string
  type: 'buy' | 'sell'
  amount: number
  pricePerUnit: number
  total: number
}

export const mockTransactions: Transaction[] = [
  {
    date: '2026-04-03',
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'buy',
    amount: 0.015,
    pricePerUnit: 67_423.18,
    total: 1_011.35,
  },
  {
    date: '2026-03-29',
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'sell',
    amount: 0.5,
    pricePerUnit: 3_541.22,
    total: 1_770.61,
  },
  {
    date: '2026-03-22',
    symbol: 'SOL',
    name: 'Solana',
    type: 'buy',
    amount: 12.0,
    pricePerUnit: 142.87,
    total: 1_714.44,
  },
  {
    date: '2026-03-15',
    symbol: 'ADA',
    name: 'Cardano',
    type: 'buy',
    amount: 2_500,
    pricePerUnit: 0.452,
    total: 1_130.0,
  },
  {
    date: '2026-03-08',
    symbol: 'DOT',
    name: 'Polkadot',
    type: 'sell',
    amount: 150,
    pricePerUnit: 7.1,
    total: 1_065.0,
  },
]
