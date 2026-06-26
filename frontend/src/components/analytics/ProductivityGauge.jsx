import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

function ProductivityGauge({ score }) {
  const filled = Math.max(0, Math.min(100, score))
  const remaining = 100 - filled

  const data = [
    { name: 'Score', value: filled, color: '#3b82f6' },
    { name: 'Remaining', value: remaining, color: 'rgba(255,255,255,0.08)' },
  ]

  return (
    <div className="glass-card flex h-full flex-col p-5">
      <h3 className="text-sm font-semibold text-text">Productivity Score</h3>

      <div className="relative min-h-[220px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="70%"
              startAngle={180}
              endAngle={0}
              innerRadius="65%"
              outerRadius="95%"
              stroke="transparent"
              paddingAngle={0}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center">
          <span className="text-4xl font-bold text-text">{score}</span>
          <span className="mt-1 text-xs text-text-muted">out of 100</span>
        </div>
      </div>
    </div>
  )
}

export default ProductivityGauge
