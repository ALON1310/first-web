// src/pages/CartPage.jsx
import React, { useMemo } from 'react';
import './CartPage.css';

function CartPage({ cart, onBack }) {
  // Aggregate items by id
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
    <div className="cart-page">
      <h2>Your Cart</h2>
      <button className="back-btn" onClick={onBack}>Back to Store</button>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td><img src={item.imageUrl} alt={item.name} /></td>
                <td>{item.name}</td>
                <td>${item.price.toLocaleString()}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">Total</td>
              <td>${total.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}

export default CartPage;