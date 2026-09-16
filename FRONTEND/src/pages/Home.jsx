import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMap, FiSearch, FiShield, FiStar } from 'react-icons/fi'
import PropertyCard from '../components/PropertyCard'
import SearchBar from '../components/SearchBar'
import { api } from '../services/api'

export default function Home() {
  const [recent, setRecent] = useState([])
  const [sale, setSale] = useState([])
  const [rent, setRent] = useState([])
  const [cities, setCities] = useState([])
  useEffect(() => {
    Promise.all([api.get('/properties?per_page=6'), api.get('/properties/sale?per_page=3'), api.get('/properties/rent?per_page=3'), api.get('/cities')]).then(([a, b, c, d]) => {
      setRecent(a.data.data); setSale(b.data.data); setRent(c.data.data); setCities(d.data.data)
    })
  }, [])
  return <>
    <section className="hero">
      <div className="hero-inner">
        <h1>Votre futur appartement commence ici</h1>
        <p>Trouvez, louez ou achetez le bien immobilier qui vous correspond a Meknes, Fes et Casablanca.</p>
        <SearchBar />
      </div>
    </section>
    <PropertySection title="Biens recemment ajoutes" items={recent} />
    <PropertySection title="Appartements a vendre" items={sale} />
    <PropertySection title="Appartements a louer" items={rent} />
    <section className="section">
      <div className="section-head"><h2>Decouvrez nos villes</h2><Link to="/cities">Toutes les villes</Link></div>
      <div className="city-grid">{cities.map((city) => <Link to={`/properties?city=${city.name}`} className="city-tile" key={city.id}><img src={city.image_url} alt="" /><strong>{city.name}</strong><span>{city.properties_count} biens</span></Link>)}</div>
    </section>
    <section className="section reasons">
      {[[FiStar, 'Large choix de biens'], [FiMap, 'Localisation precise'], [FiSearch, 'Recherche rapide'], [FiShield, 'Plateforme securisee']].map(([Icon, text]) => <div key={text}><Icon /><strong>{text}</strong></div>)}
    </section>
  </>
}

function PropertySection({ title, items }) {
  return <section className="section"><div className="section-head"><h2>{title}</h2><Link to="/properties">Voir plus</Link></div><div className="property-grid">{items.map((p) => <PropertyCard key={p.id} property={p} />)}</div></section>
}
