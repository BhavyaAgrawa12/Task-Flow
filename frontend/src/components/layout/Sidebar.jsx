import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Kanban,
  ListTodo,
  BarChart3,
  User,
} from 'lucide-react'
import Logo from '../common/Logo'
import { cn } from '../../utils/formatters'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Boards', href: '/boards', icon: Kanban },
  { label: 'Tasks', href: '/tasks', icon: ListTodo },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Profile', href: '/profile', icon: User },
]

function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="hidden w-[4.5rem] shrink-0 flex-col border-r border-white/[0.08] bg-bg-secondary/40 backdrop-blur-md lg:flex xl:w-60">
      <div className="border-b border-white/[0.08] px-3 py-5 xl:px-5">
        <Logo compact className="justify-center xl:justify-start" />
      </div>

      <nav className="flex-1 space-y-1 p-2 xl:p-4">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href || (href !== '/dashboard' && pathname.startsWith(href))

          return (
            <Link
              key={href}
              to={href}
              title={label}
              className={cn(
                'flex items-center justify-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium transition-colors xl:justify-start xl:px-3',
                active
                  ? 'bg-white/10 text-text'
                  : 'text-text-secondary hover:bg-white/[0.05] hover:text-text',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden truncate xl:inline">{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
