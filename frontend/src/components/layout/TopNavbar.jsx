import { Link } from 'react-router-dom'
import { Search, RefreshCw } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import UserAvatar from '../common/UserAvatar'
import Logo from '../common/Logo'

function TopNavbar({ onRefresh, refreshing = false, search, onOpenCommandPalette }) {
  const { user } = useAuth()
  const searchEnabled = Boolean(search?.onChange)

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-white/[0.08] bg-bg-primary/80 px-3 backdrop-blur-xl sm:h-16 sm:gap-3 sm:px-4 md:px-6">
      <Logo compact className="shrink-0 lg:hidden" />

      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        {searchEnabled ? (
          <div className="relative min-w-0 flex-1 md:max-w-md lg:max-w-lg">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="search"
              placeholder={search.placeholder}
              value={search.value ?? ''}
              onChange={(event) => search.onChange(event.target.value)}
              className="h-9 w-full rounded-xl border border-white/[0.1] bg-white/[0.05] pl-9 pr-3 text-sm text-text placeholder:text-text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-10 sm:pl-10 sm:pr-4"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="relative flex h-9 min-w-0 flex-1 items-center rounded-xl border border-white/[0.1] bg-white/[0.05] pl-9 pr-3 text-left text-sm text-text-muted transition-colors hover:border-white/[0.14] hover:text-text-secondary sm:h-10 sm:pl-10 sm:pr-4 md:max-w-md lg:max-w-lg"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <span className="truncate">Search…</span>
            <kbd className="ml-auto hidden rounded border border-white/[0.1] px-1.5 py-0.5 text-[10px] md:inline">
              Ctrl K
            </kbd>
          </button>
        )}

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-text-secondary transition-colors hover:bg-white/[0.08] hover:text-text disabled:opacity-50"
            aria-label="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>

          <Link
            to="/profile"
            className="shrink-0 rounded-full lg:hidden"
            title={user?.name}
            aria-label="Profile"
          >
            <UserAvatar name={user?.name} size="md" />
          </Link>
        </div>
      </div>

      <Link
        to="/profile"
        className="hidden shrink-0 rounded-full lg:flex"
        title={user?.name}
        aria-label="Profile"
      >
        <UserAvatar name={user?.name} size="md" />
      </Link>
    </header>
  )
}

export default TopNavbar
