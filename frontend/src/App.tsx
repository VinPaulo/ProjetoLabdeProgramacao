import { useState } from 'react'
import Auth from './Auth'
import Dashboard from './Dashboard'

function App() {
  const [user, setUser] = useState<any>(null)

  const handleLoginSuccess = (userData: any) => {
    setUser(userData)
  }

  const handleLogout = () => {
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
