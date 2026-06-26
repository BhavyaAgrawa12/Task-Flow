import { motion } from 'framer-motion'
import { fadeUp, fadeUpTransition } from './variants'

function MotionReveal({ children, className, delay = 0, as = 'div' }) {
  const Component = motion[as] ?? motion.div

  return (
    <Component
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={fadeUpTransition(delay)}
      className={className}
    >
      {children}
    </Component>
  )
}

export default MotionReveal
