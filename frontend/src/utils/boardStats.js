import { TASK_STATUS } from './constants'

export function getBoardProgress(boardId, tasks) {
  const boardTasks = tasks.filter((task) => task.board === boardId)
  const total = boardTasks.length
  const done = boardTasks.filter((task) => task.status === TASK_STATUS.DONE).length

  return {
    taskCount: total,
    doneCount: done,
    progressPercent: total ? Math.round((done / total) * 100) : 0,
  }
}

export function enrichBoardsWithStats(boards, tasks) {
  return boards.map((board) => ({
    ...board,
    ...getBoardProgress(board.id, tasks),
  }))
}

export function filterBoards(boards, query) {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return boards

  return boards.filter(
    (board) =>
      board.title.toLowerCase().includes(trimmed) ||
      board.description?.toLowerCase().includes(trimmed),
  )
}
