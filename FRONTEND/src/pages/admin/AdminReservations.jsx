import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { label } from '../../utils/format'

export default function AdminReservations() {
  const [items, setItems] = useState([])
  const load = () => api.get('/admin/reservations').then((res) => setItems(res.data.data))
  useEffect(() => { load() }, [])
  async function status(id, value) { await api.patch(`/admin/reservations/${id}/status`, { status: value }); load() }
  return <section><h1>Reservations</h1><div className="table-wrap"><table><thead><tr><th>Utilisateur</th><th>Bien</th><th>Type</th><th>Date</th><th>Statut</th><th>Actions</th></tr></thead><tbody>{items.map((r) => <tr key={r.id}><td>{r.user?.name}</td><td>{r.property?.title}</td><td>{label(r.request_type)}</td><td>{r.requested_date}</td><td>{label(r.status)}</td><td><button onClick={() => status(r.id, 'ACCEPTED')}>Accepter</button><button onClick={() => status(r.id, 'REFUSED')}>Refuser</button><button onClick={() => status(r.id, 'CANCELLED')}>Annuler</button></td></tr>)}</tbody></table></div></section>
}
