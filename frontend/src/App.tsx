import { useState, useEffect } from 'react'
import Auth from './Auth'
import Dashboard from './Dashboard'
import authService from './services/authService'

function App() {
  const [user, setUser] = useState<any>(null)

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
  }

  return (
    <main style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '1rem' }}>
      {!user ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </main>
  )
}

export default App
