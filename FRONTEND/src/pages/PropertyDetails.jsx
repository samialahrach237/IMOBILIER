import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PropertyGallery from '../components/PropertyGallery'
import PropertyMap from '../components/PropertyMap'
import ReservationModal from '../components/ReservationModal'
import { api } from '../services/api'
import { label, money } from '../utils/format'

export default function PropertyDetails() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [modal, setModal] = useState(false)
  useEffect(() => { api.get(`/properties/${id}`).then((res) => setProperty(res.data.data)) }, [id])
  if (!property) return <div className="page-pad">Chargement...</div>
  const facts = ['surface', 'bedrooms', 'bathrooms', 'floor', 'parking', 'elevator', 'balcony', 'terrace', 'furnished']
  return <section className="section details">
    <PropertyGallery images={property.images} title={property.title} />
    <div className="details-grid">
      <article>
        <span className="badge sale">{label(property.transaction_type)}</span>
        <h1>{property.title}</h1>
        <strong className="price big">{money(property.price, property.transaction_type)}</strong>
        <p>{property.city} - {property.district} | {property.address}</p>
        <p>{property.description}</p>
        <div className="feature-grid">{facts.map((key) => <span key={key}>{key}: {typeof property[key] === 'boolean' ? (property[key] ? 'Oui' : 'Non') : property[key] ?? '-'}</span>)}</div>
      </article>
      <aside className="owner-box"><h3>Proprietaire / agence</h3><strong>{property.owner?.name}</strong><p>{property.owner?.phone}<br />{property.owner?.email}</p><button className="btn primary full" onClick={() => setModal(true)}>Reserver</button><button className="btn dark full" onClick={() => setModal(true)}>Demander une visite</button></aside>
    </div>
    <PropertyMap property={property} />
    {modal && <ReservationModal property={property} onClose={() => setModal(false)} />}
  </section>
}
