import { Link } from 'react-router-dom'
import DashboardPreview from './DashboardPreview'
import MotionReveal from '../motion/MotionReveal'

function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 lg:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[280px] w-[280px] rounded-full bg-primary/10 blur-3xl sm:h-[400px] sm:w-[400px]" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-purple/5 blur-3xl sm:h-64 sm:w-64" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          <MotionReveal delay={0.05}>
            <div className="max-w-xl text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                Simplify Your Workflow
              </h1>

              <p className="mt-5 text-base leading-relaxed text-text-secondary sm:mt-6 sm:text-lg">
                Organize tasks, track progress, and collaborate with your team using
                intelligent Kanban boards — all in one place.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-8 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-primary/40 active:scale-[0.98] sm:h-12"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.05] px-8 text-sm font-semibold text-text transition-all hover:bg-white/[0.08] active:scale-[0.98] sm:h-12"
                >
                  Login
                </Link>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15} className="relative lg:pl-4">
            <DashboardPreview />
          </MotionReveal>
        </div>
      </div>
    </section>
  )
}

export default Hero
