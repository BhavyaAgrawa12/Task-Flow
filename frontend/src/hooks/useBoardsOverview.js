import { useState, useEffect, useCallback, useMemo } from 'react'
import { getBoards, createBoard, deleteBoard } from '../api/boards'
import { getTasks } from '../api/tasks'
import { enrichBoardsWithStats, filterBoards } from '../utils/boardStats'

export function useBoardsOverview() {
  const [boards, setBoards] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

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

  const boardsWithStats = useMemo(
    () => enrichBoardsWithStats(boards, tasks),
    [boards, tasks],
  )

  const filteredBoards = useMemo(
    () => filterBoards(boardsWithStats, searchQuery),
    [boardsWithStats, searchQuery],
  )

  const addBoard = useCallback(
    async ({ title, description }) => {
      const board = await createBoard({ title, description })
      await fetchData()
      return board
    },
    [fetchData],
  )

  const removeBoard = useCallback(
    async (id) => {
      await deleteBoard(id)
      await fetchData()
    },
    [fetchData],
  )

  return {
    boards: filteredBoards,
    loading,
    error,
    refresh: fetchData,
    searchQuery,
    setSearchQuery,
    addBoard,
    removeBoard,
  }
}
