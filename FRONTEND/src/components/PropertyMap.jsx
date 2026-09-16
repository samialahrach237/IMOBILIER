import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { money, placeholder } from '../utils/format'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function PropertyMap({ properties = [], property, height = 380 }) {
  const items = property ? [property] : properties.filter((p) => p.latitude && p.longitude)
  const center = items[0] ? [items[0].latitude, items[0].longitude] : [33.8935, -5.5473]
  return <div className="map-shell" style={{ height }}>
    <MapContainer center={center} zoom={property ? 15 : 7} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {items.map((item) => <Marker key={item.id} position={[item.latitude, item.longitude]}>
        <Popup><div className="map-popup"><img src={item.primary_image || placeholder} alt="" /><strong>{item.title}</strong><span>{money(item.price, item.transaction_type)}</span><Link to={`/properties/${item.id}`}>Voir</Link></div></Popup>
      </Marker>)}
    </MapContainer>
  </div>
}
