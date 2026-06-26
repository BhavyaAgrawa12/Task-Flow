import { useState, useEffect, useCallback, useMemo } from 'react'
import { getBoards } from '../api/boards'
import { getTasks } from '../api/tasks'
import { computeAnalyticsStats } from '../utils/analytics'

export function useAnalyticsStats() {
  const [boards, setBoards] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [boardsData, tasksData] = await Promise.all([getBoards(), getTasks()])
      setBoards(boardsData)
      setTasks(tasksData)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const stats = useMemo(() => computeAnalyticsStats(tasks), [tasks])

  return {
    boards,
    tasks,
    loading,
    error,
    refresh: fetchData,
    ...stats,
  }
}
