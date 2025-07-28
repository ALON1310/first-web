import React, { useState } from 'react';
import './AlreadyReg.css';
import Logo from '../components/Logo';
// ========================================
// 👤 Hardcoded Admin User for Local Testing
// ========================================
const adminUser = {
  username: 'admin',
  email: 'admin@example.com',
  password: 'admin'
};

function AlreadyReg({ onLogin, onBackToRegister }) {
  // =========================
  // 🔧 Component State
  // =========================
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  // =========================
  // 🖊️ Input Change Handler
  // =========================
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'rememberMe') {
      setRememberMe(checked);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  // =========================
  // 🚀 Login Submit Handler
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { identifier, password } = form;

    // 1️⃣ Client-side validation
    if (!identifier || !password) {
      setError('Both fields are required.');
      return;
    }

    // 2️⃣ Check if it's the hardcoded admin user
    const isAdminLogin =
      (identifier.toLowerCase() === adminUser.username.toLowerCase() ||
       identifier.toLowerCase() === adminUser.email.toLowerCase()) &&
      password === adminUser.password;

    if (isAdminLogin) {
      // Set cookie for session persistence
      const expires = new Date();
      if (rememberMe) expires.setDate(expires.getDate() + 12); // 12 days
      else expires.setTime(expires.getTime() + 30 * 60000);     // 30 min

      document.cookie = `skyUser=${encodeURIComponent(
        adminUser.username
      )}; expires=${expires.toUTCString()}; path=/`;

      // Notify App of successful login
     onLogin({
        username: adminUser.username,
        email: adminUser.email
      });
    }

    // 3️⃣ Send login request to backend for registered users
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Allows cookies from backend
        body: JSON.stringify({ username: identifier, password })
      });

      const data = await res.json();

      // Handle invalid credentials
      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Set login cookie
      const expires = new Date();
      if (rememberMe) expires.setDate(expires.getDate() + 12);
      else expires.setTime(expires.getTime() + 30 * 60000);

      document.cookie = `skyUser=${encodeURIComponent(
        data.username
      )}; expires=${expires.toUTCString()}; path=/`;

      // Let app know user is logged in
      onLogin({ username: data.username, email: data.email });
    } catch (err) {
      console.error(err);
      setError('Network error. Try again later.');
    }
  };
  

  // =========================
  // 🧱 UI Render
  // =========================
  return (
    <div className="alreadyreg-page">
      <div className="login-form">
        <Logo />
        <form onSubmit={handleSubmit}>
          {/* Identifier Field */}
          <div className="form-group">
            <label htmlFor="identifier">Username or Email</label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              className="input"
              placeholder="admin or your email"
              value={form.identifier}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Remember Me */}
          <div className="form-group">
            <label className="checkbox-label">
              <input
                name="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={handleChange}
              />
              Remember me
            </label>
          </div>

          {/* Error Message */}
          {error && <p className="error">{error}</p>}

          {/* Submit Button */}
          <button type="submit" className="primary-button">Log In</button>


          {/* Switch to Registration */}
          <p className="switch-link">
            Don’t have an account?{' '}
          <button
            type="button"
            className="link-button primary-button"
            onClick={onBackToRegister}
          >
            Register here
          </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AlreadyReg;
