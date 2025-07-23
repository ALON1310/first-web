// src/pages/AlreadyReg.jsx

import React from 'react'
import ProductCard from '../components/ProductCard'
import './AlreadyReg.css'

function AlreadyReg({ user, onLogout }) {
  return (
    <div className="alreadyreg-page">
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
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </div>
  )
}

export default AlreadyReg
