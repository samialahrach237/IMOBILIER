import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

export default function Cities() {
  const [cities, setCities] = useState([])
  useEffect(() => { api.get('/cities').then((res) => setCities(res.data.data)) }, [])
  return <section className="section"><h1>Villes</h1><div className="city-grid">{cities.map((city) => <Link to={`/properties?city=${city.name}`} className="city-tile" key={city.id}><img src={city.image_url} alt="" /><strong>{city.name}</strong><span>{city.districts.map((d) => d.name).join(', ')}</span></Link>)}</div></section>
}
