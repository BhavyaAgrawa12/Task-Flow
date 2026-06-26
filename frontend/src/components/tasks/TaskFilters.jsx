import { PRIORITY, TASK_STATUS, TASK_STATUS_LABELS } from '../../utils/constants'
import { cn } from '../../utils/formatters'

const statusOptions = [
  { id: 'all', label: 'All' },
  { id: TASK_STATUS.TODO, label: TASK_STATUS_LABELS[TASK_STATUS.TODO] },
  { id: TASK_STATUS.IN_PROGRESS, label: TASK_STATUS_LABELS[TASK_STATUS.IN_PROGRESS] },
  { id: TASK_STATUS.DONE, label: TASK_STATUS_LABELS[TASK_STATUS.DONE] },
]

const priorityOptions = [
  { id: 'all', label: 'All priorities' },
  { id: PRIORITY.LOW, label: 'Low' },
  { id: PRIORITY.MEDIUM, label: 'Medium' },
  { id: PRIORITY.HIGH, label: 'High' },
]

function TaskFilters({ statusFilter, onStatusChange, priorityFilter, onPriorityChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onStatusChange(option.id)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              statusFilter === option.id
                ? 'border-primary/40 bg-primary/10 text-text'
                : 'border-white/[0.08] bg-white/[0.04] text-text-secondary hover:text-text',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <select
        value={priorityFilter}
        onChange={(event) => onPriorityChange(event.target.value)}
        className="h-9 rounded-xl border border-white/[0.1] bg-white/[0.05] px-3 text-xs text-text-secondary focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {priorityOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TaskFilters
