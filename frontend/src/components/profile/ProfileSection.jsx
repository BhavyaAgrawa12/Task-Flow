import { User } from 'lucide-react'
import UserAvatar from '../common/UserAvatar'
import { TASK_STATUS_LABELS } from '../../utils/constants'
import { formatRelativeTime } from '../../utils/formatters'

const statusColors = {
  todo: 'bg-text-muted',
  'in-progress': 'bg-primary',
  done: 'bg-success',
}

function ProfileSection({ user, recentActivity }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center gap-2">
        <User className="h-4 w-4 text-text-secondary" />
        <h2 className="text-sm font-semibold text-text">Profile</h2>
      </div>

      <div className="mb-6 flex flex-col items-center text-center sm:items-start sm:text-left">
        <UserAvatar name={user?.name ?? 'User'} size="xl" className="mb-4" />
        <h3 className="text-lg font-bold text-text">{user?.name ?? 'User'}</h3>
        <p className="mt-1 text-sm text-text-secondary">{user?.email}</p>
      </div>

      <div className="flex-1">
        <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-text-muted">
          Recent Activity
        </h4>
        {recentActivity.length === 0 ? (
          <p className="text-sm text-text-muted">No recent task activity yet.</p>
        ) : (
          <ul className="space-y-3">
            {recentActivity.map((item) => (
              <li key={item.id} className="flex items-start gap-3">
                <UserAvatar name={user?.name ?? 'User'} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-text">{item.title}</p>
                  <p className="text-xs text-text-muted">
                    {TASK_STATUS_LABELS[item.status] || item.status} ·{' '}
                    {formatRelativeTime(item.timestamp)}
                  </p>
                </div>
                <span
                  className={`mt-2 h-2 w-2 shrink-0 rounded-full ${statusColors[item.status] || 'bg-text-muted'}`}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ProfileSection
