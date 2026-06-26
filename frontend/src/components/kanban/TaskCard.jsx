import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Calendar, Clock, GripVertical } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import UserAvatar from '../common/UserAvatar'
import { formatShortDate } from '../../utils/formatters'
import { cn } from '../../lib/utils'

const priorityStyles = {
  low: 'bg-white/[0.08] text-text-muted',
  medium: 'bg-warning/15 text-warning',
  high: 'bg-danger/15 text-danger',
}

function TaskCard({ task, isDragging = false, onTaskClick }) {
  const { user } = useAuth()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id, data: { type: 'task', task } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const dragging = isDragging || isSortableDragging
  const dueLabel = formatShortDate(task.dueDate)
  const effortLabel = task.estimatedEffort?.trim()

  const handleClick = (event) => {
    if (dragging || event.defaultPrevented) return
    onTaskClick?.(task)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className={cn(
        'glass-card group relative p-4 transition-all',
        onTaskClick && !dragging && 'cursor-pointer',
        dragging && 'opacity-50 shadow-elevated ring-2 ring-primary/40',
        !dragging && 'hover:border-white/[0.14]',
      )}
    >
      <div className="mb-3 flex items-start gap-2">
        <button
          type="button"
          className="mt-0.5 flex h-6 w-5 shrink-0 cursor-grab items-center justify-center rounded text-text-muted opacity-0 transition-opacity hover:text-text active:cursor-grabbing group-hover:opacity-100"
          aria-label="Drag task"
          onClick={(event) => event.stopPropagation()}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <p className="min-w-0 flex-1 text-sm font-medium leading-snug text-text">
          {task.title}
        </p>

        <UserAvatar name={user?.name ?? 'User'} size="sm" />
      </div>

      <div className="flex items-center justify-between gap-2 pl-7">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {dueLabel ? (
            <span className="inline-flex items-center gap-1 text-xs text-text-muted">
              <Calendar className="h-3 w-3 shrink-0" />
              {dueLabel}
            </span>
          ) : null}
          {effortLabel ? (
            <span className="inline-flex items-center gap-1 text-xs text-text-muted">
              <Clock className="h-3 w-3 shrink-0" />
              {effortLabel}
            </span>
          ) : null}
          {!dueLabel && !effortLabel ? (
            <span
              className={cn(
                'rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                priorityStyles[task.priority] ?? priorityStyles.medium,
              )}
            >
              {task.priority}
            </span>
          ) : null}
        </div>

        {(dueLabel || effortLabel) && (
          <span
            className={cn(
              'shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
              priorityStyles[task.priority] ?? priorityStyles.medium,
            )}
          >
            {task.priority}
          </span>
        )}
      </div>
    </div>
  )
}

export default TaskCard
