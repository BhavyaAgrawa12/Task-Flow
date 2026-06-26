import { TASK_STATUS_LABELS } from '../../utils/constants'
import { formatRelativeTime } from '../../utils/formatters'

const statusColors = {
  todo: 'bg-text-muted',
  'in-progress': 'bg-primary',
  done: 'bg-success',
}

function RecentActivity({ activities }) {
  return (
    <div className="glass-card flex h-full flex-col p-5">
      <h3 className="text-sm font-semibold text-text">Recent Activity</h3>

      <div className="mt-4 flex-1">
        {activities.length === 0 ? (
          <p className="py-6 text-center text-xs text-text-muted sm:text-sm">
            No recent activity yet. Create tasks to see updates here.
          </p>
        ) : (
          <div className="space-y-3">
            {activities.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${statusColors[item.status] || 'bg-text-muted'}`}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-text">{item.title}</p>
                  <p className="text-xs text-text-muted">
                    {TASK_STATUS_LABELS[item.status] || item.status} ·{' '}
                    {formatRelativeTime(item.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentActivity
