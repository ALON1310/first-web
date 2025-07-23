import React, { useState } from 'react';
import Register   from './pages/register';
import AlreadyReg from './pages/AlreadyReg';
import LandingPage from './pages/LandingPage';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('register');
  // view: 'register' | 'login' | 'landing'

  // Called by both Register and AlreadyReg on success
  const handleLogin = userData => {
    setUser(userData);
    setView('landing');
  };

  // Logout from LandingPage
  const handleLogout = () => {
    setUser(null);
    setView('register');
  };

  if (!user && view === 'login') {
    return (
      <AlreadyReg
        onLogin={handleLogin}
        onBackToRegister={() => setView('register')}
      />
    );
  }

  if (!user && view === 'register') {
    return (
      <Register
        onLogin={handleLogin}
        onShowLogin={() => setView('login')}
      />
    );
  }

  if (user && view === 'landing') {
    return (
      <LandingPage
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}

export default App;
