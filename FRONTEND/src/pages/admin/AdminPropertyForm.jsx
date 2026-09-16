import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../services/api'

const blank = { title: '', description: '', transaction_type: 'SALE', property_type: 'APARTMENT', price: '', city_id: '', district_id: '', address: '', latitude: '33.8935', longitude: '-5.5473', surface: '', bedrooms: 2, bathrooms: 1, floor: 1, total_floors: 5, status: 'AVAILABLE', owner_id: 1, furnished: false, parking: false, elevator: true, balcony: true, terrace: false }

export default function AdminPropertyForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(blank)
  const [cities, setCities] = useState([])
  const [files, setFiles] = useState([])
  useEffect(() => { api.get('/cities').then((res) => setCities(res.data.data)); if (id) api.get(`/properties/${id}`).then((res) => setForm({ ...blank, ...res.data.data })) }, [id])
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  async function submit(e) {
    e.preventDefault()
    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v === true ? 1 : v === false ? 0 : v ?? ''))
    ;[...files].forEach((file) => data.append('images[]', file))
    await api.post(id ? `/admin/properties/${id}?_method=PUT` : '/admin/properties', data, { headers: { 'Content-Type': 'multipart/form-data' } })
    navigate('/admin/properties')
  }
  const districts = cities.find((c) => String(c.id) === String(form.city_id))?.districts || []
  return <section><h1>{id ? 'Modifier un bien' : 'Ajouter un bien'}</h1><form className="admin-form" onSubmit={submit}>{['title', 'price', 'address', 'latitude', 'longitude', 'surface', 'bedrooms', 'bathrooms', 'floor', 'total_floors', 'owner_id'].map((name) => <input key={name} name={name} value={form[name] || ''} onChange={update} placeholder={name} required={['title', 'price', 'address', 'latitude', 'longitude', 'surface'].includes(name)} />)}<textarea name="description" value={form.description} onChange={update} placeholder="description" required /><select name="transaction_type" value={form.transaction_type} onChange={update}><option value="SALE">Vente</option><option value="RENT">Location</option></select><select name="property_type" value={form.property_type} onChange={update}><option value="APARTMENT">Appartement</option><option value="VILLA">Villa</option><option value="HOUSE">Maison</option><option value="STUDIO">Studio</option></select><select name="city_id" value={form.city_id} onChange={update} required><option value="">Ville</option>{cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select><select name="district_id" value={form.district_id || ''} onChange={update}><option value="">Quartier</option>{districts.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select><select name="status" value={form.status} onChange={update}><option>AVAILABLE</option><option>RESERVED</option><option>SOLD</option><option>RENTED</option></select>{['furnished', 'parking', 'elevator', 'balcony', 'terrace'].map((name) => <label key={name}><input type="checkbox" name={name} checked={Boolean(form[name])} onChange={update} /> {name}</label>)}<input type="file" multiple onChange={(e) => setFiles(e.target.files)} /><button className="btn primary">Enregistrer</button></form></section>
}
