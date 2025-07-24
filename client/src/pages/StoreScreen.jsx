// src/pages/StoreScreen.jsx
import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import falcon from '../assets/jets/Falcon.png';
import skyLiner200 from '../assets/jets/SkyLiner200.png';
import aeroSwift from '../assets/jets/AeroSwift.png';
import cloudCruiser from '../assets/jets/CloudCruiser.png';
import jetStream500 from '../assets/jets/JetStream500.png';
import eagleEye from '../assets/jets/EagleEye.png';
import skyDancer from '../assets/jets/SkyDancer.png';
import nimbus300 from '../assets/jets/Nimbus300.png';
import horizon700 from '../assets/jets/Horizon700.png';
import phoenixGT from '../assets/jets/PhoeniGT.png';
import './StoreScreen.css';

function StoreScreen({ user, cart, onAddToCart, onShowCart, onLogout, setView }) {
  const jets = useMemo(() => [
    { id: 1, name: 'Falcon',       price: 2500000, imageUrl: falcon,       description: 'High-speed private jet.' },
    { id: 2, name: 'SkyLiner 200', price: 1800000, imageUrl: skyLiner200,  description: 'Luxurious comfort in the skies.' },
    { id: 3, name: 'AeroSwift',    price: 3200000, imageUrl: aeroSwift,    description: 'Cutting-edge design and performance.' },
    { id: 4, name: 'CloudCruiser', price: 2100000, imageUrl: cloudCruiser, description: 'Smooth flight guaranteed.' },
    { id: 5, name: 'JetStream 500',price: 2900000, imageUrl: jetStream500, description: 'State-of-the-art avionics.' },
    { id: 6, name: 'Eagle Eye',    price: 2300000, imageUrl: eagleEye,     description: 'Premium surveillance jet.' },
    { id: 7, name: 'SkyDancer',    price: 2750000, imageUrl: skyDancer,    description: 'Elegant and efficient.' },
    { id: 8, name: 'Nimbus 300',   price: 1950000, imageUrl: nimbus300,    description: 'Compact business jet.' },
    { id: 9, name: 'Horizon 700',  price: 3500000, imageUrl: horizon700,   description: 'Long-range luxury.' },
    { id: 10, name: 'Phoenix GT',  price: 2600000, imageUrl: phoenixGT,    description: 'Performance and style.' },
  ], []);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredJets = useMemo(
    () => jets.filter(jet => jet.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [jets, searchTerm]
  );

  const handleAddToCart = (jet) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      setView('login');
    } else {
      onAddToCart(jet);
    }
  };

  return (
    <div className="store-screen-page">
      <nav className="navbar">
        <div className="logo">SKY</div>
        <div className="nav-links">
        </div>
      </nav>

      <header className="store-header">

        <div className="header-controls">
          <input
            type="text"
            placeholder="Search jets..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
      </header>

      <section className="products-grid">
        {filteredJets.map(jet => (
          <ProductCard
            key={jet.id}
            jet={jet}
            onAddToCart={() => handleAddToCart(jet)}
          />
        ))}
      </section>
    </div>
  );
}

export default StoreScreen;
