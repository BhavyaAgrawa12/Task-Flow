import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  LayoutDashboard,
  Kanban,
  ListTodo,
  BarChart3,
  User,
} from 'lucide-react'
import { cn } from '../../utils/formatters'

const navItems = [
  
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Boards', href: '/boards', icon: Kanban },
  { label: 'Tasks', href: '/tasks', icon: ListTodo },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Profile', href: '/profile', icon: User },
  { label: "Home", href: "/", icon: Home }
]

function MobileBottomNav() {
  const { pathname } = useLocation()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-bg-secondary/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 py-2.5 sm:max-w-none sm:px-4">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active =
  pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              to={href}
              className={cn(
                'flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-2 text-[10px] font-medium transition-colors sm:gap-1 sm:px-2 sm:text-xs',
                active ? 'text-primary' : 'text-text-muted hover:text-text-secondary',
              )}
            >
              <Icon className={cn('h-5 w-5 shrink-0', active && 'text-primary')} />
              <span className="truncate">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileBottomNav
