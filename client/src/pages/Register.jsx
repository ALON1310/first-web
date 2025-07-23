// src/pages/Register.jsx

import React, { useState } from 'react';
import './Register.css';

// A static list simulating existing usernames
const existingUsers = ['john', 'sara', 'mike'];

function Register({ onLogin, onShowLogin }) {
  // ▶︎ Form state: holds user inputs
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  // ▶︎ Whether to remember the user
  const [rememberMe, setRememberMe] = useState(false);
  // ▶︎ Validation error messages
  const [errors, setErrors] = useState({});

  // Handle any input change (text or checkbox)
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (name === 'rememberMe') {
      setRememberMe(checked);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Checks password strength: must be ≥8 chars, have uppercase & digit
  const isPasswordStrong = pass =>
    pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass);

  // ▶︎ Called when the user submits the register form
  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};

    // — Validate username
    if (!form.username) {
      newErrors.username = 'Username is required.';
    } else if (existingUsers.includes(form.username.toLowerCase())) {
      newErrors.username = 'This username is already taken.';
    }

    // — Validate email
    if (!form.email) {
      newErrors.email = 'Email is required.';
    }

    // — Validate password
    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (!isPasswordStrong(form.password)) {
      newErrors.password =
        'Password must be ≥8 chars, include an uppercase letter and a number.';
    }

    // — Confirm password match
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // ▶︎ Set a cookie for the new user
    const expires = new Date();
    if (rememberMe) {
      expires.setDate(expires.getDate() + 12);         // 12 days
    } else {
      expires.setTime(expires.getTime() + 30 * 60000); // 30 minutes
    }
    document.cookie = `skyUser=${encodeURIComponent(
      form.username
    )}; expires=${expires.toUTCString()}; path=/`;

    // ▶︎ Notify App that registration succeeded
    onLogin({ firstName: form.username, email: form.email });
  };

  return (
    <div className="register-page">
      <div className="register-form">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
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
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
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

          {/* Submit Button */}
          <button type="submit">Register</button>

          {/* Toggle to Login */}
          <p className="switch-link">
            Already have an account?{' '}
            <button
              type="button"
              className="link-button"
              onClick={onShowLogin}
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
