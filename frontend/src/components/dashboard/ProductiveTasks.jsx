function ProductiveTasks({ stats }) {
  const rows = [
    { label: 'Completed', value: stats.done },
    { label: 'In Progress', value: stats.inProgress },
    { label: 'To Do', value: stats.todo },
  ]

  return (
    <div className="glass-card flex h-full flex-col p-5">
      <h3 className="text-sm font-semibold text-text">Productive Tasks</h3>

      <div className="mt-4 flex-1 space-y-4">
        {rows.map(({ label, value }) => (
          <div key={label}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-text-secondary">{label}</span>
              <span className="font-semibold text-text">{value}</span>
            </div>
            {label === 'Completed' && stats.total > 0 && (
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${stats.completionRate}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-text-muted">
        {stats.completionRate}% completion rate across all tasks
      </p>
    </div>
  )
}

export default ProductiveTasks
