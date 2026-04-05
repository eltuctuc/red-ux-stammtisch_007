// Deterministischer Random-Walk (kein Math.random() – gleiche Daten bei jedem Render)
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function generatePriceHistory(): Array<{ date: string; price: number }> {
  const result: Array<{ date: string; price: number }> = []
  let price = 45_000
  const today = new Date('2026-04-05')

  for (let i = 89; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const rand = seededRandom(i) - 0.5 // -0.5 bis +0.5
    price = Math.max(1000, price * (1 + rand * 0.04)) // ±4% Tagesvolatilität, min $1000
    result.push({
      date: d.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
    })
  }

  return result
}

export const mockPriceHistory = generatePriceHistory()
