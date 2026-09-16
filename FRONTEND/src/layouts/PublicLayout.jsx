import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function PublicLayout() {
  return <>
    <Navbar />
    <main><Outlet /></main>
    <Footer />
    <button className="back-top" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>^</button>
  </>
}
