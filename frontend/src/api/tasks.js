import { api } from './axios'
import { normalizeEstimatedEffort } from '../utils/effort'

function normalizeTask(task) {
  const boardId =
  task.board?._id ||
  task.board?.id ||
  task.board ||
  null
  return {
    id: task._id || task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
    estimatedEffort: task.estimatedEffort,
    board: boardId,
    owner: task.owner,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  }
}

/** Backend rejects empty estimatedEffort and bare YYYY-MM-DD dates — normalize before send. */
function sanitizeTaskPayload(task) {
  const payload = { ...task }

  if ('estimatedEffort' in payload) {
    const normalized = normalizeEstimatedEffort(payload.estimatedEffort)
    if (normalized) {
      payload.estimatedEffort = normalized
    } else {
      delete payload.estimatedEffort
    }
  }

  if ('dueDate' in payload) {
    if (!payload.dueDate) {
      payload.dueDate = null
    } else if (
      typeof payload.dueDate === 'string' &&
      /^\d{4}-\d{2}-\d{2}$/.test(payload.dueDate)
    ) {
      payload.dueDate = new Date(`${payload.dueDate}T00:00:00`).toISOString()
    }
  }

  return payload
}

export async function getTasks(params = {}) {
  const { data } = await api.get('/api/tasks', { params })
  const tasks = data.data ?? data
  return Array.isArray(tasks) ? tasks.map(normalizeTask) : []
}

export async function createTask(task) {
  const { data } = await api.post('/api/tasks', sanitizeTaskPayload(task))
  const created = data.data ?? data
  return normalizeTask(created)
}

export async function updateTask(id, updates) {
  const { data } = await api.put(`/api/tasks/${id}`, sanitizeTaskPayload(updates))
  const updated = data.data ?? data
  return normalizeTask(updated)
}

export async function deleteTask(id) {
  await api.delete(`/api/tasks/${id}`)
}

export async function updateTaskStatus(id, status) {
  try {
    const { data } = await api.patch(`/api/tasks/${id}/status`, { status })
    const updated = data.data ?? data
    return normalizeTask(updated)
  } catch {
    return updateTask(id, { status })
  }
}
