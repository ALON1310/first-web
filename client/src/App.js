import React, { useState } from 'react'
import Register from './pages/Register'
import AlreadyReg from './pages/AlreadyReg'

function App() {
  const [user, setUser] = useState(null)

  // Called when Register wants to “log in” or register
  const handleLogin = (userData) => {
    setUser(userData)
  }

  // Called from AlreadyReg to log out
  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div className="App">
      {user ? (
        <AlreadyReg user={user} onLogout={handleLogout} />
      ) : (
        <Register onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
