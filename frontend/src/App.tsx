import { useState, useEffect } from 'react'
import Auth from './Auth'
import Dashboard from './Dashboard'
import AdminDashboard from './AdminDashboard'
import authService from './services/authService'

function App() {
  const [user, setUser] = useState<any>(null)
  const [view, setView] = useState<'dashboard' | 'admin'>('dashboard')

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const handleLoginSuccess = (userData: any) => {
    setUser(userData)
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    setView('dashboard')
  }

  return (
    <main style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '1rem' }}>
      {!user ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : view === 'admin' ? (
        <AdminDashboard user={user} onBack={() => setView('dashboard')} onLogout={handleLogout} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} onAdminClick={() => setView('admin')} />
      )}
    </main>
  )
}

export default App
