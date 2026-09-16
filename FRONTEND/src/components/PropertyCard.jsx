import { Link } from 'react-router-dom'
import { FiDroplet, FiHeart, FiMapPin, FiMaximize2, FiMoon } from 'react-icons/fi'
import { api } from '../services/api'
import { label, money, placeholder } from '../utils/format'

export default function PropertyCard({ property, onFavorite }) {
  async function toggleFavorite() {
    if (property.is_favorite) await api.delete(`/favorites/${property.id}`)
    else await api.post('/favorites', { property_id: property.id })
    onFavorite?.()
  }

  return <article className="property-card">
    <div className="property-image">
      <img src={property.primary_image || placeholder} alt={property.title} />
      <span className={`badge ${property.transaction_type === 'SALE' ? 'sale' : 'rent'}`}>{label(property.transaction_type)}</span>
      <button className={`heart ${property.is_favorite ? 'saved' : ''}`} onClick={toggleFavorite} title="Favori"><FiHeart /></button>
    </div>
    <div className="property-body">
      <p className="location"><FiMapPin />{property.city} - {property.district}</p>
      <h3>{property.title}</h3>
      <strong className="price">{money(property.price, property.transaction_type)}</strong>
      <div className="facts"><span><FiMaximize2 />{property.surface} m2</span><span><FiMoon />{property.bedrooms} ch.</span><span><FiDroplet />{property.bathrooms} sdb</span></div>
      <Link className="btn dark full" to={`/properties/${property.id}`}>Voir les details</Link>
    </div>
  </article>
}
