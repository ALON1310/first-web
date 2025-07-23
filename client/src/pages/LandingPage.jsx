// src/pages/LandingPage.jsx

import React from 'react';
import ProductCard from '../components/ProductCard';
import './LandingPage.css';

function LandingPage({ user, onLogout }) {
  return (
    <div className="landing-page">
      {/* ─── Navbar ───────────────────────────────────────── */}
      <nav className="navbar">
        <div className="logo">SKY</div>
        <div className="nav-links">
          {/* Greet the user by their first name */}
          <span className="greeting">Welcome, {user.firstName}!</span>
          {/* Logout button resets app to Register view */}
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* ─── Hero Section ─────────────────────────────────── */}
      <header className="hero">
        <h1>Hello, {user.firstName}!</h1>
        <p>Explore our exclusive collection of private jets</p>
      </header>

      {/* ─── Products Grid ───────────────────────────────── */}
      <section className="products">
        {/* Map over your real products array here */}
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </div>
  );
}

export default LandingPage;
