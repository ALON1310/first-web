// src/components/ProductCard.jsx
import React from 'react';
import './ProductCard.css';

/**
 * ProductCard component renders details of a single jet,
 * and provides an Add to Cart button.
 */
function ProductCard({ jet, onAddToCart }) {
  return (
    <div className="product-card">
      {/* Jet image */}
      <img src={jet.imageUrl} alt={jet.name} className="product-image" />

      {/* Jet name and description */}
      <h3>{jet.name}</h3>
      <p>{jet.description}</p>

      {/* Price and Add to Cart button */}
      <div className="product-footer">
        <span className="price">${jet.price.toLocaleString()}</span>
        <button onClick={() => onAddToCart(jet)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;