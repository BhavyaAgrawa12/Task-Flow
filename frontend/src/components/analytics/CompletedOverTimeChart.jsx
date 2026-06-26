import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartAxisTick, chartGridStroke, chartTooltipStyle } from './chartTheme'

function CompletedOverTimeChart({ data }) {
  return (
    <div className="glass-card flex h-full flex-col p-5">
      <h3 className="text-sm font-semibold text-text">Completed over Time</h3>

      <div className="min-h-[220px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#completedGradient)"
              dot={{ fill: '#3b82f6', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CompletedOverTimeChart
