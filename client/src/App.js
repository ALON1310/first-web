// src/App.js
import React, { useState } from 'react';
import Register from './pages/register';
import AlreadyReg from './pages/AlreadyReg';
import StoreScreen from './pages/StoreScreen';
import CartPage from './pages/CartPage';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('register'); // 'register' | 'login' | 'store' | 'cart'
  const [cart, setCart] = useState([]);

  // Handle successful register or login
  const handleLogin = (userData) => {
    setUser(userData);
    setView('store');
  };

  // Logout and clear cart
  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setView('register');
  };

  // Add a jet to cart
  const handleAddToCart = (jet) => {
    setCart(prev => [...prev, jet]);
  };

  // Render based on current view
  if (!user && view === 'login') {
    return <AlreadyReg onLogin={handleLogin} onBackToRegister={() => setView('register')} />;
  }
  if (!user && view === 'register') {
    return <Register onLogin={handleLogin} onShowLogin={() => setView('login')} />;
  }
  if (user && view === 'store') {
    return (
      <StoreScreen
        user={user}
        cart={cart}
        onAddToCart={handleAddToCart}
        onShowCart={() => setView('cart')}
        onLogout={handleLogout}
      />
    );
  }
  if (user && view === 'cart') {
    return <CartPage cart={cart} onBack={() => setView('store')} />;
  }

  return null;
}

export default App;