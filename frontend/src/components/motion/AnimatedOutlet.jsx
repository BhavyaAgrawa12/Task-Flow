import { AnimatePresence } from 'framer-motion'
import { useLocation, Outlet } from 'react-router-dom'
import PageTransition from './PageTransition'

function AnimatedOutlet({ context }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Outlet context={context} />
      </PageTransition>
    </AnimatePresence>
  )
}

export default AnimatedOutlet
