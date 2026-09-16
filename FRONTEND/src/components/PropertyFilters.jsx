export default function PropertyFilters({ filters, setFilters, cities }) {
  const set = (e) => setFilters({ ...filters, [e.target.name]: e.target.value })
  const toggle = (e) => setFilters({ ...filters, [e.target.name]: e.target.checked ? '1' : '' })
  return <aside className="filters">
    <select name="city" value={filters.city || ''} onChange={set}><option value="">Toutes les villes</option>{cities.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}</select>
    <select name="transaction_type" value={filters.transaction_type || ''} onChange={set}><option value="">Vente et location</option><option value="SALE">A vendre</option><option value="RENT">A louer</option></select>
    <select name="property_type" value={filters.property_type || ''} onChange={set}><option value="">Tous types</option><option value="APARTMENT">Appartement</option><option value="VILLA">Villa</option><option value="HOUSE">Maison</option><option value="STUDIO">Studio</option></select>
    <input name="min_price" value={filters.min_price || ''} onChange={set} placeholder="Prix min" type="number" />
    <input name="max_price" value={filters.max_price || ''} onChange={set} placeholder="Prix max" type="number" />
    <input name="min_surface" value={filters.min_surface || ''} onChange={set} placeholder="Surface min" type="number" />
    <input name="bedrooms" value={filters.bedrooms || ''} onChange={set} placeholder="Chambres" type="number" />
    <label><input name="furnished" checked={filters.furnished === '1'} onChange={toggle} type="checkbox" /> Meuble</label>
    <label><input name="parking" checked={filters.parking === '1'} onChange={toggle} type="checkbox" /> Parking</label>
    <label><input name="elevator" checked={filters.elevator === '1'} onChange={toggle} type="checkbox" /> Ascenseur</label>
    <select name="sort" value={filters.sort || ''} onChange={set}><option value="">Plus recent</option><option value="price_asc">Prix croissant</option><option value="price_desc">Prix decroissant</option><option value="oldest">Plus ancien</option><option value="surface_asc">Surface croissante</option><option value="surface_desc">Surface decroissante</option></select>
    <button className="btn ghost full" onClick={() => setFilters({})}>Reinitialiser</button>
  </aside>
}
