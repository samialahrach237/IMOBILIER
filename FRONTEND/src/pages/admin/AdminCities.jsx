import { useEffect, useState } from 'react'
import { api } from '../../services/api'

export default function AdminCities() {
  const [cities, setCities] = useState([])
  useEffect(() => { api.get('/admin/cities').then((res) => setCities(res.data.data)) }, [])
  return <section><h1>Villes et quartiers</h1><div className="city-grid">{cities.map((city) => <div className="city-tile plain" key={city.id}><strong>{city.name}</strong><span>{city.districts.map((d) => d.name).join(', ')}</span></div>)}</div></section>
}
