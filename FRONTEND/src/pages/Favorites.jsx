import { useEffect, useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import { api } from '../services/api'

export default function Favorites() {
  const [items, setItems] = useState([])
  const load = () => api.get('/favorites').then((res) => setItems(res.data.data))
  useEffect(() => { load() }, [])
  return <section className="section"><div className="section-head"><h1>Mes favoris</h1><span>{items.length} biens</span></div>{items.length ? <div className="property-grid">{items.map((p) => <PropertyCard key={p.id} property={p} onFavorite={load} />)}</div> : <div className="empty">Aucun favori pour le moment.</div>}</section>
}
