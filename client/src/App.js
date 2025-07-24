// src/App.js
import React, { useState } from 'react';
import Register from './pages/register';
import AlreadyReg from './pages/AlreadyReg';
import StoreScreen from './pages/StoreScreen';
import CartPage from './pages/CartPage';
import PayScreen from './pages/PayScreen';
import ThankYouPage from './pages/ThankYouPage';
import MyItemsPage from './pages/MyItemsPage';
import MenuButton from './components/MenuButton';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('register');
  const [cart, setCart] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
    setView('store');
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setPurchasedItems([]);
    setView('register');
  };

  const handleRemoveFromCart = (jetId) => {
    setCart(prevCart => {
      const index = prevCart.findIndex(jet => jet.id === jetId);
      if (index === -1) return prevCart;
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const handleAddToCart = (jet) => {
    setCart(prev => [...prev, jet]);
  };

  const handleConfirmCheckout = () => {
    setPurchasedItems(prev => [...prev, ...cart]);
    setCart([]);
    setView('thankyou');
  };

  const renderWithMenu = (Component, props) => (
    <>
      <MenuButton onNavigate={setView} onLogout={handleLogout} />
      <Component {...props} />
    </>
  );

  if (!user && view === 'login') {
    return <AlreadyReg onLogin={handleLogin} onBackToRegister={() => setView('register')} />;
  }

  if (!user && view === 'register') {
    return <Register onLogin={handleLogin} onShowLogin={() => setView('login')} />;
  }

  if (user && view === 'store') {
    return renderWithMenu(StoreScreen, {
      user,
      cart,
      onAddToCart: handleAddToCart,
      onShowCart: () => setView('cart'),
      onLogout: handleLogout,
      setView
    });
  }

  if (user && view === 'cart') {
    return renderWithMenu(CartPage, {
      cart,
      onBack: () => setView('store'),
      onRemove: handleRemoveFromCart,
      onCheckout: () => setView('pay')
    });
  }

  if (user && view === 'pay') {
    return renderWithMenu(PayScreen, {
      total: cart.reduce((sum, item) => sum + item.price, 0),
      onBack: () => setView('cart'),
      onConfirm: handleConfirmCheckout
    });
  }

  if (user && view === 'thankyou') {
    return renderWithMenu(ThankYouPage, {
      onGoToStore: () => setView('store')
    });
  }

  if (user && view === 'myItems') {
    return renderWithMenu(MyItemsPage, {
      purchasedItems,
      onBackToStore: () => setView('store')
    });
  }

  return null;
}

export default App;
