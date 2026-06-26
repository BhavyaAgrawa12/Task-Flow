import { api, TOKEN_KEY } from './axios'

function normalizeUser(user) {
  if (!user) return null
  return {
    id: user.id || user._id,
    name: user.name,
    email: user.email,
  }
}

export async function login(email, password) {
  const { data } = await api.post('/api/auth/login', { email, password })
  const payload = data.data ?? data
  localStorage.setItem(TOKEN_KEY, payload.token)
  const user = normalizeUser(payload.user)
  localStorage.setItem('taskflow_user', JSON.stringify(user))
  return { token: payload.token, user }
}

export async function register(name, email, password) {
  const { data } = await api.post('/api/auth/register', { name, email, password })
  const payload = data.data ?? data
  localStorage.setItem(TOKEN_KEY, payload.token)
  const user = normalizeUser(payload.user)
  localStorage.setItem('taskflow_user', JSON.stringify(user))
  return { token: payload.token, user }
}

export async function getMe() {
  const { data } = await api.get('/api/auth/me')
  const payload = data.data ?? data
  return normalizeUser(payload)
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem('taskflow_user')
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem('taskflow_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY)
}
