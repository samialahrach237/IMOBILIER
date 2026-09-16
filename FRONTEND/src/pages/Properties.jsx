import { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import PropertyFilters from '../components/PropertyFilters'
import PropertyMap from '../components/PropertyMap'
import { api } from '../services/api'

export default function Properties({ forcedType }) {
  const location = useLocation()
  const params = useParams()
  const initial = useMemo(() => Object.fromEntries(new URLSearchParams(location.search)), [location.search])
  const defaultFilters = useMemo(() => ({ ...initial, transaction_type: forcedType || initial.transaction_type || '', city: params.city || initial.city || '' }), [forcedType, initial, params.city])
  const [filters, setFilters] = useState(defaultFilters)
  const [properties, setProperties] = useState([])
  const [meta, setMeta] = useState(null)
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const load = () => {
    setLoading(true)
    api.get('/properties', { params: filters }).then((res) => { setProperties(res.data.data); setMeta(res.data.meta) }).finally(() => setLoading(false))
  }
  useEffect(load, [filters])
  useEffect(() => { setFilters(defaultFilters) }, [defaultFilters])
  useEffect(() => { api.get('/cities').then((res) => setCities(res.data.data)) }, [])
  return <section className="section listing-page">
    <div className="section-head"><h1>Biens immobiliers</h1><span>{meta?.total || 0} resultats</span></div>
    <div className="listing-layout">
      <PropertyFilters filters={filters} setFilters={setFilters} cities={cities} />
      <div>
        {loading ? <div className="empty">Chargement des biens...</div> : properties.length ? <div className="property-grid">{properties.map((p) => <PropertyCard key={p.id} property={p} onFavorite={load} />)}</div> : <div className="empty">Aucun resultat pour ces filtres.</div>}
        <PropertyMap properties={properties} />
      </div>
    </div>
  </section>
}
