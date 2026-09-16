import { useState } from 'react'
import { api } from '../services/api'

export default function ReservationModal({ property, onClose }) {
  const [form, setForm] = useState({ property_id: property.id, requested_date: '', requested_time: '10:00', request_type: 'VISIT', message: '' })
  const [message, setMessage] = useState('')
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  async function submit(e) {
    e.preventDefault()
    const { data } = await api.post('/reservations', form)
    setMessage(data.message || 'Votre demande a ete envoyee avec succes.')
  }
  return <div className="modal"><form className="modal-panel" onSubmit={submit}>
    <button type="button" className="close" onClick={onClose}>x</button>
    <h2>Demande pour {property.title}</h2>
    {message && <p className="success">{message}</p>}
    <input name="requested_date" type="date" value={form.requested_date} onChange={update} required />
    <input name="requested_time" type="time" value={form.requested_time} onChange={update} required />
    <select name="request_type" value={form.request_type} onChange={update}><option value="VISIT">Demander une visite</option><option value="RESERVATION">Reserver</option></select>
    <textarea name="message" value={form.message} onChange={update} placeholder="Message" />
    <button className="btn primary full">Envoyer</button>
  </form></div>
}
