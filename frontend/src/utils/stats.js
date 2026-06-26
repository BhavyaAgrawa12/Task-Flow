import { TASK_STATUS } from './constants'

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function getTasksDueToday(tasks) {
  const today = startOfDay(new Date())
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return tasks.filter((task) => {
    if (!task.dueDate) return false
    const due = new Date(task.dueDate)
    return due >= today && due < tomorrow
  })
}

export function getRecentActivity(tasks, limit = 5) {
  return [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, limit)
    .map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
      timestamp: task.updatedAt,
    }))
}

export function getProductiveStats(tasks) {
  const done = tasks.filter((t) => t.status === TASK_STATUS.DONE).length
  const inProgress = tasks.filter((t) => t.status === TASK_STATUS.IN_PROGRESS).length
  const todo = tasks.filter((t) => t.status === TASK_STATUS.TODO).length
  const total = tasks.length

  return {
    done,
    inProgress,
    todo,
    total,
    completionRate: total ? Math.round((done / total) * 100) : 0,
  }
}

export function getBoardActivityChartData(tasks, days = 7) {
  const data = []

  for (let i = days - 1; i >= 0; i--) {
    const date = startOfDay(new Date())
    date.setDate(date.getDate() - i)
    const next = new Date(date)
    next.setDate(next.getDate() + 1)

    const count = tasks.filter((task) => {
      const created = new Date(task.createdAt)
      return created >= date && created < next
    }).length

    data.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      tasks: count,
    })
  }

  return data
}

export function computeDashboardStats(boards, tasks) {
  return {
    boardCount: boards.length,
    taskCount: tasks.length,
    dueToday: getTasksDueToday(tasks),
    productive: getProductiveStats(tasks),
    recentActivity: getRecentActivity(tasks),
    chartData: getBoardActivityChartData(tasks),
  }
}
