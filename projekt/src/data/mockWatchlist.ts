export interface WatchlistEntry {
  symbol: string
  name: string
  price: number
  change24h: number // percent, e.g. +2.34 or -1.12 or 0
  sparkline: number[] // 10 Werte, älteste zuerst
}

export const mockWatchlist: WatchlistEntry[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67_423.18,
    change24h: 2.34,
    sparkline: [65_000, 66_100, 64_800, 67_200, 66_800, 67_100, 68_000, 67_500, 67_800, 67_423],
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3_541.22,
    change24h: -1.12,
    sparkline: [3_600, 3_580, 3_620, 3_550, 3_490, 3_510, 3_530, 3_545, 3_520, 3_541],
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 142.87,
    change24h: 5.67,
    sparkline: [130, 133, 138, 135, 140, 138, 142, 144, 143, 143],
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.452,
    change24h: -0.89,
    sparkline: [0.46, 0.455, 0.458, 0.45, 0.445, 0.448, 0.452, 0.449, 0.451, 0.452],
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    price: 0.734,
    change24h: 0.0,
    sparkline: [0.73, 0.735, 0.732, 0.738, 0.733, 0.731, 0.734, 0.736, 0.735, 0.734],
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    price: 6.82,
    change24h: -3.21,
    sparkline: [7.1, 7.05, 6.98, 6.9, 6.85, 6.8, 6.76, 6.73, 6.71, 6.68],
  },
]
