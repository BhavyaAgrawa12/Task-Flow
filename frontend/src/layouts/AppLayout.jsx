import { useRef, useState, useEffect } from 'react'
import Sidebar from '../components/layout/Sidebar'
import TopNavbar from '../components/layout/TopNavbar'
import MobileBottomNav from '../components/layout/MobileBottomNav'
import CommandPalette from '../components/search/CommandPalette'
import AnimatedOutlet from '../components/motion/AnimatedOutlet'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function AppLayout() {
  const refreshRef = useRef(null)
  const [refreshing, setRefreshing] = useState(false)
  const [searchConfig, setSearchConfig] = useState(null)
  const [paletteOpen, setPaletteOpen] = useState(false)

  useDocumentTitle()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleRefresh = async () => {
    if (!refreshRef.current || refreshing) return
    setRefreshing(true)
    try {
      await refreshRef.current()
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavbar
          onRefresh={handleRefresh}
          refreshing={refreshing}
          search={searchConfig}
          onOpenCommandPalette={() => setPaletteOpen(true)}
        />
        <main className="flex-1 p-3 pb-24 sm:p-4 sm:pb-24 md:p-6 lg:pb-6">
          <AnimatedOutlet
            context={{
              registerRefresh: (fn) => {
                refreshRef.current = fn
              },
              registerSearch: setSearchConfig,
            }}
          />
        </main>
      </div>
      <MobileBottomNav />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  )
}

export default AppLayout
