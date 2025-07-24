// src/pages/MyItemsPage.jsx
import React from 'react';
import './MyItemsPage.css';

function MyItemsPage({ purchasedItems, onBackToStore }) {
  return (
    <div className="items-page-container">
      <header className="items-header">
        <button className="back-btn" onClick={onBackToStore}>← Back to Store</button>
      </header>
      <h2> MY Items
      </h2>

      {purchasedItems.length === 0 ? (
        <p className="empty-message">You haven’t bought any jets yet.</p>
      ) : (
        <div className="items-grid">
          {purchasedItems.map((item, index) => (
            <div key={index} className="item-card">
              <img src={item.imageUrl} alt={item.name} className="item-image" />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyItemsPage;
