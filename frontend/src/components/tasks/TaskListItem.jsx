import { Link } from 'react-router-dom'
import { Calendar, ChevronRight } from 'lucide-react'
import { TASK_STATUS_LABELS } from '../../utils/constants'
import { formatShortDate } from '../../utils/formatters'
import { cn } from '../../utils/formatters'

const statusStyles = {
  todo: 'bg-white/[0.08] text-text-muted',
  'in-progress': 'bg-primary/15 text-primary',
  done: 'bg-success/15 text-success',
}

const priorityStyles = {
  low: 'text-text-muted',
  medium: 'text-warning',
  high: 'text-danger',
}

function TaskListItem({ task, boardTitle, onClick }) {
  const dueLabel = formatShortDate(task.dueDate)

  return (
    <button
      type="button"
      onClick={() => onClick(task)}
      className="glass-card group flex w-full items-center gap-4 p-4 text-left transition-all hover:border-white/[0.14] hover-lift"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text">{task.title}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-text-muted">
          {boardTitle ? (
            <Link
              to={`/boards/${task.board}`}
              onClick={(event) => event.stopPropagation()}
              className="transition-colors hover:text-primary"
            >
              {boardTitle}
            </Link>
          ) : null}
          {dueLabel ? (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {dueLabel}
            </span>
          ) : null}
          <span className={cn('capitalize', priorityStyles[task.priority])}>
            {task.priority}
          </span>
        </div>
      </div>

      <span
        className={cn(
          'shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
          statusStyles[task.status] ?? statusStyles.todo,
        )}
      >
        {TASK_STATUS_LABELS[task.status] || task.status}
      </span>

      <ChevronRight className="h-4 w-4 shrink-0 text-text-muted opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  )
}

export default TaskListItem
