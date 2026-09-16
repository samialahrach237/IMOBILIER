import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { label } from '../utils/format'

export default function Dashboard() {
  const [items, setItems] = useState([])
  const load = () => api.get('/reservations').then((res) => setItems(res.data.data))
  useEffect(() => { load() }, [])
  async function cancel(id) { await api.delete(`/reservations/${id}`); load() }
  return <section className="section"><h1>Mon dashboard</h1><div className="table-wrap"><table><thead><tr><th>Appartement</th><th>Date</th><th>Type</th><th>Status</th><th></th></tr></thead><tbody>{items.map((r) => <tr key={r.id}><td>{r.property?.title}</td><td>{r.requested_date} {r.requested_time}</td><td>{label(r.request_type)}</td><td>{label(r.status)}</td><td>{r.status === 'PENDING' && <button className="btn subtle" onClick={() => cancel(r.id)}>Annuler</button>}</td></tr>)}</tbody></table></div></section>
}
