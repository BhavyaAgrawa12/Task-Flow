import { useState, useEffect, useCallback } from 'react'
import { getTasks } from '../api/tasks'
import { getRecentActivity } from '../utils/stats'

export function useProfileData() {
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const tasks = await getTasks()
      setRecentActivity(getRecentActivity(tasks, 5))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { recentActivity, loading, error, refresh: fetchData }
}
