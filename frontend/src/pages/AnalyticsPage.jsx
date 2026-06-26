import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAnalyticsStats } from '../hooks/useAnalyticsStats'
import { getApiErrorMessage } from '../utils/apiErrors'
import PageHeader from '../components/common/PageHeader'
import { ChartGridSkeleton } from '../components/common/skeletons'
import TasksByStatusChart from '../components/analytics/TasksByStatusChart'
import CompletedOverTimeChart from '../components/analytics/CompletedOverTimeChart'
import OverdueCountChart from '../components/analytics/OverdueCountChart'
import ProductivityGauge from '../components/analytics/ProductivityGauge'
import { staggerContainer, staggerItem } from '../components/motion/variants'

function AnalyticsPage() {
  const { registerRefresh } = useOutletContext() ?? {}
  const {
    loading,
    error,
    refresh,
    taskCount,
    statusData,
    completedOverTime,
    overdueByDay,
    productivityScore,
  } = useAnalyticsStats()

  useEffect(() => {
    registerRefresh?.(refresh)
  }, [registerRefresh, refresh])

  useEffect(() => {
    if (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load analytics'))
    }
  }, [error])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Analytics" description="Loading insights…" />
        <ChartGridSkeleton />
      </div>
    )
  }

  const cards = [
    <TasksByStatusChart key="status" data={statusData} />,
    <CompletedOverTimeChart key="completed" data={completedOverTime} />,
    <OverdueCountChart key="overdue" data={overdueByDay} />,
    <ProductivityGauge key="score" score={productivityScore} />,
  ]

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Analytics"
        description={`Insights from ${taskCount} ${taskCount === 1 ? 'task' : 'tasks'} across your boards`}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-2 md:gap-5 xl:min-h-[520px]"
      >
        {cards.map((card) => (
          <motion.div key={card.key} variants={staggerItem} className="min-h-[240px] sm:min-h-[280px]">
            {card}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default AnalyticsPage
