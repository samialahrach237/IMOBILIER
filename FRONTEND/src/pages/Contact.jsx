import { useState } from 'react'
import { api } from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [ok, setOk] = useState('')
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  async function submit(e) { e.preventDefault(); const { data } = await api.post('/contact', form); setOk(data.message); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }
  return <section className="section narrow"><h1>Contact</h1>{ok && <p className="success">{ok}</p>}<form className="stack" onSubmit={submit}><input name="name" value={form.name} onChange={update} placeholder="Nom" required /><input name="email" value={form.email} onChange={update} placeholder="Email" type="email" required /><input name="phone" value={form.phone} onChange={update} placeholder="Telephone" /><input name="subject" value={form.subject} onChange={update} placeholder="Sujet" required /><textarea name="message" value={form.message} onChange={update} placeholder="Message" required /><button className="btn primary">Envoyer</button></form></section>
}
