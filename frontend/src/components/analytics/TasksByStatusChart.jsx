import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { chartTooltipStyle } from './chartTheme'

function TasksByStatusChart({ data }) {
  const hasData = data.length > 0

  return (
    <div className="glass-card flex h-full flex-col p-5">
      <h3 className="text-sm font-semibold text-text">Tasks by Status</h3>

      <div className="min-h-[220px] flex-1">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="40%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                stroke="transparent"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={chartTooltipStyle}
                labelStyle={{ color: '#fff' }}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs text-text-secondary">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-text-muted">
            No task data yet
          </div>
        )}
      </div>
    </div>
  )
}

export default TasksByStatusChart
