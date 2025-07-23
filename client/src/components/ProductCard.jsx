// client/src/components/ProductCard.jsx
import jetImage from '../assets/jet.png';
function ProductCard() {
  return (
    <div className="product-card">
        <img
        src={jetImage}
        alt="Private Jet"
        className="product-image"
        />
      <h2>Golfsream G450</h2>
      <p>Privat Jet with full of life-style experience , the ultimate way to fly</p>
      <p className="price">$12,500,000</p>
      <button>BUY NOW</button>
    </div>

  );
}

export default ProductCard;
