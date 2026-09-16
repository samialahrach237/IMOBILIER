import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('immocasa_token')))

  useEffect(() => {
    if (!localStorage.getItem('immocasa_token')) return
    api.get('/user').then((res) => setUser(res.data.user)).catch(() => localStorage.removeItem('immocasa_token')).finally(() => setLoading(false))
  }, [])

  const value = useMemo(() => ({
    user,
    loading,
    isAdmin: user?.role === 'ADMIN',
    async login(payload) {
      const { data } = await api.post('/login', payload)
      localStorage.setItem('immocasa_token', data.token)
      setUser(data.user)
      return data.user
    },
    async register(payload) {
      const { data } = await api.post('/register', payload)
      localStorage.setItem('immocasa_token', data.token)
      setUser(data.user)
      return data.user
    },
    async logout() {
      await api.post('/logout').catch(() => {})
      localStorage.removeItem('immocasa_token')
      setUser(null)
    },
  }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
