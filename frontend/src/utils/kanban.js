import { TASK_STATUS, TASK_STATUS_LABELS } from './constants'

export const KANBAN_COLUMNS = [
  TASK_STATUS.TODO,
  TASK_STATUS.IN_PROGRESS,
  TASK_STATUS.DONE,
]

export const COLUMN_CONFIG = KANBAN_COLUMNS.map((status) => ({
  id: status,
  label: TASK_STATUS_LABELS[status],
}))

export function groupTasksByStatus(tasks) {
  const grouped = Object.fromEntries(KANBAN_COLUMNS.map((status) => [status, []]))

  for (const task of tasks) {
    const status = KANBAN_COLUMNS.includes(task.status) ? task.status : TASK_STATUS.TODO
    grouped[status].push(task)
  }

  return grouped
}

export function filterTasks(tasks, query) {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return tasks

  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(trimmed) ||
      task.description?.toLowerCase().includes(trimmed),
  )
}
