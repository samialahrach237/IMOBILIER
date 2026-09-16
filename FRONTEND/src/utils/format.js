export const money = (value, type) =>
  new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(value || 0) +
  (type === 'RENT' ? ' / mois' : '')

export const label = (value) => ({
  SALE: 'A vendre',
  RENT: 'A louer',
  APARTMENT: 'Appartement',
  VILLA: 'Villa',
  HOUSE: 'Maison',
  STUDIO: 'Studio',
  AVAILABLE: 'Disponible',
  RESERVED: 'Reserve',
  SOLD: 'Vendu',
  RENTED: 'Loue',
  VISIT: 'Visite',
  RESERVATION: 'Reservation',
  PENDING: 'En attente',
  ACCEPTED: 'Acceptee',
  REFUSED: 'Refusee',
  CANCELLED: 'Annulee',
}[value] || value)

export const placeholder = 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1200&q=80'
