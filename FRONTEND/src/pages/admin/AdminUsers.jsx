import { useEffect, useState } from 'react'
import { api } from '../../services/api'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  useEffect(() => { api.get('/admin/users').then((res) => setUsers(res.data.data)) }, [])
  return <section><h1>Utilisateurs</h1><div className="table-wrap"><table><thead><tr><th>Nom</th><th>Email</th><th>Role</th><th>Ville</th></tr></thead><tbody>{users.map((u) => <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.city}</td></tr>)}</tbody></table></div></section>
}
