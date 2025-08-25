// src/components/MenuButton.jsx
import React, { useState } from 'react';
import './MenuButton.css';

function MenuButton({ user, onNavigate, onLogout }) {
  const [open, setOpen] = useState(false);

  const handleClick = (target) => {
    onNavigate(target);
    setOpen(false);
  };

  return (
    <div className="menu-button-wrapper">
      <button className="hamburger" onClick={() => setOpen(!open)}>
        ☰ Menu
      </button>
      {open && (
        <div className="dropdown-menu">
          <button onClick={() => handleClick('store')}>🏪 Store</button>
          <button onClick={() => handleClick('cart')}>🛒 Cart</button>
          <button onClick={() => handleClick('myItems')}>🧾 My Items</button>
          <button onClick={() => handleClick('about')}>ℹ️ About</button>
          <button onClick={() => handleClick('reviews')}>⭐ Reviews</button>



          {/* ✅ Only show if admin */}
          {user?.username === 'admin' && (
            <button onClick={() => handleClick('admin')}>🧑‍💻 Admin</button>
          )}

          <button className="logout" onClick={onLogout}>🚪 Logout</button>
        </div>
      )}
    </div>
  );
}

export default MenuButton;
