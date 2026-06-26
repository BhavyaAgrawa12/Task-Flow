import { useState, useEffect, useCallback, useMemo } from 'react'
import { getBoards } from '../api/boards'
import { getTasks, updateTask, deleteTask } from '../api/tasks'

export function useTasksList() {
  const [tasks, setTasks] = useState([])
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const boardMap = useMemo(
    () => Object.fromEntries(boards.map((board) => [board.id, board])),
    [boards],
  )

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = { sortBy: 'createdAt', order: 'desc' }
      const trimmed = searchQuery.trim()
      if (trimmed) params.search = trimmed
      if (statusFilter !== 'all') params.status = statusFilter
      if (priorityFilter !== 'all') params.priority = priorityFilter

      const [tasksData, boardsData] = await Promise.all([
        getTasks(params),
        getBoards(),
      ])
      setTasks(tasksData)
      setBoards(boardsData)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, statusFilter, priorityFilter])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const editTask = useCallback(
    async (id, updates) => {
      const task = tasks.find((item) => item.id === id)
      const updated = await updateTask(id, { ...updates, board: task?.board })
      setTasks((prev) => prev.map((item) => (item.id === id ? updated : item)))
      return updated
    },
    [tasks],
  )

  const removeTask = useCallback(async (id) => {
    await deleteTask(id)
    setTasks((prev) => prev.filter((item) => item.id !== id))
  }, [])

  return {
    tasks,
    boards,
    boardMap,
    loading,
    error,
    refresh: fetchData,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    editTask,
    removeTask,
  }
}
