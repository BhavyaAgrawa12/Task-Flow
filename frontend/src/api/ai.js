import { api } from './axios'

export async function suggestTask({ title, description }) {
  const { data } = await api.post('/api/ai/suggest', { title, description })
  return data.data ?? data
}
