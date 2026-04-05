import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts'

interface SparklinePoint {
  day: string
  value: number
}

interface PortfolioSparklineProps {
  data: SparklinePoint[]
  isPositive: boolean
}

export default function PortfolioSparkline({ data, isPositive }: PortfolioSparklineProps) {
  const strokeColor = isPositive ? '#34d399' : '#f87171'

  return (
    <div
      role="img"
      aria-label={`7-Tage Portfolio-Trend: ${isPositive ? 'steigend' : 'fallend'}`}
      className="w-[120px] h-[60px] shrink-0"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <YAxis domain={['dataMin', 'dataMax']} hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
