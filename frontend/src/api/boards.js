import { api } from './axios'

function normalizeBoard(board) {
  return {
    id: board._id || board.id,
    title: board.title,
    description: board.description,
    owner: board.owner,
    createdAt: board.createdAt,
    updatedAt: board.updatedAt,
  }
}

export async function getBoards() {
  const { data } = await api.get('/api/boards')
  const boards = data.data ?? data
  return Array.isArray(boards) ? boards.map(normalizeBoard) : []
}

export async function getBoard(id) {
  const { data } = await api.get(`/api/boards/${id}`)
  const board = data.data ?? data
  return normalizeBoard(board)
}

export async function createBoard({ title, description }) {
  const { data } = await api.post('/api/boards', { title, description })
  const board = data.data ?? data
  return normalizeBoard(board)
}

export async function updateBoard(id, updates) {
  const { data } = await api.put(`/api/boards/${id}`, updates)
  const board = data.data ?? data
  return normalizeBoard(board)
}

export async function deleteBoard(id) {
  await api.delete(`/api/boards/${id}`)
}
