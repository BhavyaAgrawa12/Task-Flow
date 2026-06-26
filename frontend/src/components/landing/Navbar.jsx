import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from '../common/Logo'

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-bg-primary/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Logo />

        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            to="/login"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-bg-primary transition-all hover:bg-white/90 active:scale-[0.98] sm:px-5"
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
