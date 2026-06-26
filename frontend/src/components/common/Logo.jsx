import { Link } from 'react-router-dom'
import { CheckSquare } from 'lucide-react'
import { cn } from '../../utils/formatters'

function Logo({ className = '', compact = false }) {
  return (
    <Link to="/" className={cn('group flex items-center gap-2.5', className)}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 transition-all group-hover:bg-white/15">
        <CheckSquare className="h-5 w-5 text-white" strokeWidth={2.5} />
      </div>
      <span
        className={cn(
          'text-lg font-semibold tracking-tight text-text',
          compact && 'hidden xl:inline',
        )}
      >
        TaskFlow
      </span>
    </Link>
  )
}

export default Logo
