import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { api } from '../../services/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  useEffect(() => { api.get('/admin/statistics').then((res) => setStats(res.data)) }, [])
  if (!stats) return <div>Chargement...</div>
  return <section><h1>Dashboard admin</h1><div className="stats-grid">{Object.entries(stats.totals).map(([k, v]) => <div className="stat" key={k}><span>{k}</span><strong>{v}</strong></div>)}</div><div className="charts"><ResponsiveContainer width="100%" height={260}><BarChart data={stats.properties_by_city}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="properties_count" fill="#0f2f57" /></BarChart></ResponsiveContainer><ResponsiveContainer width="100%" height={260}><PieChart><Pie data={stats.sale_vs_rent} dataKey="value" nameKey="name" fill="#c9a24b" label /></PieChart></ResponsiveContainer></div></section>
}
