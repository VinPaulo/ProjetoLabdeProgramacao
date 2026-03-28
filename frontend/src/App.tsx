import { useState, useEffect } from 'react'
import Auth from './Auth'
import Dashboard from './Dashboard'
import AdminDashboard from './AdminDashboard'
import authService from './services/authService'
import Footer from './Footer'

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
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '0 1rem', 
      backgroundColor: 'var(--bg-main)'
    }}>
      <main style={{ 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', // Mudei para coluna para facilitar o alinhamento
        justifyContent: 'center', 
        alignItems: 'center', // Fix: Impede que o componente estique verticalmente
        flex: 1,
        padding: '2rem 0' // Padding para evitar que encoste no topo/rodapé em telas pequenas
      }}>
        {!user ? (
          <Auth onLoginSuccess={handleLoginSuccess} />
        ) : view === 'admin' ? (
          <AdminDashboard user={user} onBack={() => setView('dashboard')} onLogout={handleLogout} />
        ) : (
          <Dashboard user={user} onLogout={handleLogout} onAdminClick={() => setView('admin')} />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
