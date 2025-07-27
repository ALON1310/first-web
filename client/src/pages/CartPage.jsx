// src/pages/CartPage.jsx
import React, { useMemo } from 'react';
import './CartPage.css';
import Logo from '../components/Logo';

function CartPage({ cart, onBack, onRemove, onCheckout }) {
  const items = useMemo(() => {
    const map = {};
    cart.forEach(jet => {
      if (!map[jet.id]) map[jet.id] = { ...jet, quantity: 0 };
      map[jet.id].quantity++;
    });
    return Object.values(map);
  }, [cart]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return (
    <div className="cart-page-container">
      <Logo />
      <header className="cart-header">
        <button className="back-btn" onClick={onBack}>← Back to Store</button>
      </header>
      <h2> My Cart</h2>
 
      <div className="cart-content">
        {items.length === 0 ? (
          <div className="empty-cart">Your cart is empty.</div>
        ) : (
          <div className="cart-items-grid">
            {items.map(item => (
              <div className="cart-item-card" key={item.id}>
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price.toLocaleString()}</p>
                  <p className="cart-item-quantity">Qquantity: {item.quantity}</p>
                  <p className="cart-item-subtotal">
                    Subtotal: ${(item.price * item.quantity).toLocaleString()}
                  </p>
                 <button
                    type="button" // prevents default form behavior
                    className="remove-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      onRemove(item.id);
                    }}
                    >
                    🗑 Remove
                </button>

                </div>
                
              </div>
            ))}
            
          </div>
        )}

        {items.length > 0 && (
          <>
            <div className="cart-total">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>

            <button className="pay-button" onClick={onCheckout}>
              Proceed to Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
