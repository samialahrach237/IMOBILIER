import { NavLink, Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return <div className="admin-layout">
    <aside className="admin-sidebar">
      <strong>ImmoCasa Admin</strong>
      <NavLink to="/admin">Dashboard</NavLink>
      <NavLink to="/admin/properties">Biens immobiliers</NavLink>
      <NavLink to="/admin/properties/create">Ajouter un bien</NavLink>
      <NavLink to="/admin/reservations">Reservations</NavLink>
      <NavLink to="/admin/users">Utilisateurs</NavLink>
      <NavLink to="/admin/cities">Villes</NavLink>
      <NavLink to="/admin/statistics">Statistiques</NavLink>
    </aside>
    <main className="admin-main"><Outlet /></main>
  </div>
}
