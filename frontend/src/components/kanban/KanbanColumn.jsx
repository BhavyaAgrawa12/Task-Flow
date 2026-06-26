import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskCard from './TaskCard'
import { cn } from '../../lib/utils'

function KanbanColumn({ column, tasks, onTaskClick }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: 'column', status: column.id },
  })

  const taskIds = tasks.map((task) => task.id)

  return (
    <div className="flex min-h-0 min-w-[240px] flex-1 flex-col sm:min-w-[280px]">
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-text">{column.label}</h3>
        <span className="rounded-md bg-white/[0.08] px-2 py-0.5 text-xs font-medium text-text-muted">
          {tasks.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          'flex min-h-[200px] flex-1 flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 transition-colors',
          isOver && 'border-primary/40 bg-primary/[0.04]',
        )}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/[0.08] px-4 py-8 text-center">
              <p className="text-xs text-text-muted">Drop tasks here</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onTaskClick={onTaskClick} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  )
}

export default KanbanColumn
