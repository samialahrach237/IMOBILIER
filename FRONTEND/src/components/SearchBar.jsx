import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ compact = false }) {
  const [form, setForm] = useState({ transaction_type: 'SALE', city: 'Meknes', property_type: '', min_price: '', max_price: '', bedrooms: '' })
  const navigate = useNavigate()
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(Object.entries(form).filter(([, v]) => v))
    navigate(`/properties?${params}`)
  }

  return <form className={`search-bar ${compact ? 'compact' : ''}`} onSubmit={submit}>
    <select name="transaction_type" value={form.transaction_type} onChange={update}><option value="SALE">Acheter</option><option value="RENT">Louer</option></select>
    <select name="city" value={form.city} onChange={update}><option>Meknes</option><option>Fes</option><option>Casablanca</option></select>
    <select name="property_type" value={form.property_type} onChange={update}><option value="">Type</option><option value="APARTMENT">Appartement</option><option value="VILLA">Villa</option><option value="HOUSE">Maison</option><option value="STUDIO">Studio</option></select>
    <input name="min_price" value={form.min_price} onChange={update} placeholder="Budget min" type="number" />
    <input name="max_price" value={form.max_price} onChange={update} placeholder="Budget max" type="number" />
    <input name="bedrooms" value={form.bedrooms} onChange={update} placeholder="Chambres" type="number" />
    <button className="btn primary">Rechercher</button>
  </form>
}
