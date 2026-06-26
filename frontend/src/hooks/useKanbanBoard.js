import { useState, useEffect, useCallback, useMemo } from 'react'
import { getBoard } from '../api/boards'
import { getTasks, createTask, updateTask, updateTaskStatus, deleteTask } from '../api/tasks'
import { filterTasks, groupTasksByStatus } from '../utils/kanban'

export function useKanbanBoard(boardId) {
  const [board, setBoard] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchData = useCallback(async () => {
    if (!boardId) return

    setLoading(true)
    setError(null)
    try {
      const [boardData, tasksData] = await Promise.all([
        getBoard(boardId),
        getTasks({ board: boardId }),
      ])
      setBoard(boardData)
      setTasks(tasksData)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [boardId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const filteredTasks = useMemo(
    () => filterTasks(tasks, searchQuery),
    [tasks, searchQuery],
  )

  const tasksByStatus = useMemo(
    () => groupTasksByStatus(filteredTasks),
    [filteredTasks],
  )

  const addTask = useCallback(
    async (payload) => {
      const created = await createTask({ ...payload, board: boardId })
      setTasks((prev) => [...prev, created])
      return created
    },
    [boardId],
  )

  const removeTask = useCallback(async (id) => {
    await deleteTask(id)
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  const editTask = useCallback(
    async (id, updates) => {
      const updated = await updateTask(id, { ...updates, board: boardId })
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)))
      return updated
    },
    [boardId],
  )

  const persistTaskStatus = useCallback(async (taskId, newStatus) => {
    await updateTaskStatus(taskId, newStatus)
  }, [])

  return {
    board,
    tasks,
    setTasks,
    tasksByStatus,
    loading,
    error,
    refresh: fetchData,
    searchQuery,
    setSearchQuery,
    addTask,
    removeTask,
    editTask,
    persistTaskStatus,
  }
}
