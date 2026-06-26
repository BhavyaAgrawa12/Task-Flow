import { TASK_STATUS } from './constants'

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function getTasksByStatusData(tasks) {
  const todo = tasks.filter((t) => t.status === TASK_STATUS.TODO).length
  const inProgress = tasks.filter((t) => t.status === TASK_STATUS.IN_PROGRESS).length
  const done = tasks.filter((t) => t.status === TASK_STATUS.DONE).length

  return [
    { name: 'To Do', value: todo, color: '#3b82f6' },
    { name: 'In Progress', value: inProgress, color: '#f59e0b' },
    { name: 'Completed', value: done, color: '#22c55e' },
  ].filter((item) => item.value > 0)
}

export function getCompletedOverTimeData(tasks, days = 7) {
  const data = []

  for (let i = days - 1; i >= 0; i--) {
    const date = startOfDay(new Date())
    date.setDate(date.getDate() - i)
    const next = new Date(date)
    next.setDate(next.getDate() + 1)

    const count = tasks.filter((task) => {
      if (task.status !== TASK_STATUS.DONE) return false
      const updated = new Date(task.updatedAt)
      return updated >= date && updated < next
    }).length

    data.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      completed: count,
    })
  }

  return data
}

export function getOverdueCountData(tasks, days = 7) {
  const data = []

  for (let i = days - 1; i >= 0; i--) {
    const date = startOfDay(new Date())
    date.setDate(date.getDate() - i)
    const next = new Date(date)
    next.setDate(next.getDate() + 1)

    const count = tasks.filter((task) => {
      if (!task.dueDate || task.status === TASK_STATUS.DONE) return false
      const due = startOfDay(new Date(task.dueDate))
      return due >= date && due < next
    }).length

    data.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      overdue: count,
    })
  }

  return data
}

export function getProductivityScore(tasks) {
  if (!tasks.length) return 0

  const done = tasks.filter((t) => t.status === TASK_STATUS.DONE).length
  const today = startOfDay(new Date())
  const overdue = tasks.filter((task) => {
    if (!task.dueDate || task.status === TASK_STATUS.DONE) return false
    return startOfDay(new Date(task.dueDate)) < today
  }).length

  const completionRate = (done / tasks.length) * 100
  const overduePenalty = (overdue / tasks.length) * 25

  return Math.round(Math.max(0, Math.min(100, completionRate - overduePenalty)))
}

export function computeAnalyticsStats(tasks) {
  return {
    statusData: getTasksByStatusData(tasks),
    completedOverTime: getCompletedOverTimeData(tasks),
    overdueByDay: getOverdueCountData(tasks),
    productivityScore: getProductivityScore(tasks),
    taskCount: tasks.length,
  }
}
