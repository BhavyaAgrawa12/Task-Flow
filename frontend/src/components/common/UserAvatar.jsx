import { cn, getInitials } from '../../utils/formatters'

const sizeClasses = {
  sm: 'h-8 w-8 text-[10px]',
  md: 'h-9 w-9 text-[11px]',
  lg: 'h-10 w-10 text-xs',
  xl: 'h-20 w-20 text-lg',
}

function UserAvatar({ name = 'User', size = 'md', className }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-gradient-to-br from-primary to-purple font-semibold tracking-wide text-white shadow-inner',
        sizeClasses[size],
        className,
      )}
      aria-hidden
    >
      {getInitials(name)}
    </span>
  )
}

export default UserAvatar
