import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetails from './pages/PropertyDetails'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import Favorites from './pages/Favorites'
import Cities from './pages/Cities'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProperties from './pages/admin/AdminProperties'
import AdminPropertyForm from './pages/admin/AdminPropertyForm'
import AdminReservations from './pages/admin/AdminReservations'
import AdminUsers from './pages/admin/AdminUsers'
import AdminCities from './pages/admin/AdminCities'

function Protected({ children, admin = false }) {
  const { user, isAdmin, loading } = useAuth()
  if (loading) return <div className="page-pad">Chargement...</div>
  if (!user) return <Navigate to={admin ? '/admin/login' : '/login'} replace />
  if (admin && !isAdmin) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/sale" element={<Properties forcedType="SALE" />} />
      <Route path="/rent" element={<Properties forcedType="RENT" />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/cities/:city" element={<Properties />} />
      <Route path="/favorites" element={<Protected><Favorites /></Protected>} />
      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/admin/login" element={<AuthPage mode="admin" />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Route>
    <Route path="/admin" element={<Protected admin><AdminLayout /></Protected>}>
      <Route index element={<AdminDashboard />} />
      <Route path="statistics" element={<AdminDashboard />} />
      <Route path="properties" element={<AdminProperties />} />
      <Route path="properties/create" element={<AdminPropertyForm />} />
      <Route path="properties/:id/edit" element={<AdminPropertyForm />} />
      <Route path="reservations" element={<AdminReservations />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="cities" element={<AdminCities />} />
    </Route>
  </Routes>
}
