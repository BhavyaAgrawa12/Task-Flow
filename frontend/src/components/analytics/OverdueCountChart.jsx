import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartAxisTick, chartGridStroke, chartTooltipStyle } from './chartTheme'

function OverdueCountChart({ data }) {
  return (
    <div className="glass-card flex h-full flex-col p-5">
      <h3 className="text-sm font-semibold text-text">Overdue Count</h3>

      <div className="min-h-[220px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid stroke={chartGridStroke} vertical={false} />
            <XAxis
              dataKey="day"
              tick={chartAxisTick}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={chartAxisTick}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={chartTooltipStyle}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="overdue" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default OverdueCountChart
