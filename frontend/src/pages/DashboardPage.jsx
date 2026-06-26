import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDashboardStats } from '../hooks/useDashboardStats'
import { getApiErrorMessage } from '../utils/apiErrors'
import PageHeader from '../components/common/PageHeader'
import { ChartGridSkeleton } from '../components/common/skeletons'
import ActiveBoardsChart from '../components/dashboard/ActiveBoardsChart'
import TasksDueToday from '../components/dashboard/TasksDueToday'
import ProductiveTasks from '../components/dashboard/ProductiveTasks'
import RecentActivity from '../components/dashboard/RecentActivity'
import { staggerContainer, staggerItem } from '../components/motion/variants'

function DashboardPage() {
  const { registerRefresh } = useOutletContext() ?? {}
  const {
    loading,
    error,
    refresh,
    boardCount,
    taskCount,
    dueToday,
    productive,
    recentActivity,
    chartData,
  } = useDashboardStats()

  useEffect(() => {
    registerRefresh?.(refresh)
  }, [registerRefresh, refresh])

  useEffect(() => {
    if (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load dashboard'))
    }
  }, [error])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Dashboard"
          description="Overview of your boards and tasks"
        />
        <ChartGridSkeleton />
      </div>
    )
  }

  const cards = [
    <ActiveBoardsChart key="boards" data={chartData} boardCount={boardCount} />,
    <TasksDueToday key="due" tasks={dueToday} totalTasks={taskCount} />,
    <ProductiveTasks key="productive" stats={productive} />,
    <RecentActivity key="activity" activities={recentActivity} />,
  ]

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Dashboard"
        description="Overview of your boards and tasks"
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

export default DashboardPage
