import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import Logo from '../components/common/Logo'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { fadeUp, fadeUpTransition } from '../components/motion/variants'

function NotFoundPage() {
  useDocumentTitle()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-4 py-10">
      <motion.div
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={fadeUpTransition(0)}
        className="mb-8"
      >
        <Logo />
      </motion.div>

      <motion.div
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={fadeUpTransition(0.1)}
        className="glass-card w-full max-w-md p-6 text-center sm:p-8"
      >
        <p className="text-5xl font-bold text-text sm:text-6xl">404</p>
        <h1 className="mt-4 text-lg font-bold text-text sm:text-xl">Page not found</h1>
        <p className="mt-2 text-sm text-text-secondary">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/dashboard"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            <Home className="h-4 w-4" />
            Go to dashboard
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 text-sm font-semibold text-text-secondary transition-colors hover:bg-white/[0.08] hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage
