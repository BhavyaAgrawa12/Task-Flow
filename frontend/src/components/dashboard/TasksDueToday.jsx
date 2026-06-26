import EmptyState from '../common/EmptyState'

function TasksDueToday({ tasks, totalTasks }) {
  const dueCount = tasks.length

  return (
    <div className="glass-card flex h-full flex-col p-5">
      <h3 className="text-sm font-semibold text-text">Tasks Due Today</h3>

      <div className="mt-4 grid grid-cols-3 gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <p className="text-xs text-text-muted">Tasks</p>
          <p className="mt-1 text-xl font-bold text-text">{totalTasks}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted">Today</p>
          <p className="mt-1 text-xl font-bold text-primary">{dueCount}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted">Total</p>
          <p className="mt-1 text-xl font-bold text-text">{totalTasks}</p>
        </div>
      </div>

      <div className="mt-4 flex-1 space-y-2.5">
        {tasks.length === 0 ? (
          <EmptyState title="No tasks due today" />
        ) : (
          tasks.slice(0, 4).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2"
            >
              <span className="truncate text-sm text-text-secondary">{task.title}</span>
              <span className="ml-2 shrink-0 text-xs capitalize text-text-muted">
                {task.priority}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TasksDueToday
