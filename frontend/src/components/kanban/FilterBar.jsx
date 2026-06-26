import { Search } from 'lucide-react'
import { COLUMN_CONFIG } from '../../utils/kanban'
import { cn } from '../../lib/utils'

function FilterBar({ searchQuery, onSearchChange, tasksByStatus }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative min-w-0 flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          type="search"
          placeholder="Filter Tasks"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-10 w-full rounded-xl border border-white/[0.1] bg-white/[0.05] pl-10 pr-4 text-sm text-text placeholder:text-text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {COLUMN_CONFIG.map((column) => {
          const count = tasksByStatus[column.id]?.length ?? 0
          return (
            <span
              key={column.id}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-text-secondary',
                count > 0 && 'border-primary/20 text-text',
              )}
            >
              {column.label}
              <span className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[10px] text-text-muted">
                {count}
              </span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default FilterBar
