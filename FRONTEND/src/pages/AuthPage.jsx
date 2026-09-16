import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: mode === 'admin' ? 'admin@immocasa.test' : '', phone: '', city: '', password: mode === 'admin' ? 'password123' : '', password_confirmation: '' })
  const [error, setError] = useState('')
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  async function submit(e) {
    e.preventDefault(); setError('')
    try {
      const user = isRegister ? await register(form) : await login(form)
      navigate(user.role === 'ADMIN' ? '/admin' : '/dashboard')
    } catch (err) { setError(err.response?.data?.message || 'Erreur de connexion') }
  }
  return <section className="auth-page"><form className="auth-card" onSubmit={submit}>
    <h1>{isRegister ? 'Inscription' : mode === 'admin' ? 'Connexion administrateur' : 'Connexion'}</h1>
    {error && <p className="error">{error}</p>}
    {isRegister && <input name="name" value={form.name} onChange={update} placeholder="Nom complet" required />}
    <input name="email" value={form.email} onChange={update} placeholder="Email" type="email" required />
    {isRegister && <><input name="phone" value={form.phone} onChange={update} placeholder="Telephone" /><input name="city" value={form.city} onChange={update} placeholder="Ville" /></>}
    <input name="password" value={form.password} onChange={update} placeholder="Mot de passe" type="password" required />
    {isRegister && <input name="password_confirmation" value={form.password_confirmation} onChange={update} placeholder="Confirmer" type="password" required />}
    <button className="btn primary full">{isRegister ? 'Creer mon compte' : 'Se connecter'}</button>
    {!isRegister && <Link to="/register">Creer un compte</Link>}
  </form></section>
}
