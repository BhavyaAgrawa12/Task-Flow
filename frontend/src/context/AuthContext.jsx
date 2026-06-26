import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import * as authApi from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authApi.getStoredUser())
  const [loading, setLoading] = useState(true)

  const isAuthenticated = Boolean(authApi.getStoredToken())

  useEffect(() => {
    async function bootstrap() {
      if (!authApi.getStoredToken()) {
        setLoading(false)
        return
      }
      try {
        const me = await authApi.getMe()
        setUser(me)
      } catch {
        authApi.logout()
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    bootstrap()
  }, [])

  const login = useCallback(async (email, password) => {
    const { user: loggedInUser } = await authApi.login(email, password)
    setUser(loggedInUser)
    return loggedInUser
  }, [])

  const register = useCallback(async (name, email, password) => {
    const { user: registeredUser } = await authApi.register(name, email, password)
    setUser(registeredUser)
    return registeredUser
  }, [])

  const logout = useCallback(() => {
    authApi.logout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
