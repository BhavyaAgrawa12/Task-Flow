import { motion } from 'framer-motion'
import { pageTransition, pageTransitionConfig } from './variants'

function PageTransition({ children, className }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransitionConfig}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
