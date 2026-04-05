import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts'

interface MiniSparklineProps {
  data: number[]
  trend: 'positive' | 'negative' | 'neutral'
  name: string
}

export default function MiniSparkline({ data, trend, name }: MiniSparklineProps) {
  const strokeColor =
    trend === 'positive' ? '#34d399' : trend === 'negative' ? '#f87171' : '#9ca3af'

  const chartData = data.map((value, i) => ({ i, value }))

  return (
    <div
      role="img"
      aria-label={`${name} Trend: ${trend === 'positive' ? 'steigend' : trend === 'negative' ? 'fallend' : 'neutral'}`}
      className="w-[80px] h-[40px] shrink-0"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={['dataMin', 'dataMax']} hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
