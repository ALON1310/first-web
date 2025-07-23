// src/pages/AlreadyReg.jsx

import React, { useState } from 'react';
import './AlreadyReg.css';

// Dummy user database for demo purposes
const existingUsers = [
  { username: 'john', email: 'john@example.com', password: 'Password1' },
  { username: 'sara', email: 'sara@example.com', password: 'SaraPass2' },
  { username: 'mike', email: 'mike@example.com', password: 'Mike1234' },
];

function AlreadyReg({ onLogin, onBackToRegister }) {
  // ▶︎ Form state: identifier can be username or email
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (name === 'rememberMe') {
      setRememberMe(checked);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { identifier, password } = form;
    if (!identifier || !password) {
      return setError('Both fields are required.');
    }
    // ▶︎ Find user by username OR email
    const user = existingUsers.find(
      u =>
        u.username.toLowerCase() === identifier.toLowerCase() ||
        u.email.toLowerCase() === identifier.toLowerCase()
    );
    if (!user) {
      return setError('No such user. Please register first.');
    }
    if (user.password !== password) {
      return setError('Incorrect password.');
    }

    // ▶︎ Set cookie with appropriate expiry
    const expires = new Date();
    if (rememberMe) {
      expires.setDate(expires.getDate() + 12);
    } else {
      expires.setTime(expires.getTime() + 30 * 60000);
    }
    document.cookie = `skyUser=${encodeURIComponent(
      user.username
    )}; expires=${expires.toUTCString()}; path=/`;

    // ▶︎ Notify parent that login succeeded
    onLogin({ firstName: user.username, email: user.email });
  };

  return (
    <div className="alreadyreg-page">
      <div className="login-form">
        <h2>Log In to SKY</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Username or Email Field */}
          <div className="form-group">
            <label htmlFor="identifier">Username or Email</label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="john or john@example.com"
              value={form.identifier}
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Remember Me Checkbox */}
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
          <button type="submit">Log In</button>

          {/* Back to Register */}
          <p className="switch-link">
            Don’t have an account?{' '}
            <button
              type="button"
              className="link-button"
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
