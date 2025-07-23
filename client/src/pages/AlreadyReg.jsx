import React from 'react';
import ProductCard from './components/ProductCard';
import './LandingPage.css';

function LandingPage({ user, onLogout }) {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">SKY</div>
        <div className="nav-links">
          <span className="greeting">Welcome, {user.firstName}!</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>

      <header className="hero">
        <h1>Hello, {user.firstName}!</h1>
        <p>Explore our exclusive collection of private jets</p>
      </header>

      <section className="products">
        {/* Replace with a map over your real products array */}
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </div>
  );
}

export default LandingPage;
