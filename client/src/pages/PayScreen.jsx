import React, { useState } from 'react';
import './PayScreen.css';

function PayScreen({ total, onBack, onConfirm }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(); // This should now work!
  };

  return (
    <div className="pay-screen">
      {/* Back button at the top */}
      <div className="top-back-container">
        <button
          type="button"           // <-- FIXED: prevent this from submitting the form
          className="back-btn"
          onClick={onBack}
        >
          ← Back to Cart
        </button>
      </div>

      <form className="payment-form" onSubmit={handleSubmit}>
        <h2 className="payment-title">Confirm Payment</h2>
        <p className="payment-total">
          Total: <strong>${total.toLocaleString()}</strong>
        </p>

        <div className="form-group">
          <label>Full Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Card Number</label>
          <input
            name="cardNumber"
            type="text"
            maxLength={19}
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <div className="form-group half">
            <label>Expiry (MM/YY)</label>
            <input
              name="expiry"
              type="text"
              placeholder="08/26"
              value={formData.expiry}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group half">
            <label>CVV</label>
            <input
              name="cvv"
              type="text"
              placeholder="123"
              maxLength={4}
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="payment-buttons">
          <button type="submit" className="pay-button">
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default PayScreen;
