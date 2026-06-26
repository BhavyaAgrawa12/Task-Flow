import { Loader2 } from 'lucide-react'
import Logo from './Logo'

function LoadingSpinner({ className = '', size = 'default' }) {
  const isCompact = size === 'compact'

  if (isCompact) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading" />
      </div>
    )
  }

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center gap-4 bg-bg-primary ${className}`}
    >
      <Logo compact className="pointer-events-none opacity-80" />
      <Loader2 className="h-7 w-7 animate-spin text-primary" aria-label="Loading" />
    </div>
  )
}

export default LoadingSpinner
