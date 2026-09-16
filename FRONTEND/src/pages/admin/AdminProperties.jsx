import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../services/api'
import { label, money } from '../../utils/format'

export default function AdminProperties() {
  const [items, setItems] = useState([])
  const load = () => api.get('/properties?per_page=100').then((res) => setItems(res.data.data))
  useEffect(() => { load() }, [])
  async function remove(id) { if (confirm('Supprimer ce bien ?')) { await api.delete(`/admin/properties/${id}`); load() } }
  return <section><div className="section-head"><h1>Gestion des biens</h1><Link className="btn primary" to="/admin/properties/create">Ajouter</Link></div><div className="table-wrap"><table><thead><tr><th>Titre</th><th>Ville</th><th>Prix</th><th>Type</th><th>Status</th><th></th></tr></thead><tbody>{items.map((p) => <tr key={p.id}><td>{p.title}</td><td>{p.city}</td><td>{money(p.price, p.transaction_type)}</td><td>{label(p.transaction_type)}</td><td>{label(p.status)}</td><td><Link to={`/admin/properties/${p.id}/edit`}>Modifier</Link> <button onClick={() => remove(p.id)}>Supprimer</button></td></tr>)}</tbody></table></div></section>
}
