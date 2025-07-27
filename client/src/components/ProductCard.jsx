import React from 'react';
import './ProductCard.css';

function ProductCard({ jet, onAddToCart, onRemoveFromCart, countInCart }) {
  return (
    <div className="product-card">
      <img
        src={jet.imageUrl || jet.image}
        alt={jet.name}
        className="product-image"
      />
      <h3>{jet.name}</h3>
      <p>{jet.description}</p>

      <div className="product-footer">
        <span className="price">${jet.price.toLocaleString()}</span>

        <button onClick={() => onAddToCart(jet)}>
          Add to Cart
        </button>

        {countInCart > 0 && (
          <>
            <div className="in-cart-count">
              In Cart: {countInCart} {countInCart === 1 ? 'item' : 'items'}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
