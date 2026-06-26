import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const BASE = 'TaskFlow'

const ROUTE_TITLES = {
  '/': 'Simplify Your Workflow',
  '/login': 'Login',
  '/register': 'Register',
  '/dashboard': 'Dashboard',
  '/boards': 'Boards',
  '/tasks': 'Tasks',
  '/analytics': 'Analytics',
  '/profile': 'Profile',
}

function resolveTitle(pathname) {
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname]
  if (pathname.startsWith('/boards/')) return 'Board'
  return 'Page Not Found'
}

export function useDocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = resolveTitle(pathname)
    document.title = pathname === '/' ? `${BASE} — ${page}` : `${page} · ${BASE}`
  }, [pathname])
}
