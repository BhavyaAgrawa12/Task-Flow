import { Link } from 'react-router-dom'
import { cn } from '../../utils/formatters'

function Logo({ className = '', compact = false, iconSize = 'md' }) {
  const sizeClass =
    iconSize === 'lg' ? 'h-11 w-11' : iconSize === 'sm' ? 'h-8 w-8' : 'h-9 w-9'

  return (
    <Link to="/dashboard" className={cn('group flex items-center gap-2.5', className)}>
      <img
        src="/logo.png"
        alt="TaskFlow"
        className={cn('shrink-0 object-contain transition-transform group-hover:scale-105', sizeClass)}
      />
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
