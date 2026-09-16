import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FiHeart, FiMenu, FiUser, FiX } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const links = [
  ['/', 'Accueil'], ['/properties', 'Biens'], ['/sale', 'Vente'], ['/rent', 'Location'], ['/cities', 'Villes'], ['/about', 'A propos'], ['/contact', 'Contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const nav = links.map(([to, text]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{text}</NavLink>)

  return <header className="site-header">
    <Link to="/" className="brand"><span>IC</span><strong>ImmoCasa Maroc</strong></Link>
    <nav className="desktop-nav">{nav}</nav>
    <div className="nav-actions">
      <Link className="icon-btn" to="/favorites" title="Favoris"><FiHeart /></Link>
      {user ? <button className="btn ghost" onClick={() => isAdmin ? navigate('/admin') : navigate('/dashboard')}><FiUser />{user.name.split(' ')[0]}</button> : <Link className="btn primary" to="/login">Connexion</Link>}
      {user && <button className="btn subtle" onClick={logout}>Sortir</button>}
      <button className="icon-btn mobile-only" onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button>
    </div>
    {open && <nav className="mobile-nav">{nav}</nav>}
  </header>
}
