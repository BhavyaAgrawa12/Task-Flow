import { motion } from 'framer-motion'
import AuthIllustration from '../components/auth/AuthIllustration'
import { fadeUp, fadeUpTransition } from '../components/motion/variants'

function AuthLayout({ title, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary px-3 py-8 sm:px-6 sm:py-10">
      <motion.div
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={fadeUpTransition(0)}
        className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/[0.1] bg-bg-secondary/40 shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] sm:rounded-3xl"
      >
        <div className="grid md:grid-cols-2">
          <div className="hidden md:block">
            <AuthIllustration />
          </div>

          <div className="flex flex-col justify-center bg-white/[0.03] p-6 backdrop-blur-md sm:p-8 md:p-10 lg:p-12">
            <h1 className="mb-6 text-center text-xl font-bold text-text sm:mb-8 sm:text-2xl">{title}</h1>
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthLayout
