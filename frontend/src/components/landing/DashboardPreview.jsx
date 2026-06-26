const columns = [
  {
    title: 'To Do',
    tasks: [
      { title: 'Design wireframes', priority: 'low', date: 'Oct 24', initials: 'AA' },
      { title: 'User research', priority: 'medium', date: 'Oct 25', initials: 'AB' },
    ],
  },
  {
    title: 'In Progress',
    tasks: [
      { title: 'Finalize API Documentation', priority: 'high', date: 'Oct 28', initials: 'AA', active: true },
      { title: 'Build auth flow', priority: 'medium', date: 'Oct 27', initials: 'CD' },
    ],
  },
  {
    title: 'Done',
    tasks: [
      { title: 'Setup project repo', priority: 'low', date: 'Oct 20', initials: 'EF' },
    ],
  },
]

function DashboardPreview() {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-purple/10" />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-card/80 shadow-[0_0_80px_-12px_rgba(59,130,246,0.35)] backdrop-blur-sm">
        <div className="flex border-b border-white/[0.08] bg-bg-secondary/60 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
        </div>

        <div className="flex min-h-[280px] sm:min-h-[320px]">
          <aside className="hidden w-36 shrink-0 border-r border-white/[0.08] bg-bg-secondary/40 p-3 sm:block">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary/30" />
              <span className="text-[10px] font-semibold text-text">TaskFlow</span>
            </div>
            <div className="space-y-1">
              {['Boards', 'Tasks', 'Reports'].map((item, i) => (
                <div
                  key={item}
                  className={`rounded-lg px-2 py-1.5 text-[10px] ${
                    i === 0
                      ? 'bg-white/10 font-medium text-text'
                      : 'text-text-muted'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>

          <div className="flex-1 p-3 sm:p-4">
            <div className="mb-3 h-6 w-32 rounded-lg bg-white/[0.06]" />
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {columns.map((col) => (
                <div
                  key={col.title}
                  className="rounded-xl border border-white/[0.08] bg-bg-secondary/50 p-2"
                >
                  <p className="mb-2 text-[10px] font-medium text-text-secondary">{col.title}</p>
                  <div className="space-y-2">
                    {col.tasks.map((task) => (
                      <div
                        key={task.title}
                        className={`rounded-lg border bg-card/80 p-2 ${
                          task.active
                            ? 'border-primary/60 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                            : 'border-white/[0.06]'
                        }`}
                      >
                        <p className="mb-2 text-[9px] font-medium leading-tight text-text sm:text-[10px]">
                          {task.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-white/10 px-1 py-0.5 text-[8px] text-text-muted">
                            {task.initials}
                          </span>
                          <span className="text-[8px] text-text-muted">{task.date}</span>
                        </div>
                        <span className="mt-1 inline-block text-[8px] capitalize text-text-muted">
                          {task.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPreview
